import RelationGraph from './index.vue'
RelationGraph.install = function(Vue) {
  Vue.component('RelationGraph', RelationGraph)
  Vue.component('SeeksRelationGraph', RelationGraph)
}
export default RelationGraph
