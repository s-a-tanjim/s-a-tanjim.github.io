<template>
  <div class="xp-taskbar">
    <button class="xp-start" @click="emit('toggle-start')">
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
</template>

<script setup lang="ts">
/* The strip along the bottom: Start button, one button per open window,
   and the system tray. It reads the window list straight from the window
   manager and owns its own clock; the only thing it hands back is the
   Start button click. */
const emit = defineEmits<{
  'toggle-start': []
}>()

const wm = useWindows()
const tasks = wm.tasks

const clock = ref('')
let clockTimer: ReturnType<typeof setInterval>

function updateClock() {
  const d = new Date()
  let h = d.getHours()
  const m = d.getMinutes().toString().padStart(2, '0')
  const ampm = h >= 12 ? 'PM' : 'AM'
  h = h % 12 || 12
  clock.value = `${h}:${m} ${ampm}`
}

onMounted(() => {
  updateClock()
  /* 30s is enough for a minute-resolution clock without drifting a
     visible amount. */
  clockTimer = setInterval(updateClock, 30000)
})
onBeforeUnmount(() => clearInterval(clockTimer))
</script>

<style scoped>
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

/* ── Mobile ──────────────────────────────────────── */
@media (max-width: 900px) {
  /* Anchor the taskbar to the visual-viewport bottom. Grid placement
     alone can fail on phones because the workspace's 1fr row resolves
     against the layout viewport, leaving the taskbar below the visible
     area when the URL bar is showing. */
  .xp-taskbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 90;
  }
  .xp-task .task-label { display: none; }
  .xp-task { max-width: 44px; padding: 0 6px; }
  .xp-start { padding: 0 14px 0 6px; font-size: 15px; }
  .xp-tray { padding: 0 6px; gap: 4px; }
  .tray-icon { font-size: 11px; }
  .tray-clock { min-width: 0; padding-left: 2px; font-size: var(--font-size-xs); }
}

@media (max-width: 480px) {
  .xp-tasks { padding: 3px 2px; }
}
</style>
