<template>
  <g>
    <!-- 常规方式 -->
    <path
      :d="pathData.path"
      class="c-rg-line"
      :class="[
            relation.styleClass,
            relation.dashType ? ('rg-line-dashtype-' + relation.dashType) : undefined,
            relation.animation ? ('rg-line-anm-' + relation.animation) : undefined,
            checked ? 'c-rg-line-checked' : undefined
        ]"
      :stroke="
        (relation.color?relation.color:options.defaultLineColor)
      "
      :style="{
        'opacity': relation.opacity,
        'stroke-width':
          (relation.lineWidth
            ? relation.lineWidth
            : options.defaultLineWidth) + 'px',
      }"
      :marker-start="showStartArrow"
      :marker-end="showEndArrow"
      fill="none"
      @touchstart.stop="onClick(relation, $event)"
      @click="onClick(relation, $event)"
    />
    <g
      v-if="
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
          fill: (relation.fontColor?relation.fontColor:(options.defaultLineFontColor ? options.defaultLineFontColor : (relation.color?relation.color:options.defaultLineColor)))
        }"
        class="c-rg-line-text"
        @touchstart.stop="onClick(relation, $event)"
        @click="onClick(relation, $event)"
      >
        {{ relation.text }}
      </text>
    </g>
  </g>
</template>

<script lang="ts">
import {devLog} from "../utils/RGCommon";

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
  inject: ['graph'],
  computed: {
    checked() {
      return this.link.seeks_id === this.options.checkedLineId;
    },
    showStartArrow() {
      return this.relation.showStartArrow && this.relationGraph.getArrow(this.relation, this.link, true);
    },
    showEndArrow() {
      return this.relation.showEndArrow && this.relationGraph.getArrow(this.relation, this.link, false);
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
