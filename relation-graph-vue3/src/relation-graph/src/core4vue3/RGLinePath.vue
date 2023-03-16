<script lang="ts" setup>
import { computed, inject } from 'vue'
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
</script>
<template>
  <path
    :id="
      relationGraph.options.instanceId +
      '-' +
      link.seeks_id +
      '-' +
      relationIndex
    "
    :d="pathData"
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
    :class="[relation.styleClass, checked ? 'c-rg-line-checked' : '']"
    fill="none"
  />
</template>
