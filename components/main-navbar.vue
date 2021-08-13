<template>
  <nav
    class="navbar navbar-expand-lg"
    :class="{
      'navbar-light': $colorMode.value === 'light',
      'navbar-dark': $colorMode.value === 'dark',
    }"
  >
    <NuxtLink tag="a" to="/" class="navbar-brand ms-2">Home</NuxtLink>

    <button
      class="navbar-toggler me-2"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <NuxtLink tag="a" to="/resume" class="nav-link">Resume</NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink tag="a" to="/works" class="nav-link">Works</NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink tag="a" to="/achievements" class="nav-link"
            >Achievements</NuxtLink
          >
        </li>
        <li class="nav-item">
          <NuxtLink tag="a" to="/about" class="nav-link">About</NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {}
</script>

<style scoped>
.nuxt-link-exact-active {
  color: var(--color-primary) !important;
}
@media (max-width: 991px) {
  .navbar-nav a {
    margin-left: 10px;
  }
}
</style>