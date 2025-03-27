<template>
  <div
    class="rel-miniview"
    :class="['rel-miniview-' + (position || 'br')]"
    ref="$rgMiniView"
  >
    <canvas
      ref="$rgMiniViewCanvas"
      :class="{
      'rel-mv-canvas-reset': options.miniViewVisibleHandle.emptyContent
      }"
      @click="onClickCanvas"
    />
    <div
      class="rel-mv-visible-area"
      @mousedown="onMouseDown"
      :style="{
      left: options.miniViewVisibleHandle.x + 'px',
      top: options.miniViewVisibleHandle.y + 'px',
      width: options.miniViewVisibleHandle.width + 'px',
      height: options.miniViewVisibleHandle.height + 'px'
    }"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import {RGMiniViewProps, RGUserEvent, RGWidgetPosition} from "../../../../types";
import {onMounted, onUnmounted, ref, computed, inject} from "vue";
import {graphKey} from "../../../../constants";
const graph = inject(graphKey)
const options = computed(() => {
  return graph!.options!;
})
const graphInstance = computed(() => {
  return graph!.instance!;
})
const props = defineProps<{
  position?: RGWidgetPosition,
  width?: string,
  height?: string
}>(); // RGMiniViewProps
const $rgMiniView = ref<HTMLDivElement>();
const $rgMiniViewCanvas = ref<HTMLCanvasElement>();
onMounted(() => {
  options.value.showMiniView = true;
  $rgMiniView.value!.style.setProperty('--mv-width', (props.width || '150px'));
  $rgMiniView.value!.style.setProperty('--mv-height', (props.height || '150px'));
  graphInstance.value.setMiniViewCanvas($rgMiniViewCanvas.value!);
});
onUnmounted(() => {
  options.value.showMiniView = false;
});
const onMouseDown = (e: RGUserEvent) => {
  graphInstance.value.onVisiableViewHandleDragStart(e);
}
const onClickCanvas = (e: RGUserEvent) => {
  graphInstance.value.resetByVisiableView(e);
}
</script>
