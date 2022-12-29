import Vue from 'vue';
import App from './App.vue';
Vue.config.productionTip = false;
import './styles/index.scss'; // global css
import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';
import RelationGraph from '../src/index';
import router from './routes.js';
import './icons'; // icon
Vue.use(RelationGraph);
Vue.use(Element, {
  // size: Cookies.get('size') || 'medium' // set element-ui default size
  size: 'medium' // set element-ui default size
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
