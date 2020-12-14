export const routes = [{
  path: "/",
  name: "Home",
  component: () => import("./components/home/home_main.vue"),
}, {
  path: "/projects",
  name: "Projects",
  component: () => import("./components/projects/projects_main.vue"),
}, {
  path: "/achievements",
  name: "Achievements",
  component: () => import("./components/achievements/achievements_main.vue"),
}, ]