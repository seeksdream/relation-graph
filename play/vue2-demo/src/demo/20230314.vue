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
        'debug': true,
        'showDebugPanel': true,
        'backgrounImage': '',
        'downloadImageFileName': '',
        'disableZoom': true,
        'disableDragNode': false,
        'moveToCenterWhenRefresh': true,
        'zoomToFitWhenRefresh': true,
        'useAnimationWhenRefresh': false,
        'defaultFocusRootNode': false,
        'disableNodeClickEffect': false,
        'disableLineClickEffect': true,
        'allowShowZoomMenu': true,
        'allowAutoLayoutIfSupport': true,
        'allowShowRefreshButton': true,
        'allowShowDownloadButton': true,
        'backgrounImageNoRepeat': false,
        'allowShowMiniToolBar': true,
        'allowSwitchLineShape': true,
        'allowSwitchJunctionPoint': false,
        'isMoveByParentNode': false,
        'defaultExpandHolderPosition': 'hide',
        'defaultNodeColor': '#67C23A',
        'checkedLineColor': '#FD8B37',
        'defaultNodeFontColor': '#ffffff',
        'defaultNodeBorderColor': '#90EE90',
        'defaultNodeBorderWidth': 0,
        'defaultLineColor': '#a9bdc6',
        'defaultLineWidth': 3,
        'defaultLineShape': 1,
        'defaultNodeShape': 0,
        'defaultShowLineLabel': true,
        'hideNodeContentByZoom': false,
        'defaultJunctionPoint': 'border',
        'disableDragCanvas': false,
        'placeSingleNode': true,
        'lineUseTextPath': false,
        'defaultLineMarker': {
          'markerWidth': 12,
          'markerHeight': 12,
          'refX': 6,
          'refY': 6,
          'data': 'M2,2 L10,6 L2,10 L6,6 L2,2'
        },
        'allowShowSettingPanel': false,
        'allowShowMiniNameFilter': false,
        'checkedNodeId': '',
        'checkedLineId': '',
        'layouts': [
          {
            'label': '中心',
            'layoutName': 'tree',
            'layoutClassName': 'seeks-layout-center',
            'useLayoutStyleOptions': false,
            'defaultNodeColor': '#FFC5A6',
            'defaultNodeFontColor': '#000000',
            'defaultNodeBorderColor': '#efefef',
            'defaultNodeBorderWidth': 1,
            'defaultLineColor': '#FD8B37',
            'defaultLineWidth': 1,
            'defaultShowLineLabel': true,
            'defaultExpandHolderPosition': 'hide',
            'defaultJunctionPoint': 'border',
            'defaultLineMarker': {
              'markerWidth': 12,
              'markerHeight': 12,
              'refX': 6,
              'refY': 6,
              'data': 'M2,2 L10,6 L2,10 L6,6 L2,2'
            },
            'defaultNodeShape': 0,
            'defaultLineShape': 1,
            'layoutDirection': 'h',
            'centerOffset_x': 0,
            'centerOffset_y': 0,
            'levelDistance': '',
            'min_per_width': 30,
            'max_per_width': 200,
            'min_per_height': 100,
            'max_per_height': 500
          }
        ],
        'isNeedShowAutoLayoutButton': true,
        'showSingleNode': true,
        'showNodeLabel': true,
        'showNodeShortLabel': true,
        'disableDefaultClickEffect': true
      },
    };
  },
  mounted() {
    setTimeout(() => {
      this.showSeeksGraph();
    }, 100)
  },
  methods: {
    showSeeksGraph() {
      const __graph_json_data = {
        'rootId': '62002',
        'nodes': [
          {
            'id': '62002',
            'text': '河北公司',
            'isShow': true,
            'isHide': false,
            'expanded': true,
            'selected': false,
            'styleClass': 'node-style-credit',
            'opacity': 1,
            'fixed': false,
            'width': 50,
            'height': 50,
            'offset_x': 0,
            'offset_y': 0,
            'disableDrag': false,
            'singleNode': false,
            'data': {
              'dataDate': null,
              'customerId': '62002',
              'customerName': '河北公司',
              'customerType': '2',
              'creditLine': 2500000,
              'creditBalance': null,
              'guarantBalance': null,
              'branchId': '1002',
              'branchName': null,
              'nodeId': '62002'
            }
          },
          {
            'id': '540203',
            'text': '孙策',
            'isShow': true,
            'isHide': false,
            'expanded': true,
            'selected': false,
            'styleClass': 'node-style-start',
            'opacity': 1,
            'fixed': false,
            'width': 50,
            'height': 50,
            'offset_x': 0,
            'offset_y': 0,
            'disableDrag': false,
            'singleNode': false,
            'data': {
              'dataDate': null,
              'customerId': '540203',
              'customerName': '孙策',
              'customerType': '1',
              'creditLine': 1000000,
              'creditBalance': null,
              'guarantBalance': null,
              'branchId': '1002',
              'branchName': null,
              'nodeId': '540203'
            }
          },
          {
            'id': '540202',
            'text': '刘雨禅',
            'isShow': true,
            'isHide': false,
            'expanded': true,
            'selected': false,
            'styleClass': 'node-style-start',
            'opacity': 1,
            'fixed': false,
            'width': 50,
            'height': 50,
            'offset_x': 0,
            'offset_y': 0,
            'disableDrag': false,
            'singleNode': false,
            'data': {
              'dataDate': null,
              'customerId': '540202',
              'customerName': '刘雨禅',
              'customerType': '1',
              'creditLine': 150000,
              'creditBalance': null,
              'guarantBalance': null,
              'branchId': '1002',
              'branchName': null,
              'nodeId': '540202'
            }
          },
          {
            'id': '540201',
            'text': '曹玄亮',
            'isShow': true,
            'isHide': false,
            'expanded': true,
            'selected': false,
            'styleClass': 'node-style-start',
            'opacity': 1,
            'fixed': false,
            'width': 50,
            'height': 50,
            'offset_x': 0,
            'offset_y': 0,
            'disableDrag': false,
            'singleNode': false,
            'data': {
              'dataDate': null,
              'customerId': '540201',
              'customerName': '曹玄亮',
              'customerType': '1',
              'creditLine': 100000,
              'creditBalance': null,
              'guarantBalance': null,
              'branchId': '1002',
              'branchName': null,
              'nodeId': '540201'
            }
          },
          {
            'id': 'p1',
            'text': 'p1'
          },
          {
            'id': 'p2',
            'text': 'p2'
          },
          {
            'id': 'p3',
            'text': 'p3'
          },
          {
            'id': 'p4',
            'text': 'p4'
          },
          {
            'id': 'p5',
            'text': 'p5'
          }
        ],
        'lines': [
          {
            'from': '540203',
            'to': '540202',
            'text': '375000',
            'color': '',
            'isHide': false,
            'disableDefaultClickEffect': false,
            'showStartArrow': false,
            'showEndArrow': true,
            'useTextPath': false,
            'hidden': false,
            'data': {
              'dataDate': null,
              'contractId': '218765212',
              'contractName': '540203_aa_540202',
              'guarMode': 'aa',
              'customerId': null,
              'toCustomerId': null,
              'guarantAmont': 375000,
              'occupyAmount': null,
              'startDate': '2022-01-01',
              'endDate': '2025-12-31',
              'branchId': '1002',
              'branchName': null,
              'edgeVid': 'GuarantDtl540203540202',
              'edgeType': 'GuarantDtl',
              'sourceNodeId': '540203',
              'targetNodeId': '540202',
              'label': '375000'
            },
            'textPositon': {
              'x': 0,
              'y': 0
            }
          },
          {
            'from': '540201',
            'to': '62002',
            'text': '25000',
            'color': '',
            'isHide': false,
            'disableDefaultClickEffect': false,
            'showStartArrow': false,
            'showEndArrow': true,
            'useTextPath': false,
            'hidden': false,
            'data': {
              'dataDate': null,
              'contractId': '782644743',
              'contractName': '540201_cc_62002',
              'guarMode': 'cc',
              'customerId': null,
              'toCustomerId': null,
              'guarantAmont': 25000,
              'occupyAmount': null,
              'startDate': '2022-01-01',
              'endDate': '2025-12-31',
              'branchId': '1002',
              'branchName': null,
              'edgeVid': 'GuarantDtl54020162002',
              'edgeType': 'GuarantDtl',
              'sourceNodeId': '540201',
              'targetNodeId': '62002',
              'label': '25000'
            },
            'textPositon': {
              'x': 0,
              'y': 0
            }
          },
          {
            'from': '540202',
            'to': '540201',
            'text': '37500',
            'color': '',
            'isHide': false,
            'disableDefaultClickEffect': false,
            'showStartArrow': false,
            'showEndArrow': true,
            'useTextPath': false,
            'hidden': false,
            'data': {
              'dataDate': null,
              'contractId': '678351746',
              'contractName': '540202_aa_540201',
              'guarMode': 'aa',
              'customerId': null,
              'toCustomerId': null,
              'guarantAmont': 37500,
              'occupyAmount': null,
              'startDate': '2022-01-01',
              'endDate': '2025-12-31',
              'branchId': '1002',
              'branchName': null,
              'edgeVid': 'GuarantDtl540202540201',
              'edgeType': 'GuarantDtl',
              'sourceNodeId': '540202',
              'targetNodeId': '540201',
              'label': '37500'
            },
            'textPositon': {
              'x': 0,
              'y': 0
            }
          },
          {
            'from': '62002',
            'to': '540203',
            'text': '625000',
            'color': '',
            'isHide': false,
            'disableDefaultClickEffect': false,
            'showStartArrow': false,
            'showEndArrow': true,
            'useTextPath': false,
            'hidden': false,
            'data': {
              'dataDate': null,
              'contractId': '286178030',
              'contractName': '62002_dd_540203',
              'guarMode': 'dd',
              'customerId': null,
              'toCustomerId': null,
              'guarantAmont': 625000,
              'occupyAmount': null,
              'startDate': '2022-01-01',
              'endDate': '2025-12-31',
              'branchId': '1002',
              'branchName': null,
              'edgeVid': 'GuarantDtl62002540203',
              'edgeType': 'GuarantDtl',
              'sourceNodeId': '62002',
              'targetNodeId': '540203',
              'label': '625000'
            },
            'textPositon': {
              'x': 0,
              'y': 0
            }
          },
          {
            'from': '540203',
            'to': 'p1'
          },
          {
            'from': 'p1',
            'to': 'p2'
          },
          {
            'from': 'p2',
            'to': 'p3'
          },
          {
            'from': 'p3',
            'to': 'p4'
          },
          {
            'from': 'p4',
            'to': 'p5'
          },
          {
            'from': 'p5',
            'to': '62002'
          }
        ]
      };
      const rgInstanceRef = this.$refs.seeksRelationGraph
      rgInstanceRef.getInstance().$canvasDom.style.opacity = 0.01
      rgInstanceRef.setJsonData(__graph_json_data, (graphInstance) => {
          // 这些写上当图谱初始化完成后需要执行的代码.
        rgInstanceRef.getInstance().$canvasDom.style.opacity = 1
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
