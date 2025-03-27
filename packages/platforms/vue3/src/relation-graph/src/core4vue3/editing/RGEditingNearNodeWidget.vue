<template>
  <div
    class="rel-editing-bar"
    :class="['rel-editing-bar-' + (position || 'top')]"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import {computed, inject, onMounted, onUnmounted} from "vue";
import {RGUserEvent, RGWidgetPosition, RGWidgetProps} from "../../../../types";
import {graphKey} from "../../../../constants";

const props = defineProps<{
  position?: RGWidgetPosition
}>(); // RGWidgetProps
const graph = inject(graphKey)
const options = computed(() => {
  return graph!.options!;
})
const graphInstance = computed(() => {
  return graph!.instance!;
})
</script>
