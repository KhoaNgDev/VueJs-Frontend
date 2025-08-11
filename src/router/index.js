import { createRouter, createWebHistory } from "vue-router";
import FrontendLayout from "../layouts/FrontendLayout.vue";
import HomePage from "../pages/HomePage.vue";
import RepairHistory from "../pages/RepairHistory.vue";
import Login from "../pages/Login.vue";

const routes = [
  {
    path: "/",
    component: FrontendLayout,
    children: [
      {
        path: "",
        name: "home",
        component: HomePage,
      },
      {
        path: "/search",
        name: "repair-history",
        component: RepairHistory,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["home", "login"];
  const authRequired = !publicPages.includes(to.name);
  const token = localStorage.getItem("auth_token");

  if (authRequired && !token) {
    return next({ name: "login" });
  }

  next();
});

export default router;
