<script lang="ts" setup>
import { computed, inject, onMounted, ref } from 'vue'
import { devLog } from '../../../../../relation-graph-vue2/src/utils/RGCommon'
import {graphInstanceKey, graphKey} from '../../../constants'
import type {RGUserEvent} from '../../../../../relation-graph-vue2/src/types'
import RelationGraphSingleGraph from './RGGraph.vue'

const seeksRGCanvas = ref<HTMLDivElement>()
const graphInstance$ = inject(graphInstanceKey)
const graph = inject(graphKey)

const options = computed(() => {
  return graph!.options!;
})
const mouseListener = (e:WheelEvent) => {
  graphInstance$?.value!.onMouseWheel(e);
}
const onDragStart = (e:RGUserEvent) => {
  graphInstance$?.value!.onCanvasDragStart(e);
}
const contextmenu = (e:RGUserEvent) => {
  graphInstance$?.value!.onContextmenu(e);
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
  graphInstance$?.value!.setCanvasDom(seeksRGCanvas.value!)
})
</script>
<template>
  <div
      :style="{width: '100%',height : '100%', 'background-color': (options.backgroundColor || undefined), 'background-image': (options.backgroundImage ? ('url('+options.backgroundImage+')') : undefined)}"
      :class="[options.layoutClassName, (options.backgroundImageNoRepeat?'rel-map-background-norepeat':'')]"
      class="rel-map"
      @contextmenu.prevent="contextmenu($event)"
      @mousedown.left.stop="onDragStart($event)"
      @touchstart.stop="onDragStart($event)"
      @wheel.stop="mouseListener">
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
<style scoped>
</style>
