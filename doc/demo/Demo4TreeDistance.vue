<template>
  <div>
    <div style="margin-top:10px;border-bottom: #efefef solid 1px;padding-left:20px;">
      <el-tabs v-model="activeTabName" type="card" @tab-click="onTabAciveChange">
        <el-tab-pane label="通过水平/垂直距离范围来设置" name="case1">
          <div style="width: 700px;">
            <div style="padding-bottom: 10px;color: #333333;">图谱默认会根据当前可见范围自动调整水平方向与垂直方向的距离，<b>图谱会尽量让图谱显得舒展且不超出可见范围</b>。当图谱计算出的距离小于设置的最小值时 设置的最小值会生效；当图谱计算出的最大值大于设置的最大值时 设置的最大值会生效;你可以多次尝试设置以下两组最大值和最小值，感受一下取舍关系。</div>
            <span class="c-label">节点间最小横向距离:</span>
            <el-slider v-model="range_horizontal" range :max="500" @change="onChangeOptionByCase1">
            </el-slider>
          </div>
          <div style="width: 700px;">
            <span class="c-label">节点间最小纵向距离:</span>
            <el-slider v-model="range_vertical" range :max="500" @change="onChangeOptionByCase1">
            </el-slider>
          </div>
        </el-tab-pane>
        <el-tab-pane label="通过固定的层级距离来设置" name="case2">
          <div style="width: 700px;">
            <div style="padding-bottom: 10px;color: #333333;">你可以设置每一层的距离，比如：400,200,300,500 表示根节点与第1次距离为400、第1层与第2次距离为200、第2层与第3层距离为300、第3层与第4层距离为500。如果此选项有值，则优先级高于水平/垂直距离的设置。</div>
            <span class="c-label">节点间最小横向距离:</span>
            <el-input v-model="levelDistance" placeholder="请输入内容" @change="onChangeOptionByCase2"></el-input>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div v-loading="g_loading" style="width: calc(100% - 10px);height:calc(100vh - 190px);">
      <SeeksRelationGraph ref="seeksRelationGraph" :options="graphOptions" :on-node-expand="onNodeExpand">
      </SeeksRelationGraph>
    </div>
    <el-button type="success" class="c-show-code-button">
      <el-link href="https://github.com/seeksdream/relation-graph/blob/master/doc/demo/Demo4TreeDistance.vue" target="_blank" style="color: #ffffff;">查看代码
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
        range_horizontal: [ 100, 300 ],
        range_vertical: [ 20, 100 ],
        levelDistance: '400,200,300,500',
        graphOptions: {
          debug: true,
          'backgrounImage': 'http://ai-mark.cn/images/ai-mark-desc.png',
          'backgrounImageNoRepeat': true,
          'layouts': [
            {
              'label': '树',
              'layoutName': 'tree',
              'layoutClassName': 'seeks-layout-center',
              'defaultNodeShape': 0,
              'defaultLineShape': 1,
              'from': 'left',
              // 通过这4个属性来调整 tree-层级距离&节点距离
              'min_per_width': undefined,
              'max_per_width': '300',
              'min_per_height': '40',
              'max_per_height': undefined,
              'levelDistance': '' // 如果此选项有值，则优先级高于上面那4个选项
            }
          ],
          'defaultLineMarker': {
            'markerWidth': 12,
            'markerHeight': 12,
            'refX': 6,
            'refY': 6,
            'data': 'M2,2 L10,6 L2,10 L6,6 L2,2'
          },
          "defaultExpandHolderPosition": "right",
          'defaultNodeShape': 1,
          'defaultNodeWidth': '100',
          'defaultLineShape': 4,
          'defaultJunctionPoint': 'lr',
          'defaultNodeBorderWidth': 0,
          'defaultLineColor': 'rgba(0, 186, 189, 1)',
          'defaultNodeColor': 'rgba(0, 206, 209, 1)'
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

        console.log(JSON.stringify(__graph_json_data))
        this.g_loading = false
        this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (seeksRGGraph) => {
          // 这些写上当图谱初始化完成后需要执行的代码
        })
      },
      onNodeExpand(node, e) {
        // 当有一些节点被显示或隐藏起来时，会让图谱看着很难看，需要布局器重新为节点分配位置，所以这里需要调用refresh方法来重新布局
        console.log('onNodeExpand:', node)
        this.$refs.seeksRelationGraph.refresh()
      },
      onChangeOptionByCase1() {
        this.graphOptions.layouts[0].levelDistance = '' // 因为levelDistance的优先级高，所以想要让下面四个选项有效，则需要将levelDistance置空
        this.graphOptions.layouts[0].min_per_width = this.range_horizontal[0]
        this.graphOptions.layouts[0].max_per_width = this.range_horizontal[1]
        this.graphOptions.layouts[0].min_per_height = this.range_vertical[0]
        this.graphOptions.layouts[0].max_per_height = this.range_vertical[1]
        this.$refs.seeksRelationGraph.setOptions(this.graphOptions, (seeksRGGraph) => {
          // 这些写上当图谱初始化完成后需要执行的代码
          console.log('setOptions:callback:', seeksRGGraph)
          // seeksRGGraph.refresh()
        })
      },
      onChangeOptionByCase2() {
        this.graphOptions.layouts[0].levelDistance = this.levelDistance
        this.$refs.seeksRelationGraph.setOptions(this.graphOptions, (seeksRGGraph) => {
          // 这些写上当图谱初始化完成后需要执行的代码
          console.log('setOptions:callback:', seeksRGGraph)
          // seeksRGGraph.refresh()
        })
      },
      onTabAciveChange() {
        console.log('this.activeTabName:', this.activeTabName)
        if (this.activeTabName === 'case2') {
          this.onChangeOptionByCase2()
        } else {
          this.onChangeOptionByCase1()
        }
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
