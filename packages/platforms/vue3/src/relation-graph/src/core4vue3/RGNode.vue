<script lang="ts" setup>
import {computed, inject, onBeforeUnmount, onMounted, onUpdated, ref} from 'vue'
import RGNodesAnalytic from '../../../../../../relation-graph-models/utils/RGNodesAnalytic'
import RGNodeExpandHolder from './RGNodeExpandHolder.vue'
import {graphInstanceKey, graphKey} from '../../../constants'
import type { RGNode } from '../../../../../../relation-graph-models/types';
const props = defineProps<{
  nodeProps: RGNode
}>()
const seeksRGNode$ = ref<HTMLElement>()
// const graphInstance$ = inject(graphInstanceKey)
const graph = inject(graphKey)
const options = computed(() => {
  return graph!.options!;
})
const borderColor = computed(() => {
  return props.nodeProps.borderColor || options.value.defaultNodeBorderColor
});
const borderWidth = computed(() => {
  const width = props.nodeProps.borderWidth === undefined ? options.value.defaultNodeBorderWidth : props.nodeProps.borderWidth;
  return width === 0 ? undefined : width;
});
const nodeWidth = computed(() => {
  if (props.nodeProps.width === 0) return;
  const v = props.nodeProps.width || options.value.defaultNodeWidth
  if (!v) {
    return;
  }
  return v+'px'
});
const nodeHeight = computed(() => {
  if (props.nodeProps.height === 0) return;
  const v = props.nodeProps.height||options.value.defaultNodeHeight
  if (!v) {
    return;
  }
  return v+'px'
});
const showExpandHolder = computed(() => {
  return (props.nodeProps.expandHolderPosition&&props.nodeProps.expandHolderPosition!=='hide')||(options.value.defaultExpandHolderPosition&&options.value.defaultExpandHolderPosition!=='hide'&&props.nodeProps.lot.childs&&props.nodeProps.lot.childs.length>0)
});
const expandButtonClass = computed(() => {
  return props.nodeProps.expanded === false ? 'c-expanded' : 'c-collapsed'
})
const expandOrCollapseNode = (e: MouseEvent) => {
  graph.instance!.expandOrCollapseNode(props.nodeProps, e)
}
const refreshNodeProperties = () => {
  if (seeksRGNode$.value!.offsetWidth === 0 && seeksRGNode$.value!.offsetHeight === 0) {
    return;
  }
  if (
    props.nodeProps.el.offsetWidth !== seeksRGNode$.value!.offsetWidth ||
    props.nodeProps.el.offsetHeight !== seeksRGNode$.value!.offsetHeight
  ) {
    // console.log('props.relationGraph:', relationGraph)
    graph.instance!.updateNodeOffsetSize(
      props.nodeProps,
      seeksRGNode$.value!.offsetWidth,
      seeksRGNode$.value!.offsetHeight
    )
  }
}
const onDragStart = (e: MouseEvent | TouchEvent) => {
  graph.instance!.onNodeDragStart(props.nodeProps, e);
}
const onclick = (e: MouseEvent | TouchEvent) => {
  graph.instance!.onNodeClick(props.nodeProps, e)
}
const isAllowShowNode = (thisNode:RGNode):boolean => {
  return RGNodesAnalytic.isAllowShowNode(thisNode);
}
onMounted(() => {
  refreshNodeProperties()
  graph.instance!.addNodeResizeListener(seeksRGNode$.value!, props.nodeProps)
})
onBeforeUnmount(() => {
  graph.instance!.removeNodeResizeListener(seeksRGNode$.value!)
})
// onUpdated(() => {
//   refreshNodeProperties()
// })
</script>
<template>
  <div
      v-show="isAllowShowNode(nodeProps)"
      ref="seeksRGNode$"
      :style="{
      'left':nodeProps.x + 'px',
      'top':nodeProps.y + 'px',
      'opacity': (nodeProps.opacity>1?nodeProps.opacity/100:nodeProps.opacity)
    }"
      class="rel-node-peel"
      :class="[(nodeProps.selected && 'rel-node-selected'), (nodeProps.dragging && 'rel-node-dragging'), (nodeProps.id===options.checkedNodeId && 'rel-node-peel-checked'), nodeProps.className]"
      :data-id="nodeProps.id"
  >
    <slot
        v-if="showExpandHolder"
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
        :style="{'background-color':(nodeProps.color===undefined?options.defaultNodeColor:nodeProps.color),'color':(nodeProps.fontColor===undefined?options.defaultNodeFontColor:nodeProps.fontColor),'border-color': borderColor, 'border-width': borderWidth, 'width': nodeWidth, 'height':nodeHeight}"
        class="rel-node"
        @click="onclick($event)"
        @mousedown.left.stop="onDragStart($event)"
        @touchstart.stop="onDragStart($event)"
    >
      <template v-if="!(options.hideNodeContentByZoom === true && options.canvasZoom<40)">
        <slot name="node" :node="nodeProps">
          <div v-if="!nodeProps.innerHTML" :style="{'color':(nodeProps.fontColor || options.defaultNodeFontColor)}" class="c-node-text">
            <span v-html="nodeProps.text" />
          </div>
          <div v-else v-html="nodeProps.innerHTML" />
        </slot>
      </template>
    </div>
  </div>
</template>
