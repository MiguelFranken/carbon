import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import NotFound from "@/views/NotFound.vue";
import Mint from "@/views/Mint.vue";
import CockDetails from "@/views/CockDetails.vue";
import FAQ from "@/views/FAQ.vue";
import Cocks from "@/views/Cocks.vue";
import Account from "@/views/Account.vue";
import Terms from "@/views/Terms.vue";

const routes = [
  {
    path: "/",
    component: Home,
    meta: { title: "Home" },
    name: "home",
  },
  {
    path: "/mint",
    component: Mint,
    meta: { title: "Mint" },
    name: "mint",
  },
  {
    path: "/cocks",
    component: Cocks,
    meta: { title: "All Cocks" },
    name: "cocks",
  },
  {
    path: "/cocks/:id",
    component: CockDetails,
    meta: { title: "Cock Details" },
    name: "details",
  },
  {
    path: "/accounts/:address",
    component: Account,
    meta: { title: "Account" },
    name: "account",
  },
  {
    path: "/faq",
    component: FAQ,
    meta: { title: "FAQ" },
    name: "faq",
  },
  {
    path: "/terms",
    component: Terms,
    meta: { title: "Terms" },
    name: "terms",
  },
  { path: "/:path(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
