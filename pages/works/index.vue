<template>
  <div>
    <section class="container mt-5" style="text-align: center">
      <h1>Some of my works</h1>

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

    <main-modal :data="modalData" ref="modal" />
    <main-footer />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Works | s-a-tanjim | Personal Website',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Works | s-a-tanjim | Personal Website',
        },
      ],
    }
  },
  data() {
    return {
      projects: [
        {
          title: 'E-Veil',
          data: [
            {
              subtitle: 'Overview',
              desc: 'An underdeveloped Email Service. The aim of the project is to learn more about web development and web security. This was my level 2 term 2 project.',
            },
            {
              subtitle: 'Features',
              desc: 'User authentication system',
            },
            {
              subtitle: 'Tech Stack',
              desc: '',
            },
          ],
          description: '',
          img_src: '/img/project/eveil.jpg',
          github_link: '',
          project_link: 'https://e-veil.firebaseapp.com/',
        },
        {
          title: 'BitCopy',
          description:
            'Commandline based file copier software. It copies files from source to destination using buffer. Raw C language was used to build this app. The goal of this project was to learn more about buffer.',
          img_src: '/img/project/bitcopy.jpg',
          project_link: 'https://github.com/s-a-tanjim/Bit-Projects',
        },
        {
          title: 'BitFileManager',
          description:
            'Commandline based file manager software. Only files navigation is available here right now. Raw C language was used to build this app. The goal of this project was to learn more about FileSystem.',
          img_src: '/img/project/bit-filemanager.jpg',
          project_link: 'https://github.com/s-a-tanjim/Bit-Projects',
        },
        {
          title: 'Medihelp',
          description:
            "It's Commandline based software. It was my level 1 C programming language project. User input there symptoms here, and this software guesses the disease. The goal of this project was to learn more about searching. This software has a input auto-currection system. Raw C was used to build this app",
          img_src: '/img/project/medihelp.jpg',
          project_link: 'https://github.com/s-a-tanjim/MediHelp',
        },
        {
          title: 'MusicPlayer',
          description:
            "It's a browser based Music player that runs on browser and play music from your PC. Whis website can even run in offline and you can install it on android phone. The goal of this project was to learn about Progressive Web App. It's written in vanilla javascript.",
          img_src: '/img/project/musicplayer.jpg',
          project_link: 'https://playmusic-z.firebaseapp.com/',
        },
        {
          title: 'Medias',
          description:
            "It's a web-based file manager system. It runs on remote server (Raspberry Pi in my case), and you can navigate files of that remote server through this software. You can play music/videos, read PDF, read Text files which is stored in remote server using this app. I wanted to make my own GoogleDrive in my network, that's why i made it.",
          img_src: '/img/project/medias.jpg',
          project_link: 'https://github.com/s-a-tanjim/medias',
        },
        {
          title: 'UVC Purge',
          description:
            'It was a group project with the support of the Computer Science and Engineering Department of MIST. We developed this UVC Disinfection robot to fight against Covid19 pandemic situation. This bot is capable to destroy coronavirus with the help of UV-C ray. It is fully wireless controlled by both mobile and PC. It has realtime camera feedback so that the user can control it from a safety distance',
          img_src: '/img/project/uvcpurge.jpg',
          project_link: 'https://youtu.be/hXhjbASMYH0',
        },
        {
          title: 'Expatriate Escort',
          description:
            "It's a group project developed by Muhtasim Fuad, Swapnil Protik, Nishanul Nishat, Fahim Faisal & Shoeb Ahmed Tanjim. It's a community website where Bangladeshi people in abroad can help each other.",
          img_src: '/img/project/expatriateescort.jpg',
          project_link:
            'https://github.com/ExpatriateEscort/ExpatriateEscort-V2.0',
        },
        {
          title: 'T-rectus Femoris',
          description:
            "It's a simple dino game controlled by Microcontroller. It's a Microprocessor & Microcontroller sessional group project. It was developed by Naim Ibna Khadem, Munswarim Khan, Shaqran Bin Saleh & Shoeb Ahmed Tanjim.",
          img_src: '/img/project/dino.jpg',
          project_link:
            'https://github.com/s-a-tanjim/Arduino/tree/master/Dino_game',
        },
        /*{
          title: "Drawbot",
          description:
            "DRAWBOT is a semi-autonomous robot which will utilize depth image processing to make a 3D map of an area for surveying. It will be monitoring of behavior, activities, or information for the purpose of information gathering, influencing, managing or directing.",
          img_src: "/img/project/dino.jpg",
          project_link:
            "https://github.com/s-a-tanjim/Arduino/tree/master/Dino_game",
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
</style>