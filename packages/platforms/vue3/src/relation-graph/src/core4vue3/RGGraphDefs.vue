<script lang="ts" setup>
import { computed, inject } from 'vue'
import {graphDataKey, graphKey} from '../../../constants'
import SeeksRGLinePath from './RGLinePath.vue'
import {RGGraphData, RGLine, RGLink} from "../../../../../../relation-graph-models/types";

const graphData: RGGraphData = inject(graphDataKey)
const graph = inject(graphKey)
const options = computed(() => {
  return graph!.options!;
})
const allLineColors = computed(() => {
  return graph!.allLineColors!;
})
const props = defineProps<{
  forElementLines?: boolean
}>()
const allLinks = computed(() => {
  return props.forElementLines ? graphData.elementLines : graphData.links;
})
</script>
<template>
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
      orient="auto-start-reverse"
      viewBox="0 0 12 12"
    >
      <path :style="{fill: options.defaultLineColor}" :d="options.defaultLineMarker.data"  />
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
      orient="auto-start-reverse"
      viewBox="0 0 12 12"
    >
      <path :style="{fill: options.checkedLineColor}" :d="options.defaultLineMarker.data" />
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
      orient="auto-start-reverse"
      viewBox="0 0 12 12"
    >
      <path
        :fill="options.defaultLineMarker.color || thisColor.color"
        :d="options.defaultLineMarker.data"
      />
    </marker>
    <template v-if="!options.showEasyView" v-for="thisLink in allLinks" :key="thisLink.seeks_id">
      <template v-for="(thisRelation, ri) in thisLink.relations" :key="thisRelation.id">
        <SeeksRGLinePath v-if="!thisLink.invisiable && (options.lineUseTextPath || thisRelation.useTextPath)" :link="thisLink" :relation="thisRelation" :relation-index="ri" />
      </template>
    </template>
    <slot />
  </defs>
</template>
<style scoped>
</style>
