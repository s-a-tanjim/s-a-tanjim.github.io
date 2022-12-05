<template>
  <div>
    <main-navbar />
    <hr class="dashed-hr" />
    <theme-switch />
    <error-404 />
    <main-footer />
  </div>
</template>

<script>
export default {}
</script>

<style  scoped>
.error-404 {
  text-align: center;
  padding-top: 100px;
  font-size: 1.5em;
  height: 63vh;
}
.home-icon {
  height: 50px;
  width: 50px;
}
</style>
<style>
.home-icon path {
  fill: var(--color-primary);
}
</style>