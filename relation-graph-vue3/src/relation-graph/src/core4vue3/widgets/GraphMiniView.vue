<script lang="ts" setup>
import { inject, ref } from 'vue'
import RGGraphMath from '../../utils/RGGraphMath'
import { relationGraphKey } from '../../../../constants'
import type { RGNode } from '../../RelationGraph';
const relationGraph = inject(relationGraphKey)!.value
const viewWidth = ref(100)
const viewHeight = ref(0)
const viewValues = {
  minX: 9999,
  maxX: -9999,
  minY: 9999,
  maxY: -9999
}
const miniViewHeight = () => {
  let minX = 9999
  let maxX = -9999
  let minY = 9999
  let maxY = -9999
  for (let i = 0; i < relationGraph.graphData.nodes.length; i++) {
    const thisNode = relationGraph.graphData.nodes[i]
    if (thisNode.x < minX) {
      minX = thisNode.x
    }
    if (thisNode.x > maxX) {
      maxX = thisNode.x
    }
    if (thisNode.y < minY) {
      minY = thisNode.y
    }
    if (thisNode.y > maxY) {
      maxY = thisNode.y
    }
  }
  viewHeight.value = ((maxY - minY) * viewWidth.value) / (maxX - minX)
  viewValues.minX = minX
  viewValues.minY = minY
  viewValues.maxX = maxX
  viewValues.maxY = maxY
  return viewHeight.value
}
const getPositionData = () => {
  const _r = viewWidth.value / relationGraph.options.canvasNVInfo.width
  const _width = relationGraph.options.viewNVInfo.width * _r
  const _height = relationGraph.options.viewNVInfo.height * _r
  let _view_x =
    (relationGraph.options.viewNVInfo.x -
      relationGraph.options.canvasNVInfo.x) *
    _r *
    (relationGraph.options.canvasZoom / 100)
  let _view_y =
    (relationGraph.options.viewNVInfo.y -
      relationGraph.options.canvasNVInfo.y) *
    _r *
    (relationGraph.options.canvasZoom / 100)
  _view_x = (_view_x * 100) / _width
  _view_y = (_view_y * 100) / _width
  const style = {
    width: `${_width}px`,
    height: `${_height}px`,
    left: `${_view_x}px`,
    top: `${_view_y}px`,
  }
  return style
}
const isAllowShowNode = (nodeData: RGNode) => {
  return RGGraphMath.isAllowShowNode(nodeData)
}
</script>
<template>
  <div ref="miniView" class="c-mini-graph">
    <div
      :style="{
        width: viewWidth + 'px',
        height: miniViewHeight() + 'px',
      }"
      class="c-mini-canvas"
    >
      <template v-for="thisNode in relationGraph.graphData.nodes">
        <div
          v-if="isAllowShowNode(thisNode)"
          :key="thisNode.id"
          :style="{
            left: ((thisNode.x - viewValues.minX) * viewWidth) / (viewValues.maxX - viewValues.minX) + 'px',
            top: ((thisNode.y - viewValues.minY) * viewHeight) / (viewValues.maxY - viewValues.minY) + 'px',
          }"
          class="c-mini-node"
        />
      </template>
      <!--      <div :style="getPositionData()" class="c-mini-view">-->
      <!--        v-->
      <!--      </div>-->
    </div>
  </div>
</template>

<style scoped>
.c-mini-graph {
  height: 100px;
  width: 100px;
  position: absolute;
  margin-left: 60px;
  margin-top: 100px;
  z-index: 999;
}
.c-fixedLayout {
  position: fixed;
  top: 100px;
}
.c-mini-canvas {
  background-color: #aacbff;
  border: #7ba8ff solid 1px;
  opacity: 0.8;
  position: relative;
}
.c-mini-view {
  background-color: #f5a565;
  border: #c03639 solid 1px;
  opacity: 0.5;
  color: #ffffff;
  font-size: 14px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
}
.c-mini-node {
  position: absolute;
  width: 2px;
  height: 2px;
  background-color: #000000;
  border-radius: 1px;
}
</style>
