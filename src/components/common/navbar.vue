<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <router-link tag="a" to="/" class="navbar-brand">Home</router-link>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <ul class="navbar-nav ml-auto">
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
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {};
</script>

<style scoped>
.router-link-exact-active {
  color: #fff !important;
}
</style>