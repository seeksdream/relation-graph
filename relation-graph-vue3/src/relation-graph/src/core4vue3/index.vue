<script lang="ts" setup>
import {nextTick, onBeforeUnmount, onMounted, provide, reactive, ref, toRef} from 'vue'
import screenfull from 'screenfull'
import appendIconSvg from '../../../../../relation-graph-vue2/src/utils/RGGraphIconfont4Vue'
import { devLog, relationGraphVersionInfo } from '../../../../../relation-graph-vue2/src/utils/RGCommon'
import { getEventListeners } from '../../../../../relation-graph-vue2/src/utils/RGIntergration'
import { RelationGraphFinal } from '../../../../../relation-graph-vue2/src/models/RelationGraphFinal'
import {graphDataKey, graphInstanceKey, graphKey} from '../../../constants'
import RGCanvas from './RGCanvas.vue'
import GraphDebugPanel from './widgets/GraphDebugPanel.vue'
import GraphMiniView from './widgets/GraphMiniView.vue'
import GraphMiniToolBar from './widgets/GraphMiniToolBar.vue'
import GraphOperateStuff from './widgets/GraphOperateStuff.vue'
import type {
  RGGraphData, RGJsonData, RGLayouter,
  RGOptions,
  RGRefreshCallback
} from '../../../../../relation-graph-vue2/src/types';
import {
  RelationGraphInstance,
  RelationGraphProps,
  RGGraphReactiveData
} from "../../../../../relation-graph-vue2/src/types";


devLog('appendIconSvg:', appendIconSvg);

const props = defineProps<RelationGraphProps>()
const seeksRelationGraph$ = ref<HTMLElement>()
const graphInstance$ = ref<RelationGraphInstance>()
const graphData = reactive<RGGraphData>({
  rootNode: undefined,
  nodes: [],
  links: []
});
const graph = reactive<RGGraphReactiveData>({
  options: undefined,
  allLineColors: []
});
provide(graphInstanceKey, graphInstance$)
provide(graphDataKey, graphData)
provide(graphKey, graph)
defineEmits([
  'on-node-click',
  'on-node-expand',
  'on-node-collapse',
  'on-line-click',
  'on-download-excel',
  'on-image-download',
  'on-image-save-as-file',
])
devLog('---------------------------graph mounted---------------------------')
onMounted(() => {
  relationGraphVersionInfo('vue3')
  // 在元素上做些操作
  devLog('---------------------------graph mounted---------------------------')
  const rgInstance = props.relationGraphCore || new RelationGraphFinal(props.options, getEventListeners(props))
  rgInstance.setReactiveDataVue3(graphData, graph);
  rgInstance.setDom(seeksRelationGraph$.value)
  rgInstance.ready()
  graphInstance$.value = rgInstance;
  screenfull && screenfull.on && screenfull.on('change', onFullscreen)
  // console.log(relationGraph.value)
})
onBeforeUnmount(() => {
  screenfull && screenfull.off && screenfull.off('change', onFullscreen)
})
const onFullscreen = () => {
  graphInstance$.value!.fullscreen(screenfull.isFullscreen)
}
defineExpose({
  onFullscreen() {
    onFullscreen();
  },
  getInstance() {
    return graphInstance$.value!
  },
  async setOptions(options: RGOptions, justUpdateOptionsValue = false) {
    await graphInstance$.value!.setOptions(options, justUpdateOptionsValue)
  },
  async setJsonData(
    jsonData: RGJsonData,
    reLayout?: boolean | RGRefreshCallback,
    callback?: (graphInstance: RelationGraphInstance) => void
  ) {
    if (arguments.length === 2 && typeof reLayout === 'function') {
      callback = reLayout;
      reLayout = true;
    }
    // console.log('setJsonData:', relationGraph.value)
    await graphInstance$.value!.setJsonData(jsonData, true);
    await graphInstance$.value!.playShowEffect()
    if (callback) callback(graphInstance$.value!)
  },
  async appendJsonData(
    jsonData: RGJsonData,
    reLayout?: boolean | RGRefreshCallback,
    callback?: (graphInstance: RelationGraphInstance) => void
  ) {
    if (arguments.length === 2 && typeof reLayout === 'function') {
      callback = reLayout;
      reLayout = true;
    }
    await graphInstance$.value!.appendJsonData(jsonData, true)
    if (callback) callback(graphInstance$.value!)
  },
  setLayouter(layouterInstance: RGLayouter) {
    graphInstance$.value!.setLayouter(layouterInstance)
  },
  onGraphResize() {
    graphInstance$.value!.refreshNVAnalysisInfo()
  },
  refresh() {
    graphInstance$.value!.refresh()
  },
  focusRootNode() {
    graphInstance$.value!.focusRootNode()
  },
  focusNodeById(nodeId: string) {
    return graphInstance$.value!.focusNodeById(nodeId)
  },
  getNodeById(nodeId: string) {
    return graphInstance$.value!.getNodeById(nodeId)
  },
  removeNodeById(nodeId: string) {
    return graphInstance$.value!.removeNodeById(nodeId)
  },
  getNodes() {
    return graphInstance$.value!.getNodes()
  },
  getLinks() {
    return graphInstance$.value!.getLinks()
  },
  getGraphJsonData() {
    return graphInstance$.value!.getGraphJsonData()
  },
  getGraphJsonOptions() {
    return graphInstance$.value!.getGraphJsonOptions()
  },
})
</script>
<template>
  <div ref="seeksRelationGraph$" class="relation-graph" :style="{width: '100%',height : '100%'}" style="box-sizing:border-box;position: relative;">
    <template v-if="graphInstance$ && graph.options">
      <GraphDebugPanel v-if="graph.options.showDebugPanel" />
      <slot v-if="graph.options.allowShowMiniToolBar===true" name="tool-bar">
        <GraphMiniToolBar />
      </slot>
      <slot v-if="graph.options.allowShowMiniView===true" name="mini-view">
        <GraphMiniView />
      </slot>
      <slot name="graph-plug" />
      <RGCanvas>
        <template #node="{node}">
          <slot :node="node" name="node" />
        </template>
        <template #line="{line, link}">
          <slot :line="line" :link="link" name="line" />
        </template>
        <template #canvas-plug>
          <slot name="canvas-plug" />
        </template>
        <template #node-expand-holder="{nodeProps, expandHolderPosition, expandButtonClass, color, expandOrCollapseNode}">
          <slot
              name="node-expand-holder"
              :nodeProps="nodeProps"
              :expandHolderPosition="expandHolderPosition"
              :expandButtonClass="expandButtonClass"
              :color="color"
              :expandOrCollapseNode="expandOrCollapseNode"
          />
        </template>
      </RGCanvas>
      <GraphOperateStuff>
        <template #node-template="{node}">
          <slot name="node-template" :node="node" />
        </template>
      </GraphOperateStuff>
    </template>
  </div>
</template>
<style lang="scss">
@import "../../../../../relation-graph-vue2/src/core4vue/relation-graph.scss";
@import "../../../../../relation-graph-vue2/src/core4vue/relation-graph-toolbar.scss";
</style>
