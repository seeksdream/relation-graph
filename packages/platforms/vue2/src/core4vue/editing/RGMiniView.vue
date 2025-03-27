<template>
  <div
    class="rel-miniview"
    :class="['rel-miniview-' + position]"
    ref="rgMiniView"
  >
    <canvas
      ref="rgMiniViewCanvas"
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

<script lang="ts">
import {RGUserEvent} from "../../../../../relation-graph-models/types";

export default {
  name: 'RGMiniView',
  components: {},
  props: {
    position: {
      mustUseProp: false,
      default: 'br',
      type: String
    },
    width: {
      mustUseProp: false,
      default: '200px',
      type: String
    },
    height: {
      mustUseProp: false,
      default: '200px',
      type: String
    }
  },
  inject: ['graph', 'graphInstance'],
  computed: {
    options() {
      return this.graph.options;
    },
    relationGraph() {
      return this.graphInstance();
    }
  },
  data() {
    return {
    };
  },
  mounted() {
    this.options.showMiniView = true;
    this.$refs.rgMiniView.style.setProperty('--mv-width', this.width);
    this.$refs.rgMiniView.style.setProperty('--mv-height', this.height);
    this.relationGraph.setMiniViewCanvas(this.$refs.rgMiniViewCanvas);
  },
  methods: {
    onMouseDown(e: RGUserEvent) {
      this.relationGraph.onVisiableViewHandleDragStart(e);
    },
    onClickCanvas(e: RGUserEvent) {
      this.relationGraph.resetByVisiableView(e);
    }
  },
  beforeDestroy() {
    this.options.showMiniView = false;
  }
};
</script>

<style scoped>
</style>
