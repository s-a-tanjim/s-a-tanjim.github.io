import { reactive, computed } from 'vue'

/* ============================================================
   Window manager
   ------------------------------------------------------------
   Single source of truth for every on-screen window: z-order,
   focus, minimise state and the taskbar list. The main Explorer
   window is a pinned entry with id 'portfolio'; every other tool
   is an "app" window opened from the registry below.

   To plug in a NEW tool:
     1. Add a component under components/apps/  (rendered inside
        an <XpWindow> — it only needs to render its body).
     2. Add an entry to APP_META here (title, icon, size).
     3. Map the key → component in layouts/default.vue's
        APP_COMPONENTS, and add a launcher that calls open('key').
   ============================================================ */

export const APP_META = {
  pacman: { title: 'Pac-Man',        icon: '🟡', w: 472, h: 640, singleton: true,  maximizable: false },
  cmd:    { title: 'Command Prompt', icon: '⌨️', w: 640, h: 420, singleton: true,  maximizable: true  },
  photos: { title: 'about-img.jpg — Windows Picture and Fax Viewer', icon: '🖼️', w: 580, h: 520, singleton: true, maximizable: true },
}

const Z_BASE = 40   /* windows live in 40..(40+n); taskbar/menus sit far above */

const state = reactive({
  apps: [],                       /* open app windows */
  stack: ['portfolio'],           /* z-order, bottom → top (window ids) */
  minimized: { portfolio: false },
  focusedId: 'portfolio',
  portfolio: { title: 'Portfolio', icon: null, img: null },
  seq: 0,
})

/* ── z-order helpers ─────────────────────────────── */
function raise(id) {
  const i = state.stack.indexOf(id)
  if (i >= 0) state.stack.splice(i, 1)
  state.stack.push(id)
}
function zOf(id) {
  const i = state.stack.indexOf(id)
  return Z_BASE + (i < 0 ? 0 : i)
}
function topVisible(exclude) {
  for (let i = state.stack.length - 1; i >= 0; i--) {
    const id = state.stack[i]
    if (id !== exclude && !state.minimized[id]) return id
  }
  return 'portfolio'
}

/* ── focus / minimise ────────────────────────────── */
function focus(id) {
  raise(id)
  state.focusedId = id
}
function minimize(id) {
  state.minimized[id] = true
  if (state.focusedId === id) state.focusedId = topVisible(id)
}
function restore(id) {
  state.minimized[id] = false
  focus(id)
}
function toggle(id) {
  /* taskbar-button behaviour */
  if (state.minimized[id]) restore(id)
  else if (state.focusedId === id) minimize(id)
  else focus(id)
}
function isMinimized(id) { return !!state.minimized[id] }

/* ── app windows ─────────────────────────────────── */
function vw() { return typeof window !== 'undefined' ? window.innerWidth : 1200 }
function vh() { return typeof window !== 'undefined' ? window.innerHeight : 800 }

function open(appKey) {
  const meta = APP_META[appKey]
  if (!meta) return null
  if (meta.singleton) {
    const existing = state.apps.find(a => a.app === appKey)
    if (existing) { restore(existing.id); return existing.id }
  }
  state.seq += 1
  const id = `${appKey}-${state.seq}`
  const off = (state.apps.length % 5) * 26
  state.apps.push({
    id,
    app: appKey,
    title: meta.title,
    icon: meta.icon,
    w: meta.w,
    h: meta.h,
    x: Math.max(12, Math.round((vw() - meta.w) / 2)) + off,
    y: Math.max(12, Math.round((vh() - meta.h) / 2.4)) + off,
    maximizable: meta.maximizable !== false,
  })
  state.minimized[id] = false
  focus(id)
  return id
}
function close(id) {
  const i = state.apps.findIndex(a => a.id === id)
  if (i >= 0) state.apps.splice(i, 1)
  const si = state.stack.indexOf(id)
  if (si >= 0) state.stack.splice(si, 1)
  delete state.minimized[id]
  if (state.focusedId === id) state.focusedId = topVisible()
}
function setPos(id, x, y) {
  const w = state.apps.find(a => a.id === id)
  if (w) { w.x = x; w.y = y }
}

/* ── portfolio (pinned) ──────────────────────────── */
function registerPortfolio(meta) {
  state.portfolio = { ...state.portfolio, ...meta }
}

/* ── taskbar ─────────────────────────────────────── */
const tasks = computed(() => {
  const out = [{
    id: 'portfolio',
    title: state.portfolio.title,
    icon: state.portfolio.icon,
    img: state.portfolio.img,
    minimized: !!state.minimized.portfolio,
    focused: state.focusedId === 'portfolio',
  }]
  for (const a of state.apps) {
    out.push({
      id: a.id,
      title: a.title,
      icon: a.icon,
      img: null,
      minimized: !!state.minimized[a.id],
      focused: state.focusedId === a.id,
    })
  }
  return out
})

export function useWindows() {
  return {
    apps: state.apps,
    tasks,
    focusedId: computed(() => state.focusedId),
    zOf,
    focus,
    minimize,
    restore,
    toggle,
    isMinimized,
    open,
    close,
    setPos,
    registerPortfolio,
  }
}
