<template>
  <div>
    <section class="container home">
      <div class="row align-items-center my-5 height">
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 pr-mc">
          <img
            src="/img/sat.jpg"
            srcset="
              /img/sat-250.jpg 250w,
              /img/sat-300.jpg 300w,
              /img/sat-400.jpg 400w,
              /img/sat.jpg     600w
            "
            sizes="250px"
            class="dp-img"
            alt="Avatar"
          />
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 pl-mc">
          <div>Hi there! This is</div>
          <h1>Shoeb Ahmed Tanjim</h1>
          <p>A Software Engineer</p>
        </div>
      </div>
    </section>
    <hr class="dashed-hr" />
    <section class="container my-5 text-center">
      <div>
        <h3 class="my-5">My Expertise</h3>
        <home-expertise-table />
      </div>
    </section>
    <hr class="dashed-hr" />
    <section class="container my-5">
      <home-works />
    </section>
    <hr class="dashed-hr" />
    <section class="container my-5">
      <home-timeline />
    </section>
    <hr class="dashed-hr" />
    <section class="container my-5">
      <div class="about-me text-center">
        <h3>About Me</h3>
        <p>
          Hi there! I'm an undergraduate student of Department of Computer
          Science and Engineering at Military Institute of Science and
          Technology. Programming is what I love most and Travelling is what I
          enjoy most!
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import themeSwitch from '~/components/theme-switch.vue'
export default {
  components: { themeSwitch },
}
</script>

<style scoped>
.home:before {
  background-image: radial-gradient(var(--bg-dotted-1) 15%, transparent 0%),
    radial-gradient(var(--bg-dotted-1) 15%, transparent 0%);
  background-image: radial-gradient(var(--bg-dotted-2) 15%, transparent 0%),
    radial-gradient(var(--bg-dotted-2) 15%, transparent 0%);
  background-size: 0.75rem 0.75rem;
  background-position: 0 0, 0.375rem 0.375rem;
  -webkit-clip-path: polygon(
    100% 8%,
    88% 8%,
    50% 8%,
    100% 45%,
    100% 100%,
    50% 100%,
    0 70%,
    0 100%,
    100% 100%
  );
  clip-path: polygon(
    100% 8%,
    88% 8%,
    50% 8%,
    100% 45%,
    100% 100%,
    50% 100%,
    0 70%,
    0 100%,
    100% 100%
  );
  content: '';
  height: 760px;
  left: 50%;
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  width: 100%;
  z-index: -1;
}
.height {
  min-height: 600px;
}
.dp-img {
  width: 250px;
  height: 250px;
  border: 2px solid #563673;
  border-radius: 50%;
  transition: transform 0.3s;
}
.dp-img:hover {
  cursor: move;
  border: 3px solid #784ca1;
  transform: scale(1.02);
}
.about-me {
  max-width: 650px;
  margin: auto;
}
@media screen and (max-width: 991px) {
  .dp-img {
    width: 200px;
    height: 200px;
  }
}
</style>
