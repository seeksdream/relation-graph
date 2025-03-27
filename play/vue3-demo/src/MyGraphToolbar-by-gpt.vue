<template>
  <div style="position: absolute;z-index: 30;top:10px;left: 40px; padding:10px;width:400px;height:70px;background-color: #ffffff;border:#efefef solid 1px;box-shadow: 0 3px 9px rgba(0,21,41,.08);border-radius: 10px;">
    <div v-if="graph">
      <div class="c-mb-button" @click="onSave">
        <i class="el-icon-upload" /><!-- 这里的图标需要自行替换为你的项目支持的，比如现在使用的是element-ui/element-plus支持的图标 -->
        <span class="c-mb-text">保存</span>
      </div>
      <div class="c-mb-button" style="line-height:40px;font-size: 12px;text-align: center;" @click="zoomToFit">
        {{ options.canvasZoom }}%
      </div>
      <div class="c-mb-button c-mb-button-c" :class="{'c-mb-button-on':options.creatingNodePlot}" style="width: 50px;" @click="startAddNode">
        <i class="el-icon-football" /><!-- 这里的图标需要自行替换为你的项目支持的，比如现在使用的是element-ui/element-plus支持的图标 -->
        <span class="c-mb-text">节点</span>
      </div>
      <div class="c-mb-button c-mb-button-c" :class="{'c-mb-button-on':options.creatingLinePlot}" style="width: 50px;" @click="startAddLine">
        <i class="el-icon-share" /><!-- 这里的图标需要自行替换为你的项目支持的，比如现在使用的是element-ui/element-plus支持的图标 -->
        <span class="c-mb-text">线条</span>
      </div>
      <div class="c-mb-button" @click="zoomToFit">
        <i class="el-icon-full-screen" /><!-- 这里的图标需要自行替换为你的项目支持的，比如现在使用的是element-ui/element-plus支持的图标 -->
        <span class="c-mb-text">适应</span>
      </div>
      <div class="c-mb-button" @click="refresh">
        <i class="el-icon-refresh-right" /><!-- 这里的图标需要自行替换为你的项目支持的，比如现在使用的是element-ui/element-plus支持的图标 -->
        <span class="c-mb-text">刷新</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, inject, onMounted, computed, Ref, App, getCurrentInstance} from 'vue';
// import RelationGraph, {graphInstanceKey, graphKey} from "../relation-graph-agent";
import RelationGraph, {graphKey, graphInstanceKey} from "relation-graph/vue3";
import type {RGNode, RGPosition, RelationGraphInstance, RGGraphData, RGGraphReactiveData} from "relation-graph/vue3";
console.log('graphKey:', graphKey);
console.log('graphInstanceKey:', graphInstanceKey);
const graphInstance$ = inject(graphInstanceKey)
const graph = inject(graphKey)
const newNodeIdIndex = ref(1);
const newLineIdIndex = ref(1);
// const graph: RGGraphReactiveData = inject(graphKey) as RGGraphReactiveData;
// const relationGraph: Ref<RelationGraphInstance> = inject(graphInstanceKey) as Ref<RelationGraphInstance>;

const options = computed(() => {
  return graph && graph.options;
})

const refresh = () => {
  graphInstance$.value.refresh();
};

const switchLayout = (layoutConfig) => {
  graphInstance$.value.switchLayout(layoutConfig, true);
  refresh();
};

const toggleAutoLayout = () => {
  graphInstance$.value.toggleAutoLayout();
};

const downloadAsFile = (format) => {
  alert('download as :' + format);
};

const zoomToFit = async () => {
  await graphInstance$.value.setZoom(100);
  await graphInstance$.value.moveToCenter();
  await graphInstance$.value.zoomToFit();
};

const startAddNode = (e) => {
  graphInstance$.value.startCreatingNodePlot(e, {
    templateText: 'Node',
    templateStyleClass: 'my-node-template',
    onCreateNode: (x, y) => {
      console.log('新增节点：', x, y);
      const newId = newNodeIdIndex.value++;
      graphInstance$.value.addNodes([
        {
          id: 'newNode-' + newId,
          text: '新节点' + newId,
          color: '#5da0f8',
          x: x,
          y: y
        }
      ]);
    }
  });
};

const startAddLine = (e) => {
  graphInstance$.value.startCreatingLinePlot(e, {
    onCreateLine: (from: RGNode, to:  RGNode) => {
      if (to.id) { // If the end position of the line is a node
        const newLineId = newLineIdIndex.value++;
        graphInstance$.value.addLines([
          {
            from: from.id,
            to: to.id,
            lineWidth: 3,
            color: '#8080ff',
            text: '新连线' + newLineId
          }
        ]);
      }
    }
  });
};

const onSave = () => {
  // const jsonData = relationGraph.getGraphJsonData();
  // 调用后端接口将数据jsonData保存到后台
  alert('保存');
};
</script>

<style scoped>
@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(1440deg); }
}
.rg-icon {
  width: 16px;
  height: 16px;
  vertical-align: -3px;
  fill: currentColor;
  overflow: hidden;
}
.c-mb-button{
  height:50px;
  width:50px;
  padding-top:5px;
  background-color: #ffffff;
  opacity: 1;
  text-align: center;
  cursor: pointer;
  color: #999999;
  font-size: 18px;
  float: left;
  box-sizing:border-box;
  position: relative;
  border-radius: 5px;
}
.c-mb-button .c-mb-text{
  display: inline-block;
  height:14px;
  width:42px;
  font-size: 12px;
  line-height: 12px;
  margin-top:24px;
  margin-left:-28px;
  position: absolute;
  color: #262626;
}
@media screen and (min-width: 500px) and (min-height: 500px) {
  .c-mb-button:hover{
    background-color: #00bb00;
    border-top: #00bb00 solid 1px;
    color: #ffffff;
  }
  .c-mb-button:hover .c-mb-text,.c-mb-button-on .c-mb-text{
    color: #ffffff;
  }
}

.c-mb-button-on{
  background-color: #2E74B5;
  border-top: #2E4E8F solid 1px;
  color: #ffffff;
}
.c-loading-icon{
  animation:turn 1s linear infinite;
}
@keyframes turn{
  0%{-webkit-transform:rotate(0deg);}
  25%{-webkit-transform:rotate(90deg);}
  50%{-webkit-transform:rotate(180deg);}
  75%{-webkit-transform:rotate(270deg);}
  100%{-webkit-transform:rotate(360deg);}
}
</style>
<style>
/*new node style*/
.my-node-template{
  background-color: #8080ff !important;
  color: #ffffff !important;
}
</style>
