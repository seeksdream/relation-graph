<script lang="ts" setup>
import { nextTick, onBeforeUnmount, onMounted, provide, ref } from 'vue'
import screenfull from 'screenfull'
import appendIconSvg from '../utils/RGGraphIconfont'
import { devLog, relationGraphVersionInfo } from '../utils/RGCommon'
import { RelationGraphFinal } from '../models/RelationGraphFinal'
import { relationGraphKey } from '../../../constants'
import RGCanvas from './RGCanvas.vue'
import GraphDebugPanel from './widgets/GraphDebugPanel.vue'
import GraphMiniView from './widgets/GraphMiniView.vue'
import GraphMiniToolBar from './widgets/GraphMiniToolBar.vue'
import type { RGJsonData, RGLayouter, RGLine ,
  RGLink,
  RGListeners,
  RGNode,
  RGOptions,
  RGRefreshCallback,
  RelationGraphInstance
} from '../RelationGraph';
devLog('appendIconSvg:', appendIconSvg);
interface RelationGraphProps {
  options: any
  relationGraphCore?: any
  onNodeClick?: (node: RGNode, e: MouseEvent | TouchEvent) => boolean
  onNodeExpand?: (node: RGNode, e: MouseEvent | TouchEvent) => boolean
  onNodeCollapse?: (node: RGNode, e: MouseEvent | TouchEvent) => boolean
  onLineClick?: (
    line: RGLine,
    link: RGLink,
    e: MouseEvent | TouchEvent
  ) => boolean
  onImageDownload?: (dom: HTMLElement, format: string) => boolean
}
const props = defineProps<RelationGraphProps>()
const seeksRelationGraph$ = ref<HTMLElement>()
const relationGraph = ref<RelationGraphInstance>()
// const p = reactive({ x: 1, y: 2 })
provide(relationGraphKey, relationGraph)
defineEmits([
  'on-node-click',
  'on-node-expand',
  'on-node-collapse',
  'on-line-click',
  'on-download-excel',
  'on-image-download',
])
devLog('---------------------------graph mounted---------------------------')
onMounted(() => {
  relationGraphVersionInfo()
  // 在元素上做些操作
  devLog('---------------------------graph mounted---------------------------')
  const listeners: RGListeners = {
    'on-node-click': props.onNodeClick,
    'on-node-expand': props.onNodeExpand,
    'on-node-collapse': props.onNodeCollapse,
    'on-line-click': props.onLineClick,
    'on-image-download': props.onImageDownload,
  }
  // devLog(this.relationGraphCore);
  // const rgClass = this.relationGraphCore || RelationGraphFinal;
  // const newRGCoreInstance = Object.create(rgClass.prototype);
  // const relationGraph = rgClass.apply(newRGCoreInstance, [this.options, listeners]);
  const rgInstance =
    props.relationGraphCore || new RelationGraphFinal(props.options, listeners)
  rgInstance.setDom(seeksRelationGraph$.value)
  rgInstance.ready()
  // if (this.jsonData) relationGraph.setJsonData(this.jsonData);
  // this.relationGraph = rgInstance
  relationGraph.value = rgInstance
  screenfull.on('change', onFullscreen)
  // console.log(relationGraph.value)
})
onBeforeUnmount(() => {
  screenfull.off('change', onFullscreen)
})
const onFullscreen = () => {
  relationGraph.value!.fullscreen(screenfull.isFullscreen)
}
defineExpose({
  onFullscreen,
  getInstance() {
    return relationGraph.value!
  },
  setOptions(
    options: RGOptions,
    callback?: (graphInstance: RelationGraphInstance) => void
  ) {
    relationGraph.value!.setOptions(options, callback)
  },
  setJsonData(
    jsonData: RGJsonData,
    reLayout?: boolean | RGRefreshCallback,
    callback?: (graphInstance: RelationGraphInstance) => void
  ) {
    if (arguments.length === 2 && typeof reLayout === 'function') {
      callback = reLayout;
      reLayout = true;
    }
    // console.log('setJsonData:', relationGraph.value)
    relationGraph.value!.setJsonData(
      jsonData,
      reLayout,
      (instance: RelationGraphInstance) => {
        nextTick(() => {
          // console.log('playShowEffect:', relationGraph.value)
          instance.playShowEffect(() => {
            if (callback) callback(instance)
          })
        })
      }
    )
  },
  appendJsonData(
    jsonData: RGJsonData,
    reLayout?: boolean | RGRefreshCallback,
    callback?: (graphInstance: RelationGraphInstance) => void
  ) {
    if (arguments.length === 2 && typeof reLayout === 'function') {
      callback = reLayout;
      reLayout = true;
    }
    relationGraph.value!.appendJsonData(jsonData, reLayout, callback)
  },
  setLayouter(layouterInstance: RGLayouter) {
    relationGraph.value!.setLayouter(layouterInstance)
  },
  onGraphResize() {
    relationGraph.value!.refreshNVAnalysisInfo()
  },
  refresh() {
    relationGraph.value!.refresh()
  },
  focusRootNode() {
    relationGraph.value!.focusRootNode()
  },
  focusNodeById(nodeId: string) {
    return relationGraph.value!.focusNodeById(nodeId)
  },
  getNodeById(nodeId: string) {
    return relationGraph.value!.getNodeById(nodeId)
  },
  removeNodeById(nodeId: string) {
    return relationGraph.value!.removeNodeById(nodeId)
  },
  getNodes() {
    return relationGraph.value!.getNodes()
  },
  getLinks() {
    return relationGraph.value!.getLinks()
  },
  getGraphJsonData() {
    return relationGraph.value!.getGraphJsonData()
  },
  getGraphJsonOptions() {
    return relationGraph.value!.getGraphJsonOptions()
  },
})
</script>
<template>
  <div
    ref="seeksRelationGraph$"
    :style="{ width: '100%', height: '100%' }"
    style="box-sizing: border-box"
  >
    <template v-if="relationGraph && relationGraph.options">
      <GraphDebugPanel v-if="relationGraph.options.showDebugPanel" />
      <slot
        v-if="relationGraph.options.allowShowMiniToolBar === true"
        name="miniToolBar"
      >
        <GraphMiniToolBar />
      </slot>
      <slot
        v-if="relationGraph.options.allowShowMiniView === true"
        name="miniViewPanel"
      >
        <GraphMiniView />
      </slot>
      <slot name="graph-plug" :relation-graph="relationGraph" />
      <RGCanvas v-if="relationGraph">
        <template #node="{ node }">
          <slot :node="node" :relation-graph="relationGraph" name="node" />
        </template>
        <template #line="{ line, link }">
          <slot
            :line="line"
            :link="link"
            :relation-graph="relationGraph"
            name="line"
          />
        </template>
        <template #canvas-plug>
          <slot :relation-graph="relationGraph" name="canvas-plug" />
        </template>
      </RGCanvas>
    </template>
  </div>
</template>
<style scoped>
.xxxxxxxxx {
  color: red;
}
</style>
