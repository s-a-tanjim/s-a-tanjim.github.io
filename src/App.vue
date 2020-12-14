<template>
  <div id="app">
    <navbar />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <mainfooter />
  </div>
</template>

<script>
import navbar from "./components/common/navbar";
import mainfooter from "./components/common/footer";
export default {
  name: "App",
  components: {
    navbar,
    mainfooter,
  },
};
</script>

<style>
</style>
