<template>
  <div>
    <div class="container resume">
      <h1 style="display: none">Resume</h1>
      <a class="xp-btn primary download-btn" href="/cv/s-a-tanjim-CV.pdf" download>
        Download PDF
      </a>
      <img src="/cv/cv-img-1.png" class="cv-img" alt="CV" />
      <img src="/cv/cv-img-2.png" class="cv-img" alt="CV" />
    </div>
  </div>
</template>

<script setup>
import { profile } from '~/data/profile'

useHead({
  title: `Resume | ${profile.username}`,
  meta: [{
    name: 'description',
    content: `Resume | ${profile.username} | Personal Website`
  }]
})
</script>

<style scoped>
.resume {
  margin-top: 3rem;
  text-align: center;
}

.download-btn {
  margin-bottom: 3rem;
}

.cv-img {
  width: 100%;
  margin: 0.25rem 0;
}

/* XP button (shared look with the other pages) */
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
  background: linear-gradient(180deg, #fcfcfc 0%, #f0eddd 50%, #d4d0c0 100%);
  border: 1px solid #003c74;
  border-radius: 3px;
  box-shadow:
    inset 1px 1px 0 #ffffff,
    inset -1px -1px 0 #aca899;
  text-decoration: none;
}
.xp-btn:hover {
  background: linear-gradient(180deg, #fffef1 0%, #ffe9a5 50%, #e5cc75 100%);
  border-color: #c0985c;
}
.xp-btn:active {
  background: linear-gradient(180deg, #d4d0c0 0%, #f0eddd 50%, #fcfcfc 100%);
  box-shadow:
    inset -1px -1px 0 #ffffff,
    inset 1px 1px 0 #aca899;
}
.xp-btn.primary {
  font-weight: bold;
  box-shadow:
    inset 1px 1px 0 #ffffff,
    inset -1px -1px 0 #aca899,
    0 0 0 1px #003c74;
}
</style>