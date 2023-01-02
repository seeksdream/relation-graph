<template>
  <div>
    <div style="height:50px;padding-top:6px;padding-left: 30px;padding-right:30px;border-bottom: #efefef solid 1px;">
<!--      <el-radio-group v-model="currentCase" size="small" @change="show">-->
<!--        <el-radio-button label="横向树状图谱"></el-radio-button>-->
<!--        <el-radio-button label="纵向树状图谱" ></el-radio-button>-->
<!--      </el-radio-group>-->
      <el-button type="success" class="c-show-code-button"><el-link href="https://github.com/seeksdream/relation-graph/blob/master/examples/views/seeks-graph-docs/demo/Demo4BothwayTree.vue" target="_blank" style="color: #ffffff;">查看代码</el-link></el-button>
    </div>
    <el-row>
      <el-col :span="9">
        <div style="height:calc(100vh - 100px);">
          <RelationGraph
              ref="seeksRelationGraph1"
              :options="graphOptions1"
              :on-node-click="onNodeClick"
              :on-line-click="onLineClick"
          />
        </div>
      </el-col>
      <el-col :span="6">
        <div style="height:calc(100vh - 100px);border-left:#efefef solid 1px;border-right:#efefef solid 1px;padding:5px;font-size:12px;">
          原本数据中的关系都是从上到下的。只有这样双向树才能从根节点向上、向下同时展开。<br />
          <br />
          如果想要展示成根节点上方的箭头朝上，下方的根节点箭头朝下<br />
          你可以设置上方的所有线条属性showStartArrow=true;showEndArrow=false,来让上方线条反向展示<br />
          <br />
          最终，你可以实现通过from,to来设置关系从上到下，来满足双向树的数据需求。但又通过showStartArrow=true;showEndArrow=false让上方的箭头朝上展示。
        </div>
      </el-col>
      <el-col :span="9">
        <div style="height:calc(100vh - 100px);">
          <RelationGraph
              ref="seeksRelationGraph2"
              :options="graphOptions2"
              :on-node-click="onNodeClick"
              :on-line-click="onLineClick"
          />
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from 'relation-graph';
export default {
  name: 'Demo',
  components: { },
  data() {
    return {
      currentCase: '纵向树状图谱',
      isShowCodePanel: false,
      graphOptions1: {},
      graphOptions2: {}
    };
  },
  mounted() {
    this.show();
  },
  methods: {
    show(graphRef) {
      const graph1 = this.$refs.seeksRelationGraph1;
      this.resetGraph(graph1, 'graph1');
      const graph2 = this.$refs.seeksRelationGraph2;
      this.resetGraph(graph2, 'graph2');
    },
    resetGraph(graphRef, graphId) {
      const graphOptions = {
        debug: true,
        'layouts': [
          {
            'layoutName': 'tree',
            'from': 'left',
            'max_per_width': '300',
            'min_per_height': '40'
          }
        ],
        allowShowMiniToolBar: false,
        'defaultNodeShape': 1,
        'defaultLineShape': 4,
        'defaultNodeBorderWidth': 0,
        'defaultLineColor': 'rgba(0, 186, 189, 1)',
        'defaultNodeColor': 'rgba(0, 206, 209, 1)'
      };
      graphOptions.layouts[0].from = 'top';
      graphOptions.layouts[0].min_per_width = 40;
      graphOptions.layouts[0].max_per_width = 200;
      graphOptions.layouts[0].min_per_height = 40;
      graphOptions.layouts[0].max_per_height = 200;
      graphOptions.defaultNodeWidth = 30;
      graphOptions.defaultNodeHeight = 100;
      graphOptions.defaultJunctionPoint = 'lr';
      let showStartArrow, showEndArrow, color;
      if (graphId === 'graph2') {
        showStartArrow = true;
        showEndArrow = false;
        color = '#ff0000';
      }
      const __graph_json_data = {
        'rootId': 'a',
        'nodes': [
          { 'id': 'a', 'text': '根节点a' }, { 'id': 'R-b', 'text': 'R-b' }, { 'id': 'R-c', 'text': 'R-c' }, { 'id': 'R-c-1', 'text': 'R-c-1' }, { 'id': 'R-c-2', 'text': 'R-c-2' }, { 'id': 'R-d', 'text': 'R-d' }, { 'id': 'b', 'text': 'b' }, { 'id': 'c', 'text': 'c' }, { 'id': 'c1', 'text': 'c1' }, { 'id': 'c2', 'text': 'c2' }, { 'id': 'c3', 'text': 'c3' }, { 'id': 'd', 'text': 'd' }, { 'id': 'e', 'text': 'e' }
        ],
        'lines': [
          { 'from': 'R-b', 'to': 'a', showStartArrow, showEndArrow, color },
          { 'from': 'R-c', 'to': 'a', showStartArrow, showEndArrow, color },
          { 'from': 'R-c-1', 'to': 'R-c', showStartArrow, showEndArrow, color },
          { 'from': 'R-c-2', 'to': 'R-c', showStartArrow, showEndArrow, color },
          { 'from': 'R-d', 'to': 'a', showStartArrow, showEndArrow, color },
          { 'from': 'a', 'to': 'b' },
          { 'from': 'a', 'to': 'c' },
          { 'from': 'c', 'to': 'c1' },
          { 'from': 'c', 'to': 'c2' },
          { 'from': 'c', 'to': 'c3' },
          { 'from': 'a', 'to': 'd' },
          { 'from': 'a', 'to': 'e' }
        ] };

      graphRef.setOptions(graphOptions, (graphInstance) => {
        this.showSeeksGraph(graphRef, __graph_json_data);
      });
    },
    showSeeksGraph(graphRef, graph_json_data) {
      // const newNodes = __graph_json_data.nodes.filter(n => n.id.indexOf('-') === -1 || n.id.startsWith('R-'));
      // const newLines = __graph_json_data.lines.filter(l => (l.from.indexOf('-') === -1 || l.from.startsWith('R-')) && (l.to.indexOf('-') === -1 || l.to.startsWith('R-')));
      // const removeNodes = ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'd1', 'd2', 'd3', 'd4', 'e1', 'e2', 'R-b-1', 'R-b-2', 'R-b-3', 'R-d-1', 'R-d-2', 'R-d-3'];
      // const newNodes = __graph_json_data.nodes.filter(n => !removeNodes.includes(n.id));
      // const newLines = __graph_json_data.lines.filter(l => (!removeNodes.includes(l.from)) && (!removeNodes.includes(l.to)));
      // const newData = {
      //   'rootId': __graph_json_data.rootId,
      //   'nodes': newNodes,
      //   lines: newLines
      // };
      // console.log(JSON.stringify(newData));
      graphRef.setJsonData(graph_json_data, (graphInstance) => {
        // 这些写上当图谱初始化完成后需要执行的代码
        graphInstance.focusNodeById('a');
      });
    },
    onNodeClick(nodeObject, $event) {
      console.log('onNodeClick:', nodeObject);
    },
    onLineClick(lineObject, $event) {
      console.log('onLineClick:', lineObject);
    }
  }
};
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>

</style>
