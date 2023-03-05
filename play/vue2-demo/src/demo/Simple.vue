<template>
  <!-- 软件供应商、软件、组件、许可、漏洞、中间件、操作系统 -->
  <div>
    <div ref="myPage" style="height: calc(100vh - 50px)">
      <RelationGraph
        ref="seeksRelationGraph"
        :options="graphOptions"
        :on-node-click="onNodeClick"
        :on-line-click="onLineClick"
      >
        <div
          slot="node"
          slot-scope="{ node }"
          @mouseover="showNodeTips(node, $event)"
          @mouseout="hideNodeTips(node, $event)"
          :class="[
            node.text === '软件供应商'
              ? 'supplier'
              : node.text === '软件'
              ? 'software'
              : node.text === '组件'
              ? 'module'
              : node.text === '许可'
              ? 'permission'
              : node.text === '漏洞'
              ? 'hole'
              : node.text === '中间件'
              ? 'middleware'
              : 'system'
          ]"
        >
          <!--
        :class="[
              node.text === '软件供应商'
                ? 'supplier'
                : node.text === '软件'
                ? 'software'
                : node.text === '组件'
                ? 'module'
                : node.text === '许可'
                ? 'permission'
                : node.text === '漏洞'
                ? 'hole'
                : node.text === '中间件'
                ? 'middleware'
                : 'system'
            ]"

         -->
          {{ node.text }}
        </div>
        <!-- <div
          slot="bottomPanel"
          style="
            border-top: #efefef solid 1px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            font-size: 18px;
            background-color: #ffffff;
          "
        >
          这里是底部插槽 slot="bottomPanel",可以自定义这里的内容
        </div> -->
      </RelationGraph>
    </div>
    <!-- 浮层 -->
    <div
      v-if="isShowNodeTipsPanel"
      :style="{
        left: nodeMenuPanelPosition.x + 'px',
        top: nodeMenuPanelPosition.y + 'px'
      }"
      style="
        z-index: 999;
        padding: 10px;
        background-color: #ffffff;
        border: #eeeeee solid 1px;
        box-shadow: 0px 0px 8px #cccccc;
        position: absolute;
      "
    >
      <div
        style="
          line-height: 25px;
          padding-left: 10px;
          color: #888888;
          font-size: 12px;
        "
      >
        节点名称：{{ currentNode.text }}
      </div>
      <div class="c-node-menu-item">id:{{ currentNode.text }}</div>
      <div class="c-node-menu-item">图标:{{ currentNode.data.myicon }}</div>
    </div>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from 'relation-graph';
export default {
  name: 'Demo',
  components: {},
  data() {
    return {
      isShowCodePanel: false,
      isShowNodeTipsPanel: false, // 是否显示浮层
      nodeMenuPanelPosition: { x: 0, y: 0 },
      currentNode: {},
      graphOptions: {
        allowSwitchLineShape: true, // 是否在工具栏中显示切换线条形状的按钮
        allowSwitchJunctionPoint: true, // 是否在工具栏中显示切换连接点位置的按钮
        defaultJunctionPoint: 'border', // 默认的连线与节点接触的方式（border:边缘/ltrb:上下左右/tb:上下/lr:左右）当布局为树状布局时应使用tb或者lr，这样才会好看
        // 这里可以参考"Graph 图谱"中的参数进行设置
        defaultNodeColor:'transparent',
        // defaultNodeFontColor:'',
        // defaultNodeBorderColor:'',
        defaultNodeBorderWidth:0,
        // isMoveByParentNode:true,
        // defaultNodeWidth:0,
        // defaultNodeHeight:0
      }
    }
  },
  mounted() {
    this.showSeeksGraph()
  },
  methods: {
    showSeeksGraph() {
      const __graph_json_data = {
        rootId: '2',
        nodes: [
          // 注意：在节点配置信息中，你的自定义属性需要像下面这样放到data标签中，否则数据会丢失
          { id: '1', nodeShape: 1, text: '软件供应商' },
          { id: '2', text: '软件' },
          { id: '3', nodeShape: 1, text: '组件' },
          { id: '4', nodeShape: 1, text: '漏洞' },
          { id: '6', nodeShape: 1, text: '中间件' },
          { id: '7', nodeShape: 1, text: '许可' },
          { id: '8', text: '操作系统' },
          // { id: '8', text: '节点-8' },
          // { id: '9', text: '节点-9' },
          // { id: '71', text: '节点-71' },
          // { id: '72', text: '节点-72' },
          // { id: '73', text: '节点-73' },
          // { id: '81', text: '节点-81' },
          // { id: '82', text: '节点-82' },
          // { id: '83', text: '节点-83' },
          // { id: '84', text: '节点-84' },
          // { id: '85', text: '节点-85' },
          // { id: '91', text: '节点-91' },
          // { id: '92', text: '节点-82' },
          // { id: '51', text: '节点-51' },
          // { id: '52', text: '节点-52' },
          // { id: '53', text: '节点-53' },
          // { id: '54', text: '节点-54' },
          // { id: '55', text: '节点-55' },
          // { id: '5', text: '节点-5' }
        ],
        lines: [
          { from: '7', to: '71', text: '投资' },
          { from: '7', to: '72', text: '投资' },
          { from: '7', to: '73', text: '投资' },
          { from: '8', to: '81', text: '投资' },
          { from: '8', to: '82', text: '投资' },
          { from: '8', to: '83', text: '投资' },
          { from: '8', to: '84', text: '投资' },
          { from: '8', to: '85', text: '投资' },
          { from: '9', to: '91', text: '投资' },
          { from: '9', to: '92', text: '投资' },
          { from: '5', to: '51', text: '投资1' },
          { from: '5', to: '52', text: '投资' },
          { from: '5', to: '53', text: '投资3' },
          { from: '5', to: '54', text: '投资4' },
          { from: '5', to: '55', text: '投资' },
          { from: '1', to: '2', text: '投资' },
          { from: '3', to: '1', text: '高管' },
          { from: '4', to: '2', text: '高管' },
          { from: '6', to: '2', text: '高管' },
          { from: '7', to: '2', text: '高管' },
          { from: '8', to: '2', text: '高管' },
          { from: '9', to: '2', text: '高管' },
          { from: '1', to: '5', text: '投资' }
        ]
      }
      this.$refs.seeksRelationGraph.setJsonData(
        __graph_json_data,
        (graphInstance) => {
          // 这些写上当图谱初始化完成后需要执行的代码
        }
      )
    },
    onNodeClick(nodeObject, $event) {},
    onLineClick(lineObject, linkObject, $event) {},
    showNodeTips(nodeObject, $event) {
      this.currentNode = nodeObject
      const _base_position = this.$refs.myPage.getBoundingClientRect()

      this.isShowNodeTipsPanel = true
      this.nodeMenuPanelPosition.x = $event.clientX - _base_position.x + 10
      this.nodeMenuPanelPosition.y = $event.clientY - _base_position.y + 10
    },
    hideNodeTips(nodeObject, $event) {
      this.isShowNodeTipsPanel = false
    }
  }
}
</script>

<style scoped>
.c-node-menu-item {
  line-height: 30px;
  padding-left: 10px;
  cursor: pointer;
  color: #444444;
  font-size: 14px;
  border-top: #efefef solid 1px;
}
.c-node-menu-item:hover {
  background-color: rgba(66, 187, 66, 0.2);
}

>>> .my-node-style-class .c-node-text.supplier {
  color: red !important;
}
/deep/ .rel-node-shape-0 {
  width: auto;
  height: auto;
}
.supplier {
  width: 200px;
  height: 30px;
  line-height: 30px;
  background-color: #aaaaaa;
  color: #000000;
}
.software {
  width: 150px;
  height: 50px;
  line-height: 50px;
  background-color: #8080ff;
  color: #000000;
  border-radius: 50%;
}
.module {
  width: 150px;
  height: 50px;
  line-height: 50px;
  background-color: #caf982;
  color: #000000;
}
.permission {
  width: 250px;
  height: 30px;
  line-height: 30px;
  background-color: #80ffff;
  color: #000000;
}
.hole {
  width: 250px;
  height: 30px;
  line-height: 30px;
  background-color: #d9001b;
  color: #ffffff;
}
.middleware {
  width: 250px;
  height: 30px;
  line-height: 30px;
  background-color: #facd91;
  color: #000000;
}
.system {
  width: 100px;
  height: 100px;
  line-height: 100px;
  background-color: #facd91;
  color: #000000;
  border-radius: 50%;
}
</style>
