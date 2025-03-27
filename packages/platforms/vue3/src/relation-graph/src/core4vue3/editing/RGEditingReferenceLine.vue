<template>
  <div
    v-show="options.editingReferenceLine.show"
    class="rel-editing-referline"
  >
    <div
      v-show="options.editingReferenceLine.directionV"
      class="rel-editing-referline-v"
      :style="{
      left: options.editingReferenceLine.v_x + 'px',
      top: options.editingReferenceLine.v_y + 'px',
      height: options.editingReferenceLine.v_height + 'px'
    }"
    >
      <div class="referline"><div>{{options.editingReferenceLine.v_height}}px</div></div>
    </div>
    <div
      v-show="options.editingReferenceLine.directionH"
      class="rel-editing-referline-h"
      :style="{
      left: options.editingReferenceLine.h_x + 'px',
      top: options.editingReferenceLine.h_y + 'px',
      width: options.editingReferenceLine.h_width + 'px'
    }"
    >
      <div class="referline"><div>{{options.editingReferenceLine.h_width}}px</div></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, inject, onMounted, onUnmounted} from "vue";
import {graphKey} from "../../../../constants";
const graph = inject(graphKey)
const options = computed(() => {
  return graph!.options!;
})
const graphInstance = computed(() => {
  return graph!.instance!;
})
onMounted(() => {
  options.value.showReferenceLine = true;
});
onUnmounted(() => {
  options.value.showReferenceLine = false;
});
</script>
