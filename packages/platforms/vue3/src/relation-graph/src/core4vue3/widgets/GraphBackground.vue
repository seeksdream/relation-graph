<template>
  <div v-show="forDisplay!==false" class="rel-background" ref="$backgroundRef">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import {computed, inject, onMounted, onUnmounted, ref} from "vue";
import {RGWidgetPosition} from "../../../../types";
import {graphKey} from "../../../../constants";
const props = withDefaults(defineProps<{
  forImage?: boolean,
  forDisplay?: boolean
}>(), {
  forImage: true,
  forDisplay: true
}); // RGWatermarkProps
const graph = inject(graphKey)
const options = computed(() => {
  return graph!.options!;
})
const graphInstance = computed(() => {
  return graph!.instance!;
})
const $backgroundRef = ref();
const orignValues = ref({
  originBackgroundColor:'',
  originBackgroundImage:'',
});
onMounted(() => {
  // orignValues.value.originBackgroundColor = options.value.backgroundColor;
  // orignValues.value.originBackgroundImage = options.value.backgroundImage;
  // options.value.backgroundImageNoRepeat = true;
  options.value.backgroundColor = 'transparent';
  options.value.backgroundImage = '';
  graphInstance.value.setBackgroundDom($backgroundRef.value, props.forImage, props.forDisplay);
});
onUnmounted(() => {
  // options.value.backgroundColor = orignValues.value.originBackgroundColor;
  // options.value.backgroundImage = orignValues.value.originBackgroundImage;
  graphInstance.value.setBackgroundDom(null, props.forImage, props.forDisplay);
});
</script>
