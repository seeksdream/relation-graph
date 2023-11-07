<template>
  <div ref="seeksRelationGraph" class="relation-graph" :style="{width: '100%',height : '100%'}" style="box-sizing:border-box;position: relative;">
    <template v-if="graph.instance && graph.options">
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

<script lang="ts">
import Vue from 'vue';
import screenfull from 'screenfull';
import html2canvas from 'html2canvas';
import '../utils/RGGraphIconfont';
import { version } from '../constants';
import { devLog } from '../utils/RGCommon';
import { RelationGraphFinal } from '../models/RelationGraphFinal';
import RGCanvas from './RGCanvas';
import GraphDebugPanel from './widgets/GraphDebugPanel';
import GraphMiniView from './widgets/GraphMiniView';
import GraphMiniToolBar from './widgets/GraphMiniToolBar';
import GraphToolBar from './widgets/GraphToolBar';
import GraphOperateStuff from './widgets/GraphOperateStuff';
import {getEventListeners} from "../utils/RGIntergration";

export default {
  name: 'SeeksRelationGraph',
  components: { GraphOperateStuff, GraphMiniToolBar, GraphToolBar, GraphMiniView, RGCanvas, GraphDebugPanel },
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
    onNodeDragEnd: {
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
    }
  },
  data() {
    // this.relationGraph = null;
    return {
      graphData: {
        rootNode: null,
        nodes: [],
        links: []
      },
      graph: {
        options: null,
        allLineColors: [],
        instance: null
      },
      oldVueVersion: false,
      relationGraph: null
    };
  },
  provide() {
    return {
      graphData: this.graphData,
      graph: this.graph
    };
  },
  created() {
    if (window) window.relationGraphDebug = this.options.debug;
    devLog('---------------------------graph created---------------------------', this);
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
    const relationGraph = this.relationGraphCore || new RelationGraphFinal(this.options, getEventListeners(this));
    relationGraph.options.oldVueVersion = this.oldVueVersion;
    relationGraph.setReactiveData(this.graphData, this.graph);
    relationGraph.setDom(this.$refs.seeksRelationGraph);
    relationGraph.ready();
    this.graph.instance = relationGraph;
    screenfull && screenfull.on && screenfull.on('change', this.onFullscreen);
  },
  beforeUnmount() {
    devLog('---------------------------graph beforeDestroy---------------------------');
    screenfull.off('change', this.onFullscreen);
    const elx = this.$refs.seeksRelationGraph;
    elx.remove();
  },
  updated() {
    devLog('---------------------------graph updated---------------------------');
    // if (this.jsonData) this.relationGraph.setJsonData(this.jsonData);
    // if (this.jsonData) this.graph.instance.setJsonData(this.jsonData);
  },
  methods: {
    onFullscreen() {
      this.graph.instance.fullscreen(screenfull.isFullscreen);
    },
    getInstance() {
      return this.graph.instance;
    },
    async setOptions(options, callback) {
      await this.graph.instance.setOptions(options);
      callback && callback(this.graph.instance);
    },
    async setJsonData(jsonData, reLayout, callback) {
      if (arguments.length === 2 && typeof reLayout === 'function') {
        callback = reLayout;
        reLayout = true;
      }
      await this.graph.instance.setJsonData(jsonData, reLayout);
      return new Promise((resolve, reject) => {
        this.$nextTick(async() => {
          await this.graph.instance.playShowEffect();
          if (callback) callback(this.graph.instance);
          resolve();
        });
      });
    },
    async appendJsonData(jsonData, reLayout, callback) {
      if (arguments.length === 2 && typeof reLayout === 'function') {
        callback = reLayout;
        reLayout = true;
      }
      await this.graph.instance.appendJsonData(jsonData, reLayout);
      callback && callback(this.graph.instance);
    },
    setLayouter(layouterInstance) {
      this.graph.instance.setLayouter(layouterInstance);
    },
    onGraphResize() {
      this.graph.instance.refreshNVAnalysisInfo();
    },
    async refresh() {
      await this.graph.instance.refresh();
    },
    async doLayout() {
      await this.graph.instance.doLayout();
    },
    async focusRootNode() {
      await this.graph.instance.focusRootNode();
    },
    async focusNodeById(nodeId) {
      return await this.graph.instance.focusNodeById(nodeId);
    },
    getNodeById(nodeId) {
      return this.graph.instance.getNodeById(nodeId);
    },
    removeNodeById(nodeId) {
      return this.graph.instance.removeNodeById(nodeId);
    },
    getNodes() {
      return this.graph.instance.getNodes();
    },
    getLinks() {
      return this.graph.instance.getLinks();
    },
    getGraphJsonData() {
      return this.graph.instance.getGraphJsonData();
    },
    getGraphJsonOptions() {
      return this.graph.instance.getGraphJsonOptions();
    }
  },
  beforeDestroy() {
    devLog('beforeDestroy:relation-graph');
    // 通过此标识通知一些定时任务停止
    this.graph.instance.options.instanceDestroyed = true;
  }
};
</script>
<style lang="scss">
@import "./relation-graph.scss";
</style>
