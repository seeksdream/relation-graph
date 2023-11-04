<script lang="ts" setup>
import { computed, inject } from 'vue'
import { getTextSize } from '../utils/RGCommon'
import { getNodeDistance } from '../utils/RGGraphMath'
import { relationGraphKey } from '../../../constants'
import type { RGLine, RGLink, RGNode } from '../RelationGraph';
const props = defineProps<{
  link: RGLink
  relation: RGLine
  relationIndex: number
}>()
const relationGraph = inject(relationGraphKey)!.value
const checked = computed(() => {
  return props.link.seeks_id === relationGraph.options.checkedLineId
})
const textOffset = computed(() => {
  const textWidth = getTextSize(props.relation.text!) * 10
  const distance = getNodeDistance(
    props.link.fromNode.x,
    props.link.fromNode.y,
    props.link.toNode.x,
    props.link.toNode.y
  )
  return (distance - textWidth) / 2
})
const onClick = (line:RGLine, e:MouseEvent|TouchEvent) => {
  relationGraph.onLineClick(line, props.link, e)
}
const isAllowShowNode = (thisNode:RGNode):boolean => {
  const _r =
    thisNode.isShow !== false &&
    thisNode.isHide !== true &&
    (!thisNode.lot.parent || isAllowShowNode(thisNode.lot.parent) === true)
  return _r
}
</script>
<template>
  <g>
    <use
      :xlink:href="
        '#' +
        relationGraph.options.instanceId +
        '-' +
        link.seeks_id +
        '-' +
        relationIndex
      "
      :class="['c-rg-line', checked ? 'c-rg-line-checked' : '']"
      @click="onClick(relation, $event)"
    />
    <text
      class="c-rg-line-text"
      :style="{
        opacity: relation.opacity,
        fill: checked
          ? relationGraph.options.checkedLineColor
          : relation.fontColor
          ? relation.fontColor
          : relation.color
          ? relation.color
          : undefined,
      }"
      :x="textOffset"
      y="0"
      @click="onClick(relation, $event)"
    >
      <textPath
        :xlink:href="
          '#' +
          relationGraph.options.instanceId +
          '-' +
          link.seeks_id +
          '-' +
          relationIndex
        "
        startOffset="0"
        text-anchor="start"
        method="align"
        spacing="auto"
      >
        {{ relation.text }}
      </textPath>
      <!--      startOffset="0" text-anchor="start" method="align" spacing="auto"-->
    </text>
  </g>
</template>
<style scoped>
/*.RGLine-enter-active {*/
/*transition: all .3s ease;*/
/*}*/
/*.RGLine-leave-active {*/
/*transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
/*}*/
.c-rg-line-text {
  fill: #888888;
  font-size: 12px;
}
.c-rg-line {
  z-index: 1000;
  fill-rule: nonzero;
  /*marker-end: url('#arrow');*/
  /* firefox bug fix - won't rotate at 90deg angles */
  /*-moz-transform: rotate(-89deg) translateX(-190px);*/
  /*animation-timing-function:linear;*/
  /*animation: ACTRGLineInit 1s;*/
}
.c-rg-line-tool {
  stroke-dasharray: 5, 5, 5;
}
.c-rg-line-flash {
  /* firefox bug fix - won't rotate at 90deg angles */
  -moz-transform: rotate(-89deg) translateX(-190px);
  animation-timing-function: linear;
  animation: ACTRGLineChecked 10s;
}
@keyframes ACTRGLineInit {
  from {
    stroke-dashoffset: 10px;
    stroke-dasharray: 20, 20, 20;
  }

  to {
    stroke-dashoffset: 0;
    stroke-dasharray: 0, 0, 0;
  }
}
@keyframes ACTRGLineChecked {
  from {
    stroke-dashoffset: 352px;
  }

  to {
    stroke-dashoffset: 0;
  }
}
</style>
