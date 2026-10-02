import { ref, onBeforeUnmount } from 'vue'
import { bindPointerDrag, pointerOf } from './pointer'

/* ============================================================
   Window resizing
   ------------------------------------------------------------
   Shared by the pinned Explorer window (layouts/default.vue) and
   every app window (components/XpWindow.vue). The caller keeps
   owning its geometry and exposes it through getRect/setRect, so
   this works the same whether that geometry lives in a ref, a
   reactive object or the window manager.

   Pair it with <XpResizeHandles> for the eight XP edge/corner
   grips; its `start` event feeds straight into startResize.
   ============================================================ */

/* The eight XP window edges and corners. */
export const RESIZE_DIRS = ['n', 's', 'e', 'w', 'nw', 'ne', 'sw', 'se'] as const

export type ResizeDir = (typeof RESIZE_DIRS)[number]

/** A window's geometry: top-left corner plus its size, in CSS pixels. */
export interface Rect {
  x: number
  y: number
  w: number
  h: number
}

/** The box a window may not be resized beyond. */
export interface Bounds {
  w: number
  h: number
}

export interface ResizeOptions {
  getRect: () => Rect
  setRect: (rect: Rect) => void
  /** Smallest the window may be dragged to. */
  min: Bounds
  bounds: () => Bounds
  /** True while the window is maximized or minimized, so grips go inert. */
  disabled: () => boolean
  onEnd?: (rect: Rect) => void
}

/* The desktop: the viewport minus the taskbar strip at the bottom. */
export function desktopBounds(): Bounds {
  const taskbar = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--taskbar-h'),
  )
  return { w: window.innerWidth, h: window.innerHeight - (taskbar || 30) }
}

/** The in-flight drag: where the pointer went down, and the rect it started from. */
interface DragStart extends Rect {
  dir: ResizeDir
  px: number
  py: number
}

export function useResize({ getRect, setRect, min, bounds, disabled, onEnd }: ResizeOptions) {
  const resizing = ref(false)
  let start: DragStart | null = null
  let release: (() => void) | null = null

  function startResize(dir: ResizeDir, e: MouseEvent | TouchEvent) {
    if (disabled()) return
    const point = pointerOf(e)
    if (!point) return
    start = { dir, px: point.clientX, py: point.clientY, ...getRect() }
    resizing.value = true
    release = bindPointerDrag(onResize, endResize)
  }

  function onResize(e: MouseEvent | TouchEvent) {
    if (!start) return
    if (e.cancelable) e.preventDefault()
    const point = pointerOf(e)
    if (!point) return
    const dx = point.clientX - start.px
    const dy = point.clientY - start.py
    const { dir } = start

    /* Track edges rather than width/height: dragging a north or west
       grip moves that edge while the opposite one stays pinned. */
    let left = start.x
    let top = start.y
    let right = start.x + start.w
    let bottom = start.y + start.h

    if (dir.includes('n')) top += dy
    if (dir.includes('s')) bottom += dy
    if (dir.includes('w')) left += dx
    if (dir.includes('e')) right += dx

    /* Stay inside the desktop, but never yank an edge that already sat
       outside it (a window dragged half off-screen keeps its offset). */
    const area = bounds()
    left = Math.max(left, Math.min(0, start.x))
    top = Math.max(top, Math.min(0, start.y))
    right = Math.min(right, Math.max(area.w, start.x + start.w))
    bottom = Math.min(bottom, Math.max(area.h, start.y + start.h))

    /* Honour the minimum by moving the edge being dragged, so the
       window shrinks to a stop instead of walking across the screen. */
    if (right - left < min.w) {
      if (dir.includes('w')) left = right - min.w
      else right = left + min.w
    }
    if (bottom - top < min.h) {
      if (dir.includes('n')) top = bottom - min.h
      else bottom = top + min.h
    }

    setRect({ x: left, y: top, w: right - left, h: bottom - top })
  }

  function endResize() {
    if (!start) return
    start = null
    resizing.value = false
    release?.()
    release = null
    onEnd?.(getRect())
  }

  onBeforeUnmount(endResize)

  return { resizing, startResize }
}
