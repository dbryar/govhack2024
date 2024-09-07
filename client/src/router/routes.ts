import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    name: "Home",
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ name: "User Page", path: "", component: () => import("pages/UserPage.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorPage.vue"),
  },
];

export default routes;
