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
    },
    getByUuid(state) {
      return id => state.files.filter(i => i.uuid === id)[0];
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
    deleteByUuid(state, id) {
      state.files = state.files.filter(i => i.uuid !== id);
    },
    deleteAll(state) {
      state.files = [];
    }
  },
  actions: {
    addFile(state, file) {
      state.commit('addFile', file);
    },
    deleteByUuid(state, id) {
      state.commit('deleteByUuid', id);
    },
    deleteAll(state) {
      state.commit('deleteAll');
    }
  },
  plugins: [createPersistedState()]
});

export default store;
