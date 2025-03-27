<script lang="ts" setup>
import { computed, inject, onMounted, onUpdated, ref } from 'vue'
import {graphInstanceKey, graphKey} from '../../../constants'
import { devLog } from '../../../../../../relation-graph-models/utils/RGCommon';
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
  return props.relation.id === options.value.checkedLineId
})
const showStartArrow = computed(() => {
  return graph.instance!.getArrow(props.relation, props.link, true);
})
const showEndArrow = computed(() => {
  return graph.instance!.getArrow(props.relation, props.link, false);
})
const pathData = computed(() => {
  try {
    const { path, textPosition } = graph.instance!.createLinePath(
        props.link,
        props.relation,
        props.relationIndex
    );
    let textTransform = {}
    try {
      textTransform = graph.instance!.getTextTransform(
          props.relation,
          textPosition.x,
          textPosition.y,
          textPosition.rotate
      )
    } catch (e) {
      devLog(e);
    }
    return {
      path,
      textTransform
    };
  } catch (e) {
    devLog(e);
  }
  return {path:null, textTransform: null};
})
const textStyle = computed(() => {
    return graph.instance!.getLineTextStyle(props.link, props.relation, props.relationIndex);
})
const lineWidth = computed(() => {
    return (props.relation.lineWidth
      ? props.relation.lineWidth
      : options.value.defaultLineWidth);
})
const onClick = (line:RGLine, e: MouseEvent | TouchEvent) => {
  graph.instance!.onLineClick(line, props.link, e)
}
</script>
<template>
  <g :class="[relation.className]" :data-id="relation.id">
    <path
      :d="pathData.path"
      class="c-rg-line-bg"
      :style="{
        pointerEvents: (relation.disableDefaultClickEffect ? 'none' : undefined),
        strokeWidth: (lineWidth < 8 ? 8 : lineWidth) + 'px'
      }"
      @touchstart="onClick(relation, $event)"
      @click="onClick(relation, $event)"
    />
    <path
        :d="pathData.path"
        class="c-rg-line"
        :class="[
            relation.styleClass,
            relation.dashType ? ('rg-line-dashtype-' + relation.dashType) : undefined,
            relation.animation ? ('rg-line-anm-' + relation.animation) : undefined,
            checked ? 'c-rg-line-checked' : undefined
        ]"
        :style="{
          'stroke': relation.color?relation.color:options.defaultLineColor,
          'opacity': relation.opacity,
          'pointer-events': (relation.disableDefaultClickEffect && 'none'),
          'stroke-width': lineWidth + 'px',
          'fill': relation.lineShape === 8 ? (relation.color || options.defaultLineColor) : 'none'
        }"
        :marker-start="showStartArrow"
        :marker-end="showEndArrow"
        @touchstart="onClick(relation, $event)"
        @click="onClick(relation, $event)"
    />
    <g
        v-if="
        textStyle &&
        options.defaultShowLineLabel &&
        options.canvasZoom > 40
      "
        :transform="pathData.textTransform"
    >
      <text
          :key="'t-' + relation.seeks_id"
          :x="relation.textOffset_x || options.defaultLineTextOffset_x || 0"
          :y="relation.textOffset_y || options.defaultLineTextOffset_y || 10"
          :style="{
          opacity: relation.opacity,
          fill: (relation.fontColor?relation.fontColor:(options.defaultLineFontColor ? options.defaultLineFontColor : (relation.color?relation.color:options.defaultLineColor))),
          'pointer-events': (relation.disableDefaultClickEffect && 'none')
        }"
          :text-anchor="textStyle.textAnchor"
          class="c-rg-line-text"
          :class="{'c-rg-line-text-checked' : checked}"
          @touchstart="onClick(relation, $event)"
          @click="onClick(relation, $event)"
      >
        {{ textStyle.text }}
      </text>
    </g>
  </g>
</template>
