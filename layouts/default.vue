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
        @dblclick="launchApp('pacman')"
        @contextmenu.prevent.stop="openIconMenu('pacman', $event)"
      >
        <span class="xp-icon-glyph pacman-glyph">
          <span class="pacman-glyph-shape"></span>
        </span>
        <span class="xp-icon-label">Pac-Man</span>
      </button>

      <!-- ── The Window ──────────────────────────────── -->
      <div
        class="xp-window xp-frame"
        :class="{ maximized: isMaximized, minimized: isMinimized, dragging: isDragging, resizing }"
        :style="[windowStyle, { zIndex: wm.zOf('portfolio') }]"
        @mousedown="wm.focus('portfolio')"
      >

      <!-- Title bar -->
      <header
        class="xp-titlebar xp-frame-titlebar"
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

      <XpResizeHandles
        v-if="measured && !isMaximized && !isMinimized"
        @start="onResizeStart"
      />

      </div><!-- /.xp-window -->
    </div><!-- /.xp-workspace -->

    <!-- ── Taskbar ─────────────────────────────────── -->
    <XpTaskbar @toggle-start="startOpen = !startOpen" />

    <!-- ── Start menu (opens from the Start button) ── -->
    <XpStartMenu
      v-if="startOpen"
      @close="startOpen = false"
      @launch="launchApp"
    />

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
      :resizable="w.resizable"
      :min-w="w.minW"
      :min-h="w.minH"
      @focus="wm.focus(w.id)"
      @minimize="wm.minimize(w.id)"
      @close="wm.close(w.id)"
      @move="(x, y) => wm.setPos(w.id, x, y)"
      @resize="(x, y, ww, wh) => wm.setRect(w.id, x, y, ww, wh)"
    >
      <component
        :is="APP_COMPONENTS[w.app]"
        :win-id="w.id"
        :focused="wm.focusedId.value === w.id"
      />
    </XpWindow>

  </div>
</template>

<script setup lang="ts">
import { markRaw } from 'vue'
import { desktopBounds, type ResizeDir } from '~/composables/useResize'
import { useDrag } from '~/composables/useDrag'
import { bindPointerDrag, pointerOf } from '~/composables/pointer'
import type { CtxItem } from '~/components/xp-context-menu.vue'
import { profile } from '~/data/profile'
import PacmanApp from '~/components/apps/PacmanApp.vue'
import CmdApp from '~/components/apps/CmdApp.vue'
import PhotoApp from '~/components/apps/PhotoApp.vue'

/* The two desktop icons; their ids double as iconPositions' keys. */
type IconId = 'portfolio' | 'pacman'

interface CtxMenu {
  x: number
  y: number
  items: CtxItem[]
}

const route = useRoute()
const router = useRouter()

/* ── Wallpaper ───────────────────────────────────────
   The original is a 3840px JPEG. Serve a WebP sized to the viewport
   instead (AVIF came out larger for this image); browsers without
   image-set() type() support keep the JPEG declared in _core.scss. */
const img = useImage()
const wallpaper = (width: number) => {
  const url = img('/img/xp-wallpaper.jpg', { width, format: 'webp', quality: 60 })
  return `html body{background-image:image-set(url("${url}") type("image/webp"))}`
}
useHead({
  style: [{
    key: 'xp-wallpaper',
    innerHTML: [
      wallpaper(1280),
      `@media (min-width:1281px){${wallpaper(1920)}}`,
      `@media (min-width:1921px){${wallpaper(2560)}}`,
    ].join(''),
  }],
})

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

const isMinimized = computed(() => wm.isMinimized('portfolio'))

const sidebarOpen = ref(false)
const startOpen = ref(false)
const selectedIcon = ref<IconId | null>(null)

const workspaceRef = ref<HTMLElement | null>(null)

/* The desktop box every clamp measures against: the workspace element
   once mounted, else derived from the viewport and --taskbar-h. */
function workspaceBox(): { w: number; h: number } {
  const ws = workspaceRef.value
  return ws ? { w: ws.clientWidth, h: ws.clientHeight } : desktopBounds()
}

/* ── Right-click context menus ───────────────────── */
const ctxMenu = ref<CtxMenu | null>(null)
const refreshing = ref(false)

function onWorkspaceCtx(e: MouseEvent) {
  /* Only the desktop background gets the XP menu; inside a window we
     leave the native menu so text stays selectable/copyable. */
  if ((e.target as HTMLElement | null)?.closest('.xp-window')) return
  e.preventDefault()
  selectedIcon.value = null
  ctxMenu.value = { x: e.clientX, y: e.clientY, items: desktopMenuItems() }
}
function openIconMenu(id: IconId, e: MouseEvent) {
  selectedIcon.value = id
  ctxMenu.value = { x: e.clientX, y: e.clientY, items: iconMenuItems(id) }
}
function desktopMenuItems(): CtxItem[] {
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
function iconMenuItems(id: IconId): CtxItem[] {
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
/* Rows without an `action` (a submenu parent's placeholder) emit
   undefined; the switch simply ignores them. */
function onCtxSelect(action: string | undefined) {
  switch (action) {
    case 'refresh': doRefresh(); break
    case 'arrange': arrangeIcons(); break
    case 'cmd': launchApp('cmd'); break
    case 'open-portfolio': openPortfolio(); break
    case 'open-pacman': launchApp('pacman'); break
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
/* Every launcher — Start menu, desktop icon, context menu — dismisses
   the shell UI first, then opens the window. */
function launchApp(app: AppKey) {
  startOpen.value = false
  ctxMenu.value = null
  selectedIcon.value = null
  wm.open(app)
}

/* ── Desktop icon positions (draggable, persisted) ── */
const ICON_STORAGE_KEY = 'xp-icon-positions'
const iconPositions = reactive<Record<IconId, { x: number; y: number }>>({
  portfolio: { x: 12, y: 12 },
  pacman:    { x: 12, y: 100 },
})

interface IconDrag {
  id: IconId
  startX: number
  startY: number
  mouseX: number
  mouseY: number
  moved: boolean
  isTouch: boolean
}
let iconDrag: IconDrag | null = null
let releaseIconDrag: (() => void) | null = null

function startIconDrag(id: IconId, e: MouseEvent | TouchEvent) {
  /* preventDefault on mousedown blocks the browser's native image
     drag-and-drop, which would otherwise swallow mousemove/mouseup
     and leave the icon "following" the cursor. */
  const isTouch = 'touches' in e
  if (!isTouch && e.cancelable) e.preventDefault()
  const point = pointerOf(e)
  if (!point) return
  iconDrag = {
    id,
    startX: iconPositions[id].x,
    startY: iconPositions[id].y,
    mouseX: point.clientX,
    mouseY: point.clientY,
    moved: false,
    isTouch,
  }
  selectedIcon.value = id
  releaseIconDrag = bindPointerDrag(onIconDrag, endIconDrag)
}

function onIconDrag(e: MouseEvent | TouchEvent) {
  if (!iconDrag) return
  const point = pointerOf(e)
  if (!point) return
  const dx = point.clientX - iconDrag.mouseX
  const dy = point.clientY - iconDrag.mouseY
  if (!iconDrag.moved && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) {
    iconDrag.moved = true
  }
  if (!iconDrag.moved) return
  if (e.cancelable) e.preventDefault()
  const area = workspaceBox()
  const maxX = area.w - 80
  const maxY = area.h - 90   /* leave room for the icon's glyph + label */
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
  releaseIconDrag?.()
  releaseIconDrag = null
  if (tap) {
    if (tappedId === 'portfolio') openPortfolio()
    else if (tappedId === 'pacman') launchApp('pacman')
  }
}

function loadIconPositions() {
  try {
    const saved = JSON.parse(localStorage.getItem(ICON_STORAGE_KEY) || 'null')
    if (saved && typeof saved === 'object') {
      for (const id of Object.keys(iconPositions) as IconId[]) {
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
const isMaximized = ref(false)
const pos = ref({ x: 40, y: 24 })
const size = ref({ w: 1100, h: 700 })

/* Until fitWindow() has measured the desktop (first paint is server-side,
   where there is no viewport) we emit no inline geometry at all, so the
   CSS defaults below — which centre the window with the same numbers —
   decide where it lands. That keeps the first frame identical to the
   hydrated one instead of flashing a full-screen window. */
const measured = ref(false)

const windowStyle = computed(() => {
  if (isMaximized.value || !measured.value) return {}
  return {
    left: pos.value.x + 'px',
    top: pos.value.y + 'px',
    width: size.value.w + 'px',
    height: size.value.h + 'px',
  }
})

/* Drag handling ----------------------------------- */
/* The explorer may hang off the left (minX is negative) so a wide
   window can be pushed aside, but never past its own title buttons. */
const { dragging: isDragging, startDrag } = useDrag({
  getPos: () => pos.value,
  setPos: (p) => { pos.value = p },
  limits: () => {
    const area = workspaceBox()
    return {
      minX: -(size.value.w - 120),
      maxX: area.w - 80,
      minY: 0,
      maxY: area.h - 30,
    }
  },
  disabled: () => isMaximized.value,
})

/* Resizing --------------------------------------- */
/* Once the explorer has been resized by hand we stop re-centring it on
   browser resize and only keep it inside the desktop. */
const userSized = ref(false)

const { resizing, startResize } = useResize({
  getRect: () => ({ ...pos.value, ...size.value }),
  setRect: (r) => {
    pos.value = { x: r.x, y: r.y }
    size.value = { w: r.w, h: r.h }
  },
  min: { w: 420, h: 320 },
  bounds: workspaceBox,
  disabled: () => isMaximized.value || isMinimized.value,
  onEnd: () => { userSized.value = true },
})

function onResizeStart(dir: ResizeDir, e: MouseEvent | TouchEvent) {
  wm.focus('portfolio')
  startResize(dir, e)
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

function fitWindow() {
  if (typeof window === 'undefined') return
  if (window.innerWidth < 900) {
    /* Phones get the full-bleed window; the mobile media query already
       paints it that way, so there is nothing to measure. */
    isMaximized.value = true
    return
  }
  isMaximized.value = false

  /* The workspace is the desktop minus the taskbar — the same box the
     CSS percentages below resolve against. */
  const { w: aw, h: ah } = workspaceBox()

  if (userSized.value) {
    clampWindow(aw, ah)
  } else {
    const w = Math.min(1100, aw - 80)
    const h = Math.min(700, ah - 40)
    size.value = { w, h }
    pos.value = {
      x: Math.max(20, Math.round((aw - w) / 2)),
      y: Math.max(20, Math.round((ah - h) / 2)),
    }
  }
  measured.value = true
}

/* Shrink/nudge a hand-sized window back into a smaller desktop. */
function clampWindow(aw: number, ah: number) {
  const w = Math.max(420, Math.min(size.value.w, aw - 24))
  const h = Math.max(320, Math.min(size.value.h, ah - 24))
  size.value = { w, h }
  pos.value = {
    x: Math.max(0, Math.min(pos.value.x, aw - w)),
    y: Math.max(0, Math.min(pos.value.y, ah - h)),
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

onMounted(() => {
  updateAppHeight()
  fitWindow()
  loadIconPositions()
  window.addEventListener('resize', fitWindow)
  window.addEventListener('resize', updateAppHeight)
  window.addEventListener('orientationchange', updateAppHeight)
  window.visualViewport?.addEventListener('resize', updateAppHeight)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', fitWindow)
  window.removeEventListener('resize', updateAppHeight)
  window.removeEventListener('orientationchange', updateAppHeight)
  window.visualViewport?.removeEventListener('resize', updateAppHeight)
  /* useDrag/useResize unhook themselves; the icon drag is hand-rolled. */
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
  /* Mirrors fitWindow(): the first paint already lands where the measured
     window will, so hydration moves nothing. */
  --win-w: min(1100px, 100% - 80px);
  --win-h: min(700px, 100% - 40px);
  position: absolute;
  left: max(20px, calc((100% - var(--win-w)) / 2));
  top: max(20px, calc((100% - var(--win-h)) / 2));
  width: var(--win-w);
  height: var(--win-h);
  /* Frame, padding and background come from .xp-frame. */
  display: grid;
  grid-template-rows:
    var(--titlebar-h) var(--menubar-h) auto var(--addressbar-h)
    1fr var(--statusbar-h);
  box-shadow: var(--xp-bevel), 0 8px 28px rgba(0, 0, 0, 0.45);
  transition: transform 0.18s ease, opacity 0.18s ease;
  will-change: transform;
}

.xp-window.dragging,
.xp-window.resizing {
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
/* Luna gradient and text styling come from .xp-frame-titlebar; the
   grid row supplies this bar's height. */
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
  cursor: nwse-resize !important;
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



/* ── Mobile ──────────────────────────────────────── */
@media (max-width: 900px) {
  /* The taskbar pins itself to the visual-viewport bottom (see
     XpTaskbar.vue); collapse its grid row so it does not also
     reserve space here. */
  .xp-desktop {
    grid-template-rows: 1fr 0;
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
}

/* ── Very small phones (<= 480px) ──────────────────── */
@media (max-width: 480px) {
  .xp-icon { width: 64px; }
  .xp-icon-glyph, .xp-icon-glyph img { width: 32px; height: 32px; }
}
</style>
