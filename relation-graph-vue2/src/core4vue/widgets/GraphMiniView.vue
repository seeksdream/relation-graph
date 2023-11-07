<template>
  <div ref="miniView" class="c-mini-graph">
    <div
        :style="{
          width:viewWidth+'px',
          height:miniViewHeight()+'px'
        }"
        class="c-mini-canvas">
      <template v-for="thisNode in graphData.nodes">
        <div
            v-if="isAllowShowNode(thisNode)"
             :key="thisNode.id"
             :style="{
               'left':((thisNode.x - minX) * viewWidth / (maxX - minX))+'px',
               'top':((thisNode.y - minY) * viewHeight / (maxY - minY))+'px'
             }"
             class="c-mini-node" />
      </template>
<!--      <div :style="getPositionData()" class="c-mini-view">-->
<!--        v-->
<!--      </div>-->
    </div>
  </div>
</template>

<script lang="ts">
import {RGNodesAnalytic} from "../../utils/RGNodesAnalytic";
export default {
  name: 'GraphMiniView',
  data() {
    return {
      viewWidth: 100,
      viewHeight: 0,
      minX: 0,
      maxX: 0,
      minY: 0,
      maxY: 0,
      zoom: 1
    };
  },
  inject: ['graph', 'graphData'],
  computed: {
    relationGraph() {
      return this.graph.instance;
    },
    options() {
      return this.graph.options;
    }
  },
  mounted() {
  },
  methods: {
    miniViewHeight() {
      let minX = 9999;
      let maxX = -9999;
      let minY = 9999;
      let maxY = -9999;
      for (let i = 0; i < this.graphData.nodes.length; i++) {
        const thisNode = this.graphData.nodes[i];
        if (thisNode.x < minX) {
          minX = thisNode.x;
        }
        if (thisNode.x > maxX) {
          maxX = thisNode.x;
        }
        if (thisNode.y < minY) {
          minY = thisNode.y;
        }
        if (thisNode.y > maxY) {
          maxY = thisNode.y;
        }
      }
      this.viewHeight = (maxY - minY) * this.viewWidth / (maxX - minX);
      this.minX = minX;
      this.minY = minY;
      this.maxX = maxX;
      this.maxY = maxY;
      return this.viewHeight;
    },
    getPositionData() {
      const _r = this.viewWidth / this.options.canvasNVInfo.width;
      const _width = this.options.viewNVInfo.width * _r;
      const _height = this.options.viewNVInfo.height * _r;
      let _view_x = (this.options.viewNVInfo.x - this.options.canvasNVInfo.x) * _r * (this.options.canvasZoom / 100);
      let _view_y = (this.options.viewNVInfo.y - this.options.canvasNVInfo.y) * _r * (this.options.canvasZoom / 100);
      _view_x = _view_x * 100 / _width;
      _view_y = _view_y * 100 / _width;
      const style = {
        width: _width + 'px',
        height: _height + 'px',
        'left': _view_x + 'px',
        'top': _view_y + 'px'
      };
      return style;
    },
    isAllowShowNode(nodeData) {
      return RGNodesAnalytic.isAllowShowNode(nodeData);
    }
  }
};
</script>

<style scoped>
  .c-mini-graph{
    height:100px;
    width:100px;
    position: absolute;
    margin-left: 60px;
    margin-top:100px;
    z-index: 999;
  }
  .c-fixedLayout{
    position: fixed;
    top:100px;
  }
  .c-mini-canvas{
    background-color: #AACBFF;
    border: #7BA8FF solid 1px;
    opacity: 0.8;
    position: relative;
  }
  .c-mini-view{
    background-color: #F5A565;
    border: #C03639 solid 1px;
    opacity: 0.5;
    color: #ffffff;
    font-size: 14px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
  }
  .c-mini-node{
    position: absolute;
    width:2px;
    height:2px;
    background-color: #000000;
    border-radius: 1px;
  }
</style>
