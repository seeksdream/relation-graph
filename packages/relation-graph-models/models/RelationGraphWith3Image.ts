import html2canvas from 'html2canvas';
import {devLog, sleep} from '../utils/RGCommon';
import {RGEventNames, RGListeners, RGOptions} from '../types';
import {RelationGraphWith2Data} from './RelationGraphWith2Data';

export class RelationGraphWith3Image extends RelationGraphWith2Data {
  constructor(options: RGOptions, listeners: RGListeners) {
    super(options, listeners);
  }
  private $watermarkDom: HTMLDivElement|null = null;
  private $watermarkPosition = 'br';
  private $backgroundDom: HTMLDivElement|null = null;
  setWatermarkDom(watermarkDom: HTMLDivElement|null, forImage = true, forDisplay = false, position = 'br') {
    if (forImage) this.$watermarkDom = watermarkDom;
    this.$watermarkPosition = position;
  }
  setBackgroundDom(backgroundDom: HTMLDivElement|null, forImage = true, forDisplay = true) {
    if (forImage) this.$backgroundDom = backgroundDom;
  }
  dataURLToBlob(dataurl:string) { // ie 图片转格式
    try {
      const arr = dataurl.split(',');
      const arrItem1 = arr[0];
      const mime = arrItem1 && arrItem1.match(/:(.*?);/)![1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    } catch (e) {
      console.error('[relation-graph]Create and download image error:dataURLToBlob:dataurl', dataurl);
      console.error('[relation-graph]error object', e);
    }
  }
  async createGraphCanvas(format = 'png') {
    const orign_zoom = this.options.canvasZoom;
    const orign_width = this.$canvasDom.clientWidth; // 获取dom 宽度
    const orign_height = this.$canvasDom.clientHeight; // 获取dom 高度
    const forceLayouting = this.options.autoLayouting;
    if (forceLayouting) {
      this.stopAutoLayout();
    }
    this.loading('Generating...');
    this.options.snapshotting = true;
    const main = await this.createGraphMainCanvas(format);
    const background = this.$backgroundDom ? await this.createGraphBackgroundCanvas(format) : null;
    const watermark = this.$watermarkDom ? await this.createGraphWatermarkCanvas(format) : null;
    const finalCanvas = this.mergeCanvas(background, main, watermark);
    this.options.canvasSize.width = orign_width;
    this.options.canvasSize.height = orign_height;
    this.options.snapshotting = false;
    this._zoomEnd(100, orign_zoom);
    this.updateVisbleViewNodes();
    this.updateElementLines();
    if (forceLayouting) {
      this.startAutoLayout();
    }
    this.clearLoading();
    this.dataUpdated();
    return finalCanvas;
  }
  private mergeCanvas(canvasBg: HTMLCanvasElement|null, canvasMain: HTMLCanvasElement, canvasWatermark: HTMLCanvasElement|null) {
    const pixelRatio = window.devicePixelRatio; // 定义任意放大倍数 支持小数
    const canvas = document.createElement('canvas');
    const canvasElWidth = this.options.canvasSize.width;
    const canvasElHeight = this.options.canvasSize.height;
    canvas.width = canvasElWidth * pixelRatio; // 定义canvas 宽度 * 缩放
    canvas.height = canvasElHeight * pixelRatio; // 定义canvas高度 *缩放
    canvas.style.width = `${canvasElWidth}px`;
    canvas.style.height = `${canvasElHeight}px`;
    const ctx = canvas.getContext('2d')!;
    canvas.getContext('2d')!.scale( 1, 1); // 获取context,设置scale
    if (canvasBg) {
      ctx.drawImage(canvasBg, 0, 0);
    } else {
      ctx.fillStyle = (!this.options.backgroundColor || this.options.backgroundColor === 'transparent') ? '#ffffff' : this.options.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(canvasMain, 0, 0);
    if (canvasWatermark) {
      const box = this.$watermarkDom!.getBoundingClientRect();
      const watermarkElWidth = box.width; // 获取dom 宽度
      const watermarkElHeight = box.height; // 获取dom 宽度
      // console.log('this.$watermarkPosition:', this.$watermarkPosition, watermarkElWidth, watermarkElHeight);
      let x = canvasElWidth - watermarkElWidth - 20;
      let y = canvasElHeight - watermarkElHeight - 20;
      if (this.$watermarkPosition === 'bl') {
        x = 20;
        y = canvasElHeight - watermarkElHeight - 20;
      } else if (this.$watermarkPosition === 'tl') {
        x = 20;
        y = 20;
      } else if (this.$watermarkPosition === 'tr') {
        x = canvasElWidth - watermarkElWidth - 20;
        y = 20;
      }
      ctx.drawImage(canvasWatermark, x * pixelRatio, y * pixelRatio);
    }
    return canvas;
  }
  private async createGraphBackgroundCanvas(format = 'png') {
    const pixelRatio = window.devicePixelRatio; // 定义任意放大倍数 支持小数
    const canvas = document.createElement('canvas'); // 创建一个canvas节点
    const canvasElWidth = this.options.canvasSize.width;
    const canvasElHeight = this.options.canvasSize.height;
    canvas.width = canvasElWidth * pixelRatio; // 定义canvas 宽度 * 缩放
    canvas.height = canvasElHeight * pixelRatio; // 定义canvas高度 *缩放
    canvas.style.width = `${canvasElWidth}px`;
    canvas.style.height = `${canvasElHeight}px`;
    canvas.getContext('2d')!.scale(pixelRatio, pixelRatio); // 获取context,设置scale
    const exportDom = this.$backgroundDom!;
    exportDom.style.width = this.options.canvasSize.width + 'px';
    exportDom.style.height = this.options.canvasSize.height + 'px';
    const opts = {
      backgroundColor: '#ffffff',
      scale: 1, // 添加的scale 参数
      canvas, // 自定义 canvas
      logging: true, // 日志开关，便于查看html2canvas的内部执行流程
      // windowWidth: _image_width,
      // windowHeight: _image_height,
      width: this.options.canvasSize.width, // dom 原始宽度
      height: this.options.canvasSize.height,
      // x: relationGraphPosition.left,
      // y: relationGraphPosition.top,
      useCORS: true // 【重要】开启跨域配置
    };
    const resultCanvas = await this.createImage(exportDom, opts, format, '');
    exportDom.style.width = '';
    exportDom.style.height = '';
    return resultCanvas;
  }
  private async createGraphWatermarkCanvas(format = 'png') {
    const canvasElWidth = this.$canvasDom.clientWidth; // 获取dom 宽度
    const canvasElHeight = this.$canvasDom.clientHeight; // 获取dom 高度
    const pixelRatio = window.devicePixelRatio; // 定义任意放大倍数 支持小数
    const canvas = document.createElement('canvas'); // 创建一个canvas节点
    canvas.width = canvasElWidth * pixelRatio; // 定义canvas 宽度 * 缩放
    canvas.height = canvasElHeight * pixelRatio; // 定义canvas高度 *缩放
    canvas.style.width = `${canvasElWidth}px`;
    canvas.style.height = `${canvasElHeight}px`;
    canvas.getContext('2d')!.scale(pixelRatio, pixelRatio); // 获取context,设置scale
    const exportDom = this.$watermarkDom!;
    const opts = {
      backgroundColor: 'transparent',
      scale: 1, // 添加的scale 参数
      canvas, // 自定义 canvas
      logging: true, // 日志开关，便于查看html2canvas的内部执行流程
      // windowWidth: _image_width,
      // windowHeight: _image_height,
      width: canvasElWidth, // dom 原始宽度
      height: canvasElHeight,
      // x: relationGraphPosition.left,
      // y: relationGraphPosition.top,
      useCORS: true // 【重要】开启跨域配置
    };
    const resultCanvas = await this.createImage(exportDom, opts, format, '');
    return resultCanvas;
  }
  private async createGraphMainCanvas(format = 'png') {
    const orign_zoom = this.options.canvasZoom;
    const _origin_offset_x = this.options.canvasOffset.x;
    const _origin_offset_y = this.options.canvasOffset.y;
    this.options.checkedNodeId = '';
    this.options.canvasZoom = 100;
    this._zoomEnd(orign_zoom, this.options.canvasZoom);
    this.updateVisbleViewNodes(true);
    await sleep(500);
    const exportDom = this.$canvasDom;
    let _min_x = 999999;
    let _min_y = 999999;
    let _max_x = -999999;
    let _max_y = -999999;
    this.graphData.nodes.forEach(thisNode => {
      if (thisNode.x < _min_x) {
        _min_x = thisNode.x;
      }
      if (thisNode.x > _max_x) {
        _max_x = thisNode.x + thisNode.el.offsetWidth;
      }
      if (thisNode.y < _min_y) {
        _min_y = thisNode.y;
      }
      if (thisNode.y > _max_y) {
        _max_y = thisNode.y + thisNode.el.offsetHeight;
      }
    });
    const canvasSlotInfoMap = new WeakMap<Element, {offsetX:number,offsetY:number}>();
    const canvasSlotList = this.$canvasDom.querySelectorAll('.rel-canvas-slot');
    for (const canvasSlot of canvasSlotList) {
      // console.log('canvasSlot:', canvasSlot);
      let sub_min_x = 999999;
      let sub_min_y = 999999;
      let sub_max_x = -999999;
      let sub_max_y = -999999;
      for (const item of canvasSlot.children) {
        const itemEl = item as HTMLDivElement;
        const x = itemEl.offsetLeft;
        const y = itemEl.offsetTop;
        // console.log('canvasSlot:item', x, y, itemEl.offsetWidth, itemEl.offsetHeight, itemEl);
        if (x < sub_min_x) sub_min_x = x;
        if (x > sub_max_x) sub_max_x = x + itemEl.offsetWidth;
        if (y < sub_min_y) sub_min_y = y;
        if (y > sub_max_y) sub_max_y = y + itemEl.offsetHeight;
      }
      if (sub_min_x < _min_x) _min_x = sub_min_x;
      if (sub_min_y < _min_y) _min_y = sub_min_y;
      if (sub_max_x > _max_x) _max_x = sub_max_x;
      if (sub_max_y > _max_y) _max_y = sub_max_y;
      if (sub_min_x !== 999999) canvasSlotInfoMap.set(canvasSlot, {
        offsetX: sub_min_x,
        offsetY: sub_min_y
      });
    }
    const _padding = 200;
    _min_x = _min_x - _padding;
    _min_y = _min_y - _padding;
    _max_x = _max_x + _padding;
    _max_y = _max_y + _padding;
    const nodeOffsetX = _min_x;
    const nodeOffsetY = _min_y;
    this.graphData.nodes.forEach(thisNode => {
      thisNode.x = thisNode.x - nodeOffsetX;
      thisNode.y = thisNode.y - nodeOffsetY;
    });
    // console.log('All nodeOffsetY:', nodeOffsetX, nodeOffsetY);
    for (const canvasSlot of canvasSlotList) {
      // console.log('canvasSlot:', canvasSlot);
      const canvasSlotDiv = canvasSlot as HTMLDivElement;
      // const canvasSlotInfo = canvasSlotInfoMap.get(canvasSlot)!;
      canvasSlotDiv.style.marginLeft = (-nodeOffsetX) + 'px';
      canvasSlotDiv.style.marginTop = (-nodeOffsetY) + 'px';
      // console.log('item:new-x-y:', canvasSlotInfo.offsetX, canvasSlotInfo.offsetY);
    }
    this.updateElementLines();
    const elementLineSvgList = this.$canvasDom.querySelectorAll('.rel-lines-svg-el-lines');
    elementLineSvgList.forEach(canvasSlot => {
      const svgEl = canvasSlot as SVGElement;
      svgEl.style.width = '4000px';
      svgEl.style.height = '4000px';
    });
    this.options.canvasOffset.x = 0;
    this.options.canvasOffset.y = 0;
    // console.log('offset:', { nodeOffsetX, nodeOffsetY, _min_x, _min_y, _max_x, _max_y });

    const _image_width = _max_x - _min_x;
    const _image_height = _max_y - _min_y;
    const pixelRatio = window.devicePixelRatio; // 定义任意放大倍数 支持小数
    this.options.canvasSize.width = _image_width;
    this.options.canvasSize.height = _image_height;
    devLog('export image:', { _image_width, _image_height, _min_x, _min_y, _max_x, _max_y, devicePixelRatio: window.devicePixelRatio });
    window.scrollTo(0, 0);
    // this.moveToCenter();
    // this.zoomToFit();
    // return;
    const canvas = document.createElement('canvas'); // 创建一个canvas节点
    const canvasElWidth = _image_width;
    const canvasElHeight = _image_height;
    canvas.width = canvasElWidth * pixelRatio; // 定义canvas 宽度 * 缩放
    canvas.height = canvasElHeight * pixelRatio; // 定义canvas高度 *缩放
    canvas.style.width = `${canvasElWidth}px`;
    canvas.style.height = `${canvasElHeight}px`;
    canvas.getContext('2d')!.scale(pixelRatio, pixelRatio); // 获取context,设置scale
    // canvas.style.backgroundColor = 'red';
    const opts = {
      backgroundColor: 'transparent',
      scale: 1, // 添加的scale 参数
      canvas, // 自定义 canvas
      logging: true, // 日志开关，便于查看html2canvas的内部执行流程
      // windowWidth: _image_width,
      // windowHeight: _image_height,
      width: this.options.canvasSize.width, // dom 原始宽度
      height: this.options.canvasSize.height,
      // x: relationGraphPosition.left,
      // y: relationGraphPosition.top,
      useCORS: true // 【重要】开启跨域配置
    };
    // if (!backgroundColor || backgroundColor === 'transparent') {
    //   backgroundColor = '#ffffff';
    // }
    // exportDom.style.backgroundColor = 'transparent';
    // devLog('canvas.style.backgroundColor:', canvas.style.backgroundColor);
    this.dataUpdated();
    await sleep(1000);
    const resultCanvas = await this.createImage(exportDom, opts, format, '');
    canvasSlotList.forEach(canvasSlot => {
      const canvasSlotDiv = canvasSlot as HTMLDivElement;
      canvasSlotDiv.style.marginLeft = '0px';
      canvasSlotDiv.style.marginTop = '0px';
    });
    this.graphData.nodes.forEach(thisNode => {
      thisNode.x = thisNode.x + nodeOffsetX;
      thisNode.y = thisNode.y + nodeOffsetY;
    });
    elementLineSvgList.forEach(canvasSlot => {
      const svgEl = canvasSlot as SVGElement;
      svgEl.style.width = '1px';
      svgEl.style.height = '1px';
    });
    this.options.canvasOffset.x = _origin_offset_x;
    this.options.canvasOffset.y = _origin_offset_y;
    this.options.canvasZoom = orign_zoom;
    return resultCanvas;
  }
  async createImage(
    exportDom:HTMLDivElement,
    opts:any,
    format:string,
    fileName:string
  ) {
    devLog('createImage:', opts);
    const canvas = await html2canvas(exportDom, opts);
    return canvas;
  }
  async getImageBase64(format = 'png') {
    const canvas = await this.createGraphCanvas(format);
    const dom = document.body.appendChild(canvas);
    dom.style.display = 'none';
    const base64 = dom.toDataURL(`image/${format}`);
    document.body.removeChild(dom);
    return base64;
  }
  async downloadAsImage(format = 'png', fileName?:string) {
    const contineToDownload = this.emitEvent(RGEventNames.onImageDownload, this.$canvasDom, format);
    if (contineToDownload === false) {
      return;
    }
    if (this.graphData.nodes.length === 0) {
      throw new Error('No nodes, no content to export!');
    }
    if (!fileName) fileName = this.options.downloadImageFileName;
    if (!fileName) fileName = `relation-graph-${(Math.random() * 100000).toFixed(0)}`;
    const canvas = await this.createGraphCanvas(format);
    devLog('downloadImageAsFile:', format, fileName);
    const stopFlag = this.emitEvent(RGEventNames.onImageDownload, this.$canvasDom, format);
    if (stopFlag !== false) {
      await this.downloadImageAsFile(canvas, format, fileName);
    }
  }
  async downloadImageAsFile(canvas:HTMLCanvasElement, format:string, fileName:string) {
    const dom = document.body.appendChild(canvas);
    // devLog('canvas:', fileName, dom)
    dom.style.display = 'none';
    const blob = this.dataURLToBlob(dom.toDataURL(`image/${format}`));
    document.body.removeChild(dom);
    const a = document.createElement('a');
    a.style.display = 'none';
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (window.navigator.msSaveOrOpenBlob) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.navigator.msSaveOrOpenBlob(blob, `${fileName}.${format}`);
      } else {
        a.setAttribute('href', URL.createObjectURL(blob));
        a.setAttribute('download', `${fileName}.${format}`);
        document.body.appendChild(a);
        // devLog('click to download:', opts)
        a.click();
        devLog('click ok!');
        URL.revokeObjectURL(await blob.text());
        devLog('revokeObjectURL ok!');
        document.body.removeChild(a);
        devLog('removeChild ok!');
      }
    } catch (e) {
      devLog('[relation-graph]Create and download image error:', e);
    }
  }
}
