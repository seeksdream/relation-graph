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
</script>
<template>
  <path
      :id="options.instanceId + '-' + link.seeks_id + '-' + relationIndex"
      :d="pathData"
      :marker-start="relationGraph.getArrow(relation, link, true)"
      :marker-end="relationGraph.getArrow(relation, link, false)"
      :class="['c-rg-line-path', relation.styleClass, checked?'c-rg-line-checked':'']"
  />
</template>
