<template>
  <g :class="[relation.className]" :data-id="relation.id">
    <use
      :xlink:href="pathRef"
      class="c-rg-line-bg"
      :style="{
        pointerEvents: (relation.disableDefaultClickEffect ? 'none' : undefined),
        strokeWidth: (lineWidth < 8 ? 8 : lineWidth) + 'px'
      }"
      @touchstart="onClick(relation, $event)"
      @click="onClick(relation, $event)"
    />
    <use
        :xlink:href="pathRef"
        class="c-rg-line"
        :class="[
            relation.styleClass,
            relation.dashType ? ('rg-line-dashtype-' + relation.dashType) : undefined,
            relation.animation ? ('rg-line-anm-' + relation.animation) : undefined,
            checked ? 'c-rg-line-checked' : undefined
        ]"
        :style="{
          stroke: lineColor,
          opacity: relation.opacity,
          strokeWidth: lineWidth + 'px',
          pointerEvents: (relation.disableDefaultClickEffect ? 'none' : undefined),
          fill: relation.lineShape === 8 ? (relation.color || options.defaultLineColor) : 'none'
        }"
        @touchstart="onClick(relation, $event)"
        @click="onClick(relation, $event)" />
    <g
        v-if="
        textStyle &&
        options.defaultShowLineLabel &&
        options.canvasZoom > 40
      "
        :transform="textStyle.textOffset"
        >
      <text
          class="c-rg-line-text"
          :class="{'c-rg-line-text-checked' : checked}"
          :style="{
            opacity: relation.opacity,
            fill:(relation.fontColor?relation.fontColor:(options.defaultLineFontColor ? options.defaultLineFontColor : (relation.color?relation.color:options.defaultLineColor))),
            pointerEvents: (relation.disableDefaultClickEffect ? 'none' : undefined)
          }"
          :rotate="textStyle.textRotate"
          @touchstart="onClick(relation, $event)"
          @click="onClick(relation, $event)"
      >
      <textPath :xlink:href="pathRef"
                :startOffset="textStyle.textHPosition"
                :text-anchor="textStyle.textAnchor"
                method="align"
                spacing="auto"
      > {{ textStyle.text }} </textPath>
    </text>
    </g>
  </g>
</template>

<script lang="ts">

export default {
  name: 'RGLineTextByPath',
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
      options() {
          return this.graph.options;
      },
      relationGraph() {
        return this.graphInstance();
      },
      lineWidth() {
        return (this.relation.lineWidth
          ? this.relation.lineWidth
          : this.options.defaultLineWidth);
      },
      lineColor() {
        return this.relation.color ? this.relation.color : this.options.defaultLineColor;
      },
      checked() {
        return this.relation.id === this.options.checkedLineId;
      },
      textStyle() {
          return this.relationGraph.getLineTextStyle(this.link, this.relation, this.relationIndex);
      },
      pathRef() {
          return '#' + this.options.instanceId + '-' +  this.relation.id;
      },
    //   textOffset() {
    //       const x = this.relation.textOffset_x || this.options.defaultLineTextOffset_x || 0;
    //       const y = this.relation.textOffset_y || this.options.defaultLineTextOffset_y || -8;
    //       return `translate(${x},${y})`
    //   },
    // textAnchor() {
    //   if (this.relation.lineShape === 4 || this.options.defaultLineShape === 4) {
    //     return 'start';
    //   }
    //   return 'middle';
    // },
    // textHPosition() {
    //   if (this.relation.lineShape === 4 || this.options.defaultLineShape === 4) {
    //     if (this.options.layoutDirection === 'v') {
    //       const fx = this.link.fromNode.x;
    //       const tx = this.link.toNode.x;
    //       return Math.abs(tx - fx) + 43;
    //     } else {
    //       const fy = this.link.fromNode.y;
    //       const ty = this.link.toNode.y;
    //       return Math.abs(ty - fy) + 43;
    //     }
    //   }
    //   return '50%';
    // },
    // textRotate() {
    //   const fx = this.link.fromNode.x;
    //   const tx = this.link.toNode.x;
    //   if (fx > tx) {
    //     return 180;
    //   }
    //   return 0;
    // }
  },
  data() {
    return {
      is_flashing: false
    };
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
