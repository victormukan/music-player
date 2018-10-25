import Vue from 'vue';
import Router from 'vue-router';
import UploadFiles from '@/components/UploadFiles';
import DjBoard from '@/components/DjBoard';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect: '/upload' },
    { path: '/upload', component: UploadFiles },
    { path: '/dj-controller', component: DjBoard }
  ]
});
