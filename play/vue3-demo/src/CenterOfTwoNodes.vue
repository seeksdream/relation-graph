<template>
  <div>
    <div ref="myPage$" style="border: #efefef solid 1px; height: calc(100vh - 100px);width: 100%;">
      <RelationGraph ref="relationGraph$" :options="options" :onLineClick="onLineClick">
        <template #graph-plug>
          <!-- 将右键菜单的dom放在图片插槽中，这样即使全屏可视可见的 -->
          <div
              style="position: absolute;height:100px;width:100px;border:#ff0000 solid 1px;background-color: rgba(217,0,27,0.49);z-index: 999"
              :style="{
            'margin-left': contextMenuPosition.x + 'px',
            'margin-top': contextMenuPosition.y + 'px',
          }"
          ></div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
// import RelationGraph from 'relation-graph/vue3'
import RelationGraph from '../relation-graph-agent'
import type {RelationGraphInstance, RGLine, RGLink, RGNode} from '../relation-graph-agent';
const relationGraph$ = ref()
const myPage$ = ref()
const options = {
  defaultExpandHolderPosition: 'right',
  defaultNodeBorderWidth: 0,
  defaultNodeShape: 1,
  defaultLineShape: 1,
  debug: true,
  showDebugPanel: true,
}

const contextMenuPosition = reactive({ // 连线浮动层
  x: 0,
  y:0
});
const getClientCoordinateByCanvasCoordinate = (canvasCoordinate) => { // 将画布中的坐标转换为可视范围内的坐标
  const graphInstance:RelationGraphInstance = relationGraph$.value.getInstance();
  const _current_zoom = graphInstance.options.canvasZoom / 100; // 获取当前图谱的缩放比例
  const { NMCanvasStart } = graphInstance.analysisByZoom(_current_zoom); // 借助图谱的缩放分析方法analysisByZoom获取其返回值中的NMCanvasStart【画布起点在可视区域的坐标】
  // 将可视区域某坐标作为缩放中心点在可视区域中的映射
  const zoomCenter = {
    x: canvasCoordinate.x * _current_zoom + NMCanvasStart.x,
    y: canvasCoordinate.y * _current_zoom + NMCanvasStart.y,
  }
  // 获取缩放点（即可视区域某坐标，因为我们在上一步中以此坐标作为缩放点进行分析的）在可视区域坐标
  return {
    x: zoomCenter.x + graphInstance.options.canvasOffset.x,
    y: zoomCenter.y + graphInstance.options.canvasOffset.y,
  }
}

const getNodeCenter = (node:RGNode) => { // 获取节点的中心位置
  const centerX = node.x + (node.el.offsetWidth / 2)
  const centerY = node.y + (node.el.offsetHeight / 2)
  return {x:centerX, y:centerY};
}
const onLineClick = (line:RGLine, link:RGLink, e:(MouseEvent | TouchEvent)) => {
  console.log('----onLineClick:', line, link);
  const graphInstance:RelationGraphInstance = relationGraph$.value.getInstance();
  const graphRuntimeOptions = graphInstance.options;
  const canvasOffsetX = graphRuntimeOptions.canvasOffset.x;// 当前画布偏移量x
  const canvasOffsetY = graphRuntimeOptions.canvasOffset.y;
  const fromNodePositionOnCanvas = getNodeCenter(link.fromNode); // 获取from节点中心在画布上的的位置
  const toNodePositionOnCanvas = getNodeCenter(link.toNode); // 获取to节点中心在画布上的的位置
  const centerOfTwoNodesX = fromNodePositionOnCanvas.x + (toNodePositionOnCanvas.x - fromNodePositionOnCanvas.x) / 2; // 两点之间x中心
  const centerOfTwoNodesY = fromNodePositionOnCanvas.y + (toNodePositionOnCanvas.y - fromNodePositionOnCanvas.y) / 2; // 两点之间y中心
  const viewPoint = getClientCoordinateByCanvasCoordinate({x:centerOfTwoNodesX, y:centerOfTwoNodesY}); // 获取两点之间中心坐标在可视区域的映射点
  contextMenuPosition.x = viewPoint.x - canvasOffsetX; // 必须加上画布的偏移量，因为画布的偏移量就是相对于可视区域的
  contextMenuPosition.y = viewPoint.y - canvasOffsetY;
  return true;
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
      { id: 'se', text: 'se', },
      { id: 'sf', text: 'sf', },
    ],
    lines: [
      { from: 'a', to: 'b', text:'投资关系' },
      { from: 'a', to: 'c', text:'投资关系', },
      { from: 'a', to: 'd', text:'投资关系', },
      { from: 'a', to: 'e', text:'投资关系', },
      { from: 'a', to: 'f', text:'投资关系', },
      { from: 'c', to: 'sc', text:'投资关系', },
      { from: 'sc', to: 'se', text:'投资关系', },
      { from: 'sc', to: 'sf', text:'投资关系', },
    ],
  }
  const clearInvalidNodeAndLines = (graphData) => {
    const {nodes, lines} = graphData;
    const finalNodes = nodes.filter(node => node.id);// 这里会将id=0的也过滤掉，但不影响，因为id为数字也是不允许的。
    const finalLines = lines.filter(line => line.from && line.to);// 这里会将id=0的也过滤掉，但不影响，因为id为数字也是不允许的。
    graphData.nodes = finalNodes;
    graphData.lines = finalLines;
    return graphData;
  }
  clearInvalidNodeAndLines(jsonData);
  relationGraph$.value.setJsonData(jsonData, (rgInstance) => {
    console.log('setJsonData ok:', rgInstance.options.instanceId);
  })
})

</script>
<style scoped>
/*更改【展开】和【收缩】按钮的样式*/
:deep(.c-collapsed), :deep(.c-expanded){
  background-color: #7BA8FF !important;
}
</style>
