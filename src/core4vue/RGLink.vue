<template>
  <g v-if="linkProps.isHide !== true && isAllowShowNode(linkProps.fromNode) && isAllowShowNode(linkProps.toNode)" :class="[relationGraph.options.checkedLineId==linkProps.seeks_id?'c-rg-link-checked':'']" ref="seeksRGLink" transform="translate(0,0)">
    <template v-for="(thisRelation, ri) in linkProps.relations">
      <slot name="line" :line="thisRelation" :relation-index="ri">
        <RGLineTextByPath v-if="(relationGraph.options.lineUseTextPath || thisRelation.useTextPath) && thisRelation.isHide === false" :key="'l-'+thisRelation.id" :relation-graph="relationGraph" :link="linkProps" :relation="thisRelation" :relation-index="ri" />
        <RGLineSmart v-else-if="thisRelation.isHide === false" :key="'l-'+thisRelation.id" :relation-graph="relationGraph" :link="linkProps" :relation="thisRelation" :relation-index="ri" />
      </slot>
    </template>
  </g>
</template>

<script>
import RGLineSmart from './RGLineSmart';
import RGLineTextByPath from './RGLineTextByPath';
export default {
  name: 'SeeksRGLink',
  components: { RGLineSmart, RGLineTextByPath },
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
  },
  methods: {
    onClick(line, e) {
      // RGStore.commit('setCurrentLineId', this.lineProps.id)
      this.relationGraph.onLineClick(line, this.linkProps, e);
    },
    isAllowShowNode: function(thisNode) {
      const _r = thisNode.isShow !== false && thisNode.isHide !== true && (!thisNode.lot.parent || this.isAllowShowNode(thisNode.lot.parent) === true);
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
