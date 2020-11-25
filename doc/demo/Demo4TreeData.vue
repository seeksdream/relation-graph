<template>
  <div style="">
    <div style="margin-top:10px;width:700px;padding:20px;">
      这个示例中，调用setJsonData时传递的是一个典型的有层级结构的数据，图谱会自动识别（通过children属性识别子节点），再将其做扁平化处理。这样做仅仅是为了方便展示一些树状图谱。
      <br>
      直接使用tree数据结构有明显的确缺陷：只能设置全局的线条默认样式，无法对具体的link设置属性，不能精细化的定义线条的样式。
    </div>
    <div v-loading="g_loading" style="width: calc(100% - 10px);height:calc(100vh - 140px);border-top: #efefef solid 1px;">
      <SeeksRelationGraph ref="seeksRelationGraph" :options="graphOptions">
      </SeeksRelationGraph>
    </div>
    <el-button type="success" class="c-show-code-button">
      <el-link href="https://github.com/seeksdream/relation-graph/blob/master/doc/demo/Demo4TreeData.vue" target="_blank" style="color: #ffffff;">查看代码
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
            {'id': 'a', 'text': 'a', 'children': [
                {'id': 'b', 'text': 'b', 'children': [
                    {'id': 'b1', 'text': 'b1', 'children': [
                        {'id': 'b1-1','text': 'b1-1'},
                        {'id': 'b1-2', 'text': 'b1-2'},
                        {'id': 'b1-3', 'text': 'b1-3'},
                        {'id': 'b1-4','text': 'b1-4'},
                        {'id': 'b1-5', 'text': 'b1-5'},
                        {'id': 'b1-6', 'text': 'b1-6'},
                      ]
                    },
                    {'id': 'b2', 'text': 'b2', 'children': [
                        {'id': 'b2-1','text': 'b2-1'},
                        {'id': 'b2-2', 'text': 'b2-2'},
                      ]
                    },
                  ]
                },
                {'id': 'c', 'text': 'c', 'children': [
                    {'id': 'c1', 'text': 'c1' },
                    {'id': 'c2', 'text': 'c2' },
                    {'id': 'c3','text': 'c3' }
                  ]
                },
              ]
            }
          ],
          'links': [
            // 你仍然可以通过常规方式添加关系
          ]
        }
        console.log(JSON.stringify(__graph_json_data))
        this.g_loading = false
        this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (seeksRGGraph) => {
          // 这些写上当图谱初始化完成后需要执行的代码
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
