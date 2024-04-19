<template>
  <div
      class="rel-toolbar"
      :class="['rel-toolbar-h-' + options.toolBarPositionH, 'rel-toolbar-v-' + options.toolBarPositionV, 'rel-toolbar-' + options.toolBarDirection]"
  >
    <div v-if="options.allowShowFullscreenMenu" title="全屏/退出全屏" class="c-mb-button" style="margin-top: 0px;" @click="relationGraph.fullscreen();">
      <svg class="rg-icon" aria-hidden="true"><use xlink:href="#icon-resize-"></use></svg>
    </div>
    <div v-if="options.allowShowZoomMenu" title="放大" class="c-mb-button" @click="relationGraph.zoom(20)">
      <svg class="rg-icon" aria-hidden="true"><use xlink:href="#icon-fangda"></use></svg>
    </div>
    <div v-if="options.allowShowZoomMenu" class="c-current-zoom" @dblclick="zoomToFit">{{ options.canvasZoom }}%</div>
    <div v-if="options.allowShowZoomMenu" title="缩小" class="c-mb-button" style="margin-top:0px;" @click="relationGraph.zoom(-20)">
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
    <slot />
    <div style="clear: both;"></div>
  </div>
</template>

<script lang="ts">
import { devLog } from '../../../../../relation-graph-models/utils/RGCommon';

export default {
  name: 'GraphMiniToolBar',
  data() {
    return {
    };
  },
  inject: ['graph', 'graphInstance'],
  computed: {
    relationGraph() {
      return this.graphInstance();
    },
    options() {
      return this.graph.options;
    }
  },
  mounted() {
  },
  methods: {
    refresh() {
      this.relationGraph.refresh();
    },
    switchLayout(layoutConfig) {
      devLog('change layout:', layoutConfig);
      this.relationGraph.switchLayout(layoutConfig);
    },
    toggleAutoLayout() {
      // devLog('this.options.autoLayouting', this.options.autoLayouting)
      this.relationGraph.toggleAutoLayout();
    },
    downloadAsImage() {
      // devLog('this.options.autoLayouting', this.options.autoLayouting)
      this.relationGraph.downloadAsImage('png');
    },
    async zoomToFit() {
      await this.relationGraph.setZoom(100);
      await this.relationGraph.moveToCenter();
      await this.relationGraph.zoomToFit();
    }
  }
};
</script>
<style lang="scss">
@import '../relation-graph-toolbar';
</style>
