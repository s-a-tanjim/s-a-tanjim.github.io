<template>
  <div>
    <section class="container mt-5">
      <div class="text-center">
        <h1>Some of my achievements</h1>
      </div>

      <div class="row justify-content-center mt-3">
        <div
          v-for="(data, index) in projects"
          v-bind:key="index"
          class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mt-4"
        >
          <div class="card-container">
            <div class="img-container">
              <img :src="data.img_src" class="card-img" :alt="data.title" />
            </div>
            <div class="text-container p-3" style="color: #111">
              <h5 style="font-weight: bold">{{ data.title }}</h5>
              <div>
                {{ data.description }}
              </div>
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
      title: 'Achievements | s-a-tanjim',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Achievements | s-a-tanjim | Personal Website',
        },
      ],
    }
  },
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
          title: 'Champion in Hackathon 2021',
          description:
            'Champion in Hackathon for the nation at ICT Innovation Fest 2021 organized by Department of Computer Science and Engineering, MIST',
          img_src: '/img/achievements/innovation-fest.jpg',
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
            "2nd runners up in 'Robo War' segment of special program for 'Digital Bangladesh Day' organised by 'A2i innovation lab'. The team (MIST Robowarriors) consists of Shafayetul Islam, Ahasan Siddique and Myself",
          img_src: '/img/achievements/robowar-a2i.jpg',
        },
        {
          title: "Champion in 'Robo War'",
          description:
            "Champion in 'Robo War' segment of NDITC_init 2019 organised by 'Notre Dame College, Dhaka'. The team (MIST Robowarriors) consists of Shafayetul Islam, Ahasan Siddique, Farabi Hossain and Myself",
          img_src: '/img/achievements/nditc.jpg',
        },
        {
          title: "Champion in 'Robo Fest 2018'",
          description:
            "Champion in Robo Fest 2018 organised by 'MIST'. The team (MIST Robowarriors) consists of Shafayetul Islam, Ahasan Siddique, Farabi Hossain and Myself.",
          img_src: '/img/achievements/robofest.jpg',
        },
        /*{
          title: "Commandant appreciation award 2019",
          description:
            "",
          img_src: "/img/achievements/robofest.jpg",
        },*/
      ],
    }
  },
  methods: {},
}
</script>

<style scoped>
.card-container {
  height: 100%;
  background-color: #f5f5f5;
  border-radius: var(--border-radius);
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}
.img-container {
  overflow: hidden;
  cursor: pointer;
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
}
.card-img {
  width: 100%;
  object-fit: cover;
  height: 250px;
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
  -webkit-transition: all 0.3s linear;
  transition: all 0.3s linear;
}
.card-img:hover {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
@media screen and (min-width: 992px) {
  /*.card-title {
    height: 100px;
  }*/
}
</style>