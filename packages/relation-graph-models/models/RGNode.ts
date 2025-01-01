import {JsonNode, RGNode, RGOptions} from '../types';

export const json2Node = (originData:JsonNode, graphOptions?: RGOptions) => {
  if (originData.id === undefined) {
    console.log('node must has id:', originData);
    throw new Error('node must has option[id]:');
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const jsonData: RGNode = {
    id: originData.id,
    text: originData.text !== undefined ? originData.text : '',
    type: originData.type !== undefined ? originData.type : 'node',
    isShow: true,
    isHide: originData.isHide !== undefined ? originData.isHide : false,
    expanded: originData.expanded !== undefined ? originData.expanded : true,
    junctionPoint: originData.junctionPoint !== undefined ? originData.junctionPoint : undefined,
    alignItems: originData.alignItems !== undefined ? originData.alignItems : undefined,
    selected: originData.selected !== undefined ? originData.selected : false,
    flashing: undefined,
    dragging: false,
    styleClass:
      originData.styleClass !== undefined ? originData.styleClass : '',
    className:
      originData.className !== undefined ? originData.className : '',
    targetNodes: [],
    targetFrom: [],
    targetTo: [],
    nodeShape:
      originData.nodeShape !== undefined ? originData.nodeShape : undefined,
    borderWidth:
      originData.borderWidth !== undefined ? originData.borderWidth : undefined,
    borderColor:
      originData.borderColor !== undefined ? originData.borderColor : undefined,
    fontColor:
      originData.fontColor !== undefined ? originData.fontColor : undefined,
    color: originData.color !== undefined ? originData.color : undefined,
    opacity: originData.opacity !== undefined ? originData.opacity : 1,
    fixed: originData.fixed !== undefined ? originData.fixed : false,
    width: originData.width !== undefined ? originData.width : undefined,
    height: originData.height !== undefined ? originData.height : undefined,
    force_weight: originData.force_weight,
    x: originData.x !== undefined ? originData.x : 0,
    y: originData.y !== undefined ? originData.y : 0,
    Fx: 0,
    Fy: 0,
    offset_x: originData.offset_x !== undefined ? originData.offset_x : 0,
    offset_y: originData.offset_y !== undefined ? originData.offset_y : 0,
    expandHolderPosition:
      originData.expandHolderPosition !== undefined
        ? originData.expandHolderPosition
        : undefined,
    innerHTML:
      originData.innerHTML !== undefined ? originData.innerHTML : undefined,
    html: originData.html !== undefined ? originData.html : undefined,
    disableDefaultClickEffect:
      originData.disableDefaultClickEffect !== undefined
        ? originData.disableDefaultClickEffect
        : undefined,
    disableDrag:
      originData.disableDrag !== undefined ? originData.disableDrag : false,
    singleNode: false,
    data: originData.data !== undefined ? originData.data : {}
  };
  jsonData.lot = {
    childs: [],
    parent: undefined,
    eached: false,
    strength: 0
  };
  if (jsonData.el === undefined) {
    jsonData.el = {
      offsetWidth: 50,
      offsetHeight: 50
    };
    if (graphOptions) {
      if (graphOptions.defaultNodeWidth) jsonData.el.offsetWidth = graphOptions.defaultNodeWidth + 16;
      if (graphOptions.defaultNodeHeight) jsonData.el.offsetHeight = graphOptions.defaultNodeHeight + 16;
    }
  }
  if (jsonData.width) jsonData.el.offsetWidth = jsonData.width;
  if (jsonData.height) jsonData.el.offsetHeight = jsonData.height;
  return jsonData;
};
const _ignore_node_keys = [
  'Fx',
  'Fy',
  'appended',
  'dragging',
  'el',
  'targetFrom',
  'targetNodes',
  'targetTo',
  'type',
  'lot',
  'seeks_id'
];
export const transNodeToJson = (node:RGNode):JsonNode|undefined => {
  if (!node) return;
  const _node_json = {};
  Object.keys(node).forEach((thisKey) => {
    if (!_ignore_node_keys.includes(thisKey)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (node[thisKey] !== undefined) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        _node_json[thisKey] = node[thisKey];
      }
    }
  });
  return _node_json as JsonNode;
};
export default {
  json2Node,
  transNodeToJson
};
