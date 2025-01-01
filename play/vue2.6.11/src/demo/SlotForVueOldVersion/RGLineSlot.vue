<template>
  <g>
    <!-- 常规方式 -->
    <path
      :d="pathData.path"
      :class="['c-rg-line', relation.styleClass, checked ? 'c-rg-line-checked' : '']"
      :stroke="
        checked
          ? options.checkedLineColor
          : relation.color
          ? relation.color
          : options.defaultLineColor
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
      @click="onClick(relation, $event)"
    />
    <g
      v-if="
        options.defaultShowLineLabel &&
        options.canvasZoom > 40
      "
      :transform="pathData.textTransform"
    >
      <rect
        :key="'t-' + relation.seeks_id"
        rx="15" ry="15"
        :x="-30"
        :y="-15"
        :style="{
          opacity: relation.opacity,
          fill: checked
            ? options.checkedLineColor
            : relation.fontColor
            ? relation.fontColor
            : relation.color
            ? relation.color
            : undefined,
        }"
        class="c-rg-line-text-bg"
        @click="onClick(relation, $event)"
      >
      </rect>
      <text
          :x="0"
          :y="4"
          :style="{
          opacity: relation.opacity
        }"
          class="c-rg-line-text"
          @click="onClick(relation, $event)"
      >
        {{ relation.text }}
      </text>
    </g>
  </g>
</template>

<script>
export default {
  name: 'RGLineSlot',
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
      return this.relation.id === this.options.checkedLineId;
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
        }
        return {
          path,
          textTransform
        };
      } catch (e) {
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
  },
};
</script>
