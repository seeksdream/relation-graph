import type { JsonNode, RGNode } from '../RelationGraph'

export const json2Node = (originData: JsonNode) => {
  if (originData.id === undefined) {
    throw new Error(`Node must has option[id]:${JSON.stringify(originData)}`)
  }
  const jsonData: RGNode = {
    seeks_id: -1, // initial
    id: originData.id,
    text: originData.text !== undefined ? originData.text : '',
    type: originData.type !== undefined ? originData.type : 'node',
    isHide: originData.isHide !== undefined ? originData.isHide : false,
    expanded: originData.expanded !== undefined ? originData.expanded : true,
    junctionPoint:
      originData.junctionPoint !== undefined
        ? originData.junctionPoint
        : undefined,
    selected: originData.selected !== undefined ? originData.selected : false,
    styleClass:
      originData.styleClass !== undefined ? originData.styleClass : '',
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
    x: originData.x !== undefined ? originData.x : 0,
    y: originData.y !== undefined ? originData.y : 0,
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
    data: originData.data !== undefined ? originData.data : {},
    isShow: true,
    Fx: 0,
    Fy: 0,
    targetNodes: [],
    targetFrom: [],
    targetTo: [],
    lot: {
      childs: [],
      parent: undefined,
      eached: false,
      strength: 0,
    },
    el: { offsetWidth: 50, offsetHeight: 50 },
  }
  if (jsonData.width !== undefined) jsonData.el.offsetWidth = jsonData.width
  if (jsonData.height !== undefined) jsonData.el.offsetHeight = jsonData.height
  return jsonData
}
const _ignore_node_keys = [
  'Fx',
  'Fy',
  'appended',
  'el',
  'targetFrom',
  'targetNodes',
  'targetTo',
  'type',
  'lot',
  'seeks_id',
]
export const transNodeToJson = (node: RGNode) => {
  if (!node) return
  // @ts-ignore
  const node_json: JsonNode = {}
  Object.keys(node).forEach((thisKey) => {
    if (!_ignore_node_keys.includes(thisKey)) {
      // @ts-ignore
      if (node[thisKey] !== undefined) {
        // @ts-ignore
        node_json[thisKey] = node[thisKey]
      }
    }
  })
  return node_json
}
export default {
  json2Node,
  transNodeToJson,
}
