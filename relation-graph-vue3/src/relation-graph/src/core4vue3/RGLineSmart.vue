<script lang="ts" setup>
import { computed, inject, onMounted, onUpdated, ref } from 'vue'
import { relationGraphKey } from '../../../constants'
import type { RGLine, RGLink } from '../RelationGraph'

const props = defineProps<{
  link: RGLink
  relation: RGLine
  relationIndex: number
}>()
const relationGraph = inject(relationGraphKey)!.value
const checked = computed(() => {
  return props.link.seeks_id === relationGraph.options.checkedLineId
})
const pathData = computed(() => {
  const { path, textPosition } = relationGraph.createLinePath(
    props.link,
    props.relation,
    props.relationIndex
  )
  return path
})
const textTransform = computed(() => {
  const { path, textPosition } = relationGraph.createLinePath(
    props.link,
    props.relation,
    props.relationIndex
  );
  return relationGraph.getTextTransform(
    props.relation,
    textPosition.x,
    textPosition.y,
    textPosition.rotate
  )
})
const onClick = (line:RGLine, e: MouseEvent | TouchEvent) => {
  relationGraph.onLineClick(line, props.link, e)
}
</script>
<template>
  <g>
    <!-- 常规方式 -->
    <path
      :d="pathData"
      :class="['c-rg-line', relation.styleClass, checked ? 'c-rg-line-checked' : '']"
      :stroke="
        checked
          ? relationGraph.options.checkedLineColor
          : relation.color
          ? relation.color
          : relationGraph.options.defaultLineColor
      "
      :style="{
        'opacity': relation.opacity,
        'stroke-width':
          (relation.lineWidth
            ? relation.lineWidth
            : relationGraph.options.defaultLineWidth) + 'px',
      }"
      :marker-start="
        relation.showStartArrow && relationGraph.getArrow(relation, link, true)
      "
      :marker-end="
        relation.showEndArrow && relationGraph.getArrow(relation, link, false)
      "
      fill="none"
      @click="onClick(relation, $event)"
    />
    <g
      v-if="
        relationGraph.options.defaultShowLineLabel &&
        relationGraph.options.canvasZoom > 40
      "
      :transform="textTransform"
    >
      <text
        :key="'t-' + relation.seeks_id"
        :x="0"
        :y="0"
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
        class="c-rg-line-text"
        @click="onClick(relation, $event)"
      >
        {{ relation.text }}
      </text>
    </g>
  </g>
</template>

<style>
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
.c-rg-line-checked {
  /*stroke: var(--stroke);*/
  /*marker-end: var(--markerEndChecked) !important;*/
  stroke-width: 2px;
  stroke-dasharray: 5, 5, 5;
  stroke-dashoffset: 3px;
  stroke-linecap: butt;
  /*stroke: #FD8B37;*/
  stroke-linejoin: bevel;
  /* firefox bug fix - won't rotate at 90deg angles */
  -moz-transform: rotate(-89deg) translateX(-190px);
  animation-timing-function: linear;
  animation: ACTRGLineChecked 10s;
}
</style>
