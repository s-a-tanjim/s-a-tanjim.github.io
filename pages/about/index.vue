<template>
  <div class="about-page">

    <div class="page-banner">
      <h1 class="banner-title">About</h1>
    </div>

    <div class="about-content">

      <!-- Profile -->
      <fieldset class="xp-group">
        <legend>Profile</legend>
        <div class="kv-grid">
          <div class="kv-cell"><span class="k">Role</span><span class="v">{{ profile.role }}</span></div>
          <div class="kv-cell"><span class="k">Company</span><span class="v">{{ profile.company }}</span></div>
          <div class="kv-cell"><span class="k">Location</span><span class="v">{{ fullLocation }}</span></div>
          <div class="kv-cell"><span class="k">Education</span><span class="v">{{ profile.education }}</span></div>
        </div>
      </fieldset>

      <!-- Bio -->
      <fieldset class="xp-group">
        <legend>Bio</legend>
        <p class="prose">
          Programming is what I love most; traveling is what I enjoy most. Off the keyboard, I'm a proud husband.
        </p>
      </fieldset>

      <!-- Links -->
      <fieldset class="xp-group">
        <legend>Contact</legend>
        <div class="actions">
          <a :href="profile.socials.github" target="_blank" rel="noopener" class="xp-btn primary">
            <span class="btn-icon link"></span><span>GitHub</span>
          </a>
          <a :href="profile.socials.linkedin" target="_blank" rel="noopener" class="xp-btn">
            <span class="btn-icon link"></span><span>LinkedIn</span>
          </a>
          <a :href="profile.socials.blog" target="_blank" rel="noopener" class="xp-btn">
            <span class="btn-icon link"></span><span>Blog</span>
          </a>
          <a :href="email" class="xp-btn">
            <span class="btn-icon mail"></span><span>Email</span>
          </a>
        </div>
      </fieldset>

    </div>
  </div>
</template>

<script setup>
import { profile, fullLocation } from '~/data/profile'

useHead({
  title: `About | ${profile.username}`,
  meta: [{ name: 'description', content: `About ${profile.name} — ${profile.role}, ${profile.city}` }],
})

const email = ref('')
onMounted(() => {
  email.value = `mailto:${'shoeb'}${'tanjim'}@${'gmail'}.com`
})
</script>

<style scoped>
.about-page {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

/* ── Content ─────────────────────────────────────── */
.about-content {
  padding: 18px 24px 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 760px;
}

/* ── Responsive ──────────────────────────────────── */
@media (max-width: 600px) {
  .about-content { padding: 14px 16px 24px; gap: 12px; }
}
</style>
