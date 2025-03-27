import {RGLine, RGLink, RGListeners, RGNode, RGOptions, RGPosition, RGUserEvent} from '../types';
import {devLog} from "../utils/RGCommon";
import RGNodesAnalytic from "../utils/RGNodesAnalytic";
import {RelationGraphWith91Editing} from "./RelationGraphWith91Editing";
import RGEffectUtils from "../utils/RGEffectUtils";

export class RelationGraphWith92MiniView extends RelationGraphWith91Editing {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  $miniViewCanvas:HTMLCanvasElement;
  $mvCanvasCtx:CanvasRenderingContext2D;
  constructor(options: RGOptions, listeners: RGListeners) {
    super(options, listeners);
  }
  setMiniViewCanvas(canvas:HTMLCanvasElement) {
    this.$miniViewCanvas = canvas;
    this.$mvCanvasCtx = this.$miniViewCanvas.getContext('2d');
  }
  updateMiniView() {
    if (!this.options.showMiniView) {
      return;
    }
    requestAnimationFrame(this._updateMiniView.bind(this));
  }
  miniViewUpdating = false;
  private miniViewUpdateHasNext = false;
  private _updateMiniView() {
    try {
      this.miniViewUpdating = true;
      this.mvDosomethingBeforeDraw();
      this.mvDrawAllNodes();
      this.mvDrawAllLines();
      this.mvDrawMask();
    } catch (e) {
      console.error(e);
    }
    this.miniViewUpdating = false;
    if (this.miniViewUpdateHasNext) {
      this.miniViewUpdateHasNext = false;
      this._updateMiniView();
    }
  }
  protected mvDosomethingBeforeDraw() {
    let minX = 9999999;
    let minY = 9999999;
    let maxX = -9999999;
    let maxY = -9999999;
    let visiableNodesSize = 0;
    for (const node of this.getNodes()) {
      if (RGNodesAnalytic.isAllowShowNode(node) && (node.opacity && (node.opacity > 0))) {
        if (node.x < minX) minX = node.x;
        if (node.y < minY) minY = node.y;
        if ((node.x + node.el.offsetWidth) > maxX) maxX = node.x + node.el.offsetWidth;
        if ((node.y + node.el.offsetHeight) > maxY) maxY = node.y + node.el.offsetHeight;
        visiableNodesSize++;
      }
    }
    if (visiableNodesSize === 0) {
      return;
    }
    const _current_zoom = 1; // this.options.canvasZoom / 100;
    const padding_x = 50;// this.options.canvasOffset.x;
    const padding_y = 50;// this.options.canvasOffset.y;
    this.miniViewBox.canvas_start_x = minX - padding_x;
    this.miniViewBox.canvas_start_y = minY - padding_y;
    this.miniViewBox.canvas_end_x = maxX + padding_x;
    this.miniViewBox.canvas_end_y = maxY + padding_y;
    this.miniViewBox.canvas_width = this.miniViewBox.canvas_end_x - this.miniViewBox.canvas_start_x;
    this.miniViewBox.canvas_height = this.miniViewBox.canvas_end_y - this.miniViewBox.canvas_start_y;

    const miniViewBox = this.$miniViewCanvas.parentElement.getBoundingClientRect();
    const canvasWidth = miniViewBox.width;
    const canvasHeight = miniViewBox.height;
    let realWidth = 0;
    let realHeight = 0;
    let scale = _current_zoom;
    if (canvasWidth / this.miniViewBox.canvas_width < canvasHeight / this.miniViewBox.canvas_height) {
      scale = canvasWidth / this.miniViewBox.canvas_width *_current_zoom;
      realWidth = canvasWidth; // 更新 Canvas 元素的宽度
      realHeight = canvasWidth / this.miniViewBox.canvas_width * this.miniViewBox.canvas_height; // 更新 Canvas 元素的高度
    } else {
      scale = canvasHeight / this.miniViewBox.canvas_height * _current_zoom;
      realWidth = canvasHeight / this.miniViewBox.canvas_height * this.miniViewBox.canvas_width; // 更新 Canvas 元素的宽度
      realHeight = canvasHeight; // 更新 Canvas 元素的高度
    }
    this.miniViewBox.miniview_width = canvasWidth;
    this.miniViewBox.miniview_height = canvasHeight;
    // this.$miniViewCanvas.width = realWidth; // 更新 Canvas 元素的宽度
    // this.$miniViewCanvas.height = realHeight;
    // this.$mvCanvasCtx.canvas.width = realWidth; // 更新 Canvas 绘图区域的宽度
    // this.$mvCanvasCtx.canvas.height = realHeight; // 更新 Canvas 绘图区域的高度
    this.$miniViewCanvas.width = canvasWidth; // 更新 Canvas 元素的宽度
    this.$miniViewCanvas.height = canvasHeight;
    this.$mvCanvasCtx.canvas.width = canvasWidth; // 更新 Canvas 绘图区域的宽度
    this.$mvCanvasCtx.canvas.height = canvasHeight; // 更新 Canvas 绘图区域的高度
    const startPaddingY = (canvasHeight - realHeight) / 2;
    const startPaddingX = (canvasWidth - realWidth) / 2;
    this.miniViewBox.canvas_start_x -= (startPaddingX / scale);
    this.miniViewBox.canvas_start_y -= (startPaddingY / scale);
    devLog('updateMiniView', startPaddingX, startPaddingY);
    this.$mvCanvasCtx.scale(scale, scale);

    if (!this.miniviewVisiableHandleMoveing) {
      const graphViewBox = this.getBoundingClientRect();
      const visibleAreaStart = this.getCanvasCoordinateByClientCoordinate({x:0,y:0});
      const visibleAreaEnd = this.getCanvasCoordinateByClientCoordinate({x:graphViewBox.width,y:graphViewBox.height});
      const canvasVisiableWidth = visibleAreaEnd.x - visibleAreaStart.x;
      const canvasVisiableHeight = visibleAreaEnd.y - visibleAreaStart.y;
      this.miniViewBox.visibleAreaStart = visibleAreaStart;
      this.miniViewBox.visibleAreaEnd = visibleAreaEnd;
      this.options.miniViewVisibleHandle.width = scale * canvasVisiableWidth;
      this.options.miniViewVisibleHandle.height = scale * canvasVisiableHeight;
      const visibleAreaOffsetX = visibleAreaStart.x - this.miniViewBox.canvas_start_x;
      const visibleAreaOffsetY = visibleAreaStart.y - this.miniViewBox.canvas_start_y;
      this.options.miniViewVisibleHandle.x = scale * visibleAreaOffsetX;
      this.options.miniViewVisibleHandle.y = scale * visibleAreaOffsetY;
      // console.log('xxxxxxxx', this.options.miniViewVisibleHandle.width, this.options.miniViewVisibleHandle.height);
      // this.miniViewOffset.x = this.options.canvasOffset.x / (this.options.canvasZoom / 100);
      // this.miniViewOffset.y = this.options.canvasOffset.y / (this.options.canvasZoom / 100);
      // this.miniViewOffset.x = -this.miniViewBox.canvas_start_x;
      // this.miniViewOffset.y = -this.miniViewBox.canvas_start_y;
      if (
        this.options.miniViewVisibleHandle.x + this.options.miniViewVisibleHandle.width < 0
        ||
        this.options.miniViewVisibleHandle.y + this.options.miniViewVisibleHandle.height < 0
        ||
        this.options.miniViewVisibleHandle.y > this.miniViewBox.miniview_height
        ||
        this.options.miniViewVisibleHandle.x > this.miniViewBox.miniview_width
      ) {
        this.options.miniViewVisibleHandle.emptyContent = true;
      } else {
        this.options.miniViewVisibleHandle.emptyContent = false;
      }
    }
  }
  protected mvDrawMask() {
    // this.$mvCanvasCtx.fillStyle = 'rgba(0, 0, 0, 0.5)'; // 红色，透明度为0.5
    // // 绘制半透明矩形
    // this.$mvCanvasCtx.fillRect(
    //   0,
    //   0,
    //   this.miniViewBox.canvas_width + 100,
    //   this.miniViewBox.visibleAreaStart.y - this.miniViewBox.canvas_start_y
    // );
    // this.$mvCanvasCtx.fillRect(
    //   0,
    //   this.miniViewBox.visibleAreaStart.y - this.miniViewBox.canvas_start_y,
    //   this.miniViewBox.visibleAreaStart.x - this.miniViewBox.canvas_start_x,
    //   this.miniViewBox.visibleAreaEnd.x - this.miniViewBox.visibleAreaStart.y
    // );
    // this.$mvCanvasCtx.fillRect(
    //   this.miniViewBox.visibleAreaEnd.x - this.miniViewBox.canvas_start_x,
    //   this.miniViewBox.visibleAreaStart.y - this.miniViewBox.canvas_start_y,
    //   this.miniViewBox.canvas_width + 100 - this.miniViewBox.canvas_start_x,
    //   this.miniViewBox.visibleAreaEnd.x - this.miniViewBox.visibleAreaStart.y
    // );
    // this.$mvCanvasCtx.fillRect(
    //   0,
    //   this.miniViewBox.visibleAreaStart.y - this.miniViewBox.canvas_start_y + this.miniViewBox.visibleAreaEnd.x - this.miniViewBox.visibleAreaStart.y,
    //   this.miniViewBox.canvas_width + 100,
    //   this.miniViewBox.visibleAreaStart.y - this.miniViewBox.canvas_start_y
    // );
  }
  protected miniViewBox = {
    visibleAreaStart: {x:0,y:0},
    visibleAreaEnd: {x:0,y:0},
    canvas_start_x:0,
    canvas_start_y:0,
    canvas_end_x:0,
    canvas_end_y:0,
    canvas_width:0,
    canvas_height:0,
    miniview_width: 0,
    miniview_height: 0,
  };
  protected visibleArea = {x:0,y:0};
  protected mvDrawAllNodes() {
    for (const node of this.getNodes()) {
      if (RGNodesAnalytic.isAllowShowNode(node) && (node.opacity && (node.opacity > 0))) {
        this.mvDrawNode(node);
      }
    }
  }
  protected mvDrawNode(node: RGNode) {
    const nodeShape = node.nodeShape !== undefined && node.nodeShape !== null ? node.nodeShape : this.options.defaultNodeShape;
    if (nodeShape === 1) {
      this.mvDrawNode4Rect(node);
    } else {
      this.mvDrawNode4Circle(node);
    }
  }
  protected mvDrawNode4Rect(node: RGNode) {
    const ctx = this.$mvCanvasCtx;
    const nodeWidth = node.el.offsetWidth;
    const nodeHeight = node.el.offsetHeight;
    const x = node.x + this.miniViewBox.canvas_start_x;
    const y = node.y + this.miniViewBox.canvas_start_y;
    // console.log('drawNode', x, y);
    ctx.beginPath();
    ctx.globalAlpha = node.opacity || 1;
    ctx.rect(x, y, nodeWidth, nodeHeight);
    ctx.fillStyle = this.getNodeColor(node); // 设置填充颜色
    ctx.fill(); // 填充圆形
    ctx.globalAlpha = 1;
  }
  protected mvDrawNode4Circle(node: RGNode) {
    const ctx = this.$mvCanvasCtx;
    const nodeWidth = node.el.offsetWidth;
    const nodeHeight = node.el.offsetHeight;
    const x = node.x + nodeWidth / 2 - this.miniViewBox.canvas_start_x;
    const y = node.y + nodeHeight / 2 - this.miniViewBox.canvas_start_y;
    // console.log('drawNode', x, y);
    const radius = nodeWidth / 2;
    ctx.beginPath();
    ctx.globalAlpha = node.opacity || 1;
    // ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.ellipse(x, y, nodeWidth / 2, nodeHeight / 2, 0, 0, 2 * Math.PI);
    ctx.fillStyle = this.getNodeColor(node); // 设置填充颜色
    ctx.fill(); // 填充圆形
    ctx.globalAlpha = 1;
  }
  protected mvDrawAllLines() {
    for (const link of this.getLinks()) {
      if (RGNodesAnalytic.isAllowShowNode(link.fromNode) && RGNodesAnalytic.isAllowShowNode(link.toNode)) {
        for (let lineIndex = 0; lineIndex < link.relations.length; lineIndex++) {
          this.mvDrawLine(link, link.relations[lineIndex], lineIndex);
        }
      }
    }
  }
  protected mvDrawLine(link: RGLink, line: RGLine, lineIndex: number) {
    const ctx = this.$mvCanvasCtx;
    // const startX = link.fromNode.x - this.miniViewBox.canvas_start_x;
    // const startY = link.fromNode.y - this.miniViewBox.canvas_start_y;
    // const endX = link.toNode.x - this.miniViewBox.canvas_start_x;
    // const endY = link.toNode.y - this.miniViewBox.canvas_start_y;
    const pathData = this.createLinePath(link, line, lineIndex);
    ctx.beginPath();

    ctx.globalAlpha = line.opacity || 1;
    // console.log('!!moveTo', startX, startY);
    // console.log('!!lineTo', endX, endY);
    // ctx.moveTo(startX, startY);
    // ctx.lineTo(endX, endY); // 绘制直线到终点坐标
    this.mvDrawSvgPathOnCanvas(ctx, pathData.path);
    ctx.strokeStyle = line.color || this.options.defaultLineColor || 'red'; // 设置填充颜色
    ctx.lineWidth = line.lineWidth || this.options.defaultLineWidth || 1; // 设置线条宽度
    ctx.stroke(); // 绘制三次贝塞尔曲线
    ctx.globalAlpha = 1;
  }
  protected mvDrawSvgPathOnCanvas(ctx, svgPath) {
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

    commands.forEach(command => {
      const parts = command.trim().split(/[ ,]+/);
      const type = parts[0].toUpperCase();
      const isRelative = parts[0] === parts[0].toLowerCase();

      // console.log('command', type, parts.join(','));
      switch (type) {
        case 'M':
          currentX =  this.getPointValue(startX, parts[1], isRelative) - this.miniViewBox.canvas_start_x;
          currentY =  this.getPointValue(startY, parts[2], isRelative) - this.miniViewBox.canvas_start_y;
          startX = currentX;
          startY = currentY;
          if (isDrawing) {
            ctx.closePath();
            isDrawing = false;
          }
          ctx.moveTo(currentX, currentY);
          // console.log('moveTo', currentX, currentY);
          break;
        case 'L':
          currentX =  this.getPointValue(startX, parts[1], isRelative) - this.miniViewBox.canvas_start_x;
          currentY =  this.getPointValue(startY, parts[2], isRelative) - this.miniViewBox.canvas_start_y;
          ctx.lineTo(currentX, currentY);
          // console.log('lineTo', currentX, currentY);
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
          ctx.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, currentX, currentY);
          // console.log('bezierCurveTo', controlX1, controlY1, controlX2, controlY2, currentX, currentY);
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
          ctx.lineTo(currentX, currentY);
          break;
        case 'H':
          currentX = this.getPointValue(startX, parts[1], isRelative);
          startX = currentX;
          ctx.lineTo(currentX, currentY);
          break;
        case 'Z':
          ctx.closePath();
          isDrawing = false;
          break;
        default:
          devLog(`Unsupported command: ${type}`);
      }
    });
  }
  private miniviewVisiableHandleMoveing = false;
  onVisiableViewHandleDragStart(e: RGUserEvent) {
    e.preventDefault();
    e.stopPropagation();
    const baseVisibleHandleX = this.options.miniViewVisibleHandle.x;
    const baseVisibleHandleY = this.options.miniViewVisibleHandle.y;
    const baseCanvasOffsetX = this.options.canvasOffset.x;
    const baseCanvasOffsetY = this.options.canvasOffset.y;
    const baseCanvasWidth = this.miniViewBox.canvas_width;
    const baseCanvasHeight = this.miniViewBox.canvas_height;
    // if (this.options.performanceMode) {
    //   this.miniviewVisiableHandleMoveing = true;
    // }
    const draggingCallback = (x:number, y:number, basePosition:RGPosition, baseEventPosition:RGPosition, e_move:RGUserEvent) => {
      // const new_x = basePosition.x + x;
      // const new_y = basePosition.y + y;
      const offsetPercentX = x / this.miniViewBox.miniview_width;
      const offsetPercentY = y / this.miniViewBox.miniview_height;
      const _current_zoom = this.options.canvasZoom / 100;
      const newCanvasX = baseCanvasWidth * offsetPercentX * _current_zoom;
      const newCanvasY = baseCanvasHeight * offsetPercentY * _current_zoom;
      // console.log('miniViewVisibleHandle:', newCanvasX, newCanvasY);
      this.setCanvasOffset(baseCanvasOffsetX - newCanvasX, baseCanvasOffsetY - newCanvasY);
      this.options.miniViewVisibleHandle.x = baseVisibleHandleX + x;
      this.options.miniViewVisibleHandle.y = baseVisibleHandleY + y;
      this.updateEditingControllerView();
      this.dataUpdated();
    };
    const dragged = (buff_x:number, buff_y:number, e:MouseEvent|TouchEvent) => {
      this.miniviewVisiableHandleMoveing = false;
      this.onCanvasDragEnd(e);
    };
    RGEffectUtils.startDrag(e, this.options.miniViewVisibleHandle, dragged, draggingCallback);
  }
  async resetByVisiableView(e: RGUserEvent) {
    if (!this.options.miniViewVisibleHandle.emptyContent) {
      return;
    }
    await this.setZoom(100);
    await this.moveToCenter();
    await this.zoomToFit();
  }
}

