<template>
  <path
      :id="options.instanceId + '-' + relation.id"
      :d="pathData"
      :marker-start="relationGraph.getArrow(relation, link, true)"
      :marker-end="relationGraph.getArrow(relation, link, false)"
      :class="['c-rg-line-path', relation.styleClass, checked?'c-rg-line-checked':'']"
      :style="style"
  />
</template>
<script lang="ts">
export default {
  name: 'RGLinePath',
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
  inject: ['graph', 'graphInstance'],
  computed: {
    checked() {
      return this.relation.id === this.options.checkedLineId;
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
      return this.graphInstance();
    },
    style() {
      const lineWidth = this.relation.lineWidth !== undefined ? this.relation.lineWidth : (this.options.defaultLineWidth || 1);
      const lineColor = this.relation.color ? this.relation.color : this.options.defaultLineColor;
      return this.options.snapshotting ? {
        stroke: lineColor,
        opacity: this.relation.opacity,
        strokeWidth: lineWidth + 'px',
        pointerEvents: (this.relation.disableDefaultClickEffect ? 'none' : undefined),
        fill: this.relation.lineShape === 8 ? lineColor : 'none'
      } : {};
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
