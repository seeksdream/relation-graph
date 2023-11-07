<template>
  <g
      v-if="linkProps.isHide !== true && isAllowShowNode(linkProps.fromNode) && isAllowShowNode(linkProps.toNode)"
      :class="[options.checkedLineId==linkProps.seeks_id?'c-rg-link-checked':'']"
      ref="seeksRGLink"
      transform="translate(0,0)"
      class="rel-link-peel"
      :data-id="linkProps.seeks_id"
  >
    <template v-for="(thisRelation, ri) in linkProps.relations">
      <template v-if="options.oldVueVersion && !options.ovUseLineSlot">
        <RGLineTextByPath v-if="(options.lineUseTextPath || thisRelation.useTextPath) && thisRelation.isHide === false" :key="'l-'+thisRelation.id" :link="linkProps" :relation="thisRelation" :relation-index="ri" />
        <RGLineSmart v-else-if="thisRelation.isHide === false" :key="'l-'+thisRelation.id" :link="linkProps" :relation="thisRelation" :relation-index="ri" />
      </template>
      <slot v-else name="line" :line="thisRelation" :relation-index="ri">
        <RGLineTextByPath v-if="(options.lineUseTextPath || thisRelation.useTextPath) && thisRelation.isHide === false" :key="'l-'+thisRelation.id" :link="linkProps" :relation="thisRelation" :relation-index="ri" />
        <RGLineSmart v-else-if="thisRelation.isHide === false" :key="'l-'+thisRelation.id" :link="linkProps" :relation="thisRelation" :relation-index="ri" />
      </slot>
    </template>
  </g>
</template>

<script lang="ts">
import RGLineSmart from './RGLineSmart';
import RGLineTextByPath from './RGLineTextByPath';
import RGNodesAnalytic from "../utils/RGNodesAnalytic";

export default {
  name: 'SeeksRGLink',
  components: { RGLineSmart, RGLineTextByPath },
  props: {
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
  inject: ['graph'],
  computed: {
    options() {
      return this.graph.options;
    },
    relationGraph() {
      return this.graph.instance;
    }
  },
  show() {
    this.isShow = true;
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    isAllowShowNode(thisNode) {
      return RGNodesAnalytic.isAllowShowNode(thisNode);
    }
  }
};
</script>

<style scoped>
</style>
