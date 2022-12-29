import { devLog } from '@/utils/RGCommon';
import { RelationGraphWithZoom } from '@/models/RelationGraphWithZoom';
import SeeksForceLayouter from '@/layouters/SeeksForceLayouter';
export class RelationGraphWithEffect extends RelationGraphWithZoom {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super(...arguments);
  }
  doLayout() {
    if (!this.options.layouter) {
      devLog('没有布局器！');
      return;
    }
    if (!this.graphData.rootNode) {
      devLog('你没有设置，或者无法获取根节点!');
      return;
    }
    devLog('需要布局的节点数量：', this.graphData.nodes.length);
    this.options.layouter.placeNodes(this.graphData.nodes, this.graphData.rootNode, this.graphSetting);
  }
  refresh() {
    this.resetViewSize();
    this.options.layouter.refresh();
    this.playShowEffect();
  }
  resetViewSize() {
    if (!this.options) {
      return;
    }
    devLog('resetViewSize');
    this.options.viewSize.width = this.$dom.getBoundingClientRect().width;
    this.options.viewSize.height = this.$dom.getBoundingClientRect().height;
    this.options.canvasZoom = 100;
    if (this.options.moveToCenterWhenRefresh) {
      this.options.canvasOffset.x = 0;
      this.options.canvasOffset.y = 0;
    } else {
      this.options.canvasOffset.x = this.options.viewNVInfo.width / 2;
      this.options.canvasOffset.y = this.options.viewNVInfo.height / 2;
    }
    this.refreshNVAnalysisInfo();
  }
  dataUpdated() {
    this.options.canvasOffset.x += 1;
    this.options.canvasOffset.y += 1;
    this.options.canvasOffset.x -= 1;
    this.options.canvasOffset.y -= 1;
  }
  refreshNVAnalysisInfo() {
    devLog('[refreshNVAnalysisInfo]');
    if (!this.$dom) {
      console.error('cannot get view size !');
      return;
    }
    // devLog('reanalysis NV info...')
    const result = {
      NMCanvasCenter: { x: 0, y: 0 }
    };
    const _view_info = this.$dom.getBoundingClientRect();
    this.options.viewNVInfo.x = _view_info.left;
    this.options.viewNVInfo.y = _view_info.top;
    this.options.viewNVInfo.width = _view_info.width;
    this.options.viewNVInfo.height = _view_info.height;
    const _NM_canvas_width = this.options.canvasSize.width * (this.options.canvasZoom / 100);
    const _NM_canvas_height = this.options.canvasSize.height * (this.options.canvasZoom / 100);
    result.NMCanvasCenter.x = this.options.canvasOffset.x + (this.options.canvasSize.width / 2);
    result.NMCanvasCenter.y = this.options.canvasOffset.y + (this.options.canvasSize.height / 2);
    this.options.canvasNVInfo.x = result.NMCanvasCenter.x - _NM_canvas_width / 2;
    this.options.canvasNVInfo.y = result.NMCanvasCenter.y - _NM_canvas_height / 2;
    this.options.canvasNVInfo.width = _NM_canvas_width;
    this.options.canvasNVInfo.height = _NM_canvas_height;
    this.options.viewELSize.width = _view_info.width;
    this.options.viewELSize.height = _view_info.height;
    this.options.viewELSize.left = _view_info.left;
    this.options.viewELSize.top = _view_info.top;
  }
  getStuffSize() {
    let _min_x = 9999999;
    let _min_y = 9999999;
    let _max_x = 0;
    let _max_y = 0;
    this.graphData.nodes.forEach(thisNode => {
      if (thisNode.lot.x < _min_x) {
        _min_x = thisNode.lot.x;
      }
      if (thisNode.lot.x > _max_x) {
        _max_x = thisNode.lot.x + thisNode.el.offsetWidth;
      }
      if (thisNode.lot.y < _min_y) {
        _min_y = thisNode.lot.y;
      }
      if (thisNode.lot.y > _max_y) {
        _max_y = thisNode.lot.y + thisNode.el.offsetHeight;
      }
    });
    const _stuff_width = _max_x - _min_x;
    const _stuff_height = _max_y - _min_y;
    return {
      width: _stuff_width,
      height: _stuff_height
    };
  }
  playShowEffect() {
    if (this.graphData.nodes.length === 0) {
      devLog('relation-graph:move to center: data not ready!');
      return;
    }
    if (this.options.moveToCenterWhenRefresh) {
      // devLog('relation-graph:move to center:', [this.options.viewSize.width, this.options.viewSize.height], [_box.width, _box.height]);
      // this.focusRootNode()
      const _final_x = this.options.viewNVInfo.width / 2;
      const _final_y = this.options.viewNVInfo.height / 2;
      this.animateGoto(_final_x, _final_y, 500, () => {
        // this.graphOptions.checkedNodeId = thisNode.id
        // this.refreshNVAnalysisInfo();
        if (this.options.zoomToFitWhenRefresh) {
          this.zoomToFit();
        }
      });
    } else {
      if (this.options.zoomToFitWhenRefresh) {
        this.zoomToFit();
      }
    }
    if (isNaN(this.graphData.rootNode.x)) {
      devLog('rootNode.x is NaN, graph is currently hidden?');
      return;
    }
    console.log(this.options.layoutName);
    if (this.options.layoutName !== 'force') {
      this.placeSingleNode();
    }
  }
  placeSingleNode() {
    let singleNodeSize = 0;
    this.graphData.nodes.forEach(thisNode => {
      if (thisNode.id === this.graphData.rootNode.id) {
        return;
      }
      if ((isNaN(thisNode.x) || thisNode.x === 0) && (isNaN(thisNode.y) || thisNode.y === 0)) {
        thisNode.x = Math.floor(Math.random() * 200) - 100;
        thisNode.y = Math.floor(Math.random() * 200) - 100;
        thisNode.singleNode = true;
        thisNode.lot.placed = true;
        singleNodeSize++;
      }
    });
    if (singleNodeSize > 0) {
      console.log(this.graphData.nodes.map(n => { return { x: n.x, y: n.y, t: n.text }; }));
      const forceLayout = new SeeksForceLayouter({}, {});
      forceLayout.__origin_nodes = this.graphData.nodes;
      forceLayout.justLayoutSingleNode = true;
      forceLayout.byLine = false;
      forceLayout.maxLayoutTimes = 100;
      forceLayout.autoLayout();
    }
  }
  zoomToFit() {
    const stuffSize = this.getStuffSize();
    const zoomPercentX = this.options.viewSize.width / stuffSize.width;
    const zoomPercentY = this.options.viewSize.height / stuffSize.height;
    const zoomPercent = Math.min(zoomPercentX, zoomPercentY, 1);
    devLog('animateToZoom:', { stuffSize, zoomPercent, zoomPercentX, zoomPercentY, viewSize: this.options.viewSize });
    this.animateToZoom(zoomPercent * 100, 300);
  }
  animateGoto(x, y, time, callback) {
    const _distance_x = x - this.options.canvasOffset.x;
    const _distance_y = y - this.options.canvasOffset.y;
    const _allTime = time;
    const _allStepNum = 5;
    const _speed_x = parseInt(_distance_x / _allStepNum);
    const _speed_y = parseInt(_distance_y / _allStepNum);
    const _perDelay = _allTime / _allStepNum;
    this.animateStepAction(0, _perDelay, _allStepNum, () => {
      this.options.canvasOffset.x += _speed_x;
      this.options.canvasOffset.y += _speed_y;
    }, () => {
      // devLog('分解完毕....')
      if (callback) callback();
    });
  }
  animateToZoom(finalZoom, time, callback) {
    const _zoom_distance = finalZoom - this.options.canvasZoom;
    const _allTime = time;
    const _allStepNum = 5;
    const _speed = parseInt(_zoom_distance / _allStepNum);
    const _perDelay = _allTime / _allStepNum;
    this.animateStepAction(0, _perDelay, _allStepNum, () => {
      this.zoom(_speed);
    }, () => {
      // devLog('分解完毕....')
      if (callback) callback();
    });
  }
  animateStepAction(stepIndex, delay, allStepNum, stepCallback, finalCallback) {
    // devLog(Date.now() + '步骤[' + stepIndex + ']')
    if (stepIndex < allStepNum) {
      stepCallback(stepIndex, allStepNum);
      setTimeout(() => {
        this.animateStepAction(stepIndex + 1, delay, allStepNum, stepCallback, finalCallback);
      }, delay);
    } else {
      finalCallback();
    }
  }
  startAutoLayout() {
    this.options.autoLayouting = !this.options.autoLayouting;
    if (this.options.autoLayouting) {
      if (!this.options.layouter.autoLayout) {
        console.log('当前布局不支持自动布局！');
      } else {
        this.options.layouter.autoLayout(true);
      }
    } else {
      if (!this.options.layouter.stop) {
        console.log('当前布局不支持自动布局stop！');
      } else {
        this.options.layouter.stop();
      }
    }
  }
  stopAutoLayout() {
    this.options.autoLayouting = false;
    if (!this.options.layouter.stop) {
      console.log('当前布局不支持自动布局stop！');
    } else {
      this.options.layouter.stop();
    }
  }
}
