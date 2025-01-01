<template>
  <div
      :style="{width: '100%',height : '100%', 'background-color': (options.backgroundColor || undefined), 'background-image': (options.backgroundImage ? ('url('+options.backgroundImage+')') : undefined)}"
      class="rel-map"
      :class="[(options.canvasOpacity === 1 && 'rel-map-ready'), options.layoutClassName, (options.backgroundImageNoRepeat?'rel-map-background-norepeat':undefined)]"
      @contextmenu.prevent="contextmenu($event)"
      @mousedown.left="onDragStart($event)"
      @touchstart="onDragStart($event)"
      @wheel="mouseListener">
      <RGEasyView />
    <div ref="seeksRGCanvas" :style="canvasSizeAndPosition" class="rel-map-canvas">
      <div class="rel-canvas-slot rel-canvas-slot-behind">
        <slot name="canvas-plug" />
      </div>
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
      <div class="rel-canvas-slot rel-canvas-slot-above">
        <slot name="canvas-plug-above" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SeeksRGNode from './RGNode.vue';
import SeeksRGLink from './RGLink.vue';
import SeeksRGLinePath from './RGLinePath.vue';
import { devLog } from '../../../../relation-graph-models/utils/RGCommon';
import RelationGraphSingleGraph from "./RGGraph.vue";
import RGEasyView from "./RGEasyView.vue";

export default {
  name: 'RelationGraphCanvas',
  components: {RGEasyView, RelationGraphSingleGraph, SeeksRGNode, SeeksRGLink, SeeksRGLinePath },
  data() {
    return {

    };
  },
  inject: ['graph', 'graphInstance'],
  computed: {
    options() {
      return this.graph.options;
    },
    relationGraph() {
      return this.graphInstance();
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

