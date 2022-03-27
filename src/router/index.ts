import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Dashboard from "../components/Dashboard.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "login",
    component: Login,
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const $store: any = store;

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if ($store.state.auth.isAuthenticated) {
      next();
    } else {
      next({ name: "login" });
    }
  }

  if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (!$store.state.auth.isAuthenticated) {
      next();
    } else {
      next({ name: "dashboard" });
    }
  }
});

export default router;
