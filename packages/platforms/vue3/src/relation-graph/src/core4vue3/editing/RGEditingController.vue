<template>
  <div
    v-if="options.editingController.show || options.snapshotting"
    class="rel-editing-ctrl"
    :style="{
      left: options.editingController.x + 'px',
      top: options.editingController.y + 'px',
      width: options.editingController.width + 'px',
      height: options.editingController.height + 'px',
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import {computed, inject} from "vue";
import {graphKey} from "../../../../constants";

const graph = inject(graphKey)
const options = computed(() => {
  return graph!.options!;
})

</script>

<style scoped>
</style>
