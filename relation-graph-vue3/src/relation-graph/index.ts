import _RelationGraph from './src/core4vue3/index.vue'
import type { App } from 'vue'
_RelationGraph.install = (app: App): void => {
  app.component('RelationGraph', _RelationGraph)
  app.component('SeeksRelationGraph', _RelationGraph)
}
export default _RelationGraph
export const RelationGraph = _RelationGraph
