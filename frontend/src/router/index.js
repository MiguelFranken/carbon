import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import NotFound from "@/views/NotFound.vue";
import Mint from "@/views/Mint.vue";
import TokenDetails from "@/views/TokenDetails.vue";
import Tokens from "@/views/Tokens.vue";
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
    path: "/diamonds",
    component: Tokens,
    meta: { title: "All Diamonds" },
    name: "diamonds",
  },
  {
    path: "/diamonds/:id",
    component: TokenDetails,
    meta: { title: "Diamond Details" },
    name: "details",
  },
  {
    path: "/accounts/:address",
    component: Account,
    meta: { title: "Account" },
    name: "account",
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
