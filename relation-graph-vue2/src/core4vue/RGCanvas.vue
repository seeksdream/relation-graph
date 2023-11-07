<template>
  <div
      :style="{width: '100%',height : '100%', 'background-color': (options.backgroundColor || undefined), 'background-image': (options.backgroundImage ? ('url('+options.backgroundImage+')') : undefined)}"
      :class="[options.layoutClassName, (options.backgroundImageNoRepeat?'rel-map-background-norepeat':undefined)]"
      class="rel-map"
      @contextmenu.prevent="contextmenu($event)"
      @mousedown.left.stop="onDragStart($event)"
      @touchstart.stop="onDragStart($event)"
      @wheel="mouseListener">
    <div ref="seeksRGCanvas" :style="canvasSizeAndPosition" class="rel-map-canvas">
      <slot name="canvas-plug" />
      <RelationGraphSingleGraph>
        <template #node="{node}" >
          <slot :node="node" name="node" />
        </template>
        <template #line="{line, link}" >
          <slot :line="line" :link="link" name="line" />
        </template>
        <template #node-expand-holder="{nodeProps, expandHolderPosition, expandButtonClass, color, expandOrCollapseNode}">
          <slot
              name="node-expand-holder"
              :nodeProps="nodeProps"
              :expandHolderPosition="expandHolderPosition"
              :expandButtonClass="expandButtonClass"
              :color="color"
              :expandOrCollapseNode="expandOrCollapseNode"
          />
        </template>
      </RelationGraphSingleGraph>
    </div>
  </div>
</template>

<script lang="ts">
import SeeksRGNode from './RGNode';
import SeeksRGLink from './RGLink';
import SeeksRGLinePath from './RGLinePath';
import { devLog } from '../utils/RGCommon';
import RelationGraphSingleGraph from "./RGGraph.vue";

export default {
  name: 'RelationGraphCanvas',
  components: { RelationGraphSingleGraph, SeeksRGNode, SeeksRGLink, SeeksRGLinePath },
  data() {
    return {

    };
  },
  inject: ['graph'],
  computed: {
    options() {
      return this.graph.options;
    },
    relationGraph() {
      return this.graph.instance;
    },
    canvasSizeAndPosition() {
      return {
        'width': `${this.options.canvasSize.width  }px`,
        'height': `${this.options.canvasSize.height  }px`,
        'margin-left': `${this.options.canvasOffset.x  }px`,
        'margin-top': `${this.options.canvasOffset.y  }px`,
        'background-color': 'transparent',
        'transform': `scale(${  this.options.canvasZoom / 100  },${  this.options.canvasZoom / 100  })`
        // 'transform-origin': (this.options.canvasOffset.zoom_buff_x * 100).toFixed(2) + '% ' + (this.options.canvasOffset.zoom_buff_y * 100).toFixed(2) + '%'
      };
    }
  },
  watch: {
  },
  created() {
    devLog('[RGCanvas created]');
  },
  mounted() {
    devLog('[RGCanvas mounted]');
    this.relationGraph.setCanvasDom(this.$refs.seeksRGCanvas);
  },
  beforeDestroy() {
  },
  methods: {
    mouseListener(e) {
      this.relationGraph.onMouseWheel(e);
    },
    onDragStart(e) {
      this.relationGraph.onCanvasDragStart(e);
    },
    contextmenu(e) {
      this.relationGraph.onContextmenu(e);
    }
  }
};
</script>

