<template>
  <div>
    <div style="height:calc(100vh - 50px);">
      <SeeksRelationGraph
        ref="seeksRelationGraph"
        :options="graphOptions"
        :on-node-click="onNodeClick"
        :on-line-click="onLineClick" />
    </div>
    <el-button type="success" class="c-show-code-button"><el-link href="https://github.com/seeksdream/relation-graph/blob/master/doc/demo/Demo4Line.vue" target="_blank" style="color: #ffffff;">查看代码</el-link></el-button>
  </div>
</template>

<script>
import SeeksRelationGraph from 'relation-graph'
export default {
  name: 'Demo',
  components: { SeeksRelationGraph },
  data() {
    return {
      isShowCodePanel: false,
      graphOptions: {
        defaultNodeBorderWidth: 0
        // 这里可以参考"Graph 图谱"中的参数进行设置
      }
    }
  },
  mounted() {
    this.showSeeksGraph()
  },
  methods: {
    showSeeksGraph(query) {
      var __graph_json_data = {
        rootId: 'a',
        nodes: [
          { id: 'a', text: 'A' },
          { id: 'b', text: 'B' },
          { id: 'c', text: 'C' },
          { id: 'x', text: 'X' },
          { id: 'd', text: 'D', nodeShape: 1, width: 150, height: 100 },
          { id: 'e', text: 'E', width: 150, height: 150 },
          { id: 'f', text: 'F', nodeShape: 1 },
          { id: 'g', text: 'G', borderWidth: 1, nodeShape: 1, width: 300, height: 60 },
          { id: 'h', text: 'H', fixed: true, x: 20, y: 20 },
          { id: 'i', text: 'I' },
          { id: 'k1', text: 'K-1' },
          { id: 'k2', text: 'K-2' },
          { id: 'k3', text: 'K-3' },
          { id: 'k4', text: 'K-4' },
          { id: 'm1', text: 'M-1' },
          { id: 'm2', text: 'M-2' },
          { id: 'm3', text: 'M-3' },
          { id: 'm4', text: 'M-4' },
          { id: 'p1', text: 'P-1' },
          { id: 'p2', text: 'P-2' },
          { id: 'p3', text: 'P-3' },
          { id: 'p4', text: 'P-4' }
        ],
        links: [
          { from: 'a', to: 'b', text: '文字颜色', color: '#c71585' },
          { from: 'a', to: 'c', text: '多个关系1', color: 'rgba(30, 144, 255, 1)' },
          { from: 'a', to: 'c', text: '多个关系2', color: 'rgba(255, 140, 0, 1)' },
          { from: 'c', to: 'a', text: '多个关系3', color: '#90ee90' },
          { from: 'a', to: 'd', text: '一条粗线', lineWidth: 3 },
          { from: 'a', to: 'e', text: '不显示箭头', isHideArrow: true },
          { from: 'a', to: 'f', text: '线条样式5', lineShape: 5 },
          { from: 'f', to: 'g', text: '线条样式3', lineShape: 3 },
          { from: 'a', to: 'h', text: '线和字的颜色不一样', color: 'rgba(30, 144, 255, 1)', fontColor: 'rgba(255, 140, 0, 1)' },
          { from: 'a', to: 'i', text: '折线', lineShape: 4 },
          { from: 'b', to: 'h', text: '线条样式1', lineShape: 6 },
          { from: 'd', to: 'k1', text: '样式2', lineShape: 2, color: '#ff8c00' },
          { from: 'd', to: 'k2', text: '样式2', lineShape: 2, color: '#ff8c00' },
          { from: 'd', to: 'k3', text: '样式2', lineShape: 2, color: '#ff8c00' },
          { from: 'd', to: 'k4', text: '样式2', lineShape: 2, color: '#ff8c00' },
          { from: 'c', to: 'm1', text: '样式3', lineShape: 3, color: '#00ced1' },
          { from: 'c', to: 'm2', text: '样式3', lineShape: 3, color: '#00ced1' },
          { from: 'c', to: 'm3', text: '样式3', lineShape: 3, color: '#00ced1' },
          { from: 'c', to: 'm4', text: '样式3', lineShape: 3, color: '#00ced1' },
          { from: 'e', to: 'p1', text: '样式5', lineShape: 5, color: '#ffd700' },
          { from: 'e', to: 'p2', text: '样式5', lineShape: 5, color: '#ffd700' },
          { from: 'e', to: 'p3', text: '样式5', lineShape: 5, color: '#ffd700' },
          { from: 'e', to: 'p4', text: '样式5', lineShape: 5, color: '#ffd700' },
          {
            "from": "i",
            "to": "x",
            "text": "Link2",
            "color": "rgba(255, 120, 0, 1)",
            "lineWidth": 1,
            "data": {}
          },
          {
            "from": "x",
            "to": "i",
            "text": "Link3",
            "color": "rgba(0, 206, 209, 1)",
            "isReverse": true,
            "lineWidth": 1,
            "lineShape": 1,
            "data": {}
          },
          {
            "from": "x",
            "to": "i",
            "text": "Link3",
            "color": "rgba(144, 240, 144, 0.5)",
            "isHideArrow": true,
            "lineWidth": 5,
            "lineShape": 3,
            "data": {}
          }
        ]
      }
      /**
       *
       * {
  "from": "N71",
  "to": "N66",
  "text": "持股:100%",
  "color": "rgba(30, 144, 255, 1)",
  "styleClass": "my-line-style",
  "isHide": false,
  "isHideArrow": true,
  "fontColor": "rgba(255, 140, 0, 1)",
  "lineWidth": 2,
  "lineShape": 2,
  "data": {
    "reltype": "2"
  }
}
       */
      this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (seeksRGGraph) => {
        // 这些写上当图谱初始化完成后需要执行的代码
      })
    },
    onNodeClick(nodeObject, $event) {
      console.log('onNodeClick:', nodeObject)
    },
    onLineClick(lineObject, $event) {
      console.log('onLineClick:', lineObject)
    }
  }
}
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>

</style>
