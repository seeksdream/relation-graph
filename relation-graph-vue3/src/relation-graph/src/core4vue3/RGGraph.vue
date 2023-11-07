<script lang="ts" setup>
import { computed, inject, onMounted, ref } from 'vue'
import { devLog } from '../../../../../relation-graph-vue2/src/utils/RGCommon'
import {graphDataKey, graphInstanceKey, graphKey} from '../../../constants'
import SeeksRGNode from './RGNode.vue'
import SeeksRGLink from './RGLink.vue'
import SeeksRGLinePath from './RGLinePath.vue'
import RGLineSmart from './RGLineSmart.vue'

const rgCanvas$ = ref<HTMLDivElement>()
const graphData = inject(graphDataKey)
const graph = inject(graphKey)
const options = computed(() => {
  return graph!.options!;
})
const allLineColors = computed(() => {
  return graph!.allLineColors!;
})
const init = () => {
  rgCanvas$.value!.style.setProperty(
      '--stroke',
      `url('#${options.value.instanceId}-lineStyle')`
  )
  rgCanvas$.value!.style.setProperty(
      '--markerEnd',
      `url('#${options.value.instanceId}-start-arrow-default')`
  )
  rgCanvas$.value!.style.setProperty(
      '--markerStart',
      `url('#${options.value.instanceId}-arrow-default')`
  )
  rgCanvas$.value!.style.setProperty(
      '--markerEndChecked',
      `url('#${options.value.instanceId}-arrow-checked')`
  )
  rgCanvas$.value!.style.setProperty(
      '--markerStartChecked',
      `url('#${options.value.instanceId}-start-arrow-checked')`
  )
}
onMounted(() => {
  devLog('[RGCanvas mounted]')
  init()
})
</script>
<template>
  <div class="rel-single-graph" style="overflow: visible">
    <div ref="rgCanvas$" class="rel-linediv" style="overflow: visible">
      <svg :style="{width : options.canvasSize.width + 'px',height: options.canvasSize.height + 'px'}" style="overflow: visible" xmlns="http://www.w3.org/2000/svg" version="2.0">
        <defs>
          <linearGradient id="my-lineStyle" gradientUnits="objectBoundingBox" cx="0.5" cy="0.5">
            <stop offset="0%" stop-color="#e52c5c" stop-opacity="1" />
            <stop offset="100%" stop-color="#FD8B37" stop-opacity="0" />
          </linearGradient>
          <marker
              :id="options.instanceId+'-arrow-default'"
              :markerWidth="options.defaultLineMarker.markerWidth"
              :markerHeight="options.defaultLineMarker.markerHeight"
              :refX="options.defaultLineMarker.refX"
              :refY="options.defaultLineMarker.refY"
              marker-units="strokeWidth"
              orient="auto"
              viewBox="0 0 12 12"
          >
            <path :style="{fill: options.defaultLineColor}" :d="options.defaultLineMarker.data" />
          </marker>
          <marker
              :id="options.instanceId+'-start-arrow-default'"
              :markerWidth="options.defaultLineMarker.markerWidth"
              :markerHeight="options.defaultLineMarker.markerHeight"
              :refX="options.defaultLineMarker.refX"
              :refY="options.defaultLineMarker.refY"
              marker-units="strokeWidth"
              orient="auto"
              viewBox="0 0 12 12"
          >
            <path :style="{fill: options.defaultLineColor}" :d="options.defaultLineMarker.data" transform="translate(12,12)rotate(180)"  />
          </marker>
          <marker
              :id="options.instanceId+'-arrow-checked'"
              :markerWidth="options.defaultLineMarker.markerWidth"
              :markerHeight="options.defaultLineMarker.markerHeight"
              :refX="options.defaultLineMarker.refX"
              :refY="options.defaultLineMarker.refY"
              marker-units="strokeWidth"
              orient="auto"
              viewBox="0 0 12 12"
          >
            <path :style="{fill: options.checkedLineColor}" :d="options.defaultLineMarker.data" />
          </marker>
          <marker
              :id="options.instanceId+'-start-arrow-checked'"
              :markerWidth="options.defaultLineMarker.markerWidth"
              :markerHeight="options.defaultLineMarker.markerHeight"
              :refX="options.defaultLineMarker.refX"
              :refY="options.defaultLineMarker.refY"
              marker-units="strokeWidth"
              orient="auto"
              viewBox="0 0 12 12"
          >
            <path :style="{fill: options.checkedLineColor}" :d="options.defaultLineMarker.data" transform="translate(12,12)rotate(180)" />
          </marker>
          <marker
              v-for="thisColor in allLineColors"
              :id="options.instanceId+'-arrow-'+thisColor.id"
              :key="thisColor.id"
              :markerWidth="options.defaultLineMarker.markerWidth"
              :markerHeight="options.defaultLineMarker.markerHeight"
              :refX="options.defaultLineMarker.refX"
              :refY="options.defaultLineMarker.refY"
              marker-units="strokeWidth"
              orient="auto"
          >
            <path
                :fill="options.defaultLineMarker.color || thisColor.color"
                :d="options.defaultLineMarker.data"
            />
          </marker>
          <marker
              v-for="thisColor in allLineColors"
              :id="options.instanceId+'-start-arrow-'+thisColor.id"
              :key="'start-'+thisColor.id"
              :markerWidth="options.defaultLineMarker.markerWidth"
              :markerHeight="options.defaultLineMarker.markerHeight"
              :refX="options.defaultLineMarker.refX"
              :refY="options.defaultLineMarker.refY"
              marker-units="strokeWidth"
              orient="auto"
          >
            <path
                :fill="options.defaultLineMarker.color || thisColor.color"
                :d="options.defaultLineMarker.data"
                transform="translate(12,12)rotate(180)"
            />
          </marker>
          <template v-for="thisLink in graphData.links">
            <template v-for="(thisRelation, ri) in thisLink.relations">
              <SeeksRGLinePath v-if="options.lineUseTextPath || thisRelation.useTextPath" :key="thisRelation.id" :link="thisLink" :relation="thisRelation" :relation-index="ri" />
            </template>
          </template>
        </defs>
        <SeeksRGLink v-for="thisLink in graphData.links" :key="thisLink.seeks_id" :link-props="thisLink">
          <template #line="{line}">
            <slot :line="line" :link="thisLink" name="line" />
          </template>
        </SeeksRGLink>
        <RGLineSmart v-if="options.creatingLinePlot && options.newLinkTemplate.fromNode" key="s-line-template" :link="options.newLinkTemplate" :relation="options.newLineTemplate" :relation-index="0" />
      </svg>
    </div>
    <div class="rel-nodediv rel-nodediv-for-webkit">
      <SeeksRGNode v-for="thisNode in graphData.nodes" :key="thisNode.seeks_id" :node-props="thisNode">
        <template #node="{node}">
          <slot :node="node" name="node" />
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
      </SeeksRGNode>
    </div>
  </div>
</template>
<style scoped>
</style>
