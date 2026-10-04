<template>
  <div>
    <div class="container resume">
      <h1 style="display: none">Resume</h1>
      <a class="xp-btn primary download-btn" :href="cvUrl" download>
        Download PDF
      </a>
      <object :data="cvUrl" type="application/pdf" class="cv-frame">
        <!-- Shown where the browser can't render PDFs inline (most mobile browsers) -->
        <p>
          Your browser can't display the PDF here.
          <a :href="cvUrl" target="_blank" rel="noopener">Open the resume</a> instead.
        </p>
      </object>
    </div>
  </div>
</template>

<script setup lang="ts">
import { profile } from '~/data/profile'

const cvUrl = '/cv/Shoeb-Ahmed-Tanjim-CV.pdf'

useHead({
  title: `Resume | ${profile.username}`,
  meta: [
    {
      name: 'description',
      content: `Resume | ${profile.username} | Personal Website`
    },
    {
      name: 'robots',
      content: 'noindex, nofollow, noarchive'
    }
  ]
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

.cv-frame {
  width: 100%;
  height: 80vh;
  border: 0;
}
</style>
