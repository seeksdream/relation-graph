<template>
  <div>
    <div style="border: #efefef solid 1px; height: calc(100vh - 100px);width: 100%;">
      <RelationGraph ref="relationGraph$" :options="options" :on-node-click="onNodeClick" @node-drag-start="onNodeDragStart">
        <template #node="{node}">
          <div style="width: 80px;height:80px;line-height: 80px;background-color: #7BA8FF;border-radius: 5px;" @mouseover="onMouseOverNode(node)" @mouseout="onMouseOutNode(node)">
            {{ node.text }}
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
// import RelationGraph from 'relation-graph/vue3'
import RelationGraph, {RGUserEvent} from "../relation-graph-agent";
import type { RGNode } from 'relation-graph/vue3';
const relationGraph$ = ref()
const options = {
  defaultExpandHolderPosition: 'right',
  defaultNodeBorderWidth: 0,
  defaultNodeShape: 1,
  defaultLineShape: 1,
  debug: false,
  // disableZoom: true,
  showDebugPanel: true,
  useAnimationWhenRefresh: true,
  moveToCenterWhenRefresh: true,
  placeOtherGroup: true,
  layout: {
    layoutName: 'center',
    centerOffset_x: 300,
    centerOffset_y: -200,
  }
}
const onNodeClick = (node:RGNode, e: RGUserEvent) => {
  console.log('onNodeClick:', node.id);
  return true;
}
const onNodeDragStart = (nodeObject: RGNode, $event: RGUserEvent) => {
  console.log('onNodeDragStart:', nodeObject, $event);
};
const onMouseOverNode = (node: RGNode) => {
  console.log('----onMouseOverNode:', node.text);
}
const onMouseOutNode = (node: RGNode) => {
  console.log('----onMouseOutNode:', node.text);
}
onMounted(() => {
  const jsonData = {
    rootId: 'a',
    nodes: [
      { id: 'a', text: 'xxxxx' },
      { id: 'b', text: 'b', },
      { id: 'c', text: 'c', },
      { id: 'd', text: 'd', },
      { id: 'e', text: 'e', },
      { id: 'f', text: 'f', },
      { id: 'sc', text: 'sc', },
      { id: 'sd', text: 'sd', },
      { id: 'se', text: 'se', },
      { id: 'sf', text: 'sf', },
    ],
    lines: [
      { from: 'a', to: 'b', },
      { from: 'a', to: 'c', },
      { from: 'a', to: 'd', },
      { from: 'a', to: 'e', },
      { from: 'a', to: 'f', },
      { from: 'sc', to: 'se', },
      { from: 'sc', to: 'sf', },
    ],
  }
  relationGraph$.value.setJsonData(jsonData, (rgInstance) => {
    console.log('setJsonData ok:', rgInstance.options.instanceId);
    setTimeout(() => {
      rgInstance.focusNodeById('se');
    }, 3000);
  })
})

</script>
<style scoped>
/*更改【展开】和【收缩】按钮的样式*/
:deep(.c-collapsed), :deep(.c-expanded){
  background-color: #7BA8FF !important;
}
</style>
