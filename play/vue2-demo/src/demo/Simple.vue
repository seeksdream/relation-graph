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
  name: "Demo",
  components: { },
  data() {
    return {
      isShowCodePanel: false,
      graphOptions: {
        debug: true,
        showDebugPanel: true,
        backgrounImage: "",
        downloadImageFileName: "",
        disableZoom: false,
        disableDragNode: false,
        moveToCenterWhenRefresh: false,
        zoomToFitWhenRefresh: false,
        useAnimationWhenRefresh: true,
        defaultFocusRootNode: true,
        disableNodeClickEffect: false,
        disableLineClickEffect: false,
        allowShowZoomMenu: true,
        allowAutoLayoutIfSupport: true,
        allowShowRefreshButton: true,
        allowShowDownloadButton: true,
        backgrounImageNoRepeat: false,
        // allowShowMiniToolBar: false,
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        isMoveByParentNode: false,
        defaultExpandHolderPosition: "hide",
        defaultNodeColor: "rgba(238, 178, 94, 1)",
        checkedLineColor: "#FD8B37",
        defaultNodeFontColor: "#ffffff",
        defaultNodeBorderColor: "#90EE90",
        defaultNodeBorderWidth: 0,
        defaultLineColor: "#dddddd",
        defaultLineWidth: 1,
        defaultLineShape: 1,
        defaultNodeShape: 0,
        defaultShowLineLabel: true,
        hideNodeContentByZoom: false,
        defaultJunctionPoint: "border",
        disableDragCanvas: false,
        lineUseTextPath: false,
        defaultLineMarker: {
          markerWidth: 12,
          markerHeight: 12,
          refX: 6,
          refY: 6,
          data: "M2,2 L10,6 L2,10 L6,6 L2,2",
        },
        allowShowMiniView: false,
        allowShowSettingPanel: false,
        allowShowMiniNameFilter: true,
        checkedNodeId: "N3",
        checkedLineId: "",
        layouts: [
          {
            label: "自动布局",
            layoutName: "force",
            layoutClassName: "seeks-layout-force",
            useLayoutStyleOptions: false,
            defaultNodeColor: "#FFC5A6",
            defaultNodeFontColor: "#000000",
            defaultNodeBorderColor: "#efefef",
            defaultNodeBorderWidth: 1,
            defaultLineColor: "#FD8B37",
            defaultLineWidth: 1,
            defaultShowLineLabel: true,
            defaultLineMarker: {
              markerWidth: 12,
              markerHeight: 12,
              refX: 6,
              refY: 6,
              data: "M2,2 L10,6 L2,10 L6,6 L2,2",
            },
          },
        ],
        isNeedShowAutoLayoutButton: true,
        showSingleNode: true,
        showNodeLabel: true,
        showNodeShortLabel: true,
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
        rootId: "N3",
        nodes: [
          { id: "N4", text: "十4" },
          { id: "N5", text: "十5" },
          { id: "N6", text: "十6" },
          { id: "N7", text: "十7" },
          { id: "N3", text: "十三222" },
          { id: "N9", text: "152****3393" },
          { id: "1N3", text: "十三", fixed: true, x:600,y:300 },
          { id: "1N4", text: "十4" },
          { id: "1N5", text: "十5" },
          { id: "1N6", text: "十6" },
          { id: "1N7", text: "十7" },
          { id: "1N9", text: "152****3393" },
          { id: "2N81", text: "88****1" },
          { id: "2N82", text: "88****2" },
        ],
        lines: [
          { from: "N3", to: "N9", text: "分享" },
          { from: "N3", to: "N4", text: "分享444" },
          { from: "N3", to: "N5", text: "分享555" },
          { from: "N3", to: "N6", text: "分享666" },
          { from: "N3", to: "N7", text: "分享777" },
          { from: "N9", to: "N4", text: "分享x" },
          { from: "1N3", to: "1N9", text: "分享" },
          { from: "1N3", to: "1N4", text: "分享444" },
          { from: "1N3", to: "1N5", text: "分享555" },
          { from: "1N3", to: "1N6", text: "分享666" },
          { from: "1N3", to: "1N7", text: "分享777" },
          { from: "1N9", to: "1N4", text: "分享x" }
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
      console.log("onNodeClick:", nodeObject);
    },
    onLineClick(lineObject, $event) {
      console.log("onLineClick:", lineObject);
    },
  },
};
</script>

<style lang="scss"></style>

<style lang="scss" scoped></style>
