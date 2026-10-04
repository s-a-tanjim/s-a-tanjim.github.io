<template>
  <div class="photo-app">
    <div class="photo-stage">
      <NuxtPicture src="/img/me/about-img.jpg" alt="about-img.jpg" :img-attrs="{ draggable: 'false' }" sizes="sm:100vw md:800px" loading="lazy" />
    </div>
    <footer class="photo-statusbar">
      <span>C:\Portfolio\My Pictures\about-img.jpg</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
/* Windows Picture and Fax Viewer, rendered inside an <XpWindow>. */
</script>

<style scoped>
.photo-app {
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: var(--font-family);
}
.photo-stage {
  flex: 1;
  min-height: 0;
  display: grid;
  place-items: center;
  padding: 12px;
  background: #2A2A2A;
  overflow: hidden;
}
.photo-stage img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  -webkit-user-drag: none;
  user-select: none;
}
.photo-statusbar {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding: 2px 8px;
  height: var(--statusbar-h);
  background: var(--xp-window);
  border-top: 1px solid #FFFFFF;
  box-shadow: inset 0 1px 0 var(--xp-divider);
  font-size: var(--font-size-sm);
  color: #000;
}
</style>
