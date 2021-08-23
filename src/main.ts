import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import Tags from '@/components/Tags.vue';
import { Cell } from 'vant';

Vue.use(Cell);


Vue.config.productionTip = false;
Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);
Vue.component('Tags',Tags)

new Vue({

  router,
  store,
  render: h => h(App)
}).$mount('#app');

if(document.documentElement.clientWidth>500){
  window.alert('为保证浏览效果请使用移动端打开')
}
