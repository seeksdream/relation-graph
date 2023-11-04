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
        "debug": true,
        "showDebugPanel": true,
        "backgrounImage": "",
        "downloadImageFileName": "",
        "disableZoom": false,
        "disableDragNode": false,
        "moveToCenterWhenRefresh": false,
        "zoomToFitWhenRefresh": true,
        "useAnimationWhenRefresh": true,
        "defaultFocusRootNode": true,
        "disableNodeClickEffect": false,
        "disableLineClickEffect": false,
        "allowShowZoomMenu": true,
        "allowAutoLayoutIfSupport": true,
        "allowShowRefreshButton": true,
        "allowShowDownloadButton": false,
        "backgrounImageNoRepeat": false,
        "allowShowMiniToolBar": false,
        "allowSwitchLineShape": false,
        "allowSwitchJunctionPoint": false,
        "isMoveByParentNode": false,
        "defaultExpandHolderPosition": "hide",
        "defaultNodeColor": "rgba(0, 206, 209, 1)",
        "checkedLineColor": "#FD8B37",
        "defaultNodeFontColor": "#ffffff",
        "defaultNodeBorderColor": "#90EE90",
        "defaultNodeBorderWidth": 0,
        "defaultLineColor": "#38f",
        "defaultLineWidth": 1,
        "defaultLineShape": 6,
        "defaultNodeShape": 1,
        "defaultShowLineLabel": true,
        "hideNodeContentByZoom": false,
        "defaultJunctionPoint": "tb",
        "disableDragCanvas": false,
        "placeSingleNode": true,
        "lineUseTextPath": false,
        "defaultLineMarker": {
          "markerWidth": 15,
          "markerHeight": 15,
          "refX": 5,
          "refY": 7,
          "color": "#38f",
          "data": "M 14 7 L 1 .3 L 4 7 L .4 13 L 14 7, Z"
        },
        "allowShowMiniView": false,
        "allowShowSettingPanel": false,
        "allowShowMiniNameFilter": true,
        "checkedNodeId": "91441900281885457F",
        "checkedLineId": "",
        "layouts": [
          {
            "label": "中心",
            "layoutName": "tree",
            "layoutClassName": "seeks-layout-center",
            "defaultJunctionPoint": "tb",
            "defaultNodeShape": 1,
            "defaultLineShape": 1,
            "from": "top",
            "min_per_width": "170",
            "min_per_height": "100",
            "levelDistance": "180,220,220,220,220",
            "layoutDirection": "v",
            "centerOffset_x": 0,
            "centerOffset_y": 0
          }
        ],
        "isNeedShowAutoLayoutButton": false,
        "showSingleNode": true,
        "showNodeLabel": true,
        "showNodeShortLabel": true,
        "defaultLinefontColor": "#38f"
      },
    };
  },
  mounted() {
    this.showSeeksGraph();
  },
  methods: {
    showSeeksGraph() {
      // const __graph_json_data = {
      //   rootId: 'a',
      //   nodes: [
      //     { id: 'a', text: 'A', borderColor: 'yellow' },
      //     { id: 'b', text: 'B', color: '#43a2f1', fontColor: 'yellow' },
      //     { id: 'c', text: 'C', nodeShape: 1, width: 80, height: 60 },
      //     { id: 'e', text: 'E', nodeShape: 0, width: 150, height: 150 }
      //   ],
      //   lines: [
      //     { from: 'a', to: 'b', text: '关系1', color: '#43a2f1' },
      //     { from: 'a', to: 'c', text: '关系2' },
      //     { from: 'a', to: 'e', text: '关系3' },
      //     { from: 'b', to: 'e', text: '', color: '#67C23A' }
      //   ]
      // };
      const __graph_json_data = {
        "rootId": "91441900281885457F",
        "nodes": [
          {
            "id": "91441900281885457F",
            "text": "东莞金融控股集团有限公司",
            "isShow": true,
            "isHide": false,
            "expanded": true,
            "selected": false,
            "styleClass": "",
            "color": "#0c69d9",
            "opacity": 1,
            "fixed": false,
            "width": 300,
            "height": 50,
            "x": -158,
            "y": -351.5,
            "offset_x": 0,
            "offset_y": 0,
            "expandHolderPosition": "bottom",
            "disableDrag": false,
            "singleNode": false,
            "data": {
              "childrenLoaded": true,
              "nodeLevel": 0,
              "corpType": null,
              "creditCode": null,
              "dwmc": null,
              "zcdz": null,
              "clrq": null,
              "zczb": null
            }
          },
          {
            "id": "91441900281885457F@91441900MA4WGM6U4U",
            "text": "东莞市产业投资母基金有限公司",
            "isShow": true,
            "isHide": false,
            "expanded": false,
            "selected": false,
            "styleClass": "",
            "color": "#38f",
            "opacity": 1,
            "fixed": false,
            "x": -854,
            "y": -171.5,
            "offset_x": 0,
            "offset_y": 0,
            "expandHolderPosition": null,
            "disableDrag": false,
            "singleNode": false,
            "data": {
              "childrenLoaded": false,
              "nodeLevel": 0,
              "corpType": null,
              "creditCode": null,
              "dwmc": null,
              "zcdz": null,
              "clrq": null,
              "zczb": null
            }
          },
          {
            "id": "91441900281885457F@91441900682488583T",
            "text": "东莞市莞邑投资有限公司",
            "isShow": true,
            "isHide": false,
            "expanded": false,
            "selected": false,
            "styleClass": "",
            "color": "#38f",
            "opacity": 1,
            "fixed": false,
            "x": -680,
            "y": -171.5,
            "offset_x": 0,
            "offset_y": 0,
            "expandHolderPosition": "bottom",
            "disableDrag": false,
            "singleNode": false,
            "data": {
              "childrenLoaded": false,
              "nodeLevel": 0,
              "corpType": null,
              "creditCode": null,
              "dwmc": null,
              "zcdz": null,
              "clrq": "2008-12-30",
              "zczb": 5000,
              "fddbr": "麦林善"
            }
          },
          {
            "id": "91441900281885457F@914403003582387777",
            "text": "深圳前海莞信投资基金管理有限公司",
            "isShow": true,
            "isHide": false,
            "expanded": false,
            "selected": false,
            "styleClass": "",
            "color": "#38f",
            "opacity": 1,
            "fixed": false,
            "x": -506,
            "y": -171.5,
            "offset_x": 0,
            "offset_y": 0,
            "expandHolderPosition": "bottom",
            "disableDrag": false,
            "singleNode": false,
            "data": {
              "childrenLoaded": false,
              "nodeLevel": 0,
              "corpType": null,
              "creditCode": null,
              "dwmc": null,
              "zcdz": null,
              "clrq": null,
              "zczb": null
            }
          },
          {
            "id": "91441900281885457F@914419002818871883",
            "text": "东莞证券股份有限公司",
            "isShow": true,
            "isHide": false,
            "expanded": false,
            "selected": false,
            "styleClass": "",
            "color": "#38f",
            "opacity": 1,
            "fixed": false,
            "x": -332,
            "y": -171.5,
            "offset_x": 0,
            "offset_y": 0,
            "expandHolderPosition": "bottom",
            "disableDrag": false,
            "singleNode": false,
            "data": {
              "childrenLoaded": false,
              "nodeLevel": 0,
              "corpType": null,
              "creditCode": null,
              "dwmc": null,
              "zcdz": null,
              "clrq": null,
              "zczb": null
            }
          },
          {
            "id": "91441900281885457F@91441900281818668E",
            "text": "东莞金控资本投资有限公司",
            "isShow": true,
            "isHide": false,
            "expanded": false,
            "selected": false,
            "styleClass": "",
            "color": "#38f",
            "opacity": 1,
            "fixed": false,
            "x": -158,
            "y": -171.5,
            "offset_x": 0,
            "offset_y": 0,
            "expandHolderPosition": "bottom",
            "disableDrag": false,
            "singleNode": false,
            "data": {
              "childrenLoaded": false,
              "nodeLevel": 0,
              "corpType": null,
              "creditCode": null,
              "dwmc": null,
              "zcdz": null,
              "clrq": null,
              "zczb": null
            }
          },
          {
            "id": "91441900281885457F@91441900198065976Q",
            "text": "东莞信托有限公司",
            "isShow": true,
            "isHide": false,
            "expanded": false,
            "selected": false,
            "styleClass": "",
            "color": "#38f",
            "opacity": 1,
            "fixed": false,
            "x": 16,
            "y": -171.5,
            "offset_x": 0,
            "offset_y": 0,
            "expandHolderPosition": "bottom",
            "disableDrag": false,
            "singleNode": false,
            "data": {
              "childrenLoaded": false,
              "nodeLevel": 0,
              "corpType": null,
              "creditCode": null,
              "dwmc": null,
              "zcdz": null,
              "clrq": null,
              "zczb": null
            }
          },
          {
            "id": "91441900281885457F@91441900MA52GY7E7H",
            "text": "东莞金控股权投资基金管理有限公司",
            "isShow": true,
            "isHide": false,
            "expanded": false,
            "selected": false,
            "styleClass": "",
            "color": "#38f",
            "opacity": 1,
            "fixed": false,
            "x": 190,
            "y": -171.5,
            "offset_x": 0,
            "offset_y": 0,
            "expandHolderPosition": "bottom",
            "disableDrag": false,
            "singleNode": false,
            "data": {
              "childrenLoaded": false,
              "nodeLevel": 0,
              "corpType": null,
              "creditCode": null,
              "dwmc": null,
              "zcdz": null,
              "clrq": null,
              "zczb": null
            }
          },
          {
            "id": "91441900281885457F@91440000100021204Q",
            "text": "华联期货有限公司",
            "isShow": true,
            "isHide": false,
            "expanded": false,
            "selected": false,
            "styleClass": "",
            "color": "#38f",
            "opacity": 1,
            "fixed": false,
            "x": 364,
            "y": -171.5,
            "offset_x": 0,
            "offset_y": 0,
            "expandHolderPosition": "bottom",
            "disableDrag": false,
            "singleNode": false,
            "data": {
              "childrenLoaded": false,
              "nodeLevel": 0,
              "corpType": null,
              "creditCode": null,
              "dwmc": null,
              "zcdz": null,
              "clrq": null,
              "zczb": null
            }
          },
          {
            "id": "91441900281885457F@91441900198059533R",
            "text": "广东福地投资有限公司",
            "isShow": true,
            "isHide": false,
            "expanded": false,
            "selected": false,
            "styleClass": "",
            "color": "#38f",
            "opacity": 1,
            "fixed": false,
            "x": 538,
            "y": -171.5,
            "offset_x": 0,
            "offset_y": 0,
            "expandHolderPosition": null,
            "disableDrag": false,
            "singleNode": false,
            "data": {
              "childrenLoaded": false,
              "nodeLevel": 0,
              "corpType": null,
              "creditCode": null,
              "dwmc": null,
              "zcdz": null,
              "clrq": null,
              "zczb": null
            }
          },
          {
            "id": "91441900281885457F@11441900764900834T",
            "text": "东莞市人民政府国有资产监督管理委员会",
            "isShow": true,
            "isHide": false,
            "expanded": false,
            "selected": false,
            "styleClass": "",
            "color": "#38f",
            "opacity": 1,
            "fixed": false,
            "x": -158,
            "y": -351.5,
            "offset_x": 0,
            "offset_y": 0,
            "expandHolderPosition": null,
            "disableDrag": false,
            "singleNode": false,
            "data": {
              "childrenLoaded": false,
              "nodeLevel": 0,
              "corpType": null,
              "creditCode": null,
              "dwmc": null,
              "zcdz": null,
              "clrq": null,
              "zczb": null
            }
          }
        ],
        "lines": [
          {
            "from": "91441900281885457F",
            "to": "91441900281885457F@91441900MA4WGM6U4U",
            "text": "100%",
            "color": "#d0e4ff",
            "fontColor": "#38f",
            "styleClass": "my-node",
            "isHide": false,
            "disableDefaultClickEffect": false,
            "showStartArrow": false,
            "showEndArrow": true,
            "useTextPath": false,
            "hidden": false,
            "data": {},
            "textPositon": {
              "x": 0,
              "y": 0
            }
          },
          {
            "from": "91441900281885457F",
            "to": "91441900281885457F@91441900682488583T",
            "text": "100%",
            "color": "#d0e4ff",
            "fontColor": "#38f",
            "styleClass": "my-node",
            "isHide": false,
            "disableDefaultClickEffect": false,
            "showStartArrow": false,
            "showEndArrow": true,
            "useTextPath": false,
            "hidden": false,
            "data": {},
            "textPositon": {
              "x": 0,
              "y": 0
            }
          },
          {
            "from": "91441900281885457F",
            "to": "91441900281885457F@914403003582387777",
            "text": "80%",
            "color": "#d0e4ff",
            "fontColor": "#38f",
            "styleClass": "my-node",
            "isHide": false,
            "disableDefaultClickEffect": false,
            "showStartArrow": false,
            "showEndArrow": true,
            "useTextPath": false,
            "hidden": false,
            "data": {},
            "textPositon": {
              "x": 0,
              "y": 0
            }
          },
          {
            "from": "91441900281885457F",
            "to": "91441900281885457F@914419002818871883",
            "text": "20%",
            "color": "#d0e4ff",
            "fontColor": "#38f",
            "styleClass": "my-node",
            "isHide": false,
            "disableDefaultClickEffect": false,
            "showStartArrow": false,
            "showEndArrow": true,
            "useTextPath": false,
            "hidden": false,
            "data": {},
            "textPositon": {
              "x": 0,
              "y": 0
            }
          },
          {
            "from": "91441900281885457F",
            "to": "91441900281885457F@91441900281818668E",
            "text": "100%",
            "color": "#d0e4ff",
            "fontColor": "#38f",
            "styleClass": "my-node",
            "isHide": false,
            "disableDefaultClickEffect": false,
            "showStartArrow": false,
            "showEndArrow": true,
            "useTextPath": false,
            "hidden": false,
            "data": {},
            "textPositon": {
              "x": 0,
              "y": 0
            }
          },
          {
            "from": "91441900281885457F",
            "to": "91441900281885457F@91441900198065976Q",
            "text": "77.7931%",
            "color": "#d0e4ff",
            "fontColor": "#38f",
            "styleClass": "my-node",
            "isHide": false,
            "disableDefaultClickEffect": false,
            "showStartArrow": false,
            "showEndArrow": true,
            "useTextPath": false,
            "hidden": false,
            "data": {},
            "textPositon": {
              "x": 0,
              "y": 0
            }
          },
          {
            "from": "91441900281885457F",
            "to": "91441900281885457F@91441900MA52GY7E7H",
            "text": "100%",
            "color": "#d0e4ff",
            "fontColor": "#38f",
            "styleClass": "my-node",
            "isHide": false,
            "disableDefaultClickEffect": false,
            "showStartArrow": false,
            "showEndArrow": true,
            "useTextPath": false,
            "hidden": false,
            "data": {},
            "textPositon": {
              "x": 0,
              "y": 0
            }
          },
          {
            "from": "91441900281885457F",
            "to": "91441900281885457F@91440000100021204Q",
            "text": "51%",
            "color": "#d0e4ff",
            "fontColor": "#38f",
            "styleClass": "my-node",
            "isHide": false,
            "disableDefaultClickEffect": false,
            "showStartArrow": false,
            "showEndArrow": true,
            "useTextPath": false,
            "hidden": false,
            "data": {},
            "textPositon": {
              "x": 0,
              "y": 0
            }
          },
          {
            "from": "91441900281885457F",
            "to": "91441900281885457F@91441900198059533R",
            "text": "30%",
            "color": "#d0e4ff",
            "fontColor": "#38f",
            "styleClass": "my-node",
            "isHide": false,
            "disableDefaultClickEffect": false,
            "showStartArrow": false,
            "showEndArrow": true,
            "useTextPath": false,
            "hidden": false,
            "data": {},
            "textPositon": {
              "x": 0,
              "y": 0
            }
          },
          {
            "from": "91441900281885457F@11441900764900834T",
            "to": "91441900281885457F",
            "text": "100%",
            "color": "#d0e4ff",
            "fontColor": "#38f",
            "styleClass": "my-node",
            "isHide": false,
            "disableDefaultClickEffect": false,
            "showStartArrow": false,
            "showEndArrow": true,
            "useTextPath": false,
            "hidden": false,
            "data": {},
            "textPositon": {
              "x": 0,
              "y": 0
            }
          }
        ]
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
