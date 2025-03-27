<template>
  <div id="home" ref="home">
    <div ref="myPage" style="height:800px;width:900px;background:red" @click="isShowNodeMenuPanel = false">
      <relation-graph
          ref="seeksRelationGraph"
          :options="graphOptions"/>
    </div>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from 'relation-graph';
// import {nanoid} from 'nanoid' // 引入
export default {
  name: 'Demo',
  components: {},
  data() {
    return {
      g_loading:false,
      graphData: {
        rootId: '7',

        nodes: [
          {nodeShape: 1, id: '7', borderColor:'transition', text: '节点-7', data: {myicon: 'el-icon-setting', text: '龙',type:'condition',info:''}},
          {nodeShape: 1, id: '71', borderColor:'transition',text: '节点-71', data: {myicon: 'el-icon-headset', text: '人',type:'conditionData',info:''}},
          {nodeShape: 1, id: '72',borderColor:'transition', text: '节点-72', data: {myicon: 'el-icon-s-tools', text: '国',type:'conditionData',info:''}},
          {nodeShape: 1, id: '73',borderColor:'transition', text: '节点-73', data: {myicon: 'el-icon-star-on', text: '中',type:'conditionData',info:''}},
        ],
        lines: [
          {to: '7', from: '71', text: '71',color:'#2b2d79', lineWidth: 1 },
          {to: '71', from: '72', text: '72',color:'#2b2d79', lineWidth: 1 },
          {to: '72', from: '73', text: '73',color:'#2b2d79', lineWidth: 1 },
        ]
      },

      isShowCodePanel: false,
      isShowNodeMenuPanel: false,
      nodeMenuPanelPosition: {x: 0, y: 0},
      graphOptions: {
        debug: true,
        showDebugPanel: true,
        layouts: [
          {
            layoutName: 'tree',
            layoutDirection: 'h',
            from: 'top',
            centerOffset_x: 0,
            centerOffset_y: 0
          }
        ],
        lineUseTextPath: true,
        defaultLineShape: 2,
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        defaultJunctionPoint: 'border',
        defaultExpandHolderPosition: 'right',
        nodeObject:{}
        // 这里可以参考"Graph 图谱"中的参数进行设置
      }
    };
  },
  mounted() {
    this.showSeeksGraph();
  },
  methods: {
    save(){
      console.log(this.graphData.nodes);
      console.log(this.graphData.lines);
    },
    showSeeksGraph() {
      const __graph_json_data = this.graphData;
      this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (graphInstance) => {
        // 这些写上当图谱初始化完成后需要执行的代码
        // 1, 获取所有节点：
        graphInstance.getNodes().forEach(node => {
          console.log(node.text, node.lot.level);
          // 判断节点的级别（根节点为0）
          if (Math.abs(node.lot.level) == 2) {
            console.log('collapseNode:', node.text, node.lot.level);
            // 收起节点：
            graphInstance.collapseNode(node)
          }
        })
      });
    }
  }
};
</script>
<style scoped>
.c-node-menu-item {
  line-height: 30px;
  padding-left: 10px;
  cursor: pointer;
  color: #444444;
  font-size: 14px;
  border-top: #efefef solid 1px;
}

.c-node-menu-item:hover {
  background-color: rgba(66, 187, 66, 0.2);
}
</style>
