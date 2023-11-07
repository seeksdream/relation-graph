<template>
  <g>
    <use
        :xlink:href="pathRef"
        class="c-rg-line"
        :class="[
            relation.styleClass,
            relation.dashType ? ('rg-line-dashtype-' + relation.dashType) : undefined,
            relation.animation ? ('rg-line-anm-' + relation.animation) : undefined,
            checked ? 'c-rg-line-checked' : undefined
        ]"
        @touchstart.stop="onClick(relation, $event)"
        @click="onClick(relation, $event)" />
    <g
        :transform="textOffset"
        >
      <text
          class="c-rg-line-text"
          :style="{
            opacity: relation.opacity,
            fill:(relation.fontColor?relation.fontColor:(options.defaultLineFontColor ? options.defaultLineFontColor : (relation.color?relation.color:options.defaultLineColor)))
          }"
          @touchstart.stop="onClick(relation, $event)"
          @click="onClick(relation, $event)"
      >
      <textPath :xlink:href="pathRef" :startOffset="textHPosition" :text-anchor="textAnchor" method="align" spacing="auto"> {{ relation.text }} </textPath>
    </text>
    </g>
  </g>
</template>

<script lang="ts">
export default {
  name: 'SeeksRGLine',
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
    textOffset() {
      const x = this.relation.textOffset_x || this.options.defaultLineTextOffset_x || 0;
      const y = this.relation.textOffset_y || this.options.defaultLineTextOffset_y || -8;
      return `translate(${x},${y})`
    },
    pathRef() {
      return '#' + this.options.instanceId + '-' +  this.link.seeks_id + '-' + this.relationIndex;
    },
    checked() {
      return this.link.seeks_id === this.options.checkedLineId;
    },
    textAnchor() {
      if (this.relation.lineShape === 4 || this.options.defaultLineShape === 4) {
        return 'start';
      }
      return 'middle';
    },
    textHPosition() {
      if (this.relation.lineShape === 4 || this.options.defaultLineShape === 4) {
        if (this.options.layoutDirection === 'v') {
          const fx = this.link.fromNode.x;
          const tx = this.link.toNode.x;
          return Math.abs(tx - fx) + 43;
        } else {
          const fy = this.link.fromNode.y;
          const ty = this.link.toNode.y;
          return Math.abs(ty - fy) + 43;
        }
      }
      return '50%';
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
  watch: {
  },
  mounted() {
  },
  methods: {
    onClick(line, e) {
      // RGStore.commit('setCurrentLineId', this.lineProps.id)
      this.relationGraph.onLineClick(line, this.link, e);
    }
  }
};
</script>

<style scoped>
</style>
