<template>
  <div class="xp-desktop">

    <!-- ── Workspace (desktop area above the taskbar) ── -->
    <div
      class="xp-workspace"
      :class="{ refreshing }"
      ref="workspaceRef"
      @click.self="selectedIcon = null"
      @contextmenu="onWorkspaceCtx"
    >

      <!-- ── Desktop icons (draggable) ───────────────── -->
      <button
        type="button"
        class="xp-icon"
        :class="{ selected: selectedIcon === 'portfolio' }"
        :style="{ left: iconPositions.portfolio.x + 'px', top: iconPositions.portfolio.y + 'px' }"
        @mousedown.stop="startIconDrag('portfolio', $event)"
        @touchstart.passive.stop="startIconDrag('portfolio', $event)"
        @click.stop="selectedIcon = 'portfolio'"
        @dblclick="openPortfolio"
        @contextmenu.prevent.stop="openIconMenu('portfolio', $event)"
      >
        <span class="xp-icon-glyph">
          <img src="/favicon.svg" alt="" draggable="false" onerror="this.style.display='none'" />
        </span>
        <span class="xp-icon-label">Portfolio</span>
      </button>
      <button
        type="button"
        class="xp-icon"
        :class="{ selected: selectedIcon === 'pacman' }"
        :style="{ left: iconPositions.pacman.x + 'px', top: iconPositions.pacman.y + 'px' }"
        @mousedown.stop="startIconDrag('pacman', $event)"
        @touchstart.passive.stop="startIconDrag('pacman', $event)"
        @click.stop="selectedIcon = 'pacman'"
        @dblclick="launchPacman"
        @contextmenu.prevent.stop="openIconMenu('pacman', $event)"
      >
        <span class="xp-icon-glyph pacman-glyph">
          <span class="pacman-glyph-shape"></span>
        </span>
        <span class="xp-icon-label">Pac-Man</span>
      </button>

      <!-- ── The Window ──────────────────────────────── -->
      <div
        class="xp-window"
        :class="{ maximized: isMaximized, minimized: isMinimized, dragging: isDragging }"
        :style="[windowStyle, { zIndex: wm.zOf('portfolio') }]"
        @mousedown="wm.focus('portfolio')"
      >

      <!-- Title bar -->
      <header
        class="xp-titlebar"
        @mousedown="startDrag"
        @touchstart.passive="startDrag"
        @dblclick="toggleMaximize"
      >
        <div class="xp-title-text">
          <img src="/favicon.svg" alt="" class="xp-title-icon" onerror="this.style.display='none'" />
          <span>{{ profile.username }} — Portfolio</span>
        </div>
        <div class="xp-title-buttons">
          <button class="xp-tbtn min" aria-label="Minimize" @click="minimize"></button>
          <button
            class="xp-tbtn max"
            :aria-label="isMaximized ? 'Restore' : 'Maximize'"
            @click="toggleMaximize"
          ></button>
          <button class="xp-tbtn close" aria-label="Close" @click="minimize"></button>
        </div>
      </header>

      <!-- Menu bar -->
      <div class="xp-menubar">
        <span class="menu-item"><u>F</u>ile</span>
        <span class="menu-item"><u>E</u>dit</span>
        <span class="menu-item"><u>V</u>iew</span>
        <span class="menu-item">F<u>a</u>vorites</span>
        <span class="menu-item"><u>T</u>ools</span>
        <span class="menu-item"><u>H</u>elp</span>
      </div>

      <!-- Toolbar -->
      <div class="xp-toolbar">
        <button class="tb-btn" aria-label="Back" @click="goBack" :disabled="!canGoBack">
          <span class="tb-arrow">◀</span><span class="tb-label">Back</span>
        </button>
        <button class="tb-btn" aria-label="Forward" disabled>
          <span class="tb-arrow">▶</span>
        </button>
        <span class="tb-divider"></span>
        <button class="tb-btn icon" aria-label="Search" @click="sidebarOpen = !sidebarOpen">
          <span class="tb-search-icon">🔍</span><span class="tb-label">Folders</span>
        </button>
      </div>

      <!-- Address bar -->
      <div class="xp-addressbar">
        <span class="addr-label">Address</span>
        <div class="addr-input">
          <span class="addr-icon"></span>
          <span class="addr-path">C:\Portfolio\{{ currentFile }}</span>
        </div>
        <button class="addr-go">Go</button>
      </div>

      <!-- Body: task pane + content -->
      <div class="xp-body">
        <div v-if="sidebarOpen" class="sidebar-overlay" @click="sidebarOpen = false"></div>

        <aside class="xp-sidebar" :class="{ open: sidebarOpen }">
          <main-navbar @navigate="sidebarOpen = false" />
        </aside>

        <main class="xp-content">
          <slot />
        </main>
      </div>

      <!-- In-window status bar -->
      <footer class="xp-statusbar">
        <span class="status-cell main">{{ statusText }}</span>
        <span class="status-cell">My Computer</span>
        <span class="status-resize"></span>
      </footer>

      </div><!-- /.xp-window -->
    </div><!-- /.xp-workspace -->

    <!-- ── Taskbar ─────────────────────────────────── -->
    <div class="xp-taskbar">
      <button class="xp-start" @click="startOpen = !startOpen">
        <span class="xp-start-flag">
          <span class="flag-q1"></span><span class="flag-q2"></span>
          <span class="flag-q3"></span><span class="flag-q4"></span>
        </span>
        <span class="xp-start-label">start</span>
      </button>

      <div class="xp-tasks">
        <button
          v-for="t in tasks"
          :key="t.id"
          class="xp-task"
          :class="{ active: t.focused && !t.minimized }"
          @click="wm.toggle(t.id)"
        >
          <img v-if="t.img" :src="t.img" alt="" class="task-icon" onerror="this.style.display='none'" />
          <span v-else class="task-emoji">{{ t.icon }}</span>
          <span class="task-label">{{ t.title }}</span>
        </button>
      </div>

      <div class="xp-tray">
        <span class="tray-icon" title="Volume">🔊</span>
        <span class="tray-icon" title="Network">📶</span>
        <span class="tray-clock">{{ clock }}</span>
      </div>
    </div>

    <!-- ── Start menu (optional, opens on click) ───── -->
    <div v-if="startOpen" class="xp-startmenu" @click.self="startOpen = false">
      <div class="sm-panel">
        <div class="sm-header">
          <img
            :src="profile.avatar.src"
            :srcset="profile.avatar.srcset"
            sizes="44px"
            alt=""
            class="sm-avatar"
          />
          <span class="sm-username">{{ profile.name }}</span>
        </div>
        <div class="sm-body">
          <div class="sm-col sm-col-left">
            <NuxtLink to="/" class="sm-item" @click="startOpen = false">
              <span class="sm-bullet">📄</span><span>Home</span>
            </NuxtLink>
            <NuxtLink to="/about" class="sm-item" @click="startOpen = false">
              <span class="sm-bullet">👤</span><span>About me</span>
            </NuxtLink>
            <div class="sm-item" @click.stop="openCmd">
              <span class="sm-bullet">⌨️</span><span>Command Prompt</span>
            </div>
            <div class="sm-sep"></div>
            <a :href="profile.socials.github" target="_blank" rel="noopener" class="sm-item">
              <span class="sm-bullet">🐙</span><span>GitHub</span>
            </a>
            <a :href="profile.socials.linkedin" target="_blank" rel="noopener" class="sm-item">
              <span class="sm-bullet">💼</span><span>LinkedIn</span>
            </a>
            <a :href="profile.socials.blog" target="_blank" rel="noopener" class="sm-item">
              <span class="sm-bullet">✍️</span><span>Blog</span>
            </a>
          </div>
          <div class="sm-col sm-col-right">
            <div class="sm-item disabled"><span class="sm-bullet">📂</span><span>My Documents</span></div>
            <div class="sm-item" @click.stop="openPhotos">
              <span class="sm-bullet">🖼️</span><span>My Pictures</span>
            </div>
            <div class="sm-item" @click.stop="launchPacman">
              <span class="sm-bullet">🎮</span><span>Pac-Man</span>
            </div>
            <div class="sm-sep"></div>
            <div class="sm-item disabled"><span class="sm-bullet">⚙️</span><span>Control Panel</span></div>
            <NuxtLink to="/contact" class="sm-item" @click="startOpen = false">
              <span class="sm-bullet">❓</span><span>Help and Support</span>
            </NuxtLink>
          </div>
        </div>
        <div class="sm-footer">
          <button class="sm-foot-btn" @click="startOpen = false">
            <span class="sm-bullet">🔒</span><span>Log Off</span>
          </button>
          <button class="sm-foot-btn" @click="startOpen = false">
            <span class="sm-bullet">⏻</span><span>Turn Off Computer</span>
          </button>
        </div>
      </div>
    </div>

    <!-- ── Right-click context menu ────────────────── -->
    <xp-context-menu
      v-if="ctxMenu"
      :items="ctxMenu.items"
      :x="ctxMenu.x"
      :y="ctxMenu.y"
      @select="onCtxSelect"
      @close="ctxMenu = null"
    />

    <!-- ── App windows (Pac-Man, Command Prompt, …) ── -->
    <XpWindow
      v-for="w in appWindows"
      :key="w.id"
      :title="w.title"
      :icon="w.icon"
      :x="w.x"
      :y="w.y"
      :w="w.w"
      :h="w.h"
      :z="wm.zOf(w.id)"
      :minimized="wm.isMinimized(w.id)"
      :focused="wm.focusedId.value === w.id"
      :maximizable="w.maximizable"
      @focus="wm.focus(w.id)"
      @minimize="wm.minimize(w.id)"
      @close="wm.close(w.id)"
      @move="(x, y) => wm.setPos(w.id, x, y)"
    >
      <component
        :is="APP_COMPONENTS[w.app]"
        :win-id="w.id"
        :focused="wm.focusedId.value === w.id"
      />
    </XpWindow>

    <!-- ── Boot + Welcome screen (first load) ──────── -->
    <xp-boot v-if="booting" @done="finishBoot" />

  </div>
</template>

<script setup>
import { markRaw } from 'vue'
import { profile } from '~/data/profile'
import PacmanApp from '~/components/apps/PacmanApp.vue'
import CmdApp from '~/components/apps/CmdApp.vue'
import PhotoApp from '~/components/apps/PhotoApp.vue'

const route = useRoute()
const router = useRouter()

/* ── Window manager ──────────────────────────────────
   All windows (the pinned Portfolio explorer + every app window)
   share one z-order, focus model and taskbar. To add a tool: create a
   components/apps/*.vue, register it in composables/useWindows.js, and
   map its key → component here. */
const wm = useWindows()
const APP_COMPONENTS = {
  pacman: markRaw(PacmanApp),
  cmd: markRaw(CmdApp),
  photos: markRaw(PhotoApp),
}
wm.registerPortfolio({ title: `${profile.username} — Portfolio`, img: '/favicon.svg' })

const appWindows = wm.apps          /* reactive array of open app windows */
const tasks = wm.tasks              /* taskbar buttons (computed) */

const isMinimized = computed(() => wm.isMinimized('portfolio'))

const sidebarOpen = ref(false)
const startOpen = ref(false)
const clock = ref('')
const selectedIcon = ref(null)

const workspaceRef = ref(null)

/* ── Boot + Welcome screen (once per browser session) ── */
const booting = ref(true)
function finishBoot() {
  booting.value = false
  try { sessionStorage.setItem('xp-booted', '1') } catch {}
}

/* ── Right-click context menus ───────────────────── */
const ctxMenu = ref(null)
const refreshing = ref(false)

function onWorkspaceCtx(e) {
  /* Only the desktop background gets the XP menu; inside a window we
     leave the native menu so text stays selectable/copyable. */
  if (e.target.closest('.xp-window')) return
  e.preventDefault()
  selectedIcon.value = null
  ctxMenu.value = { x: e.clientX, y: e.clientY, items: desktopMenuItems() }
}
function openIconMenu(id, e) {
  selectedIcon.value = id
  ctxMenu.value = { x: e.clientX, y: e.clientY, items: iconMenuItems(id) }
}
function desktopMenuItems() {
  return [
    { label: 'Arrange Icons By', icon: '▦', children: [
      { label: 'Name', action: 'arrange' },
      { label: 'Auto Arrange', action: 'arrange' },
    ] },
    { label: 'Refresh', icon: '⟳', action: 'refresh' },
    { separator: true },
    { label: 'Paste', disabled: true },
    { label: 'Paste Shortcut', disabled: true },
    { separator: true },
    { label: 'Open Command Prompt', icon: '⌨️', action: 'cmd' },
    { label: 'New', disabled: true },
    { separator: true },
    { label: 'Properties', disabled: true },
  ]
}
function iconMenuItems(id) {
  return [
    { label: 'Open', bold: true, action: id === 'pacman' ? 'open-pacman' : 'open-portfolio' },
    { separator: true },
    { label: 'Cut', disabled: true },
    { label: 'Copy', disabled: true },
    { separator: true },
    { label: 'Delete', disabled: true },
    { label: 'Rename', disabled: true },
    { separator: true },
    { label: 'Properties', disabled: true },
  ]
}
function onCtxSelect(action) {
  switch (action) {
    case 'refresh': doRefresh(); break
    case 'arrange': arrangeIcons(); break
    case 'cmd': openCmd(); break
    case 'open-portfolio': openPortfolio(); break
    case 'open-pacman': launchPacman(); break
  }
}
function doRefresh() {
  refreshing.value = true
  setTimeout(() => { refreshing.value = false }, 180)
}
function arrangeIcons() {
  iconPositions.portfolio = { x: 12, y: 12 }
  iconPositions.pacman = { x: 12, y: 100 }
  try { localStorage.setItem(ICON_STORAGE_KEY, JSON.stringify(iconPositions)) } catch {}
}

/* ── App launchers ───────────────────────────────── */
function openCmd() {
  startOpen.value = false
  ctxMenu.value = null
  wm.open('cmd')
}
function launchPacman() {
  startOpen.value = false
  ctxMenu.value = null
  selectedIcon.value = null
  wm.open('pacman')
}

/* ── Desktop icon positions (draggable, persisted) ── */
const ICON_STORAGE_KEY = 'xp-icon-positions'
const iconPositions = reactive({
  portfolio: { x: 12, y: 12 },
  pacman:    { x: 12, y: 100 },
})

let iconDrag = null

function startIconDrag(id, e) {
  /* preventDefault on mousedown blocks the browser's native image
     drag-and-drop, which would otherwise swallow mousemove/mouseup
     and leave the icon "following" the cursor. */
  if (!e.touches && e.cancelable) e.preventDefault()
  const point = e.touches?.[0] || e
  iconDrag = {
    id,
    startX: iconPositions[id].x,
    startY: iconPositions[id].y,
    mouseX: point.clientX,
    mouseY: point.clientY,
    moved: false,
    isTouch: !!e.touches,
  }
  selectedIcon.value = id
  window.addEventListener('mousemove', onIconDrag)
  window.addEventListener('mouseup', endIconDrag)
  window.addEventListener('touchmove', onIconDrag, { passive: false })
  window.addEventListener('touchend', endIconDrag)
  window.addEventListener('touchcancel', endIconDrag)
}

function onIconDrag(e) {
  if (!iconDrag) return
  const point = e.touches?.[0] || e
  const dx = point.clientX - iconDrag.mouseX
  const dy = point.clientY - iconDrag.mouseY
  if (!iconDrag.moved && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) {
    iconDrag.moved = true
  }
  if (!iconDrag.moved) return
  if (e.cancelable) e.preventDefault()
  const ws = workspaceRef.value
  const maxX = (ws?.clientWidth  || window.innerWidth)  - 80
  const maxY = (ws?.clientHeight || window.innerHeight) - 90
  iconPositions[iconDrag.id].x = Math.max(0, Math.min(maxX, iconDrag.startX + dx))
  iconPositions[iconDrag.id].y = Math.max(0, Math.min(maxY, iconDrag.startY + dy))
}

function endIconDrag() {
  /* On touch devices, a tap without drag opens the icon — dblclick
     is unreliable on phones, so the first tap acts as "open". */
  const tap = !!(iconDrag && iconDrag.isTouch && !iconDrag.moved)
  const tappedId = iconDrag?.id
  if (iconDrag?.moved) {
    try { localStorage.setItem(ICON_STORAGE_KEY, JSON.stringify(iconPositions)) } catch {}
  }
  iconDrag = null
  window.removeEventListener('mousemove', onIconDrag)
  window.removeEventListener('mouseup', endIconDrag)
  window.removeEventListener('touchmove', onIconDrag)
  window.removeEventListener('touchend', endIconDrag)
  window.removeEventListener('touchcancel', endIconDrag)
  if (tap) {
    if (tappedId === 'portfolio') openPortfolio()
    else if (tappedId === 'pacman') launchPacman()
  }
}

function loadIconPositions() {
  try {
    const saved = JSON.parse(localStorage.getItem(ICON_STORAGE_KEY) || 'null')
    if (saved && typeof saved === 'object') {
      for (const id of Object.keys(iconPositions)) {
        if (saved[id]
            && typeof saved[id].x === 'number'
            && typeof saved[id].y === 'number') {
          iconPositions[id] = saved[id]
        }
      }
    }
  } catch {}
}

/* ── Window state ───────────────────────────────── */
/* isMinimized is a computed backed by the window manager (declared near
   the top of setup); maximize/geometry stay local to the explorer. */
const isMaximized = ref(true)   /* will flip to false on desktop in onMounted */
const isDragging = ref(false)
const pos = ref({ x: 40, y: 24 })
const size = ref({ w: 1100, h: 700 })

const windowStyle = computed(() => {
  if (isMaximized.value) return {}
  return {
    left: pos.value.x + 'px',
    top: pos.value.y + 'px',
    width: size.value.w + 'px',
    height: size.value.h + 'px',
  }
})

/* Drag handling ----------------------------------- */
let dragStart = null

function startDrag(e) {
  if (isMaximized.value) return
  if (e.target.closest('.xp-title-buttons')) return
  const point = e.touches?.[0] || e
  dragStart = {
    px: point.clientX,
    py: point.clientY,
    x: pos.value.x,
    y: pos.value.y,
  }
  isDragging.value = true
  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', endDrag)
  window.addEventListener('touchmove', onDrag, { passive: false })
  window.addEventListener('touchend', endDrag)
}

function onDrag(e) {
  if (!dragStart) return
  if (e.cancelable) e.preventDefault()
  const point = e.touches?.[0] || e
  const ws = workspaceRef.value
  const maxX = ws ? ws.clientWidth - 80 : window.innerWidth - 80
  const maxY = ws ? ws.clientHeight - 30 : window.innerHeight - 30
  const minX = -(size.value.w - 120)
  pos.value = {
    x: Math.max(minX, Math.min(maxX, dragStart.x + (point.clientX - dragStart.px))),
    y: Math.max(0, Math.min(maxY, dragStart.y + (point.clientY - dragStart.py))),
  }
}

function endDrag() {
  dragStart = null
  isDragging.value = false
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', endDrag)
  window.removeEventListener('touchmove', onDrag)
  window.removeEventListener('touchend', endDrag)
}

function toggleMaximize() {
  if (isMinimized.value) {
    wm.restore('portfolio')
    return
  }
  isMaximized.value = !isMaximized.value
}

function minimize() {
  wm.minimize('portfolio')
}

function openPortfolio() {
  selectedIcon.value = null
  startOpen.value = false
  wm.restore('portfolio')
  if (route.path !== '/') router.push('/')
}

/* ── Photo viewer ───────────────────────────────── */
function openPhotos() {
  startOpen.value = false
  wm.open('photos')
}

function fitWindow() {
  if (typeof window === 'undefined') return
  const small = window.innerWidth < 900
  if (small) {
    isMaximized.value = true
    return
  }
  isMaximized.value = false
  const w = Math.min(1100, window.innerWidth - 80)
  const h = Math.min(700, window.innerHeight - 80)
  size.value = { w, h }
  pos.value = {
    x: Math.max(20, Math.round((window.innerWidth - w) / 2)),
    y: Math.max(20, Math.round((window.innerHeight - 30 - h) / 2)),
  }
}

/* ── Visible viewport height ────────────────────────
   Pin the desktop to the actual visible area. On mobile, dvh isn't
   always accurate (older browsers, in-app webviews, address-bar
   transitions), so window.innerHeight / visualViewport.height wins. */
function updateAppHeight() {
  if (typeof window === 'undefined') return
  const h = window.visualViewport?.height ?? window.innerHeight
  document.documentElement.style.setProperty('--app-height', `${h}px`)
}

/* ── Address bar / status text ──────────────────── */
const currentFile = computed(() => {
  const p = route.path
  if (p === '/') return 'home'
  return p.replace(/^\//, '').replace(/\/$/, '').replace(/\//g, '\\')
})

const statusText = computed(() => {
  const p = route.path
  if (p === '/') return 'Welcome'
  return 'Done'
})

const canGoBack = computed(() => route.path !== '/')
const goBack = () => { if (canGoBack.value) router.back() }

/* ── Clock ──────────────────────────────────────── */
let clockTimer
function updateClock() {
  const d = new Date()
  let h = d.getHours()
  const m = d.getMinutes().toString().padStart(2, '0')
  const ampm = h >= 12 ? 'PM' : 'AM'
  h = h % 12 || 12
  clock.value = `${h}:${m} ${ampm}`
}

onMounted(() => {
  /* Boot animation plays once per session; skip it on later loads. */
  try { if (sessionStorage.getItem('xp-booted')) booting.value = false } catch {}
  updateClock()
  clockTimer = setInterval(updateClock, 30000)
  updateAppHeight()
  fitWindow()
  loadIconPositions()
  window.addEventListener('resize', fitWindow)
  window.addEventListener('resize', updateAppHeight)
  window.addEventListener('orientationchange', updateAppHeight)
  window.visualViewport?.addEventListener('resize', updateAppHeight)
})

onBeforeUnmount(() => {
  clearInterval(clockTimer)
  window.removeEventListener('resize', fitWindow)
  window.removeEventListener('resize', updateAppHeight)
  window.removeEventListener('orientationchange', updateAppHeight)
  window.visualViewport?.removeEventListener('resize', updateAppHeight)
  endDrag()
  endIconDrag()
})

watch(() => route.path, () => {
  sidebarOpen.value = false
  startOpen.value = false
  /* A navigation means the explorer content changed — make sure it's
     visible (and brought forward) even if it was minimised. */
  if (wm.isMinimized('portfolio')) wm.restore('portfolio')
})
</script>

<style scoped>
/* ── Desktop ─────────────────────────────────────── */
.xp-desktop {
  /* --app-height is set from JS (window.innerHeight) so the layout
     always matches the visual viewport, even when the mobile browser's
     URL bar collapses or the on-screen keyboard appears. dvh / vh are
     fallbacks for the first paint before JS runs. */
  height: 100vh;
  height: 100dvh;
  height: var(--app-height, 100dvh);
  width: 100vw;
  overflow: hidden;
  display: grid;
  grid-template-rows: 1fr calc(var(--taskbar-h) + env(safe-area-inset-bottom, 0px));
  font-family: var(--font-family);
}

/* ── Workspace (containing block for the window) ── */
.xp-workspace {
  position: relative;
  overflow: hidden;
}
/* Desktop "Refresh" briefly blinks the icons, like a real repaint. */
.xp-workspace.refreshing .xp-icon { opacity: 0; }

/* ── Desktop icons ───────────────────────────────── */
.xp-icon {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 76px;
  padding: 4px 2px 6px;
  background: transparent;
  border: 1px dotted transparent;
  border-radius: 2px;
  cursor: pointer;
  color: #fff;
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  text-align: center;
  user-select: none;
  -webkit-user-select: none;
  -webkit-user-drag: none;
  touch-action: none;
}
.xp-icon img {
  -webkit-user-drag: none;
  pointer-events: none;
}

.xp-icon:hover .xp-icon-glyph img {
  filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.45))
          brightness(1.05);
}

.xp-icon.selected {
  background: rgba(49, 106, 197, 0.45);
  border: 1px dotted #fff;
}
.xp-icon.selected .xp-icon-glyph img {
  filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.45)) saturate(0.7) brightness(0.85);
}

.xp-icon-glyph {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
}
.xp-icon-glyph img {
  width: 36px;
  height: 36px;
  filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.45));
}

.pacman-glyph {
  filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.45));
}
.pacman-glyph-shape {
  display: block;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background:
    conic-gradient(
      from -30deg,
      transparent 0deg 60deg,
      #FFEC2A 60deg 360deg);
  box-shadow: inset 6px 6px 8px rgba(255, 243, 138, 0.7);
}
.xp-icon.selected .pacman-glyph-shape {
  filter: saturate(0.7) brightness(0.85);
}

.xp-icon-label {
  padding: 1px 3px;
  line-height: 1.2;
  text-shadow:
    1px 1px 1px rgba(0, 0, 0, 0.7),
    0 0 2px rgba(0, 0, 0, 0.5);
  word-break: break-word;
  max-width: 100%;
}
.xp-icon.selected .xp-icon-label {
  background: var(--xp-selection);
  text-shadow: none;
}

/* ── The Window ──────────────────────────────────── */
.xp-window {
  position: absolute;
  left: 40px;
  top: 24px;
  width: 1100px;
  height: 700px;
  display: grid;
  grid-template-rows:
    var(--titlebar-h) var(--menubar-h) auto var(--addressbar-h)
    1fr var(--statusbar-h);
  /* XP.css .window frame: a 3px layered blue bevel drawn with inset
     shadows. Side padding reveals it alongside the body; the title bar
     bleeds back over it (margin: 0 -3px) to stay flush at the top. */
  border: none;
  border-radius: 8px 8px 0 0;
  padding: 0 3px 3px;
  box-shadow:
    inset -1px -1px #00138c, inset 1px 1px #0831d9,
    inset -2px -2px #001ea0, inset 2px 2px #166aee,
    inset -3px -3px #003bda, inset 3px 3px #0855dd,
    0 8px 28px rgba(0, 0, 0, 0.45);
  overflow: hidden;
  background: var(--xp-window);
  transition: transform 0.18s ease, opacity 0.18s ease;
  will-change: transform;
}

.xp-window.dragging {
  transition: none;
  user-select: none;
}

.xp-window.maximized {
  left: 0 !important;
  top: 0 !important;
  width: 100% !important;
  height: 100% !important;
  border-radius: 0;
  padding: 0;
  box-shadow: none;
}
.xp-window.maximized .xp-titlebar { border-radius: 0; margin: 0; }

.xp-window.minimized {
  transform: translate(-40%, 120vh) scale(0.6);
  opacity: 0;
  pointer-events: none;
}

/* ── Title bar ───────────────────────────────────── */
.xp-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* Bleed 3px over the window's side padding so the title bar sits flush
     with the outer bevel, exactly like XP.css's .title-bar. */
  margin: 0 -3px;
  padding: 0 3px 0 6px;
  /* Exact Luna gradient + inset text shadow from XP.css .title-bar */
  background: var(--xp-luna-titlebar);
  color: #fff;
  font-family: var(--font-family-title);
  font-weight: bold;
  font-size: 13px;
  text-shadow: 1px 1px #0f1089;
  user-select: none;
  border-radius: 8px 8px 0 0;
  cursor: grab;
}
.xp-window.dragging .xp-titlebar { cursor: grabbing; }
.xp-window.maximized .xp-titlebar { cursor: default; }
.xp-title-buttons button { cursor: pointer; }

.xp-title-text {
  display: flex;
  align-items: center;
  gap: 6px;
  padding-left: 2px;
  overflow: hidden;
  white-space: nowrap;
}
.xp-title-icon {
  width: 16px;
  height: 16px;
  filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.4));
}

.xp-title-buttons {
  display: flex;
  align-items: center;
  gap: 0;
}
/* The .xp-tbtn window controls (Minimize / Maximize / Restore / Close)
   are styled globally in assets/scss/_xp-controls.scss using XP.css's
   pixel-perfect SVGs. */

/* ── Menu bar ────────────────────────────────────── */
.xp-menubar {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 0 4px;
  background: var(--xp-window);
  border-bottom: 1px solid var(--xp-divider);
  font-size: var(--font-size-sm);
  user-select: none;
}
.menu-item {
  padding: 2px 8px;
  cursor: default;
  color: #000;
}
.menu-item:hover {
  background: var(--xp-selection);
  color: #fff;
}
.menu-item u { text-decoration: underline; }

/* ── Toolbar ─────────────────────────────────────── */
.xp-toolbar {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 6px;
  background: linear-gradient(180deg, #F1EFE2 0%, #ECE9D8 100%);
  border-bottom: 1px solid var(--xp-divider);
  flex-shrink: 0;
}
.tb-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 8px;
  height: 26px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 3px;
  cursor: pointer;
  color: #000;
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
}
.tb-btn:hover:not(:disabled) {
  background: linear-gradient(180deg, #FFFCE7 0%, #FFE9A5 100%);
  border-color: #C0985C;
}
.tb-btn:active:not(:disabled) {
  background: linear-gradient(180deg, #FFE9A5 0%, #FFD37A 100%);
  border-color: #8C6C30;
}
.tb-btn:disabled { color: #9E9E9E; cursor: default; }
.tb-arrow { font-size: 11px; }
.tb-label { font-size: var(--font-size-sm); }
.tb-divider {
  width: 1px;
  height: 18px;
  background: var(--xp-divider);
  margin: 0 2px;
}
.tb-search-icon { font-size: 12px; }

/* ── Address bar ─────────────────────────────────── */
.xp-addressbar {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 6px;
  background: linear-gradient(180deg, #F1EFE2 0%, #ECE9D8 100%);
  border-bottom: 1px solid var(--xp-divider);
}
.addr-label {
  font-size: var(--font-size-sm);
  color: #4A4A4A;
  padding: 0 4px;
  user-select: none;
}
.addr-input {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 4px;
  height: 22px;
  padding: 0 4px;
  background: #fff;
  border: 1px solid #7F9DB9;
  font-size: var(--font-size-sm);
  color: #000;
  font-family: var(--font-family);
  overflow: hidden;
  white-space: nowrap;
}
.addr-icon {
  width: 14px;
  height: 14px;
  background:
    linear-gradient(180deg, #FFE99C 0%, #FFC93B 100%);
  border: 1px solid #C28F1A;
  border-radius: 1px;
  flex-shrink: 0;
}
.addr-path { overflow: hidden; text-overflow: ellipsis; }
.addr-go {
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 10px;
  background: linear-gradient(180deg, #FCFCFC 0%, #ECE9D8 100%);
  border: 1px solid #ACA899;
  border-radius: 2px;
  cursor: pointer;
  font-size: var(--font-size-sm);
}
.addr-go:hover { background: linear-gradient(180deg, #FFFFFF 0%, #F0EDDD 100%); }

/* ── Body ────────────────────────────────────────── */
.xp-body {
  display: flex;
  overflow: hidden;
  position: relative;
  background: var(--xp-window);
}

.xp-sidebar {
  width: var(--sidebar-w);
  flex-shrink: 0;
  overflow-y: auto;
  background: linear-gradient(180deg, var(--xp-rail-1) 0%, var(--xp-rail-2) 100%);
  transition: transform 0.2s ease;
}

.sidebar-overlay { display: none; }

.xp-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  background: var(--xp-window);
  min-width: 0;
}

/* ── In-window status bar ────────────────────────── */
.xp-statusbar {
  display: flex;
  align-items: stretch;
  background: var(--xp-window);
  border-top: 1px solid #FFFFFF;
  box-shadow: inset 0 1px 0 var(--xp-divider);
  font-size: var(--font-size-sm);
  color: #000;
}
.status-cell {
  display: flex;
  align-items: center;
  padding: 0 8px;
  border-right: 1px solid var(--xp-divider);
  box-shadow:
    inset 1px 1px 0 #ACA899,
    inset -1px -1px 0 #FFFFFF;
}
.status-cell.main { flex: 1; }
.status-resize {
  width: 18px;
  background:
    linear-gradient(135deg,
      transparent 0%, transparent 45%,
      #ACA899 45%, #ACA899 50%,
      transparent 50%, transparent 65%,
      #ACA899 65%, #ACA899 70%,
      transparent 70%, transparent 85%,
      #ACA899 85%, #ACA899 90%,
      transparent 90%);
}

/* ── Taskbar ─────────────────────────────────────── */
.xp-taskbar {
  display: flex;
  align-items: stretch;
  height: calc(var(--taskbar-h) + env(safe-area-inset-bottom, 0px));
  padding-bottom: env(safe-area-inset-bottom, 0px);
  background:
    linear-gradient(180deg,
      #1F3FA5 0%,
      var(--xp-taskbar-2) 8%,
      var(--xp-taskbar-1) 50%,
      var(--xp-taskbar-2) 92%,
      #1F3FA5 100%);
  border-top: 1px solid #0831D9;
  box-shadow: inset 0 1px 0 #6090F0;
  position: relative;
  z-index: 90;
}

/* Start button */
.xp-start {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 22px 0 8px;
  height: 100%;
  background:
    linear-gradient(180deg,
      #5EAC56 0%,
      #4FA052 8%,
      var(--xp-start-2) 50%,
      #336F31 92%,
      #245021 100%);
  border: none;
  border-right: 1px solid #245021;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  color: #fff;
  cursor: pointer;
  font-family: var(--font-family-title);
  font-style: italic;
  font-size: 17px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.55);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.4),
    inset 0 -1px 0 rgba(0, 0, 0, 0.25);
}
.xp-start:hover {
  background:
    linear-gradient(180deg,
      #6FBC65 0%, #5BA958 8%,
      #4A9E47 50%, #3D8538 92%, #2C6429 100%);
}

.xp-start-flag {
  display: grid;
  grid-template-columns: 8px 8px;
  grid-template-rows: 8px 8px;
  gap: 1px;
  transform: rotate(-12deg) skew(-8deg, 0);
  filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.3));
}
.flag-q1 { background: #E04A3E; border-radius: 2px 0 0 0; }
.flag-q2 { background: #5EAC56; border-radius: 0 2px 0 0; }
.flag-q3 { background: #3F8CF3; border-radius: 0 0 0 2px; }
.flag-q4 { background: #FFC83D; border-radius: 0 0 2px 0; }

.xp-start-label { letter-spacing: 0.02em; }

/* Task list */
.xp-tasks {
  display: flex;
  gap: 3px;
  padding: 3px 4px;
  align-items: stretch;
  flex: 1;
  min-width: 0;
}
.xp-task {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 8px;
  height: 100%;
  min-width: 0;
  max-width: 220px;
  background: linear-gradient(180deg, #3F8CF3 0%, #245EDB 100%);
  border: 1px solid #0831D9;
  border-radius: 3px;
  color: #fff;
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.35);
  cursor: pointer;
  box-shadow:
    inset 1px 1px 0 rgba(255, 255, 255, 0.3),
    inset -1px -1px 0 rgba(0, 0, 0, 0.2);
}
.xp-task.active {
  background: linear-gradient(180deg, #1A4BAE 0%, #2A6CD8 100%);
  box-shadow:
    inset 1px 1px 0 rgba(0, 0, 0, 0.3),
    inset -1px -1px 0 rgba(255, 255, 255, 0.2);
}
.task-icon { width: 14px; height: 14px; flex-shrink: 0; }
.task-emoji { font-size: 13px; line-height: 1; flex-shrink: 0; }
.task-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Tray */
.xp-tray {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 10px 0 8px;
  margin: 3px 3px 3px 0;
  background: linear-gradient(180deg, #1042B2 0%, #1B58CB 50%, #1042B2 100%);
  border-radius: 3px;
  border: 1px solid #0A2980;
  box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.15);
  color: #fff;
  font-size: var(--font-size-sm);
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);
}
.tray-icon { opacity: 0.95; font-size: 12px; line-height: 1; }
.tray-clock { padding-left: 4px; min-width: 64px; text-align: center; }

/* ── Start menu ──────────────────────────────────── */
.xp-startmenu {
  position: fixed;
  inset: 0;
  z-index: 95;
}
.sm-panel {
  position: absolute;
  left: 0;
  bottom: calc(var(--taskbar-h) + env(safe-area-inset-bottom, 0px));
  width: 380px;
  max-width: 95vw;
  background: var(--xp-window);
  border: 1px solid #003BB5;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  font-size: var(--font-size-sm);
}
.sm-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  /* Same Luna gradient as the window title bar (was a mismatched
     symmetric glass gradient before). */
  background: var(--xp-luna-titlebar);
  color: #fff;
  font-family: var(--font-family-title);
  font-weight: bold;
  font-size: 14px;
  text-shadow: 1px 1px #0f1089;
  border-bottom: 2px solid #FF9923;
}
.sm-avatar {
  width: 44px;
  height: 44px;
  border-radius: 4px;
  border: 2px solid #fff;
  object-fit: cover;
  box-shadow: 0 0 0 1px #003BB5;
}
.sm-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: linear-gradient(90deg, #fff 0%, #fff 50%, #D8E4F8 50%, #D8E4F8 100%);
}
.sm-col { padding: 8px 4px; }
.sm-col-right { background: #D8E4F8; }
.sm-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 10px;
  color: #000;
  cursor: pointer;
  border-radius: 2px;
  text-decoration: none;
}
.sm-item:hover:not(.disabled) {
  background: var(--xp-selection);
  color: #fff;
}
.sm-item.disabled { color: #8A8A8A; cursor: default; }
.sm-bullet { width: 18px; text-align: center; flex-shrink: 0; }
.sm-sep {
  height: 1px;
  background: var(--xp-divider);
  margin: 4px 8px;
}
.sm-footer {
  display: flex;
  justify-content: flex-end;
  gap: 6px;
  padding: 6px 10px;
  background:
    linear-gradient(180deg, #BFD0EE 0%, #8AAEE0 100%);
  border-top: 1px solid #4D6FCD;
}
.sm-foot-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 3px;
  color: #000;
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  cursor: pointer;
}
.sm-foot-btn:hover {
  background: rgba(255, 255, 255, 0.4);
  border-color: #4D6FCD;
}

/* ── Mobile ──────────────────────────────────────── */
@media (max-width: 900px) {
  /* Anchor the taskbar to the visual-viewport bottom on mobile. Grid
     placement alone can fail on phones because the workspace's 1fr row
     resolves against the layout viewport, leaving the taskbar below
     the visible area when the URL bar is showing. */
  .xp-desktop {
    grid-template-rows: 1fr 0;
  }
  .xp-taskbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 90;
  }
  .xp-window {
    /* Forced full-bleed on small screens (also locked by JS) */
    left: 0 !important;
    top: 0 !important;
    width: 100% !important;
    height: calc(100% - var(--taskbar-h) - env(safe-area-inset-bottom, 0px)) !important;
    border-radius: 0;
    padding: 0;
    box-shadow: none;
    /* Drop the menubar + in-window statusbar rows on mobile. */
    grid-template-rows:
      var(--titlebar-h) auto var(--addressbar-h) 1fr;
  }
  .xp-titlebar { cursor: default; border-radius: 0; margin: 0; }
  .xp-menubar { display: none; }
  .xp-statusbar { display: none; }
  .xp-toolbar .tb-label { display: none; }
  .xp-toolbar { padding: 4px 6px; gap: 2px; }
  .tb-btn { padding: 6px 10px; height: 32px; }

  /* Address bar: drop the "Address" label and "Go" button — keep just the path */
  .xp-addressbar { padding: 3px 6px; gap: 6px; }
  .addr-label, .addr-go { display: none; }
  .addr-input { height: 26px; }

  /* Bigger window control buttons — easier to tap. Stretch the baked-in
     SVG to fill so the #0050ee backdrop never peeks around the artwork. */
  .xp-tbtn {
    min-width: 30px;
    min-height: 24px;
    background-size: 100% 100%;
  }

  .xp-sidebar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: min(86vw, 280px);
    z-index: 50;
    transform: translateX(-100%);
  }
  .xp-sidebar.open {
    transform: translateX(0);
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.4);
  }
  .sidebar-overlay {
    display: block;
    position: absolute;
    inset: 0;
    z-index: 40;
    background: rgba(0, 0, 0, 0.3);
  }

  /* Taskbar: keep start button + tray visible, let tasks shrink. */
  .xp-task .task-label { display: none; }
  .xp-task { max-width: 44px; padding: 0 6px; }
  .xp-start { padding: 0 14px 0 6px; font-size: 15px; }
  .xp-tray { padding: 0 6px; gap: 4px; }
  .tray-icon { font-size: 11px; }
  .tray-clock { min-width: 0; padding-left: 2px; font-size: var(--font-size-xs); }

  .sm-panel { width: 92vw; }
}

/* ── Very small phones (<= 480px) ──────────────────── */
@media (max-width: 480px) {
  .xp-tasks { padding: 3px 2px; }
  .xp-icon { width: 64px; }
  .xp-icon-glyph, .xp-icon-glyph img { width: 32px; height: 32px; }
}
</style>
