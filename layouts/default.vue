<template>
  <div>
    <!--<h1>Color mode: {{ $colorMode.value }}</h1>
    <select v-model="$colorMode.preference">
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="sepia">Sepia</option>
    </select>-->
    <!--<div class="side-img-container">
      <transition name="side-icon">
        <div class="bar"></div>
      </transition>
    </div>-->
    <div class="mode-change-container">
      <img
        class="light-mode-img"
        :class="{ hide: $colorMode.value == 'light' }"
        src="/img/icons/sun.svg"
        alt="Light"
        @click="$colorMode.preference = 'light'"
      />
      <img
        class="dark-mode-img"
        :class="{ hide: $colorMode.value == 'dark' }"
        src="/img/icons/moon.svg"
        alt="Dark"
        @click="$colorMode.preference = 'dark'"
      />
    </div>
    <Nuxt />
  </div>
</template>
<script >
export default {
  transition: 'side-icon',
  mounted() {
    this.$colorMode.preference = 'dark'
  },
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
/* Mode slider */
.hide {
  display: none;
}
.mode-change-container {
  position: fixed;
  top: 75px;
  left: 15px;
}
.light-mode-img,
.dark-mode-img {
  height: 30px;
  width: 30px;
  cursor: pointer;
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
}
.light-mode-img:hover,
.dark-mode-img:hover {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>