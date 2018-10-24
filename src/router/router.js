import Vue from 'vue';
import Router from 'vue-router';
import UploadFiles from '@/components/UploadFiles';
import MusicMixer from '@/components/MusicMixer';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect: '/upload' },
    { path: '/upload', component: UploadFiles },
    { path: '/dj-controller', component: MusicMixer }
  ]
});
