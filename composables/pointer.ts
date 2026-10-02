/* Mouse and touch differ in two ways every drag had to rediscover:
   where the coordinates live, and which events end the gesture. */

/** Just the coordinates a drag needs — MouseEvent and Touch both satisfy it. */
export interface DragPoint {
  clientX: number
  clientY: number
}

/** Null when a touch event carries no touches (the final touchend, or a cancel). */
export function pointerOf(e: MouseEvent | TouchEvent): DragPoint | null {
  return 'touches' in e ? (e.touches[0] ?? null) : e
}

/* touchcancel matters: the OS can take the gesture away mid-drag — a system
   swipe, an incoming call — without ever sending touchend. */
const END_EVENTS = ['mouseup', 'touchend', 'touchcancel'] as const

type DragHandler = (e: MouseEvent | TouchEvent) => void

/**
 * Listen on `window` for the rest of a drag, so the gesture survives the
 * cursor leaving the element it started on. Returns the unsubscribe.
 * touchmove is non-passive so handlers can stop the page scrolling under it.
 */
export function bindPointerDrag(move: DragHandler, end: DragHandler): () => void {
  window.addEventListener('mousemove', move)
  window.addEventListener('touchmove', move, { passive: false })
  for (const ev of END_EVENTS) window.addEventListener(ev, end)

  return () => {
    window.removeEventListener('mousemove', move)
    window.removeEventListener('touchmove', move)
    for (const ev of END_EVENTS) window.removeEventListener(ev, end)
  }
}
