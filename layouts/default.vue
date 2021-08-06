<template>
  <div>
    <!--<h1>Color mode: {{ $colorMode.value }}</h1>
    <select v-model="$colorMode.preference">
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="sepia">Sepia</option>
    </select>-->
    <div class="side-img-container">
      <transition name="side-icon">
        <div class="bar"></div>
      </transition>
    </div>
    <Nuxt />
  </div>
</template>
<script >
export default {
  transition: 'side-icon',
}
</script>
<style>
.side-img-container {
  position: fixed;
  left: 0px;
  top: 75px;
  z-index: 9999;
  display: none;
}
.side-img-container .bar {
  border-top: 4px solid #111;
  width: 170px;
  transition: 1s;
  transform: translate3d(42px, -62px, -135px);
}
</style>