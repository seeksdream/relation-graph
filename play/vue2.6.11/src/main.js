import Vue from 'vue';
import RelationGraph from './relation-graph-agent.ts';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.use(RelationGraph);
new Vue({
  render: (h) => h(App)
}).$mount('#app');
