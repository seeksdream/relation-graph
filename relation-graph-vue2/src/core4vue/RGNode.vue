<template>
  <div
    v-show="isAllowShowNode(nodeProps)"
    ref="seeksRGNode"
    :style="{
      'left':nodeProps.x + 'px',
      'top':nodeProps.y + 'px',
      'opacity': (nodeProps.opacity>1?nodeProps.opacity/100:nodeProps.opacity)
    }"
    class="rel-node-peel"
    :class="[(nodeProps.selected?'rel-node-selected':'')]"
    :data-id="nodeProps.id"
  >
    <template v-if="showExpandHolder">
      <template v-if="options.oldVueVersion && !options.ovUseNodeExpandHolderSlot">
        <RGNodeExpandHolder
            :nodeProps="nodeProps"
            :expandButtonClass="expandButtonClass"
            :expandOrCollapseNode="expandOrCollapseNode"
            :expandHolderPosition="(nodeProps.expandHolderPosition||options.defaultExpandHolderPosition)"
            :color="(options.defaultExpandHolderColor||nodeProps.color||options.defaultNodeColor)"
        />
      </template>
      <slot
          v-else
          name="node-expand-holder"
          :nodeProps="nodeProps"
          :expandButtonClass="expandButtonClass"
          :expandOrCollapseNode="expandOrCollapseNode"
          :expandHolderPosition="(nodeProps.expandHolderPosition||options.defaultExpandHolderPosition)"
          :color="(options.defaultExpandHolderColor||nodeProps.color||options.defaultNodeColor)"
      >
        <RGNodeExpandHolder
            :nodeProps="nodeProps"
            :expandButtonClass="expandButtonClass"
            :expandOrCollapseNode="expandOrCollapseNode"
            :expandHolderPosition="(nodeProps.expandHolderPosition||options.defaultExpandHolderPosition)"
            :color="(options.defaultExpandHolderColor||nodeProps.color||options.defaultNodeColor)"
        />
      </slot>
    </template>
    <div
        v-if="nodeProps.html"
        v-html="nodeProps.html"
        @click="onclick($event)"
        @mousedown.left.stop="onDragStart($event)"
        @touchstart.stop="onDragStart($event)"
    />
    <div
      v-else
      :class="['rel-node-shape-'+(nodeProps.nodeShape===undefined?options.defaultNodeShape:nodeProps.nodeShape),'rel-node-type-'+nodeProps.type, (nodeProps.id===options.checkedNodeId?'rel-node-checked':''), (nodeProps.flashing?'rel-node-flashing':''), nodeProps.styleClass, (nodeProps.innerHTML?'rel-diy-node':'')]"
      :style="{'background-color':(nodeProps.color===undefined?options.defaultNodeColor:nodeProps.color),'color':(nodeProps.fontColor===undefined?options.defaultNodeFontColor:nodeProps.fontColor),'border': borderStyle, 'width': nodeWidth, 'height':nodeHeight}"
      class="rel-node"
      @click="onclick($event)"
      @mousedown.left.stop="onDragStart($event)"
      @touchstart.stop="onDragStart($event)"
    >
      <template v-if="!(options.hideNodeContentByZoom === true && options.canvasZoom<40)">
        <template v-if="options.oldVueVersion && !options.ovUseNodeSlot">
          <div v-if="!nodeProps.innerHTML" :style="{'color':(nodeProps.fontColor || options.defaultNodeFontColor)}" class="c-node-text">
            <span v-html="nodeProps.text" />
          </div>
          <div v-else v-html="nodeProps.innerHTML" />
        </template>
        <slot v-else name="node" :node="nodeProps">
          <div v-if="!nodeProps.innerHTML" :style="{'color':(nodeProps.fontColor || options.defaultNodeFontColor)}" class="c-node-text">
            <span v-html="nodeProps.text" />
          </div>
          <div v-else v-html="nodeProps.innerHTML" />
        </slot>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { devLog } from '../utils/RGCommon';
import {RGNodesAnalytic} from "../utils/RGNodesAnalytic";
import RGNodeExpandHolder from "./RGNodeExpandHolder";



export default {
  name: 'SeeksRGNode',
  components: {RGNodeExpandHolder},
  props: {
    nodeProps: {
      mustUseProp: true,
      default: () => { return {}; },
      type: Object
    }
  },
  data() {
    return {
      expanding: false
    };
  },
  inject: ['graph'],
  computed: {
    oldVersionSlot() {
      const slot = this.$scopedSlots['node'](({ node: this.nodeProps }));
      if (slot.length === 0) {
        return null;
      }
      return slot;
    },
    expandButtonClass() {
      return this.nodeProps.expanded === false ? 'c-expanded' : 'c-collapsed';
    },
    showExpandHolder() {
      return (
          this.nodeProps.expandHolderPosition&&this.nodeProps.expandHolderPosition!=='hide')
          ||
          (this.options.defaultExpandHolderPosition&&this.options.defaultExpandHolderPosition!=='hide'&&this.nodeProps.lot.childs&&this.nodeProps.lot.childs.length>0)
    },
    options() {
      return this.graph.options;
    },
    relationGraph() {
      return this.graph.instance;
    },
    borderStyle() {
      const width = this.nodeProps.borderWidth === undefined ? this.options.defaultNodeBorderWidth : this.nodeProps.borderWidth;
      return (this.nodeProps.borderColor || this.options.defaultNodeBorderColor) + ' solid '+width+'px'
    },
    nodeWidth() {
      if (this.nodeProps.width === 0) return;
      const v = this.nodeProps.width || this.options.defaultNodeWidth
      if (!v) {
        return;
      }
      return v+'px'
    },
    nodeHeight() {
      if (this.nodeProps.height === 0) return;
      const v = this.nodeProps.height||this.options.defaultNodeHeight
      if (!v) {
        return;
      }
      return v+'px'
    }
  },
  created() {
    // Vue.version
  },
  mounted() {
    this.refreshNodeProperties();
    // this.leave(this.$refs.seeksRGNode)
  },
  updated() {
    this.refreshNodeProperties();
  },
  beforeDestroy() {
    const elx = this.$refs.seeksRGNode;
    elx.remove();
  },
  methods: {
    refreshNodeProperties() {
      if (this.$refs.seeksRGNode.offsetWidth === 0 && this.$refs.seeksRGNode.offsetHeight === 0) {
        return;
      }
      if (this.nodeProps.el.offsetWidth !== this.$refs.seeksRGNode.offsetWidth || this.nodeProps.el.offsetHeight !== this.$refs.seeksRGNode.offsetHeight) {
        this.relationGraph.updateNodeOffsetSize(this.nodeProps, this.$refs.seeksRGNode.offsetWidth, this.$refs.seeksRGNode.offsetHeight);
      }
    },
    async expandOrCollapseNode(e) {
      devLog('expandOrCollapseNode', this.expanding);
      if (this.expanding) {
        return;
      }
      this.expanding = true;
      setTimeout(() => { // 防止手太快或者手表太灵敏
        this.expanding = false;
      }, 300);
      await this.relationGraph.expandOrCollapseNode(this.nodeProps, e);
    },
    onDragStart(e) {
      this.relationGraph.onNodeDragStart(this.nodeProps, e);
    },
    onclick(e) {
      this.relationGraph.onNodeClick(this.nodeProps, e);
    },
    isAllowShowNode(thisNode) {
      return RGNodesAnalytic.isAllowShowNode(thisNode);
    }
  }
};
</script>

<style scoped>
</style>
