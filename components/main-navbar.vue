<template>
  <div class="task-pane">

    <!-- ── System Tasks ─────────────────────────────── -->
    <section class="pane-group" :class="{ collapsed: !open.systemTasks }">
      <header class="pane-header" @click="toggle('systemTasks')">
        <span class="pane-title">System Tasks</span>
        <button
          class="pane-toggle"
          :aria-label="open.systemTasks ? 'Collapse' : 'Expand'"
          :aria-expanded="open.systemTasks"
          @click.stop="toggle('systemTasks')"
        >⌃</button>
      </header>
      <div class="pane-body-wrap">
        <div class="pane-body">
          <NuxtLink to="/" class="pane-link" exact-active-class="active" @click="$emit('navigate')">
            <span class="pane-icon home"></span>
            <span class="pane-text">Home</span>
          </NuxtLink>
          <NuxtLink to="/about" class="pane-link" active-class="active" @click="$emit('navigate')">
            <span class="pane-icon user"></span>
            <span class="pane-text">About me</span>
          </NuxtLink>
          <a class="pane-link" role="button" tabindex="0" @click="openPacman">
            <span class="pane-icon games"></span>
            <span class="pane-text">Pac-Man</span>
          </a>
        </div>
      </div>
    </section>

    <!-- ── Other Places ─────────────────────────────── -->
    <section class="pane-group" :class="{ collapsed: !open.otherPlaces }">
      <header class="pane-header" @click="toggle('otherPlaces')">
        <span class="pane-title">Other Places</span>
        <button
          class="pane-toggle"
          :aria-label="open.otherPlaces ? 'Collapse' : 'Expand'"
          :aria-expanded="open.otherPlaces"
          @click.stop="toggle('otherPlaces')"
        >⌃</button>
      </header>
      <div class="pane-body-wrap">
        <div class="pane-body">
          <a :href="profile.socials.github" target="_blank" rel="noopener" class="pane-link">
            <span class="pane-icon folder"></span>
            <span class="pane-text">GitHub</span>
          </a>
          <a :href="profile.socials.linkedin" target="_blank" rel="noopener" class="pane-link">
            <span class="pane-icon folder"></span>
            <span class="pane-text">LinkedIn</span>
          </a>
          <a :href="profile.socials.blog" target="_blank" rel="noopener" class="pane-link">
            <span class="pane-icon folder"></span>
            <span class="pane-text">Blog</span>
          </a>
        </div>
      </div>
    </section>

    <!-- ── Details ──────────────────────────────────── -->
    <section class="pane-group" :class="{ collapsed: !open.details }">
      <header class="pane-header" @click="toggle('details')">
        <span class="pane-title">Details</span>
        <button
          class="pane-toggle"
          :aria-label="open.details ? 'Collapse' : 'Expand'"
          :aria-expanded="open.details"
          @click.stop="toggle('details')"
        >⌃</button>
      </header>
      <div class="pane-body-wrap">
        <div class="pane-body details">
          <p class="det-line"><strong>Portfolio</strong></p>
          <p class="det-line muted">File Folder</p>
          <p class="det-line spacer"></p>
          <p class="det-line"><span class="det-key">Owner:</span> {{ profile.username }}</p>
          <p class="det-line"><span class="det-key">Location:</span> {{ shortLocation }}</p>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { profile, shortLocation } from '~/data/profile'

const emit = defineEmits(['navigate'])
const wm = useWindows()

const open = reactive({
  systemTasks: true,
  otherPlaces: true,
  details: true,
})

function toggle(key) {
  open[key] = !open[key]
}

function openPacman() {
  wm.open('pacman')
  emit('navigate')
}
</script>

<style scoped>
.task-pane {
  padding: 10px 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 100%;
  font-family: var(--font-family);
}

/* ── Pane group (the panels with a header) ───────── */
.pane-group {
  background: linear-gradient(180deg,
    var(--xp-pane-body-1) 0%,
    var(--xp-pane-body-2) 100%);
  border: 1px solid #4D6FCD;
  border-radius: 5px;
  overflow: hidden;
}

.pane-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px 4px 10px;
  background: linear-gradient(180deg,
    var(--xp-pane-header-1) 0%,
    var(--xp-pane-header-2) 100%);
  border-bottom: 1px solid #4D6FCD;
  font-size: var(--font-size-sm);
  font-weight: bold;
  color: #0F2C70;
  user-select: none;
  cursor: pointer;
}
.pane-header:hover .pane-title { color: #002C9C; }

.pane-group.collapsed .pane-header {
  border-bottom: 0;
}

.pane-title {
  font-family: var(--font-family-title);
  letter-spacing: 0.01em;
}

.pane-toggle {
  width: 16px;
  height: 16px;
  display: grid;
  place-items: center;
  background: linear-gradient(180deg, #FFFFFF 0%, #B7C8E5 100%);
  border: 1px solid #4D6FCD;
  border-radius: 50%;
  color: #0F2C70;
  font-size: 9px;
  cursor: pointer;
  line-height: 1;
  transition: transform 0.2s ease;
}
.pane-toggle:hover {
  background: linear-gradient(180deg, #FFFFFF 0%, #D8E4F8 100%);
}
.pane-group.collapsed .pane-toggle {
  transform: rotate(180deg);
}

/* Animated collapse wrapper — max-height so the collapsed pane sits
   flush with the bottom of the header (zero residual layout). */
.pane-body-wrap {
  max-height: 320px;
  overflow: hidden;
  transition: max-height 0.22s ease;
}
.pane-group.collapsed .pane-body-wrap {
  max-height: 0;
}

.pane-body {
  padding: 6px 8px 8px;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

/* ── Pane links ──────────────────────────────────── */
.pane-link {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 3px 6px;
  border-radius: 3px;
  font-size: var(--font-size-sm);
  color: #0F2C70;
  cursor: pointer;
  text-decoration: none;
  border: 1px solid transparent;
}
.pane-link:hover:not(.disabled) {
  color: #0033CC;
  text-decoration: underline;
}
.pane-link.active {
  background: rgba(255, 255, 255, 0.55);
  border-color: #4D6FCD;
  font-weight: bold;
}
.pane-link.disabled {
  color: #6E7CA0;
  cursor: default;
}
.pane-link.disabled em {
  font-style: italic;
  font-size: 10px;
  opacity: 0.85;
}

/* ── Pane icons (CSS-only XP-ish glyphs) ─────────── */
.pane-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  position: relative;
  background-repeat: no-repeat;
}

.pane-icon.home {
  background:
    linear-gradient(180deg, #E04A3E 0%, #B71F1F 100%);
  clip-path: polygon(50% 5%, 95% 45%, 85% 45%, 85% 95%, 60% 95%, 60% 65%, 40% 65%, 40% 95%, 15% 95%, 15% 45%, 5% 45%);
}

.pane-icon.user {
  background:
    radial-gradient(circle at 50% 30%, #FFD8A8 28%, transparent 30%),
    linear-gradient(180deg, #3F8CF3 60%, #1A4BAE 100%);
  border-radius: 3px;
}

.pane-icon.games {
  background:
    radial-gradient(circle at 30% 50%, #FFC83D 18%, transparent 20%),
    radial-gradient(circle at 70% 50%, #E04A3E 18%, transparent 20%),
    linear-gradient(180deg, #888 0%, #555 100%);
  border-radius: 50% / 35%;
}

.pane-icon.folder {
  background:
    linear-gradient(180deg, #FFE99C 0%, #FFC83D 100%);
  clip-path: polygon(0 25%, 38% 25%, 45% 15%, 100% 15%, 100% 95%, 0 95%);
  border: 1px solid #B07B0A;
}

.pane-text { line-height: 1.3; }

/* ── Details panel ───────────────────────────────── */
.pane-body.details {
  font-size: var(--font-size-sm);
  color: #0F2C70;
  gap: 3px;
}
.det-line {
  margin: 0;
  line-height: 1.45;
}
.det-line.muted { color: #4A5A8A; font-style: italic; font-size: 11px; }
.det-line.spacer { height: 4px; }
.det-key { color: #4A5A8A; }
</style>
