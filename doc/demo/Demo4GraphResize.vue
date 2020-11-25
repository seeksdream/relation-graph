<template>
  <div style="">
    <div style="margin-top:10px;border-bottom: #efefef solid 1px;padding-left:20px;">
      调整图谱大小到：
      <el-radio-group v-model="currentSize" size="mini" @change="onSizeOptionChanged">
        <el-radio-button :label="400">400</el-radio-button>
        <el-radio-button :label="600">600</el-radio-button>
        <el-radio-button :label="800">800</el-radio-button>
        <el-radio-button :label="1000">1000</el-radio-button>
      </el-radio-group>
    </div>
    <div v-loading="g_loading" :style="{width: myGraphPanelSize.width + 'px',height:myGraphPanelSize.height + 'px'}" style="border:#ff0000 solid 1px;">
      <SeeksRelationGraph ref="seeksRelationGraph" :options="graphOptions">
      </SeeksRelationGraph>
    </div>
    <el-button type="success" class="c-show-code-button">
      <el-link href="https://github.com/seeksdream/relation-graph/blob/master/doc/demo/Demo4GraphResize.vue" target="_blank" style="color: #ffffff;">查看代码
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
        currentSize: 400,
        myGraphPanelSize: { width: 400, height: 400 },
        graphOptions: {
          debug: true,
          'backgrounImage': 'http://ai-mark.cn/images/ai-mark-desc.png',
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
              // 通过这4个属性来调整 tree-层级距离&节点距离
              'min_per_width': '200',
              'max_per_width': '500',
              'min_per_height': '40',
              'max_per_height': '60',
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
      onSizeOptionChanged() {
        // 图谱的大小会随着父元素的宽高自动适应，所以修改父元素的宽高就可以设置图谱的宽高
        this.myGraphPanelSize.width = this.currentSize
        this.myGraphPanelSize.height = this.currentSize
        // 你也可以在调整完大小后刷新一下图谱，确保位置是合理的
        // this.$nextTick(() => { // $nextTick的功能你懂的
        //   this.$refs.seeksRelationGraph.refresh()
        // })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
