<template>
  <div style="position: relative">
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
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.hide {
  display: none;
}
.mode-change-container {
  position: absolute;
  top: 15px;
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