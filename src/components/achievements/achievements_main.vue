<template>
  <div>
    <section class="container mt-5" style="text-align: center">
      <h3>Some of my Achievements</h3>

      <div class="row justify-content-center mt-3">
        <div
          v-for="(data, index) in projects"
          v-bind:key="index"
          class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-4"
        >
          <div class="card-container" @click="showModal(data)">
            <img :src="data.img_src" class="card-img" :alt="data.title" />
            <div class="mt-3" style="color: #111">
              <h5 style="font-weight: bold">{{ data.title }}</h5>
            </div>
          </div>
        </div>
      </div>
    </section>

    <b-modal
      id="achievementModal"
      centered
      :title="modalData.title ? modalData.title : ''"
      ok-only
    >
      <img
        :src="modalData.img_src ? modalData.img_src : ''"
        class="modal-img"
        :alt="modalData.title ? modalData.title : ''"
      />
      <p class="my-4" style="color: #111 !important">
        {{ modalData.description ? modalData.description : "" }}
      </p>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projects: [
        {
          title: "2nd runners up in 'Robo War'",
          description:
            "2nd runners up in 'Robo War' segment of special program for 'Digital Bangladesh Day' organised by 'A2i innovation lab'. The team (MIST Robowarriors) consists of Shafayetul Islam, Ahasan Siddique, Shoeb Ahmed Tanjim",
          img_src: "img/achievements/robowar-a2i.jpg",
        },
        {
          title: "Champion in 'Robo War'",
          description:
            "Champion in 'Robo War' segment of NDITC_init 2019 organised by 'Notre Dame College, Dhaka'. The team (MIST Robowarriors) consists of Shafayetul Islam, Ahasan Siddique, Farabi Hossain, Shoeb Ahmed Tanjim",
          img_src: "img/achievements/nditc.jpg",
        },
        {
          title: "Champion in 'Robo Fest 2018'",
          description:
            "Champion in Robo Fest 2018 organised by 'MIST'. The team (MIST Robowarriors) consists of Shafayetul Islam, Ahasan Siddique, Farabi Hossain, Shoeb Ahmed Tanjim",
          img_src: "img/achievements/robofest.jpg",
        },
      ],
      modalData: {},
    };
  },
  methods: {
    showModal(data) {
      this.modalData = data;
      this.$bvModal.show("achievementModal");
    },
  },
};
</script>

<style scoped>
.card-container {
  padding: 10px;
  background-color: #f5f5f5;
  cursor: pointer;
  border-radius: 5px;
}
.card-img {
  max-width: 350px;
  object-fit: cover;
  height: 250px;
}
.modal-img {
  max-width: 550px;
  max-height: 400px;
  object-fit: cover;
  width: 100%;
}
</style>