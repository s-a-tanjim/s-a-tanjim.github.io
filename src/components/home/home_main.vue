<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 pr-mc mt-5">
          <img v-lazy="'img/dp.jpg'" class="dp-img" alt="Photo" />
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 pl-mc mt-5">
          <h3>Hi there</h3>
          <p>
            This is Shoeb Ahmed Tanjim. A Full Stack Developer at
            <a href="https://www.bitechx.com" target="_blank">Bitechx</a>. I'm a
            undergraduate student of department of Computer Science and
            Engineering at Militart Institute of Science and Technology.
          </p>
          <p>
            Programming is what I love most and Travelling is what I enjoy most!
            A pet lover but pet is not allowed at my home :')
          </p>
        </div>
      </div>
    </div>
    <section class="container"></section>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.dp-img {
  max-width: 400px;
  width: 100%;
}
a {
  color: #fff !important;
}

a:hover {
  color: #fff !important;
}
</style>