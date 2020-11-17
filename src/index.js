import RelationGraph from './index.vue'
RelationGraph.install = function(Vue) {
    Vue.component('relation-graph', RelationGraph);
    Vue.component('seeks-relation-graph', RelationGraph);
};
export default RelationGraph
