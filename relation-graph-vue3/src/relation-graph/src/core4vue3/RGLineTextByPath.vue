<script lang="ts" setup>
import { computed, inject } from 'vue'
import { getTextSize } from '../../../../../relation-graph-vue2/src/utils/RGCommon'
import { getNodeDistance } from '../../../../../relation-graph-vue2/src/utils/RGGraphMath'
import {graphInstanceKey, graphKey} from '../../../constants'
import type { RGLine, RGLink } from '../../../../../relation-graph-vue2/src/types';
const props = defineProps<{
  link: RGLink
  relation: RGLine
  relationIndex: number
}>()
const graphInstance$ = inject(graphInstanceKey)
const graph = inject(graphKey)
const options = computed(() => {
  return graph!.options!;
})
const checked = computed(() => {
  return props.link.seeks_id === graphInstance$?.value!.options.checkedLineId
})
const textOffset = computed(() => {
  const x = props.relation.textOffset_x || options.value.defaultLineTextOffset_x || 0;
  const y = props.relation.textOffset_y || options.value.defaultLineTextOffset_y || -8;
  return `translate(${x},${y})`
})
const pathRef = computed(() => {
  return '#' + options.value.instanceId + '-' +  props.link.seeks_id + '-' + props.relationIndex;
})
const textAnchor = computed(() => {
  if (props.relation.lineShape === 4 || options.value.defaultLineShape === 4) {
    return 'start';
  }
  return 'middle';
})
const textHPosition = computed(() => {
  if (props.relation.lineShape === 4 || options.value.defaultLineShape === 4) {
    if (options.value.layoutDirection === 'v') {
      const fx = props.link.fromNode.x;
      const tx = props.link.toNode.x;
      return Math.abs(tx - fx) + 43;
    } else {
      const fy = props.link.fromNode.y;
      const ty = props.link.toNode.y;
      return Math.abs(ty - fy) + 43;
    }
  }
  return '50%';
})

const onClick = (line:RGLine, e:MouseEvent|TouchEvent) => {
  graphInstance$?.value!.onLineClick(line, props.link, e)
}
</script>
<template>
  <g>
    <use
        :xlink:href="pathRef"
        class="c-rg-line"
        :class="[
            relation.styleClass,
            relation.dashType ? ('rg-line-dashtype-' + relation.dashType) : undefined,
            relation.animation ? ('rg-line-anm-' + relation.animation) : undefined,
            checked ? 'c-rg-line-checked' : undefined
        ]"
        @touchstart.stop="onClick(relation, $event)"
        @click="onClick(relation, $event)" />
    <g
        :transform="textOffset"
    >
      <text
          class="c-rg-line-text"
          :style="{
            opacity: relation.opacity,
            fill:(relation.fontColor?relation.fontColor:(options.defaultLineFontColor ? options.defaultLineFontColor : (relation.color?relation.color:options.defaultLineColor)))
          }"
          @touchstart.stop="onClick(relation, $event)"
          @click="onClick(relation, $event)"
      >
        <textPath :xlink:href="pathRef" :startOffset="textHPosition" :text-anchor="textAnchor" method="align" spacing="auto"> {{ relation.text }} </textPath>
      </text>
    </g>
  </g>
</template>
