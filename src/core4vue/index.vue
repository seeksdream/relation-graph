<template>
  <div ref="seeksRelationGraph" :style="{width: '100%',height : '100%'}" style="box-sizing:border-box;">
    <template v-if="relationGraph && relationGraph.options">
      <GraphDebugPanel v-if="relationGraph.options.showDebugPanel" :relation-graph="relationGraph" />
      <slot v-if="relationGraph.options.allowShowMiniToolBar===true" name="miniToolBar" :relation-graph="relationGraph">
        <GraphMiniToolBar :relation-graph="relationGraph" />
      </slot>
      <slot v-if="relationGraph.options.allowShowMiniView===true" name="miniViewPanel" :relation-graph="relationGraph">
        <GraphMiniView :relation-graph="relationGraph" />
      </slot>
      <slot name="graph-plug" :relation-graph="relationGraph" />
      <RGCanvas :relation-graph="relationGraph">
        <template slot="node" slot-scope="{node}">
          <slot :node="node" :relation-graph="relationGraph" name="node" />
        </template>
        <template slot="line" slot-scope="{line, link}">
          <slot :line="line" :link="link" :relation-graph="relationGraph" name="line" />
        </template>
        <template slot="canvas-plug">
          <slot :relation-graph="relationGraph" name="canvas-plug" />
        </template>
      </RGCanvas>
      <div v-if="relationGraph.options.debug">
<!--        <div :style="{'left': (currentZoomSet.NMCanvasStart.x + currentZoomSet.NMViewPosition.x) + 'px', top: currentZoomSet.NMViewPosition.y + 'px' }" style="position: fixed;top:0px;width:2px;height:2000px;z-index: 99999;background-color: blue;opacity: 0.6;"/>-->
<!--        <div :style="{'top': (currentZoomSet.NMCanvasStart.y + currentZoomSet.NMViewPosition.y) + 'px', left: currentZoomSet.NMViewPosition.x + 'px' }" style="position: fixed;left:0px;height:2px;width:2000px;z-index: 99999;background-color: blue;opacity: 0.6;"/>-->
<!--        <div :style="{'left': (currentZoomSet.NMCanvasCenter.x + currentZoomSet.NMViewPosition.x) + 'px', top: currentZoomSet.NMViewPosition.y + 'px' }" style="position: fixed;top:0px;width:4px;height:2000px;z-index: 99999;background-color: green;opacity: 0.4;"/>-->
<!--        <div :style="{'top': (currentZoomSet.NMCanvasCenter.y + currentZoomSet.NMViewPosition.y) + 'px', left: currentZoomSet.NMViewPosition.x + 'px' }" style="position: fixed;left:0px;height:4px;width:2000px;z-index: 99999;background-color: green;opacity: 0.4;"/>-->
<!--        <div :style="{'left': (currentZoomSet.NMCanvasEnd.x + currentZoomSet.NMViewPosition.x) + 'px', top: currentZoomSet.NMViewPosition.y + 'px' }" style="position: fixed;top:0px;width:2px;height:2000px;z-index: 99999;background-color: blue;opacity: 0.6;"/>-->
<!--        <div :style="{'top': (currentZoomSet.NMCanvasEnd.y + currentZoomSet.NMViewPosition.y) + 'px', left: currentZoomSet.NMViewPosition.x + 'px' }" style="position: fixed;left:0px;height:2px;width:2000px;z-index: 99999;background-color: blue;opacity: 0.6;"/>-->
<!--        <div :style="{'left': (currentZoomSet.NMZoomCenter.x + currentZoomSet.NMViewPosition.x - 10) + 'px', top: currentZoomSet.NMViewPosition.y + 'px' }" style="position: fixed;top:0px;width:2px;height:2000px;z-index: 99999;background-color: red;opacity: 0.6;"/>-->
<!--        <div :style="{'top': (currentZoomSet.NMZoomCenter.y + currentZoomSet.NMViewPosition.y - 10) + 'px', left: currentZoomSet.NMViewPosition.x + 'px' }" style="position: fixed;left:0px;height:2px;width:2000px;z-index: 99999;background-color: red;opacity: 0.6;"/>-->
<!--        <div :style="{'left': (currentZoomSet.NMViewCenter.x + currentZoomSet.NMViewPosition.x) + 'px', top: currentZoomSet.NMViewPosition.y + 'px' }" style="position: fixed;top:0px;width:2px;height:2000px;z-index: 99999;background-color: black;opacity: 0.6;"/>-->
<!--        <div :style="{'top': (currentZoomSet.NMViewCenter.y + currentZoomSet.NMViewPosition.y) + 'px', left: currentZoomSet.NMViewPosition.x + 'px' }" style="position: fixed;left:0px;height:2px;width:2000px;z-index: 99999;background-color: black;opacity: 0.6;"/>-->
<!--        <div :style="{'left': (newZoomSet.NMCanvasStart.x + newZoomSet.NMViewPosition.x) + 'px', top: newZoomSet.NMViewPosition.y + 'px' }" style="position: fixed;top:0px;width:2px;height:2000px;z-index: 99999;border-left: blue dotted 2px;opacity: 0.6;"/>-->
<!--        <div :style="{'top': (newZoomSet.NMCanvasStart.y + newZoomSet.NMViewPosition.y) + 'px', left: newZoomSet.NMViewPosition.x + 'px' }" style="position: fixed;left:0px;height:2px;width:2000px;z-index: 99999;border-top: blue dotted 2px;opacity: 0.6;"/>-->
<!--        <div :style="{'left': (newZoomSet.NMCanvasCenter.x + newZoomSet.NMViewPosition.x) + 'px', top: newZoomSet.NMViewPosition.y + 'px' }" style="position: fixed;top:0px;width:4px;height:2000px;z-index: 99999;border-left: green dotted 2px;opacity: 0.4;"/>-->
<!--        <div :style="{'top': (newZoomSet.NMCanvasCenter.y + newZoomSet.NMViewPosition.y) + 'px', left: newZoomSet.NMViewPosition.x + 'px' }" style="position: fixed;left:0px;height:4px;width:2000px;z-index: 99999;border-top: green dotted 2px;opacity: 0.4;"/>-->
<!--        <div :style="{'left': (newZoomSet.NMCanvasEnd.x + newZoomSet.NMViewPosition.x) + 'px', top: newZoomSet.NMViewPosition.y + 'px' }" style="position: fixed;top:0px;width:2px;height:2000px;z-index: 99999;border-left: blue dotted 2px;opacity: 0.6;"/>-->
<!--        <div :style="{'top': (newZoomSet.NMCanvasEnd.y + newZoomSet.NMViewPosition.y) + 'px', left: newZoomSet.NMViewPosition.x + 'px' }" style="position: fixed;left:0px;height:2px;width:2000px;z-index: 99999;border-top: blue dotted 2px;opacity: 0.6;"/>-->
<!--        <div :style="{'left': (zoomCenter_of_newSize.x + newZoomSet.NMViewPosition.x - 10) + 'px', top: newZoomSet.NMViewPosition.y + 'px' }" style="position: fixed;top:0px;width:2px;height:2000px;z-index: 99999;border-left: red dotted 2px;opacity: 0.6;"/>-->
<!--        <div :style="{'top': (zoomCenter_of_newSize.y + newZoomSet.NMViewPosition.y - 10) + 'px', left: newZoomSet.NMViewPosition.x + 'px' }" style="position: fixed;left:0px;height:2px;width:2000px;z-index: 99999;border-top: red dotted 2px;opacity: 0.6;"/>-->
<!--        <div :style="{'left': (relationGraph.options.canvasNVInfo.x + relationGraph.options.viewNVInfo.x) + 'px', top: relationGraph.options.viewNVInfo.y + 'px' }" style="position: fixed;top:0px;width:2px;height:2000px;z-index: 99999;border-left: blue dotted 2px;opacity: 0.6;" />-->
<!--        <div :style="{'top': (relationGraph.options.canvasNVInfo.y + relationGraph.options.viewNVInfo.y) + 'px', left: relationGraph.options.viewNVInfo.x + 'px' }" style="position: fixed;left:0px;height:2px;width:2000px;z-index: 99999;border-top: blue dotted 2px;opacity: 0.6;" />-->
<!--        <div :style="{'left': (relationGraph.options.canvasNVInfo.x + relationGraph.options.canvasNVInfo.width/2 + relationGraph.options.viewNVInfo.x) + 'px', top: relationGraph.options.viewNVInfo.y + 'px' }" style="position: fixed;top:0px;width:4px;height:2000px;z-index: 99999;border-left: green dotted 2px;opacity: 0.4;" />-->
<!--        <div :style="{'top': (relationGraph.options.canvasNVInfo.y + relationGraph.options.canvasNVInfo.height/2 + relationGraph.options.viewNVInfo.y) + 'px', left: relationGraph.options.viewNVInfo.x + 'px' }" style="position: fixed;left:0px;height:4px;width:2000px;z-index: 99999;border-top: green dotted 2px;opacity: 0.4;" />-->
<!--        <div :style="{'left': (relationGraph.options.canvasNVInfo.x + relationGraph.options.canvasNVInfo.width + relationGraph.options.viewNVInfo.x) + 'px', top: relationGraph.options.viewNVInfo.y + 'px' }" style="position: fixed;top:0px;width:2px;height:2000px;z-index: 99999;border-left: blue dotted 2px;opacity: 0.6;" />-->
<!--        <div :style="{'top': (relationGraph.options.canvasNVInfo.y + relationGraph.options.canvasNVInfo.height + relationGraph.options.viewNVInfo.y) + 'px', left: relationGraph.options.viewNVInfo.x + 'px' }" style="position: fixed;left:0px;height:2px;width:2000px;z-index: 99999;border-top: blue dotted 2px;opacity: 0.6;" />-->
      </div>
    </template>
  </div>
</template>

<script>
import { version } from '../../package.json';
import '../utils/RGGraphIconfont';
import Vue from 'vue';
import screenfull from 'screenfull';
import RGCanvas from './RGCanvas';
import GraphDebugPanel from './widgets/GraphDebugPanel';
import GraphMiniView from './widgets/GraphMiniView';
import GraphMiniToolBar from './widgets/GraphMiniToolBar';
import { devLog } from '../utils/RGCommon';
import { RelationGraphFinal } from '../models/RelationGraphFinal';
import html2canvas from 'html2canvas';

export default {
  name: 'SeeksRelationGraph',
  components: { GraphMiniToolBar, GraphMiniView, RGCanvas, GraphDebugPanel },
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
    onDownloadExcel: {
      mustUseProp: false,
      default: null,
      type: Function
    },
    onImageDownload: {
      mustUseProp: false,
      default: null,
      type: Function
    }
  },
  data() {
    // this.relationGraph = null;
    return {
      relationGraph: null,
      graphSetting: null
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
    if (Vue.version.substring(0, 4) === '2.5.') {
      console.log('注意：当你使用的vue版本低于2.6时，你只能通过插槽slot[node]来显示节点内容，示例请参考：http://relation-graph.com/#/demo/adv-slot');
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
    const listeners = {
      onNodeClick: this.onNodeClick,
      onNodeExpand: this.onNodeExpand,
      onNodeCollapse: this.onNodeCollapse,
      onLineClick: this.onLineClick,
      onDownloadExcel: this.onDownloadExcel,
      onImageDownload: this.onImageDownload
    };
    console.log(this.relationGraphCore);
    // const rgClass = this.relationGraphCore || RelationGraphFinal;
    // const newRGCoreInstance = Object.create(rgClass.prototype);
    // const relationGraph = rgClass.apply(newRGCoreInstance, [this.options, listeners]);
    const relationGraph = this.relationGraphCore || new RelationGraphFinal(this.options, listeners);
    relationGraph.setDom(this.$refs.seeksRelationGraph);
    relationGraph.ready();
    // if (this.jsonData) relationGraph.setJsonData(this.jsonData);
    this.relationGraph = relationGraph;
    this.graphSetting = this.relationGraph.options;
    screenfull.on('change', this.onFullscreen);
  },
  beforeDestroy() {
    devLog('---------------------------graph beforeDestroy---------------------------');
    screenfull.off('change', this.onFullscreen);
    const elx = this.$refs.seeksRelationGraph;
    elx.remove();
  },
  updated() {
    devLog('---------------------------graph updated---------------------------');
    // if (this.jsonData) this.relationGraph.setJsonData(this.jsonData);
    // if (this.jsonData) this.relationGraph.setJsonData(this.jsonData);
  },
  methods: {
    onFullscreen() {
      this.relationGraph.fullscreen(screenfull.isFullscreen);
    },
    getInstance(options, callback) {
      return this.relationGraph;
    },
    setOptions(options, callback) {
      this.relationGraph.setOptions(options, callback);
    },
    setJsonData(jsonData, callback) {
      this.relationGraph.setJsonData(jsonData, (instance) => {
        this.$nextTick(() => {
          this.relationGraph.playShowEffect(() => {
            if (callback) callback(instance);
          });
        });
      });
    },
    appendJsonData(jsonData, isRelayout, callback) {
      this.relationGraph.appendJsonData(jsonData, isRelayout, callback);
    },
    setLayouter(layouterInstance) {
      this.relationGraph.setLayouter(layouterInstance);
    },
    onGraphResize(jsonData, callback) {
      this.relationGraph.refreshNVAnalysisInfo();
    },
    refresh() {
      this.relationGraph.refresh();
    },
    focusRootNode() {
      this.relationGraph.focusRootNode();
    },
    focusNodeById(nodeId) {
      return this.relationGraph.focusNodeById(nodeId);
    },
    getNodeById(nodeId) {
      return this.relationGraph.getNodeById(nodeId);
    },
    removeNodeById(nodeId) {
      return this.relationGraph.removeNodeById(nodeId);
    },
    getNodes() {
      return this.relationGraph.getNodes();
    },
    getLinks() {
      return this.relationGraph.getLinks();
    },
    getGraphJsonData() {
      return this.relationGraph.getGraphJsonData();
    },
    getGraphJsonOptions() {
      return this.relationGraph.getGraphJsonOptions();
    }
  }
};
</script>
<style scoped>
</style>
