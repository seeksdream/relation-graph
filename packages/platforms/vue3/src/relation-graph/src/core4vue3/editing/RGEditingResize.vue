<template>
  <div class="rel-resize-ctl">
    <div v-if="options.editingController.width > 30" class="rel-resize-ctl-handler rel-resize-ctl-tl" @mousedown="onMouseDown('tl', $event)"></div>
    <div v-if="options.editingController.width > 30" class="rel-resize-ctl-handler rel-resize-ctl-tr" @mousedown="onMouseDown('tr', $event)"></div>
    <div v-if="options.editingController.width > 30" class="rel-resize-ctl-handler rel-resize-ctl-bl" @mousedown="onMouseDown('bl', $event)"></div>
    <div class="rel-resize-ctl-handler rel-resize-ctl-br" @mousedown="onMouseDown('br', $event)"></div>
    <div v-if="options.editingController.width > 60" class="rel-resize-ctl-handler rel-resize-ctl-t" @mousedown="onMouseDown('t', $event)"></div>
    <div v-if="options.editingController.width > 60" class="rel-resize-ctl-handler rel-resize-ctl-b" @mousedown="onMouseDown('b', $event)"></div>
    <div v-if="options.editingController.height > 60" class="rel-resize-ctl-handler rel-resize-ctl-l" @mousedown="onMouseDown('l', $event)"></div>
    <div v-if="options.editingController.height > 60" class="rel-resize-ctl-handler rel-resize-ctl-r" @mousedown="onMouseDown('r', $event)"></div>
  </div>
</template>

<script lang="ts" setup>
import {RGUserEvent, RGWidgetPosition} from "../../../../types";
import {computed, inject} from "vue";
import {graphKey} from "../../../../constants";

const graph = inject(graphKey)
const options = computed(() => {
  return graph!.options!;
})
const graphInstance = computed(() => {
  return graph!.instance!;
})
const onMouseDown = (type: RGWidgetPosition, $event: RGUserEvent) => {
  $event.stopPropagation();
  // console.log('Resize start:', type);
  graphInstance.value.onResizeStart(type, $event);
}
</script>
