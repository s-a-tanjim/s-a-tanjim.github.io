<template>
  <div>
    <div class="container mt-5" style="text-align: center">
      <h1 style="display: none">Resume</h1>
      <a class="btn btn-primary mb-5" href="/cv/s-a-tanjim-CV.pdf" download>
        Download PDF
      </a>
      <img src="/cv/cv-img-1.png" class="my-1" style="width: 100%" alt="CV" />
      <img src="/cv/cv-img-2.png" class="my-1" style="width: 100%" alt="CV" />
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Resume | s-a-tanjim',
  meta: [{
    name: 'description',
    content: 'Resume | s-a-tanjim | Personal Website'  
  }]
})
</script>

<style scoped>
a:hover {
  color: #fff !important;
}
</style>