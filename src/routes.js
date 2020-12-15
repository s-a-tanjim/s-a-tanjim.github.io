export const routes = [{
  path: "/projects",
  name: "Projects",
  component: () => import("./components/projects/projects_main.vue"),
}, {
  path: "/achievements",
  name: "Achievements",
  component: () => import("./components/achievements/achievements_main.vue"),
}, {
  path: "/resume",
  name: "Resume",
  component: () => import("./components/resume/resume_main.vue"),
}, {
  path: "/",
  name: "Home",
  component: () => import("./components/home/home_main.vue"),
}, {
  path: "/*",
  name: "404Error",
  component: () => import("./components/404page/404_main.vue"),
}, ]