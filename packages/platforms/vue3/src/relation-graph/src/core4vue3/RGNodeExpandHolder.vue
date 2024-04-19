<script lang="ts" setup>
import type { RGNode } from '../../../../../../relation-graph-models/types';
const props = defineProps<{
  nodeProps: RGNode
  expandButtonClass: string
  expandOrCollapseNode: (e: MouseEvent) => void
  expandHolderPosition: string
  color: string
}>()
</script>
<template>
  <div
      :class="[('c-expand-positon-'+expandHolderPosition)]"
      class="c-btn-open-close"
  >
      <span
          :class="expandButtonClass" :style="{'background-color':color}"
          @click.stop="expandOrCollapseNode"
          @touchend.stop="expandOrCollapseNode"
      >
      </span>
  </div>
</template>
