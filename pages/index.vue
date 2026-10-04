<template>
  <div class="home-page">

    <!-- Banner header strip, like XP page banner -->
    <div class="page-banner">
      <h1 class="banner-title">{{ profile.name }}</h1>
      <p class="banner-sub">{{ profile.role }} · {{ fullLocation }}</p>
    </div>

    <div class="home-content">

      <!-- Welcome -->
      <fieldset class="xp-group">
        <legend>Welcome</legend>
        <div class="profile-row">
          <NuxtImg
            :src="profile.avatar.src"
            width="120"
            height="120"
            densities="x1 x2"
            format="webp"
            fetchpriority="high"
            class="avatar"
            :alt="profile.name"
          />
          <div class="profile-fields">
            <p class="greeting">Hi, I'm Shoeb. Crafting software at {{ profile.company }}.</p>
            <span class="status-online">
              <span class="status-dot"></span> Online
            </span>
          </div>
        </div>
      </fieldset>

      <!-- Action buttons -->
      <div class="actions">
        <NuxtLink to="/about" class="xp-btn primary">
          <span class="btn-icon user"></span>
          <span>About me</span>
        </NuxtLink>
        <button type="button" class="xp-btn" @click="openPacman">
          <span class="btn-icon pacman"></span>
          <span>Play Pac-Man</span>
        </button>
        <a :href="profile.socials.github" target="_blank" rel="noopener" class="xp-btn">
          <span class="btn-icon link"></span>
          <span>GitHub</span>
        </a>
        <a :href="profile.socials.blog" target="_blank" rel="noopener" class="xp-btn">
          <span class="btn-icon link"></span>
          <span>Blog</span>
        </a>
      </div>

      <!-- Cute info-bar like XP's "tip" strip -->
      <div class="xp-tip">
        <span class="tip-icon">💡</span>
        <span>Tip: click the green <strong>start</strong> button below for a menu.</span>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { profile, fullLocation } from '~/data/profile'

useHead({
  title: `Home | ${profile.username}`,
})

const wm = useWindows()
function openPacman() { wm.open('pacman') }
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

/* ── Content ─────────────────────────────────────── */
.home-content {
  padding: 18px 24px 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 760px;
}

/* ── Profile row ─────────────────────────────────── */
.profile-row {
  display: flex;
  align-items: center;
  gap: 22px;
}
.avatar {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 1px solid #4D6FCD;
  padding: 3px;
  background: #fff;
  box-shadow:
    inset 1px 1px 0 #FFFFFF,
    1px 1px 4px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
}

.profile-fields {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: var(--font-size-sm);
}
.greeting {
  font-size: var(--font-size-base);
  color: #000;
  line-height: 1.5;
}
.status-online {
  display: inline-flex;
  align-self: flex-start;
  align-items: center;
  gap: 5px;
  padding: 2px 8px;
  font-weight: bold;
  color: #1B7A1B;
  background: linear-gradient(180deg, #EAF7E5 0%, #C9E8BB 100%);
  border: 1px solid #6CA84F;
  border-radius: 10px;
}
.status-dot {
  width: 8px;
  height: 8px;
  background: radial-gradient(circle at 30% 30%, #8FE57F 0%, #2DA63A 70%, #1B7A1B 100%);
  border-radius: 50%;
  box-shadow: 0 0 4px rgba(45, 166, 58, 0.7);
}

/* ── Tip bar ─────────────────────────────────────── */
.xp-tip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  font-size: var(--font-size-sm);
  background: linear-gradient(180deg, #FFFDDD 0%, #FFF3A8 100%);
  border: 1px solid #C0985C;
  border-radius: 3px;
  color: #4A3500;
}
.tip-icon { font-size: 14px; }

/* ── Responsive ──────────────────────────────────── */
@media (max-width: 600px) {
  .home-content { padding: 14px 16px 24px; gap: 12px; }
  .profile-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }
}
</style>
