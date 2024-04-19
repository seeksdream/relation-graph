import { RelationGraphBase } from './RelationGraphBase';
import {RGLine, RGLink, RGListeners, RGNode, RGOptions} from '../types';
import {RelationGraphWith8Update} from "./RelationGraphWith8Update";
import {devLog} from "../utils/RGCommon";
import RGNodesAnalytic from "../utils/RGNodesAnalytic";
export class RelationGraphWith9EasyView extends RelationGraphWith8Update {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  $easyViewCanvas:HTMLCanvasElement;
  $canvasCtx:CanvasRenderingContext2D;
  constructor(options: RGOptions, listeners: RGListeners) {
    super(options, listeners);
  }
  setEasyViewCanvas(canvas:HTMLCanvasElement) {
    this.$easyViewCanvas = canvas;
    this.$canvasCtx = this.$easyViewCanvas.getContext('2d');
    // setInterval(() => {
    //   this.updateEasyView();
    // }, 2000);
  }
  startUpdateTask() {
    this.updateEasyView();
    requestAnimationFrame(this.startUpdateTask.bind(this));
  }
  updateEasyView() {
    // devLog('updateEasyView:', this.options.canvasZoom);
    if (!this.options.performanceMode) {
      return;
    }
    if (!this.options.showEasyView) {
      return;
    }
    // clearTimeout(this.easyViewUpdateTimer);
    // this.easyViewUpdateTimer = setTimeout(() => {
    //   this._updateEasyView();
    // }, 50);
    // this._updateEasyView();
    requestAnimationFrame(this._updateEasyView.bind(this));
  }
  easyViewUpdating = false;
  private easyViewUpdateHasNext = false;
  private easyViewUpdateTimer;
  private _updateEasyView() {
    // if (this.easyViewUpdating) {
    //   this.easyViewUpdateHasNext = true;
    //   return;
    // }
    try {
      this.easyViewUpdating = true;
      this.dosomethingBeforeDraw();
      this.drawAllNodes();
      this.drawAllLines();
    } catch (e) {
      console.error(e);
    }
    this.easyViewUpdating = false;
    if (this.easyViewUpdateHasNext) {
      this.easyViewUpdateHasNext = false;
      this._updateEasyView();
    }
  }
  private dosomethingBeforeDraw() {
    const canvasWidth = this.$easyViewCanvas.getBoundingClientRect().width;
    const canvasHeight = this.$easyViewCanvas.getBoundingClientRect().height;
    this.$easyViewCanvas.width = canvasWidth; // 更新 Canvas 元素的宽度
    this.$easyViewCanvas.height = canvasHeight; // 更新 Canvas 元素的高度
    this.$canvasCtx.canvas.width = canvasWidth; // 更新 Canvas 绘图区域的宽度
    this.$canvasCtx.canvas.height = canvasHeight; // 更新 Canvas 绘图区域的高度
    devLog('updateEasyView', canvasWidth, canvasHeight);
    this.$canvasCtx.scale(this.options.canvasZoom / 100, this.options.canvasZoom / 100);
    this.easyViewOffset.x = this.options.canvasOffset.x / (this.options.canvasZoom / 100);
    this.easyViewOffset.y = this.options.canvasOffset.y / (this.options.canvasZoom / 100);
  }
  easyViewOffset = {x:0,y:0};
  private drawAllNodes() {
    for (const node of this.getNodes()) {
      if (RGNodesAnalytic.isAllowShowNode(node) && (node.opacity && (node.opacity > 0))) {
        this.drawNode(node);
      }
    }
  }
  private drawNode(node: RGNode) {
    const nodeShape = node.nodeShape !== undefined && node.nodeShape !== null ? node.nodeShape : this.options.defaultNodeShape;
    if (nodeShape === 1) {
      this.drawNode4Rect(node);
    } else {
      this.drawNode4Circle(node);
    }
  }
  private getNodeColor(node: RGNode) {
    const color = node.color || this.options.defaultNodeColor || 'red';
    if (color === 'transparent') {
      return 'rgba(204,204,204,0.55)';
    }
    return color;
  }
  private drawNode4Rect(node: RGNode) {
    const ctx = this.$canvasCtx;
    const nodeWidth = node.el.offsetWidth - 16;
    const nodeHeight = node.el.offsetHeight - 16;
    const x = this.easyViewOffset.x + node.x + 8;
    const y = this.easyViewOffset.y + node.y + 8;
    // console.log('drawNode', x, y);
    ctx.beginPath();
    ctx.globalAlpha = node.opacity || 1;
    ctx.rect(x, y, nodeWidth, nodeHeight);
    ctx.fillStyle = this.getNodeColor(node); // 设置填充颜色
    ctx.fill(); // 填充圆形
    ctx.globalAlpha = 1;
  }
  private drawNode4Circle(node: RGNode) {
    const ctx = this.$canvasCtx;
    const nodeWidth = node.el.offsetWidth - 16;
    const nodeHeight = node.el.offsetHeight - 16;
    const x = this.easyViewOffset.x + node.x + nodeWidth / 2 + 8;
    const y = this.easyViewOffset.y + node.y + nodeHeight / 2 + 8;
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
  private drawAllLines() {
    for (const link of this.getLinks()) {
      if (RGNodesAnalytic.isAllowShowNode(link.fromNode) && RGNodesAnalytic.isAllowShowNode(link.toNode)) {
        for (let lineIndex = 0; lineIndex < link.relations.length; lineIndex++) {
          this.drawLine(link, link.relations[lineIndex], lineIndex);
        }
      }
    }
  }
  private drawLine(link: RGLink, line: RGLine, lineIndex: number) {
    const ctx = this.$canvasCtx;
    const startX = this.easyViewOffset.x + link.fromNode.x;
    const startY = this.easyViewOffset.y + link.fromNode.y;
    const endX = this.easyViewOffset.x + link.toNode.x;
    const endY = this.easyViewOffset.y + link.toNode.y;
    const pathData = this.createLinePath(link, line, lineIndex);
    ctx.beginPath();

    ctx.globalAlpha = line.opacity || 1;
    // console.log('!!moveTo', startX, startY);
    // console.log('!!lineTo', endX, endY);
    // ctx.moveTo(startX, startY);
    // ctx.lineTo(endX, endY); // 绘制直线到终点坐标
    this.drawSvgPathOnCanvas(ctx, pathData.path);
    ctx.strokeStyle = line.color || this.options.defaultLineColor || 'red'; // 设置填充颜色
    ctx.lineWidth = line.lineWidth || this.options.defaultLineWidth || 1; // 设置线条宽度
    ctx.stroke(); // 绘制三次贝塞尔曲线
    ctx.globalAlpha = 1;
  }
  private getPointValue(currentX:number, xOrBuffX:string, isRelative) {
    return isRelative ? (currentX + parseFloat(xOrBuffX)) : parseFloat(xOrBuffX);
  }
  private drawSvgPathOnCanvas(ctx, svgPath) {
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
          currentX =  this.getPointValue(startX, parts[1], isRelative) + this.easyViewOffset.x;
          currentY =  this.getPointValue(startY, parts[2], isRelative) + this.easyViewOffset.y;
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
          currentX =  this.getPointValue(startX, parts[1], isRelative) + this.easyViewOffset.x;
          currentY =  this.getPointValue(startY, parts[2], isRelative) + this.easyViewOffset.y;
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
      // if (!isDrawing && type !== 'Z') {
      //   ctx.beginPath();
      //   isDrawing = true;
      // }
    });
    //
    // if (isDrawing) {
    //   ctx.closePath();
    // }
  }
}

