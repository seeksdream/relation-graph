var __tmp_basePosition = { x: 0, y: 0 }
var __tmp_positionModel = { x: 0, y: 0 }
var __ondraged
var __start_info = { x: 0, y: 0 }
var SeeksRGUtils = {
  startDrag(e, positionModel, ondraged) {
    __ondraged = ondraged
    // console.log('startDrag:', __tmp_basePosition, e.clientX, e.clientY)
    __tmp_positionModel = positionModel
    __start_info.x = __tmp_positionModel.x
    __start_info.y = __tmp_positionModel.y
    __tmp_basePosition.x = parseInt(__tmp_positionModel.x) - e.clientX
    __tmp_basePosition.y = parseInt(__tmp_positionModel.y) - e.clientY
    document.body.addEventListener('mousemove', SeeksRGUtils.onNodeMove)
    document.body.addEventListener('mouseup', SeeksRGUtils.onNodeDragend)
  },
  onNodeMove(e) {
    // console.log('move', __tmp_basePosition, e.clientX, e.clientY)
    __tmp_positionModel.x = e.clientX + __tmp_basePosition.x
    __tmp_positionModel.y = e.clientY + __tmp_basePosition.y
  },
  onNodeDragend(e) {
    // console.log('onNodeDragend', __tmp_positionModel.x - __start_info.x, __tmp_positionModel.y - __start_info.y)
    document.body.removeEventListener('mousemove', SeeksRGUtils.onNodeMove)
    document.body.removeEventListener('mouseup', SeeksRGUtils.onNodeDragend)
    if (__ondraged) {
      __ondraged(__tmp_positionModel.x - __start_info.x, __tmp_positionModel.y - __start_info.y)
    }
  },
  transName4Circle(name, width) {
    var _thisLevel = 0
    var _thisLevelCharsArr = []
    var result = []
    for (var i = 0; i < name.length; i++) {
      _thisLevelCharsArr.push(name[i])
      if (_thisLevelCharsArr.length === circle_node_text_set[_thisLevel]) {
        result.push(_thisLevelCharsArr.join(''))
        _thisLevel++
        _thisLevelCharsArr = []
      }
    }
    if (_thisLevelCharsArr.length > 0) {
      result.push(_thisLevelCharsArr.join(''))
    }
    // if (result.length < 3) {
    //   result.unshift('')
    //   if (result.length < 3) {
    //     result.unshift('')
    //     if (result.length < 3) {
    //       result.unshift('')
    //     }
    //   }
    // }
    return result.join('<br>')
  },
  getColorId(color) {
    color = color.replace('#', '')
    color = color.replace('(', '')
    color = color.replace(')', '')
    color = color.replace(/,/, '-')
    return color
  }
}
SeeksRGUtils.json2Node = function(jsonData) {
  if (jsonData.id === undefined) throw Error('link must has option[id]:', jsonData)
  if (jsonData.text === undefined) jsonData.text = jsonData.name || ''
  if (jsonData.type === undefined) jsonData.type = 'node'
  if (jsonData.isShow === undefined) jsonData.isShow = true // 通过此属性被隐藏后其子节点也将被隐藏
  if (jsonData.isHide === undefined) jsonData.isHide = false // 通过此属性被隐藏后其子节点不受影响
  if (jsonData.expanded === undefined) jsonData.expanded = true
  if (jsonData.selected === undefined) jsonData.selected = false
  if (jsonData.styleClass === undefined) jsonData.styleClass = ''
  if (jsonData.targetNodes === undefined) jsonData.targetNodes = []
  if (jsonData.targetFrom === undefined) jsonData.targetFrom = []
  if (jsonData.targetTo === undefined) jsonData.targetTo = []
  if (jsonData.nodeShape === undefined) jsonData.nodeShape = undefined
  if (jsonData.borderWidth === undefined) jsonData.borderWidth = undefined
  if (jsonData.borderColor === undefined) jsonData.borderColor = undefined
  if (jsonData.fontColor === undefined) jsonData.fontColor = undefined
  if (jsonData.color === undefined) jsonData.color = undefined
  if (jsonData.opacity === undefined) jsonData.opacity = 1
  if (jsonData.fixed === undefined) jsonData.fixed = false
  if (jsonData.x === undefined) jsonData.x = 0
  if (jsonData.y === undefined) jsonData.y = 0
  if (jsonData.Fx === undefined) jsonData.Fx = 0
  if (jsonData.Fy === undefined) jsonData.Fy = 0
  if (jsonData.lot === undefined) jsonData.lot = { childs: [], parent: undefined, eached: false, strength: 0 }
  if (jsonData.lot.childs === undefined) jsonData.lot.childs = []
  if (jsonData.lot.parent === undefined) jsonData.lot.parent = undefined
  if (jsonData.lot.eached === undefined) jsonData.lot.eached = false
  if (jsonData.lot.strength === undefined) jsonData.lot.strength = 0
  if (jsonData.el === undefined) jsonData.el = { offsetWidth: 50, offsetHeight: 50 }
  if (jsonData.width !== undefined) jsonData.el.offsetWidth = jsonData.width
  if (jsonData.height !== undefined) jsonData.el.offsetHeight = jsonData.height
  if (jsonData.offset_x === undefined) jsonData.offset_x = 0
  if (jsonData.offset_y === undefined) jsonData.offset_y = 0
  if (jsonData.expandHolderPosition === undefined) jsonData.expandHolderPosition = undefined
  if (jsonData.innerHTML === undefined) jsonData.innerHTML = undefined
  if (jsonData.html === undefined) jsonData.html = undefined
  return jsonData
}
SeeksRGUtils.json2Link = function(jsonData) {
  if (jsonData.from === undefined) throw Error('error,link must has option[from]:', jsonData)
  if (jsonData.to === undefined) throw Error('error,link must has option[to]:', jsonData)
  if (typeof jsonData.from !== 'string') throw Error('error link from, must be string:', jsonData)
  if (typeof jsonData.to !== 'string') throw Error('error link to, must be string:', jsonData)
  if (jsonData.text === undefined) jsonData.text = ''
  if (jsonData.color === undefined) jsonData.color = undefined
  if (jsonData.fontColor === undefined) jsonData.fontColor = undefined
  if (jsonData.lineWidth === undefined) jsonData.lineWidth = undefined
  if (jsonData.lineShape === undefined) jsonData.lineShape = undefined
  if (jsonData.styleClass === undefined) jsonData.styleClass = undefined
  if (jsonData.isHide === undefined) jsonData.isHide = false
  if (jsonData.arrow === undefined) jsonData.arrow = undefined
  if (jsonData.isHideArrow === undefined) jsonData.isHideArrow = undefined
  if (jsonData.hidden === undefined) jsonData.hidden = false
  if (jsonData.lineDirection === undefined) jsonData.lineDirection = undefined
  if (jsonData.reverseText === undefined) jsonData.reverseText = undefined
  if (jsonData.data === undefined) jsonData.data = {}
  return jsonData
}

SeeksRGUtils.getPosition = function(el) {
  if (el.parentElement) {
    return SeeksRGUtils.getPosition(el.parentElement) + el.offsetTop
  }
  return el.offsetTop
}
var circle_node_text_set = [4, 5, 6, 4, 2, 100]
export default SeeksRGUtils
