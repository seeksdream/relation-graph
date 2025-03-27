import { JsonLine, RGLine, RGLink } from '../types';

export const json2Line = (originData:JsonLine) => {
  if (originData.from === undefined) {
    console.log('error,line must has option[from]:', originData);
    throw new Error('error,line must has option[from]:');
  }
  if (originData.to === undefined) {
    console.log('error,line must has option[to]:', originData);
    throw new Error('error,line must has option[to]:');
  }
  if (typeof originData.from !== 'string') {
    console.log('error line from, must be string:', originData);
    throw new TypeError('error line from, must be string:');
  }
  if (typeof originData.to !== 'string') {
    console.log('error line to, must be string:', originData);
    throw new TypeError('error line to, must be string:');
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const jsonData:RGLine = {
    id: originData.id,
    from: originData.from,
    to: originData.to,
    text: originData.text !== undefined ? originData.text : '',
    textOffset_x: originData.textOffset_x !== undefined ? originData.textOffset_x : undefined,
    textOffset_y: originData.textOffset_y !== undefined ? originData.textOffset_y : undefined,
    color: originData.color !== undefined ? originData.color : undefined,
    opacity: originData.opacity !== undefined ? originData.opacity : 1,
    fontColor:
      originData.fontColor !== undefined ? originData.fontColor : undefined,
    lineWidth:
      originData.lineWidth !== undefined ? originData.lineWidth : undefined,
    lineShape:
      originData.lineShape !== undefined ? originData.lineShape : undefined,
    styleClass:
      originData.styleClass !== undefined ? originData.styleClass : undefined,
    className:
      originData.className !== undefined ? originData.className : undefined,
    isHide: originData.isHide !== undefined ? originData.isHide : false,
    arrow: originData.arrow !== undefined ? originData.arrow : undefined,
    animation: originData.animation !== undefined ? originData.animation : 0,
    dashType: originData.dashType !== undefined ? originData.dashType : 0,
    disableDefaultClickEffect: originData.disableDefaultClickEffect !== undefined ? originData.disableDefaultClickEffect : false,
    showStartArrow: originData.showStartArrow !== undefined ? originData.showStartArrow : false,
    showEndArrow: originData.showEndArrow !== undefined ? originData.showEndArrow : true,
    useTextPath: originData.useTextPath !== undefined ? originData.useTextPath : undefined,
    placeText: originData.placeText !== undefined ? originData.placeText : undefined,
    startMarkerId: originData.startMarkerId || '',
    endMarkerId: originData.endMarkerId || '',
    textAnchor: originData.textAnchor !== undefined ? originData.textAnchor : undefined,
    forDisplayOnly: originData.forDisplayOnly || (originData.from === originData.to),
    fromJunctionPoint: originData.fromJunctionPoint,
    toJunctionPoint: originData.toJunctionPoint,
    fromJuctionPointOffsetX: originData.fromJuctionPointOffsetX || 0,
    fromJuctionPointOffsetY: originData.fromJuctionPointOffsetY || 0,
    toJuctionPointOffsetX: originData.toJuctionPointOffsetX || 0,
    toJuctionPointOffsetY: originData.toJuctionPointOffsetY || 0,
    polyLineRadius: originData.polyLineRadius || 0,
    force_elastic: originData.force_elastic,
    polyLineStartDistance: originData.polyLineStartDistance,
    ctrlPointsFor49: originData.ctrlPointsFor49,
    ctrlPointsFor44: originData.ctrlPointsFor44,
    ctrlPoints: originData.ctrlPoints,
    isHideArrow:
      originData.isHideArrow !== undefined ? originData.isHideArrow : undefined,
    hidden: false,
    lineDirection:
      originData.lineDirection !== undefined
        ? originData.lineDirection
        : undefined,
    reverseText:
      originData.reverseText !== undefined ? originData.reverseText : undefined,
    data: originData.data !== undefined ? originData.data : {}
  };
  if (jsonData.isHideArrow) {
    jsonData.showEndArrow = false;
    jsonData.isHideArrow = false;
  }
  return jsonData;
};

const _ignore_link_keys = ['arrow', 'reverseText', 'isReverse'];
export const transLineToJson = (line: RGLine) => {
  if (!line) return;
  const _line_json = {};
  Object.keys(line).forEach((thisKey) => {
    if (!_ignore_link_keys.includes(thisKey)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (line[thisKey] !== undefined) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        _line_json[thisKey] = line[thisKey];
      }
    }
  });
  return _line_json as JsonLine;
};
export const transLinkToJson = (link: RGLink, relations:JsonLine[]) => {
  if (!link) return;
  link.relations.forEach((thisRelation) => {
    const _line_json = transLineToJson(thisRelation);
    if (_line_json) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      relations.push(_line_json);
    }
  });
};
export const JUNCTION_POINT_STYLE = {
  border: 'border',
  ltrb: 'ltrb',
  tb: 'tb',
  lr: 'lr',
  left: 'left',
  right: 'right',
  top: 'top',
  bottom: 'bottom'
};
export default {
  json2Line,
  transLinkToJson
};
