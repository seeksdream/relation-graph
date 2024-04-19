<template>
  <div ref="seeksRelationGraph" class="relation-graph" :style="{width: '100%',height : '100%'}">
    <template v-if="graphInstanceOK && graph.options">
      <GraphDebugPanel v-if="graph.options.showDebugPanel" />
      <template v-if="graph.options.allowShowMiniToolBar===true">
        <GraphToolBar v-if="graph.options.oldVueVersion && !graph.options.ovUseToolbarSlot" />
        <slot v-else name="tool-bar">
          <GraphToolBar v-if="graph.options.toolBarVersion==='v2'" />
          <GraphMiniToolBar v-else />
        </slot>
      </template>
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

<script lang="ts">
import Vue from 'vue';
import screenfull from 'screenfull';
import html2canvas from 'html2canvas';
import '../../../../relation-graph-models/utils/RGGraphIconfont';
import { version } from '../constants';
import { devLog } from '../../../../relation-graph-models/utils/RGCommon';
import { RelationGraphFinal } from '../../../../relation-graph-models/models/RelationGraphFinal';
import RGCanvas from './RGCanvas.vue';
import GraphDebugPanel from './widgets/GraphDebugPanel.vue';
import GraphMiniView from './widgets/GraphMiniView.vue';
import GraphMiniToolBar from './widgets/GraphMiniToolBar.vue';
import GraphToolBar from './widgets/GraphToolBar.vue';
import GraphOperateStuff from './widgets/GraphOperateStuff.vue';
import {getEventListeners} from "../../../../relation-graph-models/utils/RGIntergration";
import GraphLoading from "./widgets/GraphLoading.vue";
import {createDefaultConfig} from "../../../../relation-graph-models/models/RGOptions";

export default {
  name: 'SeeksRelationGraph',
  components: {GraphLoading, GraphOperateStuff, GraphMiniToolBar, GraphToolBar, GraphMiniView, RGCanvas, GraphDebugPanel },
  props: {
    options: {
      mustUseProp: false,
      default: () => { return {}; },
      type: Object
    },
    relationGraphCore: {
      mustUseProp: false,
      default: null,
      type: Function
    },
    onNodeClick: {
      mustUseProp: false,
      default: () => { return () => {}; },
      type: Function
    },
    onNodeExpand: {
      mustUseProp: false,
      default: () => { return () => {}; },
      type: Function
    },
    onNodeCollapse: {
      mustUseProp: false,
      default: () => { return () => {}; },
      type: Function
    },
    onLineClick: {
      mustUseProp: false,
      default: () => { return () => {}; },
      type: Function
    },
    onNodeDragStart: {
      mustUseProp: false,
      default: () => { return () => {}; },
      type: Function
    },
    onNodeDragEnd: {
      mustUseProp: false,
      default: () => { return () => {}; },
      type: Function
    },
    onNodeDragging: {
      mustUseProp: false,
      default: () => { return () => {}; },
      type: Function
    },
    onCanvasDragEnd: {
      mustUseProp: false,
      default: () => { return () => {}; },
      type: Function
    },
    beforeChangeLayout: {
      mustUseProp: false,
      default: () => { return () => {}; },
      type: Function
    },
    onContextmenu: {
      mustUseProp: false,
      default: () => { return () => {}; },
      type: Function
    },
    onFullscreen: {
      mustUseProp: false,
      default: null,
      type: Function
    },
    onCanvasClick: {
      mustUseProp: false,
      default: () => { return () => {}; },
      type: Function
    },
    onDownloadExcel: {
      mustUseProp: false,
      default: null,
      type: Function
    },
    onImageDownload: {
      mustUseProp: false,
      default: null,
      type: Function
    },
    onImageSaveAsFile: {
      mustUseProp: false,
      default: null,
      type: Function
    },
    onCanvasSelectionEnd: {
      mustUseProp: false,
      default: null,
      type: Function
    },
    onZoomEnd: {
      mustUseProp: false,
      default: null,
      type: Function
    }
  },
  data() {
    // this.relationGraph = null;
    return {
      graphInstanceOK: false,
      graphData: {
        rootNode: null,
        nodes: [],
        links: [],
        elementLines: []
      },
      graph: {
        options: createDefaultConfig({}),
        allLineColors: []
      },
      oldVueVersion: false
    };
  },
  provide() {
    return {
      graphData: this.graphData,
      graph: this.graph,
      graphInstance: this.getInstance
    };
  },
  created() {
    if (window) window.relationGraphDebug = this.options.debug;
    devLog('---------------------------graph created---------------------------', this);
    // 注意：
    // 根据MIT许可证的规定，允许您自由地使用、修改和分发源代码。您可以根据自己的需求对源代码进行更改。
    // 然而，您仍然需要遵守MIT许可证的其他规定，如保留版权声明和免责声明等
    // relation-graph是relation-graph的网址是它的版权声明，请勿注释掉以下版权声明信息
    console.log(
      `%c relation-graph %c Version v${version} %c More info: https://github.com/seeksdream/relation-graph %c`,
      'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
      'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
      'background:#fff ; padding: 1px; border-radius: 0 3px 3px 0;  color: #41b883',
      'background:transparent'
    );
    let slotAlert = false;
    // console.error(`vue version:${Vue.version}`);
    if (!Vue || !Vue.version || Vue.version.startsWith('3')) {
      console.error('如果您使用的是vue3或react，你需要注意import时使用的名称：');
      console.error('vue2:import RelationGraph from \'relation-graph\'');
      console.error('vue3:import RelationGraph from \'relation-graph/vue3\'');
      console.error('react:import RelationGraph from \'relation-graph/react\'');
      return;
    }
    if (Vue.version.slice(0, 4) === '2.5.') slotAlert = true;
    if (Vue.version.slice(0, 4) === '2.6.' && Number.parseInt(Vue.version.split('.')[2]) <= 12) slotAlert = true;
    if (slotAlert) {
      this.oldVueVersion = true;
      console.error(`您的Vue版本：${Vue.version}注意：当你使用的vue版本等于低于2.6.12时，图谱会显示不正常，参考这个连接解决这个问题：https://github.com/seeksdream/relation-graph/issues/113`);
    }
    if (!screenfull) {
      console.error('[relation-graph]Please introduce component screenfull, for example:https://cdnjs.cloudflare.com/ajax/libs/screenfull.js/5.1.0/screenfull.min.js');
    }
    if (!html2canvas) {
      console.error('[relation-graph]Please introduce component html2canvas, for example:https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
    }
  },
  mounted() {
    devLog('---------------------------graph mounted---------------------------');
    // const listeners = {
    //   onNodeClick: this.onNodeClick,
    //   onNodeExpand: this.onNodeExpand,
    //   onNodeCollapse: this.onNodeCollapse,
    //   onLineClick: this.onLineClick,
    //   onDownloadExcel: this.onDownloadExcel,
    //   onImageDownload: this.onImageDownload,
    //   onNodeDragEnd: this.onNodeDragEnd,
    //   onCanvasDragEnd: this.onCanvasDragEnd,
    //   beforeChangeLayout: this.beforeChangeLayout,
    //   onContextmenu: this.onContextmenu,
    //   onCanvasClick: this.onCanvasClick,
    //   onCanvasSelectionEnd: this.onCanvasSelectionEnd,
    //   onImageSaveAsFile: this.onImageSaveAsFile
    // };
    // devLog(this.relationGraphCore);
    // const rgClass = this.relationGraphCore || RelationGraphFinal;
    // const newRGCoreInstance = Object.create(rgClass.prototype);
    // const relationGraph = rgClass.apply(newRGCoreInstance, [this.options, listeners]);
    const _options = JSON.parse(JSON.stringify(this.options));
    const relationGraph = this.relationGraphCore ? new this.relationGraphCore(_options, getEventListeners(this)) : new RelationGraphFinal(_options, getEventListeners(this));
    relationGraph.options.oldVueVersion = this.oldVueVersion;
    // Object.defineProperty(this.graph, 'instance', { enumerable: false });
    // this.graph.instance = relationGraph;
    // Object.defineProperty(this.graph, 'instance', {
    //   enumerable: true,
    //   value: relationGraph
    // });
    // Vue.set(this, 'relationGraph', relationGraph)
    this.relationGraph = relationGraph;
    // this.graph.instance = relationGraph;
    relationGraph.setReactiveData(this.graphData, this.graph);
    relationGraph.setDom(this.$refs.seeksRelationGraph);
    relationGraph.ready();
    relationGraph.id = Math.random();
    // console.log(relationGraph.id, 'xxxxxxxxxxxxxxxxx:', relationGraph.options.instanceId, relationGraph.options.defaultNodeColor);
    // setInterval(() => {
    //   console.log(relationGraph.id, 'xxxxx###', relationGraph.options.instanceId, relationGraph.options.defaultNodeColor);
    //   console.log(relationGraph.id, 'xxxxx$$$', this.getInstance().options.instanceId, this.getInstance().options.defaultNodeColor);
    //   console.log(relationGraph.id, 'xxxxx%%%', this.graph.options.instanceId, this.graph.options.defaultNodeColor);
    // }, 3000);
    this.graphInstanceOK = true;
    screenfull && screenfull.on && screenfull.on('change', this.doFullscreen);
  },
  beforeDestroy() {
    // devLog('---------------------------graph beforeDestroy---------------------------');
    // const elx = this.$refs.seeksRelationGraph;
    // elx.remove();

    devLog('beforeDestroy:relation-graph');
    // 通过此标识通知一些定时任务停止
    this.getRelationGraph().options.instanceDestroyed = true;
    screenfull && screenfull.off && screenfull.off('change', this.doFullscreen);
  },
  updated() {
    devLog('---------------------------graph updated---------------------------');
    // if (this.jsonData) this.relationGraph.setJsonData(this.jsonData);
    // if (this.jsonData) this.graph.instance.setJsonData(this.jsonData);
  },
  methods: {
    getRelationGraph() {
      return this.relationGraph;
    },
    doFullscreen() {
      this.getRelationGraph().fullscreen(screenfull.isFullscreen);
    },
    getInstance() {
      return this.getRelationGraph();
    },
    async setOptions(options, callback) {
      await this.getRelationGraph().setOptions(options);
      callback && callback(this.getRelationGraph());
    },
    async setJsonData(jsonData, reLayout, callback) {
      if (arguments.length === 2 && typeof reLayout === 'function') {
        callback = reLayout;
        reLayout = true;
      }
      await this.getRelationGraph().setJsonData(jsonData, reLayout);
      return new Promise((resolve, reject) => {
        this.$nextTick(async() => {
          await this.getRelationGraph().refresh(false);
          if (callback) callback(this.getRelationGraph());
          resolve();
        });
      });
    },
    async appendJsonData(jsonData, reLayout, callback) {
      if (arguments.length === 2 && typeof reLayout === 'function') {
        callback = reLayout;
        reLayout = true;
      }
      await this.getRelationGraph().appendJsonData(jsonData, reLayout);
      callback && callback(this.getRelationGraph());
    },
    setLayouter(layouterInstance) {
      this.getRelationGraph().setLayouter(layouterInstance);
    },
    onGraphResize() {
      this.getRelationGraph().refreshNVAnalysisInfo();
    },
    async refresh() {
      await this.getRelationGraph().refresh();
    },
    async doLayout() {
      await this.getRelationGraph().doLayout();
    },
    async focusRootNode() {
      await this.getRelationGraph().focusRootNode();
    },
    async focusNodeById(nodeId) {
      return await this.getRelationGraph().focusNodeById(nodeId);
    },
    getNodeById(nodeId) {
      return this.getRelationGraph().getNodeById(nodeId);
    },
    removeNodeById(nodeId) {
      return this.getRelationGraph().removeNodeById(nodeId);
    },
    getNodes() {
      return this.getRelationGraph().getNodes();
    },
    getLinks() {
      return this.getRelationGraph().getLinks();
    },
    getGraphJsonData() {
      return this.getRelationGraph().getGraphJsonData();
    },
    getGraphJsonOptions() {
      return this.getRelationGraph().getGraphJsonOptions();
    }
  }
};
</script>
<style lang="scss">
@import "relation-graph";
</style>
