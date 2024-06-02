import { createWebHistory, createRouter } from "vue-router";

import EmployeeDasboard from "./views/EmployeeDashboard.vue";
import LoginPage from "./views/LoginPage.vue";
import Dashboard from "./views/Dashboard.vue";

import { useAuthStore } from "./stores/authStore";

const routes = [
  { path: "/employee-dashboard", component: EmployeeDasboard },
  { path: "/dashboard", component: Dashboard },
  {
    path: "/login",
    component: LoginPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const authStore = useAuthStore();

  if (!authStore.token && to.path !== "/login") {
    next({ path: "/login" });
  } else if (authStore.token && to.path === "/login") {
    next({ path: "/" });
  } else if (authStore.token && to.path === "/") {
    if (authStore.user?.role === "admin") {
      next({ path: "/dashboard" });
    } else {
      next({
        path: "/employee-dashboard",
      });
    }
  } else {
    next();
  }
});

export default router;
