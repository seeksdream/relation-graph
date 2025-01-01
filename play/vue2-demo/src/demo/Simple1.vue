<template>
  <div>
    <div style="height: calc(100vh - 50px)">
      <RelationGraph
        ref="seeksRelationGraph"
        :options="graphOptions"
        :on-node-click="onNodeClick"
        :on-line-click="onLineClick"
        :on-node-drag-start="onNodeDragStart"
      />
    </div>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from "relation-graph";
export default {
  name: 'Demo',
  components: { },
  data() {
    return {
      isShowCodePanel: false,
      graphOptions: {
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        defaultJunctionPoint: 'border',
        defaultNodeColor:'#000000',
        defaultNodeFontColor:'#ffffff',
        // defaultNodeBorderColor:'',
        defaultNodeBorderWidth:0,
        placeOtherGroup: true
        // isMoveByParentNode:true,
        // defaultNodeWidth:0,
        // defaultNodeHeight:0
      },
    };
  },
  mounted() {
    this.showSeeksGraph();
  },
  methods: {
    showSeeksGraph() {
      const __graph_json_data = {
        rootId: 'N3',
        nodes: [
          { id: 'N4', text: 'N4', styleClass: 'my-node-style-class' },
          { id: 'N5', text: 'N5' },
          { id: 'N6', text: 'N6' },
          { id: 'N7', text: 'N7' },
          { id: 'N3', text: 'N3' },
          { id: 'N9', text: '152****3393' },
          { id: '1N3', text: '1N3', fixed: true, x:600,y:300 },
          { id: '1N4', text: '1N4' },
          { id: '1N5', text: '1N5' },
          { id: '1N6', text: '1N6' },
          { id: '1N7', text: '1N7' },
          { id: '1N9', text: '152****3393' },
          { id: '2N81', text: '88****1' },
          { id: '2N82', text: '88****2' },
        ],
        lines: [
          { from: 'N3', to: 'N9', text: 'Share' },
          { from: 'N3', to: 'N4', text: 'Share444' },
          { from: 'N3', to: 'N5', text: 'Share555' },
          { from: 'N3', to: 'N6', text: 'Share666' },
          { from: 'N3', to: 'N7', text: 'Share777' },
          { from: 'N9', to: 'N4', text: 'Sharex' },
          { from: '1N3', to: '1N9', text: 'Share' },
          { from: '1N3', to: '1N4', text: 'Share444' },
          { from: '1N3', to: '1N5', text: 'Share555' },
          { from: '1N3', to: '1N6', text: 'Share666' },
          { from: '1N3', to: '1N7', text: 'Share777' },
          { from: '1N9', to: '1N4', text: 'Sharex' }
        ],
      };
      this.$refs.seeksRelationGraph.setJsonData(
        __graph_json_data,
        (graphInstance) => {
          // 这些写上当图谱初始化完成后需要执行的代码
        }
      );
    },
    onNodeClick(nodeObject, $event) {
      console.log('onNodeClick:', nodeObject);
      // this.graphOptions.layouts = [
      //   {
      //     layoutName: 'center'
      //   }
      // ]
      // this.$refs.seeksRelationGraph.setOptions(this.graphOptions)
    },
    onLineClick(lineObject, $event) {
      console.log('onLineClick:', lineObject);
    },
    onNodeDragStart(nodeObject, $event) {
      console.log('onNodeDragStart:', nodeObject);
    },
  },
};
</script>
