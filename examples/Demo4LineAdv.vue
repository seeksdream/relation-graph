<template>
  <div>
    <div style="height:calc(100vh - 50px);">
      <RelationGraph
        ref="seeksRelationGraph"
        :options="graphOptions"
        :on-node-click="onNodeClick"
        :on-line-click="onLineClick" />
    </div>
    <el-button type="success" class="c-show-code-button"><el-link href="https://github.com/seeksdream/relation-graph/blob/master/examples/views/seeks-graph-docs/demo/Demo4LineAdv.vue" target="_blank" style="color: #ffffff;">查看代码</el-link></el-button>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from 'relation-graph';
export default {
  name: 'Demo',
  components: { },
  data() {
    return {
      isShowCodePanel: false,
      graphOptions: {
        defaultNodeBorderWidth: 0,
        checkedLineColor: '#ff0000', // 当线条被选中时的颜色
        layouts: [
          {
            layoutName: 'fixed'
          }
        ]
        // 这里可以参考"Graph 图谱"中的参数进行设置
      }
    };
  },
  mounted() {
    this.showSeeksGraph();
  },
  methods: {
    showSeeksGraph() {
      const rootX = 0;
      const rootY = 0;
      const __graph_json_data = {
        rootId: 'a',
        nodes: [
          { id: 'a', text: 'A', x: rootX, y: rootY },
          { id: 'c', text: 'C', x: rootX + 350, y: rootY + 5 },
          { id: 'b', text: 'B', x: rootX - 220, y: rootY - 2 },
          { id: 'e', text: 'E', x: rootX + 126, y: rootY - 171 },
          { id: 'i', text: 'I', x: rootX + 1, y: rootY + 173 },
          { id: 'm', text: 'M', x: rootX + 425, y: rootY + 171 },
          { id: 'm2', text: 'M-2', x: rootX + 459, y: rootY - 189 },
          { id: 'm3', text: 'M-3', x: rootX + 236, y: rootY - 177 },
          { id: 'm4', text: 'M-4', x: rootX + 354, y: rootY - 183 },
          { id: 'p3', text: 'P-3', x: rootX - 386, y: rootY - 389 },
          { id: 'p4', text: 'P-4', x: rootX + 450, y: rootY - 459 }
        ],
        lines: [
          { from: 'a', to: 'c', text: 'a > c', color: 'rgba(30, 144, 255, 1)' },
          { from: 'c', to: 'a', text: 'c > a', color: 'rgba(255, 140, 0, 1)' },
          { from: 'a', to: 'b', text: '双向箭头', showStartArrow: true, showEndArrow: true },
          { from: 'a', to: 'e', text: '不显示箭头', isHideArrow: true },
          { from: 'b', to: 'i', text: '折线', lineShape: 4 },
          { from: 'c', to: 'm2', text: '样式3', lineShape: 3, color: '#00ced1' },
          { from: 'c', to: 'm3', text: '样式3', lineShape: 3, color: '#00ced1' },
          { from: 'c', to: 'm4', text: '样式3', lineShape: 3, color: '#00ced1' },
          { from: 'i', to: 'm', text: '数据为：i > m 但显示为 m > i', showStartArrow: true, showEndArrow: false, color: '#00ced1' },
          { from: 'i', to: 'm', text: '数据为：i > m', showStartArrow: false, showEndArrow: true, color: 'rgba(255, 140, 0, 1)' },
          { from: 'e', to: 'p3', text: '这条关系线的文字非常长，但不顺着这条线走', lineShape: 5, color: '#ffd700' },
          { from: 'e', to: 'p4', text: '这条关系线的文字非常长，它可以顺着这条线走', useTextPath: true, lineShape: 5, color: '#ffd700' }
        ]
      };
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
      this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (graphInstance) => {
        // 这些写上当图谱初始化完成后需要执行的代码
      });
    },
    onNodeClick(nodeObject, $event) {
      console.log('onNodeClick:', nodeObject);
    },
    onLineClick(lineObject, linkObject, $event) {
      console.log('onLineClick:', lineObject, linkObject);
    }
  }
};
</script>

<style lang="scss">
</style>

<style lang="scss" scoped>
</style>
