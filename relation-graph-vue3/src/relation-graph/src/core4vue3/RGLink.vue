<script lang="ts" setup>
import {computed, inject} from 'vue'
import {graphInstanceKey, graphKey} from '../../../constants'
import RGLineTextByPath from './RGLineTextByPath.vue'
import RGLineSmart from './RGLineSmart.vue'
import RGNodesAnalytic from '../../../../../relation-graph-vue2/src/utils/RGNodesAnalytic'
import type { RGLink, RGNode } from '../../../../../relation-graph-vue2/src/types';
const props = defineProps<{
  linkProps: RGLink
}>()
const graphInstance$ = inject(graphInstanceKey)
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
      v-if="linkProps.isHide !== true && isAllowShowNode(linkProps.fromNode) && isAllowShowNode(linkProps.toNode)"
      :class="[options.checkedLineId==linkProps.seeks_id?'c-rg-link-checked':'']"
      ref="seeksRGLink"
      transform="translate(0,0)"
      class="rel-link-peel"
      :data-id="linkProps.seeks_id"
  >
    <template v-for="(thisRelation, ri) in linkProps.relations">
      <slot name="line" :line="thisRelation" :relation-index="ri">
        <RGLineTextByPath v-if="(options.lineUseTextPath || thisRelation.useTextPath) && thisRelation.isHide === false" :key="'l-'+thisRelation.id" :link="linkProps" :relation="thisRelation" :relation-index="ri" />
        <RGLineSmart v-else-if="thisRelation.isHide === false" :key="'l-'+thisRelation.id" :link="linkProps" :relation="thisRelation" :relation-index="ri" />
      </slot>
    </template>
  </g>
</template>
