<template>
  <div>
    <div style="height: calc(100vh - 50px)">
      <RelationGraph
        ref="seeksRelationGraph"
        :options="graphOptions"
        :on-node-click="onNodeClick"
        :on-line-click="onLineClick"
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
        // allowShowMiniView: true, //缩略图
        allowShowMiniToolBar: !this.readonly, //是否显示工具栏
        // allowSwitchLineShape: true, //是否在工具栏中显示切换线条形状的按钮
        // allowSwitchJunctionPoint: true, //是否在工具栏中显示切换连接点位置的按钮
        defaultJunctionPoint: 'border', //默认的连线与节点接触的方式（border:边缘/ltrb:上下左右/tb:上下/lr:左右）
        defaultNodeBorderWidth: 0, //默认的节点边框粗细（像素）
        defaultLineWidth: 3, //默认的线条粗细（像素）
        defaultLineColor: '#a9bdc6', //默认的线条颜色
        disableDefaultClickEffect: true, //是否禁用默认的点击选中效果
        defaultFocusRootNode: false, //默认为根节点添加一个被选中的样式
        disableZoom: true, //禁用滚轮缩放
        // isMoveByParentNode: true, //是否在拖动节点后让子节点跟随
        allowShowMiniNameFilter: false,
        placeSingleNode: false,
        // showDebugPanel:true,
        layouts: [
          {
            'label': '手工',
            'layoutName': 'fixed',
            'layoutClassName': 'seeks-layout-fixed',
            'defaultJunctionPoint': 'border',
            'defaultNodeShape': 0,
            'defaultLineShape': 1
          }
        ],
      },
    };
  },
  mounted() {
    this.showSeeksGraph();
  },
  methods: {
    showSeeksGraph() {
      const __graph_json_data = {
        'rootId': '18',
        'nodes': [
          {
            'id': '18',
            'text': '111',
            'isShow': true,
            'isHide': false,
            'expanded': true,
            'selected': false,
            'styleClass': 'node-style-start',
            'opacity': 1,
            'fixed': false,
            'width': 50,
            'height': 50,
            'x': -450,
            'y': -50,
            'offset_x': 0,
            'offset_y': 0,
            'disableDrag': false,
            'singleNode': false,
            'data': {
              'custName': '111',
              'custNo': '545401',
              'custType': '1',
              'isSuspicion': 0,
              'nodeId': 18,
              'nodeLeft': -450,
              'nodeTop': -50,
              'nodeType': '1'
            }
          },
          {
            'id': '24',
            'text': '222',
            'isShow': true,
            'isHide': false,
            'expanded': true,
            'selected': false,
            'styleClass': 'node-style-credit',
            'opacity': 1,
            'fixed': true,
            'width': 50,
            'height': 50,
            'x': -58,
            'y': 97,
            'offset_x': 0,
            'offset_y': 0,
            'disableDrag': false,
            'singleNode': false,
            'data': {
              'createUser': 10,
              'custName': '222',
              'custNo': '61001',
              'custType': '2',
              'isSuspicion': 0,
              'nodeId': 24,
              'nodeLeft': 300,
              'nodeTop': -50,
              'nodeType': '2'
            }
          }
        ],
        'lines': []
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
  },
};
</script>

<style>
.my-node-style-class .c-node-text{
  color: red !important;
}
</style>

<style scoped>
/deep/ .my-node-style-class .c-node-text{
  color: red !important;
}
</style>
