<template>
  <div>
    <div style="height: calc(100vh - 50px)">
      <RelationGraph
        ref="seeksRelationGraph"
        :options="graphOptions"
        :on-node-expand="onNodeExpand"
        :on-node-collapse="onNodeCollapse"
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
        'backgrounImageNoRepeat': true,
        'moveToCenterWhenRefresh': true,
        'zoomToFitWhenRefresh': true,
        "defaultExpandHolderPosition": "right",
        "useAnimationWhenExpanded": true,
        useAnimationWhenRefresh: false,
        debug: true,
        'layouts': [
          {
            'label': '中心',
            'layoutName': 'center',
            'from': 'top',
            'layoutClassName': 'seeks-layout-center',
            'defaultExpandHolderPosition': 'hide',
            'defaultJunctionPoint': 'border'
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
      const __graph_json_data = {
        'rootId': '2',
        'nodes': [
          {
            'id': '2',
            'text': 'ALTXX',
            'data': null
          },
          {
            'id': '3',
            'text': 'CH2 TTN',
            'data': null
          },
          {
            'id': '4',
            'text': 'CH1 AlCu',
            'data': null
          },
          {
            'id': '5',
            'text': 'MainFrame',
            'data': null
          },
          {
            'id': '6',
            'text': 'TestMainSys',
            'expanded': false,
            'data': null
          },
          {
            'id': '7',
            'text': '汽车部件',
            'data': null
          },
          {
            'id': '8',
            'text': '汽车工艺',
            'data': null
          },
          {
            'id': '9',
            'text': '过程质检',
            'data': null
          },
          {
            'id': '10',
            'text': '卓立制造',
            'data': null
          },
          {
            'id': '11',
            'text': '压电开关',
            'data': null
          },
          {
            'id': '12',
            'text': '电子产品',
            'data': null
          },
          {
            'id': '13',
            'text': '集成电路',
            'data': null
          },
          {
            'id': '14',
            'text': 'ArHigh',
            'data': null
          },
          {
            'id': '15',
            'text': 'ArLow',
            'data': null
          },
          {
            'id': '16',
            'text': 'ShowerHead',
            'data': null
          },
          {
            'id': '17',
            'text': 'CrypoPump',
            'data': null
          },
          {
            'id': '18',
            'text': 'DryPump',
            'data': null
          },
          {
            'id': '19',
            'text': 'Ti Target',
            'data': null
          },
          {
            'id': '20',
            'text': 'N2',
            'data': null
          },
          {
            'id': '21',
            'text': 'Shutter',
            'data': null
          },
          {
            'id': '22',
            'text': 'Cool Chbr',
            'data': null
          },
          {
            'id': '23',
            'text': 'Transfer Chbr',
            'data': null
          },
          {
            'id': '24',
            'text': 'Alignment Unit',
            'data': null
          },
          {
            'id': '25',
            'text': '齿轮箱',
            'data': null
          },
          {
            'id': '26',
            'text': '车门内部人工涂蜡',
            'data': null
          },
          {
            'id': '27',
            'text': '原材料检验',
            'data': null
          },
          {
            'id': '28',
            'text': '地板RTV硅胶密封',
            'data': null
          },
          {
            'id': '29',
            'text': '热保护焊接',
            'data': null
          },
          {
            'id': '30',
            'text': '电热管导线焊接',
            'data': null
          },
          {
            'id': '31',
            'text': '温控器安装',
            'data': null
          },
          {
            'id': '32',
            'text': '蒸汽硅胶座配装',
            'data': null
          },
          {
            'id': '33',
            'text': '温度调试',
            'data': null
          },
          {
            'id': '34',
            'text': '压电开关的模型塑料外壳',
            'data': null
          },
          {
            'id': '35',
            'text': '安装开关',
            'data': null
          },
          {
            'id': '36',
            'text': 'ASIC IC',
            'data': null
          },
          {
            'id': '37',
            'text': 'SENSOR',
            'data': null
          },
          {
            'id': '38',
            'text': 'CON',
            'data': null
          },
          {
            'id': '39',
            'text': 'Flash',
            'data': null
          },
          {
            'id': '40',
            'text': 'Flite',
            'data': null
          }
        ],
        'lines': [
          {
            'from': '2',
            'to': '5',
            'text': '子系统',
            'data': null
          },
          {
            'from': '2',
            'to': '6',
            'text': '子系统',
            'data': null
          },
          {
            'from': '2',
            'to': '3',
            'text': '子系统',
            'data': null
          },
          {
            'from': '2',
            'to': '4',
            'text': '子系统',
            'data': null
          },
          {
            'from': '3',
            'to': '21',
            'text': '子系统',
            'data': null
          },
          {
            'from': '3',
            'to': '20',
            'text': '子系统',
            'data': null
          },
          {
            'from': '3',
            'to': '19',
            'text': '子系统',
            'data': null
          },
          {
            'from': '4',
            'to': '18',
            'text': '子系统',
            'data': null
          },
          {
            'from': '4',
            'to': '17',
            'text': '子系统',
            'data': null
          },
          {
            'from': '4',
            'to': '16',
            'text': '子系统',
            'data': null
          },
          {
            'from': '4',
            'to': '15',
            'text': '子系统',
            'data': null
          },
          {
            'from': '4',
            'to': '14',
            'text': '子系统',
            'data': null
          },
          {
            'from': '5',
            'to': '24',
            'text': '子系统',
            'data': null
          },
          {
            'from': '5',
            'to': '23',
            'text': '子系统',
            'data': null
          },
          {
            'from': '5',
            'to': '22',
            'text': '子系统',
            'data': null
          },
          {
            'from': '6',
            'to': '13',
            'text': '子系统',
            'data': null
          },
          {
            'from': '6',
            'to': '12',
            'text': '子系统',
            'data': null
          },
          {
            'from': '6',
            'to': '11',
            'text': '子系统',
            'data': null
          },
          {
            'from': '6',
            'to': '10',
            'text': '子系统',
            'data': null
          },
          {
            'from': '6',
            'to': '9',
            'text': '子系统',
            'data': null
          },
          {
            'from': '6',
            'to': '8',
            'text': '子系统',
            'data': null
          },
          {
            'from': '6',
            'to': '7',
            'text': '子系统',
            'data': null
          },
          {
            'from': '7',
            'to': '25',
            'text': '子系统',
            'data': null
          },
          {
            'from': '8',
            'to': '26',
            'text': '子系统',
            'data': null
          },
          {
            'from': '9',
            'to': '27',
            'text': '子系统',
            'data': null
          },
          {
            'from': '10',
            'to': '33',
            'text': '子系统',
            'data': null
          },
          {
            'from': '10',
            'to': '32',
            'text': '子系统',
            'data': null
          },
          {
            'from': '10',
            'to': '31',
            'text': '子系统',
            'data': null
          },
          {
            'from': '10',
            'to': '30',
            'text': '子系统',
            'data': null
          },
          {
            'from': '10',
            'to': '29',
            'text': '子系统',
            'data': null
          },
          {
            'from': '10',
            'to': '28',
            'text': '子系统',
            'data': null
          },
          {
            'from': '11',
            'to': '35',
            'text': '子系统',
            'data': null
          },
          {
            'from': '11',
            'to': '34',
            'text': '子系统',
            'data': null
          },
          {
            'from': '12',
            'to': '39',
            'text': '子系统',
            'data': null
          },
          {
            'from': '12',
            'to': '38',
            'text': '子系统',
            'data': null
          },
          {
            'from': '12',
            'to': '37',
            'text': '子系统',
            'data': null
          },
          {
            'from': '12',
            'to': '36',
            'text': '子系统',
            'data': null
          },
          {
            'from': '13',
            'to': '40',
            'text': '子系统',
            'data': null
          }
        ]
      };
      // __graph_json_data.nodes.forEach(node => {
      //   node.expanded = false;
      // });
      const rgInstanceRef = this.$refs.seeksRelationGraph
      rgInstanceRef.setJsonData(__graph_json_data, (graphInstance) => {
        graphInstance.layouter.maxLayoutTimes = 2000;
          // 这些写上当图谱初始化完成后需要执行的代码.
        // this.expandNode(graphInstance.graphData.rootNode);
        // this.expandNodeAllChild(graphInstance.graphData.rootNode);
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
      graphInstance.doLayout();
    },
    async expandNodeAllChild(node) {
      if (node.lot.childs.length === 0) {
        return;
      }
      await sleep(1000);
      for (let i=0;i<node.lot.childs.length;i++) {
        const cnode = node.lot.childs[i];
        if (cnode.lot.childs.length === 0) {
          continue;
        }
        await this.expandNode(cnode);
        await sleep(1000);
      }
    },
    onNodeCollapse(node, e) {
      console.log('onNodeCollapse:', node);
      const graphInstance = this.$refs.seeksRelationGraph.getInstance();
      // 当有一些节点被显示或隐藏起来时，会让图谱看着很难看，需要布局器重新为节点分配位置，所以这里需要调用refresh方法来重新布局
      graphInstance.doLayout();
    },
    onNodeExpand(node, e) {
      // 当有一些节点被显示或隐藏起来时，会让图谱看着很难看，需要布局器重新为节点分配位置，所以这里需要调用refresh方法来重新布局
      console.log('onNodeExpand:', node);
      const graphInstance = this.$refs.seeksRelationGraph.getInstance();
      // node.lot.childs.forEach(cnode => {
      //   cnode.x = node.x;
      //   cnode.y = node.y;
      // });
      graphInstance.doLayout();
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
