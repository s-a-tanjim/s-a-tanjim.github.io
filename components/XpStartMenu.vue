<template>
  <div class="xp-startmenu" @click.self="emit('close')">
    <div class="sm-panel">
      <div class="sm-header">
        <img
          :src="profile.avatar.src"
          :srcset="profile.avatar.srcset"
          sizes="44px"
          alt=""
          class="sm-avatar"
        />
        <span class="sm-username">{{ profile.name }}</span>
      </div>
      <div class="sm-body">
        <div class="sm-col sm-col-left">
          <NuxtLink to="/" class="sm-item" @click="emit('close')">
            <span class="sm-bullet">📄</span><span>Home</span>
          </NuxtLink>
          <NuxtLink to="/about" class="sm-item" @click="emit('close')">
            <span class="sm-bullet">👤</span><span>About me</span>
          </NuxtLink>
          <div class="sm-item" @click.stop="emit('launch', 'cmd')">
            <span class="sm-bullet">⌨️</span><span>Command Prompt</span>
          </div>
          <div class="sm-sep"></div>
          <a :href="profile.socials.github" target="_blank" rel="noopener" class="sm-item">
            <span class="sm-bullet">🐙</span><span>GitHub</span>
          </a>
          <a :href="profile.socials.linkedin" target="_blank" rel="noopener" class="sm-item">
            <span class="sm-bullet">💼</span><span>LinkedIn</span>
          </a>
          <a :href="profile.socials.blog" target="_blank" rel="noopener" class="sm-item">
            <span class="sm-bullet">✍️</span><span>Blog</span>
          </a>
        </div>
        <div class="sm-col sm-col-right">
          <div class="sm-item disabled"><span class="sm-bullet">📂</span><span>My Documents</span></div>
          <div class="sm-item" @click.stop="emit('launch', 'photos')">
            <span class="sm-bullet">🖼️</span><span>My Pictures</span>
          </div>
          <div class="sm-item" @click.stop="emit('launch', 'pacman')">
            <span class="sm-bullet">🎮</span><span>Pac-Man</span>
          </div>
          <div class="sm-sep"></div>
          <div class="sm-item disabled"><span class="sm-bullet">⚙️</span><span>Control Panel</span></div>
          <NuxtLink to="/contact" class="sm-item" @click="emit('close')">
            <span class="sm-bullet">❓</span><span>Help and Support</span>
          </NuxtLink>
        </div>
      </div>
      <div class="sm-footer">
        <button class="sm-foot-btn" @click="emit('close')">
          <span class="sm-bullet">🔒</span><span>Log Off</span>
        </button>
        <button class="sm-foot-btn" @click="emit('close')">
          <span class="sm-bullet">⏻</span><span>Turn Off Computer</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { profile } from '~/data/profile'
import type { AppKey } from '~/composables/useWindows'

/* The Start menu panel. It renders over everything and dismisses on an
   outside click; launching an app is the layout's job, so the menu only
   says which one. */
const emit = defineEmits<{
  close: []
  launch: [app: AppKey]
}>()
</script>

<style scoped>
.xp-startmenu {
  position: fixed;
  inset: 0;
  z-index: 95;
}
.sm-panel {
  position: absolute;
  left: 0;
  bottom: calc(var(--taskbar-h) + env(safe-area-inset-bottom, 0px));
  width: 380px;
  max-width: 95vw;
  background: var(--xp-window);
  border: 1px solid #003BB5;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  font-size: var(--font-size-sm);
}
.sm-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  /* Same Luna gradient as the window title bar (was a mismatched
     symmetric glass gradient before). */
  background: var(--xp-luna-titlebar);
  color: #fff;
  font-family: var(--font-family-title);
  font-weight: bold;
  font-size: 14px;
  text-shadow: 1px 1px #0f1089;
  border-bottom: 2px solid #FF9923;
}
.sm-avatar {
  width: 44px;
  height: 44px;
  border-radius: 4px;
  border: 2px solid #fff;
  object-fit: cover;
  box-shadow: 0 0 0 1px #003BB5;
}
.sm-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: linear-gradient(90deg, #fff 0%, #fff 50%, #D8E4F8 50%, #D8E4F8 100%);
}
.sm-col { padding: 8px 4px; }
.sm-col-right { background: #D8E4F8; }
.sm-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 10px;
  color: #000;
  cursor: pointer;
  border-radius: 2px;
  text-decoration: none;
}
.sm-item:hover:not(.disabled) {
  background: var(--xp-selection);
  color: #fff;
}
.sm-item.disabled { color: #8A8A8A; cursor: default; }
.sm-bullet { width: 18px; text-align: center; flex-shrink: 0; }
.sm-sep {
  height: 1px;
  background: var(--xp-divider);
  margin: 4px 8px;
}
.sm-footer {
  display: flex;
  justify-content: flex-end;
  gap: 6px;
  padding: 6px 10px;
  background:
    linear-gradient(180deg, #BFD0EE 0%, #8AAEE0 100%);
  border-top: 1px solid #4D6FCD;
}
.sm-foot-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 3px;
  color: #000;
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  cursor: pointer;
}
.sm-foot-btn:hover {
  background: rgba(255, 255, 255, 0.4);
  border-color: #4D6FCD;
}

@media (max-width: 900px) {
  .sm-panel { width: 92vw; }
}
</style>
