<script lang="ts" setup>
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue'
import RGEffectUtils from '../utils/RGEffectUtils'
import { devLog } from '../utils/RGCommon'
import { relationGraphKey } from '../../../constants'
import type { RGNode } from '../RelationGraph'
const props = defineProps<{
  nodeProps: RGNode
}>()
const seeksRGNode$ = ref<HTMLElement>()
const hovering = ref(false)
const dragging = ref(false)
const relationGraph = inject(relationGraphKey)!.value
const expandButtonClass = computed(() => {
  return props.nodeProps.expanded === false ? 'c-expanded' : 'c-collapsed'
})
const refreshNodeProperties = () => {
  if (
    props.nodeProps.el.offsetWidth !== seeksRGNode$.value!.offsetWidth ||
    props.nodeProps.el.offsetHeight !== seeksRGNode$.value!.offsetHeight
  ) {
    // console.log('props.relationGraph:', relationGraph)
    relationGraph.updateNodeOffsetSize(
      props.nodeProps,
      seeksRGNode$.value!.offsetWidth,
      seeksRGNode$.value!.offsetHeight
    )
  }
}
const expandOrCollapseNode = (e: MouseEvent) => {
  relationGraph.expandOrCollapseNode(props.nodeProps, e)
}
const onDragStart = (e: MouseEvent | TouchEvent) => {
  if (relationGraph.options.disableDragNode || props.nodeProps.disableDrag) {
    return
  }
  dragging.value = true
  hovering.value = false
  RGEffectUtils.startDrag(
    e,
    props.nodeProps,
    onNodeDraged,
    (offsetX, offsetY, basePosition) => {
      const x =
        offsetX / (relationGraph.options.canvasZoom / 100) + basePosition.x
      const y =
        offsetY / (relationGraph.options.canvasZoom / 100) + basePosition.y
      relationGraph.setNodePosition(props.nodeProps, x, y)
    }
  )
}
const onNodeDraged = (x_buff: number, y_buff: number, e: MouseEvent | TouchEvent) => {
  if (x_buff === 0 && y_buff === 0) {
    relationGraph.onNodeClick(props.nodeProps, e)
    return
  }
  if (relationGraph.options.isMoveByParentNode) {
    props.nodeProps.lot.childs.forEach((thisCnode) => {
      thisCnode.x += x_buff
      thisCnode.y += y_buff
    })
  }
  if (Math.abs(x_buff) + Math.abs(y_buff) > 6) {
    setTimeout(() => {
      devLog('delay end dragging', dragging.value)
      dragging.value = false
    }, 100)
  } else {
    dragging.value = false
  }
}
const onMouseHover = () => {
  if (dragging.value) {
    return
  }
  if (
    relationGraph.options.disableNodeClickEffect !== true &&
    props.nodeProps.disableDefaultClickEffect !== true
  ) {
    hovering.value = true
  }
}
const onMouseOut = () => {
  if (
    relationGraph.options.disableNodeClickEffect !== true &&
    props.nodeProps.disableDefaultClickEffect !== true
  ) {
    hovering.value = false
  }
}
const onclick = (e: MouseEvent | TouchEvent) => {
  if (dragging.value) {
    return
  }
  relationGraph.onNodeClick(props.nodeProps, e)
}
const isAllowShowNode = (thisNode:RGNode):boolean => {
  const _r =
    thisNode.isShow !== false &&
    thisNode.isHide !== true &&
    (!thisNode.lot.parent || isAllowShowNode(thisNode.lot.parent) === true)
  return _r
}
onMounted(() => {
  refreshNodeProperties()
})
onBeforeUnmount(() => {
  seeksRGNode$.value!.remove()
})
</script>
<template>
  <div
    v-show="isAllowShowNode(nodeProps)"
    ref="seeksRGNode$"
    :style="{
      left: nodeProps.x + 'px',
      top: nodeProps.y + 'px',
      opacity:
        nodeProps.opacity > 1 ? nodeProps.opacity / 100 : nodeProps.opacity,
    }"
    class="rel-node-peel"
  >
    <div
      v-if="
        (nodeProps.expandHolderPosition &&
          nodeProps.expandHolderPosition !== 'hide') ||
        (relationGraph.options.defaultExpandHolderPosition &&
          relationGraph.options.defaultExpandHolderPosition !== 'hide' &&
          nodeProps.lot.childs &&
          nodeProps.lot.childs.length > 0)
      "
      :class="[
        'c-expand-positon-' +
          (nodeProps.expandHolderPosition ||
            relationGraph.options.defaultExpandHolderPosition),
      ]"
      class="c-btn-open-close"
    >
      <span
        :class="expandButtonClass"
        :style="{
          'background-color':
            nodeProps.color || relationGraph.options.defaultNodeColor,
        }"
        @click.stop="expandOrCollapseNode"
      />
    </div>
    <div
      v-if="nodeProps.html"
      @click.stop="onclick($event)"
      @mousedown.left.stop="onDragStart($event)"
      @touchstart.stop="onDragStart($event)"
      @mouseover.stop="onMouseHover($event)"
      @mouseout.stop="onMouseOut($event)"
      v-html="nodeProps.html"
    />
    <div
      v-else
      :class="[
        'rel-node-shape-' +
          (nodeProps.nodeShape === undefined
            ? relationGraph.options.defaultNodeShape
            : nodeProps.nodeShape),
        'rel-node-type-' + nodeProps.type,
        nodeProps.id === relationGraph.options.checkedNodeId
          ? 'rel-node-checked'
          : '',
        nodeProps.selected ? 'rel-node-selected' : '',
        nodeProps.styleClass,
        hovering ? 'rel-node-hover' : '',
        nodeProps.innerHTML ? 'rel-diy-node' : '',
      ]"
      :style="{
        'background-color':
          nodeProps.color === undefined
            ? relationGraph.options.defaultNodeColor
            : nodeProps.color,
        color:
          nodeProps.fontColor === undefined
            ? relationGraph.options.defaultNodeFontColor
            : nodeProps.fontColor,
        border:
          (nodeProps.borderColor ||
            relationGraph.options.defaultNodeBorderColor) +
          ' solid ' +
          (nodeProps.borderWidth ||
            relationGraph.options.defaultNodeBorderWidth) +
          'px',
        width:
          (nodeProps.width || relationGraph.options.defaultNodeWidth) + 'px',
        height:
          (nodeProps.height || relationGraph.options.defaultNodeHeight) + 'px',
      }"
      class="rel-node"
      @click.stop="onclick($event)"
      @mousedown.left.stop="onDragStart($event)"
      @touchstart.stop="onDragStart($event)"
      @mouseover.stop="onMouseHover($event)"
      @mouseout.stop="onMouseOut($event)"
    >
      <template
        v-if="
          !(
            relationGraph.options.hideNodeContentByZoom === true &&
            relationGraph.options.canvasZoom < 40
          )
        "
      >
        <slot name="node" :node="nodeProps">
          <div
            v-if="!nodeProps.innerHTML"
            :style="{
              color:
                nodeProps.fontColor ||
                relationGraph.options.defaultNodeFontColor,
            }"
            class="c-node-text"
          >
            <span v-html="nodeProps.text" />
          </div>
          <div v-else v-html="nodeProps.innerHTML" />
        </slot>
      </template>
    </div>
  </div>
</template>
<style scoped>
.rg-icon {
  width: 19px;
  height: 19px;
  vertical-align: 0px;
  fill: currentColor;
  overflow: hidden;
}
.el-icon-remove,
.el-icon-circle-plus {
  cursor: pointer;
}
.rel-node-peel {
  clear: both;
  padding: 8px;
  position: absolute;
  font-size: 14px;
  /*border:green solid 1px;*/
}
.rel-node {
  text-align: center;
}

.rel-node-shape-1 {
  /*border: #FD8B37 solid 1px;*/
  border-radius: 5px;
}
.rel-node-shape-1 .c-node-text {
  /*border: #FD8B37 solid 1px;*/
  padding-left: 5px;
  padding-right: 5px;
}
.c-node-text {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.rel-node-shape-0 {
  /*padding:10px;*/
}
.rel-node-shape-1 .c-node-text {
  /*border: #FD8B37 solid 1px;*/
  padding-left: 5px;
  padding-right: 5px;
}
.rel-node-shape-0 {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  /*border: #FD8B37 solid 2px;*/
  /*text-align: left;*/
  /*padding:10px;*/
  /*white-space: nowrap;*/
  /*text-overflow: ellipsis;*/
  /*overflow: hidden;*/
  /*word-break: break-all;*/
}
/*.rel-node-shape-0:hover{*/
/*  !*overflow: visible;*!*/
/*  !*text-overflow: inherit;*!*/
/*  box-shadow: 0px 0px 5px #FFC5A6;*/
/*}*/
/*.rel-node{*/
/*display: table;*/
/*}*/
/*.rel-node span{*/
/*display: table-cell;*/
/*vertical-align:middle;*/
/*}*/
.rel-node-type-button {
  border-radius: 25px;
  color: blue;
  cursor: pointer;
}
.rel-node-hover {
}
.rel-node-checked {
  box-shadow: 0px 0px 10px #fd8b37;
  /*border-color: #BA7909;*/
  /*background-color: #FD8B37;*/
  /*color: #ffffff;*/
  /* firefox bug fix - won't rotate at 90deg angles */
  /*-moz-transform: rotate(-89deg) translateX(-190px);*/
  animation-timing-function: linear;
  animation: ACTRGNodeInit 2s;
}
.rel-node-selected {
  box-shadow: 0px 0px 10px #fd8b37;
  /*border-color: #BA7909;*/
  /*background-color: #FD8B37;*/
  /*color: #ffffff;*/
  /* firefox bug fix - won't rotate at 90deg angles */
  /*-moz-transform: rotate(-89deg) translateX(-190px);*/
  animation-timing-function: linear;
  animation: ACTRGNodeInit 2s;
}
.rel-node-vtree-2 {
  transform-origin: 0 0; /* 设置旋转中心为左上角*/
  /*transform-origin:50% 50%;!* 设置放大中心为元素中心 *!*/
  transform: rotate(30deg) translateX(0px);
}
.rel-node-vtree {
  width: 130px;
  height: 45px;
  text-align: left;
}
/*.c-node-text{*/
/*font-size: 12px;*/
/*display: inline-block;*/
/*width:100px;*/
/*height:16px;*/
/*margin-top:40px;*/
/*margin-left:-25px;*/
/*position:absolute;*/
/*word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;*/
/*text-align:center;*/
/*}*/
.c-btn-open-close {
  position: absolute;
  height: 100%;
  width: 19px;
  /*border:red solid 1px;*/
  display: flex;
  align-items: center;
  justify-content: center;
  /*border:#ff0000 solid 1px;*/
  user-select: none;
  pointer-events: none;
}
.c-btn-open-close span {
  width: 19px;
  height: 19px;
  display: inline-block;
  text-align: center;
  border-radius: 15px;
  color: #ffffff;
  cursor: pointer;
  font-size: 19px;
  line-height: 16px;
  background-size: 100% 100%;
  pointer-events: all;
}
.c-expanded {
  background-image: url(data:image/svg+xml;%20charset=utf8,%3Csvg%20t=%221606310217820%22%20viewBox=%220%200%201024%201024%22%20version=%221.1%22%20xmlns=%22http://www.w3.org/2000/svg%22%20p-id=%223373%22%20width=%2232%22%20height=%2232%22%3E%3Cpath%20d=%22M853.333333%20480H544V170.666667c0-17.066667-14.933333-32-32-32s-32%2014.933333-32%2032v309.333333H170.666667c-17.066667%200-32%2014.933333-32%2032s14.933333%2032%2032%2032h309.333333V853.333333c0%2017.066667%2014.933333%2032%2032%2032s32-14.933333%2032-32V544H853.333333c17.066667%200%2032-14.933333%2032-32s-14.933333-32-32-32z%22%20p-id=%223374%22%20fill=%22white%22%3E%3C/path%3E%3C/svg%3E);
}
.c-collapsed {
  background-image: url(data:image/svg+xml;%20charset=utf8,%3Csvg%20t=%221606310454619%22%20class=%22icon%22%20viewBox=%220%200%201024%201024%22%20version=%221.1%22%20xmlns=%22http://www.w3.org/2000/svg%22%20p-id=%223662%22%20width=%22128%22%20height=%22128%22%3E%3Cpath%20d=%22M853.333333%20554.666667H170.666667c-23.466667%200-42.666667-19.2-42.666667-42.666667s19.2-42.666667%2042.666667-42.666667h682.666666c23.466667%200%2042.666667%2019.2%2042.666667%2042.666667s-19.2%2042.666667-42.666667%2042.666667z%22%20p-id=%223663%22%20fill=%22white%22%3E%3C/path%3E%3C/svg%3E);
}
.c-expand-positon-left {
  margin-top: -8px;
  margin-left: -25px;
}
.c-expand-positon-right {
  height: 100%;
  width: 100%;
  justify-content: center;
}
.c-expand-positon-right span {
  margin-top: -18px;
  margin-right: -18px;
  margin-left: 100%;
}
.c-expand-positon-bottom {
  height: 100%;
  width: 100%;
  margin-top: 7px;
  margin-left: -8px;
  align-items: flex-end;
  justify-content: center;
}
.c-expand-positon-top {
  height: 18px;
  width: 100%;
  margin-top: -20px;
  margin-left: -6px;
  align-items: flex-end;
  justify-content: center;
}
@keyframes ACTRGNodeInit {
  from {
    box-shadow: 0px 0px 15px #fd8b37;
  }
  15% {
    box-shadow: 0px 0px 1px rgb(46, 78, 143);
  }
  30% {
    box-shadow: 0px 0px 15px #fd8b37;
  }
  45% {
    box-shadow: 0px 0px 1px rgb(46, 78, 143);
  }
  60% {
    box-shadow: 0px 0px 15px #fd8b37;
  }
  to {
    box-shadow: 0px 0px 1px rgb(46, 78, 143);
  }
}
.rel-diy-node {
  padding: 0px;
}
</style>
