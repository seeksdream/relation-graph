<script lang="ts" setup>
import { computed, inject } from 'vue'
import {graphInstanceKey, graphKey} from '../../../constants'
import type { RGLine, RGLink } from '../../../../../relation-graph-vue2/src/types';
const graphInstance$ = inject(graphInstanceKey)
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
  return props.link.seeks_id === options.value.checkedLineId
})
const pathData = computed(() => {
  const { path, textPosition } = graphInstance$?.value!.createLinePath(
      props.link,
      props.relation,
      props.relationIndex
  );
  return path;
})
</script>
<template>
  <path
      :id="options.instanceId + '-' + link.seeks_id + '-' + relationIndex"
      :d="pathData"
      :stroke="(relation.color?relation.color:options.defaultLineColor)"
      :style="{'opacity': relation.opacity, 'stroke-width': (relation.lineWidth?relation.lineWidth:options.defaultLineWidth) + 'px'}"
      :marker-start="relation.showStartArrow && relationGraph.getArrow(relation, link, true)"
      :marker-end="relation.showEndArrow && relationGraph.getArrow(relation, link, false)"
      :class="['c-rg-line-path', relation.styleClass, checked?'c-rg-line-checked':'']"
      fill="none" />
</template>
