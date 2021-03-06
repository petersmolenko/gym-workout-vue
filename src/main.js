import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { createProvider } from "./vue-apollo";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
  router,
  apolloProvider: createProvider({
    httpEndpoint: "http://localhost:8000/graphql",
    wsEndpoint: null,
  }),
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
