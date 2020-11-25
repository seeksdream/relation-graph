<template>
  <div
    v-show="isAllowShowNode(nodeProps)"
    ref="seeksRGNode"
    :style="{'left':nodeProps.x + 'px','top':nodeProps.y + 'px', 'opacity': (nodeProps.opacity>1?nodeProps.opacity/100:nodeProps.opacity) }"
    class="rel-node-peel"
    @mousedown.left.stop="onDragStart($event)"
    @mouseover.stop="onMouseHover($event)"
    @mouseout.stop="onMouseOut($event)"
    @click.stop="onclick($event)"
  >
    <div v-if="(nodeProps.expandHolderPosition&&nodeProps.expandHolderPosition!=='hide')||(graphSetting.defaultExpandHolderPosition&&graphSetting.defaultExpandHolderPosition!=='hide'&&nodeProps.lot.childs&&nodeProps.lot.childs.length>0)" :class="[('c-expand-positon-'+(nodeProps.expandHolderPosition||graphSetting.defaultExpandHolderPosition))]" class="c-btn-open-close">
      <span :class="expandButtonClass" :style="{'background-color':(nodeProps.color||graphSetting.defaultNodeColor)}" @click.stop="expandOrCollapseNode">
      </span>
    </div>
    <div v-if="nodeProps.html" v-html="nodeProps.html" />
    <div
      v-else
      :class="['rel-node-shape-'+(nodeProps.nodeShape===undefined?graphSetting.defaultNodeShape:nodeProps.nodeShape),'rel-node-type-'+nodeProps.type, (nodeProps.id===graphSetting.checkedNodeId?'rel-node-checked':''), (nodeProps.selected?'rel-node-selected':''), nodeProps.styleClass, (hovering?'rel-node-hover':''), (nodeProps.innerHTML?'rel-diy-node':'')]"
      :style="{'background-color':(nodeProps.color===undefined?graphSetting.defaultNodeColor:nodeProps.color),'color':(nodeProps.fontColor===undefined?graphSetting.defaultNodeFontColor:nodeProps.fontColor),'border': (nodeProps.borderColor || graphSetting.defaultNodeBorderColor) + ' solid '+(nodeProps.borderWidth || graphSetting.defaultNodeBorderWidth)+'px', 'width':(nodeProps.width || graphSetting.defaultNodeWidth)+'px', 'height':(nodeProps.height||graphSetting.defaultNodeHeight)+'px'}"
      class="rel-node"
    >
      <template v-if="!(graphSetting.hideNodeContentByZoom === true && graphSetting.canvasZoom<40)">
        <slot :node="nodeProps" name="node">
          <div v-if="!nodeProps.innerHTML" :style="{'color':(nodeProps.fontColor || graphSetting.defaultNodeFontColor)}" class="c-node-text">
            <span v-html="getNodeName()" />
          </div>
          <div v-else v-html="nodeProps.innerHTML" />
        </slot>
      </template>
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
// function isAllowShowNode(isShow, isHide, parent) {
//   const _r = isShow !== false && isHide !== true && (!parent || isAllowShowNode(parent.isShow, parent.isHide, parent.lot.parent) === true)
//   return _r
// }
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
  computed: {
    expandButtonClass() {
      return this.nodeProps.expanded===false ? 'c-expanded' : 'c-collapsed'
    }
  },
  // show() {
  //
  // },
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
    // Vue.version
  },
  mounted() {
    this.refreshNodeProperties()
    // this.leave(this.$refs.seeksRGNode)
    // console.log('node show:', this.nodeProps.text, this.$parent.$slots.node)
  },
  beforeDestroy() {
    const elx = this.$refs.seeksRGNode
    elx.remove()
  },
  methods: {
    refreshNodeProperties() {
      this.nodeProps.el = this.$refs.seeksRGNode
      // console.log('node 挂载 el:', this.nodeProps.text, this.nodeProps.el.offsetWidth, this.nodeProps.el.offsetHeight)
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
    expandOrCollapseNode(e) {
      if (this.nodeProps.expanded === false) {
        this.nodeProps.expanded = true
        this.nodeProps.lot.childs.forEach(thisNode => {
          thisNode.isShow = true
        })
        this.$parent.onNodeExpandEvent(this.nodeProps, e)
      } else {
        this.nodeProps.expanded = false
        this.nodeProps.lot.childs.forEach(thisNode => {
          thisNode.isShow = false
        })
        this.$parent.onNodeCollapseEvent(this.nodeProps, e)
      }
    },
    onDragStart(e) {
      if (this.graphSetting.disableDragNode || this.nodeProps.disableDrag) {
        return
      }
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
          if (window.SeeksGraphDebug) console.log('delay end dragging', this.dragging)
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
      if (!this.nodeProps.disableDefaultClickEffect) {
        this.graphSetting.checkedNodeId = this.nodeProps.id
      }
      if (this.onNodeClick) {
        this.onNodeClick(this.nodeProps, e)
      }
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
    getLightColor(col) {
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
        if (window.SeeksGraphDebug) console.log('getLightColor1:', col, ':', _rgb_arr.join(','))
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
        if (window.SeeksGraphDebug) console.log('getLightColor2:', col, ':', _rgb_number.join(','))
        this.borderColor = 'rgb(' + _rgb_number.join(',') + ', 0.3)'
        return this.borderColor
      } else {
        this.borderColor = col
        return col
      }
    },
    isAllowShowNode(thisNode) {
      const _r = thisNode.isShow !== false && thisNode.isHide !== true && (!thisNode.lot.parent || this.isAllowShowNode(thisNode.lot.parent, false) === true)
      return _r
    }
  }
}
</script>

<style>
  .rg-icon {
    width: 19px;
    height: 19px;
    vertical-align: 0px;
    fill: currentColor;
    overflow: hidden;
  }
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
    width:19px;
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
    border-radius: 15px;
    color: #ffffff;
    cursor: pointer;
    font-size: 19px;
    line-height: 16px;
    background-size: 100% 100%;
  }
  .c-expanded{
    background-image: url(data:image/svg+xml;%20charset=utf8,%3Csvg%20t=%221606310217820%22%20viewBox=%220%200%201024%201024%22%20version=%221.1%22%20xmlns=%22http://www.w3.org/2000/svg%22%20p-id=%223373%22%20width=%2232%22%20height=%2232%22%3E%3Cpath%20d=%22M853.333333%20480H544V170.666667c0-17.066667-14.933333-32-32-32s-32%2014.933333-32%2032v309.333333H170.666667c-17.066667%200-32%2014.933333-32%2032s14.933333%2032%2032%2032h309.333333V853.333333c0%2017.066667%2014.933333%2032%2032%2032s32-14.933333%2032-32V544H853.333333c17.066667%200%2032-14.933333%2032-32s-14.933333-32-32-32z%22%20p-id=%223374%22%20fill=%22white%22%3E%3C/path%3E%3C/svg%3E);
  }
  .c-collapsed{
    background-image: url(data:image/svg+xml;%20charset=utf8,%3Csvg%20t=%221606310454619%22%20class=%22icon%22%20viewBox=%220%200%201024%201024%22%20version=%221.1%22%20xmlns=%22http://www.w3.org/2000/svg%22%20p-id=%223662%22%20width=%22128%22%20height=%22128%22%3E%3Cpath%20d=%22M853.333333%20554.666667H170.666667c-23.466667%200-42.666667-19.2-42.666667-42.666667s19.2-42.666667%2042.666667-42.666667h682.666666c23.466667%200%2042.666667%2019.2%2042.666667%2042.666667s-19.2%2042.666667-42.666667%2042.666667z%22%20p-id=%223663%22%20fill=%22white%22%3E%3C/path%3E%3C/svg%3E);
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
