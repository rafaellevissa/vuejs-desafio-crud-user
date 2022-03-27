import Vue from "vue";
import Notifications from "vue-notification";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import i18n from "./plugins/i18n";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(Notifications);

new Vue({
  router,
  vuetify,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
