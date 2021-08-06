<template>
  <div>
    <div class="text-center my-4">
      <h3>Things I’ve Built</h3>
    </div>
    <div class="work-container my-5">
      <div class="img-container hover-zoom">
        <a href="https://hootstory.com/" target="_blank">
          <img
            class="work-img"
            src="/img/works/hootstory.jpg"
            alt="Hootstory"
          />
          <div class="img-mask"></div>
        </a>
      </div>
      <div class="work-desc-container">
        <h3>Hootstory</h3>
        <div class="work-desc">
          A story posting web-app developing for BiTechX. Currently I'm working
          on both frontend and backend with BiTechX team.
        </div>
        <div class="made-with">
          <div>Made with</div>
          NuxtJS | Laravel | AWS
        </div>
      </div>
    </div>
    <div class="work-container my-5">
      <div class="img-container hover-zoom">
        <a href="https://playmusic-z.firebaseapp.com/" target="_blank">
          <img class="work-img" src="/img/works/musicapp.jpg" alt="Hootstory" />
          <div class="img-mask"></div>
        </a>
      </div>
      <div class="work-desc-container">
        <h3>Music Player</h3>
        <div class="work-desc">
          It's a prototype web-application to test Progressive Web App(PWA)
          technology.
        </div>
        <div class="made-with">
          <div>Made with</div>
          HTML5 | CSS | JavaScript | PWA
        </div>
      </div>
    </div>

    <div class="text-center mb-5">
      <NuxtLink to="/works" tag="div" class="btn btn-secondary"
        >View more</NuxtLink
      >
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.work-container {
  display: flex;
  justify-content: center;
}

.work-desc-container {
  position: relative;
  margin-left: 20px;
  min-width: 280px;
  text-align: right;
}
.work-desc {
  position: absolute;
  bottom: 0px;
  left: -80px;
  text-align: right;
  color: var(--footer-txt);
  border: 1px solid var(--color-border);
}
.made-with {
  font-size: 0.8em;
}

.hover-zoom {
  position: relative;
  max-width: 485px;
  cursor: pointer;
  overflow: hidden;
}
.hover-zoom img {
  width: 100%;
  -webkit-transition: all 0.3s linear;
  transition: all 0.3s linear;
}
.hover-zoom:hover img {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.img-mask {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: rgba(57, 192, 237, 0.2);
  opacity: 1;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
.img-mask:hover {
  opacity: 0;
}
.work-desc {
  background-color: var(--footer-bg);
  padding: 10px;
  border-radius: var(--border-radius);
}

/* For Odd styles */
.work-container:nth-child(odd) .img-container {
  order: 2;
}
.work-container:nth-child(odd) .work-desc {
  left: unset;
  right: -100px;
}
.work-container:nth-child(odd) .work-desc-container {
  text-align: left;
  margin-left: 0px;
  margin-right: 20px;
}

@media (max-width: 991px) {
  .work-container {
    display: block;
  }
  .work-desc {
    position: unset;
    text-align: center;
  }
  .work-desc-container {
    text-align: center !important;
    margin-left: unset !important;
    margin-right: unset !important;
    margin-top: 10px;
  }
  .img-container {
    margin: auto;
  }
}
</style>