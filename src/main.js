import Vue from 'vue';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';


import store from '@/store/FilesStore';

import App from './App';
import router from './router/router';


Vue.use(Vuetify);


Vue.filter('separateFileExtension', val => val.split('.').slice(0, -1).join('.'));

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
