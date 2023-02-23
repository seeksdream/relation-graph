<template>
  <path
      :id="relationGraph.options.instanceId + '-' + link.seeks_id + '-' + relationIndex"
      :d="pathData"
      :stroke="checked ? relationGraph.options.checkedLineColor : (relation.color?relation.color:relationGraph.options.defaultLineColor)"
      :style="{'stroke-width': (relation.lineWidth?relation.lineWidth:relationGraph.options.defaultLineWidth) + 'px'}"
      :marker-start="relation.showStartArrow && relationGraph.getArrow(relation, link, true)"
      :marker-end="relation.showEndArrow && relationGraph.getArrow(relation, link, false)"
      :class="[checked?'c-rg-line-checked':'']"
      fill="none" />
</template>
<script>
export default {
  name: 'SeeksRGLink',
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
    pathData() {
      const { path, textPosition } = this.relationGraph.createLinePath(
        this.link,
        this.relation,
        this.relationIndex
      );
      return path;
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
