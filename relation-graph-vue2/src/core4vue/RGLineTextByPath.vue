<template>
  <g>
    <use
        :xlink:href="'#' + relationGraph.options.instanceId + '-' + link.seeks_id + '-' + relationIndex"
        :class="['c-rg-line', checked ? 'c-rg-line-checked' : '']"
        @click="onClick(relation, $event)" />
    <text
        class="c-rg-line-text"
        :style="{fill:(checked ? relationGraph.options.checkedLineColor : (relation.fontColor?relation.fontColor:(relation.color?relation.color:undefined)))}"
        @click="onClick(relation, $event)"
        :x="textOffset"
        y="0"
    >
      <textPath :xlink:href="'#' + relationGraph.options.instanceId + '-' +  link.seeks_id + '-' + relationIndex" startOffset="0" text-anchor="start" method="align" spacing="auto"> {{ relation.text }} </textPath>
<!--      startOffset="0" text-anchor="start" method="align" spacing="auto"-->
    </text>
  </g>
</template>

<script>

import { getTextSize } from '../utils/RGCommon';
import { getNodeDistance } from '../utils/RGGraphMath';

export default {
  name: 'SeeksRGLine',
  props: {
    relationGraph: {
      mustUseProp: true,
      default: () => { return {}; },
      type: Object
    },
    link: {
      mustUseProp: true,
      default: () => { return {}; },
      type: Object
    },
    relation: {
      mustUseProp: true,
      default: () => { return {}; },
      type: Object
    },
    relationIndex: {
      mustUseProp: true,
      default: () => { return 0; },
      type: Number
    }
  },
  computed: {
    checked() {
      return this.link.seeks_id === this.relationGraph.options.checkedLineId;
    },
    textOffset() {
      const textWidth = getTextSize(this.relation.text) * 10;
      const distance = getNodeDistance(this.link.fromNode.x, this.link.fromNode.y, this.link.toNode.x, this.link.toNode.y);
      return (distance - textWidth) / 2;
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
  },
  methods: {
    onClick(line, e) {
      // RGStore.commit('setCurrentLineId', this.lineProps.id)
      this.relationGraph.onLineClick(line, this.link, e);
    },
    isAllowShowNode(thisNode) {
      const _r = thisNode.isShow !== false && thisNode.isHide !== true && (!thisNode.lot.parent || this.isAllowShowNode(thisNode.lot.parent, false) === true);
      return _r;
    },
    flash() {

    }
  }
};
</script>

<style scoped>
  /*.RGLine-enter-active {*/
    /*transition: all .3s ease;*/
  /*}*/
  /*.RGLine-leave-active {*/
    /*transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
  /*}*/
  .c-rg-line-text {
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
