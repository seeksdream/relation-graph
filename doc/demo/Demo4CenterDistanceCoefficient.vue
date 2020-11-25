<template>
  <div>
    <div style="margin-top:10px;border-bottom: #efefef solid 1px;padding-left:20px;">
      <div style="width: 700px;">
        <div style="padding-bottom: 10px;color: #333333;">图谱默认会根据当前可见范围自动调整各个层级之间的距离，<b>图谱会尽量让图谱显得舒展且不超出可见范围</b>。再次基础上你可以选择让距离更大一些或更小一些。</div>
        <span class="c-label">层级距离系数:</span>
        <el-slider v-model="distanceCoefficient" :max="3" :min="0.2" :step="0.1" @change="onChangeOption">
        </el-slider>
      </div>
    </div>
    <div v-loading="g_loading" style="width: calc(100% - 10px);height:calc(100vh - 190px);">
      <SeeksRelationGraph ref="seeksRelationGraph" :options="graphOptions">
      </SeeksRelationGraph>
    </div>
    <el-button type="success" class="c-show-code-button">
      <el-link href="https://github.com/seeksdream/relation-graph/blob/master/doc/demo/Demo4CenterDistanceCoefficient.vue" target="_blank" style="color: #ffffff;">查看代码
      </el-link>
    </el-button>
  </div>
</template>

<script>
import SeeksRelationGraph from 'relation-graph'

  export default {
    name: 'SeeksRelationGraphDemo',
    components: {SeeksRelationGraph},
    data() {
      return {
        g_loading: true,
        demoname: '---',
        activeTabName: 'case1',
        distanceCoefficient: 1,
        graphOptions: {
          debug: true,
          allowSwitchLineShape: true,
          allowSwitchJunctionPoint: true,
          "defaultExpandHolderPosition": "right",
          'defaultNodeBorderWidth': 0,
          'defaultLineColor': 'rgba(0, 186, 189, 1)',
          'defaultNodeColor': 'rgba(0, 206, 209, 1)',
          'layouts': [
            {
              'label': '中心',
              'layoutName': 'center',
              'layoutClassName': 'seeks-layout-center',
              distance_coefficient: 1
            }
          ]
        }
      }
    },
    created() {
    },
    mounted() {
      this.demoname = this.$route.params.demoname
      this.setGraphData()
    },
    methods: {
      setGraphData() {
        // 使用要点：通过节点属性expandHolderPosition: 'right' 和 expanded: false 可以让节点在没有子节点的情况下展示一个"展开"按钮
        //         通过onNodeExpand事件监听节点，在被展开的时候有选择的去从后台获取数据，如果已经从后台加载过数据，则让当前图谱根据当前的节点重新布局
        var __graph_json_data = {
          'rootId': 'a',
          'nodes': [
            {'id': 'a', 'text': 'a'},
            {'id': 'b', 'text': 'b'},
            {'id': 'b1', 'text': 'b1'},
            {'id': 'b1-1','text': 'b1-1'},
            {'id': 'b1-2', 'text': 'b1-2'},
            {'id': 'b1-3', 'text': 'b1-3'},
            {'id': 'b1-4','text': 'b1-4'},
            {'id': 'b1-5', 'text': 'b1-5'},
            {'id': 'b1-6', 'text': 'b1-6'},
            {'id': 'b2', 'text': 'b2'},
            {'id': 'b2-1','text': 'b2-1'},
            {'id': 'b2-2', 'text': 'b2-2'},
            {'id': 'c', 'text': 'c'},
            {'id': 'c1', 'text': 'c1' },
            {'id': 'c2', 'text': 'c2' },
            {'id': 'c3','text': 'c3' }],
          'links': [
            {'from': 'a', 'to': 'b'},
            {'from': 'b', 'to': 'b1'},
            {'from': 'b1', 'to': 'b1-1'},
            {'from': 'b1','to': 'b1-2'},
            {'from': 'b1', 'to': 'b1-3'},
            {'from': 'b1', 'to': 'b1-4'},
            {'from': 'b1', 'to': 'b1-5'},
            {'from': 'b1','to': 'b1-6'},
            {'from': 'b', 'to': 'b2'},
            {'from': 'b2', 'to': 'b2-1'},
            {'from': 'b2', 'to': 'b2-2'},
            {'from': 'a','to': 'c' },
            {'from': 'c', 'to': 'c1'},
            {'from': 'c', 'to': 'c2'},
            {'from': 'c','to': 'c3'}]
        }
        this.g_loading = false
        this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (seeksRGGraph) => {
          // 这些写上当图谱初始化完成后需要执行的代码
        })
      },
      onChangeOption() {
        // this.$refs.seeksRelationGraph.graphSetting.layouter.config.distance_coefficient = this.distance_coefficient
        // this.$refs.seeksRelationGraph.refresh()
        this.graphOptions.layouts[0].distance_coefficient = this.distanceCoefficient
        this.$refs.seeksRelationGraph.setOptions(this.graphOptions, (seeksRGGraph) => {
          // 这些写上当图谱初始化完成后需要执行的代码
          console.log('setOptions:callback:', seeksRGGraph)
          // seeksRGGraph.refresh()
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .c-label{
    color: #666666;
    font-size: 14px;
    padding-left:10px;
    padding-right:10px;
  }
</style>
