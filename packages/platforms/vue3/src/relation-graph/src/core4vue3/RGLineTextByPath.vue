<script lang="ts" setup>
import { computed, inject } from 'vue'
import { getTextSize } from '../../../../../../relation-graph-models/utils/RGCommon'
import { getNodeDistance } from '../../../../../../relation-graph-models/utils/RGGraphMath'
import {graphInstanceKey, graphKey} from '../../../constants'
import type { RGLine, RGLink } from '../../../../../../relation-graph-models/types';
const props = defineProps<{
  link: RGLink
  relation: RGLine
  relationIndex: number
}>()
// const graphInstance$ = inject(graphInstanceKey)
const graph = inject(graphKey)
const options = computed(() => {
  return graph!.options!;
})
const checked = computed(() => {
  return props.relation.id === graph.instance!.options.checkedLineId
})
const pathRef = computed(() => {
  return '#' + options.value.instanceId + '-' +  props.relation.id;
})
// const textOffset = computed(() => {
//     const x = props.relation.textOffset_x || options.value.defaultLineTextOffset_x || 0;
//     const y = props.relation.textOffset_y || options.value.defaultLineTextOffset_y || -8;
//     return `translate(${x},${y})`
// })
// const textAnchor = computed(() => {
//   if (props.relation.lineShape === 4 || options.value.defaultLineShape === 4) {
//     return 'start';
//   }
//   return 'middle';
// })
// const textHPosition = computed(() => {
//   if (props.relation.lineShape === 4 || options.value.defaultLineShape === 4) {
//     if (options.value.layoutDirection === 'v') {
//       const fx = props.link.fromNode.x;
//       const tx = props.link.toNode.x;
//       return Math.abs(tx - fx) + 43;
//     } else {
//       const fy = props.link.fromNode.y;
//       const ty = props.link.toNode.y;
//       return Math.abs(ty - fy) + 43;
//     }
//   }
//   return '50%';
// })

const textStyle = computed(() => {
    return graph.instance!.getLineTextStyle(props.link, props.relation, props.relationIndex);
})
const lineWidth = computed(() => {
  return (props.relation.lineWidth
    ? props.relation.lineWidth
    : options.value.defaultLineWidth);
})
const lineColor = computed(() => {
  return props.relation.color ? props.relation.color : options.value.defaultLineColor;
})
const onClick = (line:RGLine, e:MouseEvent|TouchEvent) => {
  graph.instance!.onLineClick(line, props.link, e)
}
</script>
<template>
  <g :class="[relation.className]" :data-id="relation.id">
    <use
      :xlink:href="pathRef"
      class="c-rg-line-bg"
      :style="{
        pointerEvents: (relation.disableDefaultClickEffect ? 'none' : undefined),
        strokeWidth: (lineWidth < 8 ? 8 : lineWidth) + 'px'
      }"
      @touchstart="onClick(relation, $event)"
      @click="onClick(relation, $event)"
    />
    <use
        :xlink:href="pathRef"
        class="c-rg-line"
        :class="[
            relation.styleClass,
            relation.dashType ? ('rg-line-dashtype-' + relation.dashType) : undefined,
            relation.animation ? ('rg-line-anm-' + relation.animation) : undefined,
            checked ? 'c-rg-line-checked' : undefined
        ]"
        :style="{
          stroke: lineColor,
          opacity: relation.opacity,
          strokeWidth: lineWidth + 'px',
          pointerEvents: (relation.disableDefaultClickEffect ? 'none' : undefined),
          fill: relation.lineShape === 8 ? (relation.color || options.defaultLineColor) : 'none'
        }"
        @touchstart="onClick(relation, $event)"
        @click="onClick(relation, $event)" />
    <g
        v-if="
        textStyle &&
        options.defaultShowLineLabel &&
        options.canvasZoom > 40
      "
        :transform="textStyle.textOffset"
    >
      <text
          class="c-rg-line-text"
          :class="{'c-rg-line-text-checked' : checked}"
          :style="{
            opacity: relation.opacity,
            fill:(relation.fontColor?relation.fontColor:(options.defaultLineFontColor ? options.defaultLineFontColor : (relation.color?relation.color:options.defaultLineColor))),
            pointerEvents: (relation.disableDefaultClickEffect ? 'none' : undefined)
          }"
          :rotate="textStyle.textRotate"
          @touchstart="onClick(relation, $event)"
          @click="onClick(relation, $event)"
      >
        <textPath :xlink:href="pathRef"
                  :startOffset="textStyle.textHPosition"
                  :text-anchor="textStyle.textAnchor"
                  method="align"
                  spacing="auto"> {{ textStyle.text }} </textPath>
      </text>
    </g>
  </g>
</template>
