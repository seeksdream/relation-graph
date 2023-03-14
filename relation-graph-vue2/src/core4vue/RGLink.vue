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
    isAllowShowNode(thisNode) {
      const _r = thisNode.isShow !== false && thisNode.isHide !== true && (!thisNode.lot.parent || this.isAllowShowNode(thisNode.lot.parent) === true);
      return _r;
    },
    flash() {

    }
  }
};
</script>

<style scoped>
</style>
