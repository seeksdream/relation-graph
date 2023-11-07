<script lang="ts" setup>
import {computed, inject, onMounted, ref} from 'vue'
import {graphInstanceKey, graphKey} from '../../../../constants'
const graphInstance$ = inject(graphInstanceKey)
const graph = inject(graphKey)
const options = computed(() => {
  return graph!.options!;
})
onMounted(() => {
})
const refresh = () => {
  graphInstance$?.value!.refresh()
}
const toggleAutoLayout = () => {
  graphInstance$?.value!.startAutoLayout()
}
const downloadAsImage = () => {
  graphInstance$?.value!.downloadAsImage('png')
}
const zoomToFit = async () => {
  const instance = graphInstance$?.value!;
  await instance.setZoom(100);
  await instance.moveToCenter();
  await instance.zoomToFit();
}
const addZoom = (buff:number) => {
  graphInstance$?.value!.zoom(buff)
}
const doFullscreen = () => {
  graphInstance$?.value!.fullscreen()
}
</script>
<template>
  <div
      class="rel-toolbar"
      :class="['rel-toolbar-h-' + options.toolBarPositionH, 'rel-toolbar-v-' + options.toolBarPositionV, 'rel-toolbar-' + options.toolBarDirection]"
  >
    <div v-if="options.allowShowFullscreenMenu" title="全屏/退出全屏" class="c-mb-button" style="margin-top: 0px;" @click="doFullscreen()">
      <svg class="rg-icon" aria-hidden="true"><use xlink:href="#icon-resize-"></use></svg>
    </div>
    <div v-if="options.allowShowZoomMenu" title="放大" class="c-mb-button" @click="addZoom(20)">
      <svg class="rg-icon" aria-hidden="true"><use xlink:href="#icon-fangda"></use></svg>
    </div>
    <div v-if="options.allowShowZoomMenu" class="c-current-zoom" @dblclick="zoomToFit">{{ options.canvasZoom }}%</div>
    <div v-if="options.allowShowZoomMenu" title="缩小" class="c-mb-button" style="margin-top:0px;" @click="addZoom(-20)">
      <svg class="rg-icon" aria-hidden="true"><use xlink:href="#icon-suoxiao"></use></svg>
    </div>
    <div v-if="options.allowAutoLayoutIfSupport && options.isNeedShowAutoLayoutButton" :title="options.autoLayouting?'点击停止自动布局':'点击开始自动调整布局'" :class="{'c-mb-button-on':options.autoLayouting}" class="c-mb-button" @click="toggleAutoLayout">
      <svg v-if="!options.autoLayouting" class="rg-icon" aria-hidden="true"><use xlink:href="#icon-zidong"></use></svg>
      <svg v-else class="c-loading-icon rg-icon" aria-hidden="true"><use xlink:href="#icon-lianjiezhong"></use></svg>
    </div>
    <div v-if="options.allowShowRefreshButton" title="刷新" class="c-mb-button" @click="refresh">
      <svg class="rg-icon" aria-hidden="true"><use xlink:href="#icon-ico_reset"></use></svg>
    </div>
    <div v-if="options.allowShowDownloadButton" title="下载图片" class="c-mb-button" @click="downloadAsImage">
      <svg class="rg-icon" aria-hidden="true"><use xlink:href="#icon-tupian"></use></svg>
    </div>
    <div style="clear: both;"></div>
  </div>
</template>
