<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link tag="a" to="/" class="navbar-brand">Home</router-link>

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
          <router-link tag="a" to="/resume" class="nav-link"
            >Resume</router-link
          >
        </li>
        <li class="nav-item">
          <router-link tag="a" to="/projects" class="nav-link"
            >Projects</router-link
          >
        </li>
        <li class="nav-item">
          <router-link tag="a" to="/achievements" class="nav-link"
            >Achievements</router-link
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
.router-link-exact-active {
  color: #fff !important;
}
</style>