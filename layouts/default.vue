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
      <div class="bar" :class="{'transformation':loaded}"></div>
    </div>-->
    <Nuxt />
  </div>
</template>
<script >
export default {
  /*data() {
    return {
      loaded: false,
    }
  },*/
  mounted() {
    this.$colorMode.preference = 'dark'
    //this.loaded = true
  },
}
</script>
<style>
/*.side-img-container {
  position: fixed;
  left: -170px;
  top: 75px;
  z-index: 9999;
}
.side-img-container .bar {
  border-top: 4px solid #111;
  width: 170px;

  -webkit-transition: all 1s linear;
  transition: all 1s linear;
}
.transformation {
  -ms-transform: translate(170px, 0px); /* IE 9 * /
  transform: translate(170px, 0px); /* Standard syntax * /
}*/
</style>