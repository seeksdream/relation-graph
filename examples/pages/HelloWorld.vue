<template>
  <div style="background-color: blueviolet">
    <div style="height:300px;color: #ffffff;font-size: 25px;">
      {{contact_cn}}
    </div>
    <div>
      <button @click="actionShow">show</button>
      <button @click="action1">action1</button>
      <button @click="action2">action2</button>
      <button @click="action3">action3</button>
    </div>
    <div :style="{width:graphSize.width + 'px',height:graphSize.height + 'px'}" style="height:600px;width:800px;border:#efefef solid 1px;padding-left:400px;background-color: #2E74B5;">
      <SeeksRelationGraph ref="seeksRelationGraph" :options="graphOptions" :on-node-click="onNodeClick" :on-line-click="onLineClick" />
    </div>
  </div>
</template>

<script>
import SeeksRelationGraph from '../../src';

export default {
  name: 'Demo',
  components: { SeeksRelationGraph },
  data() {
    return {
      contact: '13811112222',
      isShow: false,
      graphSize: { width: 900, height: 900 },
      graphOptions: {
        debug: true,
        disableZoom: true,
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        'defaultExpandHolderPosition': 'right',
        'defaultNodeShape': 1,
        'defaultNodeWidth': '100',
        'defaultLineShape': 4,
        'defaultJunctionPoint': 'lr',
        'defaultNodeBorderWidth': 0,
        'defaultLineColor': 'rgba(0, 186, 189, 1)',
        'defaultNodeColor': 'rgba(0, 206, 209, 1)',
        'layouts': [
          {
            'label': '中心',
            'layoutName': 'tree',
            'layoutClassName': 'seeks-layout-center',
            'defaultJunctionPoint': 'border',
            'defaultNodeShape': 0,
            'defaultLineShape': 1,
            'from': 'left',
            // 通过这4个属性来调整 tree-层级距离&节点距离
            'min_per_width': '200',
            'max_per_width': '500',
            'min_per_height': '40',
            'max_per_height': '60',
            'levelDistance': '' // 如果此选项有值，则优先级高于上面那4个选项
          }
        ]
      }
    };
  },
  computed: {
    contact_cn() {
      if (this.contact.indexOf('@') !== -1) {
        return '邮箱：' + this.contact;
      } else if (this.contact.length === 11) {
        return '手机号：' + this.contact + '/' + this.username;
      } else {
        return '联系方式：' + this.contact;
      }
    }
  },
  mounted() {
    this.showSeeksGraph();
  },
  methods: {
    showSeeksGraph() {
      /**
         图谱数据__graph_json_data不要放在Vue data()中，也不要引用Vue data()中的变量，否则在当前版本中会有问题，以后版本会解决这个问题。
         如果需要__graph_json_data是一个全局变量，暂时的解决方法是把他放在 export default之前，具体问题可以加我QQ:3235808353
         **/
      // var __graph_json_data = {
      //   'rootId': 'a',
      //   'nodes': [
      //     {'id': 'a', 'text': 'a'},
      //     {'id': 'b', 'text': 'b'},
      //     {'id': 'b1', 'text': 'b1'},
      //     {'id': 'b1-1','text': 'b1-1'},
      //     {'id': 'b1-2', 'text': 'b1-2'},
      //     {'id': 'b1-3', 'text': 'b1-3'},
      //     {'id': 'b1-4','text': 'b1-4'},
      //     {'id': 'b1-5', 'text': 'b1-5'},
      //     {'id': 'b1-6', 'text': 'b1-6'},
      //     {'id': 'b2', 'text': 'b2'},
      //     {'id': 'b2-1','text': 'b2-1'},
      //     {'id': 'b2-2', 'text': 'b2-2'},
      //     {'id': 'c', 'text': 'c'},
      //     {'id': 'c1', 'text': 'c1' },
      //     {'id': 'c2', 'text': 'c2' },
      //     {'id': 'c3','text': 'c3' }],
      //   'links': [
      //     {'from': 'a', 'to': 'b'},
      //     {'from': 'b', 'to': 'b1'},
      //     {'from': 'b1', 'to': 'b1-1'},
      //     {'from': 'b1','to': 'b1-2'},
      //     {'from': 'b1', 'to': 'b1-3'},
      //     {'from': 'b1', 'to': 'b1-4'},
      //     {'from': 'b1', 'to': 'b1-5'},
      //     {'from': 'b1','to': 'b1-6'},
      //     {'from': 'b', 'to': 'b2'},
      //     {'from': 'b2', 'to': 'b2-1'},
      //     {'from': 'b2', 'to': 'b2-2'},
      //     {'from': 'a','to': 'c' },
      //     {'from': 'c', 'to': 'c1'},
      //     {'from': 'c', 'to': 'c2'},
      //     {'from': 'c','to': 'c3'}]
      // }
      const __graph_json_data = {
        'rootId': 'a',
        'nodes': [
          { 'id': 'a', 'text': 'a', 'children': [
            { 'id': 'b', 'text': 'b', 'children': [
              { 'id': 'b1', 'text': 'b1', 'children': [
                { 'id': 'b1-1', 'text': 'b1-1' },
                { 'id': 'b1-2', 'text': 'b1-2' },
                { 'id': 'b1-3', 'text': 'b1-3' },
                { 'id': 'b1-4', 'text': 'b1-4' },
                { 'id': 'b1-5', 'text': 'b1-5' },
                { 'id': 'b1-6', 'text': 'b1-6' }
              ]
              },
              { 'id': 'b2', 'text': 'b2', 'children': [
                { 'id': 'b2-1', 'text': 'b2-1' },
                { 'id': 'b2-2', 'text': 'b2-2' }
              ]
              }
            ]
            },
            { 'id': 'c', 'text': 'c', 'children': [
              { 'id': 'c1', 'text': 'c1' },
              { 'id': 'c2', 'text': 'c2' },
              { 'id': 'c3', 'text': 'c3' }
            ]
            }
          ]
          }
        ],
        'links': [
          // 你仍然可以通过常规方式添加关系
          { 'from': 'a', 'to': 'b1-6' }
        ]
      };
      // 以上数据中的node和link可以参考"Node节点"和"Link关系"中的参数进行配置
      this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, () => {
        // Called when the relation-graph is completed
      });
    },
    onNodeClick(nodeObject) {
      console.log('onNodeClick:', nodeObject);
    },
    onLineClick(lineObject) {
      console.log('onLineClick:', lineObject);
    },
    actionShow() {
      this.isShow = true;
      this.contact = 'gaokui@qq.com';
    },
    action1() {
      this.graphSize.width = 300;
      this.graphSize.height = 300;
    },
    action2() {
      this.graphSize.width = 600;
      this.graphSize.height = 600;
    },
    action3() {
      this.graphSize.width = 1300;
      this.graphSize.height = 900;
    }
  }
};
</script>
<style scoped>
  /deep/ canvas{
    border:#ff0000 solid 1px;
  }
  /deep/ .rel-map-canvas{
    border:#ff0000 solid 1px !important;
  }
</style>
