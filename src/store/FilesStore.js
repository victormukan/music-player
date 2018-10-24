import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import uuid from 'uuid/v4';

Vue.use(Vuex);


/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    files: []
  },
  getters: {
    getAll(state) {
      return state.files;
    }
  },
  mutations: {
    addFile(state, file) {
      const url = URL.createObjectURL(file);
      state.files.push({
        uuid: uuid(),
        url,
        name: file.name,
        size: file.size,
        type: file.type
      });
    },
    clearAll(state) {
      state.files = [];
    }
  },
  actions: {
    addFile(state, file) {
      state.commit('addFile', file);
    },
    clearAll(state) {
      state.commit('clearAll');
    }
  },
  plugins: [createPersistedState()]
});

export default store;
