<template>
  <div ref="seeksRelationGraph" :style="{width: '100%',height : '100%'}" @resize="refreshNVAnalysisInfo()">
    <GraphSettingPanel v-if="graphSetting.allowShowSettingPanel" :graph-setting="graphSetting">
      <div slot="settingPanelPlus" slot-scope="{setting}">
        <slot :setting="setting" name="settingPanelPlus" />
      </div>
    </GraphSettingPanel>
    <graph-mini-name-filter v-show="graphSetting.allowShowMiniNameFilter===true" :graph-setting="graphSetting" />
    <graph-mini-tool-bar v-show="graphSetting.allowShowMiniToolBar===true" :graph-setting="graphSetting" />
    <graph-mini-view v-if="graphSetting.allowShowMiniView===true" :graph-setting="graphSetting" />
    <slot :graph="this" name="graphPlug" />
    <div :style="{width: '100%',height : '100%', 'background-image': 'url('+graphSetting.backgrounImage+')'}" :class="[graphSetting.layoutClassName, (graphSetting.backgrounImageNoRepeat?'rel-map-background-norepeat':'')]" class="rel-map" @mousedown.left.stop="onDragStart($event)" @mousewheel.stop.prevent="mouseListener">
      <div ref="seeksRGCanvas" :style="getCanvasSizeAndPosition()" class="rel-map-canvas">
        <!--<div v-if="isShowZoomCenter" :style="{'margin-left': zoomCenter2.x + 'px','margin-top': zoomCenter2.y + 'px'}" style="position: absolute;z-index: 9999;width:50px;height:50px;background-color: blue;border-radius: 50%;line-height: 50px;text-align: center;color: #ffffff;">+</div>-->
        <!--<div v-if="isShowZoomCenter" :style="{'margin-left': zoomCenter.x + 'px','margin-top': zoomCenter.y + 'px'}" style="position: absolute;z-index: 9999;width:50px;height:50px;background-color: red;border-radius: 50%;line-height: 50px;text-align: center;color: #ffffff;opacity: 0.6;">+</div>-->
        <!--<div v-if="isShowZoomCenter" :style="{'margin-left': (visiableViewCenter.x) + 'px','margin-top': (visiableViewCenter.y) + 'px'}" style="position: absolute;z-index: 9999;width:30px;height:30px;background-color: black;border-radius: 50%;line-height: 30px;text-align: center;color: #ffffff;opacity: 0.6;">+</div>-->
        <!--<div v-if="isShowZoomCenter" :style="{'margin-left': canvasCenter.x + 'px','margin-top': canvasCenter.y + 'px'}" style="position: absolute;z-index: 9999;width:40px;height:40px;background-color: forestgreen;border-radius: 50%;line-height: 40px;text-align: center;color: #ffffff;opacity: 0.6;">+</div>-->
        <div class="rel-nodediv rel-nodediv-for-webkit">
          <SeeksRGNode v-for="thisNode in nodeViewList" :key="thisNode.seeks_id" :node-props="thisNode" :on-node-click="onRGNodeClick" :graph-setting="graphSetting">
            <template slot="node" slot-scope="{node}">
              <slot :node="node" name="node" />
            </template>
          </SeeksRGNode>
        </div>
        <div ref="rgCanvas" class="rel-linediv" style="overflow: visible">
          <svg :style="{width : graphSetting.canvasSize.width + 'px',height: graphSetting.canvasSize.height + 'px'}" style="overflow: visible" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
              <linearGradient :id="graphSetting.instanceId+'-lineStyle'" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stop-color="#e52c5c" />
                <stop offset="100%" stop-color="#FD8B37" />
              </linearGradient>
              <!--              <marker-->
              <!--                :id="graphSetting.instanceId+'-arrow-default'"-->
              <!--                markerUnits="strokeWidth"-->
              <!--                markerWidth="12"-->
              <!--                markerHeight="12"-->
              <!--                viewBox="0 0 12 12"-->
              <!--                refX="6"-->
              <!--                refY="6"-->
              <!--                orient="auto"-->
              <!--              >-->
              <!--                <path :style="{fill: graphSetting.defaultLineColor}" d="M2,2 L10,6 L2,10 L6,6 L2,2" />-->
              <!--              </marker>-->
              <marker
                :id="graphSetting.instanceId+'-arrow-default'"
                :markerWidth="graphSetting.defaultLineMarker.markerWidth"
                :markerHeight="graphSetting.defaultLineMarker.markerHeight"
                :refX="graphSetting.defaultLineMarker.refX"
                :refY="graphSetting.defaultLineMarker.refY"
                marker-units="strokeWidth"
                orient="auto"
                viewBox="0 0 12 12"
              >
                <path :style="{fill: graphSetting.defaultLineColor}" :d="graphSetting.defaultLineMarker.data" />
              </marker>
              <marker
                :id="graphSetting.instanceId+'-arrow-checked'"
                markerUnits="strokeWidth"
                markerWidth="12"
                markerHeight="12"
                viewBox="0 0 12 12"
                refX="6"
                refY="6"
                orient="auto"
              >
                <path :style="{fill: '#FD8B37'}" d="M2,2 L10,6 L2,10 L6,6 L2,2" />
              </marker>
              <marker
                v-for="thisColor in allLineColors"
                :id="graphSetting.instanceId+'-arrow-'+thisColor.id"
                :key="thisColor.id"
                :markerWidth="graphSetting.defaultLineMarker.markerWidth"
                :markerHeight="graphSetting.defaultLineMarker.markerHeight"
                :refX="graphSetting.defaultLineMarker.refX"
                :refY="graphSetting.defaultLineMarker.refY"
                marker-units="strokeWidth"
                orient="auto"
              >
                <path :fill="graphSetting.defaultLineMarker.color || thisColor.color" :d="graphSetting.defaultLineMarker.data" />
              </marker>
              <!--<marker-->
              <!--v-for="thisColor in allLineColors"-->
              <!--:id="graphSetting.instanceId+'-arrow-'+thisColor.id"-->
              <!--:key="thisColor.id"-->
              <!--marker-units="strokeWidth"-->
              <!--orient="auto"-->
              <!--markerWidth="15"-->
              <!--markerHeight="15"-->
              <!--refX="50"-->
              <!--refY="7"-->
              <!--&gt;-->
              <!--<path :fill="thisColor.color" d="M 14 7 L 1 .3 L 4 7 L .4 13 L 14 7, Z" />-->
              <!--</marker>-->
            </defs>
            <SeeksRGLink v-for="thisLine in lineViewList" :key="thisLine.seeks_id" :line-props="thisLine" :graph-setting="graphSetting" :on-line-click="onRGLineClick" />
          </svg>
        </div>
      </div>
    </div>
    <graph-bottom-panel v-if="$scopedSlots.bottomPanel" :graph-setting="graphSetting">
      <template slot="bottomPanel">
        <slot :graph="this" name="bottomPanel" />
      </template>
    </graph-bottom-panel>
    <div style="clear: both;height:1px;" />
    <div v-if="isShowZoomCenter" :style="{left:(debugPanelPosition?'':'0px'),right:(debugPanelPosition?'0px':'')}" style="position: fixed;top:0px;right:0px;font-size: 12px;background-color: #333333;color:#ffffff;z-index: 9999;padding:20px;" @click="moveDebugPanel">
      <div><pre>{{ JSON.stringify(graphSetting.canvasOffset, null, 2) }}</pre></div>
      <div><pre>{{ JSON.stringify(graphSetting.viewNVInfo, null, 2) }}</pre></div>
      <div><pre>{{ JSON.stringify(graphSetting.canvasNVInfo, null, 2) }}</pre></div>
    </div>
    <!--<div v-if="isShowZoomCenter" :style="{'left': (currentZoomSet.NMCanvasStart.x + currentZoomSet.NMViewPosition.x) + 'px', top: currentZoomSet.NMViewPosition.y + 'px' }" style="position: fixed;top:0px;width:2px;height:2000px;z-index: 99999;background-color: blue;opacity: 0.6;"/>-->
    <!--<div v-if="isShowZoomCenter" :style="{'top': (currentZoomSet.NMCanvasStart.y + currentZoomSet.NMViewPosition.y) + 'px', left: currentZoomSet.NMViewPosition.x + 'px' }" style="position: fixed;left:0px;height:2px;width:2000px;z-index: 99999;background-color: blue;opacity: 0.6;"/>-->
    <!--<div v-if="isShowZoomCenter" :style="{'left': (currentZoomSet.NMCanvasCenter.x + currentZoomSet.NMViewPosition.x) + 'px', top: currentZoomSet.NMViewPosition.y + 'px' }" style="position: fixed;top:0px;width:4px;height:2000px;z-index: 99999;background-color: green;opacity: 0.4;"/>-->
    <!--<div v-if="isShowZoomCenter" :style="{'top': (currentZoomSet.NMCanvasCenter.y + currentZoomSet.NMViewPosition.y) + 'px', left: currentZoomSet.NMViewPosition.x + 'px' }" style="position: fixed;left:0px;height:4px;width:2000px;z-index: 99999;background-color: green;opacity: 0.4;"/>-->
    <!--<div v-if="isShowZoomCenter" :style="{'left': (currentZoomSet.NMCanvasEnd.x + currentZoomSet.NMViewPosition.x) + 'px', top: currentZoomSet.NMViewPosition.y + 'px' }" style="position: fixed;top:0px;width:2px;height:2000px;z-index: 99999;background-color: blue;opacity: 0.6;"/>-->
    <!--<div v-if="isShowZoomCenter" :style="{'top': (currentZoomSet.NMCanvasEnd.y + currentZoomSet.NMViewPosition.y) + 'px', left: currentZoomSet.NMViewPosition.x + 'px' }" style="position: fixed;left:0px;height:2px;width:2000px;z-index: 99999;background-color: blue;opacity: 0.6;"/>-->
    <!--<div v-if="isShowZoomCenter" :style="{'left': (currentZoomSet.NMZoomCenter.x + currentZoomSet.NMViewPosition.x - 10) + 'px', top: currentZoomSet.NMViewPosition.y + 'px' }" style="position: fixed;top:0px;width:2px;height:2000px;z-index: 99999;background-color: red;opacity: 0.6;"/>-->
    <!--<div v-if="isShowZoomCenter" :style="{'top': (currentZoomSet.NMZoomCenter.y + currentZoomSet.NMViewPosition.y - 10) + 'px', left: currentZoomSet.NMViewPosition.x + 'px' }" style="position: fixed;left:0px;height:2px;width:2000px;z-index: 99999;background-color: red;opacity: 0.6;"/>-->
    <!--<div v-if="isShowZoomCenter" :style="{'left': (currentZoomSet.NMViewCenter.x + currentZoomSet.NMViewPosition.x) + 'px', top: currentZoomSet.NMViewPosition.y + 'px' }" style="position: fixed;top:0px;width:2px;height:2000px;z-index: 99999;background-color: black;opacity: 0.6;"/>-->
    <!--<div v-if="isShowZoomCenter" :style="{'top': (currentZoomSet.NMViewCenter.y + currentZoomSet.NMViewPosition.y) + 'px', left: currentZoomSet.NMViewPosition.x + 'px' }" style="position: fixed;left:0px;height:2px;width:2000px;z-index: 99999;background-color: black;opacity: 0.6;"/>-->

    <!--<div v-if="isShowZoomCenter" :style="{'left': (newZoomSet.NMCanvasStart.x + newZoomSet.NMViewPosition.x) + 'px', top: newZoomSet.NMViewPosition.y + 'px' }" style="position: fixed;top:0px;width:2px;height:2000px;z-index: 99999;border-left: blue dotted 2px;opacity: 0.6;"/>-->
    <!--<div v-if="isShowZoomCenter" :style="{'top': (newZoomSet.NMCanvasStart.y + newZoomSet.NMViewPosition.y) + 'px', left: newZoomSet.NMViewPosition.x + 'px' }" style="position: fixed;left:0px;height:2px;width:2000px;z-index: 99999;border-top: blue dotted 2px;opacity: 0.6;"/>-->
    <!--<div v-if="isShowZoomCenter" :style="{'left': (newZoomSet.NMCanvasCenter.x + newZoomSet.NMViewPosition.x) + 'px', top: newZoomSet.NMViewPosition.y + 'px' }" style="position: fixed;top:0px;width:4px;height:2000px;z-index: 99999;border-left: green dotted 2px;opacity: 0.4;"/>-->
    <!--<div v-if="isShowZoomCenter" :style="{'top': (newZoomSet.NMCanvasCenter.y + newZoomSet.NMViewPosition.y) + 'px', left: newZoomSet.NMViewPosition.x + 'px' }" style="position: fixed;left:0px;height:4px;width:2000px;z-index: 99999;border-top: green dotted 2px;opacity: 0.4;"/>-->
    <!--<div v-if="isShowZoomCenter" :style="{'left': (newZoomSet.NMCanvasEnd.x + newZoomSet.NMViewPosition.x) + 'px', top: newZoomSet.NMViewPosition.y + 'px' }" style="position: fixed;top:0px;width:2px;height:2000px;z-index: 99999;border-left: blue dotted 2px;opacity: 0.6;"/>-->
    <!--<div v-if="isShowZoomCenter" :style="{'top': (newZoomSet.NMCanvasEnd.y + newZoomSet.NMViewPosition.y) + 'px', left: newZoomSet.NMViewPosition.x + 'px' }" style="position: fixed;left:0px;height:2px;width:2000px;z-index: 99999;border-top: blue dotted 2px;opacity: 0.6;"/>-->
    <!--<div v-if="isShowZoomCenter" :style="{'left': (zoomCenter_of_newSize.x + newZoomSet.NMViewPosition.x - 10) + 'px', top: newZoomSet.NMViewPosition.y + 'px' }" style="position: fixed;top:0px;width:2px;height:2000px;z-index: 99999;border-left: red dotted 2px;opacity: 0.6;"/>-->
    <!--<div v-if="isShowZoomCenter" :style="{'top': (zoomCenter_of_newSize.y + newZoomSet.NMViewPosition.y - 10) + 'px', left: newZoomSet.NMViewPosition.x + 'px' }" style="position: fixed;left:0px;height:2px;width:2000px;z-index: 99999;border-top: red dotted 2px;opacity: 0.6;"/>-->
    <div v-if="isShowZoomCenter" :style="{'left': (graphSetting.canvasNVInfo.x + graphSetting.viewNVInfo.x) + 'px', top: graphSetting.viewNVInfo.y + 'px' }" style="position: fixed;top:0px;width:2px;height:2000px;z-index: 99999;border-left: blue dotted 2px;opacity: 0.6;" />
    <div v-if="isShowZoomCenter" :style="{'top': (graphSetting.canvasNVInfo.y + graphSetting.viewNVInfo.y) + 'px', left: graphSetting.viewNVInfo.x + 'px' }" style="position: fixed;left:0px;height:2px;width:2000px;z-index: 99999;border-top: blue dotted 2px;opacity: 0.6;" />
    <div v-if="isShowZoomCenter" :style="{'left': (graphSetting.canvasNVInfo.x + graphSetting.canvasNVInfo.width/2 + graphSetting.viewNVInfo.x) + 'px', top: graphSetting.viewNVInfo.y + 'px' }" style="position: fixed;top:0px;width:4px;height:2000px;z-index: 99999;border-left: green dotted 2px;opacity: 0.4;" />
    <div v-if="isShowZoomCenter" :style="{'top': (graphSetting.canvasNVInfo.y + graphSetting.canvasNVInfo.height/2 + graphSetting.viewNVInfo.y) + 'px', left: graphSetting.viewNVInfo.x + 'px' }" style="position: fixed;left:0px;height:4px;width:2000px;z-index: 99999;border-top: green dotted 2px;opacity: 0.4;" />
    <div v-if="isShowZoomCenter" :style="{'left': (graphSetting.canvasNVInfo.x + graphSetting.canvasNVInfo.width + graphSetting.viewNVInfo.x) + 'px', top: graphSetting.viewNVInfo.y + 'px' }" style="position: fixed;top:0px;width:2px;height:2000px;z-index: 99999;border-left: blue dotted 2px;opacity: 0.6;" />
    <div v-if="isShowZoomCenter" :style="{'top': (graphSetting.canvasNVInfo.y + graphSetting.canvasNVInfo.height + graphSetting.viewNVInfo.y) + 'px', left: graphSetting.viewNVInfo.x + 'px' }" style="position: fixed;left:0px;height:2px;width:2000px;z-index: 99999;border-top: blue dotted 2px;opacity: 0.6;" />
  </div>
</template>

<script>
import Vuex from 'vuex'
import screenfull from 'screenfull'
import html2canvas from 'html2canvas'
import SeeksRGLayouters from './core4vue/SeeksRGLayouters'
import SeeksRGUtils from './core4vue/SeeksRGUtils'
import SeeksRGStore from './core4vue/SeeksRGStore'
import SeeksRGNode from './core4vue/SeeksRGNode'
import SeeksRGLink from './core4vue/SeeksRGLink'
import GraphSettingPanel from './GraphSettingPanel'
import GraphMiniView from './GraphMiniView'
import GraphMiniToolBar from './GraphMiniToolBar'
import GraphMiniNameFilter from './GraphMiniNameFilter'
import GraphBottomPanel from './GraphBottomPanel'
// import { mapState } from 'vuex'
// var seeksStoreInstance = SeeksRGStore.createNewStore()
export default {
  name: 'SeeksRelationGraph',
  components: { GraphBottomPanel, GraphMiniNameFilter, GraphMiniToolBar, GraphMiniView, SeeksRGNode, SeeksRGLink, GraphSettingPanel },
  props: {
    options: {
      mustUseProp: false,
      default: () => { return {} },
      type: Object
    },
    onNodeClick: {
      mustUseProp: false,
      default: () => { return () => {} },
      type: Function
    },
    onLineClick: {
      mustUseProp: false,
      default: () => { return () => {} },
      type: Function
    },
    onDownloadExcel: {
      mustUseProp: false,
      default: null,
      type: Function
    },
    beforeDownloadImage: {
      mustUseProp: false,
      default: null,
      type: Function
    }
  },
  data() {
    return {
      el: {
        offsetWidth: 500,
        offsetHeight: 500,
        offsetTop: 0,
        offsetLeft: 0
      },
      isNeedFixedTools: false,
      isNeedFixedTools4Bottom: false,
      seeksNodeIdIndex: 1,
      search_text: '',
      instanceId: '',
      SeeksRGStore: null,
      graphSetting: {},
      graphData: {
        nodes: [],
        lines: [],
        rootNode: null,
        nodes_map: {},
        lines_map: {}
      },
      nodeViewList: [],
      lineViewList: [],
      allLineColors: [],
      viewOffset: {
        windowHeight: 500,
        positionTop: 100,
        left: 0,
        top: 0
      },
      isShowZoomCenter: false,
      debugPanelPosition: true,
      zoomCenter_of_newSize: { x: 0, y: 0 },
      currentZoomSet: null,
      newZoomSet: null
    }
  },
  // computed: mapState({
  //   graphSetting: () => SeeksRGStore.createNewStore().state.graphSetting
  // }),
  watch: {
    'graphSetting.fullscreen': function(newV, oldV) {
      if (oldV === true || oldV === false) {
        screenfull.toggle(this.$refs.seeksRelationGraph)
      }
    }
  },
  created() {
    this.SeeksRGStore = SeeksRGStore.createNewStore(this.options || {}, Vuex)
    this.graphSetting = this.SeeksRGStore.state.graphSetting
    this.graphSetting.instanceId = 'SRG' + parseInt(Math.random() * 100000)
  },
  mounted() {
    this.init()
    window.addEventListener('scroll', function() {
      this.syncToolsPosition()
    }.bind(this))
    // setInterval(function() {
    //   this.showZoomCenter()
    // }.bind(this), 1000)
  },
  beforeDestroy() {
    const elx = this.$refs.seeksRelationGraph
    elx.remove()
  },
  show() {
    this.resetViewSize()
    this.refreshNVAnalysisInfo()
    this.syncToolsPosition()
  },
  methods: {
    init() {
      this.$refs.rgCanvas.style.setProperty('--stroke', 'url(\'#' + this.graphSetting.instanceId + '-lineStyle\')')
      this.$refs.rgCanvas.style.setProperty('--markerEnd', 'url(\'#' + this.graphSetting.instanceId + '-arrow-default\')')
      this.$refs.rgCanvas.style.setProperty('--markerEndChecked', 'url(\'#' + this.graphSetting.instanceId + '-arrow-checked\')')
      this.graphSetting.viewSize.width = this.$refs.seeksRelationGraph.getBoundingClientRect().width
      this.graphSetting.viewSize.height = this.$refs.seeksRelationGraph.getBoundingClientRect().height
      console.log('#############Seeks graph viewSize:', this.graphSetting.viewSize.width, this.graphSetting.viewSize.height)
      this.resetViewSize()
      this.refreshNVAnalysisInfo()
      this.syncToolsPosition()
    },
    setOptions(options, callback) {
      this.SeeksRGStore = SeeksRGStore.createNewStore(options, Vuex)
      this.graphSetting = this.SeeksRGStore.state.graphSetting
      this.graphSetting.instanceId = 'SRG' + parseInt(Math.random() * 100000)
      this.init()
      callback(this)
    },
    moveDebugPanel() {
      this.debugPanelPosition = !this.debugPanelPosition
    },
    getCanvasSizeAndPosition() {
      return {
        'width': this.graphSetting.canvasSize.width + 'px',
        'height': this.graphSetting.canvasSize.height + 'px',
        'margin-left': (this.graphSetting.canvasOffset.x) + 'px',
        'margin-top': (this.graphSetting.canvasOffset.y) + 'px',
        'transform': 'scale(' + this.graphSetting.canvasZoom / 100 + ',' + this.graphSetting.canvasZoom / 100 + ')'
        // 'transform-origin': (this.graphSetting.canvasOffset.zoom_buff_x * 100).toFixed(2) + '% ' + (this.graphSetting.canvasOffset.zoom_buff_y * 100).toFixed(2) + '%'
      }
    },
    mouseListener(e) {
      // if (e.target !== this.$refs.seeksRGCanvas) {
      //   return
      // }
      var userZoomCenter = {
        x: e.clientX,
        y: e.clientY
      }
      // console.log('---- center:', userZoomCenter.x, userZoomCenter.y)
      var _isMac = /macintosh|mac os x/i.test(navigator.userAgent)
      var _zoomDirection = _isMac ? 1 : -1
      if (e.deltaY > 0) {
        this.zoom(5 * _zoomDirection, userZoomCenter)
      } else {
        this.zoom(-5 * _zoomDirection, userZoomCenter)
      }
    },
    getPositionOfCanvas(e) {
      var userZoomCenter = {
        x: e.offsetX,
        y: e.offsetY
      }
      console.log('[F]', userZoomCenter.x, userZoomCenter.y)
      var currentNode = e.target.parentNode
      for (var i = 0; i < 8; i++) {
        if (i > 6) {
          console.log('getPositionOfCanvas error', e)
        }
        if (currentNode.classList.contains('rel-map-canvas')) {
          console.log('[S]', currentNode.tagName + '.' + currentNode.className)
          break
        } else {
          userZoomCenter.x += currentNode.offsetLeft || 0
          userZoomCenter.y += currentNode.offsetTop || 0
          console.log('[' + i + ']', currentNode.tagName + '.' + currentNode.className, ':', currentNode.offsetLeft, currentNode.offsetTop)
          currentNode = currentNode.parentNode
        }
      }
      console.log('[F]', userZoomCenter.x, userZoomCenter.y)
      return userZoomCenter
    },
    zoom(buff, userZoomCenter) {
      if ((this.graphSetting.canvasZoom + buff) < 10) {
        return
      }
      var __new_zoom_value = this.graphSetting.canvasZoom + buff
      var zoomCenter = this.showZoomCenter(userZoomCenter, buff)
      // console.log('zoomCenter:', zoomCenter.x, zoomCenter.y)
      // if (userZoomCenter) return
      // this.graphSetting.canvasOffset.zoom_buff_x = zoomCenter.buff_x
      // this.graphSetting.canvasOffset.zoom_buff_y = zoomCenter.buff_y
      // var _buff_x = this.canvasCenter.x - zoomCenter.x
      // var _buff_y = this.canvasCenter.y - zoomCenter.y
      // console.log('offset buff:', _buff_x.toFixed(0), _buff_y.toFixed(0))
      // this.graphSetting.canvasOffset.zoom_buff_x = _buff_x * ((this.graphSetting.canvasZoom - 100) / 100)
      // this.graphSetting.canvasOffset.zoom_buff_y = _buff_y * ((this.graphSetting.canvasZoom - 100) / 100)
      this.graphSetting.canvasOffset.x += zoomCenter.buff_x
      this.graphSetting.canvasOffset.y += zoomCenter.buff_y
      this.graphSetting.canvasZoom = __new_zoom_value
      this.refreshNVAnalysisInfo()
    },
    showZoomCenter(userZoomCenter, zoomBuff) {
      if (!this.$refs.seeksRelationGraph) {
        return
      }
      var _current_zoom = this.graphSetting.canvasZoom / 100
      var _new_zoom = (this.graphSetting.canvasZoom + zoomBuff) / 100
      this.currentZoomSet = this.analysisByZoom(_current_zoom, userZoomCenter)
      this.newZoomSet = this.analysisByZoom(_new_zoom, userZoomCenter)
      // console.log('this.currentZoomSet:', this.currentZoomSet)
      // console.log('this.currentZoomSet:', this.newZoomSet)
      const a = _new_zoom / _current_zoom
      const b = 0
      const c = 0
      const d = _new_zoom / _current_zoom
      var e = 0
      var f = 0
      this.zoomCenter_of_newSize.x = a * this.currentZoomSet.NMViewBuff.x + c * this.currentZoomSet.NMViewBuff.y + e
      this.zoomCenter_of_newSize.y = b * this.currentZoomSet.NMViewBuff.x + d * this.currentZoomSet.NMViewBuff.y + f
      var buff_x = this.currentZoomSet.NMViewBuff.x - this.zoomCenter_of_newSize.x
      var buff_y = this.currentZoomSet.NMViewBuff.y - this.zoomCenter_of_newSize.y
      this.zoomCenter_of_newSize.x += this.currentZoomSet.NMCanvasCenter.x
      this.zoomCenter_of_newSize.y += this.currentZoomSet.NMCanvasCenter.y
      // e = this.currentZoomSet.NMViewBuff.x
      // f = this.currentZoomSet.NMViewBuff.y
      // new start
      var old_x = this.currentZoomSet.NMCanvasStart.x - this.currentZoomSet.NMCanvasCenter.x
      var old_y = this.currentZoomSet.NMCanvasStart.y - this.currentZoomSet.NMCanvasCenter.y
      var new_x = a * old_x + c * old_y + e
      var new_y = b * old_x + d * old_y + f
      this.newZoomSet.NMCanvasStart.x = buff_x + this.currentZoomSet.NMCanvasCenter.x + new_x
      this.newZoomSet.NMCanvasStart.y = buff_x + this.currentZoomSet.NMCanvasCenter.y + new_y
      // new end
      old_x = this.currentZoomSet.NMCanvasEnd.x - this.currentZoomSet.NMCanvasCenter.x
      old_y = this.currentZoomSet.NMCanvasEnd.y - this.currentZoomSet.NMCanvasCenter.y
      new_x = a * old_x + c * old_y + e
      new_y = b * old_x + d * old_y + f
      this.newZoomSet.NMCanvasEnd.x = buff_x + this.currentZoomSet.NMCanvasCenter.x + new_x
      this.newZoomSet.NMCanvasEnd.y = buff_x + this.currentZoomSet.NMCanvasCenter.y + new_y
      this.currentZoomSet.NMCanvasOffsetBuff.x = buff_x
      this.currentZoomSet.NMCanvasOffsetBuff.y = buff_y
      // this.isShowZoomCenter = true
      return {
        buff_x, buff_y
      }
    },
    refreshNVAnalysisInfo() {
      if (!this.$refs.seeksRelationGraph) {
        console.error('cannot get view size !')
        return
      }
      // console.log('reanalysis NV info...')
      var result = {
        NMCanvasCenter: { x: 0, y: 0 }
      }
      var _view_info = this.$refs.seeksRelationGraph.getBoundingClientRect()
      this.graphSetting.viewNVInfo.x = _view_info.left
      this.graphSetting.viewNVInfo.y = _view_info.top
      this.graphSetting.viewNVInfo.width = _view_info.width
      this.graphSetting.viewNVInfo.height = _view_info.height
      var _NM_canvas_width = this.graphSetting.canvasSize.width * (this.graphSetting.canvasZoom / 100)
      var _NM_canvas_height = this.graphSetting.canvasSize.height * (this.graphSetting.canvasZoom / 100)
      result.NMCanvasCenter.x = this.graphSetting.canvasOffset.x + (this.graphSetting.canvasSize.width / 2)
      result.NMCanvasCenter.y = this.graphSetting.canvasOffset.y + (this.graphSetting.canvasSize.height / 2)
      this.graphSetting.canvasNVInfo.x = result.NMCanvasCenter.x - _NM_canvas_width / 2
      this.graphSetting.canvasNVInfo.y = result.NMCanvasCenter.y - _NM_canvas_height / 2
      this.graphSetting.canvasNVInfo.width = _NM_canvas_width
      this.graphSetting.canvasNVInfo.height = _NM_canvas_height
      this.graphSetting.viewELSize.width = _view_info.width
      this.graphSetting.viewELSize.height = _view_info.height
      this.graphSetting.viewELSize.left = _view_info.left
      this.graphSetting.viewELSize.top = _view_info.top
    },
    analysisByZoom(zoom, userZoomCenter) {
      var result = {
        NMViewPosition: { x: 0, y: 0 },
        NMViewCenter: { x: 0, y: 0 },
        NMCanvasCenter: { x: 0, y: 0 },
        NMCanvasStart: { x: 0, y: 0 },
        NMCanvasEnd: { x: 0, y: 0 },
        NMZoomCenter: { x: 0, y: 0 },
        NMViewBuff: { x: 0, y: 0 },
        NMCanvasOffsetBuff: { x: 0, y: 0 },
        NMCanvasSize: { width: 0, height: 0 }
      }
      const windowWidth = this.getWindowWidth()
      const windowHeight = this.getWindowHeight()
      var _view_info = this.$refs.seeksRelationGraph.getBoundingClientRect()
      result.NMViewPosition.x = _view_info.left
      result.NMViewPosition.y = _view_info.top
      if (_view_info.width + result.NMViewPosition.x > windowWidth) {
        result.NMViewCenter.x = (windowWidth - _view_info.left) / 2
      } else {
        result.NMViewCenter.x = _view_info.width / 2
      }
      if (_view_info.height + result.NMViewPosition.y > windowHeight) {
        result.NMViewCenter.y = (windowHeight - _view_info.top) / 2
      } else {
        result.NMViewCenter.y = _view_info.height / 2
      }
      var _NM_canvas_width = this.graphSetting.canvasSize.width * zoom
      var _NM_canvas_height = this.graphSetting.canvasSize.height * zoom
      result.NMCanvasCenter.x = this.graphSetting.canvasOffset.x + (this.graphSetting.canvasSize.width / 2) // + (this.graphSetting.canvasOffset.zoom_buff_x * _NM_canvas_width)
      result.NMCanvasCenter.y = this.graphSetting.canvasOffset.y + (this.graphSetting.canvasSize.height / 2) // + (this.graphSetting.canvasOffset.zoom_buff_y * _NM_canvas_height)
      result.NMCanvasStart.x = result.NMCanvasCenter.x - _NM_canvas_width / 2
      result.NMCanvasStart.y = result.NMCanvasCenter.y - _NM_canvas_height / 2
      result.NMCanvasEnd.x = result.NMCanvasCenter.x + _NM_canvas_width / 2
      result.NMCanvasEnd.y = result.NMCanvasCenter.y + _NM_canvas_height / 2
      result.NMZoomCenter.x = result.NMViewCenter.x
      result.NMZoomCenter.y = result.NMViewCenter.y
      if (userZoomCenter) {
        result.NMZoomCenter.x = userZoomCenter.x - result.NMViewPosition.x
        result.NMZoomCenter.y = userZoomCenter.y - result.NMViewPosition.y
      }
      var _NM_buff_x = result.NMViewCenter.x - result.NMCanvasCenter.x
      var _NM_buff_y = result.NMViewCenter.y - result.NMCanvasCenter.y
      if (userZoomCenter) {
        _NM_buff_x = result.NMZoomCenter.x - result.NMCanvasCenter.x
        _NM_buff_y = result.NMZoomCenter.y - result.NMCanvasCenter.y
      }
      result.NMViewBuff.x = _NM_buff_x
      result.NMViewBuff.y = _NM_buff_y
      result.NMCanvasSize.width = _NM_canvas_width
      result.NMCanvasSize.height = _NM_canvas_height
      return result
    },
    syncToolsPosition() {
      console.log('on scroll...')
      if (!this.$refs.seeksRelationGraph) return
      const windowHeight = this.getWindowHeight()
      var _box_info = this.$refs.seeksRelationGraph.getBoundingClientRect()
      console.log('syncToolsPosition...')
      // console.log('change layout:', __top, this.$refs.seeksRelationGraph.offsetHeight)
      // console.log(_box_info.top, this.viewOffset.positionTop, (this.viewOffset.windowHeight - this.viewOffset.top))
      var __top = _box_info.top
      if (this.isNeedFixedTools === false) {
        if ((__top + this.$refs.seeksRelationGraph.offsetHeight) < 0) {
          this.isNeedFixedTools = false
        } else {
          if (__top < 0) {
            this.isNeedFixedTools = true
          }
        }
      } else {
        if (__top > 0) {
          this.isNeedFixedTools = false
        }
        if ((__top + this.$refs.seeksRelationGraph.offsetHeight) < 0) {
          this.isNeedFixedTools = false
        }
      }
      if ((__top + this.$refs.seeksRelationGraph.offsetHeight) > windowHeight) {
        this.isNeedFixedTools4Bottom = true
      } else {
        this.isNeedFixedTools4Bottom = false
      }
    },
    getWindowWidth() {
      return window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
    },
    getWindowHeight() {
      return window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height
    },
    getNodePositionTop(node) {
      if (!node.offsetTop) return 0
      return node.offsetTop + (node.parentNode ? this.getNodePositionTop(node.parentNode) : 0)
    },
    getNodePositionLeft(node) {
      if (!node.offsetLeft) return 0
      return node.offsetLeft + (node.parentNode ? this.getNodePositionLeft(node.parentNode) : 0)
    },
    resetViewSize() {
      this.graphSetting.canvasZoom = 100
      this.SeeksRGStore.commit('resetViewSize')
      this.refreshNVAnalysisInfo()
    },
    loadNodes(_nodes) {
      _nodes.forEach(thisNode => {
        let __isNew = false
        if (this.graphData.nodes_map[thisNode.id]) {
          thisNode = this.graphData.nodes_map[thisNode.id]
        } else {
          __isNew = true
        }
        thisNode = SeeksRGUtils.json2Node(thisNode)
        if (__isNew) {
          this.graphData.nodes_map[thisNode.id] = thisNode
          this.graphData.nodes.push(thisNode)
          thisNode.seeks_id = this.seeksNodeIdIndex++
          thisNode.appended = false
        }
      })
    },
    loadLinks(_links) {
      _links.forEach(thisLinkJson => {
        let __isNew = false
        var __from
        var __to
        if (typeof thisLinkJson.from === 'object') {
          __from = thisLinkJson.from
        } else {
          __from = this.graphData.nodes_map[thisLinkJson.from]
        }
        if (typeof thisLinkJson.to === 'object') {
          __to = thisLinkJson.to
        } else {
          __to = this.graphData.nodes_map[thisLinkJson.to]
        }
        if (!__from) {
          console.error('找不到from:', thisLinkJson)
          return
        }
        if (!__to) {
          console.error('找不到to:', thisLinkJson)
          return
        }
        // console.log('[add link]', __from.text, __to.text, __from.seeks_id, __to.seeks_id, thisLink)
        const lineId1 = __from.seeks_id + '-' + __to.seeks_id
        const lineId2 = __to.seeks_id + '-' + __from.seeks_id
        var thisLink = SeeksRGUtils.json2Link(thisLinkJson)
        var thisLine
        var thisLinkIsReserve = false
        if (this.graphData.lines_map[lineId1]) {
          thisLine = this.graphData.lines_map[lineId1]
        } else {
          if (this.graphData.lines_map[lineId2]) {
            thisLine = this.graphData.lines_map[lineId2]
            thisLinkIsReserve = true
          } else {
            __isNew = true
            thisLine = {
              seeks_id: lineId1,
              fromNode: __from,
              toNode: __to,
              appended: false,
              relations: []
            }
          }
        }
        // console.log('new Line Color:', thisLine.color, thisLine.arrow)
        var _arrow = thisLink.arrow
        if (thisLink.isHideArrow) {
          // do nothing
        } else {
          _arrow = this.getLineArrow(thisLink.color)
        }
        if (!__from.targetNodes)__from.targetNodes = []
        if (!__to.targetNodes)__to.targetNodes = []
        if (__from.targetNodes.indexOf(__to) === -1) {
          __from.targetNodes.push(__to)
        }
        if (__to.targetNodes.indexOf(__from) === -1) {
          __to.targetNodes.push(__from)
        }
        if (__from.targetTo.indexOf(__to) === -1) {
          __from.targetTo.push(__to)
        }
        if (__to.targetFrom.indexOf(__from) === -1) {
          __to.targetFrom.push(__from)
        }
        var isDuplicate = false
        for (var i = 0; i < thisLine.relations.length; i++) {
          if (thisLine.relations[i].id === thisLink.id) {
            isDuplicate = true
            break
          }
        }
        if (isDuplicate === false) {
          if (!thisLink.id) thisLink.id = thisLine.seeks_id + '-' + thisLine.relations.length
          thisLink.isReverse = thisLinkIsReserve
          thisLink.arrow = _arrow
          thisLink.textPositon = { x: 0, y: 0 }
          thisLine.relations.push(thisLink)
        }
        // console.log('addLine:', thisLine)
        if (__isNew) {
          this.graphData.lines.push(thisLine)
          this.graphData.lines_map[lineId1] = thisLine
          thisLine.appended = false
        }
      })
    },
    getLineArrow(_color) {
      if (_color) {
        var thisColorId = SeeksRGUtils.getColorId(_color)
        if (this.allLineColors.map(thisColorObj => {
          return thisColorObj.id
        }).indexOf(thisColorId) === -1) {
          this.allLineColors.push({ id: thisColorId, color: _color })
        }
        return this.graphSetting.instanceId + '-arrow-' + thisColorId
      } else {
        return this.graphSetting.instanceId + '-arrow-default'
      }
    },
    loadGraphJsonData(jsonData) {
      this.loadNodes(jsonData.nodes)
      console.log('节点预处理完毕')
      if (!jsonData.links) jsonData.links = jsonData.lines
      if (!jsonData.links) jsonData.links = jsonData.relations
      this.loadLinks(jsonData.links)
    },
    setJsonData(jsonData, callback) {
      this.nodeViewList = []
      this.lineViewList = []
      this.graphData.nodes = []
      this.graphData.lines = []
      this.graphData.nodes_map = {}
      this.graphData.lines_map = {}
      this.graphData.rootNode = null
      console.log('set jsonData::', jsonData)
      this.resetViewSize()
      if (this.graphSetting.layouts && this.graphSetting.layouts.length > 0) {
        var _defaultLayoutSetting = this.graphSetting.layouts[0]
        console.log('创建默认布局器：', this.graphSetting.layoutName)
        if (_defaultLayoutSetting.layouter) {
          this.graphSetting.layouter = _defaultLayoutSetting.layouter
        } else {
          this.graphSetting.layouter = SeeksRGLayouters.createLayout(_defaultLayoutSetting, this.graphSetting)
        }
      } else {
        console.log('你需要设置layouts来指定当前图谱可以使用的布局器！')
      }
      var __root_id = jsonData['rootId']
      this.loadGraphJsonData(jsonData)
      console.log('graphData:', this.graphData)
      if (__root_id) {
        this.graphData.rootNode = this.graphData.nodes_map[__root_id]
      }
      if (!this.graphData.rootNode && this.graphData.nodes.length > 0) {
        this.graphData.rootNode = this.graphData.nodes[0]
      }
      this.applyNewDataToCanvas()
      this.resetViewSize()
      this.doLayout()
      if (callback)callback(this)
    },
    applyNewDataToCanvas() {
      this.graphData.nodes.forEach(thisNode => {
        if (thisNode.appended === false) {
          thisNode.appended = true
          this.nodeViewList.push(thisNode)
        }
      })
      this.graphData.lines.forEach(thisLine => {
        if (thisLine.appended === false) {
          thisLine.appended = true
          this.lineViewList.push(thisLine)
        }
      })
      if (this.graphData.rootNode) {
        this.graphSetting.checkedNodeId = this.graphData.rootNode.id
      } else {
        throw Error('没有设置根节点[rootId]！也无法获取根节点!')
      }
    },
    appendJsonData(jsonData, isRelayout, callback) {
      if (arguments.length === 2 && typeof isRelayout === 'function') {
        callback = isRelayout
        isRelayout = true
      }
      console.log('appendData:', jsonData)
      this.loadGraphJsonData(jsonData)
      this.applyNewDataToCanvas()
      // this.resetViewSize()
      if (isRelayout) this.doLayout()
      if (callback) callback(this)
    },
    doLayout() {
      if (this.graphSetting.layouter && this.graphData.rootNode) {
        console.log('需要布局的节点数量：', this.graphData.nodes.length)
        this.graphSetting.layouter.placeNodes(this.graphData.nodes, this.graphData.rootNode, this.graphSetting)
      }
      document.body.addEventListener('mousemove', this.wow)
      // document.body.removeEventListener('mousemove', this.graphOnClick)
    },
    refresh() {
      this.resetViewSize()
      this.$nextTick(() => {
        this.graphSetting.layouter.refresh()
        this.refreshNVAnalysisInfo()
        document.body.addEventListener('mousemove', this.wow)
      })
    },
    onDragStart(e) {
      SeeksRGUtils.startDrag(e, this.graphSetting.canvasOffset, this.onDragEnd)
    },
    onDragEnd() {
      this.refreshNVAnalysisInfo()
    },
    addEventClick() {
      window.addEventListener('click', this.graphOnClick)
    },
    graphOnClick(evt) {
      console.log('click graph')
    },
    wow(evt) {
      console.log('wow.....')
      this.graphSetting.canvasOffset.x = this.graphSetting.canvasOffset.x + 1
      this.graphSetting.canvasOffset.y = this.graphSetting.canvasOffset.y + 1
      this.graphSetting.canvasOffset.x = this.graphSetting.canvasOffset.x - 1
      this.graphSetting.canvasOffset.y = this.graphSetting.canvasOffset.y - 1
      document.body.removeEventListener('mousemove', this.wow)
    },
    onRGNodeClick(nodeData, e) {
      if (this.onNodeClick) {
        this.onNodeClick(nodeData, e)
      }
      // for (let i = 0; i < this.lineViewList.length; i++) {
      //   var thisLine = this.lineViewList[i]
      //   if (thisLine.fromNode.id === nodeData.id || thisLine.toNode.id === nodeData.id) {
      //     thisLine.flash = thisLine.flash + 1
      //   }
      // }
    },
    onRGLineClick(lineData, e) {
      if (this.onLineClick) {
        this.onLineClick(lineData, e)
      }
      // for (let i = 0; i < this.lineViewList.length; i++) {
      //   var thisLine = this.lineViewList[i]
      //   if (thisLine.fromNode.id === nodeData.id || thisLine.toNode.id === nodeData.id) {
      //     thisLine.flash = thisLine.flash + 1
      //   }
      // }
    },
    getNodeById(nodeId) {
      for (let i = 0; i < this.nodeViewList.length; i++) {
        if (this.nodeViewList[i].id === nodeId) {
          return this.nodeViewList[i]
        }
      }
    },
    removeNodeById(nodeId) {
      let __removed_lines = 0
      for (let i = 0; i < this.lineViewList.length; i++) {
        var thisLine = this.lineViewList[i]
        if (thisLine.fromNode.id === nodeId || thisLine.toNode.id === nodeId) {
          // console.log(this.lineViewList[i])
          thisLine.hidden = true
          this.lineViewList.splice(i, 1)
          i--
          __removed_lines++
          // console.log(this.lineViewList[i])
        }
      }
      console.log('删除对应的线个数：', nodeId, __removed_lines)
      let __removed_nodes = 0
      for (let i = 0; i < this.nodeViewList.length; i++) {
        if (this.nodeViewList[i].id === nodeId) {
          const thisNode = this.nodeViewList[i]
          thisNode.targetNodes.forEach(thisTNode => {
            const t_i = thisTNode.targetNodes.indexOf(thisNode)
            if (t_i !== -1) {
              thisTNode.targetNodes.splice(t_i, 1)
            }
          })
          // thisNode.isShow = false
          this.nodeViewList.splice(i, 1)
          __removed_nodes++
          break
        }
      }
      console.log('删除对应的节点个数：', nodeId, __removed_nodes)
    },
    dataURLToBlob(dataurl) { // ie 图片转格式
      var arr = dataurl.split(',')
      var mime = arr[0].match(/:(.*?);/)[1]
      var bstr = atob(arr[1])
      var n = bstr.length
      var u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], { type: mime })
    },
    downloadAsImage(format) {
      if (this.beforeDownloadImage) {
        this.beforeDownloadImage()
      }
      // console.log('window.navigator.msSaveOrOpenBlob:', window.navigator.msSaveOrOpenBlob)
      // console.log('window.navigator.msSaveBlob：', window.navigator.msSaveBlob)
      // if (!!window.ActiveXObject || 'ActiveXObject' in window) {
      //   this.$message('无法生成并下载图片，请使用非IE浏览器!')
      //   return
      // }
      if (!format)format = 'png'
      this.graphSetting.checkedNodeId = ''
      this.graphSetting.canvasZoom = 100
      const exportDom = this.$refs.seeksRGCanvas
      var width = exportDom.clientWidth // 获取dom 宽度
      var height = exportDom.clientHeight // 获取dom 高度
      var _min_x = 0
      var _min_y = 0
      var _max_x = 0
      var _max_y = 0
      this.nodeViewList.forEach(thisNode => {
        if (thisNode.x < _min_x) {
          _min_x = thisNode.x
        }
        if (thisNode.x > _max_x) {
          _max_x = thisNode.x + thisNode.el.offsetWidth
        }
        if (thisNode.y < _min_y) {
          _min_y = thisNode.y
        }
        if (thisNode.y > _max_y) {
          _max_y = thisNode.y + thisNode.el.offsetHeight
        }
      })
      var _offset_x = _min_x < 0 ? _min_x * -1 : 0
      var _offset_y = _min_y < 0 ? _min_y * -1 : 0
      this.nodeViewList.forEach(thisNode => {
        thisNode.x += _offset_x
        thisNode.y += _offset_y
      })
      console.log('offset:', _offset_x, _offset_y)
      this.graphSetting.canvasOffset.x -= _offset_x
      this.graphSetting.canvasOffset.y -= _offset_y
      _min_x = 0
      _min_y = 0
      _max_x = 0
      _max_y = 0
      this.nodeViewList.forEach(thisNode => {
        if (thisNode.x < _min_x) {
          _min_x = thisNode.x
        }
        if (thisNode.x > _max_x) {
          _max_x = thisNode.x + thisNode.el.offsetWidth
        }
        if (thisNode.y < _min_y) {
          _min_y = thisNode.y
        }
        if (thisNode.y > _max_y) {
          _max_y = thisNode.y + thisNode.el.offsetHeight
        }
      })
      _min_x = _min_x - 200
      _min_y = _min_y - 200
      _max_x = _max_x + 200
      _max_y = _max_y + 200
      // if (_min_x < 0)_min_x = 0
      // if (_min_y < 0)_min_y = 0

      // if (_max_x < 300)_max_x = 300
      // if (_max_y < 300)_max_y = 300
      // if (_max_x > width)_min_x = width
      // if (_max_y > height)_min_y = height
      // var _image_width = _max_x - _min_x
      // var _image_height = _max_y - _min_y
      var _image_width = _max_x - _min_x
      var _image_height = _max_y - _min_y
      this.graphSetting.canvasSize.width = _image_width
      this.graphSetting.canvasSize.height = _image_height
      console.log('export image:', { width, height, _image_width, _image_height, _min_x, _min_y, _max_x, _max_y })
      // this.graphSetting.canvasOffset.x = _min_x
      // this.graphSetting.canvasOffset.y = _min_y
      this.$nextTick(() => {
        var fileName = 'SeeksRelationGraph-' + (Math.random() * 100000).toFixed(0)
        var canvas = document.createElement('canvas') // 创建一个canvas节点
        var scale = 1 // 定义任意放大倍数 支持小数
        canvas.width = _image_width * scale // 定义canvas 宽度 * 缩放
        canvas.height = _image_height * scale // 定义canvas高度 *缩放
        canvas.style.width = _image_width * scale + 'px'
        canvas.style.height = _image_height * scale + 'px'
        canvas.getContext('2d').scale(scale, scale) // 获取context,设置scale
        const opts = {
          // x: _min_x,
          // y: _min_y,
          scale: scale, // 添加的scale 参数
          canvas: canvas, // 自定义 canvas
          logging: true, // 日志开关，便于查看html2canvas的内部执行流程
          width: _image_width, // dom 原始宽度
          height: _image_height,
          x: this.graphSetting.canvasOffset.x - 200,
          y: this.graphSetting.canvasOffset.y - 100,
          useCORS: true // 【重要】开启跨域配置
        }
        console.log('html2canvas:', opts)
        html2canvas(exportDom, opts).then(canvas => {
          const dom = document.body.appendChild(canvas)
          dom.style.display = 'none'
          const a = document.createElement('a')
          a.style.display = 'none'
          document.body.removeChild(dom)
          const blob = this.dataURLToBlob(dom.toDataURL('image/' + format))
          try {
            if (window.navigator.msSaveOrOpenBlob) {
              window.navigator.msSaveOrOpenBlob(blob, fileName + '.' + format)
            } else {
              a.setAttribute('href', URL.createObjectURL(blob))
              a.setAttribute('download', fileName + '.' + format)
              document.body.appendChild(a)
              console.log('click to download:', opts)
              a.click()
              console.log('click ok!')
              URL.revokeObjectURL(blob)
              console.log('revokeObjectURL ok!')
              document.body.removeChild(a)
              console.log('removeChild ok!')
            }
            this.refresh()
          } catch (e) {
            console.log('[SEEKS Graph]Create and download image error:', e)
          }
        })
      })
    },
    querySearchAsync(queryString, callback) {
      console.log('fetch-suggestions', queryString)
      queryString = queryString.trim()
      if (queryString === '') {
        return
      }
      var rst = []
      this.nodeViewList.forEach(thisNode => {
        console.log('fetch:', thisNode.text)
        if (thisNode.text.indexOf(queryString) !== -1) {
          rst.push(thisNode)
        }
      })
      console.log('fetched:', rst.length)
      callback(rst)
    },
    focusRootNode() {
      this.handleSelect(this.graphData.rootNode)
    },
    focusNodeById(nodeId) {
      this.graphData.nodes.forEach(thisNode => {
        if (thisNode.id === nodeId) {
          this.handleSelect(thisNode)
        }
      })
    },
    handleSelect(thisNode) {
      console.log('checked:', thisNode)
      scrollTo({
        top: this.$refs.seeksRelationGraph.offsetTop
      })
      this.animateToZoom(100, 300, () => {
        var _n_width = thisNode.width || 50
        var _n_height = thisNode.height || 50
        var _final_x = thisNode.x * -1 + this.graphSetting.viewSize.width / 2 - _n_width / 2
        var _final_y = thisNode.y * -1 + this.graphSetting.viewSize.height / 2 - _n_height / 2
        this.animateGoto(_final_x, _final_y, 500, () => {
          this.graphSetting.checkedNodeId = thisNode.id
          this.refreshNVAnalysisInfo()
        })
      })
    },
    animateGoto(x, y, time, callback) {
      var _distance_x = x - this.graphSetting.canvasOffset.x
      var _distance_y = y - this.graphSetting.canvasOffset.y
      var _allTime = time
      var _allStepNum = 5
      var _speed_x = parseInt(_distance_x / _allStepNum)
      var _speed_y = parseInt(_distance_y / _allStepNum)
      var _perDelay = _allTime / _allStepNum
      this.animateStepAction(0, _perDelay, _allStepNum, (stepIndex, allStepNum) => {
        this.graphSetting.canvasOffset.x += _speed_x
        this.graphSetting.canvasOffset.y += _speed_y
      }, () => {
        console.log('分解完毕....')
        callback()
      })
    },
    animateToZoom(finalZoom, time, callback) {
      var _zoom_distance = finalZoom - this.graphSetting.canvasZoom
      var _allTime = time
      var _allStepNum = 5
      var _speed = parseInt(_zoom_distance / _allStepNum)
      var _perDelay = _allTime / _allStepNum
      this.animateStepAction(0, _perDelay, _allStepNum, (stepIndex, allStepNum) => {
        this.zoom(_speed)
      }, () => {
        console.log('分解完毕....')
        callback()
      })
    },
    animateStepAction(stepIndex, delay, allStepNum, stepCallback, finalCallback) {
      console.log(Date.now() + '步骤[' + stepIndex + ']')
      if (stepIndex < allStepNum) {
        stepCallback(stepIndex, allStepNum)
        setTimeout(() => {
          this.animateStepAction(stepIndex + 1, delay, allStepNum, stepCallback, finalCallback)
        }, delay)
      } else {
        finalCallback()
      }
    },
    transNodeToJson(node, nodes) {
      if (!node) return
      nodes.push({
        color: node.color,
        data: node.data,
        id: node.id,
        nodeShape: node.nodeShape,
        styleClass: node.styleClass,
        text: node.text,
        type: node.type,
        x: node.x,
        y: node.y
      })
    },
    transLineToJson(line, links) {
      if (!line) return
      // var _id_from = line.fromNode.id
      // var _id_to = line.toNode.id
      line.relations.forEach(thisRelation => {
        links.push(thisRelation)
        // links.push({
        //   from: thisRelation.isReverse ? _id_to : _id_from,
        //   to: thisRelation.isReverse ? _id_from : _id_to,
        //   color: thisRelation.color,
        //   data: thisRelation.data,
        //   fontColor: thisRelation.fontColor,
        //   lineDirection: thisRelation.lineDirection,
        //   lineShape: thisRelation.lineShape,
        //   reverseText: thisRelation.reverseText,
        //   styleClass: thisRelation.text,
        //   text: thisRelation.text
        // })
      })
    },
    getNodes() {
      return this.nodeViewList
    },
    getLines() {
      return this.lineViewList
    },
    printGraphJsonData() {
      var _nodes = []
      var _links = []
      this.graphData.nodes.forEach(thisNode => {
        this.transNodeToJson(thisNode, _nodes)
      })
      this.graphData.lines.forEach(thisLine => {
        this.transLineToJson(thisLine, _links)
      })
      console.log(JSON.stringify({
        rootId: this.graphData.rootNode ? this.graphData.rootNode.id : '',
        nodes: _nodes,
        links: _links
      }))
    }
  }
}
</script>
<style scoped>
  .rel-map{
    background-color: #ffffff;
    /*background-image: url("/static/images/graph-bg.png");*/
    overflow:hidden;
    cursor: default;
    user-select: none;
  }
  .rel-map-background-norepeat{
    background-repeat: no-repeat;
    background-position:right bottom;
  }
  .rel-nodediv-for-webkit{
    position: absolute;
    width:100%;
    top:0px;
    left:0px;
    z-index: 1000
  }
  .rel-map-canvas{
    position:relative;
    top:0px;
    left:0px;
    /*overflow:hidden;*/
    border: 0px;
    z-index: 3;
    /*background-color: #efefef;*/
    /*border-top: #efefef dashed 1px;*/
    /*border-left: #efefef dashed 1px;*/
    /*width:30px;*/
    /*height:30px;*/
  }
  svg {
    height: 100%;
    width: 100%;
  }
  .rel-linediv{
    --stroke:url('#lineStyle');
    --markerEnd:url('#arrow-default');
    --markerEndChecked:url('#arrow-checked');
  }
  .rel-linediv svg{
    overflow: visible
  }
  .rel-linediv /deep/ .c-rg-line-checked {
    /*stroke: var(--stroke);*/
    /*marker-end: var(--markerEndChecked) !important;*/
    stroke-width: 2px;
    stroke-dasharray: 5,5,5;
    stroke-dashoffset: 3px;
    stroke-linecap: butt;
    /*stroke: #FD8B37;*/
    stroke-linejoin: bevel;
    /* firefox bug fix - won't rotate at 90deg angles */
    -moz-transform: rotate(-89deg) translateX(-190px);
    animation-timing-function:linear;
    animation: ACTRGLineChecked 10s;
  }
  .rel-map /deep/ img{
    -webkit-user-drag: none;
    -webkit-user-select: none;
  }
</style>
