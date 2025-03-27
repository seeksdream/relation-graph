<template>
  <div>
    <div style="height: calc(100vh - 50px)">
      <RelationGraph
        ref="graphRef"
        :options="graphOptions"
      >
        <template #node="{node}">
          <RGNodeSlot :node-props="node" :options="graphOptions" />
        </template>
        <template #line="{link, line}">
          <RGLineSlot :link="link" :relation="line" />
        </template>
        <template #node-expand-holder="{expandHolderPosition, expandButtonClass, color, expandOrCollapseNode}">
          <div :class="[('c-expand-positon-' + expandHolderPosition)]" class="c-btn-open-close">
            <span
                :class="expandButtonClass"
                :style="{ 'background-color': 'red' }"
                @click.stop="expandOrCollapseNode"
                @touchend.stop="expandOrCollapseNode"
            >
            </span>
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from "relation-graph";
import staticJsonData from './example-data/systems.json'
import RGNodeSlot from './SlotForVueOldVersion/RGNodeSlot.vue'
import RGLineSlot from './SlotForVueOldVersion/RGLineSlot.vue'

export default {
  name: 'Demo',
  components: { RGNodeSlot, RGLineSlot },
  data() {
    return {
      isShowCodePanel: false,
      graphOptions: {
        ovUseNodeSlot: true, // 如果使用了节点插槽且需要让节点插槽生效，请设置为true
        ovUseLineSlot: true, // 如果使用了连线插槽且需要让节点插槽生效，请设置为true
        ovUseToolbarSlot: false, // 如果使用了工具栏插槽且需要让节点插槽生效，请设置为true
        ovUseNodeExpandHolderSlot: false, // 如果使用了展开/收缩按钮插槽且需要让节点插槽生效，请设置为true
        moveToCenterWhenRefresh: true,
        zoomToFitWhenRefresh: true,
        defaultExpandHolderPosition: "right",
        useAnimationWhenExpanded: true,
        useAnimationWhenRefresh: false,
        debug: true,
        layout: {
          layoutName: 'center',
          from: 'top'
        }
      },
    };
  },
  mounted() {
    this.showSeeksGraph();
  },
  methods: {
    showSeeksGraph() {
      const __graph_json_data = staticJsonData;
      __graph_json_data.nodes.forEach(node => {
        node.expanded = false;
      });
      const graphRef = this.$refs.graphRef
      graphRef.setJsonData(__graph_json_data, async (graphInstance) => {
        graphInstance.layouter.maxLayoutTimes = 2000;
        // 这些写上当图谱初始化完成后需要执行的代码.
        await this.expandNode(graphInstance.graphData.rootNode);
        await this.expandNodeAllChild(graphInstance.graphData.rootNode);
      });
    },
    async expandNode(node) {
      if (node.lot.childs.length === 0) {
        return;
      }
      // 当有一些节点被显示或隐藏起来时，会让图谱看着很难看，需要布局器重新为节点分配位置，所以这里需要调用refresh方法来重新布局
      console.log('onNodeExpand:', node);
      node.expanded = true;
      const graphInstance = this.$refs.graphRef.getInstance();
      for (let i=0;i<node.lot.childs.length;i++) {
        const cnode = node.lot.childs[i];
        cnode.x = node.x;
        cnode.y = node.y;
      }
      await graphInstance.doLayout();
      await graphInstance.zoomToFit();
    },
    async expandNodeAllChild(node) {
      if (node.lot.childs.length === 0) {
        return;
      }
      console.log('expandNodeAllChild:', node.text);
      for (let i=0;i<node.lot.childs.length;i++) {
        const cnode = node.lot.childs[i];
        if (cnode.lot.childs.length === 0) {
          continue;
        }
        await this.expandNode(cnode);
      }
    }
  },
};
const sleep = async(time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};
</script>
