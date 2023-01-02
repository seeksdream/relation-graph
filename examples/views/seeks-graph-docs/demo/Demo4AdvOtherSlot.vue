<template>
  <div>
    <div ref="myPage" style="height:calc(100vh - 50px);" @click="isShowNodeMenuPanel = false">
      <RelationGraph
        ref="seeksRelationGraph"
        :options="graphOptions"
        :on-node-click="showNodeMenus">
        <div slot="canvas-plug" style="top:-300px;left:-300px;position:absolute; color:#ffffff;font-size:12px;width:600px;border:#efefef solid 1px;">
          <div style="background-color: #fa7b7e;padding:10px;width:100%;">这里是画布插槽 slot="canvas-plug"</div>
          <div style="background-color: #7a9ef8;padding:10px;width:100%;">可以自定义这里的内容，内容可以随着画布缩放，拖动</div>
          <div style="background-color: #f5df7a;padding:10px;width:100%;">你可以在这里放任何内容，甚至是另一个图谱，<el-link @click="toggleGraph">点击展示图谱</el-link></div>
          <div v-if="showBackgroundGraph" style="background-color: #cb7ffd;width:600px;height:600px;opacity: 0.5;overflow:hidden;">
            <Demo4SceneRelationship />
          </div>
        </div>
        <div slot="graph-plug" style="top:0px;left:0px;position:absolute; color:#ffffff;font-size:12px;width:600px;border:#efefef solid 1px;z-index:1001;">
          <div style="background-color: #fa7b7e;padding:10px;width:100%;">这里是图谱插槽 slot="graph-plug"</div>
          <div style="background-color: #7a9ef8;padding:10px;width:100%;">可以自定义这里的内容，比如你可以放一个搜索框：<el-input v-model="searchText" placeholder="你可以通过这个搜素框实现节点搜索功能" /></div>
          <div style="background-color: #7a9ef8;padding:10px;width:100%;">你需要设置这个插槽div的z-index>1000才能让这里展示在节点之上，否则它默认会被节点覆盖</div>
          <div style="background-color: #c67ffa;padding:10px;width:100%;">你可以把悬浮菜单放到这里，这样全屏后，右键菜单依然有效，点击图谱全屏按钮后再点击节点试试</div>
          <div v-show="isShowNodeMenuPanel" :style="{left: nodeMenuPanelPosition.x + 'px', top: nodeMenuPanelPosition.y + 'px' }" style="width:200px;z-index: 999;padding:10px;background-color: #ffffff;border:#eeeeee solid 1px;box-shadow: 0px 0px 8px #cccccc;position: absolute;">
            <div style="line-height: 25px;padding-left: 10px;color: #888888;font-size: 12px;">对这个节点进行操作：</div>
            <div class="c-node-menu-item" @click.stop="doAction('操作1')">操作1</div>
            <div class="c-node-menu-item" @click.stop="doAction('操作1')">操作2</div>
            <div class="c-node-menu-item" @click.stop="doAction('操作1')">操作3</div>
            <div class="c-node-menu-item" @click.stop="doAction('操作1')">操作4</div>
          </div>
        </div>
      </RelationGraph>
    </div>
    <el-button type="success" class="c-show-code-button"><el-link href="https://github.com/seeksdream/relation-graph/blob/master/examples/views/seeks-graph-docs/demo/Demo4AdvSlot.vue" target="_blank" style="color: #ffffff;">查看代码</el-link></el-button>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from 'relation-graph';
import Demo4SceneRelationship from './Demo4SceneRelationship';
export default {
  name: 'Demo',
  components: { Demo4SceneRelationship },
  data() {
    return {
      searchText: '',
      isShowCodePanel: false,
      isShowNodeMenuPanel: false,
      showBackgroundGraph: false,
      nodeMenuPanelPosition: { x: 0, y: 0 },
      graphOptions: {
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        defaultJunctionPoint: 'border'
        // 这里可以参考"Graph 图谱"中的参数进行设置
      }
    };
  },
  mounted() {
    this.showSeeksGraph();
  },
  methods: {
    showSeeksGraph() {
      const __graph_json_data = {
        rootId: '2',
        nodes: [
          // 注意：在节点配置信息中，你的自定义属性需要像下面这样放到data标签中，否则数据会丢失
          { id: '1', name: '节点-1', data: { myicon: 'el-icon-star-on' }},
          { id: '2', name: '节点-2', data: { myicon: 'el-icon-setting' }},
          { id: '3', name: '节点-3', data: { myicon: 'el-icon-setting' }},
          { id: '4', name: '节点-4', data: { myicon: 'el-icon-star-on' }},
          { id: '6', name: '节点-6', data: { myicon: 'el-icon-setting' }},
          { id: '7', name: '节点-7', data: { myicon: 'el-icon-setting' }},
          { id: '8', name: '节点-8', data: { myicon: 'el-icon-star-on' }},
          { id: '9', name: '节点-9', data: { myicon: 'el-icon-headset' }},
          { id: '71', name: '节点-71', data: { myicon: 'el-icon-headset' }},
          { id: '72', name: '节点-72', data: { myicon: 'el-icon-s-tools' }},
          { id: '73', name: '节点-73', data: { myicon: 'el-icon-star-on' }},
          { id: '81', name: '节点-81', data: { myicon: 'el-icon-s-promotion' }},
          { id: '82', name: '节点-82', data: { myicon: 'el-icon-s-promotion' }},
          { id: '83', name: '节点-83', data: { myicon: 'el-icon-star-on' }},
          { id: '84', name: '节点-84', data: { myicon: 'el-icon-s-promotion' }},
          { id: '85', name: '节点-85', data: { myicon: 'el-icon-sunny' }},
          { id: '91', name: '节点-91', data: { myicon: 'el-icon-sunny' }},
          { id: '92', name: '节点-82', data: { myicon: 'el-icon-sunny' }},
          { id: '51', name: '节点-51', data: { myicon: 'el-icon-sunny' }},
          { id: '52', name: '节点-52', data: { myicon: 'el-icon-sunny' }},
          { id: '53', name: '节点-53', data: { myicon: 'el-icon-sunny' }},
          { id: '54', name: '节点-54', data: { myicon: 'el-icon-sunny' }},
          { id: '55', name: '节点-55', data: { myicon: 'el-icon-sunny' }},
          { id: '5', name: '节点-5', data: { myicon: 'el-icon-sunny' }}
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
      };
      this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (graphInstance) => {
        // 这些写上当图谱初始化完成后需要执行的代码
      });
    },
    toggleGraph() {
      this.showBackgroundGraph = !this.showBackgroundGraph;
    },
    showNodeMenus(nodeObject, $event) {
      this.currentNode = nodeObject;
      const _base_position = this.$refs.myPage.getBoundingClientRect();
      console.log('showNodeMenus:', $event, _base_position);
      this.isShowNodeMenuPanel = true;
      this.nodeMenuPanelPosition.x = $event.clientX - _base_position.x;
      this.nodeMenuPanelPosition.y = $event.clientY - _base_position.y;
    },
    doAction(actionName) {
      this.$notify({
        title: '提示',
        message: '对节点【' + this.currentNode.text + '】进行了：' + actionName,
        type: 'success'
      });
      this.isShowNodeMenuPanel = false;
    }
  }
};
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
