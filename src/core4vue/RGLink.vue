<template>
  <g v-if="linkProps.isHide !== true && isAllowShowNode(linkProps.fromNode) && isAllowShowNode(linkProps.toNode)" ref="seeksRGLink" transform="translate(0,0)">
    <template v-for="(thisRelation, ri) in linkProps.relations">
      <slot name="line" :line="thisRelation">
        <g v-if="thisRelation.isHide === false" :key="'l-'+thisRelation.id">
          <path :d="createLinePath(linkProps.fromNode, linkProps.toNode, ri, thisRelation)" :class="[thisRelation.styleClass,relationGraph.options.checkedLineId==linkProps.seeks_id?'c-rg-line-checked':'']" :stroke="thisRelation.color?thisRelation.color:relationGraph.options.defaultLineColor" :style="{'stroke-width': (thisRelation.lineWidth?thisRelation.lineWidth:relationGraph.options.defaultLineWidth) + 'px'}" :marker-end="getArrow(thisRelation.isHideArrow, thisRelation.arrow, thisRelation.color)" fill="none" class="c-rg-line" @click="onClick($event)" />
          <g v-if="relationGraph.options.defaultShowLineLabel && relationGraph.options.canvasZoom>40" :transform="getTextTransform(thisRelation, thisRelation.textPositon.x,thisRelation.textPositon.y,thisRelation.textPositon.rotate)">
            <text :key="'t-'+thisRelation.id" :x="0" :y="0" :style="{fill:(thisRelation.fontColor?thisRelation.fontColor:(thisRelation.color?thisRelation.color:undefined))}" class="c-rg-link-text" @click="onClick($event)">
              <!--<textPath :xlink:href="'#'+lineProps.id">{{ lineProps.text }}</textPath>-->
              {{ thisRelation.text }}
            </text>
          </g>
        </g>
      </slot>
    </template>
  </g>
</template>

<script>
// import RGStore from './RGStore'
import RGGraphMath from '../utils/RGGraphMath';
import { devLog } from '@/utils/RGCommon';
// import Velocity from 'velocity-animate'
// import { mapState } from 'vuex'
// var _parent = this.$parent
const JUNCTION_POINT_STYLE = {
  border: 'border',
  ltrb: 'ltrb',
  tb: 'tb',
  lr: 'lr'
};
export default {
  name: 'SeeksRGLink',
  props: {
    relationGraph: {
      mustUseProp: true,
      default: () => { return {}; },
      type: Object
    },
    linkProps: {
      mustUseProp: true,
      default: () => { return {}; },
      type: Object
    }
  },
  data() {
    return {
      is_flashing: false
    };
  },
  show() {
    this.isShow = true;
  },
  watch: {
  },
  mounted() {
    // this.refresh()
    // var __this = this
    // setInterval(this.onLineClick, 1000)
  },
  // beforeDestroy() {
  //   const elx = this.$refs.seeksRGLink
  //   elx.remove()
  // },
  methods: {
    getTextTransform(thisRelation, x, y, rotate) {
      if (!x || !y) {
        return 'translate(0,0)';
      }
      const __lineShape = thisRelation.lineShape === undefined ? this.relationGraph.options.defaultLineShape : thisRelation.lineShape;
      if (__lineShape === 1 || __lineShape === 4) {
        return 'translate(' + x + ',' + y + ')rotate(' + (rotate || 0) + ')';
      } else {
        return 'translate(' + x + ',' + y + ')';
      }
    },
    getArrow(isHideArrow, arrow, color) {
      // console.log('xxxxxxxxxxxx')
      if (isHideArrow) {
        return 'none';
      } else {
        const _arrow = this.relationGraph.getLineArrow(color);
        return 'url(\'#' + (_arrow) + '\')';
      }
    },
    createLinePath(from, to, ri, relationData) {
      // console.log('redrawLine:', this.lineProps.fromNode.id, this.lineProps.toNode.id, ri)
      // console.log('_point:', _point)
      if (!ri)ri = 0;
      const __lineShape = relationData.lineShape === undefined ? this.relationGraph.options.defaultLineShape : relationData.lineShape;
      const __lineDirection = relationData.lineDirection === undefined ? this.relationGraph.options.layoutDirection : relationData.lineDirection;
      let from_x = from.x;
      let from_y = from.y;
      let to_x = to.x;
      let to_y = to.y;
      if (isNaN(from_x) || isNaN(from_y)) {
        devLog('error start node:', from);
        relationData.textPositon.x = 50;
        relationData.textPositon.y = 50;
        relationData.textPositon.rotate = 0;
        return 'M 0 0 L 100 100';
      }
      if (isNaN(to_x) || isNaN(to_y)) {
        devLog('error start point:', from);
        relationData.textPositon.x = 50;
        relationData.textPositon.y = 50;
        relationData.textPositon.rotate = 0;
        return 'M 0 0 L 100 100';
      }
      let f_W = from.el.offsetWidth || from.width || from.w;
      let f_H = from.el.offsetHeight || from.height || from.h;
      if (isNaN(f_W) || isNaN(f_H)) {
        // console.log('error from node size:', f_W, f_H)
        relationData.textPositon.x = 50;
        relationData.textPositon.y = 50;
        relationData.textPositon.rotate = 0;
        return 'M 0 0 L 100 100';
      }
      let t_W = to.el.offsetWidth || to.width || to.w;
      let t_H = to.el.offsetHeight || to.height || to.h;
      if (isNaN(t_W) || isNaN(t_H)) {
        // console.log('error to node size:', f_W, f_H)
        relationData.textPositon.x = 50;
        relationData.textPositon.y = 50;
        relationData.textPositon.rotate = 0;
        return 'M 0 0 L 100 100';
      }
      if (relationData.isReverse) {
        [from_x, from_y, to_x, to_y, f_W, f_H, t_W, t_H] = [to_x, to_y, from_x, from_y, t_W, t_H, f_W, f_H];
      }
      const __params4start = [from_x, from_y, to_x, to_y, f_W, f_H, t_W, t_H, this.relationGraph.options.defaultNodeShape, relationData.isReverse, this.linkProps.relations.length, ri];
      const __params4end = [to_x, to_y, from_x, from_y, t_W, t_H, f_W, f_H, this.relationGraph.options.defaultNodeShape, !relationData.isReverse, this.linkProps.relations.length, ri];
      let __start, __end;
      let _junctionPointStyle = this.relationGraph.options.defaultJunctionPoint;
      if (!_junctionPointStyle) {
        _junctionPointStyle = JUNCTION_POINT_STYLE.border;
      }
      if (_junctionPointStyle === JUNCTION_POINT_STYLE.border) {
        __start = RGGraphMath.getBorderPoint4MultiLine(...__params4start);
        __end = RGGraphMath.getBorderPoint4MultiLine(...__params4end);
      } else if (_junctionPointStyle === JUNCTION_POINT_STYLE.ltrb) {
        __start = RGGraphMath.getRectJoinPoint(...__params4start);
        __end = RGGraphMath.getRectJoinPoint(...__params4end);
      } else if (_junctionPointStyle === JUNCTION_POINT_STYLE.tb) {
        __start = RGGraphMath.getRectVJoinPoint(...__params4start);
        __end = RGGraphMath.getRectVJoinPoint(...__params4end);
      } else if (_junctionPointStyle === JUNCTION_POINT_STYLE.lr) {
        __start = RGGraphMath.getRectHJoinPoint(...__params4start);
        __end = RGGraphMath.getRectHJoinPoint(...__params4end);
      }
      const fx = __start.x;
      const fy = __start.y;
      const tx = __end.x;
      const ty = __end.y;
      if (isNaN(fx) || isNaN(fy)) {
        console.error('error start point:', from);
        relationData.textPositon.x = 50;
        relationData.textPositon.y = 50;
        relationData.textPositon.rotate = 0;
        return 'M 0 0 L 100 100';
      }
      if (isNaN(tx) || isNaN(ty)) {
        console.error('error end point:', to);
        relationData.textPositon.x = 50;
        relationData.textPositon.y = 50;
        relationData.textPositon.rotate = 0;
        return 'M 0 0 L 100 100';
      }
      let __buff_x = (__end.x - __start.x);
      let __buff_y = (__end.y - __start.y);
      let __buff_type = __end.x > __start.x ? 1 : -1;
      if (__lineDirection === 'v') {
        __buff_type = __end.y > __start.y ? 1 : -1;
      }
      let __path = '';
      if (__lineShape === 4) {
        const distanceRate = ((60 / (this.linkProps.relations.length + 1)) * (ri + 1)) - 30;
        if (__lineDirection === 'v') {
          __buff_y = __buff_y - (__buff_type * 33 + distanceRate);
          relationData.textPositon.x = fx + __buff_x + 5;
          relationData.textPositon.y = fy + __buff_type * 40 + distanceRate;
          relationData.textPositon.rotate = 90;
          __path = 'M ' + fx + ' ' + fy + ' v' + (__buff_type * 33 + distanceRate) + ' h' + (__buff_x + distanceRate) + ' v' + (__buff_y);
        } else {
          if (relationData.reverseText === true) {
            relationData.textPositon.x = fx + __buff_type * 10 - (__buff_type < 0 ? 30 : 0);
            relationData.textPositon.y = fy - 5;
            __buff_x = __buff_x - (__buff_type * 120);
            __path = 'M ' + fx + ' ' + fy + ' h' + (__buff_type * 120) + ' v' + (__buff_y) + ' h' + (__buff_x);
          } else {
            relationData.textPositon.x = fx + __buff_type * 50 - (__buff_type < 0 ? 30 : 0);
            relationData.textPositon.y = fy + __buff_y - 5 + distanceRate;
            __buff_x = __buff_x - (__buff_type * 33 + distanceRate);
            __buff_y = __buff_y + (__buff_type * distanceRate);
            __path = 'M ' + fx + ' ' + fy + ' h' + (__buff_type * 33 + distanceRate) + ' v' + (__buff_y) + ' h' + (__buff_x);
          }
        }
      } else if (__lineShape === 2) {
        // var __buff_type_x = __end.x > __start.x ? 1 : -1
        const __buff_type_y = __end.y > __start.y ? 1 : -1;
        const _base = Math.abs(__buff_x) + Math.abs(__buff_y);
        relationData.textPositon.x = parseInt(__end.x - ((__buff_x) / _base * 60) - 20);
        relationData.textPositon.y = parseInt(__end.y - ((__buff_y) / _base * 60) - 20 * __buff_type_y);
        const distanceRate = ((1 / (this.linkProps.relations.length + 1)) * (ri + 1)) - 0.5 + 0.5;
        if (__lineDirection === 'v') {
          __path = 'M' + fx + ',' + fy + ' c' + (0) + ',' + (__buff_type * 30) + ' ' + (__buff_x * distanceRate) + ',' + (__buff_type * -10) + ' ' + __buff_x + ',' + __buff_y;
        } else {
          __path = 'M' + fx + ',' + fy + ' c' + (__buff_type * 30) + ',' + (0) + ' ' + (__buff_type * -10) + ',' + (__buff_y * distanceRate) + ' ' + __buff_x + ',' + __buff_y;
        }
      } else if (__lineShape === 6) {
        // const __buff_type_x = __end.x > __start.x ? 1 : -1
        const __buff_type_y = __end.y > __start.y ? 1 : -1;
        const _base = Math.abs(__buff_x) + Math.abs(__buff_y);
        relationData.textPositon.x = parseInt(__end.x - ((__buff_x) / _base * 60) - 20);
        relationData.textPositon.y = parseInt(__end.y - ((__buff_y) / _base * 60) - 20 * __buff_type_y);
        if (__lineDirection === 'v') {
          __path = 'M' + fx + ',' + fy + ' c' + (0) + ',' + (__buff_y / 2) + ' ' + (__buff_x) + ',' + (__buff_y / 2) + ' ' + __buff_x + ',' + __buff_y;
        } else {
          __path = 'M' + fx + ',' + fy + ' c' + (__buff_x / 2) + ',' + (0) + ' ' + (__buff_x / 2) + ',' + (__buff_y) + ' ' + __buff_x + ',' + __buff_y;
        }
      } else if (__lineShape === 3) {
        relationData.textPositon.x = __end.x - (__buff_type * 63);
        relationData.textPositon.y = __end.y + 3;
        const distanceRate = ((1 / (this.linkProps.relations.length + 1)) * (ri + 1)) - 0.5 + 0.5;
        if (__lineDirection === 'v') {
          __path = 'M' + fx + ',' + fy + ' c' + (0) + ',' + (__buff_y * distanceRate) + ' ' + (0) + ',' + (0) + ' ' + __buff_x + ',' + __buff_y;
        } else {
          // console.log('start:', __start, __end, __buff_x, __buff_y)
          __path = 'M' + fx + ',' + fy + ' c' + (__buff_type * 30) + ',' + (0) + ' ' + (__buff_type * -10) + ',' + (__buff_y * distanceRate) + ' ' + __buff_x + ',' + __buff_y;
        }
      } else if (__lineShape === 5) {
        // relationData.text.x = __start.x + __buff_x / 2 - 33
        // relationData.text.y = __start.y + __buff_y / 2 - 3
        relationData.textPositon.x = __end.x - (__buff_type * 63);
        relationData.textPositon.y = __end.y + 3;
        const distanceRate = ((1 / (this.linkProps.relations.length + 1)) * (ri + 1)) - 0.5 + 0.5;
        if (__lineDirection === 'v') {
          __path = 'M' + fx + ',' + fy + ' c' + (0) + ',' + (0) + ' ' + (0) + ',' + (__buff_y * distanceRate) + ' ' + __buff_x + ',' + __buff_y; // 鱼尾
        } else {
          __path = 'M' + fx + ',' + fy + ' c' + (0) + ',' + (0) + ' ' + (__buff_x * distanceRate) + ',' + (0) + ' ' + __buff_x + ',' + __buff_y; // 鱼尾
        }
        // __path = 'M' + fx + ',' + fy + ' c' + (0) + ',' + (0) + ' ' + (0) + ',' + (__buff_y * 0.5) + ' ' + __buff_x + ',' + __buff_y
        // __path = 'M' + fx + ',' + fy + ' c' + (0) + ',' + (0) + ' ' + (-100) + ',' + (__buff_y * 0.5) + ' ' + __buff_x + ',' + __buff_y
        // __path = 'M' + fx + ',' + fy + ' c' + (30) + ',' + (0) + ' ' + (-10) + ',' + (__buff_y * 0.5) + ' ' + __buff_x + ',' + __buff_y
        // __path = 'M' + fx + ',' + fy + ' c' + (50) + ',' + (0) + ' ' + (-50) + ',' + (__buff_y * 0.5) + ' ' + __buff_x + ',' + __buff_y
        // __path = 'M' + fx + ',' + fy + ' c' + (100) + ',' + (0) + ' ' + (10) + ',' + (__buff_y * 0.5) + ' ' + __buff_x + ',' + __buff_y
        // __path = 'M' + fx + ',' + fy + ' c' + (0) + ',' + (0) + ' ' + (__buff_x * 0.5) + ',' + (0) + ' ' + __buff_x + ',' + __buff_y // 类似鱼尾
        // __path = 'M' + fx + ',' + fy + ' c' + (__buff_x * 0.5) + ',' + (0) + ' ' + (0) + ',' + (0) + ' ' + __buff_x + ',' + __buff_y // 三角
        // __path = 'M' + fx + ',' + fy + ' c' + (0) + ',' + (0) + ' ' + (__buff_x * 0.5) + ',' + (0) + ' ' + __buff_x + ',' + __buff_y // 鱼尾
        // __path = 'M' + fx + ',' + fy + ' c' + (50) + ',' + (__buff_y * 0.5) + ' ' + (0) + ',' + (0) + ' ' + __buff_x + ',' + __buff_y //
        // __path = 'M' + fx + ',' + fy + ' c' + (50) + ',' + (__buff_y * 0.5) + ' ' + (0) + ',' + (0) + ' ' + __buff_x + ',' + __buff_y
      } else {
        const _angle_type = RGGraphMath.getAngleType(__buff_x, __buff_y);
        relationData.textPositon.rotate = RGGraphMath.getTextAngle(fx, fy, tx, ty);
        const _xxx = (_angle_type === 2 || _angle_type === 4) ? -1 : 1;
        const _x = (__buff_y === 0 ? -50 : Math.sin(Math.atan(__buff_x / __buff_y)) * 10 / Math.sin(90)) * _xxx;
        const _y = (__buff_x === 0 ? -50 : Math.sin(Math.atan(__buff_y / __buff_x)) * 10 / Math.sin(90));
        relationData.textPositon.x = parseInt(__start.x + __buff_x / 2 - _x);
        relationData.textPositon.y = parseInt(__start.y + __buff_y / 2 - _y);
        if (isNaN(relationData.textPositon.rotate)) {
          relationData.textPositon.rotate = 0;
          // console.log('NaN rotate:', relationData);
        }
        // this.lineProps.text = relationData.text.rotate
        __path = 'M ' + fx + ' ' + fy + ' L ' + (tx) + ' ' + (ty);
      }
      return __path;
    },
    onClick(e) {
      // RGStore.commit('setCurrentLineId', this.lineProps.id)
      this.relationGraph.onLineClick(this.linkProps, e);
    },
    isAllowShowNode: function(thisNode) {
      const _r = thisNode.isShow !== false && thisNode.isHide !== true && (!thisNode.lot.parent || this.isAllowShowNode(thisNode.lot.parent, false) === true);
      // if (derict !== false && _r === false) console.log('be hide node:', thisNode.text)
      return _r;
    },
    flash() {

    }
  }
};
</script>

<style type="">
  /*.RGLine-enter-active {*/
    /*transition: all .3s ease;*/
  /*}*/
  /*.RGLine-leave-active {*/
    /*transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
  /*}*/
  .c-rg-link-text {
    fill: #888888;
    font-size: 12px;
  }
  .c-rg-line {
    z-index: 1000;
    fill-rule: nonzero;
    /*marker-end: url('#arrow');*/
    /* firefox bug fix - won't rotate at 90deg angles */
    /*-moz-transform: rotate(-89deg) translateX(-190px);*/
    /*animation-timing-function:linear;*/
    /*animation: ACTRGLineInit 1s;*/
  }
  .c-rg-line-tool {
    stroke-dasharray: 5,5,5;
  }
  .c-rg-line-flash {
    /* firefox bug fix - won't rotate at 90deg angles */
    -moz-transform: rotate(-89deg) translateX(-190px);
    animation-timing-function:linear;
    animation: ACTRGLineChecked 10s;
  }
  @keyframes ACTRGLineInit {
    from {
      stroke-dashoffset: 10px;
      stroke-dasharray: 20,20,20;
    }

    to {
      stroke-dashoffset: 0;
      stroke-dasharray: 0,0,0;
    }
  }
  @keyframes ACTRGLineChecked {
    from {
      stroke-dashoffset: 352px;
    }

    to {
      stroke-dashoffset: 0;
    }
  }
</style>
