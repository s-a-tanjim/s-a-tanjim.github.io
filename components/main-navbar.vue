<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <NuxtLink tag="a" to="/" class="navbar-brand">Home</NuxtLink>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <NuxtLink tag="a" to="/resume" class="nav-link"
            >Resume</NuxtLink
          >
        </li>
        <li class="nav-item">
          <NuxtLink tag="a" to="/projects" class="nav-link"
            >Projects</NuxtLink
          >
        </li>
        <li class="nav-item">
          <NuxtLink tag="a" to="/achievements" class="nav-link"
            >Achievements</NuxtLink
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
.nuxt-link-exact-active {
  color: #fff !important;
}
</style>