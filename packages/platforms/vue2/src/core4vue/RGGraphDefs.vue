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
      <path :style="{fill: options.defaultLineColor}" :d="options.defaultLineMarker.data" />
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
    <template v-if="!options.showEasyView && !thisLink.invisiable" v-for="thisLink in allLinks">
      <template v-for="(thisRelation, ri) in thisLink.relations">
        <SeeksRGLinePath v-if="options.lineUseTextPath || thisRelation.useTextPath" :key="thisRelation.id" :link="thisLink" :relation="thisRelation" :relation-index="ri" />
      </template>
    </template>
    <slot />
  </defs>
</template>

<script lang="ts">
import SeeksRGLinePath from './RGLinePath.vue';

export default {
  name: 'RGGraphDefs',
  components: {SeeksRGLinePath },
  props: {
    forElementLines: {
      type: Boolean,
      mustUseProp: false,
      default: false
    }
  },
  data() {
    return {
    };
  },
  inject: ['graphData', 'graph', 'graphInstance'],
  computed: {
    options() {
      return this.graph.options;
    },
    relationGraph() {
      return this.graphInstance();
    },
    allLineColors() {
      return this.graph.allLineColors;
    },
    allLinks() {
      return this.forElementLines ? this.graphData?.elementLines : this.graphData?.links
    }
  }
};
</script>
