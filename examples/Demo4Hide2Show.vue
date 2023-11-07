<template>
  <div>
    <div style="padding:20px;color:#666666;width:600px;">
      这个例子将帮你应对这样的一种场景：图谱默认是不显示的，当点击某个动作（点击按钮、页签之后才显示）后才显示，这种情况需要特殊处理，否则图谱会显示异常（节点不显示、线条混乱等）。处理的主要逻辑是：
      <div>
      比如点击按钮A时显示图谱，你需要在点击按钮A显示图谱之后，通过this.$nextTick()调用图谱的refresh()方法来刷新一下，这样就显示正常了，请参考当前demo的代码。
      </div>
    </div>
    <el-tabs v-model="activeTabName" type="card" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="base">基本信息</el-tab-pane>
      <el-tab-pane label="关系图谱（点这里）" name="relation">
        <div v-loading="g_loading" style="width: calc(100%);height:calc(100vh - 300px);">
          <RelationGraph ref="seeksRelationGraph" :options="graphOptions">
          </RelationGraph>
        </div>
      </el-tab-pane>
      <el-tab-pane label="风险信息" name="risk">风险信息</el-tab-pane>
    </el-tabs>

    <el-button type="success" class="c-show-code-button">
      <el-link href="https://github.com/seeksdream/relation-graph/blob/master/examples/views/seeks-graph-docs/demo/Demo4Hide2Show.vue" target="_blank" style="color: #ffffff;">查看代码
      </el-link>
    </el-button>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from 'relation-graph';

export default {
  name: 'SeeksRelationGraphDemo',
  components: { },
  data() {
    return {
      g_loading: true,
      graphDataLoaded: false,
      activeTabName: 'base',
      demoname: '---',
      graphOptions: {
        'backgrounImage': 'https://camo.githubusercontent.com/ede1654f055903cdc39044129d15d5b158f4f3b33ba5b7c21c7407792a506dea/687474703a2f2f72656c6174696f6e2d67726170682e636f6d2f776562736974652f6c6f676f',
        'backgrounImageNoRepeat': true,
        'layouts': [
          {
            'label': '中心',
            'layoutName': 'tree',
            'layoutClassName': 'seeks-layout-center',
            'defaultJunctionPoint': 'border',
            'defaultNodeShape': 0,
            'defaultLineShape': 1,
            'from': 'left',
            'max_per_width': '300',
            'min_per_height': '40'
          }
        ],
        'defaultLineMarker': {
          'markerWidth': 12,
          'markerHeight': 12,
          'refX': 6,
          'refY': 6,
          'data': 'M2,2 L10,6 L2,10 L6,6 L2,2'
        },
        'defaultExpandHolderPosition': 'right',
        'defaultNodeShape': 1,
        'defaultNodeWidth': '100',
        'defaultLineShape': 4,
        'defaultJunctionPoint': 'lr',
        'defaultNodeBorderWidth': 0,
        'defaultLineColor': 'rgba(0, 186, 189, 1)',
        'defaultNodeColor': 'rgba(0, 206, 209, 1)'
      }
    };
  },
  created() {
  },
  mounted() {
    this.demoname = this.$route.params.demoname;
  },
  methods: {
    loadGraphData() {
      const __graph_json_data = {
        'rootId': 'a',
        'nodes': [
          { 'id': 'a', 'text': 'a' },
          { 'id': 'b', 'text': 'b' },
          { 'id': 'b1', 'text': 'b1' },
          { 'id': 'b1-1', 'text': 'b1-1' },
          { 'id': 'b1-2', 'text': 'b1-2' },
          { 'id': 'b1-3', 'text': 'b1-3' },
          { 'id': 'b1-4', 'text': 'b1-4' },
          { 'id': 'b1-5', 'text': 'b1-5' },
          { 'id': 'b1-6', 'text': 'b1-6' },
          { 'id': 'b2', 'text': 'b2' },
          { 'id': 'b2-1', 'text': 'b2-1' },
          { 'id': 'b2-2', 'text': 'b2-2' },
          { 'id': 'c', 'text': 'c' },
          { 'id': 'c1', 'text': 'c1' },
          { 'id': 'c2', 'text': 'c2' },
          { 'id': 'c3', 'text': 'c3' }],
        'lines': [
          { 'from': 'a', 'to': 'b' },
          { 'from': 'b', 'to': 'b1' },
          { 'from': 'b1', 'to': 'b1-1' },
          { 'from': 'b1', 'to': 'b1-2' },
          { 'from': 'b1', 'to': 'b1-3' },
          { 'from': 'b1', 'to': 'b1-4' },
          { 'from': 'b1', 'to': 'b1-5' },
          { 'from': 'b1', 'to': 'b1-6' },
          { 'from': 'b', 'to': 'b2' },
          { 'from': 'b2', 'to': 'b2-1' },
          { 'from': 'b2', 'to': 'b2-2' },
          { 'from': 'a', 'to': 'c' },
          { 'from': 'c', 'to': 'c1' },
          { 'from': 'c', 'to': 'c2' },
          { 'from': 'c', 'to': 'c3' }]
      };

      console.log(JSON.stringify(__graph_json_data));
      setTimeout(() => { // 模拟异步获取数据
        this.g_loading = false;
        this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (graphInstance) => {
          // 这些写上当图谱初始化完成后需要执行的代码
          graphInstance.refresh();
        });
      }, 1000);
    },
    handleClick(node, e) {
      console.log('this.activeTabName:', this.activeTabName);
      if (this.activeTabName === 'relation') {
        if (!this.graphDataLoaded) { // 不重复获取数据
          this.graphDataLoaded = true;
          this.loadGraphData();
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
