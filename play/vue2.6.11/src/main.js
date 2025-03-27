import Vue from 'vue';
import RelationGraph from './relation-graph-agent';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.use(RelationGraph);
new Vue({
  render: (h) => h(App)
}).$mount('#app');
