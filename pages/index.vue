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
          <img
            :src="profile.avatar.src"
            :srcset="profile.avatar.srcset"
            sizes="120px"
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
        <NuxtLink to="/games/pacman" class="xp-btn">
          <span class="btn-icon pacman"></span>
          <span>Play Pac-Man</span>
        </NuxtLink>
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

<script setup>
import { profile, fullLocation } from '~/data/profile'

useHead({
  title: `Home | ${profile.username}`,
})
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

/* ── Banner ──────────────────────────────────────── */
.page-banner {
  padding: 14px 24px;
  background:
    linear-gradient(90deg,
      #FFFFFF 0%,
      #D6DFF7 60%,
      #7BA2E8 100%);
  border-bottom: 1px solid #4D6FCD;
  color: #0F2C70;
}
.banner-title {
  font-family: var(--font-family-title);
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 0.01em;
  line-height: 1.2;
  text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.6);
}
.banner-sub {
  font-size: var(--font-size-sm);
  color: #36497B;
  margin-top: 2px;
}

/* ── Content ─────────────────────────────────────── */
.home-content {
  padding: 18px 24px 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 760px;
}

/* ── XP-style group box (fieldset with legend) ───── */
.xp-group {
  border: 1px solid #919B9C;
  border-radius: 3px;
  padding: 12px 16px 14px;
  background: var(--xp-window);
  box-shadow:
    inset 1px 1px 0 #FFFFFF,
    inset -1px -1px 0 #E2DECC;
}
.xp-group legend {
  padding: 0 6px;
  font-weight: bold;
  color: #0033CC;
  font-size: var(--font-size-sm);
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

/* ── XP buttons ──────────────────────────────────── */
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.xp-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 96px;
  padding: 5px 14px;
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  color: #000;
  cursor: pointer;
  background: linear-gradient(180deg, #FCFCFC 0%, #F0EDDD 50%, #D4D0C0 100%);
  border: 1px solid #003C74;
  border-radius: 3px;
  box-shadow:
    inset 1px 1px 0 #FFFFFF,
    inset -1px -1px 0 #ACA899;
  text-decoration: none;
}
.xp-btn:hover {
  background: linear-gradient(180deg, #FFFEF1 0%, #FFE9A5 50%, #E5CC75 100%);
  border-color: #C0985C;
}
.xp-btn:active {
  background: linear-gradient(180deg, #D4D0C0 0%, #F0EDDD 50%, #FCFCFC 100%);
  box-shadow:
    inset -1px -1px 0 #FFFFFF,
    inset 1px 1px 0 #ACA899;
}
.xp-btn.primary {
  font-weight: bold;
  box-shadow:
    inset 1px 1px 0 #FFFFFF,
    inset -1px -1px 0 #ACA899,
    0 0 0 1px #003C74;
}

.btn-icon { width: 14px; height: 14px; flex-shrink: 0; }
.btn-icon.user {
  background:
    radial-gradient(circle at 50% 30%, #FFD8A8 28%, transparent 30%),
    linear-gradient(180deg, #3F8CF3 60%, #1A4BAE 100%);
  border-radius: 2px;
}
.btn-icon.link {
  background:
    linear-gradient(180deg, #FFE99C 0%, #FFC83D 100%);
  clip-path: polygon(0 25%, 38% 25%, 45% 15%, 100% 15%, 100% 95%, 0 95%);
}
.btn-icon.pacman {
  border-radius: 50%;
  background:
    conic-gradient(
      from -30deg,
      transparent 0deg 60deg,
      #FFEC2A 60deg 360deg);
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
  .page-banner { padding: 12px 16px; }
  .banner-title { font-size: 18px; }
  .home-content { padding: 14px 16px 24px; gap: 12px; }
  .profile-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }
}
</style>
