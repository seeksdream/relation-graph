<template>
  <div class="rel-single-graph" style="overflow: visible">
    <div ref="rgCanvas" class="rel-linediv" style="overflow: visible">
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

<script lang="ts">
import SeeksRGNode from './RGNode';
import SeeksRGLink from './RGLink';
import SeeksRGLinePath from './RGLinePath';
import RGLineSmart from './RGLineSmart';
import { devLog, isSupportTouch } from '../utils/RGCommon';

export default {
  name: 'RelationGraphSingleGraph',
  components: {SeeksRGNode, SeeksRGLink, SeeksRGLinePath, RGLineSmart },
  data() {
    return {
    };
  },
  inject: ['graphData', 'graph'],
  computed: {
    options() {
      return this.graph.options;
    },
    relationGraph() {
      return this.graph.instance;
    },
    allLineColors() {
      return this.graph.allLineColors;
    }
  },
  created() {
    devLog('[RGGraph created]');
  },
  mounted() {
    devLog('[RGGraph mounted]');
    this.init();
  },
  beforeDestroy() {
  },
  methods: {
    init() {
      this.$refs.rgCanvas.style.setProperty('--stroke', `url('#${  this.options.instanceId  }-lineStyle')`);
      this.$refs.rgCanvas.style.setProperty('--markerEnd', `url('#${  this.options.instanceId  }-start-arrow-default')`);
      this.$refs.rgCanvas.style.setProperty('--markerStart', `url('#${  this.options.instanceId  }-arrow-default')`);
      this.$refs.rgCanvas.style.setProperty('--markerEndChecked', `url('#${  this.options.instanceId  }-arrow-checked')`);
      this.$refs.rgCanvas.style.setProperty('--markerStartChecked', `url('#${  this.options.instanceId  }-start-arrow-checked')`);
    },
  }
};
</script>
