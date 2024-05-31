import { createWebHistory, createRouter } from "vue-router";

import HelloWorld from "./views/HelloWorld.vue";
import LoginPage from "./views/LoginPage.vue";
import Dashboard from "./views/Dashboard.vue";

const routes = [
  { path: "/", component: HelloWorld },
  { path: "/dashboard", component: Dashboard },
  {
    path: "/login",
    component: LoginPage,
    meta: {
      guestOnly: true,
      pageTitle: "Login | HR Management System",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
