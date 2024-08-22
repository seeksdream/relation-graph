import screenfull from 'screenfull';
import { devLog, findParentByClassName, getClientCoordinate, isSupportTouch } from '../utils/RGCommon';
import { json2Node } from './RGNode';
import { newNodeTemplate } from './RGOptions';
import {
  JsonLine, JsonNode, RGElementLine,
  RGEventTargetType,
  RGJunctionPoint,
  RGLine,
  RGLineShape,
  RGLink,
  RGListeners,
  RGNode,
  RGOptions, RGPosition, RGSelectionView,
  RGUserEvent
} from '../types';
import { RelationGraphWith6Effect } from './RelationGraphWith6Effect';
import RGEffectUtils from '../utils/RGEffectUtils';

export type RGOnCreateLineCallback = (from:RGNode, to:RGNode|RGPosition, lineTemplate?:JsonLine) => void;
export interface JsonLineTemplate extends JsonLine{
  from?: string;
  to?: string;
}
export interface JsonNodeTemplate extends JsonNode{
  id?: string;
}
export type CreatingLinePlotOptions = {
  onCreateLine: RGOnCreateLineCallback|undefined
  template?: JsonLineTemplate
  fromNode?: JsonNodeTemplate
};
export type RGOnCreateNodeCallback = (from:RGNode, to:RGNode|RGPosition, lineTemplate:JsonLine) => void;
export type CreatingNodePlotOptions = {
  disableClickCreate?:boolean
  templateText?:string
  templateStyleClass?:string
  templateNode?: JsonNode
  templateMove?: (x:number, y:number) => void
  onCreateNode: (x:number, y:number) => void
};
export class RelationGraphWith7Event extends RelationGraphWith6Effect {
  constructor(options: RGOptions, listeners: RGListeners) {
    super(options, listeners);
  }
  setDefaultLineShape(optionValue:RGLineShape) {
    this.options.defaultLineShape = optionValue;
  }
  setDefaultJunctionPoint(optionValue:RGJunctionPoint) {
    this.options.defaultJunctionPoint = optionValue;
  }
  setCheckedNode(nodeId:string) {
    this.options.checkedNodeId = nodeId;
  }
  setCheckedLinkAndLine(link: RGLink, line:RGLine) {
    this.options.checkedLinkId = link.seeks_id;
    this.options.checkedLineId = line ? line.id as string : '';
  }
  clearChecked() {
    this.options.checkedNodeId = '';
    this.options.checkedLineId = '';
    this.options.checkedLinkId = '';
  }
  selectNode(node:RGNode, selected:boolean) {
    node.selected = selected;
  }
  flashNode(node:RGNode, selected:boolean) {
    node.flashing = selected;
  }
  updateNodeOffsetSize(node:RGNode, nodeOffsetWidth:number, nodeOffsetHeight:number) {
    // console.log('xxxxxxxxxxxxxxxxxxxxxxxxx:refreshNodeProperties', nodeOffsetWidth, nodeOffsetHeight);
    node.el.offsetWidth = nodeOffsetWidth;
    node.el.offsetHeight = nodeOffsetHeight;
  }
  prevClickTime = 0;
  async onNodeClick(node:RGNode, e:RGUserEvent) {
    if (Date.now() - this.prevClickTime < 200) {
      devLog('[node]click abort : time < 200');
      return;
    }
    this.prevClickTime = Date.now();
    if (this.options.creatingLinePlot) {
      this.onNodeClickWhenCreatingLinePlot(node);
      return;
    }
    devLog('[node]node click', node.text, this.options.creatingLinePlot);
    if (!e.shiftKey && this.options.disableNodeClickEffect !== true && node.disableDefaultClickEffect !== true) {
      this.options.checkedLinkId = '';
      this.options.checkedLineId = '';
      this.setCheckedNode(node.id);
    }
    if (this.listeners.onNodeClick) {
      await this.listeners.onNodeClick(node, e);
    }
    this.prevClickTime = Date.now();
  }
  onNodeDragStart(node:RGNode, e:RGUserEvent) {
    if (this.options.disableDragNode || node.disableDrag) {
      return;
    }
    if (isNaN(node.x)) node.x = 0;
    if (isNaN(node.y)) node.y = 0;
    node.dragging = true;
    if (this.listeners.onNodeDragStart) {
      this.listeners.onNodeDragStart(node, e);
    }
    this.emitEvent('node-drag-start', {node: node})
    const dragEnd = (x_buff:number, y_buff:number, e:RGUserEvent) => {
      node.dragging = false;
      this.onNodeDraged(node, x_buff, y_buff, e);
      this._dataUpdated();
    };
    RGEffectUtils.startDrag(e, node, dragEnd, (offsetX, offsetY, basePosition) => {
      let x = offsetX / (this.options.canvasZoom / 100) + basePosition.x;
      let y = offsetY / (this.options.canvasZoom / 100) + basePosition.y;
      if (this.listeners.onNodeDragging) {
        const updatePosition = this.listeners.onNodeDragging(node, x, y, e);
        if (updatePosition) {
          (typeof updatePosition.x === 'number') && (x = updatePosition.x);
          (typeof updatePosition.y === 'number') && (y = updatePosition.y);
        }
      }
      this.setNodePosition(node, x, y);
      if (this.options.useHorizontalView) { // 光芒卡牌设置横向
        x = offsetY / (this.options.canvasZoom / 100) + basePosition.x;
        y = -offsetX / (this.options.canvasZoom / 100) + basePosition.y;
        this.setNodePosition(node, x, y);
      } else {
        this.setNodePosition(node, x, y);
      }
      this.emitEvent('node-dragging', {node, x, y});
      this.updateElementLines();
      this._dataUpdated();
    });
  }
  onNodeDraged(node:RGNode, x_buff:number, y_buff:number, e:RGUserEvent) {
    if (x_buff === 0 && y_buff === 0) {
      devLog('[node]node click by drag');
      this.onNodeClick(node, e);
      this.emitEvent('node-drag-end', {node});
      return;
    }
    if (this.options.isMoveByParentNode) {
      node.lot.childs.forEach(thisCnode => {
        thisCnode.x += x_buff;
        thisCnode.y += y_buff;
      });
    }
    if (Math.abs(x_buff) + Math.abs(y_buff) > 6) {
      this.prevClickTime = Date.now();
      setTimeout(() => {
        devLog('[node]onDragEnd2');
        this.onNodeDragEnd(node, e);
      }, 100);
    } else {
      devLog('[node]onDragEnd1');
      this.onNodeDragEnd(node, e);
    }
  }
  onNodeDragEnd(node:RGNode, e:RGUserEvent) {
    this.updateElementLines();
    if (this.listeners.onNodeDragEnd) {
      this.listeners.onNodeDragEnd(node, e);
    }
    this.emitEvent('node-drag-end', {node});
  }
  async onLineClick(line:RGLine, link:RGLink, e:RGUserEvent) {
    devLog('onLineClick:', 'line:', line, 'link:', link);
    if (this.options.disableLineClickEffect !== true && line.disableDefaultClickEffect !== true) {
      this.setCheckedNode('');
      this.setCheckedLinkAndLine(link, line);
      // this.flashNode(link.fromNode, true);
      // this.flashNode(link.toNode, true);
      // // Velocity(this.$refs.seeksRGLink, { strokDashoffset: 50 }, { duration: 3000, loop: 5 })
      // setTimeout(() => {
      //   this.flashNode(link.fromNode, false);
      //   this.flashNode(link.toNode, false);
      // }, 2000);
    }
    if (this.listeners.onLineClick) {
      await this.listeners.onLineClick(line, link, e);
    }
  }
  async expandOrCollapseNode(node:RGNode, e:RGUserEvent) {
    if (node.expanded === false) {
      await this.expandNode(node, e);
    } else {
      await this.collapseNode(node, e);
    }
  }
  setChildsFromPosition(node:RGNode, pnode:RGNode) {
    node.lot.childs.forEach(cnode => {
      cnode.x = pnode.x;
      cnode.y = pnode.y;
      this.setChildsFromPosition(cnode, pnode);
    });
  }
  async expandNode(node:RGNode, e:RGUserEvent) {
    devLog('onNodeExpand:', node);
    node.expanded = true;
    if (this.options.useAnimationWhenExpanded) {
      await this.layouter.snapshotBeforeAnimation();
      this.setChildsFromPosition(node, node);
      await this.layouter.animationLayout(false);
    }
    devLog('relayout check:', this.options.reLayoutWhenExpandedOrCollapsed);
    if (this.options.reLayoutWhenExpandedOrCollapsed) {
      devLog('relayout...');
      await this.layouter.snapshotBeforeAnimation();
      await this.doLayout();
    }
    this.updateElementLines();
    this._dataUpdated();
    if (this.listeners.onNodeExpand) {
      await this.listeners.onNodeExpand(node, e);
    }
  }
  setChildsToPosition(node:RGNode, pnode:RGNode) {
    node.lot.childs.forEach(thisNode => {
      thisNode.lot.from_x = thisNode.x;
      thisNode.lot.from_y = thisNode.y;
      thisNode.lot.to_x = pnode.x;
      thisNode.lot.to_y = pnode.y;
      this.setChildsToPosition(thisNode, pnode);
    });
  }
  async collapseNode(node:RGNode, e:RGUserEvent) {
    devLog('onNodeCollapse:', node);
    if (this.options.useAnimationWhenExpanded) {
      await this.layouter.snapshotBeforeAnimation();
      this.setChildsToPosition(node, node);
      await this.layouter.animationLayout(false);
    }
    node.expanded = false;
    devLog('relayout check:', this.options.reLayoutWhenExpandedOrCollapsed);
    if (this.options.reLayoutWhenExpandedOrCollapsed) {
      devLog('relayout...');
      await this.layouter.snapshotBeforeAnimation();
      await this.doLayout();
    }
    this.updateElementLines();
    this._dataUpdated();
    if (this.listeners.onNodeCollapse) {
      await this.listeners.onNodeCollapse(node, e);
    }
  }
  onCanvasDragEnd(e:RGUserEvent) {
    this.setCanvasOffset(this.options.canvasOffset.x + 1, this.options.canvasOffset.y + 1);
    // this._dataUpdated();
    if (this.listeners.onCanvasDragEnd) {
      this.listeners.onCanvasDragEnd(e);
    }
  }
  onCanvasClick(e:RGUserEvent) {
    if (this.options.creatingLinePlot) {
      this.onCanvasClickWhenCreatingLinePlot(e);
    }
    if (this.listeners.onCanvasClick) {
      this.listeners.onCanvasClick(e);
    }
  }
  clickGraphMask(e:RGUserEvent) {
    this.clearLoading();
  }
  onCanvasSelectionEnd(selectionView:RGSelectionView, e:RGUserEvent) {
    if (this.listeners.onCanvasSelectionEnd) {
      this.listeners.onCanvasSelectionEnd(selectionView, e);
    }
  }
  startCreatingNodePlot(e:RGUserEvent, setting:CreatingNodePlotOptions) {
    this.options.newNodeTemplate = json2Node(JSON.parse(JSON.stringify(newNodeTemplate)), this.options);
    this.options.creatingNodePlot = true;
    const isTouchEvent = isSupportTouch(e);
    this.options.showTemplateNode = !isTouchEvent;
    // console.log('is touch event:', isTouchEvent);
    let templaceMove = (x:number, y:number) => {
      this.options.newNodeTemplate.x = x;
      this.options.newNodeTemplate.y = y;
      this._dataUpdated();
    };
    let onCreateNode = (x:number, y:number) => {
      const templateNodeId = 's-' + Date.now();
      this.addNodes([{
        id: templateNodeId,
        text: this.options.newNodeTemplate.text,
        x: x,
        y: y
      }]);
    };
    if (setting && setting.templateText) this.options.newNodeTemplate.text = setting.templateText;
    if (setting && setting.templateStyleClass) this.options.newNodeTemplate.styleClass = setting.templateStyleClass;
    if (setting && setting.templateNode) {
      Object.keys(setting.templateNode).forEach(key => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.options.newNodeTemplate[key] = setting.templateNode[key];
      });
    }
    if (setting && setting.templateMove) templaceMove = setting.templateMove;
    if (setting && setting.onCreateNode) onCreateNode = setting.onCreateNode;
    const graphPosition = this.$dom.getBoundingClientRect();
    devLog('[CreatingNodePlot]startCreatingNodePlot:');
    const clientCoordinate = getClientCoordinate(e);
    const startX = clientCoordinate.clientX - graphPosition.x + 10;
    const startY = clientCoordinate.clientY - graphPosition.y + 10;
    if (!isTouchEvent) templaceMove(startX, startY);
    const objectTemplateMove = ($event:MouseEvent) => {
      const _base_position = this.$dom.getBoundingClientRect();
      devLog('[CreatingNodePlot]objectTemplateMove');
      const movingX = $event.clientX - _base_position.x + 10;
      const movingY = $event.clientY - _base_position.y + 10;
      templaceMove(movingX, movingY);
    };
    const userAbort = ($event:RGUserEvent) => {
      devLog('[CreatingNodePlot]user abort!');
      this.$dom.removeEventListener('mousemove', objectTemplateMove);
      this.$dom.removeEventListener('click', objectBePlaced);
      this.$dom.removeEventListener('contextmenu', userAbort);
      this.options.creatingNodePlot = false;
    };
    const objectBePlaced = ($event:RGUserEvent) => {
      let aborted = false;
      if (!this.options.creatingNodePlot) {
        aborted = true;
      }
      this.$dom.removeEventListener('mousemove', objectTemplateMove);
      this.$dom.removeEventListener('click', objectBePlaced);
      this.$dom.removeEventListener('contextmenu', userAbort);
      this.options.creatingNodePlot = false;
      if (aborted) {
        devLog('[CreatingNodePlot]action be abort!');
        return;
      }
      const clientCoordinate = getClientCoordinate($event);
      const endX = clientCoordinate.clientX - graphPosition.x + 10;
      const endY = clientCoordinate.clientY - graphPosition.y + 10;
      if (setting && setting.disableClickCreate) {
        if (Math.abs(startX - endX) < 5 && Math.abs(startY - endY) < 5) {
          devLog('[CreatingNodePlot]create node be abort!');
          return;
        }
      }
      const canvasCoordinate = this.getCanvasCoordinateByClientCoordinate({ x: clientCoordinate.clientX, y: clientCoordinate.clientY });
      devLog('[CreatingNodePlot]objectBePlaced:', canvasCoordinate);
      onCreateNode(canvasCoordinate.x, canvasCoordinate.y);
      this._dataUpdated();
    };
    setTimeout(() => {
      // this.$dom.addEventListener('mousemove', objectTemplateMove);
      this.$dom.addEventListener('click', objectBePlaced);
      this.$dom.addEventListener('contextmenu', userAbort);
    }, 300);
    if (!isTouchEvent) this.$dom.addEventListener('mousemove', objectTemplateMove);
    // this.$dom.addEventListener('click', objectBePlaced);
    // this.$dom.addEventListener('contextmenu', userAbort);
  }
  startCreatingLinePlot(e:RGUserEvent, setting:CreatingLinePlotOptions) {
    const isTouchEvent = isSupportTouch(e);
    if (setting && setting.onCreateLine) this.onCreateLineCallback = setting.onCreateLine;
    if (setting && setting.template) Object.assign(this.options.newLineTemplate, setting.template);
    this.options.newLinkTemplate.fromNode = null;
    if (setting && setting.fromNode) {
      this.options.newLinkTemplate.toNode.x = setting.fromNode.x + 50;
      this.options.newLinkTemplate.toNode.y = setting.fromNode.y + 50;
      this.options.newLinkTemplate.fromNode = setting.fromNode;
      this.step1EventTime = Date.now();
    }
    this.options.creatingLinePlot = true;
    this.options.newLinkTemplate.toNodeObject = null;
    this.options.newLineTemplate.disableDefaultClickEffect = true;
    this.options.newLinkTemplate.toNode.el.offsetWidth = 2;
    this.options.newLinkTemplate.toNode.el.offsetHeight = 2;
    devLog('[CreatingLinePlot]startCreatingLinePlot:', isTouchEvent);
    if (!isTouchEvent) {
      devLog('[CreatingLinePlot]Listener move');
      this.movingListener = this.onMovingWhenCreatingLinePlot.bind(this);
      this.$dom.addEventListener('mousemove', this.movingListener);
    }
  }
  movingListener:any;
  stopCreatingLinePlot() {
    devLog('[CreatingLinePlot]stop CreatingLinePlot!');
    this.options.creatingLinePlot = false;
    this.options.newLinkTemplate.fromNode = null;
    this.options.newLinkTemplate.toNodeObject = null;
    this.onCreateLineCallback = undefined;
    this.$dom.removeEventListener('mousemove', this.movingListener);
    this._dataUpdated();
  }
  onMovingWhenCreatingLinePlot($event:MouseEvent) {
    devLog('[CreatingLinePlot]mousemove');
    if (this.options.newLinkTemplate.fromNode) {
      const canvasCoordinate = this.getCanvasCoordinateByClientCoordinate({
        x: $event.clientX,
        y: $event.clientY
      });
      this.options.newLinkTemplate.toNode.x = canvasCoordinate.x;
      this.options.newLinkTemplate.toNode.y = canvasCoordinate.y;
      this._dataUpdated();
    }
  }
  onCanvasClickWhenCreatingLinePlot($event:RGUserEvent) {
    if (Date.now() - this.step1EventTime < 500) {
      devLog('[CreatingLinePlot]step1EventTime:', this.step1EventTime);
      return;
    }
    if (!this.options.newLinkTemplate.fromNode) {
      devLog('[CreatingLinePlot]CreatingLinePlot:fromNode not set!');
      return;
    }
    if (!this.options.newLinkTemplate.toNodeObject) {
      devLog('[CreatingLinePlot]CreatingLinePlot:toNodeObject not set!');
      const clientCoordinate = getClientCoordinate($event);
      const canvasCoordinate = this.getCanvasCoordinateByClientCoordinate({ x: clientCoordinate.clientX, y: clientCoordinate.clientY });
      this.onCreateLine(this.options.newLinkTemplate.fromNode, canvasCoordinate);
    }
    this.stopCreatingLinePlot();
  }
  step1EventTime = 0;
  onNodeClickWhenCreatingLinePlot(node:RGNode) {
    if (!this.options.newLinkTemplate.fromNode) {
      devLog('[CreatingLinePlot]step 1: set fromNode:', node);
      this.options.newLinkTemplate.fromNode = node;
      this.options.newLinkTemplate.toNode.x = node.x + 50;
      this.options.newLinkTemplate.toNode.y = node.y + 50;
      this.step1EventTime = Date.now();
    } else {
      devLog('[CreatingLinePlot]step 2: set toNodeObjecct:', this.options.newLinkTemplate.fromNode, node);
      this.options.newLinkTemplate.toNodeObject = node;
      this.onCreateLine(this.options.newLinkTemplate.fromNode, node);
      this.stopCreatingLinePlot();
    }
  }
  onCreateLineCallback:RGOnCreateLineCallback|undefined;
  onCreateLine(from:RGNode, to:RGNode|RGPosition) {
    devLog('[CreatingLinePlot][fire-event]onCreateLine:', from, to);
    if (this.onCreateLineCallback) {
      this.onCreateLineCallback(from, to, this.options.newLineTemplate);
    }
  }
  isNode(el:HTMLElement):RGNode|undefined {
    const nodeEl = findParentByClassName(el, 'rel-node-peel', 'rel-map');
    if (!nodeEl) return;
    const node = this.getNodeById(nodeEl.dataset.id as string);
    return node;
  }
  isLink(el:HTMLElement):RGLink|undefined {
    const lineEl = findParentByClassName(el, 'rel-link-peel', 'rel-map');
    if (!lineEl) return;
    const link = this.getLinkById(lineEl.dataset.id as string);
    return link;
  }
  onContextmenu(e:RGUserEvent) {
    let objectType:RGEventTargetType = 'canvas';
    let object:RGNode|RGLink|undefined = this.isNode(e.target as HTMLElement);
    if (object) {
      objectType = 'node';
    } else {
      object = this.isLink(e.target as HTMLElement);
      if (object) {
        objectType = 'link';
      }
    }
    devLog('contextmenu:objectType', objectType, object);
    if (this.listeners.onContextmenu) {
      this.listeners.onContextmenu(e, objectType, object);
    }
  }
  async fullscreen(newValue?: boolean) {
    if (screenfull.element && screenfull.element !== this.$dom) {
      return;
    }
    if (newValue === this.options.fullscreen) {
      return;
    }
    let isToogle = false;
    if (newValue === undefined) {
      newValue = !this.options.fullscreen;
      isToogle = true;
    }
    devLog("screenfull", newValue);
    this.options.fullscreen = newValue;
    const defaultEffect = async () => {
      if (isToogle) await screenfull.toggle(this.$dom);
    };
    if (this.listeners.onFullscreen) {
      this.listeners.onFullscreen(this.options.fullscreen, defaultEffect);
    } else {
      await defaultEffect();
    }
    // this.emitEvent('onFullscreen', { fullscreen: this.options.fullscreen });
  }
  async focusNodeById(nodeId:string) {
    let node;
    this.graphData.nodes.forEach(thisNode => {
      if (thisNode.id === nodeId) {
        node = thisNode;
      }
    });
    if (node) {
      await this.handleSelect(node);
    }
  }
  async focusRootNode() {
    devLog('relation-graph:focusRootNode');
    this.graphData.rootNode && await this.handleSelect(this.graphData.rootNode);
  }
  async handleSelect(thisNode:RGNode) {
    devLog('checked:', thisNode);
    scrollTo({
      top: this.$dom.offsetTop
    });
    await this.animateToZoom(100, 300);
    const _n_width = thisNode.width || 50;
    const _n_height = thisNode.height || 50;
    const _final_x = thisNode.x * -1 + this.options.viewSize.width / 2 - _n_width / 2;
    const _final_y = thisNode.y * -1 + this.options.viewSize.height / 2 - _n_height / 2;
    await this.animateGoto(_final_x, _final_y, 500);
    this.options.checkedNodeId = thisNode.id;
    this.refreshNVAnalysisInfo();
  }
  onMouseWheel(e:WheelEvent) {
    if (this.options.disableZoom) {
      e.cancelBubble = false;
      return true;
    }
    try {
      e.cancelBubble = true;
      e.preventDefault();
      e.stopPropagation();
    } catch (e) {
      // xxx
    }
    const userZoomCenter = {
      x: e.clientX,
      y: e.clientY
    };
    let _deltaY = e.deltaY;
    if (_deltaY === undefined) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      _deltaY = e.wheelDelta;
    }
    // #25 https://github.com/seeksdream/relation-graph/issues/25
    // const _isMac = /macintosh|mac os x/i.test(navigator.userAgent);
    // const _zoomDirection = _isMac ? 1 : -1;
    const _zoomDirection = -1;
    // const _zoomDirection = 1;
    if (_deltaY > 0) {
      this.zoom(5 * _zoomDirection, userZoomCenter);
    } else {
      this.zoom(-5 * _zoomDirection, userZoomCenter);
    }
  }
  onLineDragStart(link: RGLink, e:RGUserEvent) {
    devLog('onLineDragStart...')
    const node1BasePosition:RGPosition = { x: link.fromNode.x, y: link.fromNode.y};
    const node2BasePosition:RGPosition = { x: link.toNode.x, y: link.toNode.y};
    const draggingCallback = (moved_x:number, moved_y:number, basePosition:RGPosition, baseEventPosition:RGPosition, e_move:RGUserEvent) => {
      link.fromNode.x = node1BasePosition.x + moved_x / (this.options.canvasZoom / 100);
      link.fromNode.y = node1BasePosition.y + moved_y / (this.options.canvasZoom / 100);
      link.toNode.x = node2BasePosition.x + moved_x / (this.options.canvasZoom / 100);
      link.toNode.y = node2BasePosition.y + moved_y / (this.options.canvasZoom / 100);
      this._dataUpdated();
    };
    RGEffectUtils.startDrag(e, {x:0,y:0}, (...args) => {this.onLineDragEnd(...args);}, draggingCallback);
  }
  onLineDragEnd(x_buff:number, y_buff:number, e:RGUserEvent) {
    devLog('onLineDragEnd')
    this.updateElementLines();
  }
  onCanvasDragStart(e:RGUserEvent) {
    devLog('[canvas]onCanvasDragStart...');
    if (this.options.disableDragCanvas) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    if (this.options.selectionMode || e.shiftKey) {
      this.startCreateSelection(e);
      // RGEffectUtils.startDrag(e, {x:0, y: 0}, this.onDragEnd, null);
      return;
    }
    if (!this.options.disableDragLine) {
      const link = this.isLink(e.target as HTMLElement);
      if (link) {
        this.onLineDragStart(link, e);
        return;
      }
    }
    let draggingCallback;
    if (isSupportTouch(e)) {
      let baseEventPosition2:RGPosition;
      let baseZoom = 1;
      draggingCallback = (x:number, y:number, basePosition:RGPosition, baseEventPosition:RGPosition, e_move:RGUserEvent) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const touches = e_move.touches || e_move.targetTouches;
        const touchPointer1 = touches[0];
        if (touches && touches.length > 1) { // 双指操作
          e_move.preventDefault();
          const touchPointer2 = touches[1];
          if (!baseEventPosition2) {
            baseEventPosition2 = { x: touchPointer2.clientX, y: touchPointer2.clientY };
            baseZoom = this.options.canvasZoom;
          }
          const touchPointer1Postion = { x: touchPointer1.clientX, y: touchPointer1.clientY };
          const touchPointer2Postion = { x: touchPointer2.clientX, y: touchPointer2.clientY };
          const baseDistance = Math.hypot(baseEventPosition2.x - baseEventPosition.x, baseEventPosition2.y - baseEventPosition.y);
          const currentDistance = Math.hypot(touchPointer2Postion.x - touchPointer1Postion.x, touchPointer2Postion.y - touchPointer1Postion.y);
          const zoom = currentDistance / baseDistance;
          const newZoom = baseZoom * zoom;
          this.setZoom(newZoom);
          this._dataUpdated();
        } else {
          const ex = touchPointer1.clientX;
          const ey = touchPointer1.clientY;
          let x = basePosition.x + (ex - baseEventPosition.x);
          let y = basePosition.y + (ey - baseEventPosition.y);
          if (this.options.useHorizontalView) { // 光芒卡牌设置横向
            x = basePosition.x + (ey - baseEventPosition.y);
            y = basePosition.y - (ex - baseEventPosition.x);
            this.setCanvasOffset(x, y);
          } else {
            this.setCanvasOffset(x, y);
          }
          this._dataUpdated();
        }
      };
    } else {
      draggingCallback = (x:number, y:number, basePosition:RGPosition, baseEventPosition:RGPosition, e_move:RGUserEvent) => {
        // this.options.canvasOffset.x = basePosition.x + x;
        // this.options.canvasOffset.y = basePosition.y + y;
        const new_x = basePosition.x + x;
        const new_y = basePosition.y + y;
        this.setCanvasOffset(new_x, new_y);
      };
    }
    RGEffectUtils.startDrag(e, this.options.canvasOffset, (...args) => {this.onCanvasDragStop(...args);}, draggingCallback);
  }
  onCanvasDragStop(x_buff:number, y_buff:number, e:RGUserEvent) {
    devLog('[canvas]onCanvasDragStop...');
    if (this.options.creatingSelection) {
      // const canvasCoordinate = graphInstance.getCanvasCoordinateByClientCoordinate({
      //   x: this.nodeMenuPanelPosition.x - 10 + _base_position.x,
      //   y: this.nodeMenuPanelPosition.y - 10 + _base_position.y
      // });
      // console.log('creatingSelection end');
      this.options.creatingSelection = false;
      this._dataUpdated();
      this.onCanvasSelectionEnd(this.options.selectionView, e);
      return;
    }
    // this.options.creatingSelection = false;
    if (x_buff === 0 && y_buff === 0) {
      devLog('[canvas]click2');
      this._dataUpdated();
      this.onCanvasClick(e);
      return;
    }
    if (Math.abs(x_buff) + Math.abs(y_buff) > 6) {
      setTimeout(() => {
        devLog('[canvas]onDragEnd1');
        this.onCanvasDragEnd(e);
      }, 100);
    } else {
      devLog('[canvas]onDragEnd2');
      this.onCanvasDragEnd(e);
    }
  }
  startCreateSelection(e:RGUserEvent) {
    let started = false;
    const draggingCallback = (x:number, y:number, basePosition:RGPosition, baseEventPosition:RGPosition, e:RGUserEvent) => {
      if (!started && (Math.abs(x) + Math.abs(y)) > 6) {
        started = true;
        this.options.creatingSelection = true;
        this.options.selectionView.x = baseEventPosition.x;
        this.options.selectionView.y = baseEventPosition.y;
      }
      if (started) {
        const graphBase = this.getBoundingClientRect();
        if (x < 0) {
          this.options.selectionView.x = baseEventPosition.x + x - graphBase.x;
          this.options.selectionView.width = Math.abs(x);
        } else {
          this.options.selectionView.x = baseEventPosition.x - graphBase.x;
          this.options.selectionView.width = x;
        }
        if (y < 0) {
          this.options.selectionView.y = baseEventPosition.y + y - graphBase.y;
          this.options.selectionView.height = Math.abs(y);
        } else {
          this.options.selectionView.y = baseEventPosition.y - graphBase.y;
          this.options.selectionView.height = y;
        }
      }
      this._dataUpdated();
    };
    RGEffectUtils.startDrag(e, {x:0, y: 0}, (...args) => {this.onCanvasDragStop(...args);}, draggingCallback);
  }
}
