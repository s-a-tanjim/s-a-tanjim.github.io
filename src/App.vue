<template>
  <div id="app">
    <vue-progress-bar></vue-progress-bar>
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
  mounted() {
    this.$Progress.finish();
  },
  created() {
    this.$Progress.start();
    this.$router.beforeEach((to, from, next) => {
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress;
        this.$Progress.parseMeta(meta);
      }
      this.$Progress.start();
      next();
    });
    this.$router.afterEach(() => {
      this.$Progress.finish();
    });
  },
};
</script>

<style>
</style>
