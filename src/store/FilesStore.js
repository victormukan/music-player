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
    getById(state) {
      return id => state.files.filter(i => i.id === id)[0];
    }
  },
  mutations: {
    addFile(state, file) {
      const urlObject = URL.createObjectURL(file);

      state.files.push({
        id: uuid(),
        name: file.name,
        size: file.size,
        type: file.type,
        file: urlObject
      });
    },
    deleteById(state, id) {
      URL.revokeObjectURL(state.files.filter(i => i.id === id)[0].file);
      state.files = state.files.filter(i => i.id !== id);
    },
    deleteAll(state) {
      state.files.forEach(i => URL.revokeObjectURL(i.file));
      state.files = [];
    }
  },
  actions: {
    addFile(state, file) {
      state.commit('addFile', file);
    },
    deleteById(state, id) {
      state.commit('deleteById', id);
    },
    deleteAll(state) {
      state.commit('deleteAll');
    }
  },
  plugins: [createPersistedState()]
});

export default store;

// function getAudioDuration(urlObject) {
//   const audio = document.createElement('audio');
//   audio.src = urlObject;

//   return new Promise((resolve) => {
//     audio.addEventListener('loadedmetadata', () => {
//       resolve(audio.duration);
//     });
//   });
// }
