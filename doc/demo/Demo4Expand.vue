<template>
  <div>
    <div v-loading="g_loading" style="margin-top:50px;width: calc(100% - 10px);height:calc(100vh - 140px);">
      <SeeksRelationGraph ref="seeksRelationGraph" :options="graphOptions" :on-node-expand="onNodeExpand" :on-node-collapse="onNodeCollapse">
      </SeeksRelationGraph>
    </div>
    <el-button type="success" class="c-show-code-button">
      <el-link href="https://github.com/seeksdream/relation-graph/blob/master/doc/demo/Demo4Expand.vue" target="_blank" style="color: #ffffff;">查看代码
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
        graphOptions: {
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
            {'id': 'b', 'text': 'b-固定数据展开/关闭'},
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
            {'id': 'c', 'text': 'c-动态数据展开/关闭'},
            {'id': 'c1', 'text': 'c1-动态获取子节点', expandHolderPosition: 'right', expanded: false, data: { isNeedLoadDataFromRemoteServer: true, childrenLoaded: false } },
            {'id': 'c2', 'text': 'c2-动态获取子节点', expandHolderPosition: 'right', expanded: false, data: { isNeedLoadDataFromRemoteServer: true, childrenLoaded: false } },
            {'id': 'c3','text': 'c3-动态获取子节点', expandHolderPosition: 'right', expanded: false, data: { isNeedLoadDataFromRemoteServer: true, childrenLoaded: false } }],
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
        setTimeout(function () {
          this.g_loading = false
          this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (seeksRGGraph) => {
            // 这些写上当图谱初始化完成后需要执行的代码
          })
        }.bind(this), 1000)
      },
      onNodeCollapse(node, e) {
        this.$refs.seeksRelationGraph.refresh()
      },
      // 通过onNodeExpand事件监听节点的展开事件，在被展开的时候有选择的去从后台获取数据，如果已经从后台加载过数据，则让当前图谱根据当前的节点重新布局
      onNodeExpand(node, e) {
        console.log('onNodeExpand:', node)
        // 根据具体的业务需要决定是否需要从后台加载数据
        if (!node.data.isNeedLoadDataFromRemoteServer) {
          console.log('这个节点的子节点已经加载过了')
          this.$refs.seeksRelationGraph.refresh()
          return
        }
        //判断是否已经动态加载数据了
        if (node.data.childrenLoaded) {
          console.log('这个节点的子节点已经加载过了')
          this.$refs.seeksRelationGraph.refresh()
          return
        }
        this.g_loading = true
        node.data.childrenLoaded = true
        this.loadChildNodesFromRemoteServer(node, new_data => {
          this.g_loading = false
          this.$refs.seeksRelationGraph.appendJsonData(new_data, (seeksRGGraph) => {
            // 这些写上当图谱初始化完成后需要执行的代码
          })
        })
      },
      loadChildNodesFromRemoteServer(node, callback) {
        setTimeout(function () {
          var _new_json_data = {
            nodes: [
              {id: node.id + '-child-1', text: node.id + '-的动态子节点1', width: 150 },
              {id: node.id + '-child-2', text: node.id + '-的动态子节点2', width: 150 },
              {id: node.id + '-child-3', text: node.id + '-的动态子节点3', width: 150 }
            ],
            links: [
              {from: node.id, to: node.id + '-child-1', text: '动态子节点'},
              {from: node.id, to: node.id + '-child-2', text: '动态子节点'},
              {from: node.id, to: node.id + '-child-3', text: '动态子节点'}
            ]
          }
          callback(_new_json_data)
        }.bind(this), 1000)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
