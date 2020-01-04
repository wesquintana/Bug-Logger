import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
const _api = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 3000
});

export default new Vuex.Store({
  state: {
    bugs: []
  },
  mutations: {
    setAllBugs(state, bugs) {
      state.bugs = [...bugs];
    }
  },
  actions: {
    async getAllBugs({ commit, dispatch }) {
      let data = await _api.get("bugs");
      commit("setAllBugs", data.data);
    },
    async createBug({ commit, dispatch }, bug) {
      let data = await _api.post("bugs", bug);
      console.log(data);
    }
  },
  modules: {}
});
