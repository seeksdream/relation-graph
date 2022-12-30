import { devLog } from '@/utils/RGCommon';
import html2canvas from 'html2canvas';
import { RelationGraphWithEvent } from '@/models/RelationGraphWithEvent';
export class RelationGraphWithImage extends RelationGraphWithEvent {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super(...arguments);
  }
  dataURLToBlob(dataurl) { // ie 图片转格式
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
  downloadAsImage(format) {
    if (this.listeners.onImageDownload) {
      const contineToDownload = this.listeners.onImageDownload(this.$canvasDom);
      if (contineToDownload === false) {
        return;
      }
    }
    // devLog('window.navigator.msSaveOrOpenBlob:', window.navigator.msSaveOrOpenBlob)
    // devLog('window.navigator.msSaveBlob：', window.navigator.msSaveBlob)
    // if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    //   this.$message('无法生成并下载图片，请使用非IE浏览器!')
    //   return
    // }
    if (this.graphData.nodes.length === 0) {
      throw Error('没有节点，没有内容需要导出！');
    }
    if (!format)format = 'png';
    this.options.checkedNodeId = '';
    this.options.canvasZoom = 100;
    const exportDom = this.$canvasDom;
    const orign_width = exportDom.clientWidth; // 获取dom 宽度
    const orign_height = exportDom.clientHeight; // 获取dom 高度
    let _min_x = 999999;
    let _min_y = 999999;
    let _max_x = 0;
    let _max_y = 0;
    const _padding = 100;
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
    this.graphData.nodes.forEach(thisNode => {
      thisNode.x = thisNode.x - _min_x + _padding;
      thisNode.y = thisNode.y - _min_y + _padding;
    });
    const _origin_offset_x = this.options.canvasOffset.x + _min_x - _padding;
    const _origin_offset_y = this.options.canvasOffset.y + _min_y - _padding;
    this.options.canvasOffset.x = _padding * -1;
    this.options.canvasOffset.y = _padding * -1;
    devLog('offset:', { _origin_offset_x, _origin_offset_y, _min_x, _min_y, _max_x, _max_y });

    const _image_width = _max_x - _min_x + 200 + _padding * 2;
    const _image_height = _max_y - _min_y + 100 + _padding * 2;
    const pixelRatio = window.devicePixelRatio; // 定义任意放大倍数 支持小数
    this.options.canvasSize.width = _image_width * pixelRatio;
    this.options.canvasSize.height = _image_height * pixelRatio;

    const relationGraphPosition = {
      left: this.$dom.offsetLeft - exportDom.getBoundingClientRect().left,
      top: this.$dom.offsetTop - exportDom.getBoundingClientRect().top,
      canvas_offsetLeft: exportDom.offsetLeft,
      canvas_offsetTop: exportDom.offsetTop,
      canvas_left: exportDom.getBoundingClientRect().left,
      canvas_top: exportDom.getBoundingClientRect().top
    };
    // exportDom.style.position ='absolute'
    // exportDom.style.left ='0px'
    // exportDom.style.top ='0px'
    // exportDom.style.zIndex ='999'
    window.scrollTo(0, 0);
    devLog('export image:', { relationGraphPosition, orign_width, orign_height, _image_width, _image_height, _min_x, _min_y, _max_x, _max_y, devicePixelRatio: window.devicePixelRatio });
    const fileName = 'SeeksRelationGraph-' + (Math.random() * 100000).toFixed(0);
    const canvas = document.createElement('canvas'); // 创建一个canvas节点
    canvas.width = _image_width * pixelRatio; // 定义canvas 宽度 * 缩放
    canvas.height = _image_height * pixelRatio; // 定义canvas高度 *缩放
    canvas.style.width = _image_width * pixelRatio + 'px';
    canvas.style.height = _image_height * pixelRatio + 'px';
    canvas.getContext('2d').scale(1, 1); // 获取context,设置scale
    const opts = {
      backgroundColor: null,
      scale: pixelRatio, // 添加的scale 参数
      canvas: canvas, // 自定义 canvas
      logging: true, // 日志开关，便于查看html2canvas的内部执行流程
      // windowWidth: _image_width,
      // windowHeight: _image_height,
      width: _image_width, // dom 原始宽度
      height: _image_height,
      // x: relationGraphPosition.left,
      // y: relationGraphPosition.top,
      useCORS: true // 【重要】开启跨域配置
    };
    devLog('html2canvas:', opts);
    html2canvas(exportDom, opts).then(canvas => {
      const dom = document.body.appendChild(canvas);
      // devLog('canvas:', fileName, dom)
      dom.style.display = 'none';
      const blob = this.dataURLToBlob(dom.toDataURL('image/' + format));
      document.body.removeChild(dom);
      const a = document.createElement('a');
      a.style.display = 'none';
      try {
        if (window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob, fileName + '.' + format);
          // devLog('this is IE');
          // var URL=window.URL;
          // var BlobBuilder = window.MSBlobBuilder;
          // navigator.saveBlob=navigator.msSaveBlob;
          // var imgBlob = canvas.msToBlob();
          // if (BlobBuilder && navigator.saveBlob) {
          //   var showSave =  function (data, name, mimetype) {
          //     var builder = new BlobBuilder();
          //     builder.append(data);
          //     var blob = builder.getBlob(mimetype||"application/octet-stream");
          //     if (!name)
          //       name = "Download.bin";
          //     navigator.saveBlob(blob, name);
          //   };
          //   showSave(imgBlob, 'barchart.png',"image/png");
          // }
        } else {
          a.setAttribute('href', URL.createObjectURL(blob));
          a.setAttribute('download', fileName + '.' + format);
          document.body.appendChild(a);
          // devLog('click to download:', opts)
          a.click();
          devLog('click ok!');
          URL.revokeObjectURL(blob);
          devLog('revokeObjectURL ok!');
          document.body.removeChild(a);
          devLog('removeChild ok!');
        }
        this.options.canvasSize.width = orign_width;
        this.options.canvasSize.height = orign_height;
        this.options.canvasOffset.x = _origin_offset_x;
        this.options.canvasOffset.y = _origin_offset_y;
      } catch (e) {
        devLog('[SEEKS Graph]Create and download image error:', e);
      }
    });
  }
}
