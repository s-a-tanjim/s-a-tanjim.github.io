import { ref, onBeforeUnmount } from 'vue'
import { bindPointerDrag, pointerOf } from './pointer'

/* The move half of the pair useResize completes. Both windows drag by
   their title bar and differ only in what they clamp against. */

export interface Point {
  x: number
  y: number
}

/** Clamps for the dragged position; omit a side to leave it free. */
export interface DragLimits {
  minX?: number
  maxX?: number
  minY?: number
  maxY?: number
}

export interface DragOptions {
  getPos: () => Point
  setPos: (pos: Point) => void
  limits: () => DragLimits
  /** True while the window is maximized, so the grips go inert. */
  disabled: () => boolean
  onEnd?: (pos: Point) => void
}

/* max first, then min — so when the two cross, the minimum wins. */
function clamp(v: number, min?: number, max?: number) {
  if (max !== undefined) v = Math.min(max, v)
  if (min !== undefined) v = Math.max(min, v)
  return v
}

export function useDrag({ getPos, setPos, limits, disabled, onEnd }: DragOptions) {
  const dragging = ref(false)
  let start: { px: number; py: number; x: number; y: number } | null = null
  let release: (() => void) | null = null

  function startDrag(e: MouseEvent | TouchEvent) {
    /* The title buttons sit inside the drag handle; clicking one must
       press the button, not pick the window up. */
    if (disabled() || (e.target as HTMLElement | null)?.closest('.xp-title-buttons')) return
    const point = pointerOf(e)
    if (!point) return
    const { x, y } = getPos()
    start = { px: point.clientX, py: point.clientY, x, y }
    dragging.value = true
    release = bindPointerDrag(onDrag, endDrag)
  }

  function onDrag(e: MouseEvent | TouchEvent) {
    if (!start) return
    if (e.cancelable) e.preventDefault()
    const point = pointerOf(e)
    if (!point) return
    const { minX, maxX, minY, maxY } = limits()
    setPos({
      x: clamp(start.x + (point.clientX - start.px), minX, maxX),
      y: clamp(start.y + (point.clientY - start.py), minY, maxY),
    })
  }

  function endDrag() {
    if (!start) return
    start = null
    dragging.value = false
    release?.()
    release = null
    onEnd?.(getPos())
  }

  onBeforeUnmount(endDrag)

  return { dragging, startDrag }
}
