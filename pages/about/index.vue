<template>
  <div>
    <section class="container mt-5">
      <div class="text-center">
        <h1>About me</h1>
      </div>
      <div class="row mt-5">
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
          <p>I'm Tanjim, an undergrad student from Dhaka.</p>
          <p>
            Currently completing my graduation from Military Institute of
            Science and Technology. Besides my study I works as a full stack
            developer.
          </p>
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
          <div class="img-container">
            <img :src="imgUrl" class="cover-img" alt="Cover" />
            <div class="text-end">
              <button
                @click="imgUrl = '/img/me/about-img.jpg'"
                class="btn btn-secondary"
              >
                Clear Image
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'About | s-a-tanjim',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'About | s-a-tanjim | Personal Website',
        },
      ],
    }
  },
  data() {
    return {
      imgUrl: '/img/me/about-img-blur.jpg',
    }
  },
}
</script>

<style scoped>
.cover-img {
  width: 100%;
  height: 600px;
  margin: auto;
  object-fit: cover;
  /*-webkit-filter: blur(5px);*/ /* Safari 6.0 - 9.0 */
  /*filter: blur(5px);*/
}
</style>