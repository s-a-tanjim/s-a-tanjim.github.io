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

<script setup>
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

.contact-content {
  padding: 18px 24px 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 760px;
}

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

.kv-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px 18px;
  font-size: var(--font-size-sm);
}
.kv-cell {
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 8px;
  align-items: baseline;
  padding: 2px 0;
}
.k { color: #4A4A4A; text-align: right; }
.v { color: #000; font-weight: bold; }

.prose {
  font-size: var(--font-size-base);
  color: #000;
  line-height: 1.55;
  margin-bottom: 10px;
}

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
.xp-btn.primary {
  font-weight: bold;
  box-shadow:
    inset 1px 1px 0 #FFFFFF,
    inset -1px -1px 0 #ACA899,
    0 0 0 1px #003C74;
}

.btn-icon { width: 14px; height: 14px; flex-shrink: 0; }
.btn-icon.link {
  background: linear-gradient(180deg, #FFE99C 0%, #FFC83D 100%);
  clip-path: polygon(0 25%, 38% 25%, 45% 15%, 100% 15%, 100% 95%, 0 95%);
}
.btn-icon.mail {
  background: linear-gradient(180deg, #F8F8F8 0%, #C8C8C8 100%);
  border: 1px solid #555;
  position: relative;
}

@media (max-width: 600px) {
  .page-banner { padding: 12px 16px; }
  .banner-title { font-size: 18px; }
  .contact-content { padding: 14px 16px 24px; gap: 12px; }
  .kv-grid { grid-template-columns: 1fr; gap: 4px 0; }
  .kv-cell { grid-template-columns: 90px 1fr; }
}
</style>
