<template>
  <path
      :id="options.instanceId + '-' + link.seeks_id + '-' + relationIndex"
      :d="pathData"
      :stroke="(relation.color?relation.color:options.defaultLineColor)"
      :style="{'opacity': relation.opacity, 'stroke-width': (relation.lineWidth?relation.lineWidth:options.defaultLineWidth) + 'px'}"
      :marker-start="relation.showStartArrow && relationGraph.getArrow(relation, link, true)"
      :marker-end="relation.showEndArrow && relationGraph.getArrow(relation, link, false)"
      :class="['c-rg-line-path', relation.styleClass, checked?'c-rg-line-checked':'']"
      fill="none" />
</template>
<script lang="ts">
export default {
  name: 'SeeksRGLink',
  props: {
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
  inject: ['graph'],
  computed: {
    checked() {
      return this.link.seeks_id === this.options.checkedLineId;
    },
    pathData() {
      const { path, textPosition } = this.relationGraph.createLinePath(
        this.link,
        this.relation,
        this.relationIndex
      );
      return path;
    },
    options() {
      return this.graph.options;
    },
    relationGraph() {
      return this.graph.instance;
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
  methods: {
  }
};
</script>
