<template>
  <div class="error-404" title="404">
    <h1>404!</h1>
    <p>Looks like you have lost somewhere</p>
    <p>Let's go back to home!</p>
    <nuxt-link to="/">
      <img class="icon-40" src="/img/icons/home.svg" alt="Home" />
    </nuxt-link>
  </div>
</template>

<script>
export default {}
</script>

<style  scoped>
.error-404 {
  text-align: center;
  margin: 100px auto;
  font-size: 1.5em;
}
</style>