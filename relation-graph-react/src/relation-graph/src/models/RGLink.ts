import type {
  JsonLine,
  RGJunctionPoint,
  RGLine,
  RGLink,
} from '../RelationGraph'

export const json2Line = (originData: JsonLine) => {
  if (originData.from === undefined) {
    throw new Error(
      `error,line must has option[from]:${JSON.stringify(originData)}`
    )
  }
  if (originData.to === undefined) {
    throw new Error(
      `error,line must has option[to]:${JSON.stringify(originData)}`
    )
  }
  if (typeof originData.from !== 'string') {
    throw new TypeError(
      `error line from, must be string:${JSON.stringify(originData)}`
    )
  }
  if (typeof originData.to !== 'string') {
    throw new TypeError(
      `error line to, must be string:${JSON.stringify(originData)}`
    )
  }
  const jsonData: RGLine = {
    seeks_id: '',
    isReverse: false,
    from: originData.from,
    to: originData.to,
    text: originData.text !== undefined ? originData.text : '',
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
    isHide: originData.isHide !== undefined ? originData.isHide : false,
    arrow: originData.arrow !== undefined ? originData.arrow : undefined,
    showStartArrow:
      originData.showStartArrow !== undefined
        ? originData.showStartArrow
        : false,
    disableDefaultClickEffect:
      originData.disableDefaultClickEffect !== undefined
        ? originData.disableDefaultClickEffect
        : false,
    showEndArrow:
      originData.showEndArrow !== undefined ? originData.showEndArrow : true,
    useTextPath:
      originData.useTextPath !== undefined ? originData.useTextPath : false,
    isHideArrow:
      originData.isHideArrow !== undefined ? originData.isHideArrow : undefined,
    lineDirection:
      originData.lineDirection !== undefined
        ? originData.lineDirection
        : undefined,
    data: originData.data !== undefined ? originData.data : {},
  }
  if (jsonData.isHideArrow) {
    jsonData.showEndArrow = false
    jsonData.isHideArrow = false
  }
  return jsonData
}

const _ignore_link_keys = ['arrow', 'id', 'reverseText', 'isReverse']
export const transLinkToJson = (link: RGLink, relations: JsonLine[]) => {
  if (!link) return
  link.relations.forEach((thisRelation) => {
    // @ts-ignore
    const line_json: JsonLine = {}
    Object.keys(thisRelation).forEach((thisKey) => {
      if (!_ignore_link_keys.includes(thisKey)) {
        // @ts-ignore
        if (thisRelation[thisKey] !== undefined) {
          // @ts-ignore
          line_json[thisKey] = thisRelation[thisKey]
        }
      }
    })
    relations.push(line_json)
  })
}
export const JUNCTION_POINT_STYLE: {
  border: RGJunctionPoint
  ltrb: RGJunctionPoint
  tb: RGJunctionPoint
  lr: RGJunctionPoint
} = {
  border: 'border',
  ltrb: 'ltrb',
  tb: 'tb',
  lr: 'lr',
}
export default {
  json2Line,
  transLinkToJson,
}
