<template>
  <div
    class="xpw xp-frame"
    :class="{ minimized, maximized: isMax, focused, dragging, resizing }"
    :style="winStyle"
    @mousedown="emit('focus')"
  >
    <header
      class="xpw-titlebar xp-frame-titlebar"
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

    <XpResizeHandles v-if="resizable && !isMax && !minimized" @start="onResizeStart" />
  </div>
</template>

<script setup lang="ts">
import { desktopBounds, useResize, type ResizeDir } from '~/composables/useResize'
import { useDrag } from '~/composables/useDrag'

const props = withDefaults(
  defineProps<{
    title?: string
    icon?: string
    /* Opening geometry; the window owns it from then on. */
    x?: number
    y?: number
    w?: number
    h?: number
    z?: number
    minimized?: boolean
    focused?: boolean
    maximizable?: boolean
    resizable?: boolean
    minW?: number
    minH?: number
  }>(),
  {
    title: 'Window',
    icon: '',
    x: 120,
    y: 90,
    w: 480,
    h: 360,
    z: 40,
    minimized: false,
    focused: true,
    maximizable: true,
    resizable: true,
    minW: 280,
    minH: 160,
  },
)

const emit = defineEmits<{
  focus: []
  close: []
  minimize: []
  move: [x: number, y: number]
  resize: [x: number, y: number, w: number, h: number]
}>()

const pos = reactive({ x: props.x, y: props.y })
const size = reactive({ w: props.w, h: props.h })
const isMax = ref(false)

const winStyle = computed(() => {
  if (isMax.value) return { zIndex: props.z }
  return {
    left: pos.x + 'px',
    top: pos.y + 'px',
    width: size.w + 'px',
    height: size.h + 'px',
    zIndex: props.z,
  }
})

function toggleMax() { isMax.value = !isMax.value }

/* ── Dragging ─────────────────────────────────────── */
/* Keep a sliver of the title bar reachable so a window can always be
   dragged back from an edge. */
const { dragging, startDrag } = useDrag({
  getPos: () => ({ x: pos.x, y: pos.y }),
  setPos: (p) => { pos.x = p.x; pos.y = p.y },
  limits: () => ({
    minX: 0,
    maxX: window.innerWidth - 80,
    minY: 0,
    maxY: window.innerHeight - 40,
  }),
  disabled: () => isMax.value,
  onEnd: (p) => emit('move', p.x, p.y),
})

/* ── Resizing ────────────────────────────────────── */
const { resizing, startResize } = useResize({
  getRect: () => ({ x: pos.x, y: pos.y, w: size.w, h: size.h }),
  setRect: (r) => { pos.x = r.x; pos.y = r.y; size.w = r.w; size.h = r.h },
  min: { w: props.minW, h: props.minH },
  /* .xpw is position: fixed, so the desktop itself is the bounding box. */
  bounds: desktopBounds,
  disabled: () => !props.resizable || isMax.value || props.minimized,
  onEnd: (r) => emit('resize', r.x, r.y, r.w, r.h),
})

function onResizeStart(dir: ResizeDir, e: MouseEvent | TouchEvent) {
  emit('focus')
  startResize(dir, e)
}
</script>

<style scoped>
.xpw {
  /* Frame, padding and background come from .xp-frame. */
  position: fixed;
  display: flex;
  flex-direction: column;
  box-shadow: var(--xp-bevel), 0 12px 32px rgba(0, 0, 0, 0.5);
}
.xpw.minimized { display: none; }
.xpw.dragging,
.xpw.resizing { user-select: none; }
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
  /* Luna gradient and text styling come from .xp-frame-titlebar; the
     flex column needs an explicit height that cannot shrink. */
  height: var(--titlebar-h);
  flex-shrink: 0;
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
