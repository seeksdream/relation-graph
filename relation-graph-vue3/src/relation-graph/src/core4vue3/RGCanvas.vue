<script lang="ts" setup>
import { computed, inject, onMounted, ref } from 'vue'
import RGEffectUtils from '../utils/RGEffectUtils'
import { devLog, isSupportTouch } from '../utils/RGCommon'
import { relationGraphKey } from '../../../constants'
import SeeksRGNode from './RGNode.vue'
import SeeksRGLink from './RGLink.vue'
import SeeksRGLinePath from './RGLinePath.vue'
const rgCanvas$ = ref<HTMLElement>()
const relationGraph = inject(relationGraphKey)!.value
const init = () => {
  rgCanvas$.value!.style.setProperty(
    '--stroke',
    `url('#${relationGraph.options.instanceId}-lineStyle')`
  )
  rgCanvas$.value!.style.setProperty(
    '--markerEnd',
    `url('#${relationGraph.options.instanceId}-start-arrow-default')`
  )
  rgCanvas$.value!.style.setProperty(
    '--markerStart',
    `url('#${relationGraph.options.instanceId}-arrow-default')`
  )
  rgCanvas$.value!.style.setProperty(
    '--markerEndChecked',
    `url('#${relationGraph.options.instanceId}-arrow-checked')`
  )
  rgCanvas$.value!.style.setProperty(
    '--markerStartChecked',
    `url('#${relationGraph.options.instanceId}-start-arrow-checked')`
  )
}
const mouseListener = (e: any) => {
  if (relationGraph.options.disableZoom) {
    e.cancelBubble = false
    return true
  }
  try {
    e.cancelBubble = true
    e.preventDefault()
    e.stopPropagation()
  } catch {
    // xxx
  }
  const userZoomCenter = {
    x: e.clientX,
    y: e.clientY,
  }
  let _deltaY = e.deltaY
  if (_deltaY === undefined) {
    _deltaY = e.wheelDelta
  }
  // #25 https://github.com/seeksdream/relation-graph/issues/25
  // const _isMac = /macintosh|mac os x/i.test(navigator.userAgent);
  // const _zoomDirection = _isMac ? 1 : -1;
  const _zoomDirection = -1
  // const _zoomDirection = 1;
  if (_deltaY > 0) {
    relationGraph.zoom(5 * _zoomDirection, userZoomCenter)
  } else {
    relationGraph.zoom(-5 * _zoomDirection, userZoomCenter)
  }
}
const onDragEnd = () => {
  // do something
}
const onDragStart = (e: MouseEvent | TouchEvent) => {
  if (relationGraph.options.disableDragCanvas) {
    return
  }
  let draggingCallback
  if (isSupportTouch) {
    let baseEventPosition2: { x: any; y: any } | null = null
    let baseZoom = 100
    draggingCallback = (x: any, y: any, basePosition: { x: number; y: number }, baseEventPosition: { x: number; y: number }, e: MouseEvent | TouchEvent) => {
      // @ts-ignore
      const touches = e.touches || e.targetTouches
      const touchPointer1 = touches[0]
      if (touches && touches.length > 1) {
        // 双指操作
        e.preventDefault()
        const touchPointer2 = touches[1]
        if (!baseEventPosition2) {
          baseEventPosition2 = {
            x: touchPointer2.clientX,
            y: touchPointer2.clientY,
          }
          baseZoom = relationGraph.options.canvasZoom
        }
        const touchPointer1Postion = {
          x: touchPointer1.clientX,
          y: touchPointer1.clientY,
        }
        const touchPointer2Postion = {
          x: touchPointer2.clientX,
          y: touchPointer2.clientY,
        }
        const baseDistance = Math.hypot(
          baseEventPosition2.x - baseEventPosition.x,
          baseEventPosition2.y - baseEventPosition.y
        )
        const currentDistance = Math.hypot(
          touchPointer2Postion.x - touchPointer1Postion.x,
          touchPointer2Postion.y - touchPointer1Postion.y
        )
        const zoom = currentDistance / baseDistance
        const newZoom = baseZoom * zoom
        relationGraph.setZoom(newZoom)
      } else {
        const ex = touchPointer1.clientX
        const ey = touchPointer1.clientY
        const x = basePosition.x + (ex - baseEventPosition.x)
        const y = basePosition.y + (ey - baseEventPosition.y)
        relationGraph.setCanvasOffset(x, y)
      }
    }
  }
  RGEffectUtils.startDrag(
    e,
    relationGraph.options.canvasOffset,
    onDragEnd,
    draggingCallback
  )
}

const canvasSizeAndPosition = computed(() => {
  return {
    width: `${relationGraph.options.canvasSize.width}px`,
    height: `${relationGraph.options.canvasSize.height}px`,
    'margin-left': `${relationGraph.options.canvasOffset.x}px`,
    'margin-top': `${relationGraph.options.canvasOffset.y}px`,
    'background-color': 'transparent',
    transform: `scale(${relationGraph.options.canvasZoom / 100},${
      relationGraph.options.canvasZoom / 100
    })`,
    // 'transform-origin': (this.options.canvasOffset.zoom_buff_x * 100).toFixed(2) + '% ' + (this.options.canvasOffset.zoom_buff_y * 100).toFixed(2) + '%'
  }
})
onMounted(() => {
  devLog('[RGCanvas mounted]')
  init()
  relationGraph.setCanvasDom(rgCanvas$.value!)
})
</script>
<template>
  <div
    :style="{
      width: '100%',
      height: '100%',
      'background-image': 'url(' + relationGraph.options.backgrounImage + ')',
    }"
    :class="[
      relationGraph.options.layoutClassName,
      relationGraph.options.backgrounImageNoRepeat
        ? 'rel-map-background-norepeat'
        : '',
    ]"
    class="rel-map"
    @mousedown.left.stop="onDragStart($event)"
    @touchstart.stop="onDragStart($event)"
    @wheel="mouseListener"
  >
    <div
      ref="seeksRGCanvas"
      :style="canvasSizeAndPosition"
      class="rel-map-canvas"
    >
      <slot name="canvas-plug" />
      <div ref="rgCanvas$" class="rel-linediv" style="overflow: visible">
        <svg
          :style="{
            width: relationGraph.options.canvasSize.width + 'px',
            height: relationGraph.options.canvasSize.height + 'px',
          }"
          style="overflow: visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              :id="relationGraph.options.instanceId + '-lineStyle'"
              x1="1"
              y1="0"
              x2="0"
              y2="0"
            >
              <stop offset="0%" stop-color="#e52c5c" />
              <stop offset="100%" stop-color="#FD8B37" />
            </linearGradient>
            <marker
              :id="relationGraph.options.instanceId + '-arrow-default'"
              :markerWidth="relationGraph.options.defaultLineMarker.markerWidth"
              :markerHeight="
                relationGraph.options.defaultLineMarker.markerHeight
              "
              :refX="relationGraph.options.defaultLineMarker.refX"
              :refY="relationGraph.options.defaultLineMarker.refY"
              marker-units="strokeWidth"
              orient="auto"
              viewBox="0 0 12 12"
            >
              <path
                :style="{ fill: relationGraph.options.defaultLineColor }"
                :d="relationGraph.options.defaultLineMarker.data"
              />
            </marker>
            <marker
              :id="relationGraph.options.instanceId + '-start-arrow-default'"
              :markerWidth="relationGraph.options.defaultLineMarker.markerWidth"
              :markerHeight="
                relationGraph.options.defaultLineMarker.markerHeight
              "
              :refX="relationGraph.options.defaultLineMarker.refX"
              :refY="relationGraph.options.defaultLineMarker.refY"
              marker-units="strokeWidth"
              orient="auto"
              viewBox="0 0 12 12"
            >
              <path
                :style="{ fill: relationGraph.options.defaultLineColor }"
                :d="relationGraph.options.defaultLineMarker.data"
                transform="translate(12,12)rotate(180)"
              />
            </marker>
            <marker
              :id="relationGraph.options.instanceId + '-arrow-checked'"
              markerUnits="strokeWidth"
              markerWidth="12"
              markerHeight="12"
              viewBox="0 0 12 12"
              refX="6"
              refY="6"
              orient="auto"
            >
              <path
                :style="{ fill: relationGraph.options.checkedLineColor }"
                d="M2,2 L10,6 L2,10 L6,6 L2,2"
              />
            </marker>
            <marker
              :id="relationGraph.options.instanceId + '-start-arrow-checked'"
              markerUnits="strokeWidth"
              markerWidth="12"
              markerHeight="12"
              viewBox="0 0 12 12"
              refX="6"
              refY="6"
              orient="auto"
            >
              <path
                :style="{ fill: relationGraph.options.checkedLineColor }"
                d="M2,2 L10,6 L2,10 L6,6 L2,2"
                transform="translate(12,12)rotate(180)"
              />
            </marker>
            <marker
              v-for="thisColor in relationGraph.allLineColors"
              :id="relationGraph.options.instanceId + '-arrow-' + thisColor.id"
              :key="thisColor.id"
              :markerWidth="relationGraph.options.defaultLineMarker.markerWidth"
              :markerHeight="
                relationGraph.options.defaultLineMarker.markerHeight
              "
              :refX="relationGraph.options.defaultLineMarker.refX"
              :refY="relationGraph.options.defaultLineMarker.refY"
              marker-units="strokeWidth"
              orient="auto"
            >
              <path
                :fill="
                  relationGraph.options.defaultLineMarker.color ||
                  thisColor.color
                "
                :d="relationGraph.options.defaultLineMarker.data"
              />
            </marker>
            <marker
              v-for="thisColor in relationGraph.allLineColors"
              :id="
                relationGraph.options.instanceId +
                '-start-arrow-' +
                thisColor.id
              "
              :key="'start-' + thisColor.id"
              :markerWidth="relationGraph.options.defaultLineMarker.markerWidth"
              :markerHeight="
                relationGraph.options.defaultLineMarker.markerHeight
              "
              :refX="relationGraph.options.defaultLineMarker.refX"
              :refY="relationGraph.options.defaultLineMarker.refY"
              marker-units="strokeWidth"
              orient="auto"
            >
              <path
                :fill="
                  relationGraph.options.defaultLineMarker.color ||
                  thisColor.color
                "
                :d="relationGraph.options.defaultLineMarker.data"
                transform="translate(12,12)rotate(180)"
              />
            </marker>
            <template v-for="thisLink in relationGraph.graphData.links">
              <template v-for="(thisRelation, ri) in thisLink.relations">
                <SeeksRGLinePath
                  v-if="
                    relationGraph.options.lineUseTextPath ||
                    thisRelation.useTextPath
                  "
                  :key="thisRelation.seeks_id"
                  :link="thisLink"
                  :relation="thisRelation"
                  :relation-index="ri"
                />
              </template>
            </template>
          </defs>
          <SeeksRGLink
            v-for="thisLink in relationGraph.graphData.links"
            :key="thisLink.seeks_id"
            :link-props="thisLink"
          >
            <template #line="{ line }">
              <slot :line="line" :link="thisLink" name="line" />
            </template>
          </SeeksRGLink>
        </svg>
      </div>
      <div class="rel-nodediv rel-nodediv-for-webkit">
        <SeeksRGNode
          v-for="thisNode in relationGraph.graphData.nodes"
          :key="thisNode.seeks_id"
          :node-props="thisNode"
        >
          <template #node="{ node }">
            <slot :node="node" name="node" />
          </template>
        </SeeksRGNode>
      </div>
    </div>
  </div>
</template>
<style scoped>
.rel-map {
  background-color: #ffffff;
  /*background-image: url("/static/images/graph-bg.png");*/
  overflow: hidden;
  cursor: default;
  user-select: none;
}
.rel-map-background-norepeat {
  background-repeat: no-repeat;
  background-position: right bottom;
}
.rel-nodediv-for-webkit {
  position: absolute;
  width: 100%;
  top: 0px;
  left: 0px;
  z-index: 1000;
}
.rel-map-canvas {
  position: relative;
  top: 0px;
  left: 0px;
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
.rel-linediv {
  /*user-select: none;*/
  position: absolute;
  z-index: 900;
  width: 100%;
  top: 0px;
  left: 0px;
  --stroke: url('#lineStyle');
  --markerEnd: url('#arrow-default');
  --markerStart: url('#start-arrow-default');
  --markerEndChecked: url('#arrow-checked');
  --markerStartChecked: url('#start-arrow-checked');
}
.rel-linediv svg {
  overflow: visible;
}
.rel-map :deep(img) {
  -webkit-user-drag: none;
  -webkit-user-select: none;
}
</style>
