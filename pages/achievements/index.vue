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
            <div class="mt-3 card-title" style="color: #111">
              <h5 style="font-weight: bold">{{ data.title }}</h5>
            </div>
          </div>
        </div>
      </div>
    </section>
    <main-modal :data="modalData" ref="modal" />
    <main-footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      projects: [
        {
          title: 'Topped in University Rover Challenge(URC) 2021',
          description:
            'University Rover Challenge is one of the most prestigious robotics challenge organised by Mars Society, USA.',
          img_src: '/img/achievements/urc.jpg',
        },
        {
          title:
            'Champion in UK-RAS Medical Robotics for Contagious Challenge 2020',
          description:
            'Champion in UK-RAS Medical Robotics for Contagious Challenge 2020 organised by UK-RAS hosted by Imperial College London.',
          img_src: '/img/achievements/uvc.jpg',
        },
        {
          title: 'Best Junior Team',
          description:
            'Best Junior Team in Intra MIST Programming and Gaming Contest 2018 organised by Department of Computer Science and Engineering, MIST.',
          img_src: '/img/achievements/contest.jpg',
        },
        {
          title: "2nd runners up in 'Robo War'",
          description:
            "2nd runners up in 'Robo War' segment of special program for 'Digital Bangladesh Day' organised by 'A2i innovation lab'. The team (MIST Robowarriors) consists of Shafayetul Islam, Ahasan Siddique, Shoeb Ahmed Tanjim",
          img_src: '/img/achievements/robowar-a2i.jpg',
        },
        {
          title: "Champion in 'Robo War'",
          description:
            "Champion in 'Robo War' segment of NDITC_init 2019 organised by 'Notre Dame College, Dhaka'. The team (MIST Robowarriors) consists of Shafayetul Islam, Ahasan Siddique, Farabi Hossain, Shoeb Ahmed Tanjim",
          img_src: '/img/achievements/nditc.jpg',
        },
        {
          title: "Champion in 'Robo Fest 2018'",
          description:
            "Champion in Robo Fest 2018 organised by 'MIST'. The team (MIST Robowarriors) consists of Shafayetul Islam, Ahasan Siddique, Farabi Hossain, Shoeb Ahmed Tanjim",
          img_src: '/img/achievements/robofest.jpg',
        },
        /*{
          title: "Commandant appreciation award 2019",
          description:
            "",
          img_src: "/img/achievements/robofest.jpg",
        },*/
      ],
      modalData: {},
    }
  },
  methods: {
    showModal(data) {
      this.modalData = data
      this.$refs['modal'].openModal()
    },
  },
}
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
@media screen and (min-width: 992px) {
  .card-title {
    height: 100px;
  }
}
</style>