<script lang="ts" setup>
import {computed, inject, onMounted, ref} from 'vue'
import {graphKey} from '../../../../constants'
const props = defineProps<{
  direction?: 'v'|'h',
  positionH?: 'left'|'center'|'right',
  positionV?: 'top'|'center'|'bottom',
}>(); // RGToolBarProps
const graph = inject(graphKey)
const options = computed(() => {
  return graph!.options!;
})
const graphInstance = computed(() => {
  return graph!.instance!;
})
const toggleAutoLayout = () => {
  // devLog('this.options.autoLayouting', this.options.autoLayouting)
  graphInstance.value.toggleAutoLayout();
}
const downloadAsImage = () => {
  // devLog('this.options.autoLayouting', this.options.autoLayouting)
  graphInstance.value.downloadAsImage('png');
}
const zoomToFit = async() => {
  await graphInstance.value.setZoom(100);
  await graphInstance.value.moveToCenter();
  await graphInstance.value.zoomToFit();
}
const doZoom = async(value:number) => {
  await graphInstance.value.zoom(value);
}
const fullscreen = async() => {
  await graphInstance.value.fullscreen();
}
</script>
<template>
  <div
      class="rel-toolbar rel-xs-toolbar"
      :class="['rel-toolbar-h-' + (positionH||'left'), 'rel-toolbar-v-' + (positionV||'bottom'), 'rel-toolbar-' + (direction||'h')]"
  >
    <div v-if="options.allowShowFullscreenMenu" title="Full Screen" class="c-mb-button" style="margin-top: 0px;" @click="fullscreen">
      <svg t="1712757785584" class="rg-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path d="M298.666667 597.333333H213.333333v213.333334h213.333334v-85.333334H298.666667v-128z m-85.333334-170.666666h85.333334V298.666667h128V213.333333H213.333333v213.333334z m512 298.666666h-128v85.333334h213.333334v-213.333334h-85.333334v128zM597.333333 213.333333v85.333334h128v128h85.333334V213.333333h-213.333334z" p-id="7390"></path></svg>
    </div>
    <div v-if="options.allowShowZoomMenu" class="c-mb-button" @click="doZoom(20)">
      <svg class="rg-icon" aria-hidden="true"><use xlink:href="#icon-fangda"></use></svg>
    </div>
    <div v-if="options.allowShowZoomMenu" class="c-current-zoom" @click="zoomToFit">{{ options.canvasZoom }}%</div>
    <div v-if="options.allowShowZoomMenu" class="c-mb-button" style="margin-top:0px;" @click="doZoom(-20)">
      <svg class="rg-icon" aria-hidden="true"><use xlink:href="#icon-suoxiao"></use></svg>
    </div>
    <div v-if="options.allowAutoLayoutIfSupport && options.isNeedShowAutoLayoutButton" :title="options.autoLayouting?'Stop Force Layout':'Start Force Layout'" :class="{'c-mb-button-on':options.autoLayouting}" class="c-mb-button" @click="toggleAutoLayout">
      <svg v-if="!options.autoLayouting" class="rg-icon" aria-hidden="true"><use xlink:href="#icon-zidong"></use></svg>
      <svg v-else class="c-loading-icon rg-icon" aria-hidden="true"><use xlink:href="#icon-lianjiezhong"></use></svg>
    </div>
    <slot />
    <div style="clear: both;"></div>
  </div>
</template>
