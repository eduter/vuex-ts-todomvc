import "babel-polyfill";
import Vue from "vue";
import App from "./components/App.vue";
// @ts-ignore
import store from "./store";

Vue.config.productionTip = false;

// @ts-ignore
new Vue({ store, el: "#app", render: h => h(App) });
