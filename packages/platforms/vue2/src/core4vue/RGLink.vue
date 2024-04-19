<template>
  <g
      v-if="isAllowShowNode(linkProps.fromNode) && isAllowShowNode(linkProps.toNode)"
      :class="[options.checkedLinkId==linkProps.seeks_id?'c-rg-link-checked':'']"
      ref="seeksRGLink"
      transform="translate(0,0)"
      class="rel-link-peel"
      :data-id="linkProps.seeks_id"
  >
    <template v-for="(thisRelation, ri) in linkProps.relations">
      <template v-if="options.oldVueVersion && !options.ovUseLineSlot">
        <RGLineTextByPath v-if="(thisRelation.useTextPath !== undefined ? thisRelation.useTextPath : options.lineUseTextPath) && thisRelation.isHide !== true" :key="'l-'+thisRelation.id" :link="linkProps" :relation="thisRelation" :relation-index="ri" />
        <RGLineSmart v-else-if="thisRelation.isHide === false" :key="'l-'+thisRelation.id" :link="linkProps" :relation="thisRelation" :relation-index="ri" />
      </template>
      <slot v-else name="line" :line="thisRelation" :relation-index="ri">
        <RGLineTextByPath v-if="(thisRelation.useTextPath !== undefined ? thisRelation.useTextPath : options.lineUseTextPath) && thisRelation.isHide !== true" :key="'l-'+thisRelation.id" :link="linkProps" :relation="thisRelation" :relation-index="ri" />
        <RGLineSmart v-else-if="thisRelation.isHide === false" :key="'l-'+thisRelation.id" :link="linkProps" :relation="thisRelation" :relation-index="ri" />
      </slot>
    </template>
  </g>
</template>

<script lang="ts">
import RGLineSmart from './RGLineSmart.vue';
import RGLineTextByPath from './RGLineTextByPath.vue';
import RGNodesAnalytic from "../../../../relation-graph-models/utils/RGNodesAnalytic";

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
  inject: ['graph', 'graphInstance'],
  computed: {
    options() {
      return this.graph.options;
    },
    relationGraph() {
      return this.graphInstance();
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
