<script lang="ts" setup>
import { computed, inject } from 'vue'
import {graphInstanceKey, graphKey} from '../../../constants'
import type { RGLine, RGLink } from '../../../../../../relation-graph-models/types';
// const graphInstance$ = inject(graphInstanceKey)
const graph = inject(graphKey)
const options = computed(() => {
  return graph!.options!;
})
const props = defineProps<{
  link: RGLink
  relation: RGLine
  relationIndex: number
}>()
const checked = computed(() => {
  return props.relation.id === options.value.checkedLineId
})
const pathData = computed(() => {
  const { path, textPosition } = graph.instance!.createLinePath(
      props.link,
      props.relation,
      props.relationIndex
  );
  return path;
})
const relationGraph = computed(() => {
  return graph.instance!;
})

const style = computed(() => {
  const lineWidth = props.relation.lineWidth !== undefined ? props.relation.lineWidth : (options.value.defaultLineWidth || 1);
  const lineColor = props.relation.color ? props.relation.color : options.value.defaultLineColor;
  return options.value.snapshotting ? {
    stroke: lineColor,
    opacity: props.relation.opacity,
    strokeWidth: lineWidth + 'px',
    pointerEvents: (props.relation.disableDefaultClickEffect ? 'none' : undefined),
    fill: props.relation.lineShape === 8 ? lineColor : 'none'
  } : {};
})
</script>
<template>
  <path
      :id="options.instanceId + '-' + relation.id"
      :d="pathData"
      :marker-start="relationGraph.getArrow(relation, link, true)"
      :marker-end="relationGraph.getArrow(relation, link, false)"
      :class="['c-rg-line-path', relation.styleClass, checked?'c-rg-line-checked':'']"
      :style="style"
  />
</template>
