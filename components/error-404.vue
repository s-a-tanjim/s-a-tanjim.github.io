<template>
  <div class="error-404" title="404">
    <h1>404!</h1>
    <p>Looks like you have lost somewhere</p>
    <p>Let's go back to home!</p>
    <nuxt-link to="/">
      <icons-home class="home-icon" />
    </nuxt-link>
  </div>
</template>
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