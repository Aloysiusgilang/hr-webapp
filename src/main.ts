import { createApp } from "vue";
import { createPinia } from "pinia";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import router from "./router";
import "./style.css";
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();
const vuetify = createVuetify({
  components,
  directives,
});

app.use(pinia);
app.use(router);
app.use(vuetify);
app.mount("#app");
