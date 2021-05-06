import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueLazyload from 'vue-lazyload'
import VueProgressBar from 'vue-progressbar'
import {
  store
} from './store'
import {
  routes
} from './routes'

Vue.use(VueRouter);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'img/error.svg',
  loading: 'img/img_loader_lazyload.gif',
  attempt: 1
});

const progressbarOptions = {
  color: '#13a2e2',
  failedColor: '#874b4b',
  thickness: '2px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
};
Vue.use(VueProgressBar, progressbarOptions);

Vue.config.productionTip = false;

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')