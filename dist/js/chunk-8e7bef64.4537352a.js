(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8e7bef64"],{"52b8":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("button",{ref:"modalLaunchBtn",staticStyle:{display:"none"},attrs:{"data-toggle":"modal","data-target":"#Modal"}}),a("div",{staticClass:"modal fade",attrs:{id:"Modal",tabindex:"-1",role:"dialog","aria-labelledby":"ModalLabel","aria-hidden":"true"}},[a("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[a("div",{staticClass:"modal-content"},[a("div",{staticClass:"modal-header"},[a("h5",{staticClass:"modal-title",attrs:{id:"ModalLabel"}},[t._v(" "+t._s(t.data.title?t.data.title:"")+" ")]),t._m(0)]),a("div",{staticClass:"modal-body"},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.data.img_src?t.data.img_src:"",expression:"data.img_src ? data.img_src : ''"}],staticClass:"modal-img",attrs:{alt:t.data.title?t.data.title:""}}),a("p",{staticClass:"my-4",staticStyle:{color:"#111 !important"}},[t._v(" "+t._s(t.data.description?t.data.description:"")+" ")]),t.data&&t.data.project_link?a("p",{staticStyle:{color:"#111 !important"}},[t._v(" Project link: "),a("a",{attrs:{href:t.data.project_link,target:"_blank"}},[t._v("here")])]):t._e()]),t._m(1)])])])])},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modal-footer"},[a("button",{staticClass:"btn btn-secondary",attrs:{type:"button","data-dismiss":"modal"}},[t._v(" Close ")])])}],o={props:["data"],methods:{openModal:function(){this.$refs["modalLaunchBtn"].click()}}},r=o,n=(a("c3af"),a("2877")),l=Object(n["a"])(r,i,s,!1,null,"7602fef4",null);e["a"]=l.exports},"640d":function(t,e,a){},aced:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("section",{staticClass:"container mt-5",staticStyle:{"text-align":"center"}},[a("h3",[t._v("Some of my projects")]),a("div",{staticClass:"row justify-content-center mt-3"},t._l(t.projects,(function(e,i){return a("div",{key:i,staticClass:"col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-4"},[a("div",{staticClass:"card-container",on:{click:function(a){return t.showModal(e)}}},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.img_src,expression:"data.img_src"}],staticClass:"card-img",attrs:{alt:e.title}}),a("div",{staticClass:"mt-3",staticStyle:{color:"#111"}},[a("h5",{staticStyle:{"font-weight":"bold"}},[t._v(t._s(e.title))])])])])})),0)]),a("modal",{ref:"modal",attrs:{data:t.modalData}})],1)},s=[],o=a("52b8"),r={data:function(){return{projects:[{title:"E-Veil",description:"An underdeveloped Email Service. The aim of the project is to learn more about web development and web security. This was my level 2 term 2 project.",img_src:"img/project/eveil.jpg",project_link:"https://e-veil.firebaseapp.com/"},{title:"BitCopy",description:"Commandline based file copier software. It copies files from source to destination using buffer. Raw C language was used to build this app. The goal of this project was to learn more about buffer.",img_src:"img/project/bitcopy.jpg",project_link:"https://github.com/s-a-tanjim/Bit-Projects"},{title:"BitFileManager",description:"Commandline based file manager software. Only files navigation is available here right now. Raw C language was used to build this app. The goal of this project was to learn more about FileSystem.",img_src:"img/project/bit-filemanager.jpg",project_link:"https://github.com/s-a-tanjim/Bit-Projects"},{title:"Medihelp",description:"It's Commandline based software. It was my level 1 C programming language project. User input there symptoms here, and this software guesses the disease. The goal of this project was to learn more about searching. This software has a input auto-currection system. Raw C was used to build this app",img_src:"img/project/medihelp.jpg",project_link:"https://github.com/s-a-tanjim/MediHelp"},{title:"MusicPlayer",description:"It's a browser based Music player that runs on browser and play music from your PC. Whis website can even run in offline and you can install it on android phone. The goal of this project was to learn about Progressive Web App. It's written in vanilla javascript.",img_src:"img/project/musicplayer.jpg",project_link:"https://playmusic-z.firebaseapp.com/"},{title:"Medias",description:"It's a web-based file manager system. It runs on remote server (Raspberry Pi in my case), and you can navigate files of that remote server through this software. You can play music/videos, read PDF, read Text files which is stored in remote server using this app. I wanted to make my own GoogleDrive in my network, that's why i made it.",img_src:"img/project/medias.jpg",project_link:"https://github.com/s-a-tanjim/medias"},{title:"UVC Purge",description:"It was a group project with the support of the Computer Science and Engineering Department of MIST. We developed this UVC Disinfection robot to fight against Covid19 pandemic situation. This bot is capable to destroy coronavirus with the help of UV-C ray. It is fully wireless controlled by both mobile and PC. It has realtime camera feedback so that the user can control it from a safety distance",img_src:"img/project/uvcpurge.jpg",project_link:"https://youtu.be/hXhjbASMYH0"},{title:"Expatriate Escort",description:"It's a group project developed by Muhtasim Fuad, Swapnil Protik, Nishanul Nishat, Fahim Faisal & Shoeb Ahmed Tanjim. It's a community website where Bangladeshi people in abroad can help each other.",img_src:"img/project/expatriateescort.jpg",project_link:"https://github.com/ExpatriateEscort/ExpatriateEscort-V2.0"},{title:"T-rectus Femoris",description:"It's a simple dino game controlled by Microcontroller. It's a Microprocessor & Microcontroller sessional group project. It was developed by Naim Ibna Khadem, Munswarim Khan, Shaqran Bin Saleh & Shoeb Ahmed Tanjim.",img_src:"img/project/dino.jpg",project_link:"https://github.com/s-a-tanjim/Arduino/tree/master/Dino_game"}],modalData:{}}},components:{modal:o["a"]},methods:{showModal:function(t){this.modalData=t,this.$refs["modal"].openModal()}}},n=r,l=(a("c4c5"),a("2877")),c=Object(l["a"])(n,i,s,!1,null,"e18923b8",null);e["default"]=c.exports},c3af:function(t,e,a){"use strict";a("640d")},c4c5:function(t,e,a){"use strict";a("d4f1")},d4f1:function(t,e,a){}}]);
//# sourceMappingURL=chunk-8e7bef64.4537352a.js.map