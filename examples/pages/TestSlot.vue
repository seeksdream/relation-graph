<template>
    <div>
        <div style="height:calc(100vh - 100px);">
            <SeeksRelationGraph
                    ref="seeksRelationGraph"
                    :options="graphOptions"
                    :on-node-click="onNodeClick"
                    :on-line-click="onLineClick"
            >
                <div
                        slot="node"
                        slot-scope="{node}"
                        class="flex flexJustifyBetween"
                >
                    <span>{{node.text}}222</span>
                    <div class="mag-l-10"><i
                            class="el-icon-delete"
                            @click.stop="delRelation(node)"
                    ></i></div>
                </div>
            </SeeksRelationGraph>
        </div>
    </div>
</template>

<script>
import SeeksRelationGraph from '../../src';
export default {
  name: 'Demo',
  components: {
    SeeksRelationGraph
  },
  data() {
    return {
      currentCase: '纵向树状图谱',
      isShowCodePanel: false,
      graphOptions: {
        // debug: false,
        // 'backgrounImage': 'https://camo.githubusercontent.com/ede1654f055903cdc39044129d15d5b158f4f3b33ba5b7c21c7407792a506dea/687474703a2f2f72656c6174696f6e2d67726170682e636f6d2f776562736974652f6c6f676f',
        // 'backgrounImageNoRepeat': true,
        'allowShowMiniToolBar': false,
        'layouts': [{
          'label': '中心',
          'layoutName': 'tree',
          'layoutClassName': 'seeks-layout-center',
          'defaultJunctionPoint': 'border',
          'defaultNodeShape': 0,
          'defaultLineShape': 1,
          'from': 'left',
          'max_per_width': '300',
          'min_per_height': '40'
        }],
        'defaultLineMarker': {
          'markerWidth': 12,
          'markerHeight': 12,
          'refX': 6,
          'refY': 6,
          'data': 'M2,2 L10,6 L2,10 L6,6 L2,2'
        },
        'defaultNodeShape': 1,
        'defaultNodeWidth': '100',
        'defaultLineShape': 2,
        'defaultJunctionPoint': 'lr',
        'defaultNodeBorderWidth': 0,
        'defaultLineColor': 'rgba(0, 186, 189, 1)',
        'defaultNodeColor': 'rgba(0, 206, 209, 1)'
      }
    };
  },
  mounted() {
    this.showSeeksGraph();
  },
  methods: {
    showSeeksGraph() {
      const __graph_json_data = {
        'rootId': 'a',
        'nodes': [{
          'id': 'a',
          'text': 'a'
        },
        {
          'id': 'b',
          'text': 'b'
        },
        {
          'id': 'c',
          'text': 'c'
        },
        {
          'id': 'd',
          'text': 'd'
        },
        {
          'id': 'e',
          'text': 'e'
        }
        ],

        'links': [{
          'from': 'a',
          'to': 'b',
          text: '关系1',
          color: '#43a2f1'
        },
        {
          'from': 'a',
          'to': 'c',
          text: '关系2',
          color: 'red'
        },
        {
          'from': 'b',
          'to': 'd',
          text: '关系3',
          color: 'red'
        },
        {
          'from': 'd',
          'to': 'e',
          text: '关系4',
          color: 'red'
        }
        ]
      };
      this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, () => {
        // 这些写上当图谱初始化完成后需要执行的代码
      });
    },
    onNodeClick(nodeObject) {
      console.log('onNodeClick:', nodeObject);
    },
    onLineClick(lineObject) {
      console.log('onLineClick:', lineObject);
    },
    delRelation(val) {
      console.log(val);
    }
  }
};
</script>

<style lang="scss">
</style>

<style lang="scss" scoped>
</style>
