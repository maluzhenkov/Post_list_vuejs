import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/posts/page/:page",
    name: "Posts",
    component: () => import("@/views/Posts.vue"),
    meta: {
      layout: "default"
    }
  },
  {
    path: "/postEdit",
    name: "PostEdit",
    component: () => import("@/views/PostEdit.vue"),
    meta: {
      layout: "default"
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: {
      layout: "empty"
    }
  },
  {
    path: "*",
    redirect: { name: "Posts" }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
