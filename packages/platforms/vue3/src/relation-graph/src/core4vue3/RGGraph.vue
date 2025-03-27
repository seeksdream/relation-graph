<script lang="ts" setup>
import { computed, inject, onMounted, ref } from 'vue'
import { devLog } from '../../../../../../relation-graph-models/utils/RGCommon'
import {graphDataKey, graphInstanceKey, graphKey} from '../../../constants'
import SeeksRGNode from './RGNode.vue'
import SeeksRGLink from './RGLink.vue'
import SeeksRGLinePath from './RGLinePath.vue'
import RGLineSmart from './RGLineSmart.vue'
import RGLineChecked from "./RGLineChecked.vue";
import RGLineTextByPath from "./RGLineTextByPath.vue";
import {RGGraphData, RGOptionsFull} from "../../../../../../relation-graph-models/types";
import RGGraphDefs from "./RGGraphDefs.vue";

const rgCanvas$ = ref<HTMLDivElement>()
const graphData: RGGraphData = inject(graphDataKey)
const graph = inject(graphKey)
const options: RGOptionsFull = computed(() => {
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
        <RGGraphDefs>
          <slot name="svg-defs" />
        </RGGraphDefs>
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
        <RGGraphDefs :for-element-lines="true" />
        <template v-for="thisLink in graphData.elementLines">
          <template v-for="(thisRelation, ri) in thisLink.relations">
            <slot name="line" :line="thisRelation" :relation-index="ri">
              <RGLineTextByPath v-if="(thisRelation.useTextPath !== undefined ? thisRelation.useTextPath : options.lineUseTextPath) && thisRelation.isHide !== true" :key="'l-'+thisRelation.id" :link="thisLink" :relation="thisRelation" :relation-index="ri" />
              <RGLineSmart v-else-if="thisRelation.isHide !== true" :key="'l-'+thisRelation.id" :link="thisLink" :relation="thisRelation" :relation-index="ri" />
            </slot>
          </template>
<!--          <RGLineSmart v-if="thisLink.relations[0].isHide === false" :key="'ell-'+thisLink.relations[0].id" :link="thisLink" :relation="thisLink.relations[0]" :relation-index="0" />-->
        </template>

        <RGLineSmart v-if="options.creatingLinePlot && options.newLinkTemplate.fromNode" key="s-line-template" :link="options.newLinkTemplate" :relation="options.newLineTemplate" :relation-index="0" />
      </svg>
    </div>
  </div>
</template>
<style scoped>
</style>
