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
  onNodeDragend() {
    // console.log('onNodeDragend', __tmp_positionModel.x - __start_info.x, __tmp_positionModel.y - __start_info.y)
    document.body.removeEventListener('mousemove', SeeksRGUtils.onNodeMove)
    document.body.removeEventListener('mouseup', SeeksRGUtils.onNodeDragend)
    if (__ondraged) {
      __ondraged(__tmp_positionModel.x - __start_info.x, __tmp_positionModel.y - __start_info.y)
    }
  },
  transName4Circle(name) {
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
SeeksRGUtils.json2Node = function(originData) {
  if (originData.id === undefined) throw Error('node must has option[id]:', originData)
  originData.text = originData.text || originData.name || originData.id
  var jsonData = {
    id: originData.id,
    text: originData.text !== undefined ? originData.text : '',
    type: originData.type !== undefined ? originData.type : 'node',
    isShow: originData.isShow !== undefined ? originData.isShow : true,
    isHide: originData.isHide !== undefined ? originData.isHide : false,
    expanded: originData.expanded !== undefined ? originData.expanded : true,
    selected: originData.selected !== undefined ? originData.selected : false,
    styleClass: originData.styleClass !== undefined ? originData.styleClass : '',
    targetNodes: originData.targetNodes !== undefined ? originData.targetNodes : [],
    targetFrom: originData.targetFrom !== undefined ? originData.targetFrom : [],
    targetTo: originData.targetTo !== undefined ? originData.targetTo : [],
    nodeShape: originData.nodeShape !== undefined ? originData.nodeShape : undefined,
    borderWidth: originData.borderWidth !== undefined ? originData.borderWidth : undefined,
    borderColor: originData.borderColor !== undefined ? originData.borderColor : undefined,
    fontColor: originData.fontColor !== undefined ? originData.fontColor : undefined,
    color: originData.color !== undefined ? originData.color : undefined,
    opacity: originData.opacity !== undefined ? originData.opacity : 1,
    fixed: originData.fixed !== undefined ? originData.fixed : false,
    width: originData.width !== undefined ? originData.width : undefined,
    height: originData.height !== undefined ? originData.height : undefined,
    x: originData.x !== undefined ? originData.x : 0,
    y: originData.y !== undefined ? originData.y : 0,
    Fx: originData.Fx !== undefined ? originData.Fx : 0,
    Fy: originData.Fy !== undefined ? originData.Fy : 0,
    offset_x: originData.offset_x !== undefined ? originData.offset_x : 0,
    offset_y: originData.offset_y !== undefined ? originData.offset_y : 0,
    expandHolderPosition: originData.expandHolderPosition !== undefined ? originData.expandHolderPosition : undefined,
    innerHTML: originData.innerHTML !== undefined ? originData.innerHTML : undefined,
    html: originData.html !== undefined ? originData.html : undefined,
    disableDefaultClickEffect: originData.disableDefaultClickEffect !== undefined ? originData.disableDefaultClickEffect : undefined,
    disableDrag: originData.disableDrag !== undefined ? originData.disableDrag : false,
    data: originData.data !== undefined ? originData.data : {}
  }
  if(jsonData.lot === undefined) jsonData.lot = { childs: [], parent: undefined, eached: false, strength: 0 }
  if(jsonData.lot.childs === undefined) jsonData.lot.childs = []
  if(jsonData.lot.parent === undefined) jsonData.lot.parent = undefined
  if(jsonData.lot.eached === undefined) jsonData.lot.eached = false
  if(jsonData.lot.strength === undefined) jsonData.lot.strength = 0
  if(jsonData.el === undefined) jsonData.el = { offsetWidth: 50, offsetHeight: 50 }
  if(jsonData.width !== undefined) jsonData.el.offsetWidth = jsonData.width
  if(jsonData.height !== undefined) jsonData.el.offsetHeight = jsonData.height
  return jsonData
}
SeeksRGUtils.json2Link = function(originData) {
  if (originData.from === undefined) throw Error('error,link must has option[from]:', originData)
  if (originData.to === undefined) throw Error('error,link must has option[to]:', originData)
  if (typeof originData.from !== 'string') throw Error('error link from, must be string:', originData)
  if (typeof originData.to !== 'string') throw Error('error link to, must be string:', originData)
  var jsonData = {
    text: originData.text !== undefined ? originData.text : '',
    color: originData.color !== undefined ? originData.color : undefined,
    fontColor: originData.fontColor !== undefined ? originData.fontColor : undefined,
    lineWidth: originData.lineWidth !== undefined ? originData.lineWidth : undefined,
    lineShape: originData.lineShape !== undefined ? originData.lineShape : undefined,
    styleClass: originData.styleClass !== undefined ? originData.styleClass : undefined,
    isHide: originData.isHide !== undefined ? originData.isHide : false,
    arrow: originData.arrow !== undefined ? originData.arrow : undefined,
    isHideArrow: originData.isHideArrow !== undefined ? originData.isHideArrow : undefined,
    hidden: originData.hidden !== undefined ? originData.hidden : false,
    lineDirection: originData.lineDirection !== undefined ? originData.lineDirection : undefined,
    reverseText: originData.reverseText !== undefined ? originData.reverseText : undefined,
    data: originData.data !== undefined ? originData.data : {},
  }
  return jsonData
}

SeeksRGUtils.getPosition = function(el) {
  if (el.parentElement) {
    return SeeksRGUtils.getPosition(el.parentElement) + el.offsetTop
  }
  return el.offsetTop
}
var _ignore_node_keys = [ 'Fx', 'Fy', 'appended', 'el', 'targetFrom', 'targetNodes', 'targetTo', 'type', 'lot', 'seeks_id' ]
SeeksRGUtils.transNodeToJson = function(node, nodes) {
  if (!node) return
  var _node_json = {}
  Object.keys(node).forEach(thisKey => {
    if (_ignore_node_keys.indexOf(thisKey) === -1) {
      if (node[thisKey] !== undefined) {
        _node_json[thisKey] = node[thisKey]
      }
    }
  })
  nodes.push(_node_json)
}
var _ignore_link_keys = [ 'arrow', 'id', 'reverseText', 'isReverse' ]
SeeksRGUtils.transLineToJson = function(line, links) {
  if (!line) return
  line.relations.forEach(thisRelation => {
    var _link_json = {}
    Object.keys(thisRelation).forEach(thisKey => {
      if (_ignore_link_keys.indexOf(thisKey) === -1) {
        if (thisRelation[thisKey] !== undefined) {
          _link_json[thisKey] = thisRelation[thisKey]
        }
      }
    })
    links.push(_link_json)
  })
}
var circle_node_text_set = [4, 5, 6, 4, 2, 100]
export default SeeksRGUtils
