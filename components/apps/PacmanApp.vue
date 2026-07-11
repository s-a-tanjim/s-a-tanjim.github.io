<template>
  <div class="pacman-app">
    <div class="hud">
      <div class="hud-cell">
        <span class="hud-label">SCORE</span>
        <span class="hud-value">{{ score }}</span>
      </div>
      <div class="hud-cell">
        <span class="hud-label">HIGH</span>
        <span class="hud-value">{{ highScore }}</span>
      </div>
      <div class="hud-cell">
        <span class="hud-label">LIVES</span>
        <span class="hud-value">
          <span v-for="i in lives" :key="i" class="life-dot"></span>
          <span v-if="lives === 0" class="muted">—</span>
        </span>
      </div>
      <div class="hud-cell wide">
        <span class="hud-label">STATUS</span>
        <span class="hud-value">{{ statusMsg }}</span>
      </div>
    </div>

    <div class="canvas-wrap" ref="wrapRef">
      <canvas
        ref="canvasRef"
        :width="canvasW"
        :height="canvasH"
        @touchstart.passive="onTouchStart"
        @touchmove.passive="onTouchMove"
        @touchend.passive="onTouchEnd"
      ></canvas>

      <div v-if="!running" class="overlay">
        <div class="overlay-box">
          <h2 class="overlay-title">{{ overlayTitle }}</h2>
          <p v-if="overlaySub" class="overlay-sub">{{ overlaySub }}</p>
          <button class="xp-btn primary" @click="start">{{ buttonText }}</button>
          <p class="overlay-hint">Arrow keys or WASD to move • Swipe on touch</p>
        </div>
      </div>
    </div>

    <div class="controls-help">
      <span><kbd>←</kbd><kbd>→</kbd><kbd>↑</kbd><kbd>↓</kbd> move</span>
      <span><kbd>P</kbd> pause</span>
      <span class="muted">Power pellets briefly let you eat ghosts (200 → 1600 pts).</span>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

/* Rendered inside an <XpWindow>. `focused` gates keyboard input so the
   game only responds when its window is the active one. */
const props = defineProps({
  focused: { type: Boolean, default: true },
})

/* ────────────────────────────────────────────────────
   Maze
   '#' wall   '.' pellet   'o' power pellet
   '-' ghost door (open for ghosts only)
   ' ' empty
   'P' pacman spawn
   Rows are exactly 19 chars; tunnel passes through row 9.
   ──────────────────────────────────────────────────── */
const MAZE_RAW = [
  '###################',
  '#........#........#',
  '#.##.###.#.###.##.#',
  '#o...............o#',
  '#.##.#.#####.#.##.#',
  '#....#...#...#....#',
  '####.###.#.###.####',
  '   #.#       #.#   ',
  '####.# ##-## #.####',
  '    .  #   #  .    ',
  '####.# ##### #.####',
  '   #.#       #.#   ',
  '####.###.#.###.####',
  '#....#...#...#....#',
  '#.##.#.#####.#.##.#',
  '#o......P........o#',
  '#.##.###.#.###.##.#',
  '#........#........#',
  '###################',
]

const COLS = 19
const ROWS = 19
const TILE = 22
const canvasW = COLS * TILE
const canvasH = ROWS * TILE

/* ── Reactive UI state ──────────────────────────── */
const canvasRef = ref(null)
const wrapRef   = ref(null)
const score     = ref(0)
const highScore = ref(0)
const lives     = ref(3)
const running   = ref(false)         /* a game frame loop is active */
const paused    = ref(false)
const gameOver  = ref(false)
const won       = ref(false)
const statusMsg = ref('Ready')

const overlayTitle = computed(() => {
  if (won.value)      return 'You cleared the maze!'
  if (gameOver.value) return 'Game Over'
  return 'Pac-Man'
})
const overlaySub = computed(() => {
  if (won.value)      return `Final score: ${score.value}`
  if (gameOver.value) return `Final score: ${score.value}`
  return 'Eat every pellet — but watch the ghosts.'
})
const buttonText = computed(() => {
  if (gameOver.value || won.value) return 'Play again'
  return 'Start'
})

/* ── Game state (non-reactive — held in closures) ── */
let walls           /* boolean[][]    */
let pellets         /* Set<"c,r">     */
let powerPellets    /* Set<"c,r">     */
let pacSpawn        /* {c, r}         */
let pac             /* Entity         */
let ghosts          /* Entity[]       */
let powerTimer      /* seconds remaining in frightened mode */
let ghostEatStreak  /* how many ghosts eaten on this power pellet */
let levelStartFreeze /* short pause at level start  */
let deathFreeze      /* short pause after death     */
let lastTime
let animFrame = null

/* ── Map building ──────────────────────────────── */
function buildMap() {
  walls = []
  pellets = new Set()
  powerPellets = new Set()
  pacSpawn = { c: 9, r: 15 }
  for (let r = 0; r < ROWS; r++) {
    walls.push([])
    for (let c = 0; c < COLS; c++) {
      const ch = MAZE_RAW[r][c]
      walls[r].push(ch === '#')
      if (ch === '.') pellets.add(`${c},${r}`)
      if (ch === 'o') powerPellets.add(`${c},${r}`)
      if (ch === 'P') pacSpawn = { c, r }
    }
  }
}

function tileChar(c, r) {
  if (r < 0 || r >= ROWS) return '#'
  const cc = ((c % COLS) + COLS) % COLS
  return MAZE_RAW[r][cc]
}

function isOpenForPacman(c, r) {
  const ch = tileChar(c, r)
  return ch !== '#' && ch !== '-'
}

function isOpenForGhost(c, r, eaten) {
  const ch = tileChar(c, r)
  if (ch === '#') return false
  if (ch === '-') return eaten   /* door opens only for eaten ghosts */
  return true
}

/* ── Entities ───────────────────────────────────── */
function makePac() {
  return {
    c: pacSpawn.c, r: pacSpawn.r,
    tc: pacSpawn.c, tr: pacSpawn.r,
    progress: 0,
    dir: { x: 0, y: 0 },
    nextDir: { x: 0, y: 0 },
    speed: 6.2,                   /* tiles per second */
    mouth: 0,
    alive: true,
  }
}

function makeGhost(i) {
  const colors = ['#ED1B22', '#FFBBE5', '#00FFFF', '#FFB852']
  const names  = ['Blinky', 'Pinky', 'Inky', 'Clyde']
  return {
    color: colors[i],
    name: names[i],
    c: 9, r: 7,
    tc: 9, tr: 7,
    progress: 0,
    dir: { x: 0, y: -1 },
    speed: 5.4,
    mode: 'idle',                 /* 'idle' | 'chase' | 'frightened' | 'eaten' */
    releaseTime: i * 2.5,
    personality: i,
  }
}

function resetEntities() {
  pac = makePac()
  ghosts = [0, 1, 2, 3].map(makeGhost)
  powerTimer = 0
  ghostEatStreak = 0
  levelStartFreeze = 1.0
  deathFreeze = 0
}

/* ── Input ──────────────────────────────────────── */
function setNextDir(dx, dy) {
  if (!pac) return
  pac.nextDir = { x: dx, y: dy }
}

function onKeyDown(e) {
  /* Only the focused Pac-Man window reacts to keys, and never while the
     user is typing in a field (e.g. the Command Prompt over the game). */
  if (!props.focused) return
  const t = e.target
  if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return
  switch (e.key) {
    case 'ArrowLeft':  case 'a': case 'A': setNextDir(-1, 0); e.preventDefault(); break
    case 'ArrowRight': case 'd': case 'D': setNextDir( 1, 0); e.preventDefault(); break
    case 'ArrowUp':    case 'w': case 'W': setNextDir( 0,-1); e.preventDefault(); break
    case 'ArrowDown':  case 's': case 'S': setNextDir( 0, 1); e.preventDefault(); break
    case 'p': case 'P':
      if (running.value && !gameOver.value && !won.value) togglePause()
      break
  }
}

let touchStart = null
function onTouchStart(e) {
  const t = e.touches[0]
  touchStart = { x: t.clientX, y: t.clientY }
}
function onTouchMove(e) {
  if (!touchStart) return
  const t = e.touches[0]
  const dx = t.clientX - touchStart.x
  const dy = t.clientY - touchStart.y
  const ax = Math.abs(dx), ay = Math.abs(dy)
  if (Math.max(ax, ay) < 18) return
  if (ax > ay) setNextDir(dx > 0 ? 1 : -1, 0)
  else         setNextDir(0, dy > 0 ? 1 : -1)
  touchStart = { x: t.clientX, y: t.clientY }
}
function onTouchEnd() { touchStart = null }

/* ── Movement helpers ──────────────────────────── */
function pickPacNextTarget() {
  /* Try nextDir first, fall back to current dir. */
  const tryDirs = []
  if (pac.nextDir.x || pac.nextDir.y) tryDirs.push(pac.nextDir)
  if (pac.dir.x || pac.dir.y) tryDirs.push(pac.dir)
  for (const d of tryDirs) {
    const nc = pac.c + d.x
    const nr = pac.r + d.y
    if (isOpenForPacman(nc, nr)) {
      pac.dir = { ...d }
      pac.tc = nc
      pac.tr = nr
      pac.progress = 0
      return
    }
  }
  /* Blocked — stand still. */
  pac.dir = { x: 0, y: 0 }
  pac.tc = pac.c
  pac.tr = pac.r
  pac.progress = 0
}

function pickGhostNextTarget(g) {
  const eaten = g.mode === 'eaten'
  /* If eaten and we're back at the spawn tile, return to chase. */
  if (eaten && g.c === 9 && g.r === 7) {
    g.mode = 'chase'
  }

  /* Candidate adjacent open tiles, excluding immediate reverse. */
  const dirs = [
    { x:  1, y:  0 }, { x: -1, y:  0 },
    { x:  0, y:  1 }, { x:  0, y: -1 },
  ]
  const back = { x: -g.dir.x, y: -g.dir.y }
  let candidates = dirs.filter(d => {
    if (d.x === back.x && d.y === back.y) return false
    return isOpenForGhost(g.c + d.x, g.r + d.y, eaten)
  })
  /* Dead-end fallback: include reverse. */
  if (!candidates.length) {
    candidates = dirs.filter(d => isOpenForGhost(g.c + d.x, g.r + d.y, eaten))
  }
  if (!candidates.length) return

  let chosen
  if (g.mode === 'frightened') {
    chosen = candidates[Math.floor(Math.random() * candidates.length)]
  } else {
    const target = ghostTarget(g)
    let best = Infinity
    for (const d of candidates) {
      const nc = g.c + d.x, nr = g.r + d.y
      const dx = nc - target.c, dy = nr - target.r
      const dist = dx * dx + dy * dy
      if (dist < best) { best = dist; chosen = d }
    }
  }
  g.dir = chosen
  g.tc = g.c + chosen.x
  g.tr = g.r + chosen.y
  g.progress = 0
}

function ghostTarget(g) {
  if (g.mode === 'eaten') return { c: 9, r: 7 }
  const px = pac.c, py = pac.r
  switch (g.personality) {
    case 0: /* Blinky — chase directly */
      return { c: px, r: py }
    case 1: /* Pinky — 4 tiles ahead of pacman */
      return { c: px + pac.dir.x * 4, r: py + pac.dir.y * 4 }
    case 2: /* Inky — pacman + Blinky-mirror, simplified */
      const b = ghosts[0]
      return {
        c: px + (px - b.c),
        r: py + (py - b.r),
      }
    case 3: /* Clyde — chase if far, scatter if close */
      const dx = g.c - px, dy = g.r - py
      if (dx * dx + dy * dy > 64) return { c: px, r: py }
      return { c: 0, r: ROWS - 1 }
  }
  return { c: px, r: py }
}

/* ── Update ────────────────────────────────────── */
function update(dt) {
  if (paused.value) return
  if (gameOver.value || won.value) return

  if (levelStartFreeze > 0) { levelStartFreeze -= dt; return }
  if (deathFreeze > 0) {
    deathFreeze -= dt
    if (deathFreeze <= 0) {
      if (lives.value <= 0) {
        endGame(false)
      } else {
        pac = makePac()
        ghosts = [0, 1, 2, 3].map(makeGhost)
        levelStartFreeze = 0.6
      }
    }
    return
  }

  /* Power-pellet timer. */
  if (powerTimer > 0) {
    powerTimer -= dt
    if (powerTimer <= 0) {
      ghostEatStreak = 0
      for (const g of ghosts) {
        if (g.mode === 'frightened') g.mode = 'chase'
      }
    }
  }

  /* ── Move pacman ── */
  if (pac.dir.x === 0 && pac.dir.y === 0) pickPacNextTarget()
  if (pac.dir.x !== 0 || pac.dir.y !== 0) {
    /* Try to switch to nextDir while between tiles, if it's a 180° turn. */
    if (pac.nextDir.x === -pac.dir.x && pac.nextDir.y === -pac.dir.y
        && (pac.nextDir.x || pac.nextDir.y)) {
      const swapped = pac.tr; pac.tr = pac.r; pac.r = swapped
      const swapc   = pac.tc; pac.tc = pac.c; pac.c = swapc
      pac.progress = 1 - pac.progress
      pac.dir = { ...pac.nextDir }
      pac.nextDir = { x: 0, y: 0 }
    }
    pac.progress += pac.speed * dt
    pac.mouth += dt * 10
    while (pac.progress >= 1) {
      pac.progress -= 1
      pac.c = pac.tc
      pac.r = pac.tr
      /* Tunnel wrap. */
      if (pac.c < 0) pac.c = COLS - 1
      else if (pac.c >= COLS) pac.c = 0
      eatAtPacTile()
      pickPacNextTarget()
      if (pac.dir.x === 0 && pac.dir.y === 0) {
        pac.progress = 0
        break
      }
    }
  }

  /* ── Move ghosts ── */
  for (const g of ghosts) {
    if (g.mode === 'idle') {
      g.releaseTime -= dt
      if (g.releaseTime <= 0) {
        g.mode = 'chase'
        pickGhostNextTarget(g)
      } else continue
    }
    const speed = g.mode === 'frightened' ? g.speed * 0.55
                 : g.mode === 'eaten'      ? g.speed * 1.7
                 : g.speed
    g.progress += speed * dt
    while (g.progress >= 1) {
      g.progress -= 1
      g.c = g.tc
      g.r = g.tr
      if (g.c < 0) g.c = COLS - 1
      else if (g.c >= COLS) g.c = 0
      pickGhostNextTarget(g)
    }
  }

  /* ── Collisions ── */
  for (const g of ghosts) {
    if (g.mode === 'idle' || g.mode === 'eaten') continue
    const dc = Math.abs(entityX(g) - entityX(pac))
    const dr = Math.abs(entityY(g) - entityY(pac))
    if (dc < TILE * 0.55 && dr < TILE * 0.55) {
      if (g.mode === 'frightened') {
        ghostEatStreak++
        score.value += 200 * Math.pow(2, ghostEatStreak - 1)
        g.mode = 'eaten'
        g.releaseTime = 0
        statusMsg.value = `+${200 * Math.pow(2, ghostEatStreak - 1)}!`
      } else {
        lives.value--
        deathFreeze = 1.0
        statusMsg.value = lives.value > 0
          ? `Lost a life — ${lives.value} left`
          : 'Game over'
        return
      }
    }
  }

  /* ── Win check ── */
  if (pellets.size === 0 && powerPellets.size === 0) {
    endGame(true)
  }
}

function eatAtPacTile() {
  const key = `${pac.c},${pac.r}`
  if (pellets.has(key)) {
    pellets.delete(key)
    score.value += 10
  }
  if (powerPellets.has(key)) {
    powerPellets.delete(key)
    score.value += 50
    powerTimer = 6
    ghostEatStreak = 0
    for (const g of ghosts) {
      if (g.mode === 'chase') {
        g.mode = 'frightened'
        /* Reverse direction on frighten — classic Pac-Man behavior. */
        g.dir = { x: -g.dir.x, y: -g.dir.y }
        const t = g.tc; g.tc = g.c; g.c = t
        const u = g.tr; g.tr = g.r; g.r = u
        g.progress = 1 - g.progress
      }
    }
    statusMsg.value = 'Frightened!'
  }
}

/* ── Render position helpers ───────────────────── */
function entityX(e) {
  const dx = (e.tc - e.c) * e.progress
  return (e.c + dx + 0.5) * TILE
}
function entityY(e) {
  const dy = (e.tr - e.r) * e.progress
  return (e.r + dy + 0.5) * TILE
}

/* ── Draw ──────────────────────────────────────── */
function draw() {
  const cvs = canvasRef.value
  if (!cvs) return
  const ctx = cvs.getContext('2d')
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, canvasW, canvasH)

  drawMaze(ctx)
  drawPellets(ctx)
  drawPacman(ctx)
  drawGhosts(ctx)
}

function drawMaze(ctx) {
  ctx.strokeStyle = '#2A6CD8'
  ctx.lineWidth = 2
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  /* Outline each wall tile by checking neighbors so the maze looks
     like classic Pac-Man double-line walls. Simple approach: fill the
     wall cell with a rounded rectangle, then draw a darker border. */
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (!walls[r][c]) continue
      const x = c * TILE, y = r * TILE
      ctx.fillStyle = '#0E2A8C'
      ctx.fillRect(x + 2, y + 2, TILE - 4, TILE - 4)
      ctx.fillStyle = '#2A6CD8'
      ctx.fillRect(x + 4, y + 4, TILE - 8, TILE - 8)
    }
  }

  /* Ghost door */
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (MAZE_RAW[r][c] === '-') {
        ctx.fillStyle = '#FFBBE5'
        ctx.fillRect(c * TILE + 2, r * TILE + TILE / 2 - 2, TILE - 4, 4)
      }
    }
  }
}

function drawPellets(ctx) {
  ctx.fillStyle = '#FFD9A8'
  for (const key of pellets) {
    const [c, r] = key.split(',').map(Number)
    ctx.beginPath()
    ctx.arc(c * TILE + TILE / 2, r * TILE + TILE / 2, 2, 0, Math.PI * 2)
    ctx.fill()
  }
  /* Power pellets — large and pulsing. */
  const pulse = 0.5 + 0.5 * Math.sin(performance.now() / 180)
  const size = 4 + 2 * pulse
  for (const key of powerPellets) {
    const [c, r] = key.split(',').map(Number)
    ctx.beginPath()
    ctx.arc(c * TILE + TILE / 2, r * TILE + TILE / 2, size, 0, Math.PI * 2)
    ctx.fill()
  }
}

function drawPacman(ctx) {
  if (!pac) return
  const x = entityX(pac), y = entityY(pac)
  const open = (Math.sin(pac.mouth) + 1) / 2 * 0.55 + 0.05
  let angle = 0
  if (pac.dir.x === 1) angle = 0
  else if (pac.dir.x === -1) angle = Math.PI
  else if (pac.dir.y === 1) angle = Math.PI / 2
  else if (pac.dir.y === -1) angle = -Math.PI / 2

  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(angle)
  ctx.fillStyle = '#FFEC2A'
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.arc(0, 0, TILE * 0.45, open * Math.PI, (2 - open) * Math.PI)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

function drawGhosts(ctx) {
  for (const g of ghosts) {
    const x = entityX(g), y = entityY(g)
    const radius = TILE * 0.42

    let body = g.color
    if (g.mode === 'frightened') {
      body = powerTimer < 1.5 && (Math.floor(powerTimer * 6) % 2)
        ? '#FFFFFF' : '#2348C8'
    } else if (g.mode === 'eaten') {
      body = null   /* eyes only */
    }

    if (body) {
      ctx.fillStyle = body
      ctx.beginPath()
      ctx.arc(x, y - 1, radius, Math.PI, 0)
      const baseY = y + radius - 1
      const steps = 4
      const step = (radius * 2) / steps
      ctx.lineTo(x + radius, baseY)
      for (let i = 0; i < steps; i++) {
        const sx = x + radius - i * step
        const peakY = i % 2 === 0 ? baseY - 3 : baseY
        ctx.lineTo(sx - step / 2, peakY)
        ctx.lineTo(sx - step, baseY)
      }
      ctx.closePath()
      ctx.fill()
    }

    /* Eyes */
    const eyeOffset = 3
    const ex1 = x - 4, ex2 = x + 4, ey = y - 2
    ctx.fillStyle = '#FFF'
    ctx.beginPath(); ctx.arc(ex1, ey, 3, 0, Math.PI * 2); ctx.fill()
    ctx.beginPath(); ctx.arc(ex2, ey, 3, 0, Math.PI * 2); ctx.fill()

    const pupilDx = g.mode === 'frightened' ? 0 : g.dir.x
    const pupilDy = g.mode === 'frightened' ? 0 : g.dir.y
    ctx.fillStyle = g.mode === 'frightened' ? '#FFD9A8' : '#1B1B6E'
    ctx.beginPath(); ctx.arc(ex1 + pupilDx, ey + pupilDy, 1.6, 0, Math.PI * 2); ctx.fill()
    ctx.beginPath(); ctx.arc(ex2 + pupilDx, ey + pupilDy, 1.6, 0, Math.PI * 2); ctx.fill()
  }
}

/* ── Loop ──────────────────────────────────────── */
function loop(t) {
  const dt = Math.min((t - lastTime) / 1000, 0.05)
  lastTime = t
  update(dt)
  draw()
  if (running.value) animFrame = requestAnimationFrame(loop)
}

/* ── Public actions ────────────────────────────── */
function start() {
  buildMap()
  resetEntities()
  score.value = 0
  lives.value = 3
  gameOver.value = false
  won.value = false
  paused.value = false
  statusMsg.value = 'Go!'
  running.value = true
  lastTime = performance.now()
  if (animFrame) cancelAnimationFrame(animFrame)
  animFrame = requestAnimationFrame(loop)
}

function togglePause() {
  paused.value = !paused.value
  statusMsg.value = paused.value ? 'Paused' : 'Go!'
}

function endGame(victory) {
  won.value = victory
  gameOver.value = !victory
  running.value = false
  statusMsg.value = victory ? 'You win!' : 'Game over'
  if (score.value > highScore.value) {
    highScore.value = score.value
    try { localStorage.setItem('pacman-high', String(highScore.value)) } catch {}
  }
  if (animFrame) cancelAnimationFrame(animFrame)
  animFrame = null
}

/* ── Lifecycle ─────────────────────────────────── */
onMounted(() => {
  buildMap()
  resetEntities()
  draw()                                      /* paint initial frame for overlay */
  window.addEventListener('keydown', onKeyDown)
  try {
    const v = parseInt(localStorage.getItem('pacman-high') || '0', 10)
    if (!isNaN(v)) highScore.value = v
  } catch {}
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyDown)
  if (animFrame) cancelAnimationFrame(animFrame)
  animFrame = null
  running.value = false
})
</script>

<style scoped>
.pacman-app {
  padding: 12px 14px 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: var(--xp-window);
  min-height: 100%;
}

/* ── HUD ────────────────────────────────────────── */
.hud {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  margin-bottom: 10px;
  font-size: var(--font-size-sm);
}
.hud-cell {
  background: #fff;
  border: 1px solid #7F9DB9;
  padding: 4px 8px;
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}
.hud-cell.wide { grid-column: span 1; }
.hud-label {
  font-size: 10px;
  font-weight: bold;
  color: #4A5A8A;
  letter-spacing: 0.06em;
}
.hud-value {
  font-family: 'Courier New', monospace;
  font-weight: bold;
  color: #000;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.life-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 3px;
  background: radial-gradient(circle at 35% 30%, #FFF38A 0%, #FFEC2A 50%, #C9B400 100%);
  border-radius: 50%;
  vertical-align: middle;
}
.muted { color: #888; }

/* ── Canvas ─────────────────────────────────────── */
.canvas-wrap {
  position: relative;
  display: flex;
  justify-content: center;
  background: #000;
  border: 2px solid #0E2A8C;
  box-shadow: inset 0 0 0 1px #4D6FCD, 0 2px 8px rgba(0, 0, 0, 0.35);
}
canvas {
  display: block;
  max-width: 100%;
  height: auto;
  touch-action: none;
}

/* ── Overlay ────────────────────────────────────── */
.overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.55);
}
.overlay-box {
  background: var(--xp-window);
  border: 1px solid var(--xp-window-edge);
  border-radius: 6px;
  padding: 18px 24px;
  text-align: center;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  min-width: 260px;
}
.overlay-title {
  font-family: var(--font-family-title);
  font-size: 18px;
  font-weight: bold;
  color: #0033CC;
  margin-bottom: 4px;
}
.overlay-sub {
  font-size: var(--font-size-sm);
  color: #36497B;
  margin-bottom: 12px;
}
.overlay-hint {
  margin-top: 10px;
  font-size: 11px;
  color: #4A5A8A;
}

/* .xp-btn is defined globally in assets/scss/_components.scss;
   the game's Start/Pause button just wants a slightly larger hit area. */
.xp-btn {
  min-width: 110px;
  padding: 6px 16px;
}

/* ── Controls help ──────────────────────────────── */
.controls-help {
  margin-top: 10px;
  font-size: var(--font-size-sm);
  color: #36497B;
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
}
.controls-help kbd {
  display: inline-block;
  padding: 1px 5px;
  font-family: var(--font-family);
  font-size: 11px;
  background: #fff;
  border: 1px solid #7F9DB9;
  border-radius: 2px;
  margin: 0 1px;
  box-shadow: inset 0 -1px 0 #C5D2E0;
}

/* ── Responsive ─────────────────────────────────── */
@media (max-width: 600px) {
  .pacman-app { padding: 10px; gap: 10px; }
  .hud { grid-template-columns: repeat(2, 1fr); }
}
</style>
