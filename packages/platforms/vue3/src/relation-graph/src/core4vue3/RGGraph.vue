<script lang="ts" setup>
import { computed, inject, onMounted, ref } from 'vue'
import { devLog } from '../../../../../../relation-graph-models/utils/RGCommon'
import {graphDataKey, graphInstanceKey, graphKey} from '../../../constants'
import SeeksRGNode from './RGNode.vue'
import SeeksRGLink from './RGLink.vue'
import SeeksRGLinePath from './RGLinePath.vue'
import RGLineSmart from './RGLineSmart.vue'
import RGLineChecked from "./RGLineChecked.vue";

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
      <svg class="rel-lines-svg" :style="{width : options.canvasSize.width + 'px',height: options.canvasSize.height + 'px'}" xmlns="http://www.w3.org/2000/svg">
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
              markerUnits="userSpaceOnUse"
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
              markerUnits="userSpaceOnUse"
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
              markerUnits="userSpaceOnUse"
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
              markerUnits="userSpaceOnUse"
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
              markerUnits="userSpaceOnUse"
              orient="auto"
              viewBox="0 0 12 12"
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
              markerUnits="userSpaceOnUse"
              orient="auto"
              viewBox="0 0 12 12"
          >
            <path
                :fill="options.defaultLineMarker.color || thisColor.color"
                :d="options.defaultLineMarker.data"
                transform="translate(12,13)rotate(180)"
            />
          </marker>
          <template v-if="!options.showEasyView" v-for="thisLink in graphData.links" :key="thisLink.seeks_id">
            <template v-for="(thisRelation, ri) in thisLink.relations" :key="thisRelation.id">
              <SeeksRGLinePath v-if="!thisLink.invisiable && (options.lineUseTextPath || thisRelation.useTextPath)" :link="thisLink" :relation="thisRelation" :relation-index="ri" />
            </template>
          </template>
        </defs>
        <RGLineChecked v-if="!options.showEasyView" />
        <template v-if="!options.showEasyView" v-for="thisLink in graphData.links" :key="thisLink.seeks_id">
          <SeeksRGLink v-if="!thisLink.invisiable" :link-props="thisLink">
            <template #line="{line, lineIndex}">
              <slot :line="line" :link="thisLink" :lineIndex="lineIndex" name="line" />
            </template>
          </SeeksRGLink>
        </template>
      </svg>
    </div>
    <div class="rel-nodediv rel-nodediv-for-webkit">
      <template v-if="!options.showEasyView" v-for="thisNode in graphData.nodes" :key="thisNode.seeks_id">
        <SeeksRGNode v-if="!thisNode.invisiable" :node-props="thisNode">
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
      </template>
    </div>
    <div class="rel-linediv rel-linediv-el-lines">
      <svg class="rel-lines-svg rel-lines-svg-el-lines" xmlns="http://www.w3.org/2000/svg">
        <template v-for="thisLink in graphData.elementLines">
          <RGLineSmart v-if="thisLink.relations[0].isHide === false" :key="'ell-'+thisLink.relations[0].id" :link="thisLink" :relation="thisLink.relations[0]" :relation-index="0" />
        </template>
        <RGLineSmart v-if="options.creatingLinePlot && options.newLinkTemplate.fromNode" key="s-line-template" :link="options.newLinkTemplate" :relation="options.newLineTemplate" :relation-index="0" />
      </svg>
    </div>
  </div>
</template>
<style scoped>
</style>
