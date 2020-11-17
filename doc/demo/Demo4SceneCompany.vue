<template>
  <div>
    <div style="width: calc(100% - 2px);height:calc(100vh - 50px);">
      <SeeksRelationGraph ref="seeksRelationGraph" :options="userGraphOptions" />
    </div>
    <el-button type="success" class="c-show-code-button"><el-link href="https://github.com/seeksdream/relation-graph/blob/master/doc/demo/Demo4SceneCompany.vue" target="_blank" style="color: #ffffff;">查看代码</el-link></el-button>
  </div>
</template>

<script>
import SeeksRelationGraph from 'relation-graph'
export default {
  name: 'SeeksRelationGraphDemo',
  components: { SeeksRelationGraph },
  data() {
    return {
      g_loading: true,
      userGraphOptions: {
        'backgrounImage': '',
        'backgrounImageNoRepeat': true,
        'layouts': [
          {
            'label': '手工',
            'layoutName': 'fixed',
            'layoutClassName': 'seeks-layout-fixed',
            'defaultJunctionPoint': 'border',
            'defaultNodeShape': 0,
            'defaultLineShape': 1
          }
        ],
        'defaultNodeBorderWidth': 0,
        'defaultNodeShape': 1,
        'allowShowMiniNameFilter': false,
        'allowShowMiniToolBar': false,
        'defaultJunctionPoint': 'lr',
        'defaultLineShape': 2
      }
    }
  },
  created() {
  },
  mounted() {
    this.setGraphData()
  },
  methods: {
    setGraphData() {
      var _orign_data = {
        entname: '中数智汇数据科技股份有限公司',
        invs: [
          { id: 'inv1', text: '北京某个公司科技有限公司', desc: '40%' },
          { id: 'inv2', text: '张蜈支', desc: '30%' },
          { id: 'inv3', text: '如花', desc: '10%' },
          { id: 'inv4', text: '路人甲', desc: '10%' },
          { id: 'inv5', text: '路人乙', desc: '10%' }
        ],
        persons: [
          { id: 'person1', text: '张蜈支', desc: '董事长' },
          { id: 'person2', text: '包奥曼', desc: '总经理' },
          { id: 'person3', text: '路人甲', desc: '监事' },
          { id: 'person4', text: '路人乙', desc: '董事' }
        ],
        asInvs: [
          { id: 'asinv1', text: '北京超级大橘科技有限公司', desc: '80%' },
          { id: 'asinv2', text: '北京超级大蚂蚁科技有限公司', desc: '70%' },
          { id: 'asinv3', text: '北京超级大米粒儿科技有限公司', desc: '20%' }
        ],
        branchs: [
          { id: 'branch1', text: '某个公司（北京）科技股份有限公司', desc: '80%' },
          { id: 'branch2', text: '某个公司（天津）科技股份有限公司', desc: '70%' },
          { id: 'branch4', text: '某个公司（成都）科技股份有限公司', desc: '70%' },
          { id: 'branch5', text: '某个公司（武汉）科技股份有限公司', desc: '20%' }
        ]
      }
      var _graphSetting = this.$refs.seeksRelationGraph.graphSetting
      this.$refs.seeksRelationGraph.graphSetting.defaultLineShape = 1

      // 手工设置节点的坐标
      const _center = {
        x: (_graphSetting.viewSize.width) / 2 - _graphSetting.canvasOffset.x,
        y: (_graphSetting.viewSize.height) / 2 - _graphSetting.canvasOffset.y
      }
      var graphData = {
        rootId: 'root',
        nodes: [],
        links: []
      }
      // 添加根节点和虚拟节点
      var rootNode = { id: graphData.rootId, name: _orign_data.entname, styleClass: 'c-g-center', color: '#A4C1FF', width: 250, height: 50, x: _center.x - 125, y: _center.y - 25 }
      var invRootNode = { id: 'invRoot', name: '股东', styleClass: 'c-g-group-node', color: '#FFC5A6', width: 100, height: 50 }
      var personRootNode = { id: 'personRoot', name: '高管', styleClass: 'c-g-group-node', color: '#B9FFA7', width: 100, height: 50 }
      var asinvRootNode = { id: 'asinvRoot', name: '对外投资', styleClass: 'c-g-group-node', color: '#FFBEC1', width: 100, height: 50 }
      var branchRootNode = { id: 'branchRoot', name: '分支机构', styleClass: 'c-g-group-node', color: '#FFA1F8', width: 100, height: 50 }
      invRootNode.x = _center.x - 200 - invRootNode.width
      invRootNode.y = _center.y - 130
      personRootNode.x = _center.x - 200 - personRootNode.width
      personRootNode.y = _center.y + 90
      asinvRootNode.x = _center.x + 200
      asinvRootNode.y = _center.y - 130
      branchRootNode.x = _center.x + 200
      branchRootNode.y = _center.y + 90
      // 添加节点数据到graphData
      graphData.nodes.push(rootNode)
      graphData.nodes.push(invRootNode)
      graphData.nodes.push(personRootNode)
      graphData.nodes.push(asinvRootNode)
      graphData.nodes.push(branchRootNode)
      // 添加根节点和虚拟节点之间的关系，并将关系数据放入graphData
      graphData.links.push({ from: rootNode.id, to: invRootNode.id, styleClass: 'c-g-l-group', color: '#C7E9FF', lineShape: 2 })
      graphData.links.push({ from: rootNode.id, to: personRootNode.id, styleClass: 'c-g-l-group', color: '#C7E9FF', lineShape: 2 })
      graphData.links.push({ from: rootNode.id, to: asinvRootNode.id, styleClass: 'c-g-l-group', color: '#C7E9FF', lineShape: 2 })
      graphData.links.push({ from: rootNode.id, to: branchRootNode.id, styleClass: 'c-g-l-group', color: '#C7E9FF', lineShape: 2 })
      // 将股东加入虚拟节点"股东"
      _orign_data.invs.forEach((thisNode, _index) => {
        thisNode.width = 200
        thisNode.x = invRootNode.x - 300 - thisNode.width
        thisNode.y = invRootNode.y + _index * 30 * -1 + 30
        graphData.nodes.push(thisNode)
        graphData.links.push({ from: invRootNode.id, to: thisNode.id, text: thisNode.desc, color: '#FFC5A6', arrow: 'none', lineShape: 4 })
      })
      // 将高管加入虚拟节点"高管"
      _orign_data.persons.forEach((thisNode, _index) => {
        thisNode.width = 200
        thisNode.x = personRootNode.x - 200 - thisNode.width
        thisNode.y = personRootNode.y + _index * 30
        graphData.nodes.push(thisNode)
        graphData.links.push({ from: personRootNode.id, to: thisNode.id, text: thisNode.desc, color: '#B9FFA7', arrow: 'none', lineShape: 4 })
      })
      // 将对外投资企业加入虚拟节点"对外投资"
      _orign_data.asInvs.forEach((thisNode, _index) => {
        thisNode.x = asinvRootNode.x + 200
        thisNode.y = asinvRootNode.y + _index * 30 * -1 + 30
        graphData.nodes.push(thisNode)
        graphData.links.push({ from: asinvRootNode.id, to: thisNode.id, text: thisNode.desc, color: '#FFBEC1', lineShape: 4 })
      })
      // 将分支机构加入虚拟节点"分支机构东"
      _orign_data.branchs.forEach((thisNode, _index) => {
        thisNode.x = branchRootNode.x + 200
        thisNode.y = branchRootNode.y + _index * 30
        graphData.nodes.push(thisNode)
        graphData.links.push({ from: branchRootNode.id, to: thisNode.id, text: thisNode.desc, color: '#FFA1F8', lineShape: 4 })
      })
      this.$refs.seeksRelationGraph.setJsonData(graphData, (seeksRGGraph) => {

      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
