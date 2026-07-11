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

</style>