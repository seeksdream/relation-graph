<script lang="ts" setup>
import { computed, inject, onMounted, onUpdated, ref } from 'vue'
import {graphInstanceKey, graphKey} from '../../../constants'
import { devLog } from '../../../../../relation-graph-vue2/src/utils/RGCommon';
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
  return props.link.seeks_id === options.value.checkedLineId
})
const showStartArrow = computed(() => {
  return props.relation.showStartArrow && graphInstance$?.value!.getArrow(props.relation, props.link, true);
})
const showEndArrow = computed(() => {
  return props.relation.showEndArrow && graphInstance$?.value!.getArrow(props.relation, props.link, false);
})
const pathData = computed(() => {
  try {
    const { path, textPosition } = graphInstance$?.value!.createLinePath(
        props.link,
        props.relation,
        props.relationIndex
    );
    let textTransform = {}
    try {
      textTransform = graphInstance$?.value!.getTextTransform(
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
const onClick = (line:RGLine, e: MouseEvent | TouchEvent) => {
  graphInstance$?.value!.onLineClick(line, props.link, e)
}
</script>
<template>
  <g>
    <!-- 常规方式 -->
    <path
        :d="pathData.path"
        class="c-rg-line"
        :class="[
            relation.styleClass,
            relation.dashType ? ('rg-line-dashtype-' + relation.dashType) : undefined,
            relation.animation ? ('rg-line-anm-' + relation.animation) : undefined,
            checked ? 'c-rg-line-checked' : undefined
        ]"
        :stroke="
        (relation.color?relation.color:options.defaultLineColor)
      "
        :style="{
        'opacity': relation.opacity,
        'stroke-width':
          (relation.lineWidth
            ? relation.lineWidth
            : options.defaultLineWidth) + 'px',
      }"
        :marker-start="showStartArrow"
        :marker-end="showEndArrow"
        fill="none"
        @touchstart.stop="onClick(relation, $event)"
        @click="onClick(relation, $event)"
    />
    <g
        v-if="
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
          fill: (relation.fontColor?relation.fontColor:(options.defaultLineFontColor ? options.defaultLineFontColor : (relation.color?relation.color:options.defaultLineColor)))
        }"
          class="c-rg-line-text"
          @touchstart.stop="onClick(relation, $event)"
          @click="onClick(relation, $event)"
      >
        {{ relation.text }}
      </text>
    </g>
  </g>
</template>
