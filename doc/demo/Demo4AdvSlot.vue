<template>
  <div>
    <div ref="myPage" style="height:calc(100vh - 50px);" @click="isShowNodeMenuPanel = false">
      <RelationGraph
        ref="seeksRelationGraph"
        :options="graphOptions"
        :on-node-click="onNodeClick"
        :on-line-click="onLineClick">
        <div slot="node" slot-scope="{node}">
          <div style="height:64px;line-height: 64px;border-radius: 32px;cursor: pointer;" @click="showNodeMenus(node, $event)">
            <i style="font-size: 30px;" :class="node.myicon" />
          </div>
          <div style="color: forestgreen;font-size: 16px;position: absolute;width: 160px;height:25px;line-height: 25px;margin-top:5px;margin-left:-48px;text-align: center;background-color: rgba(66,187,66,0.2);">
            {{ node.myicon }}
          </div>
        </div>
        <div slot="bottomPanel" style="border-top:#efefef solid 1px;height:60px;line-height: 60px;text-align: center;font-size: 18px;background-color: #ffffff;">
          这里是底部插槽 slot="bottomPanel",可以自定义这里的内容
        </div>
      </RelationGraph>
    </div>
    <div v-show="isShowNodeMenuPanel" :style="{left: nodeMenuPanelPosition.x + 'px', top: nodeMenuPanelPosition.y + 'px' }" style="z-index: 999;padding:10px;background-color: #ffffff;border:#eeeeee solid 1px;box-shadow: 0px 0px 8px #cccccc;position: absolute;">
      <div style="line-height: 25px;padding-left: 10px;color: #888888;font-size: 12px;">对这个节点进行操作：</div>
      <div class="c-node-menu-item" @click.stop="doAction('操作1')">操作1</div>
      <div class="c-node-menu-item" @click.stop="doAction('操作1')">操作2</div>
      <div class="c-node-menu-item" @click.stop="doAction('操作1')">操作3</div>
      <div class="c-node-menu-item" @click.stop="doAction('操作1')">操作4</div>
    </div>
    <el-button type="success" class="c-show-code-button" @click="isShowCodePanel=true">查看代码</el-button>
    <el-drawer
      title="node option:"
      direction="rtl"
      size="50%"
      custom-class="c-drawer-window"
      :modal="false"
      :visible.sync="isShowCodePanel"
      :with-header="false"
    >
    <iframe src="/relation-graph-codes/Demo4Logo.html" width="100%" height="100%" frameborder="0" scrolling="auto" style=""></iframe>
    </el-drawer>
  </div>
</template>

<script>
import RelationGraph from 'relation-graph'
export default {
  name: 'Demo',
  components: { RelationGraph },
  data() {
    return {
      isShowCodePanel: false,
      isShowNodeMenuPanel: false,
      nodeMenuPanelPosition: { x: 0, y: 0 },
      graphOptions: {
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        defaultJunctionPoint: 'border'
        // 这里可以参考"Graph 图谱"中的参数进行设置
      }
    }
  },
  mounted() {
    this.showSeeksGraph()
  },
  methods: {
    showSeeksGraph(query) {
      var __graph_json_data = {
        rootId: '2',
        nodes: [
          { id: '1', name: '节点-1', myicon: 'el-icon-star-on' },
          { id: '2', name: '节点-2', myicon: 'el-icon-setting' },
          { id: '3', name: '节点-3', myicon: 'el-icon-setting' },
          { id: '4', name: '节点-4', myicon: 'el-icon-star-on' },
          { id: '6', name: '节点-6', myicon: 'el-icon-setting' },
          { id: '7', name: '节点-7', myicon: 'el-icon-setting' },
          { id: '8', name: '节点-8', myicon: 'el-icon-star-on' },
          { id: '9', name: '节点-9', myicon: 'el-icon-headset' },
          { id: '71', name: '节点-71', myicon: 'el-icon-headset' },
          { id: '72', name: '节点-72', myicon: 'el-icon-s-tools' },
          { id: '73', name: '节点-73', myicon: 'el-icon-star-on' },
          { id: '81', name: '节点-81', myicon: 'el-icon-s-promotion' },
          { id: '82', name: '节点-82', myicon: 'el-icon-s-promotion' },
          { id: '83', name: '节点-83', myicon: 'el-icon-star-on' },
          { id: '84', name: '节点-84', myicon: 'el-icon-s-promotion' },
          { id: '85', name: '节点-85', myicon: 'el-icon-sunny' },
          { id: '91', name: '节点-91', myicon: 'el-icon-sunny' },
          { id: '92', name: '节点-82', myicon: 'el-icon-sunny' },
          { id: '51', name: '节点-51', myicon: 'el-icon-sunny' },
          { id: '52', name: '节点-52', myicon: 'el-icon-sunny' },
          { id: '53', name: '节点-53', myicon: 'el-icon-sunny' },
          { id: '54', name: '节点-54', myicon: 'el-icon-sunny' },
          { id: '55', name: '节点-55', myicon: 'el-icon-sunny' },
          { id: '5', name: '节点-5', myicon: 'el-icon-sunny' }
        ],
        links: [
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
      this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (seeksRGGraph) => {
        // 这些写上当图谱初始化完成后需要执行的代码
      })
    },
    onNodeClick(nodeObject, $event) {
      console.log('onNodeClick:', nodeObject)
    },
    onLineClick(lineObject, $event) {
      console.log('onLineClick:', lineObject)
    },
    showNodeMenus(nodeObject, $event) {
      this.currentNode = nodeObject
      var _base_position = this.$refs.myPage.getBoundingClientRect()
      console.log('showNodeMenus:', $event, _base_position)
      this.isShowNodeMenuPanel = true
      this.nodeMenuPanelPosition.x = $event.clientX - _base_position.x
      this.nodeMenuPanelPosition.y = $event.clientY - _base_position.y
    },
    doAction(actionName) {
      this.$notify({
        title: '提示',
        message: '对节点【' + this.currentNode.text + '】进行了：' + actionName,
        type: 'success'
      })
      this.isShowNodeMenuPanel = false
    }
  }
}
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
.c-node-menu-item{
  line-height: 30px;padding-left: 10px;cursor: pointer;color: #444444;font-size: 14px;border-top:#efefef solid 1px;
}
.c-node-menu-item:hover{
  background-color: rgba(66,187,66,0.2);
}
</style>
