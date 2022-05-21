<template>
  <div>
    <section class="container mt-5">
      <div>
        <div style="text-align: center" class="my-5">
          <h1>Some of my publications</h1>
        </div>
        <div
          v-for="(data, index) in publications"
          v-bind:key="index"
          class="research-container"
        >
          <p>
            {{ data.authors }}
            <span class="title-text"> {{ '"' + data.title + '". ' }}</span>
            <span> {{ data.publisher }} </span>
          </p>
          <p>
            Paper Link:
            <a :href="data.link" target="_blank" rel="noopener noreferrer"
              >Here</a
            >
          </p>
        </div>
      </div>
      <div>
        <div style="text-align: center" class="my-5">
          <h1>Some of my works</h1>
        </div>

        <div
          v-for="(data, index) in projects"
          v-bind:key="index"
          class="card-container"
        >
          <div class="img-container">
            <img :src="data.img_src" class="card-img" :alt="data.title" />
          </div>
          <div class="info-container p-3" style="color: #111">
            <div>
              <h5 style="font-weight: bold">{{ data.title }}</h5>

              {{ data.description }}
            </div>
            <div style="text-align: right; font-weight: bold" class="mt-2">
              {{ data.tech_stack }}
              <div class="icon-container mt-2">
                <a
                  v-if="data.github_link"
                  :href="data.github_link"
                  target="_blank"
                >
                  <img src="/img/icons/github.svg" alt="Github" />
                </a>
                <a v-if="data.demo_link" :href="data.demo_link" target="_blank">
                  <img src="/img/icons/play-button.svg" alt="Video" />
                </a>
                <a v-if="data.live_site" :href="data.live_site" target="_blank">
                  <img src="/img/icons/world.svg" alt="Website" />
                </a>
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
      title: 'Works | s-a-tanjim',
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
      publications: [
        {
          authors:
            'Zaman, A., Majib, M. S., Tanjim, S. A., Siddique, S. M. A., Islam, Ashraf, F., ... & Rahman, M. M.',
          title:
            'Phoenix: Towards Designing and Developing a Human Assistant Rover',
          publisher:
            'IEEE Access, vol. 10, pp. 50728-50754, 2022, doi: 10.1109/ACCESS.2022.3170908.',
          link: 'https://ieeexplore.ieee.org/document/9764737',
          doi: 'https://doi.org/10.1109/ACCESS.2022.3170908',
        },
        {
          authors:
            'Zaman, A., Majib, M. S., Tanjim, S. A., Siddique, S. M. A., Islam, S., Aadeeb, M. S., ... & Islam, M. N.',
          title:
            'UVC-PURGE: A Novel Cost-effective Disinfection Robot for combating COVID-19 Pandemic',
          publisher:
            'IEEE Access, vol. 10, pp. 37613-37634, 2022, doi: 10.1109/ACCESS.2022.3163243.',
          link: 'https://ieeexplore.ieee.org/document/9745041',
        },
      ],
      projects: [
        {
          title: 'Hootstory V1',
          description:
            'A story posting web-app developing for BiTechX. I worked for both frontend and backend with the BiTechX team.',
          features: '',
          tech_stack: 'NuxtJS | Laravel | AWS | Docker',
          img_src: '/img/works/hootstory-600.jpg',
          github_link: '',
          live_site: 'https://hootstory.com',
        },
        {
          title: 'MusicPlayer',
          description:
            "It's a browser based Music player that runs on browser and play music from your PC. Whis website can even run in offline and you can install it on android phone. The goal of this project was to learn about Progressive Web App.",
          features: '',
          tech_stack: 'PWA | JavaScript | HTML5 | CSS',
          img_src: '/img/project/musicplayer.jpg',
          github_link: '',
          live_site: 'https://playmusic-z.firebaseapp.com/',
        },
        {
          title: 'DarkTab',
          description:
            "A task management web-app. It was built to learn browser's internal storage system.",
          features: '',
          tech_stack: 'PWA | IndexedDB | NuxtJS | JavaScript ',
          img_src: '/img/works/darktab.png',
          github_link:
            'https://github.com/s-a-tanjim/websites/tree/master/DarkTab',
          live_site: 'https://dark-tab.web.app',
        },
        {
          title: 'BitCopy',
          description:
            'Commandline based file copier software. It copies files from source to destination using buffer. Raw C language was used to build this app. The goal of this project was to learn more about buffer.',
          features: '',
          tech_stack: 'C Programming | Buffer',
          img_src: '/img/project/bitcopy.jpg',
          github_link: 'https://github.com/s-a-tanjim/Bit-Projects',
        },
        {
          title: 'UVC Purge',
          description:
            'It was a group project with the support of the Computer Science and Engineering Department of MIST. We developed this UVC Disinfection robot to fight against Covid19 pandemic situation. This bot is capable to destroy coronavirus with the help of UV-C ray. It is fully wireless controlled by both mobile and PC. It has realtime camera feedback so that the user can control it from a safety distance',
          features: '',
          tech_stack: 'Python | WiFi | ROS',
          img_src: '/img/project/uvcpurge.jpg',
          demo_link: 'https://youtu.be/hXhjbASMYH0',
        },
        {
          title: 'T-rectus Femoris',
          description:
            "It's a simple dino game controlled by Microcontroller. It's a Microprocessor & Microcontroller sessional group project. It was developed by Naim Ibna Khadem, Munswarim Khan, Shaqran Bin Saleh & Myself.",
          features: '',
          tech_stack: 'Arduino Programming',
          img_src: '/img/project/dino.jpg',
          github_link:
            'https://github.com/s-a-tanjim/Arduino/tree/master/Dino_game',
        },
        /*
        {
          title: 'E-Veil',
          description:
            'An underdeveloped Email Service. The aim of the project is to learn more about web development and web security. This was my level 2 term 2 project.',
          features: 'User authentication system',
          tech_stack: '',
          img_src: '/img/project/eveil.jpg',
          github_link: '',
          live_site: 'https://e-veil.firebaseapp.com/',
        },{
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
          title: 'Medias',
          description:
            "It's a web-based file manager system. It runs on remote server (Raspberry Pi in my case), and you can navigate files of that remote server through this software. You can play music/videos, read PDF, read Text files which is stored in remote server using this app. I wanted to make my own GoogleDrive in my network, that's why i made it.",
          img_src: '/img/project/medias.jpg',
          project_link: 'https://github.com/s-a-tanjim/medias',
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
          title: "Drawbot",
          description:
            "DRAWBOT is a semi-autonomous robot which will utilize depth image processing to make a 3D map of an area for surveying. It will be monitoring of behavior, activities, or information for the purpose of information gathering, influencing, managing or directing.",
          img_src: "/img/project/dino.jpg",
          project_link:
            "https://github.com/s-a-tanjim/Arduino/tree/master/Dino_game",
        },*/
      ],
    }
  },
  methods: {},
}
</script>

<style scoped>
.research-container {
  margin: 20px 0px;
  padding: 20px 20px;
  background-color: #f5f5f5;
  color: #111;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}
.research-container .title-text{
  color: #1942b1;
}
.research-container a {
  color: var(--color-hover) !important;
}
.card-container {
  margin: 20px 0px;
  background-color: #f5f5f5;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}
.img-container {
  overflow: hidden;
  cursor: pointer;
  border-top-left-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
}
.card-img {
  width: 100%;
  object-fit: cover;
  height: 260px;
  border-top-left-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
  -webkit-transition: all 0.3s linear;
  transition: all 0.3s linear;
}
.card-img:hover {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.info-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.icon-container img {
  width: 35px;
}
@media screen and (max-width: 991px) {
  .card-container {
    display: block;
  }
  .img-container {
    border-bottom-left-radius: 0px;
    border-top-right-radius: var(--border-radius);
  }
  .card-img {
    border-bottom-left-radius: 0px;
    border-top-right-radius: var(--border-radius);
    height: 200px;
  }
}
</style>
