import {RelationGraphWith9EasyView} from './RelationGraphWith9EasyView';
import {
  JsonLineTemplate, RGEventNames, RGJunctionPoint,
  RGLine,
  RGLink,
  RGNode,
  RGResizeHandlePosition,
  RGSelectionView,
  RGUserEvent,
  RGWidgetPosition
} from '../types';
import {devLog, isSupportTouch} from '../utils/RGCommon';
import {json2Line} from "./RGLink";
export class RelationGraphWith91Editing extends RelationGraphWith9EasyView {
  setEditingNodes(nodes: RGNode[]) {
    this.options.editingController.nodes.forEach(node => {
      node.selected = false;
    });
    this.options.editingController.nodes.splice(0, this.options.editingController.nodes.length);
    this.options.editingController.nodes.push(...nodes);
    this.options.editingController.show = this.options.editingController.nodes.length > 0;
    this.updateEditingControllerView();
  }
  addEditingNode(node: RGNode) {
    this.options.editingController.nodes.forEach(node => {
      node.selected = false;
    });
    this.options.editingController.show = true;
    this.options.editingController.nodes.push(node);
    this.updateEditingControllerView();
  }
  removeEditingNode(node: RGNode) {
    this.options.editingController.nodes.forEach(node => {
      node.selected = false;
    });
    this.options.editingController.nodes.splice(this.options.editingController.nodes.indexOf(node), 1);
    this.options.editingController.show = this.options.editingController.nodes.length > 0;
    this.updateEditingControllerView();
  }
  toggleEditingNode(node: RGNode) {
    this.options.editingController.nodes.forEach(node => {
      node.selected = false;
    });
    if (this.options.editingController.nodes.includes(node)) {
      this.removeEditingNode(node);
    } else {
      this.addEditingNode(node);
    }
  }
  updateEditingControllerView() {
    this.updateEditingLineView();
    if (!this.options.editingController.show) return;
    // console.log('this.options.editingController.nodes.length:', this.options.editingController.nodes.length);
    if (this.options.editingController.nodes.length > 1) this.options.editingController.nodes.forEach(node => {
      node.selected = true;
    });
    let minX = 9999999;
    let minY = 9999999;
    let maxX = -9999999;
    let maxY = -9999999;
    for (const node of this.options.editingController.nodes) {
      if (node.x < minX) minX = node.x;
      if (node.y < minY) minY = node.y;
      if ((node.x + node.el.offsetWidth) > maxX) maxX = node.x + node.el.offsetWidth;
      if ((node.y + node.el.offsetHeight) > maxY) maxY = node.y + node.el.offsetHeight;
    }
    const padding = this.options.editingController.nodes.length > 1 ? 5 : 0;
    const zoomRate = (this.options.canvasZoom! / 100);
    const viewX = minX === 9999999 ? 0 : minX;
    const viewY = minY === 9999999 ? 0 : minY;
    let viewWith = (maxX - minX);
    let viewHeight = (maxY - minY);
    if (viewWith < 0) viewWith = 0;
    if (viewHeight < 0) viewHeight = 0;
    if (viewWith > 0 && viewHeight > 0) {
      const startCoordinateOnView = this.getViewPointByCanvasPoint({
        x: viewX,
        y: viewY
      });
      // const _base_position = this.getBoundingClientRect();
      // console.log('startCoordinateOnView:', startCoordinateOnView.x, startCoordinateOnView.y);
      this.options.editingController.x = startCoordinateOnView.x - padding * zoomRate;
      this.options.editingController.y = startCoordinateOnView.y - padding * zoomRate;
      this.options.editingController.width = viewWith * zoomRate + padding * 2 * zoomRate;
      this.options.editingController.height = viewHeight * zoomRate + padding * 2 * zoomRate;
    } else {
      this.options.editingController.show = false;
    }
    this.dataUpdated();
  }
  protected _getEventPoint(e: RGUserEvent) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const point = {
      x: e.clientX,
      y: e.clientY
    };
    if (isSupportTouch(e)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const touches = e.touches || e.targetTouches;
      if (!touches) {
        throw new Error('error targetTouches');
      }
      point.x = touches[0].clientX;
      point.x = touches[0].clientY;
    }
    const relMapBox = this.getBoundingClientRect();
    // console.log('xxxxxrelMapBox:', point.x - relMapBox.x, point.y - relMapBox.y);
    return {
      x: point.x - relMapBox.x,
      y: point.y - relMapBox.y
    };
  }
  protected _onResizing;
  protected _onResizeEnd;
  protected _startPoint = {x:0,y:0};
  protected _startSize = {x:0,y:0,width:0,height:0};
  protected _resizeType: RGResizeHandlePosition = 'l';
  protected nodeStartSizeMap = new WeakMap<RGNode, any>();
  protected resizeMiniLimit = { width: 20, height: 20};
  onResizeStart(type:RGResizeHandlePosition, e: RGUserEvent) {
    // console.log('onResizeStart:', type);
    this._resizeType = type;
    this._startPoint = this._getEventPoint(e);
    this._startSize.x = this.options.editingController.x;
    this._startSize.y = this.options.editingController.y;
    this._startSize.width = this.options.editingController.width;
    this._startSize.height = this.options.editingController.height;
    for (const node of this.options.editingController.nodes) {
      this.nodeStartSizeMap.set(node, {
        x: node.x,
        y: node.y,
        width: node.el.offsetWidth,
        height: node.el.offsetHeight
      });
      // console.log('===nodeStartSize:', this.nodeStartSizeMap[node].x);
    }
    if (this._onResizing) this.$dom.removeEventListener('mousemove', this._onResizing);
    if (this._onResizeEnd) this.$dom.removeEventListener('mouseup', this._onResizeEnd);
    this._onResizing = this.onResizing.bind(this);
    this._onResizeEnd = this.onResizeEnd.bind(this);
    this.$dom.addEventListener('mousemove', this._onResizing);
    this.$dom.addEventListener('mouseup', this._onResizeEnd);
    this.emitEvent(RGEventNames.onResizeStart, this.options.editingController.nodes);
  }
  onResizing(e: RGUserEvent) {
    const point = this._getEventPoint(e);
    // console.log('xxxxxxxxxxx:', point.x, point.y);
    const buff_x = point.x - this._startPoint.x;
    const buff_y = point.y - this._startPoint.y;
    let newWidth = this.options.editingController.width;
    let newHeight = this.options.editingController.height;
    // const zoomRate = (this.options.canvasZoom / 100);
    const zoomRate = 1;
    if (this._resizeType === 'tl') {
      this.options.editingController.x = this._startSize.x + buff_x / zoomRate;
      this.options.editingController.y = this._startSize.y + buff_y / zoomRate;
      newWidth = this._startSize.width - buff_x / zoomRate;
      newHeight = this._startSize.height - buff_y / zoomRate;
    } else if (this._resizeType === 'tr') {
      this.options.editingController.y = this._startSize.y + buff_y / zoomRate;
      newWidth = this._startSize.width + buff_x / zoomRate;
      newHeight = this._startSize.height - buff_y / zoomRate;
    } else if (this._resizeType === 'bl') {
      this.options.editingController.x = this._startSize.x + buff_x / zoomRate;
      newWidth = this._startSize.width - buff_x / zoomRate;
      newHeight = this._startSize.height + buff_y / zoomRate;
    } else if (this._resizeType === 'br') {
      newWidth = this._startSize.width + buff_x / zoomRate;
      newHeight = this._startSize.height + buff_y / zoomRate;
    } else if (this._resizeType === 't') {
      this.options.editingController.y = this._startSize.y + buff_y / zoomRate;
      newHeight = this._startSize.height - buff_y / zoomRate;
    } else if (this._resizeType === 'r') {
      newWidth = this._startSize.width + buff_x / zoomRate;
    } else if (this._resizeType === 'b') {
      newHeight = this._startSize.height + buff_y / zoomRate;
    } else if (this._resizeType === 'l') {
      this.options.editingController.x = this._startSize.x + buff_x / zoomRate;
      newWidth = this._startSize.width - buff_x / zoomRate;
    }
    if (newWidth < this.resizeMiniLimit.width) newWidth = this.resizeMiniLimit.width;
    if (newHeight < this.resizeMiniLimit.width) newHeight = this.resizeMiniLimit.width;
    this.options.editingController.width = newWidth;
    this.options.editingController.height = newHeight;
    this._applyResizeScale(e);
    // console.log('onResizing', buff_x, buff_y);
    this.dataUpdated();
  }
  private _applyResizeScale(e: RGUserEvent) {
    const scale_x = this.options.editingController.width / this._startSize.width;
    const scale_y = this.options.editingController.height / this._startSize.height;
    const startLeftTopPoint = this.getCanvasPointByViewPoint({
      x: this._startSize.x,
      y: this._startSize.y
    });
    const leftTopPoint = this.getCanvasPointByViewPoint({
      x: this.options.editingController.x,
      y: this.options.editingController.y
    });
    for (const node of this.options.editingController.nodes) {
      const nodeStartSize = this.nodeStartSizeMap.get(node);
      const newWidth = nodeStartSize.width * scale_x;
      const newHeight = nodeStartSize.height * scale_y;
      // console.log('nodeStartSize:', this._startSize.x, this._startSize.y, leftTopPoint.x, leftTopPoint.y, scale_x, nodeStartSize.x - startLeftTopPoint.x);
      const newX = leftTopPoint.x + scale_x * (nodeStartSize.x - startLeftTopPoint.x);
      const newY = leftTopPoint.y + scale_y * (nodeStartSize.y - startLeftTopPoint.y);
      const newW = newWidth;
      const newH = newHeight;
      let cancelApply = false;
      if (this.listeners.beforeNodeResize) {
        cancelApply = this.listeners.beforeNodeResize(node, newX, newY, newW, newH) === false;
      }
      if (!cancelApply) {
        node.x = newX;
        node.y = newY;
        node.width = newW;
        node.height = newH;
      }
    }
    this.updateEditingControllerView();
  }
  onResizeEnd(e: RGUserEvent) {
    const point = this._getEventPoint(e);
    const buff_x = point.x - this._startPoint.x;
    const buff_y = point.y - this._startPoint.y;
    // console.log('onResizeEnd', buff_x, buff_y);
    this._applyResizeScale(e);
    this.$dom.removeEventListener('mousemove', this._onResizing);
    this.$dom.removeEventListener('mouseup', this._onResizeEnd);
    this._onResizing = null;
    this._onResizeEnd = null;
    this.emitEvent(RGEventNames.onResizeEnd, this.options.editingController.nodes, buff_x, buff_y);
  }
  protected draggingSelectedNodes(draggedNode: RGNode, buff_x: number, buff_y: number) {
    // console.log('draggingSelectedNodes', buff_x, buff_y);
    if (!this.options.editingController.nodes.includes(draggedNode)) {
      this.updateReferenceLineView(draggedNode, buff_x, buff_y);
      this.updateEditingLineView();
      return;
    }
    for (const node of this.options.editingController.nodes) {
      if (node !== draggedNode) {
        node.x += buff_x;
        node.y += buff_y;
      }
    }
    this.updateReferenceLineView(draggedNode, buff_x, buff_y);
    this.updateEditingControllerView();
  }
  getNodesInSelectionView(selectionView:RGSelectionView) {
    const _base_position = this.getBoundingClientRect();
    const startCoordinateOnCanvas = this.getCanvasCoordinateByClientCoordinate({
      x: selectionView.x + _base_position.x,
      y: selectionView.y + _base_position.y
    });
    const endCoordinateOnCanvas = this.getCanvasCoordinateByClientCoordinate({
      x: selectionView.x + selectionView.width + _base_position.x,
      y: selectionView.y + selectionView.height + _base_position.y
    });
    const nodes = [];
    this.getNodes().forEach(node => {
      const nodeCenterX = node.x + node.el.offsetWidth / 2;
      const nodeCenterY = node.y + node.el.offsetHeight / 2;
      if (nodeCenterX > startCoordinateOnCanvas.x && nodeCenterY > startCoordinateOnCanvas.y) {
        if (nodeCenterX < endCoordinateOnCanvas.x && nodeCenterY < endCoordinateOnCanvas.y) {
          nodes.push(node);
        }
      }
    });
    return nodes;
  }
  updateEditingConnectControllerView() {
    const node = this.options.nodeConnectController.node;
    const minX = node.x;
    const minY = node.y;
    const maxX = node.x + node.el.offsetWidth;
    const maxY = node.y + node.el.offsetHeight;
    const padding = 0;
    const zoomRate = (this.options.canvasZoom! / 100);
    const viewX = minX;
    const viewY = minY;
    const viewWith = (maxX - minX);
    const viewHeight = (maxY - minY);
    const startCoordinateOnView = this.getViewPointByCanvasPoint({
      x: viewX,
      y: viewY
    });
    this.options.nodeConnectController.x = startCoordinateOnView.x - padding * zoomRate;
    this.options.nodeConnectController.y = startCoordinateOnView.y - padding * zoomRate;
    this.options.nodeConnectController.width = viewWith * zoomRate + padding * 2 * zoomRate;
    this.options.nodeConnectController.height = viewHeight * zoomRate + padding * 2 * zoomRate;
    this.dataUpdated();
  }
  setEditingLine(line: RGLine | null, link: RGLink | null) {
    this.options.editingLineController.link = link;
    this.options.editingLineController.line = line;
    this.options.editingLineController.show = link && line ? true : false;
    this.updateEditingLineView(true);
  }
  updateReferenceLineView(draggedNode: RGNode, buff_x: number, buff_y: number) {
    if (!this.options.showReferenceLine) return;
    const distanceX = Math.abs(buff_x);
    const distanceY = Math.abs(buff_y);
    if (!this.options.editingReferenceLine.show && (distanceX + distanceY) > 0 ) {
      this.options.editingReferenceLine.show = true;
    }
    if (!this.options.editingReferenceLine.show) return;
    const draggedNodeXStart = draggedNode.x;
    const draggedNodeXCenter = draggedNode.x + draggedNode.el.offsetWidth / 2;
    const draggedNodeXEnd = draggedNode.x + draggedNode.el.offsetWidth;
    const draggedNodeYStart = draggedNode.y;
    const draggedNodeYCenter = draggedNode.y + draggedNode.el.offsetHeight / 2;
    const draggedNodeYEnd = draggedNode.y + draggedNode.el.offsetHeight;

    const startOnView = this.getViewPointByCanvasPoint({
      x: draggedNodeXStart,
      y: draggedNodeYStart
    });
    const centerOnView = this.getViewPointByCanvasPoint({
      x: draggedNodeXCenter,
      y: draggedNodeYCenter
    });
    const endOnView = this.getViewPointByCanvasPoint({
      x: draggedNodeXEnd,
      y: draggedNodeYEnd
    });
    let showH = false;
    let showV = false;
    for (const node of this.graphData.nodes) {
      if (node === draggedNode) continue;
      const nodeXStart = node.x;
      const nodeXCenter = node.x + node.el.offsetWidth / 2;
      const nodeXEnd = node.x + node.el.offsetWidth;
      const nodeYStart = node.y;
      const nodeYCenter = node.y + node.el.offsetHeight / 2;
      const nodeYEnd = node.y + node.el.offsetHeight;
      const buffXStart = Math.abs(draggedNodeXStart - nodeXStart);
      const buffXCenter = Math.abs(draggedNodeXCenter - nodeXCenter);
      const buffXEnd = Math.abs(draggedNodeXEnd - nodeXEnd);
      const buffYStart = Math.abs(draggedNodeYStart - nodeYStart);
      const buffYCenter = Math.abs(draggedNodeYCenter - nodeYCenter);
      const buffYEnd = Math.abs(draggedNodeYEnd - nodeYEnd);
      const matchDistance = 3;
      if (buffXCenter < 800 && buffYCenter < 800) {
        if (!showV && buffXCenter < matchDistance) {
          const toPoint = this.getViewPointByCanvasPoint({
            x: nodeXCenter,
            y: nodeYCenter
          });
          this.options.editingReferenceLine.v_x = centerOnView.x;
          this.options.editingReferenceLine.v_y = centerOnView.y > toPoint.y ? toPoint.y : centerOnView.y;
          this.options.editingReferenceLine.v_height = Math.round(Math.abs(centerOnView.y - toPoint.y));
          showV = true;
        }
        if (!showV && buffXStart < matchDistance) {
          const toPoint = this.getViewPointByCanvasPoint({
            x: nodeXStart,
            y: nodeYCenter
          });
          this.options.editingReferenceLine.v_x = startOnView.x;
          this.options.editingReferenceLine.v_y = centerOnView.y > toPoint.y ? toPoint.y : centerOnView.y;
          this.options.editingReferenceLine.v_height = Math.round(Math.abs(centerOnView.y - toPoint.y));
          showV = true;
        }
        if (!showV && buffXEnd < matchDistance) {
          const toPoint = this.getViewPointByCanvasPoint({
            x: nodeXEnd,
            y: nodeYCenter
          });
          this.options.editingReferenceLine.v_x = endOnView.x;
          this.options.editingReferenceLine.v_y = centerOnView.y > toPoint.y ? toPoint.y : centerOnView.y;
          this.options.editingReferenceLine.v_height = Math.round(Math.abs(centerOnView.y - toPoint.y));
          showV = true;
        }
        if (!showH && buffYCenter < matchDistance) {
          const toPoint = this.getViewPointByCanvasPoint({
            x: nodeXCenter,
            y: nodeYCenter
          });
          this.options.editingReferenceLine.h_y = centerOnView.y;
          this.options.editingReferenceLine.h_x = centerOnView.x > toPoint.x ? toPoint.x : centerOnView.x;
          this.options.editingReferenceLine.h_width = Math.round(Math.abs(centerOnView.x - toPoint.x));
          showH = true;
        }
        if (!showH && buffYStart < matchDistance) {
          const toPoint = this.getViewPointByCanvasPoint({
            x: nodeXCenter,
            y: nodeYStart
          });
          this.options.editingReferenceLine.h_y = startOnView.y;
          this.options.editingReferenceLine.h_x = centerOnView.x > toPoint.x ? toPoint.x : centerOnView.x;
          this.options.editingReferenceLine.h_width = Math.round(Math.abs(centerOnView.x - toPoint.x));
          showH = true;
        }
        if (!showH && buffYEnd < matchDistance) {
          const toPoint = this.getViewPointByCanvasPoint({
            x: nodeXCenter,
            y: nodeYEnd
          });
          this.options.editingReferenceLine.h_y = endOnView.y;
          this.options.editingReferenceLine.h_x = centerOnView.x > toPoint.x ? toPoint.x : centerOnView.x;
          this.options.editingReferenceLine.h_width = Math.abs(centerOnView.x - toPoint.x);
          showH = true;
        }
        if (showH && showV) {
          break;
        }
      }
    }
    this.options.editingReferenceLine.directionH = showH;
    this.options.editingReferenceLine.directionV = showV;
  }
  hideEditingLineView() {
    this.options.editingLineController.show = false;
  }
  updateEditingLineView(updateLine49Points = false) {
    this.updateElementLines();
    if (!this.options.editingLineController.show) return;
    const link = this.options.editingLineController.link as RGLink;
    const line = this.options.editingLineController.line as RGLine;
    if (!line) {
      this.options.editingLineController.show = false;
      return;
    }
    const {path, textPosition} = this.createLinePath(link, line, link.relations.indexOf(line));
    const {startPoint, endPoint} =  this.getStartAndEndPoint(path);
    // console.log('setEditingLine', points);

    const viewStartPoint = this.getViewPointByCanvasPoint(line.isReverse ? endPoint : startPoint);
    const viewEndPoint = this.getViewPointByCanvasPoint(line.isReverse ? startPoint : endPoint);
    this.options.editingLineController.startPoint.x = viewStartPoint.x - 5;
    this.options.editingLineController.startPoint.y = viewStartPoint.y - 5;
    this.options.editingLineController.endPoint.x = viewEndPoint.x - 5;
    this.options.editingLineController.endPoint.y = viewEndPoint.y - 5;
    const textPoint = this.getViewPointByCanvasPoint(textPosition);
    const lineDom = this.$canvasDom.querySelector(`g[data-id='${line.id}']`);
    let textAlignOffsetX = 0;
    let textAlignOffsetY = 0;
    let orignLineTextOffsetX = line.textOffset_x || 0;
    let orignLineTextOffsetY = line.textOffset_y || 0;
    const scale = this.options.canvasZoom! / 100;
    if (lineDom) {
      const textDom: SVGTextElement = lineDom.querySelector(`text.c-rg-line-text`)!;
      // console.log('this.$canvasDom:line:', textDom);
      if (textDom) {
        orignLineTextOffsetX = Math.floor(parseFloat(textDom.getAttribute('x') || '0'));
        orignLineTextOffsetY = Math.floor(parseFloat(textDom.getAttribute('y') || '0'));
        const textBox = textDom.getBoundingClientRect();
        // textPoint = this.getViewPointByCanvasPoint({x: textBox.x, y: textBox.y});
        const textAnchor = getComputedStyle(textDom).textAnchor;
        // console.log('this.$canvasDom:line:size', getComputedStyle(textDom).textAnchor, textBox.width, textBox.height);
        this.options.editingLineController.text.width = textBox.width;
        this.options.editingLineController.text.height = textBox.height;

        textAlignOffsetY = -textBox.height / 2;
        if (textAnchor === 'start') {
          textAlignOffsetX = 0;
        } else if (textAnchor === 'end') {
          textAlignOffsetX = -this.options.editingLineController.text.width;
        } else { // textAnchor === 'middle'
          textAlignOffsetX = (-this.options.editingLineController.text.width / 2);
        }
      } else {
        this.options.editingLineController.text.width = 20;
        this.options.editingLineController.text.height = 10;
        textAlignOffsetX = -this.options.editingLineController.text.width / 2;
      }
    }
    this.options.editingLineController.text.width += 40;
    this.options.editingLineController.text.height += 10;
    this.options.editingLineController.text.x = textPoint.x + textAlignOffsetX + (orignLineTextOffsetX) * scale - 20;
    this.options.editingLineController.text.y = textPoint.y + textAlignOffsetY + (orignLineTextOffsetY) * scale - 10;
  }
  private getStartAndEndPoint(svgPath: string) {
    const commands = svgPath.match(/[a-zA-Z][^a-zA-Z]*/g);
    let currentX = 0;
    let currentY = 0;
    let startX = 0;
    let startY = 0;
    let controlX1 = 0;
    let controlY1 = 0;
    let controlX2 = 0;
    let controlY2 = 0;
    let isDrawing = false;
    const startPoint = {x:0,y:0};
    const endPoint = {x:0,y:0};
    for (const command of commands) {
      const parts = command.trim().split(/[ ,]+/);
      const type = parts[0].toUpperCase();
      const isRelative = parts[0] === parts[0].toLowerCase();
      // console.log('command', type, parts.join(','));
      switch (type) {
      case 'M':
        currentX =  this.getPointValue(startX, parts[1], isRelative) + this.easyViewOffset.x;
        currentY =  this.getPointValue(startY, parts[2], isRelative) + this.easyViewOffset.y;
        startX = currentX;
        startY = currentY;
        break;
      case 'L':
        currentX =  this.getPointValue(startX, parts[1], isRelative) + this.easyViewOffset.x;
        currentY =  this.getPointValue(startY, parts[2], isRelative) + this.easyViewOffset.y;
        break;
      case 'C':
        controlX1 = this.getPointValue(startX, parts[1], isRelative);
        controlY1 = this.getPointValue(startY, parts[2], isRelative);
        controlX2 = this.getPointValue(startX, parts[3], isRelative);
        controlY2 = this.getPointValue(startY, parts[4], isRelative);
        currentX = this.getPointValue(startX, parts[5], isRelative);
        currentY = this.getPointValue(startY, parts[6], isRelative);
        startX = currentX;
        startY = currentY;
        break;
      case 'Q':
        controlX1 = this.getPointValue(startX, parts[1], isRelative);
        controlY1 = this.getPointValue(startY, parts[2], isRelative);
        currentX = this.getPointValue(startX, parts[3], isRelative);
        currentY = this.getPointValue(startY, parts[4], isRelative);
        startX = currentX;
        startY = currentY;
        break;
      case 'V':
        currentY = this.getPointValue(startY, parts[1], isRelative);
        startY = currentY;
        break;
      case 'H':
        currentX = this.getPointValue(startX, parts[1], isRelative);
        startX = currentX;
        break;
      case 'Z':
        isDrawing = false;
        break;
      default:
        devLog(`Unsupported command: ${type}`);
      }
      if (command === commands[0]) {
        startPoint.x = currentX;
        startPoint.y = currentY;
      }
      if (command === commands[commands.length - 1]) {
        endPoint.x = currentX;
        endPoint.y = currentY;
      }
    }
    return {
      startPoint,
      endPoint
    };
  }
  private _currentCreatingLineIsReverse = false;
  startMoveLineVertex(type:'start'|'end', $event:RGUserEvent) {
    $event.stopPropagation();
    // console.log('DragLine start:', type);
    const link = this.options.editingLineController.link as RGLink;
    const line = this.options.editingLineController.line as RGLine;
    let fromNode = link.fromNode;
    let toNode;
    this.setEditingLine(null, null);
    this.removeLine(link, line);
    this._currentCreatingLineIsReverse = false;
    const {fromJunctionPoint, fromJuctionPointOffsetX, fromJuctionPointOffsetY, toJunctionPoint, toJuctionPointOffsetX, toJuctionPointOffsetY} = this.options.newLinkTemplate;
    if (line.lineShape === 49) {
      line.lineShape = 44;
    }
    if (type === 'start') {
      line.fromJuctionPointOffsetX = 0;
      line.fromJuctionPointOffsetY = 0;
      // console.log('[from-start]move end:', type);
      if (line.isReverse) {
        this._currentCreatingLineIsReverse = true;
      } else {
        fromNode = link.toNode;
        line.isReverse = true;
      }
    } else {
      line.toJuctionPointOffsetX = 0;
      line.toJuctionPointOffsetY = 0;
      // console.log('[from-start]move end:', type);
      if (line.isReverse) {
        // console.log('[from-start]end end:reverse:', type);
        fromNode = link.toNode;
        line.isReverse = undefined;
        this._currentCreatingLineIsReverse = true;
      }
    }
    if (this._currentCreatingLineIsReverse) {
      this.options.newLinkTemplate.fromJunctionPoint = toJunctionPoint;
      this.options.newLinkTemplate.toJunctionPoint = fromJunctionPoint;
      // this.options.newLinkTemplate.fromJuctionPointOffsetX = toJuctionPointOffsetX;
      // this.options.newLinkTemplate.fromJuctionPointOffsetY = toJuctionPointOffsetY;
      // this.options.newLinkTemplate.toJuctionPointOffsetX = fromJuctionPointOffsetX;
      // this.options.newLinkTemplate.toJuctionPointOffsetY = fromJuctionPointOffsetY;
    }
    // console.log('xxxxxxxxxxxxxx', this._currentCreatingLineIsReverse);
    this.startCreatingLinePlot($event, {
      template: line,
      fromNode: fromNode,
      onCreateLine: (from, to, newLineTemplate) => {
        if (to.id) { // 创建的连线的起点一定是节点，但终点可以是空白处，终点没有选择成节点时to不是一个节点，to.id不会有值，这里做了判断，只处理to为节点的情况
          // console.log('onCreateLine:', from.text, to.text, newLineTemplate.fromJunctionPoint, newLineTemplate.toJunctionPoint);
          let fromId = from.id;
          let toId = to.id;
          if (newLineTemplate && newLineTemplate.isReverse) {
            fromId = to.id;
            toId = from.id;
            newLineTemplate.isReverse = undefined;
          }
          const newLineJson = Object.assign(newLineTemplate || {}, {
            from: fromId,
            to: toId
          });
          this.addLines([newLineJson]);
        }
      }
    });
  }
  startCreateLineByTemplate(type: RGWidgetPosition, lineTemplate: JsonLineTemplate|undefined, $event:RGUserEvent) {
    $event.stopPropagation();
    // console.log('Create line start:', type);
    const fromNode = this.options.editingController.nodes[0];
    const _lineTemplate = lineTemplate || {
      lineShape: 6,
      text: 'New Line'
    };
    this.startCreatingLinePlot($event, {
      template: _lineTemplate,
      fromNode: fromNode,
      onCreateLine: (from, to, newLineTemplate) => {
        if (to.id) { // 创建的连线的起点一定是节点，但终点可以是空白处，终点没有选择成节点时to不是一个节点，to.id不会有值，这里做了判断，只处理to为节点的情况
          // console.log('onCreateLine:', from.text, to.text, newLineTemplate.fromJunctionPoint, newLineTemplate.toJunctionPoint);
          const newLineJson = Object.assign({}, newLineTemplate, {
            from: from.id,
            to: to.id
          });
          this.addLines([newLineJson]);
        }
      }
    });
  }
  onLineVertexBeDropped(type: RGJunctionPoint, $event:RGUserEvent, junctionPointOffset = {x: 0, y: 0}) {
    $event.stopPropagation();
    console.log('Connect end:', this.options.newLineTemplate.isReverse);
    const node = this.options.nodeConnectController.node;

    if (!this.options.newLinkTemplate.fromNode) {
      if (this.options.newLineTemplate.isReverse) {
        this.options.newLineTemplate.toJunctionPoint = type;
        this.options.newLineTemplate.toJuctionPointOffsetX = junctionPointOffset.x;
        this.options.newLineTemplate.toJuctionPointOffsetY = junctionPointOffset.y;
      } else {
        this.options.newLineTemplate.fromJunctionPoint = type;
        this.options.newLineTemplate.fromJuctionPointOffsetX = junctionPointOffset.x;
        this.options.newLineTemplate.fromJuctionPointOffsetY = junctionPointOffset.y;
      }
      this.options.newLinkTemplate.fromNode = node;
    } else {
      // this.options.newLineTemplate.toJunctionPoint = type;
      // this.options.newLineTemplate.toJuctionPointOffsetX = junctionPointOffset.x;
      // this.options.newLineTemplate.toJuctionPointOffsetY = junctionPointOffset.y;
      if (this.options.newLineTemplate.isReverse) {
        this.options.newLineTemplate.fromJunctionPoint = type;
        this.options.newLineTemplate.fromJuctionPointOffsetX = junctionPointOffset.x;
        this.options.newLineTemplate.fromJuctionPointOffsetY = junctionPointOffset.y;
      } else {
        this.options.newLineTemplate.toJunctionPoint = type;
        this.options.newLineTemplate.toJuctionPointOffsetX = junctionPointOffset.x;
        this.options.newLineTemplate.toJuctionPointOffsetY = junctionPointOffset.y;
      }
      const {fromJunctionPoint, fromJuctionPointOffsetX, fromJuctionPointOffsetY, toJunctionPoint, toJuctionPointOffsetX, toJuctionPointOffsetY} = this.options.newLinkTemplate;
      //
      // if (this.options.newLinkTemplate.isReverse) {
      //     this.options.newLinkTemplate.fromJunctionPoint = toJunctionPoint;
      //     this.options.newLinkTemplate.toJunctionPoint = fromJunctionPoint;
      //     this.options.newLinkTemplate.fromJuctionPointOffsetX = toJuctionPointOffsetX;
      //     this.options.newLinkTemplate.fromJuctionPointOffsetY = toJuctionPointOffsetY;
      //     this.options.newLinkTemplate.toJuctionPointOffsetX = fromJuctionPointOffsetX;
      //     this.options.newLinkTemplate.toJuctionPointOffsetY = fromJuctionPointOffsetY;
      // }
      this.options.newLinkTemplate.toNodeObject = node;
      const fromNode = this.options.newLinkTemplate.fromNode;
      const toNode = node;
      const lineJson = json2Line(this.options.newLineTemplate);
      lineJson.from = fromNode ? fromNode.id : '';
      lineJson.to = toNode ? toNode.id : '';
      this.emitEvent(RGEventNames.onLineVertexDropped, {lineJson, fromNode, toNode});
      this.onCreateLine(this.options.newLinkTemplate.fromNode, this.options.nodeConnectController.node);
      this.stopCreatingLinePlot();
    }
  }
  startMoveLineText($event:RGUserEvent) {
    // $event.stopPropagation();
    // $event.preventDefault();
    const startPoint = this._getEventPoint($event);
    const line: RGLine = this.options.editingLineController.line!;
    const orignLineTextOffsetX = line.textOffset_x || 0;
    const orignLineTextOffsetY = line.textOffset_y || 0;
    const onDragging = (e: MouseEvent) => {
      const scale = this.options.canvasZoom! / 100;
      const point = this._getEventPoint(e);
      const buff_x = point.x - startPoint.x;
      const buff_y = point.y - startPoint.y;
      line.textOffset_x = Math.round(orignLineTextOffsetX + buff_x / scale);
      line.textOffset_y = Math.round(orignLineTextOffsetY + buff_y / scale);
      this.updateEditingLineView();
      this._dataUpdated();
    };
    const onDragEnd = (e: MouseEvent) => {
      this.$dom.removeEventListener('mousemove', onDragging);
      this.$dom.removeEventListener('mouseup', onDragEnd);
      this._dataUpdated();
    };
    this.$dom.addEventListener('mousemove', onDragging);
    this.$dom.addEventListener('mouseup', onDragEnd);
  }
}

