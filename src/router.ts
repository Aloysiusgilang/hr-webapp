import { createWebHistory, createRouter } from "vue-router";

import HelloWorld from "./views/HelloWorld.vue";
import LoginPage from "./views/LoginPage.vue";

const routes = [
  { path: "/", component: HelloWorld },
  {
    path: "/login",
    component: LoginPage,
    meta: {
      guestOnly: true,
      pageTitle: "Login | Klinik OS",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
