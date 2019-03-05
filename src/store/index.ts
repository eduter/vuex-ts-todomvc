import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import plugins from "./plugins";

export const STORAGE_KEY = "todos-vuejs";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]")
  },
  actions,
  getters,
  mutations,
  plugins
});
