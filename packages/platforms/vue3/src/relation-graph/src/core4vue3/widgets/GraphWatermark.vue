<template>
  <div
      v-show="show"
      class="rel-watermark"
      :class="['rel-watermark-' + (position || 'br')]"
      ref="$watermarkRef"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import {computed, inject, onMounted, onUnmounted, ref} from "vue";
import {RGWidgetPosition} from "../../../../types";
import {graphKey} from "../../../../constants";

const props = withDefaults(defineProps<{
  forImage?: boolean,
  forDisplay?: boolean,
  position?: RGWidgetPosition,
  width?: string,
  height?: string,
}>(), {
  forImage: true,
  forDisplay: false,
  position: 'br',
  width: '200px',
  height: '200px',
}); // RGWatermarkProps
const graph = inject(graphKey)
const options = computed(() => {
  return graph!.options!;
})
const graphInstance = computed(() => {
  return graph!.instance!;
})
const show = computed(() => {
  let isShow = false;
  if (options.value.snapshotting) {
    if (props.forImage === false) {
      isShow = false;
    } else {
      isShow = true;
    }
  } else {
    if (props.forDisplay === true) {
      isShow = true;
    } else {
      isShow = false;
    }
  };
  return isShow;
});
const $watermarkRef = ref();
onMounted(() => {
  $watermarkRef.value.style.setProperty('--mv-width', props.width || '200px');
  $watermarkRef.value.style.setProperty('--mv-height', props.height || '200px');
  graphInstance.value.setWatermarkDom($watermarkRef.value, props.forImage, props.forDisplay, props.position);
});
onUnmounted(() => {
  graphInstance.value.setWatermarkDom(null, props.forImage, props.forDisplay);
});
</script>
