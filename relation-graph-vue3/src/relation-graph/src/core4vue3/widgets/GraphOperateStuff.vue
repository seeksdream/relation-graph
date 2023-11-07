<script lang="ts" setup>
import {computed, inject, onMounted, ref} from 'vue'
import {graphInstanceKey, graphKey} from '../../../../constants'
import SeeksRGNode from '../RGNode.vue'
const graph = inject(graphKey)
const options = computed(() => {
  return graph!.options!;
})
</script>
<template>
  <div v-if="options && (options.creatingNodePlot || options.creatingSelection)" class="rel-operate">
    <div style="position: relative;">
      <SeeksRGNode v-if="options.creatingNodePlot && options.showTemplateNode" :node-props="options.newNodeTemplate">
        <template #node>
          <slot :node="options.newNodeTemplate" name="node-template" />
        </template>
      </SeeksRGNode>
      <div
          v-if="options.creatingSelection"
          class="rel-selection"
          :style="{
            left: options.selectionView.x + 'px',
            top: options.selectionView.y + 'px',
            width: options.selectionView.width + 'px',
            height: options.selectionView.height + 'px',
          }"
      >

      </div>
    </div>
  </div>
</template>
