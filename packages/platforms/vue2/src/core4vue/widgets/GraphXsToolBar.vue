<template>
  <div
      class="rel-toolbar rel-xs-toolbar"
      :class="['rel-toolbar-h-' + positionH, 'rel-toolbar-v-' + positionV, 'rel-toolbar-' + direction]"
  >
    <div v-if="options.allowShowFullscreenMenu" title="Full Screen" class="c-mb-button" style="margin-top: 0px;" @click="relationGraph.fullscreen();">
      <svg t="1712757785584" class="rg-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path d="M298.666667 597.333333H213.333333v213.333334h213.333334v-85.333334H298.666667v-128z m-85.333334-170.666666h85.333334V298.666667h128V213.333333H213.333333v213.333334z m512 298.666666h-128v85.333334h213.333334v-213.333334h-85.333334v128zM597.333333 213.333333v85.333334h128v128h85.333334V213.333333h-213.333334z" p-id="7390"></path></svg>
    </div>
    <div v-if="options.allowShowZoomMenu" class="c-mb-button" @click="relationGraph.zoom(20)">
      <svg class="rg-icon" aria-hidden="true"><use xlink:href="#icon-fangda"></use></svg>
    </div>
    <div v-if="options.allowShowZoomMenu" class="c-current-zoom" @click="zoomToFit">{{ options.canvasZoom }}%</div>
    <div v-if="options.allowShowZoomMenu" class="c-mb-button" style="margin-top:0px;" @click="relationGraph.zoom(-20)">
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

<script lang="ts">
import { devLog } from '../../../../../relation-graph-models/utils/RGCommon';

export default {
  name: 'GraphXsToolBar',
  data() {
    return {
    };
  },
  props: {
    direction: {
      mustUseProp: false,
      default: 'h',
      type: String
    },
    positionH: {
      mustUseProp: false,
      default: 'left',
      type: String
    },
    positionV: {
      mustUseProp: false,
      default: 'bottom',
      type: String
    }
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
