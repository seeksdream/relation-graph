<template>
  <div>
    <div class="my-graph" style="height: calc(100vh - 50px);">
      <div style="width:400px;border-radius: 10px;position: absolute;left:20px;top:20px;z-index: 20;padding:30px;background-color: #ffffff;border:#efefef solid 1px;box-shadow: 0 3px 9px rgba(0,21,41,.08);">
        <el-divider>Layout Options</el-divider>
        Max Layout Times: {{ graphOptions.layout.maxLayoutTimes }}
        <el-slider v-model="graphOptions.layout.maxLayoutTimes" :min="30" :max="5000" :step="100" :show-tooltip="true" />
        Node Repulsion: {{ graphOptions.layout.force_node_repulsion }}
        <el-slider v-model="graphOptions.layout.force_node_repulsion" :min="0.01" :step="0.05" :max="4" />
        Line Elastic: {{ graphOptions.layout.force_line_elastic }}
        <el-slider v-model="graphOptions.layout.force_line_elastic" :min="0.01" :step="0.05" :max="4" />
        <el-button size="mini" type="primary" @click="updateLayouterOptions">Apply</el-button>
      </div>
      <RelationGraph
        ref="graphRef"
        :options="graphOptions"
      >

        <template #node="{node}">
          <div class="my-node-style" :style="{'background-image': 'url(' + node.data.pic + ')'}">
          </div>
          <div class="c-node-name" :style="{'background-color':node.color}">{{node.text}}</div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import RelationGraph, { RGJsonData, RGNode, RGLine, RGUserEvent, RGOptions, RelationGraphComponent } from "../relation-graph-agent";
import SeeksForceLayouter from 'relation-graph/types/types/layouters/SeeksForceLayouter';

const testImages = [
  'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2308340537,462224207&fm=58&app=83&f=JPEG?w=250&h=250&s=EC708F46DA96B89CB69D5DDA0300D014',
  'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2677153550,2207805387&fm=58&app=83&f=JPEG?w=250&h=250&s=249039DDC2D153D411A851360300C062',
  'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1725297532,1915921796&fm=58&app=83&f=JPEG?w=250&h=250&s=FE8EA444A60759554DAC1DBB03000092',
  'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2025797948,1615296290&fm=58&app=83&f=JPEG?w=250&h=250&s=B5B04C331F32739C4604F9F503007021',
  'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=344720653,260255884&fm=58&app=83&f=JPEG?w=250&h=250&s=57B8AB676AE862941D94ED170300E060',
  'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3098576865,849900134&fm=58&app=83&f=JPEG?w=250&h=250&s=EDE01A63A65917DC104509920300C0C1',
  'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3722686698,2547355567&fm=58&app=83&f=JPEG?w=250&h=250&s=BF8A356E04E1B2BCEFA45D860100E0E1',
  'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=4266886844,1791850012&fm=58&s=66B01AC758BB67960834B8FA0300C011',
  'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2747443453,2680399969&fm=58&app=83&f=JPEG?w=150&h=150&s=DB8828C1562265150814ADFE03007012',
  'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3301823375,1282024443&fm=58&app=83&f=JPG?w=250&h=250&s=2BC2834F2C22A25D12C06CA80300E013',
  'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=134233720,666111889&fm=58&app=83&f=JPG?w=250&h=250&s=4DE5A844801F1BD461E039A20300C0C3',
  'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1215039713,3597142764&fm=58&app=83&f=JPEG?w=250&h=250&s=1A20E0018E3B6E9CD10C7DA30300E081',
  'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1140839330,2922201597&fm=58&app=83&f=JPEG?w=250&h=250&s=CDF9A844D45AB87512C8508B0100F080',
  'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2110325119,1633583088&fm=58&app=83&f=JPEG?w=120&h=120&s=971E35C05A43305DCA7C1C0B030080C',
  'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1416498138,2265298708&fm=58&app=83&f=JPEG?w=250&h=250&s=F906CF1C0E1356D046AC3CEB0300B0A0',
  'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3749144697,3456463661&fm=58&app=83&f=JPEG?w=250&h=250&s=783823D3FE621E94138CC08B030070C2',
  'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2263876103,310235844&fm=58&app=83&f=JPEG?w=250&h=250&s=6CE2A944CC1223DC632CC09203009082',
  'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3590139977,3135325708&fm=58&app=83&f=JPEG?w=250&h=250&s=2F1C8B46C4A214BCE100A81A03004091',
  'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2110325119,1633583088&fm=58&app=83&f=JPEG?w=120&h=120&s=971E35C05A43305DCA7C1C0B030080C',
  'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4153440298,254451173&fm=58&app=83&f=JPEG?w=250&h=250&s=07C2B4488C42D355548CC41F010080D1',
  'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=842795163,1346447987&fm=58&app=83&f=JPEG?w=250&h=250&s=2BC3736EE499247D41C0B4820100E093'
];
const testColors = ['#FF6138', '#FFBE53', '#80b006', '#198df1', '#2980B9', '#282741'];
const graphOptions = ref<RGOptions>({
    debug: true,
    'backgrounImageNoRepeat': true,
    'moveToCenterWhenRefresh': true,
    'zoomToFitWhenRefresh': true,
    useAnimationWhenRefresh: false,
    defaultLineColor: 'rgba(255, 255, 255, 0.6)',
    defaultNodeColor: 'rgba(255, 255, 255, 0.6)',
    defaultNodeBorderWidth: 1,
    defaultNodeBorderColor: 'rgba(255, 255, 255, 0.3)',
    defaultNodeFontColor: '#1b7702',
    defaultNodeShape: 0,
    defaultNodeWidth: 60,
    defaultNodeHeight: 60,
    toolBarDirection: 'h',
    toolBarPositionH: 'right',
    toolBarPositionV: 'bottom',
    defaultPloyLineRadius: 10,
    defaultLineShape: 1,
    performanceMode: true,
    layout: {
        layoutName: 'force',
        from: 'left',
        maxLayoutTimes: 300,
        force_node_repulsion: 1,
        force_line_elastic: 1
    }
});
const resizeTimer = ref();

const showGraph = async () => {
    const __graph_json_data_big: RGJsonData = { 'rootId': 'a', 'nodes': [{ 'id': 'a', 'text': 'a' }, { 'id': 'b', 'text': 'b' }, { 'id': 'b1', 'text': 'b1' }, { 'id': 'b1-1', 'text': 'b1-1' }, { 'id': 'b1-2', 'text': 'b1-2' }, { 'id': 'b1-3', 'text': 'b1-3' }, { 'id': 'b1-4', 'text': 'b1-4' }, { 'id': 'b1-5', 'text': 'b1-5' }, { 'id': 'b1-6', 'text': 'b1-6' }, { 'id': 'b2', 'text': 'b2' }, { 'id': 'b2-1', 'text': 'b2-1' }, { 'id': 'b2-2', 'text': 'b2-2' }, { 'id': 'b2-3', 'text': 'b2-3' }, { 'id': 'b2-4', 'text': 'b2-4' }, { 'id': 'b3', 'text': 'b3' }, { 'id': 'b3-1', 'text': 'b3-1' }, { 'id': 'b3-2', 'text': 'b3-2' }, { 'id': 'b3-3', 'text': 'b3-3' }, { 'id': 'b3-4', 'text': 'b3-4' }, { 'id': 'b3-5', 'text': 'b3-5' }, { 'id': 'b3-6', 'text': 'b3-6' }, { 'id': 'b3-7', 'text': 'b3-7' }, { 'id': 'b4', 'text': 'b4' }, { 'id': 'b4-1', 'text': 'b4-1' }, { 'id': 'b4-2', 'text': 'b4-2' }, { 'id': 'b4-3', 'text': 'b4-3' }, { 'id': 'b4-4', 'text': 'b4-4' }, { 'id': 'b4-5', 'text': 'b4-5' }, { 'id': 'b4-6', 'text': 'b4-6' }, { 'id': 'b4-7', 'text': 'b4-7' }, { 'id': 'b4-8', 'text': 'b4-8' }, { 'id': 'b4-9', 'text': 'b4-9' }, { 'id': 'b5', 'text': 'b5' }, { 'id': 'b5-1', 'text': 'b5-1' }, { 'id': 'b5-2', 'text': 'b5-2' }, { 'id': 'b5-3', 'text': 'b5-3' }, { 'id': 'b5-4', 'text': 'b5-4' }, { 'id': 'b6', 'text': 'b6' }, { 'id': 'b6-1', 'text': 'b6-1' }, { 'id': 'b6-2', 'text': 'b6-2' }, { 'id': 'b6-3', 'text': 'b6-3' }, { 'id': 'b6-4', 'text': 'b6-4' }, { 'id': 'b6-5', 'text': 'b6-5' }, { 'id': 'c', 'text': 'c' }, { 'id': 'c1', 'text': 'c1' }, { 'id': 'c1-1', 'text': 'c1-1' }, { 'id': 'c1-2', 'text': 'c1-2' }, { 'id': 'c1-3', 'text': 'c1-3' }, { 'id': 'c1-4', 'text': 'c1-4' }, { 'id': 'c1-5', 'text': 'c1-5' }, { 'id': 'c1-6', 'text': 'c1-6' }, { 'id': 'c1-7', 'text': 'c1-7' }, { 'id': 'c2', 'text': 'c2' }, { 'id': 'c2-1', 'text': 'c2-1' }, { 'id': 'c2-2', 'text': 'c2-2' }, { 'id': 'c3', 'text': 'c3' }, { 'id': 'c3-1', 'text': 'c3-1' }, { 'id': 'c3-2', 'text': 'c3-2' }, { 'id': 'c3-3', 'text': 'c3-3' }, { 'id': 'd', 'text': 'd' }, { 'id': 'd1', 'text': 'd1' }, { 'id': 'd1-1', 'text': 'd1-1' }, { 'id': 'd1-2', 'text': 'd1-2' }, { 'id': 'd1-3', 'text': 'd1-3' }, { 'id': 'd1-4', 'text': 'd1-4' }, { 'id': 'd1-5', 'text': 'd1-5' }, { 'id': 'd1-6', 'text': 'd1-6' }, { 'id': 'd1-7', 'text': 'd1-7' }, { 'id': 'd1-8', 'text': 'd1-8' }, { 'id': 'd2', 'text': 'd2' }, { 'id': 'd2-1', 'text': 'd2-1' }, { 'id': 'd2-2', 'text': 'd2-2' }, { 'id': 'd3', 'text': 'd3' }, { 'id': 'd3-1', 'text': 'd3-1' }, { 'id': 'd3-2', 'text': 'd3-2' }, { 'id': 'd3-3', 'text': 'd3-3' }, { 'id': 'd3-4', 'text': 'd3-4' }, { 'id': 'd3-5', 'text': 'd3-5' }, { 'id': 'd4', 'text': 'd4' }, { 'id': 'd4-1', 'text': 'd4-1' }, { 'id': 'd4-2', 'text': 'd4-2' }, { 'id': 'd4-3', 'text': 'd4-3' }, { 'id': 'd4-4', 'text': 'd4-4' }, { 'id': 'd4-5', 'text': 'd4-5' }, { 'id': 'd4-6', 'text': 'd4-6' }, { 'id': 'e', 'text': 'e' }, { 'id': 'e1', 'text': 'e1' }, { 'id': 'e1-1', 'text': 'e1-1' }, { 'id': 'e1-2', 'text': 'e1-2' }, { 'id': 'e1-3', 'text': 'e1-3' }, { 'id': 'e1-4', 'text': 'e1-4' }, { 'id': 'e1-5', 'text': 'e1-5' }, { 'id': 'e1-6', 'text': 'e1-6' }, { 'id': 'e2', 'text': 'e2' }, { 'id': 'e2-1', 'text': 'e2-1' }, { 'id': 'e2-2', 'text': 'e2-2' }, { 'id': 'e2-3', 'text': 'e2-3' }, { 'id': 'e2-4', 'text': 'e2-4' }, { 'id': 'e2-5', 'text': 'e2-5' }, { 'id': 'e2-6', 'text': 'e2-6' }, { 'id': 'e2-7', 'text': 'e2-7' }, { 'id': 'e2-8', 'text': 'e2-8' }, { 'id': 'e2-9', 'text': 'e2-9' }], 'lines': [{ 'from': 'a', 'to': 'b' }, { 'from': 'b', 'to': 'b1' }, { 'from': 'b1', 'to': 'b1-1' }, { 'from': 'b1', 'to': 'b1-2' }, { 'from': 'b1', 'to': 'b1-3' }, { 'from': 'b1', 'to': 'b1-4' }, { 'from': 'b1', 'to': 'b1-5' }, { 'from': 'b1', 'to': 'b1-6' }, { 'from': 'b', 'to': 'b2' }, { 'from': 'b2', 'to': 'b2-1' }, { 'from': 'b2', 'to': 'b2-2' }, { 'from': 'b2', 'to': 'b2-3' }, { 'from': 'b2', 'to': 'b2-4' }, { 'from': 'b', 'to': 'b3' }, { 'from': 'b3', 'to': 'b3-1' }, { 'from': 'b3', 'to': 'b3-2' }, { 'from': 'b3', 'to': 'b3-3' }, { 'from': 'b3', 'to': 'b3-4' }, { 'from': 'b3', 'to': 'b3-5' }, { 'from': 'b3', 'to': 'b3-6' }, { 'from': 'b3', 'to': 'b3-7' }, { 'from': 'b', 'to': 'b4' }, { 'from': 'b4', 'to': 'b4-1' }, { 'from': 'b4', 'to': 'b4-2' }, { 'from': 'b4', 'to': 'b4-3' }, { 'from': 'b4', 'to': 'b4-4' }, { 'from': 'b4', 'to': 'b4-5' }, { 'from': 'b4', 'to': 'b4-6' }, { 'from': 'b4', 'to': 'b4-7' }, { 'from': 'b4', 'to': 'b4-8' }, { 'from': 'b4', 'to': 'b4-9' }, { 'from': 'b', 'to': 'b5' }, { 'from': 'b5', 'to': 'b5-1' }, { 'from': 'b5', 'to': 'b5-2' }, { 'from': 'b5', 'to': 'b5-3' }, { 'from': 'b5', 'to': 'b5-4' }, { 'from': 'b', 'to': 'b6' }, { 'from': 'b6', 'to': 'b6-1' }, { 'from': 'b6', 'to': 'b6-2' }, { 'from': 'b6', 'to': 'b6-3' }, { 'from': 'b6', 'to': 'b6-4' }, { 'from': 'b6', 'to': 'b6-5' }, { 'from': 'a', 'to': 'c' }, { 'from': 'c', 'to': 'c1' }, { 'from': 'c1', 'to': 'c1-1' }, { 'from': 'c1', 'to': 'c1-2' }, { 'from': 'c1', 'to': 'c1-3' }, { 'from': 'c1', 'to': 'c1-4' }, { 'from': 'c1', 'to': 'c1-5' }, { 'from': 'c1', 'to': 'c1-6' }, { 'from': 'c1', 'to': 'c1-7' }, { 'from': 'c', 'to': 'c2' }, { 'from': 'c2', 'to': 'c2-1' }, { 'from': 'c2', 'to': 'c2-2' }, { 'from': 'c', 'to': 'c3' }, { 'from': 'c3', 'to': 'c3-1' }, { 'from': 'c3', 'to': 'c3-2' }, { 'from': 'c3', 'to': 'c3-3' }, { 'from': 'a', 'to': 'd' }, { 'from': 'd', 'to': 'd1' }, { 'from': 'd1', 'to': 'd1-1' }, { 'from': 'd1', 'to': 'd1-2' }, { 'from': 'd1', 'to': 'd1-3' }, { 'from': 'd1', 'to': 'd1-4' }, { 'from': 'd1', 'to': 'd1-5' }, { 'from': 'd1', 'to': 'd1-6' }, { 'from': 'd1', 'to': 'd1-7' }, { 'from': 'd1', 'to': 'd1-8' }, { 'from': 'd', 'to': 'd2' }, { 'from': 'd2', 'to': 'd2-1' }, { 'from': 'd2', 'to': 'd2-2' }, { 'from': 'd', 'to': 'd3' }, { 'from': 'd3', 'to': 'd3-1' }, { 'from': 'd3', 'to': 'd3-2' }, { 'from': 'd3', 'to': 'd3-3' }, { 'from': 'd3', 'to': 'd3-4' }, { 'from': 'd3', 'to': 'd3-5' }, { 'from': 'd', 'to': 'd4' }, { 'from': 'd4', 'to': 'd4-1' }, { 'from': 'd4', 'to': 'd4-2' }, { 'from': 'd4', 'to': 'd4-3' }, { 'from': 'd4', 'to': 'd4-4' }, { 'from': 'd4', 'to': 'd4-5' }, { 'from': 'd4', 'to': 'd4-6' }, { 'from': 'a', 'to': 'e' }, { 'from': 'e', 'to': 'e1' }, { 'from': 'e1', 'to': 'e1-1' }, { 'from': 'e1', 'to': 'e1-2' }, { 'from': 'e1', 'to': 'e1-3' }, { 'from': 'e1', 'to': 'e1-4' }, { 'from': 'e1', 'to': 'e1-5' }, { 'from': 'e1', 'to': 'e1-6' }, { 'from': 'e', 'to': 'e2' }, { 'from': 'e2', 'to': 'e2-1' }, { 'from': 'e2', 'to': 'e2-2' }, { 'from': 'e2', 'to': 'e2-3' }, { 'from': 'e2', 'to': 'e2-4' }, { 'from': 'e2', 'to': 'e2-5' }, { 'from': 'e2', 'to': 'e2-6' }, { 'from': 'e2', 'to': 'e2-7' }, { 'from': 'e2', 'to': 'e2-8' }, { 'from': 'e2', 'to': 'e2-9' }] };

    const data =  __graph_json_data_big;
    const newNodes = [];
    const newLines = [];
    for (const node of data.nodes) {
        if (node.id.includes('-')) {
            for (let i=1;i<=38;i++) {
                newNodes.push({ id: node.id + '-' + i, text: node.text + '-' + i});
                newLines.push({ from: node.id, to: node.id + '-' + i});
            }
        }
    }
    data.nodes.push(...newNodes);
    data.lines.push(...newLines);
    for (const node of data.nodes) {
        const nodeImageIndex = Math.floor(Math.random() * testImages.length);
        const nodeColorIndex = Math.floor(Math.random() * testColors.length);
        node.color = testColors[nodeColorIndex];
        node.data = {
            pic: testImages[nodeImageIndex]
        };
    }
    for (const line of data.lines) {
        const nodeColorIndex = Math.floor(Math.random() * testColors.length);
        line.color = testColors[nodeColorIndex];
    }
    const graphInstance = graphRef.value!.getInstance();
    await stopForceIfNeed();
    await graphInstance.setJsonData(data);
    await graphInstance.setZoom(30);
};

const stopForceIfNeed = async () => {
    const graphInstance = graphRef.value!.getInstance();
    await graphInstance.stopAutoLayout();
};

const updateLayouterOptions = async () => {
    await stopForceIfNeed();
    const graphInstance = graphRef.value!.getInstance();
    const forceLayouter = graphInstance.layouter as SeeksForceLayouter;
    forceLayouter.maxLayoutTimes = graphOptions.value.layout!.maxLayoutTimes;
    forceLayouter.force_node_repulsion = graphOptions.value.layout!.force_node_repulsion;
    forceLayouter.force_line_elastic = graphOptions.value.layout!.force_line_elastic;
    setTimeout(async () => {
        await graphInstance.startAutoLayout();
    }, 500);
};

const graphRef = ref<RelationGraphComponent | null>(null);

onMounted(() => {
    showGraph();
    // resizeTimer.value = setInterval(async () => {
    //     const graphInstance = graphRef.value!.getInstance();
    //     await graphInstance.zoomToFit();
    // }, 3000);
});

onUnmounted(() => {
    console.log('beforeUnmount: clear timer');
    clearInterval(resizeTimer.value);
});
</script>

<style>
</style>

<style lang="scss" scoped>
::v-deep(.relation-graph) {
  .rel-node-shape-0{
    padding:3px;
  }
  .rel-toolbar{
    color: rgb(20, 89, 254);
    background-color: #ffffff;
    .c-current-zoom{
      color: rgb(20, 89, 254);
    }
  }
  .rel-map {
    background: none !important;
    .rel-node-shape-1 {
    }
  }
}
// ------------------------Node slot---------------------------------
.my-node-style{
  background-position: center center;
  background-size: 100%;
  height:100%;
  width:100%;
  border-radius: 40px;
  overflow: visible;
}
.c-node-name{
  width:60px;
  text-align:center;
  color: #ffffff;
  margin-top: 6px;
  border-radius: 8px;
}
.my-graph{
  //background: linear-gradient(to right, rgb(16, 185, 129), rgb(101, 163, 13));
  background-color: #ffffff;
}
@keyframes AnimationRound {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.c-round{
}
.c-round:hover{
  animation: AnimationRound 2s infinite;
}
</style>
