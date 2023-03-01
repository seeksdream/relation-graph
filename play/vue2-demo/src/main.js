import Vue from "vue";
import App from "./App.vue";

import RelationGraph from "../relation-graph";
Vue.config.productionTip = false;
Vue.use(RelationGraph);
new Vue({
    render: (h) => h(App)
}).$mount("#app");
