<template>
  <div>
    <div style="height:calc(100vh - 50px);">
      <RelationGraph
        ref="seeksRelationGraph"
        :options="graphOptions"
        :on-node-click="onNodeClick"
        :on-line-click="onLineClick" />
    </div>
    <el-button type="success" class="c-show-code-button"><el-link href="https://github.com/seeksdream/relation-graph/blob/master/examples/views/seeks-graph-docs/demo/Demo4Node.vue" target="_blank" style="color: #ffffff;">查看代码</el-link></el-button>
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
        // 这里可以参考"Graph 图谱"中的参数进行设置
      }
    };
  },
  mounted() {
    this.showSeeksGraph();
  },
  methods: {
    showSeeksGraph(query) {
      const __graph_json_data = {
        rootId: 'a',
        nodes: [
          { id: 'a', text: '边框颜色', borderColor: 'yellow' },
          { id: 'a1', text: '无边框', borderWidth: -1, color: '#ff8c00' },
          { id: 'a1-1', html: '<span style="color:#ff8c00">纯文字节点</span>' },
          { id: 'a1-2', html: '<img src="https://camo.githubusercontent.com/ede1654f055903cdc39044129d15d5b158f4f3b33ba5b7c21c7407792a506dea/687474703a2f2f72656c6174696f6e2d67726170682e636f6d2f776562736974652f6c6f676f" width="200" style="border:#ff8c00 solid 2px;" />', nodeShape: 1 },
          { id: 'a1-3', html: '<img src="https://camo.githubusercontent.com/ede1654f055903cdc39044129d15d5b158f4f3b33ba5b7c21c7407792a506dea/687474703a2f2f72656c6174696f6e2d67726170682e636f6d2f776562736974652f6c6f676f" width="100" style="border:#ff8c00 solid 2px;border-radius: 60px;" />', nodeShape: 0 },
          { id: 'a1-4', html: '<div style="border:#ff8c00 solid 2px;height:80px;width:80px;border-radius: 40px;background-image: url(https://camo.githubusercontent.com/ede1654f055903cdc39044129d15d5b158f4f3b33ba5b7c21c7407792a506dea/687474703a2f2f72656c6174696f6e2d67726170682e636f6d2f776562736974652f6c6f676f);background-position: center center;" />', nodeShape: 0 },
          { id: 'b', text: '字体颜色', borderWidth: 1, color: '#43a2f1' },
          { id: 'c', text: '文字颜色', fontColor: 'yellow' },
          { id: 'd', text: '节点大小', width: 150, height: 150, color: '#ffd700', borderWidth: 1 },
          { id: 'e', text: '矩形节点', nodeShape: 1 },
          { id: 'f', text: '矩形节点-固定大小', borderWidth: 1, nodeShape: 1, width: 300, height: 60 },
          { id: 'f1', text: '固定位置', fixed: true, x: 20, y: 20 },
          { id: 'g', text: '自定义class实现闪烁', styleClass: 'my-node-style' }
        ],
        lines: [
          { from: 'a', to: 'b' },
          { from: 'a', to: 'c' },
          { from: 'a', to: 'a1' },
          { from: 'a1', to: 'a1-1' },
          { from: 'a1', to: 'a1-2' },
          { from: 'a1', to: 'a1-3' },
          { from: 'a1', to: 'a1-4' },
          { from: 'a', to: 'f1' },
          { from: 'a', to: 'd' },
          { from: 'd', to: 'f' },
          { from: 'a', to: 'g' },
          { from: 'a', to: 'e' },
          { from: 'b', to: 'e' }
        ]
      };
      this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (seeksRGGraph) => {
        // 这些写上当图谱初始化完成后需要执行的代码
      });
    },
    onNodeClick(nodeObject, $event) {
      console.log('onNodeClick:', nodeObject);
    },
    onLineClick(lineObject, $event) {
      console.log('onLineClick:', lineObject);
    }
  }
};
</script>

<style lang="scss">

  .my-node-style{
    background-color: #00ced1 !important;/** 通过自定义样式设置节点颜色需要加 !important **/
  }.my-node-style:hover{
    background-color: #ff0000 !important;
  }
  @keyframes myFlash {
    from {
      opacity: 1.0;
    }
    50% {
      opacity: 0.4;
    }
    to {
      opacity: 1.0;
    }
  }

  @-webkit-keyframes myFlash {
    from {
      opacity: 1.0;
    }
    50% {
      opacity: 0.4;
    }
    to {
      opacity: 1.0;
    }
  }
  .my-node-style{
    animation: myFlash 600ms infinite;
    -webkit-animation: myFlash 600ms infinite;
  }
</style>

<style lang="scss" scoped>

</style>
