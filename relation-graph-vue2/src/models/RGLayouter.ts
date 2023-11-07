import SeeksBidirectionalTreeLayouter from '../layouters/SeeksBidirectionalTreeLayouter';
import SeeksCenterLayouter from '../layouters/SeeksCenterLayouter';
import SeeksCircleLayouter from '../layouters/SeeksCircleLayouter';
import SeeksForceLayouter from '../layouters/SeeksForceLayouter';
import SeeksFixedLayouter from '../layouters/SeeksFixedLayouter';
import { devLog } from '../utils/RGCommon';
import { RGCenterLayoutOptions, RGLayouter, RGLayoutOptions, RGOptionsFull, RGTreeLayoutOptions } from '../types';

export const createLayout = (layoutOptions:RGLayoutOptions, _options:RGOptionsFull):RGLayouter => {
  // _graphSetting.canvasZoom = 100;
  appendDefaultOptions4Layout(layoutOptions);
  let layouter:RGLayouter|null = null;
  if (layoutOptions.layoutName === 'tree') {
    layouter = new SeeksBidirectionalTreeLayouter(layoutOptions, _options);
  } else if (layoutOptions.layoutName === 'center') {
    layouter = new SeeksCenterLayouter(layoutOptions, _options);
  } else if (layoutOptions.layoutName === 'circle') {
    layouter = new SeeksCircleLayouter(layoutOptions, _options);
  } else if (layoutOptions.layoutName === 'force') {
    layouter = new SeeksForceLayouter(layoutOptions, _options);
  } else if (layoutOptions.layoutName === 'fixed') {
    layouter = new SeeksFixedLayouter(layoutOptions, _options);
  }
  if (!layouter) {
    throw new Error('unknown layout: ' + layoutOptions.layoutName);
  }
  _options.isNeedShowAutoLayoutButton = layoutOptions.allowAutoLayoutIfSupport !== false && layouter.autoLayout !== undefined;
  return layouter;
};

export const appendDefaultOptions4Layout = (layoutOptions:RGLayoutOptions) => {
  if (typeof layoutOptions.centerOffset_x === 'string') {
    throw new Error('centerOffset_x should be a number!');
  }
  if (typeof layoutOptions.centerOffset_y === 'string') {
    throw new Error('centerOffset_x should be a number!');
  }
  if (layoutOptions.layoutName === 'center') {
    const thisLayout = layoutOptions as RGCenterLayoutOptions;
    if (thisLayout.layoutDirection === undefined) thisLayout.layoutDirection = 'h';
    if (thisLayout.centerOffset_x === undefined) thisLayout.centerOffset_x = 0;
    if (thisLayout.centerOffset_y === undefined) thisLayout.centerOffset_y = 0;
    thisLayout.layoutDirection = undefined;
  } else if (layoutOptions.layoutName === 'tree') {
    const thisLayout = layoutOptions as RGTreeLayoutOptions;
    if (thisLayout.layoutDirection === undefined) thisLayout.layoutDirection = 'h';
    if (thisLayout.centerOffset_x === undefined) thisLayout.centerOffset_x = 0;
    if (thisLayout.centerOffset_y === undefined) thisLayout.centerOffset_y = 0;
    if (thisLayout.from === undefined) thisLayout.from = 'top';
    if (thisLayout.levelDistance === undefined) thisLayout.levelDistance = '';
    if (thisLayout.from === 'top' || thisLayout.from === 'bottom') {
      thisLayout.layoutDirection = 'v';
      devLog('set layoutDirection=v');
      devLog('set defaultJunctionPoint=tb');
      if (thisLayout.min_per_width === undefined) thisLayout.min_per_width = 100;
      if (thisLayout.max_per_width === undefined) thisLayout.max_per_width = 500;
      if (thisLayout.min_per_height === undefined) thisLayout.min_per_height = 300;
      if (thisLayout.max_per_height === undefined) thisLayout.max_per_height = 500;
    }
    if (thisLayout.from === 'left' || thisLayout.from === 'right') {
      thisLayout.layoutDirection = 'h';
      devLog('set defaultJunctionPoint=lr');
      if (thisLayout.min_per_width === undefined) thisLayout.min_per_width = 300;
      if (thisLayout.max_per_width === undefined) thisLayout.max_per_width = 500;
      if (thisLayout.min_per_height === undefined) thisLayout.min_per_height = 100;
      if (thisLayout.max_per_height === undefined) thisLayout.max_per_height = 500;
    }
  } else if (layoutOptions.layoutName === 'fixed') {
    layoutOptions.layoutDirection = undefined;
  } else if (layoutOptions.layoutName === 'force') {
    layoutOptions.layoutDirection = undefined;
  }
};
export default {
  createLayout,
  appendDefaultOptions4Layout
};
