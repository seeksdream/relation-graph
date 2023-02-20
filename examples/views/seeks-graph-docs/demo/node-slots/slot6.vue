<template>
  <div>
    <Slot1 v-if="node.data && node.data.slotType === 'slot1'" :node="node" />
    <Slot2 v-else-if="node.data && node.data.slotType === 'slot2'" :node="node" />
    <Slot3 v-else-if="node.data && node.data.slotType === 'slot3'" :node="node" />
    <Slot4 v-else-if="node.data && node.data.slotType === 'slot4'" :node="node" />
    <Slot5 v-else-if="node.data && node.data.slotType === 'slot5'" :node="node" />
    <div v-else style="width:300px;height:300px;border-radius: 5px;background-color: #ffffff;overflow: hidden">
      <relation-graph ref="seeksRelationGraph" :options="graphOptions" />
    </div>
  </div>
</template>

<script>
import Slot1 from './slot1';
import Slot2 from './slot2';
import Slot3 from './slot3';
import Slot4 from './slot4';
import Slot5 from './slot5';
export default {
  name: 'Slot6',
  components: { Slot1, Slot2, Slot3, Slot4, Slot5 },
  props: {
    node: {
      mustUseProp: true,
      default: null,
      type: Object
    }
  },
  data() {
    return {
      graphOptions: {
        allowShowMiniToolBar: false,
        defaultJunctionPoint: 'border'
        // 这里可以参考"Graph 图谱"中的参数进行设置
      }
    };
  },
  mounted() {
    if (this.node.data && this.node.data.slotType && this.node.data.slotType !== 'slot6') {
      return;
    }
    const __graph_json_data = {
      rootId: 'a',
      nodes: [
        { id: 'a', text: 'A', borderColor: 'yellow' },
        { id: 'b', text: 'B', color: '#43a2f1', fontColor: 'yellow' },
        { id: 'c', text: 'C', nodeShape: 1, width: 80, height: 60 },
        { id: 'e', text: 'E', nodeShape: 0, width: 150, height: 150 }
      ],
      lines: [
        { from: 'a', to: 'b', text: '关系1', color: '#43a2f1' },
        { from: 'a', to: 'c', text: '关系2' },
        { from: 'a', to: 'e', text: '关系3' },
        { from: 'b', to: 'e', text: '', color: '#67C23A' }
      ]
    };
    this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (graphInstance) => {
      // 这些写上当图谱初始化完成后需要执行的代码
    });
  },
  methods: {
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
