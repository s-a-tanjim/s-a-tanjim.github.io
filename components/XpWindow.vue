<template>
  <div
    class="xpw"
    :class="{ minimized, maximized: isMax, focused, dragging }"
    :style="winStyle"
    @mousedown="emit('focus')"
  >
    <header
      class="xpw-titlebar"
      @mousedown="startDrag"
      @touchstart.passive="startDrag"
      @dblclick="maximizable && toggleMax()"
    >
      <div class="xpw-title-text">
        <span v-if="icon" class="xpw-icon">{{ icon }}</span>
        <span class="xpw-title-label">{{ title }}</span>
      </div>
      <div class="xp-title-buttons">
        <button class="xp-tbtn" aria-label="Minimize" @mousedown.stop @click.stop="emit('minimize')"></button>
        <button
          v-if="maximizable"
          class="xp-tbtn"
          :aria-label="isMax ? 'Restore' : 'Maximize'"
          @mousedown.stop
          @click.stop="toggleMax"
        ></button>
        <button class="xp-tbtn" aria-label="Close" @mousedown.stop @click.stop="emit('close')"></button>
      </div>
    </header>

    <div class="xpw-body">
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String, default: 'Window' },
  icon: { type: String, default: '' },
  x: { type: Number, default: 120 },
  y: { type: Number, default: 90 },
  w: { type: Number, default: 480 },
  h: { type: Number, default: 360 },
  z: { type: Number, default: 40 },
  minimized: { type: Boolean, default: false },
  focused: { type: Boolean, default: true },
  maximizable: { type: Boolean, default: true },
})
const emit = defineEmits(['focus', 'close', 'minimize', 'move'])

const pos = reactive({ x: props.x, y: props.y })
const isMax = ref(false)
const dragging = ref(false)

const winStyle = computed(() => {
  if (isMax.value) return { zIndex: props.z }
  return {
    left: pos.x + 'px',
    top: pos.y + 'px',
    width: props.w + 'px',
    height: props.h + 'px',
    zIndex: props.z,
  }
})

function toggleMax() { isMax.value = !isMax.value }

/* ── Dragging ─────────────────────────────────────── */
let drag = null
function startDrag(e) {
  if (isMax.value) return
  if (e.target.closest('.xp-title-buttons')) return
  const p = e.touches?.[0] || e
  drag = { px: p.clientX, py: p.clientY, x: pos.x, y: pos.y }
  dragging.value = true
  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', endDrag)
  window.addEventListener('touchmove', onDrag, { passive: false })
  window.addEventListener('touchend', endDrag)
}
function onDrag(e) {
  if (!drag) return
  if (e.cancelable) e.preventDefault()
  const p = e.touches?.[0] || e
  pos.x = Math.max(0, Math.min(window.innerWidth - 80, drag.x + (p.clientX - drag.px)))
  pos.y = Math.max(0, Math.min(window.innerHeight - 40, drag.y + (p.clientY - drag.py)))
}
function endDrag() {
  drag = null
  dragging.value = false
  emit('move', pos.x, pos.y)
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', endDrag)
  window.removeEventListener('touchmove', onDrag)
  window.removeEventListener('touchend', endDrag)
}
onBeforeUnmount(endDrag)
</script>

<style scoped>
.xpw {
  position: fixed;
  display: flex;
  flex-direction: column;
  background: var(--xp-window);
  border: none;
  border-radius: 8px 8px 0 0;
  /* XP.css .window 3px blue bevel */
  box-shadow:
    inset -1px -1px #00138c, inset 1px 1px #0831d9,
    inset -2px -2px #001ea0, inset 2px 2px #166aee,
    inset -3px -3px #003bda, inset 3px 3px #0855dd,
    0 12px 32px rgba(0, 0, 0, 0.5);
  padding: 0 3px 3px;
  overflow: hidden;
  font-family: var(--font-family);
}
.xpw.minimized { display: none; }
.xpw.dragging { user-select: none; }
.xpw.maximized {
  left: 0 !important;
  top: 0 !important;
  width: 100vw !important;
  height: calc(var(--app-height, 100vh) - var(--taskbar-h) - env(safe-area-inset-bottom, 0px)) !important;
  border-radius: 0;
  padding: 0;
  box-shadow: none;
}

.xpw-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--titlebar-h);
  flex-shrink: 0;
  margin: 0 -3px;
  padding: 0 3px 0 6px;
  background: var(--xp-luna-titlebar);
  color: #fff;
  font-family: var(--font-family-title);
  font-weight: bold;
  font-size: 13px;
  text-shadow: 1px 1px #0f1089;
  border-radius: 8px 8px 0 0;
  cursor: grab;
  user-select: none;
}
.xpw.dragging .xpw-titlebar { cursor: grabbing; }
.xpw.maximized .xpw-titlebar { margin: 0; border-radius: 0; cursor: default; }
/* Inactive window: greyed-out Luna title bar, like XP. */
.xpw:not(.focused) .xpw-titlebar {
  background: linear-gradient(180deg, #7f97cf 0%, #93a9d8 8%, #99aed9 40%, #9fb2db 88%, #8fa4d2 96%, #7d92c6 100%);
  text-shadow: 1px 1px rgba(0, 0, 0, 0.25);
}

.xpw-title-text {
  display: flex;
  align-items: center;
  gap: 6px;
  overflow: hidden;
  white-space: nowrap;
}
.xpw-icon { font-size: 13px; line-height: 1; }
.xpw-title-label { overflow: hidden; text-overflow: ellipsis; }
.xp-title-buttons { display: flex; align-items: center; }

.xpw-body {
  flex: 1;
  min-height: 0;
  overflow: auto;
  background: var(--xp-window);
}
</style>
