<script lang="ts" setup>
import { computed, inject, onMounted, ref } from 'vue'
import { devLog } from '../../../../../../relation-graph-models/utils/RGCommon'
import {graphInstanceKey, graphKey} from '../../../constants'
import type {RGUserEvent} from '../../../../../../relation-graph-models/types'
import RelationGraphSingleGraph from './RGGraph.vue'
import RGEasyView from "./RGEasyView.vue";

const seeksRGCanvas = ref<HTMLDivElement>()
// const graphInstance$ = inject(graphInstanceKey)
const graph = inject(graphKey)

const options = computed(() => {
  return graph!.options!;
})
const mouseListener = (e:WheelEvent) => {
  graph.instance!.onMouseWheel(e);
}
const onDragStart = (e:RGUserEvent) => {
  graph.instance!.onCanvasDragStart(e);
}
const contextmenu = (e:RGUserEvent) => {
  graph.instance!.onContextmenu(e);
}

const canvasSizeAndPosition = computed(() => {
  return {
    width: `${options.value.canvasSize.width}px`,
    height: `${options.value.canvasSize.height}px`,
    'margin-left': `${options.value.canvasOffset.x}px`,
    'margin-top': `${options.value.canvasOffset.y}px`,
    'background-color': 'transparent',
    transform: `scale(${options.value.canvasZoom / 100},${
        options.value.canvasZoom / 100
    })`,
    // 'transform-origin': (this.options.canvasOffset.zoom_buff_x * 100).toFixed(2) + '% ' + (this.options.canvasOffset.zoom_buff_y * 100).toFixed(2) + '%'
  }
})
onMounted(() => {
  devLog('[RGCanvas mounted]')
  graph.instance!.setCanvasDom(seeksRGCanvas.value!)
})
</script>
<template>
  <div
      :style="{width: '100%',height : '100%', 'background-color': (options.backgroundColor || undefined), 'background-image': (options.backgroundImage ? ('url('+options.backgroundImage+')') : undefined)}"
      :class="[(options.canvasOpacity === 1 && 'rel-map-ready'),options.layoutClassName, (options.backgroundImageNoRepeat?'rel-map-background-norepeat':'')]"
      class="rel-map"
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
<style scoped>
</style>
