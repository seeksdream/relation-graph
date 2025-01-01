<template>
  <path
      :id="options.instanceId + '-' + link.seeks_id + '-' + relationIndex"
      :d="pathData"
      :marker-start="relationGraph.getArrow(relation, link, true)"
      :marker-end="relationGraph.getArrow(relation, link, false)"
      :class="['c-rg-line-path', relation.styleClass, checked?'c-rg-line-checked':'']"
  />
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
