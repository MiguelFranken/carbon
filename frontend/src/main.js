import { createApp } from "vue";
import "./styles/main.sass";
import router from "./router";
import App from "./App.vue";
import store from "./store";
import $bus from "./event.js";
import Notifications from "./services/notifications.js";
import directives from "@/directives";

window.uuid4 = function () {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const app = createApp(App);

app.config.globalProperties.$bus = $bus; // event bus
app.config.globalProperties.$notifications = new Notifications($bus);

directives(app);

app.use(store).use(router).mount("#app");
