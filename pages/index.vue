<template>
  <div>
    <main-navbar />
    <hr />
    <section class="container">
      <div class="row align-items-center my-5">
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 pr-mc">
          <img src="/img/sat.jpg" class="dp-img" alt="Photo" />
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 pl-mc">
          <div>Hi there! This is</div>
          <h1>Shoeb Ahmed Tanjim</h1>
          <p>A Full Stack Developer</p>
        </div>
      </div>
    </section>
    <hr />
    <section class="container my-5 text-center">
      <div>
        <h3>My Experties</h3>
        <home-experties-table />
      </div>
    </section>
    <hr />
    <section class="container my-5">
      <div>
        <h3>About Me</h3>
        <p>
          Hi there! I'm an undergraduate student of Department of Computer
          Science and Engineering at Military Institute of Science and
          Technology. Programming is what I love most and Travelling is what I
          enjoy most! A pet lover but pet is not allowed at my home :')
        </p>
      </div>
    </section>
    <main-footer />
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.dp-img {
  max-width: 250px;
  width: 100%;
  border-radius: 50%;
}
</style>
