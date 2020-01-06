import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import bugDetails from "../views/BugDetails.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/bugs/:id",
    name: "bugDetails",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: bugDetails
  }
];

const router = new VueRouter({
  routes
});

export default router;
