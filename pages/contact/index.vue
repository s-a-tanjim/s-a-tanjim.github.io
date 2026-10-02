<template>
  <div class="contact-page">

    <div class="page-banner">
      <h1 class="banner-title">Contact me</h1>
    </div>

    <div class="contact-content">

      <fieldset class="xp-group">
        <legend>Get in touch</legend>
        <p class="prose">
          Feel free to reach out for new opportunities, collaborations, or just to say hi.
        </p>
        <legend>Channels</legend>
        <div class="actions">
          <a :href="email" class="xp-btn primary">
            <span class="btn-icon mail"></span><span>Email</span>
          </a>
          <a :href="profile.socials.linkedin" target="_blank" rel="noopener" class="xp-btn">
            <span class="btn-icon link"></span><span>LinkedIn</span>
          </a>
          <a :href="profile.socials.github" target="_blank" rel="noopener" class="xp-btn">
            <span class="btn-icon link"></span><span>GitHub</span>
          </a>
          <a :href="profile.socials.blog" target="_blank" rel="noopener" class="xp-btn">
            <span class="btn-icon link"></span><span>Blog</span>
          </a>
        </div>
      </fieldset>

    </div>
  </div>
</template>

<script setup lang="ts">
import { profile, fullLocation } from '~/data/profile'

useHead({
  title: `Contact | ${profile.username}`,
  meta: [{ name: 'description', content: `Contact ${profile.name} — ${profile.role}, ${profile.city}` }],
})

const email = ref('')
onMounted(() => {
  email.value = `mailto:${'shoeb'}${'tanjim'}@${'gmail'}.com`
})
</script>

<style scoped>
.contact-page {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.contact-content {
  padding: 18px 24px 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 760px;
}

@media (max-width: 600px) {
  .contact-content { padding: 14px 16px 24px; gap: 12px; }
}
</style>
