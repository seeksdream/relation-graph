<template>
  <div
    v-if="options.nodeConnectController.show"
    class="rel-editing-connect-ctrl"
    :style="{
      left: options.nodeConnectController.x + 'px',
      top: options.nodeConnectController.y + 'px',
      width: options.nodeConnectController.width + 'px',
      height: options.nodeConnectController.height + 'px',
    }"
  >
    <slot>
      <RGEditingConnectPoints />
    </slot>
  </div>
</template>

<script lang="ts" setup>
import {computed, inject} from "vue";
import {graphKey} from "../../../../constants";
import RGEditingConnectPoints from "./RGEditingConnectPoints.vue";
const graph = inject(graphKey)
const options = computed(() => {
  return graph!.options!;
})
</script>

<style scoped>
</style>
