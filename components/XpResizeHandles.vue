<template>
  <!-- Eight invisible grips pinned to the window's edges and corners.
       They're absolutely positioned, so dropping them into a grid or
       flex window body doesn't disturb its layout. -->
  <span
    v-for="d in RESIZE_DIRS"
    :key="d"
    :class="['xp-resize', `xp-resize-${d}`]"
    @mousedown.stop="emit('start', d, $event)"
    @touchstart.stop.prevent="emit('start', d, $event)"
  ></span>
</template>

<script setup lang="ts">
import { RESIZE_DIRS, type ResizeDir } from '~/composables/useResize'

const emit = defineEmits<{
  start: [dir: ResizeDir, event: MouseEvent | TouchEvent]
}>()
</script>

<style scoped>
.xp-resize {
  position: absolute;
  z-index: 60;
  touch-action: none;
}

/* Edges: a thin strip that overlaps the window's 3px bevel. */
.xp-resize-n,
.xp-resize-s {
  left: 0;
  right: 0;
  height: 4px;
  cursor: ns-resize !important;
}
.xp-resize-n { top: 0; }
.xp-resize-s { bottom: 0; }

.xp-resize-w,
.xp-resize-e {
  top: 0;
  bottom: 0;
  width: 4px;
  cursor: ew-resize !important;
}
.xp-resize-w { left: 0; }
.xp-resize-e { right: 0; }

/* Corners sit above the edges and get a bigger target — the
   bottom-right one lands on the status bar's grip, as in XP. */
.xp-resize-nw,
.xp-resize-ne,
.xp-resize-sw,
.xp-resize-se {
  width: 16px;
  height: 16px;
  z-index: 61;
}
.xp-resize-nw { top: 0; left: 0; cursor: nwse-resize !important; }
.xp-resize-se { bottom: 0; right: 0; cursor: nwse-resize !important; }
.xp-resize-ne { top: 0; right: 0; cursor: nesw-resize !important; }
.xp-resize-sw { bottom: 0; left: 0; cursor: nesw-resize !important; }
</style>
