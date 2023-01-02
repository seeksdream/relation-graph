<template>
  <div>
    <div style="height:60px;border-bottom:1px solid #efefef;padding:10px;">
      以下图谱中的线条以及线条上的花，是通过连线插槽slot=line实现的。注意：node插槽/画布插槽/图谱插槽都可以使用常规方式来编写，但连线插槽必须通过svg来编写。
    </div>
    <div ref="myPage" style="height:calc(100vh - 50px);" @click="isShowNodeMenuPanel = false">
      <RelationGraph
        ref="seeksRelationGraph"
        :options="graphOptions">
        <MyLine
            v-if="line.isHide === false"
            slot="line"
            slot-scope="{line, link, relationGraph}"
            :line="line"
            :link="link"
            :relation-graph="relationGraph"
        />
      </RelationGraph>
    </div>
    <el-button type="success" class="c-show-code-button"><el-link href="https://github.com/seeksdream/relation-graph/blob/master/examples/views/seeks-graph-docs/demo/Demo4AdvLineSlot.vue" target="_blank" style="color: #ffffff;">查看代码</el-link></el-button>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from 'relation-graph';
import MyLine from './Demo4AdvLineSlotComp';
export default {
  name: 'Demo4AdvLineSlot',
  components: { MyLine },
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
          { id: '4', name: '节点-4', data: { myicon: 'el-icon-star-on' }},
          { id: '6', name: '节点-6', data: { myicon: 'el-icon-setting' }},
          { id: '7', name: '节点-7', data: { myicon: 'el-icon-setting' }},
          { id: '8', name: '节点-8', data: { myicon: 'el-icon-star-on' }},
          { id: '9', name: '节点-9', data: { myicon: 'el-icon-headset' }}
        ],
        lines: [
          { from: '1', to: '2', text: '投资' },
          { from: '4', to: '2', text: '高管' },
          { from: '6', to: '2', text: '高管' },
          { from: '7', to: '2', text: '高管' },
          { from: '8', to: '2', text: '高管' },
          { from: '9', to: '2', text: '高管' }
        ]
      };
      this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (graphInstance) => {
        // 这些写上当图谱初始化完成后需要执行的代码
      });
    },
    onLineClick(lineObject, $event) {
      console.log('onLineClick:', lineObject);
    },
    lineSlotOver(lineObject) {
      console.log('over:', lineObject);
    },
    lineSlotOut(lineObject) {
      console.log('out:', lineObject);
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
