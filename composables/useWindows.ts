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
     2. Add an entry to APP_META here (title, icon, size; opt out of
        maximize/resize with maximizable: false / resizable: false, and
        set minW/minH if the body needs more room than the default).
     3. Map the key → component in layouts/default.vue's
        APP_COMPONENTS, and add a launcher that calls open('key').
   ============================================================ */

/** A registered tool: how its window should open, and what it may do. */
export interface AppMeta {
  title: string
  icon: string
  w: number
  h: number
  singleton?: boolean
  maximizable?: boolean
  resizable?: boolean
  minW?: number
  minH?: number
}

/** A window id: the pinned explorer, or `<appKey>-<n>` for an app window. */
export type WindowId = string

/** An open app window — APP_META resolved against the current desktop. */
export interface AppWindow {
  id: WindowId
  app: AppKey
  title: string
  icon: string
  x: number
  y: number
  w: number
  h: number
  maximizable: boolean
  resizable: boolean
  minW?: number
  minH?: number
}

export interface TaskButton {
  id: WindowId
  title: string
  icon: string | null
  img: string | null
  minimized: boolean
  focused: boolean
}

export const APP_META = {
  pacman: { title: 'Pac-Man',        icon: '🟡', w: 472, h: 640, singleton: true,  maximizable: false, resizable: false },
  cmd:    { title: 'Command Prompt', icon: '⌨️', w: 640, h: 420, singleton: true,  maximizable: true  },
  photos: { title: 'about-img.jpg — Windows Picture and Fax Viewer', icon: '🖼️', w: 580, h: 520, singleton: true, maximizable: true },
} satisfies Record<string, AppMeta>

/** The keys of APP_META — `open()` accepts nothing else. */
export type AppKey = keyof typeof APP_META

const Z_BASE = 40   /* windows live in 40..(40+n); taskbar/menus sit far above */

interface PortfolioMeta {
  title: string
  icon: string | null
  img: string | null
}

interface DesktopState {
  apps: AppWindow[]
  stack: WindowId[]
  minimized: Record<WindowId, boolean>
  focusedId: WindowId
  portfolio: PortfolioMeta
  seq: number
}

const state = reactive<DesktopState>({
  apps: [],                       /* open app windows */
  stack: ['portfolio'],           /* z-order, bottom → top (window ids) */
  minimized: { portfolio: false },
  focusedId: 'portfolio',
  portfolio: { title: 'Portfolio', icon: null, img: null },
  seq: 0,
})

/* ── z-order helpers ─────────────────────────────── */
function raise(id: WindowId) {
  const i = state.stack.indexOf(id)
  if (i >= 0) state.stack.splice(i, 1)
  state.stack.push(id)
}
function zOf(id: WindowId) {
  const i = state.stack.indexOf(id)
  return Z_BASE + (i < 0 ? 0 : i)
}
function topVisible(exclude?: WindowId): WindowId {
  for (let i = state.stack.length - 1; i >= 0; i--) {
    const id = state.stack[i]
    if (id && id !== exclude && !state.minimized[id]) return id
  }
  return 'portfolio'
}

/* ── focus / minimise ────────────────────────────── */
function focus(id: WindowId) {
  raise(id)
  state.focusedId = id
}
function minimize(id: WindowId) {
  state.minimized[id] = true
  if (state.focusedId === id) state.focusedId = topVisible(id)
}
function restore(id: WindowId) {
  state.minimized[id] = false
  focus(id)
}
function toggle(id: WindowId) {
  /* taskbar-button behaviour */
  if (state.minimized[id]) restore(id)
  else if (state.focusedId === id) minimize(id)
  else focus(id)
}
function isMinimized(id: WindowId) { return !!state.minimized[id] }

/* ── app windows ─────────────────────────────────── */
function vw() { return typeof window !== 'undefined' ? window.innerWidth : 1200 }
function vh() { return typeof window !== 'undefined' ? window.innerHeight : 800 }

function open(appKey: AppKey): WindowId | null {
  /* Widened from the literal type so optional flags like `resizable`
     are readable on every entry, and so a bad key still hits the guard. */
  const meta: AppMeta | undefined = APP_META[appKey]
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
    resizable: meta.resizable !== false,
    minW: meta.minW,
    minH: meta.minH,
  })
  state.minimized[id] = false
  focus(id)
  return id
}
function close(id: WindowId) {
  const i = state.apps.findIndex(a => a.id === id)
  if (i >= 0) state.apps.splice(i, 1)
  const si = state.stack.indexOf(id)
  if (si >= 0) state.stack.splice(si, 1)
  delete state.minimized[id]
  if (state.focusedId === id) state.focusedId = topVisible()
}
function setPos(id: WindowId, x: number, y: number) {
  const w = state.apps.find(a => a.id === id)
  if (w) { w.x = x; w.y = y }
}
function setRect(id: WindowId, x: number, y: number, width: number, height: number) {
  const w = state.apps.find(a => a.id === id)
  if (w) { w.x = x; w.y = y; w.w = width; w.h = height }
}

/* ── portfolio (pinned) ──────────────────────────── */
function registerPortfolio(meta: Partial<PortfolioMeta>) {
  state.portfolio = { ...state.portfolio, ...meta }
}

/* ── taskbar ─────────────────────────────────────── */
const tasks = computed<TaskButton[]>(() => {
  const out: TaskButton[] = [{
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
    setRect,
    registerPortfolio,
  }
}
