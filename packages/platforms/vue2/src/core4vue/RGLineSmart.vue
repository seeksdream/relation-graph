<template>
  <g :class="[relation.className]">
    <path
      :d="pathData.path"
      class="c-rg-line-bg"
      :style="{
        pointerEvents: (relation.disableDefaultClickEffect ? 'none' : undefined),
        strokeWidth: (lineWidth < 8 ? 8 : lineWidth) + 'px'
      }"
      @touchstart="onClick(relation, $event)"
      @click="onClick(relation, $event)"
    />
    <path
      :d="pathData.path"
      class="c-rg-line"
      :class="[
            relation.styleClass,
            relation.dashType ? ('rg-line-dashtype-' + relation.dashType) : undefined,
            relation.animation ? ('rg-line-anm-' + relation.animation) : undefined,
            checked ? 'c-rg-line-checked' : undefined
        ]"
      :style="{
          'stroke': relation.color?relation.color:options.defaultLineColor,
          'opacity': relation.opacity,
          'pointer-events': (relation.disableDefaultClickEffect && 'none'),
          'stroke-width': lineWidth + 'px',
          'fill': relation.lineShape === 8 ? (relation.color || options.defaultLineColor) : 'none'
        }"
      :stroke="
        (relation.color?relation.color:options.defaultLineColor)
      "
      :marker-start="showStartArrow"
      :marker-end="showEndArrow"
      @touchstart="onClick(relation, $event)"
      @click="onClick(relation, $event)"
    />
    <g
      v-if="
      textStyle &&
        options.defaultShowLineLabel &&
        options.canvasZoom > 40
      "
      :transform="pathData.textTransform"
    >
      <text
        :key="'t-' + relation.seeks_id"
        :x="relation.textOffset_x || options.defaultLineTextOffset_x || 0"
        :y="relation.textOffset_y || options.defaultLineTextOffset_y || 10"
        :style="{
          opacity: relation.opacity,
          fill: (relation.fontColor?relation.fontColor:(options.defaultLineFontColor ? options.defaultLineFontColor : (relation.color?relation.color:options.defaultLineColor))),
          'pointer-events': (relation.disableDefaultClickEffect && 'none')
        }"
        :text-anchor="textStyle.textAnchor"
        class="c-rg-line-text"
        :class="{'c-rg-line-text-checked' : checked}"
        @touchstart="onClick(relation, $event)"
        @click="onClick(relation, $event)"
      >
        {{ textStyle.text }}
      </text>
    </g>
  </g>
</template>

<script lang="ts">
import {devLog} from "../../../../relation-graph-models/utils/RGCommon";

export default {
  name: 'SeeksRGLine',
  props: {
    link: {
      mustUseProp: true,
      default: () => {
        return {};
      },
      type: Object,
    },
    relation: {
      mustUseProp: true,
      default: () => {
        return {};
      },
      type: Object,
    },
    relationIndex: {
      mustUseProp: true,
      default: () => {
        return 0;
      },
      type: Number,
    },
  },
  data() {
    return {
      is_flashing: false,
    };
  },
  inject: ['graph', 'graphInstance'],
  computed: {
    checked() {
      return this.relation.id === this.options.checkedLineId;
    },
    options() {
      return this.graph.options;
    },
    lineWidth() {
      return (this.relation.lineWidth
        ? this.relation.lineWidth
        : this.options.defaultLineWidth);
    },
    relationGraph() {
      return this.graphInstance();
    },
      showStartArrow() {
          return this.relationGraph.getArrow(this.relation, this.link, true);
      },
      showEndArrow() {
          return this.relationGraph.getArrow(this.relation, this.link, false);
      },
      pathData() {
          try {
              const { path, textPosition } = this.relationGraph.createLinePath(
                  this.link,
                  this.relation,
                  this.relationIndex
              );
              let textTransform = {}
              try {
                  textTransform = this.relationGraph.getTextTransform(
                      this.relation,
                      textPosition.x,
                      textPosition.y,
                      textPosition.rotate
                  )
              } catch (e) {
                  devLog(e);
              }
              return {
                  path,
                  textTransform
              };
          } catch (e) {
              devLog(e);
          }
          return {path:null, textTransform: null};
      },
      textStyle() {
          return this.relationGraph.getLineTextStyle(this.link, this.relation, this.relationIndex);
      },
  },
  watch: {},
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
