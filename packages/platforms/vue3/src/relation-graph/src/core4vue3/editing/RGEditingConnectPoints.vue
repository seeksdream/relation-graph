<template>
  <div
    class="rel-connect-ctl"
  >
    <div class="rel-connect-ctl-handler rel-connect-ctl-t" data-point="top" @mouseup="onMouseUp('top', $event)"></div>
    <div class="rel-connect-ctl-handler rel-connect-ctl-b" data-point="bottom" @mouseup="onMouseUp('bottom', $event)"></div>
    <div class="rel-connect-ctl-handler rel-connect-ctl-center" data-point="border" @mouseup="onMouseUp('border', $event)"></div>
    <div class="rel-connect-ctl-handler rel-connect-ctl-l" data-point="left" @mouseup="onMouseUp('left', $event)"></div>
    <div class="rel-connect-ctl-handler rel-connect-ctl-r" data-point="right" @mouseup="onMouseUp('right', $event)"></div>
    <div class="rel-connect-ctl-handler rel-connect-ctl-lr" data-point="lr" @mouseup="onMouseUp('lr', $event)"></div>
    <div class="rel-connect-ctl-handler rel-connect-ctl-tb" data-point="tb" @mouseup="onMouseUp('tb', $event)"></div>
  </div>
</template>

<script lang="ts" setup>
import {JsonLine, RGWidgetPosition, RGUserEvent, RGJunctionPoint} from "../../../../types";
import {computed, inject} from "vue";
import {graphKey} from "../../../../constants";
const graph = inject(graphKey)
const graphInstance = computed(() => {
  return graph!.instance!;
})
const onMouseUp = (type: RGJunctionPoint, $event: RGUserEvent) => {
  graphInstance.value.onLineVertexBeDropped(type, $event);
}
</script>

<style scoped>
</style>
