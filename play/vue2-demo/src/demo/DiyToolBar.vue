<template>
  <div>
    <div style="height: calc(100vh - 50px)">
      <RelationGraph
        ref="seeksRelationGraph"
        :options="graphOptions"
        :on-node-expand="onNodeExpand"
        :on-node-collapse="onNodeCollapse"
      >
        <template #tool-bar>
          <DiyToolBarSlot1 />
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from "relation-graph";
import DiyToolBarSlot1 from './DiyToolBarSlot1';
import staticJsonData from "./example-data/systems.json";
export default {
  name: 'Demo',
  components: { DiyToolBarSlot1 },
  data() {
    return {
      isShowCodePanel: false,
      graphOptions: {
        'backgrounImageNoRepeat': true,
        'moveToCenterWhenRefresh': true,
        'zoomToFitWhenRefresh': true,
        "defaultExpandHolderPosition": "right",
        "useAnimationWhenExpanded": true,
        useAnimationWhenRefresh: true,
        defaultNodeShape: 1,
        defaultNodeBorderWidth: 0,
        defaultLineShape: 2,
        defaultNodeWidth: 150,
        defaultNodeHeight:50,
        // defaultNodeColor: 'transparent',
        // defaultNodeFontColor: '#000000',
        debug: true,
        showDebugPanel: true,
        'layouts': [
          {
            'label': '中心',
            'layoutName': 'tree',
            'from': 'left',
            'layoutClassName': 'seeks-layout-center',
            levelDistance: '400,400,400,400'
          }
        ]
      },
    };
  },
  mounted() {
    this.showSeeksGraph();
  },
  methods: {
    showSeeksGraph() {
      const __graph_json_data = staticJsonData;
      __graph_json_data.nodes.forEach(node => {
        node.expanded = false;
      });
      const rgInstanceRef = this.$refs.seeksRelationGraph
      rgInstanceRef.setJsonData(__graph_json_data, async (graphInstance) => {
        graphInstance.layouter.maxLayoutTimes = 2000;
          // 这些写上当图谱初始化完成后需要执行的代码.
        await this.expandNode(graphInstance.graphData.rootNode);
        await this.expandNodeAllChild(graphInstance.graphData.rootNode);
      });
    },
    async expandNode(node) {
      if (node.lot.childs.length === 0) {
        return;
      }
      // 当有一些节点被显示或隐藏起来时，会让图谱看着很难看，需要布局器重新为节点分配位置，所以这里需要调用refresh方法来重新布局
      console.log('onNodeExpand:', node);
      node.expanded = true;
      const graphInstance = this.$refs.seeksRelationGraph.getInstance();
      for (let i=0;i<node.lot.childs.length;i++) {
        const cnode = node.lot.childs[i];
        cnode.x = node.x;
        cnode.y = node.y;
      }
      await graphInstance.doLayout();
      await graphInstance.zoomToFit();
    },
    async expandNodeAllChild(node) {
      if (node.lot.childs.length === 0) {
        return;
      }
      for (let i=0;i<node.lot.childs.length;i++) {
        const cnode = node.lot.childs[i];
        if (cnode.lot.childs.length === 0) {
          continue;
        }
        await this.expandNode(cnode);
      }
    }
  },
};
const sleep = async(time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};
</script>
<style scoped>
/deep/ .my-node-style-class .c-node-text{
  color: red !important;
}
</style>
