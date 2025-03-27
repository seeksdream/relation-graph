<script lang="ts" setup>
import {markRaw, nextTick, onBeforeUnmount, onMounted, provide, reactive, ref, toRef} from 'vue'
import * as screenfull from 'screenfull'
import appendIconSvg from '../../../../../../relation-graph-models/utils/RGGraphIconfont4Vue'
import {
  deprecatedWaring,
  devLog,
  relationGraphVersionInfo
} from '../../../../../../relation-graph-models/utils/RGCommon'
import { getEventListeners } from '../../../../../../relation-graph-models/utils/RGIntergration'
import { RelationGraphFinal } from '../../../../../../relation-graph-models/models/RelationGraphFinal'
import {graphDataKey, graphInstanceKey, graphKey} from '../../../constants'
import RGCanvas from './RGCanvas.vue'
import GraphDebugPanel from './widgets/GraphDebugPanel.vue'
import GraphMiniToolBar from './widgets/GraphMiniToolBar.vue'
import GraphOperateStuff from './widgets/GraphOperateStuff.vue'
import GraphLoading from './widgets/GraphLoading.vue'
import type {
  RGGraphData, RGJsonData, RGLayouter,
  RGOptions,
  RGRefreshCallback
} from '../../../../../../relation-graph-models/types';
import {
  RelationGraphInstance,
  RGEventTargetType,
  RGGraphReactiveData,
  RGLayoutOptions,
  RGLine,
  RGLink,
  RGListeners,
  RGNode,
  RGSelectionView,
  RGUserEvent,
  RGPosition,
  RGEventNames
} from "../../../../../../relation-graph-models/types";
import {createDefaultConfig} from "../../../../../../relation-graph-models/models/RGOptions";


devLog('appendIconSvg:', appendIconSvg);
interface RelationGraphProps {
  options: RGOptions;
  relationGraphCore?: any;
  onNodeClick?: (node: RGNode, e: RGUserEvent) => boolean
  onNodeExpand?: (node: RGNode, e: RGUserEvent) => boolean
  onNodeCollapse?: (node: RGNode, e: RGUserEvent) => boolean
  onLineClick?: (line: RGLine, link: RGLink, e: RGUserEvent) => boolean
  onImageDownload?: (dom: HTMLElement, format: string) => boolean
  onImageSaveAsFile?: (canvas: HTMLCanvasElement, format: string, fileName: string) => boolean
  beforeChangeLayout?: (newLayoutOptions:RGLayoutOptions) => boolean
  onNodeDragStart?: (node:RGNode, e:RGUserEvent) => void
  onNodeDragEnd?: (node:RGNode, e:RGUserEvent, x_buff?:number, y_buff?: number) => void
  onNodeDragging?: (node:RGNode, newX:number, newY:number, e:RGUserEvent) => RGPosition | undefined
  onCanvasDragging?: (newX:number, newY:number, buffX:number, buffY:number) => void | RGPosition | undefined
  onCanvasDragEnd?: (e:RGUserEvent) => void
  onContextmenu?: (e:RGUserEvent, objectType:RGEventTargetType, object:RGNode|RGLink|undefined) => void
  onFullscreen?: (newValue:boolean, defaultFullscreen: () => Promise<void>) => void;
  onCanvasClick?: (e:RGUserEvent) => void
  onCanvasSelectionEnd?: (selectionView:RGSelectionView, e:RGUserEvent) => void
  beforeNodeResize?: (node: RGNode, newX:number, newY:number, newW:number, newH:number) => void|false
  onZoomEnd?: () => void
}
const props = defineProps<RelationGraphProps>()
const seeksRelationGraph$ = ref<HTMLElement>()
// const graphInstance$ = ref<RelationGraphInstance>()
const graphData = reactive<RGGraphData>({
  rootNode: undefined,
  nodes: [],
  links: [],
  elementLines: []
});
// const graph = reactive<RGGraphReactiveData>({
//   options: createDefaultConfig({}),
//   allLineColors: []
// });
const graph = reactive<RGGraphReactiveData>({
  instance: undefined,
  options: createDefaultConfig({}),
  allLineColors: []
});
// provide(graphInstanceKey, graphInstance$)
provide(graphDataKey, graphData)
provide(graphKey, graph)
// defineEmits([
//   'on-node-click',
//   'on-node-expand',
//   'on-node-collapse',
//   'on-line-click',
//   'on-download-excel',
//   'on-image-download',
//   'on-image-save-as-file',
// ])
const emit = defineEmits(Object.values(RGEventNames))
devLog('---------------------------graph mounted---------------------------')
onMounted(() => {
  // 注意：
  // 根据MIT许可证的规定，允许您自由地使用、修改和分发源代码。您可以根据自己的需求对源代码进行更改。
  // 然而，您仍然需要遵守MIT许可证的其他规定，如保留版权声明和免责声明等
  // relation-graph是relation-graph的网址是它的版权声明，请勿注释掉这一行信息
  relationGraphVersionInfo('Vue3')
  // 在元素上做些操作
  devLog('---------------------------graph mounted---------------------------')
  const rgInstance = props.relationGraphCore ? new props.relationGraphCore(props.options, getEventListeners(props)) : new RelationGraphFinal(props.options, getEventListeners(props))
  // Object.defineProperty(graph, 'instance', { enumerable: false });
  // graph.instance = rgInstance;
  graph.instance = markRaw(rgInstance);
  rgInstance.setReactiveDataVue3(graphData, graph);
  rgInstance.setDom(seeksRelationGraph$.value)
  rgInstance.setEventEmitHook((eventName: RGEventNames, ...eventArgs:any[]) => {
    // console.log('xxxxxxxxx:', eventName, ...eventArgs)
    emit(eventName, ...eventArgs);
  });
  rgInstance.ready()
  screenfull && screenfull.on && screenfull.on('change', onFullscreen)
  // console.log(relationGraph.value)
})
onBeforeUnmount(() => {
  screenfull && screenfull.off && screenfull.off('change', onFullscreen)
})
const onFullscreen = () => {
  graph.instance!.fullscreen(screenfull.isFullscreen)
}
defineExpose({
  onFullscreen() {
    deprecatedWaring('Method [$graphRef.onFullscreen()] has been deprecated. Please use: $graphRef.getInstance().onFullscreen()')
    onFullscreen();
  },
  getInstance() {
    return graph.instance!
  },
  async setOptions(options: RGOptions, justUpdateOptionsValue = false) {
    deprecatedWaring('Method [$graphRef.setOptions()] has been deprecated. Please use: $graphRef.getInstance().setOptions()')
    await graph.instance!.setOptions(options, justUpdateOptionsValue)
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
    await graph.instance!.setJsonData(jsonData, true);
    await graph.instance!.refresh(false);
    if (callback) callback(graph.instance!)
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
    await graph.instance!.appendJsonData(jsonData, true)
    if (callback) callback(graph.instance!)
  },
  setLayouter(layouterInstance: RGLayouter) {
    deprecatedWaring('Method [$graphRef.setLayouter()] has been deprecated. Please use: $graphRef.getInstance().setLayouter()')
    graph.instance!.setLayouter(layouterInstance)
  },
  onGraphResize() {
    deprecatedWaring('Method [$graphRef.onGraphResize()] has been deprecated. Please use: $graphRef.getInstance().resetViewSize()')
    graph.instance!.refreshNVAnalysisInfo()
  },
  refresh() {
    deprecatedWaring('Method [$graphRef.refresh()] has been deprecated. Please use: $graphRef.getInstance().refresh()')
    graph.instance!.refresh()
  },
  focusRootNode() {
    deprecatedWaring('Method [$graphRef.focusRootNode()] has been deprecated. Please use: $graphRef.getInstance().focusRootNode()')
    graph.instance!.focusRootNode()
  },
  focusNodeById(nodeId: string) {
    deprecatedWaring('Method [$graphRef.focusNodeById()] has been deprecated. Please use: $graphRef.getInstance().focusNodeById()')
    return graph.instance!.focusNodeById(nodeId)
  },
  getNodeById(nodeId: string) {
    deprecatedWaring('Method [$graphRef.getNodeById()] has been deprecated. Please use: $graphRef.getInstance().getNodeById()')
    return graph.instance!.getNodeById(nodeId)
  },
  removeNodeById(nodeId: string) {
    deprecatedWaring('Method [$graphRef.removeNodeById()] has been deprecated. Please use: $graphRef.getInstance().removeNodeById()')
    return graph.instance!.removeNodeById(nodeId)
  },
  getNodes() {
    deprecatedWaring('Method [$graphRef.getNodes()] has been deprecated. Please use: $graphRef.getInstance().getNodes()')
    return graph.instance!.getNodes()
  },
  getLinks() {
    deprecatedWaring('Method [$graphRef.getLinks()] has been deprecated. Please use: $graphRef.getInstance().getLinks()')
    return graph.instance!.getLinks()
  },
  getGraphJsonData() {
    deprecatedWaring('Method [$graphRef.getGraphJsonData()] has been deprecated. Please use: $graphRef.getInstance().getGraphJsonData()')
    return graph.instance!.getGraphJsonData()
  },
  getGraphJsonOptions() {
    deprecatedWaring('Method [$graphRef.getGraphJsonOptions()] has been deprecated. Please use: $graphRef.getInstance().getGraphJsonOptions()')
    return graph.instance!.getGraphJsonOptions()
  },
})
</script>
<template>
  <div ref="seeksRelationGraph$" class="relation-graph" :style="{width: '100%',height : '100%'}">
    <template v-if="graph.instance && graph.options">
      <GraphDebugPanel v-if="graph.options.showDebugPanel" />
      <slot v-if="graph.options.allowShowMiniToolBar===true" name="tool-bar">
        <GraphMiniToolBar />
      </slot>
      <slot name="graph-plug" />
      <RGCanvas>
        <template #svg-defs>
          <slot name="svg-defs" />
        </template>
        <template #node="{node}">
          <slot :node="node" name="node" />
        </template>
        <template #line="{line, link}">
          <slot :line="line" :link="link" name="line" />
        </template>
        <template #canvas-plug>
          <slot name="canvas-plug" />
        </template>
        <template #canvas-plug-above>
          <slot />
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
      <GraphLoading />
    </template>
  </div>
</template>
<style lang="scss">
@import "../../../../../../platforms/vue2/src/core4vue/relation-graph";
@import "../../../../../../platforms/vue2/src/core4vue/relation-graph-toolbar";
</style>
