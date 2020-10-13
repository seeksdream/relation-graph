<template>
  <div
    v-show="isAllowShow(nodeProps)"
    ref="seeksRGNode"
    :style="{'left':nodeProps.x + 'px','top':nodeProps.y + 'px', 'opacity': (nodeProps.opacity>1?nodeProps.opacity/100:nodeProps.opacity) }"
    class="rel-node-peel"
    @mousedown.left.stop="onDragStart($event)"
    @mouseover.stop="onMouseHover($event)"
    @mouseout.stop="onMouseOut($event)"
    @click.stop="onclick($event)"
  >
    <div v-if="(nodeProps.expandHolderPosition&&nodeProps.expandHolderPosition!=='hide')||(graphSetting.defaultExpandHolderPosition&&graphSetting.defaultExpandHolderPosition!=='hide'&&nodeProps.lot.childs&&nodeProps.lot.childs.length>0)" :class="[('c-expand-positon-'+(nodeProps.expandHolderPosition||graphSetting.defaultExpandHolderPosition))]" class="c-btn-open-close">
      <span :style="{'background-color':(nodeProps.color||graphSetting.defaultNodeColor)}">
        <i v-if="nodeProps.expanded===false" class="el-icon-plus" @click.stop="expandNode" />
        <i v-if="nodeProps.expanded!==false" class="el-icon-minus" @click.stop="closeNode" />
      </span>
    </div>
    <div v-if="nodeProps.html" v-html="nodeProps.html" />
    <div
      v-else
      :class="['rel-node-shape-'+(nodeProps.nodeShape===undefined?graphSetting.defaultNodeShape:nodeProps.nodeShape),'rel-node-type-'+nodeProps.type, (nodeProps.id===graphSetting.checkedNodeId?'rel-node-checked':''), (nodeProps.selected?'rel-node-selected':''), nodeProps.styleClass, (hovering?'rel-node-hover':''), (nodeProps.innerHTML?'rel-diy-node':'')]"
      :style="{'background-color':(nodeProps.color===undefined?graphSetting.defaultNodeColor:nodeProps.color),'color':(nodeProps.fontColor===undefined?graphSetting.defaultNodeFontColor:nodeProps.fontColor),'border': (nodeProps.borderColor || graphSetting.defaultNodeBorderColor) + ' solid '+(nodeProps.borderWidth || graphSetting.defaultNodeBorderWidth)+'px', 'width':(nodeProps.width || graphSetting.defaultNodeWidth)+'px', 'height':(nodeProps.height||graphSetting.defaultNodeHeight)+'px'}"
      class="rel-node"
    >
      <slot v-if="!(graphSetting.hideNodeContentByZoom === true && graphSetting.canvasZoom<40)" :node="nodeProps" name="node">
        <div v-if="!nodeProps.innerHTML" :style="{'color':(nodeProps.fontColor || graphSetting.defaultNodeFontColor)}" class="c-node-text">
          <span v-html="getNodeName()" />
        </div>
        <div v-else v-html="nodeProps.innerHTML" />
      </slot>
    </div>
  </div>
</template>

<script>
// import SeeksRGStore from './SeeksRGStore'
// import SeeksGraphMath from './SeeksGraphMath'
import SeeksRGUtils from './SeeksRGUtils'
// import Velocity from 'velocity-animate'
// import { mapState } from 'vuex'
// var _parent = this.$parent
export default {
  name: 'SeeksRGNode',
  components: { },
  props: {
    graphSetting: {
      mustUseProp: true,
      default: () => { return {} },
      type: Object
    },
    nodeProps: {
      mustUseProp: true,
      default: () => { return {} },
      type: Object
    },
    onNodeClick: {
      mustUseProp: false,
      default: () => { return () => {} },
      type: Function
    }
  },
  data() {
    return {
      hovering: false,
      borderColor: '',
      dragging: false
    }
  },
  // computed: mapState({
  //   graphSetting: () => _parent.graphSetting
  // }),
  show() {
    console.log('node show:', this.nodeProps.text)
  },
  watch: {
    // 'nodeProps.isShow': function(v) {
    //   console.log('nodeProps.isShow:', v)
    //   if (v === true) {
    //     this.$nextTick(() => {
    //       this.nodeProps.el.offsetWidth = this.$refs.seeksRGNode.offsetWidth
    //       this.nodeProps.el.offsetHeight = this.$refs.seeksRGNode.offsetHeight
    //       console.log('node 挂载 el size:', this.$refs.seeksRGNode.offsetWidth, this.$refs.seeksRGNode.offsetHeight)
    //     })
    //   }
    // }
  },
  created() {
  },
  mounted() {
    this.refreshNodeProperties()
    // this.leave(this.$refs.seeksRGNode)
  },
  beforeDestroy() {
    const elx = this.$refs.seeksRGNode
    elx.remove()
  },
  methods: {
    refreshNodeProperties() {
      // console.log('node 挂载 el:', this.nodeProps.text)
      this.nodeProps.el = this.$refs.seeksRGNode
      // this.$nextTick(() => {
      //   this.nodeProps.el.offsetWidth = this.$refs.seeksRGNode.offsetWidth
      //   this.nodeProps.el.offsetHeight = this.$refs.seeksRGNode.offsetHeight
      //   console.log('node 挂载 el size:', this.$refs.seeksRGNode.offsetWidth, this.$refs.seeksRGNode.offsetHeight)
      // })
      // this.nodeProps.em = true
      // if (this.nodeProps.style === 0) {
      //   this.nodeProps.name = SeeksRGUtils.transName4Circle(this.nodeProps.name, this.nodeProps.el.offsetWidth)
      //   console.log('resize node name:', this.name)
      // }
      // this.nodeProps.el_width = this.$refs.seeksRGNode.offsetWidth
      // this.nodeProps.el_height = this.$refs.seeksRGNode.offsetHeight
      // var __this = this
      // setInterval(function() {
      //   __this.nodeProps.x = __this.nodeProps.x
      //   __this.nodeProps.y = __this.nodeProps.y
      // }, 1000)
    },
    getNodeName() {
      // if (this.hovering) return 'N-' + this.nodeProps.seeks_id
      if (this.hovering) {
        return this.nodeProps.text
      }
      if (this.nodeProps.width === undefined && this.nodeProps.nodeShape !== 0) {
        return this.nodeProps.text
      }
      var _w = this.nodeProps.el.offsetWidth
      var _h = this.nodeProps.el.offsetHeight
      var _num_l = parseInt((_w - 20) / 20)
      var _num_c = parseInt((_h - 20) / 20)
      if (_num_l === -1 || _num_c === -1) {
        return this.nodeProps.text
      }
      var _length = _num_l * _num_c * 2
      var _text_arr = []
      var _current_length = 0
      for (var i = 0; i < this.nodeProps.text.length; i++) {
        var _thisChar = this.nodeProps.text[i]
        var _charCode = _thisChar.charCodeAt(0)
        var _charLength = 1
        if (_charCode < 0 || _charCode > 255) {
          _charLength = 2
        }
        if ((_current_length + _charLength) > _length) {
          return _text_arr.join('') + '...'
        } else {
          _current_length += _charLength
          _text_arr.push(_thisChar)
        }
      }
      return _text_arr.join('')
      // return _num_l + '/' + _num_c
      // return this.nodeProps.text
    },
    expandNode(e) {
      this.nodeProps.expanded = true
      this.nodeProps.lot.childs.forEach(thisNode => {
        thisNode.isShow = true
      })
      this.$parent.onNodeExpandEvent(this.nodeProps, e)
    },
    closeNode(e) {
      this.nodeProps.expanded = false
      this.nodeProps.lot.childs.forEach(thisNode => {
        thisNode.isShow = false
      })
      this.$parent.onNodeCollapseEvent(this.nodeProps, e)
    },
    onDragStart(e) {
      this.dragging = true
      this.hovering = false
      SeeksRGUtils.startDrag(e, this.nodeProps, this.onNodeDraged)
    },
    onNodeDraged(x, y) {
      if (this.graphSetting.isMoveByParentNode) {
        this.nodeProps.lot.childs.forEach(thisCnode => {
          thisCnode.x += x
          thisCnode.y += y
        })
      }
      if (Math.abs(x) + Math.abs(y) > 6) {
        setTimeout(function() {
          console.log('delay end dragging', this.dragging)
          this.dragging = false
        }.bind(this), 100)
      } else {
        this.dragging = false
      }
    },
    onMouseHover() {
      if (this.dragging) {
        return
      }
      this.hovering = true
    },
    onMouseOut() {
      this.hovering = false
    },
    onclick(e) {
      if (this.dragging) {
        return
      }
      this.graphSetting.checkedNodeId = this.nodeProps.id
      if (this.onNodeClick) {
        this.onNodeClick(this.nodeProps, e)
      }
    },
    isAllowShow: function(thisNode, derict) {
      const _r = thisNode.isShow !== false && thisNode.isHide !== true && (!thisNode.lot.parent || this.isAllowShow(thisNode.lot.parent, false) === true)
      // if (derict !== false && _r === false) console.log('be hide node:', thisNode.text)
      return _r
    },
    // beforeEnter(el) {
    //   console.log('beforeEnter')
    //   el.style.opacity = 0
    //   el.style.transformOrigin = 'left'
    // },
    // enter(el, done) {
    //   console.log('enter')
    //   Velocity(el, { opacity: 1, fontSize: '1.4em' }, { duration: 300 })
    //   Velocity(el, { fontSize: '1em' }, { complete: done })
    // },
    // leave(el, done) {
    //   console.log('leave')
    //   Velocity(el, { translateX: '0px', rotateZ: '360deg' }, { duration: 600 })
    //   // Velocity(el, { rotateZ: '180deg' }, { loop: 1 })
    //   // Velocity(el, {
    //   //   rotateZ: '45deg',
    //   //   translateY: '30px',
    //   //   translateX: '30px',
    //   //   opacity: 0
    //   // }, { complete: done })
    // },
    getLightColor(col, amt) {
      // if (this.borderColor !== '') {
      //   return this.borderColor
      // }
      if (col[0] === '#') {
        var _s = col.substring(1)
        if (_s.length === 3) {
          _s = _s[0] + _s[0] + _s[1] + _s[1] + _s[2] + _s[2]
        }
        var _rgb_arr = [
          parseInt(_s[0] + '' + _s[1], 16),
          parseInt(_s[2] + '' + _s[3], 16),
          parseInt(_s[4] + '' + _s[5], 16)
        ]
        console.log('getLightColor1:', col, ':', _rgb_arr.join(','))
        col = 'rgb(' + _rgb_arr.join(',') + ')'
      }
      var _st = col.substring(col.indexOf('(') + 1)
      _st = _st.substring(0, _st.indexOf(')'))
      var _rgb_string = _st.split(',')
      // console.log('getLightColor444:', _st, ':', _rgb_string.join(','))
      if (_rgb_string.length >= 3) {
        var _rgb_number = [
          parseInt(parseInt(_rgb_string[0]) * 0.9),
          parseInt(parseInt(_rgb_string[1]) * 0.9),
          parseInt(parseInt(_rgb_string[2]) * 0.9)
        ]
        console.log('getLightColor2:', col, ':', _rgb_number.join(','))
        this.borderColor = 'rgb(' + _rgb_number.join(',') + ', 0.3)'
        return this.borderColor
      } else {
        this.borderColor = col
        return col
      }
    }
  }
}
</script>

<style>
  .el-icon-remove,.el-icon-circle-plus{
    cursor: pointer;
  }
  .rel-node-peel{
    clear: both;
    padding:8px;
    position: absolute;
    font-size: 14px;
    /*border:green solid 1px;*/
  }
  .rel-node{
    text-align: center;
  }

  .rel-node-shape-1{
    /*border: #FD8B37 solid 1px;*/
    border-radius: 8px;
    padding:5px;
    padding-left:15px;
    padding-right:15px;
  }
  .c-node-text{
    height:100%;
    width:100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .rel-node-shape-0{
    padding:10px;
  }
  .rel-node-shape-0{
    width:80px;
    height:80px;
    border-radius: 50%;
    /*border: #FD8B37 solid 2px;*/
    /*text-align: left;*/
    /*padding:10px;*/
    /*white-space: nowrap;*/
    /*text-overflow: ellipsis;*/
    /*overflow: hidden;*/
    /*word-break: break-all;*/
  }
  .rel-node-shape-0:hover{
    /*overflow: visible;*/
    /*text-overflow: inherit;*/
    box-shadow: 0px 0px 5px #FFC5A6;
  }
  /*.rel-node{*/
    /*display: table;*/
  /*}*/
  /*.rel-node span{*/
    /*display: table-cell;*/
    /*vertical-align:middle;*/
  /*}*/
  .rel-node-type-button{
    border-radius: 25px;
    color: blue;
    cursor: pointer;
  }
  .rel-node-hover{
  }
  .rel-node-checked{
    box-shadow: 0px 0px 10px #FD8B37;
    /*border-color: #BA7909;*/
    /*background-color: #FD8B37;*/
    /*color: #ffffff;*/
    /* firefox bug fix - won't rotate at 90deg angles */
    -moz-transform: rotate(-89deg) translateX(-190px);
    animation-timing-function:linear;
    animation: ACTRGNodeInit 2s;
  }
  .rel-node-selected{
    box-shadow: 0px 0px 10px #FD8B37;
    /*border-color: #BA7909;*/
    /*background-color: #FD8B37;*/
    /*color: #ffffff;*/
    /* firefox bug fix - won't rotate at 90deg angles */
    -moz-transform: rotate(-89deg) translateX(-190px);
    animation-timing-function:linear;
    animation: ACTRGNodeInit 2s;
  }
  .rel-node-vtree-2 {
    transform-origin:0 0;/* 设置旋转中心为左上角*/
    /*transform-origin:50% 50%;!* 设置放大中心为元素中心 *!*/
    transform: rotate(30deg) translateX(0px);
  }
  .rel-node-vtree {
    width:130px;
    height:45px;
    text-align: left;
  }
  /*.c-node-text{*/
    /*font-size: 12px;*/
    /*display: inline-block;*/
    /*width:100px;*/
    /*height:16px;*/
    /*margin-top:40px;*/
    /*margin-left:-25px;*/
    /*position:absolute;*/
    /*word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;*/
    /*text-align:center;*/
  /*}*/
  .c-btn-open-close{
    position: absolute;
    height:100%;
    width:18px;
    /*border:red solid 1px;*/
    display: flex;
    align-items: center;
    justify-content: center;
    /*border:#ff0000 solid 1px;*/
  }
  .c-btn-open-close span{
    width: 19px;
    height:19px;
    display: inline-block;
    text-align: center;
    line-height: 18px;
    font-size: 12px;
    border-radius: 15px;
    padding-left:1px;
    padding-top:1px;
    color: #ffffff;
    cursor: pointer;
  }
  .c-expand-positon-left{
    margin-top:-8px;
    margin-left:-18px;
  }
  .c-expand-positon-right{
    height:100%;
    width:100%;
    justify-content: center;
  }
  .c-expand-positon-right span{
    margin-top:-18px;
    margin-right:-18px;
    margin-left:100%;
  }
  .c-expand-positon-bottom{
    height:100%;
    width:100%;
    margin-top:7px;
    margin-left:-8px;
    align-items: flex-end;
    justify-content: center;
  }
  .c-expand-positon-top{
    height:18px;
    width:100%;
    margin-top:-20px;
    margin-left:-6px;
    align-items: flex-end;
    justify-content: center;
  }
  @keyframes ACTRGNodeInit {
    from {
      box-shadow: 0px 0px 15px #FD8B37;
    }
    15% {
      box-shadow: 0px 0px 1px rgb(46, 78, 143);
    }
    30% {
      box-shadow: 0px 0px 15px #FD8B37;
    }
    45% {
      box-shadow: 0px 0px 1px rgb(46, 78, 143);
    }
    60% {
      box-shadow: 0px 0px 15px #FD8B37;
    }
    to {
      box-shadow: 0px 0px 1px rgb(46, 78, 143);
    }
  }
  .rel-diy-node{
    padding:0px;
  }
</style>
