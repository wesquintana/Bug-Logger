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
    bugs: [],
    activeBug: {},
    activeNotes: []
  },
  mutations: {
    setAllBugs(state, bugs) {
      state.bugs = [...bugs];
    },
    addBug(state, bug) {
      let tempBugs = [...state.bugs];
      tempBugs.push(bug);
      state.bugs = tempBugs;
    },
    setActiveBug(state, bug) {
      state.activeBug = bug;
    },
    changeBug(state, bug) {
      let index = state.bugs.findIndex(elem => elem.id == bug.id);
      state.bugs[index] = bug;
      state.activeBug = bug;
    },
    setActiveNotes(state, notes) {
      state.activeNotes = notes;
    },
    addNote(state, note) {
      state.activeNotes.push(note);
    }
  },
  actions: {
    async getAllBugs({ commit, dispatch }) {
      let data = await _api.get("bugs");
      commit("setAllBugs", data.data);
    },
    async createBug({ commit, dispatch }, bug) {
      let data = await _api.post("bugs", bug);
      commit("addBug", data.data);
    },
    async getBugById({ commit, dispatch }, id) {
      let data = await _api.get("bugs/" + id);
      commit("setActiveBug", data.data);
    },
    async closeBug({ commit, dispatch }, id) {
      let data = await _api.delete("bugs/" + id);
      dispatch("getBugById", id);
    },
    async editDescription({ commit, dispatch }, bug) {
      let data = await _api.put("bugs/" + bug.id, {
        description: bug.description
      });
      commit("changeBug", data.data);
    },
    async getNotesByBugId({ commit, dispatch }, id) {
      let data = await _api.get("bugs/" + id + "/notes");
      commit("setActiveNotes", data.data);
    },
    async createNote({ commit, dispatch }, note) {
      let data = await _api.post("notes/", note);
      commit("addNote", data.data);
    },
    async deleteNote({ commit, dispatch }, note) {
      let data = await _api.delete("notes/" + note.id);
      dispatch("getNotesByBugId", note.bug);
    }
  },
  modules: {}
});
