<script lang="ts" setup>
import {computed, inject} from 'vue'
import {graphInstanceKey, graphKey} from '../../../constants'
import RGLineTextByPath from './RGLineTextByPath.vue'
import RGLineSmart from './RGLineSmart.vue'
import RGNodesAnalytic from '../../../../../../relation-graph-models/utils/RGNodesAnalytic'
import type { RGLink, RGNode } from '../../../../../../relation-graph-models/types';
const props = defineProps<{
  linkProps: RGLink
}>()
// const graphInstance$ = inject(graphInstanceKey)
const graph = inject(graphKey)
const options = computed(() => {
  return graph!.options!;
})
const isAllowShowNode = (thisNode:RGNode):boolean => {
  return RGNodesAnalytic.isAllowShowNode(thisNode);
}
</script>
<template>
  <g
      v-if="isAllowShowNode(linkProps.fromNode) && isAllowShowNode(linkProps.toNode)"
      :class="[options.checkedLinkId==linkProps.seeks_id?'c-rg-link-checked':'']"
      ref="seeksRGLink"
      transform="translate(0,0)"
      class="rel-link-peel"
      :data-id="linkProps.seeks_id"
  >
    <template v-for="(thisRelation, ri) in linkProps.relations">
      <slot name="line" :line="thisRelation" :relation-index="ri">
        <RGLineTextByPath v-if="(thisRelation.useTextPath !== undefined ? thisRelation.useTextPath : options.lineUseTextPath) && thisRelation.isHide !== true" :key="'l-'+thisRelation.id" :link="linkProps" :relation="thisRelation" :relation-index="ri" />
        <RGLineSmart v-else-if="thisRelation.isHide !== true" :key="'l-'+thisRelation.id" :link="linkProps" :relation="thisRelation" :relation-index="ri" />
      </slot>
    </template>
  </g>
</template>
