<template>
  <div
    v-if="options.editingController.nodes.length === 1"
    class="rel-editing-line-handle"
    @mousedown="onMouseDown('br', $event)"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>

import {RGWidgetPosition, RGUserEvent, RGCreateLineHandleProps, JsonLine} from "../../../../types";
import {computed, inject} from "vue";
import {graphKey} from "../../../../constants";

const props = defineProps<{
  lineTemplate?: JsonLine
}>(); // RGCreateLineHandleProps
const graph = inject(graphKey)
const options = computed(() => {
  return graph!.options!;
})
const graphInstance = computed(() => {
  return graph!.instance!;
})
const onMouseDown = (type: RGWidgetPosition, $event: RGUserEvent) => {
  graphInstance.value.startCreateLineByTemplate(type, props.lineTemplate, $event);
}
</script>

<style scoped>
</style>
