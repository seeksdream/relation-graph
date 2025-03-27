<template>
  <div
      v-show="show"
      class="rel-watermark"
      :class="['rel-watermark-' + position]"
      ref="watermarkRef"
  >
    <slot />
  </div>
</template>

<script lang="ts">

export default {
  name: 'GraphWatermark',
  components: {},
  props: {
    forImage: {
      mustUseProp: false,
      default: true,
      type: Boolean
    },
    forDisplay: {
      mustUseProp: false,
      default: true,
      type: Boolean
    },
    position: {
      mustUseProp: false,
      default: 'br',
      type: String
    },
    width: {
      mustUseProp: false,
      default: '200px',
      type: String
    },
    height: {
      mustUseProp: false,
      default: '200px',
      type: String
    }
  },
  inject: ['graph', 'graphInstance'],
  computed: {
    relationGraph() {
      return this.graphInstance();
    },
    options() {
      return this.graph.options;
    },
    show() {
      let show = false;
      if (this.options.snapshotting) {
        if (this.forImage === false) {
          show = false;
        } else {
          show = true;
        }
      } else {
        if (this.forDisplay === true) {
          show = true;
        } else {
          show = false;
        }
      }
      return show;
    }
  },
  mounted() {
    this.$refs.watermarkRef.style.setProperty('--mv-width', this.width);
    this.$refs.watermarkRef.style.setProperty('--mv-height', this.height);
    this.relationGraph.setWatermarkDom(this.$refs.watermarkRef, this.forImage, this.forDisplay, this.position);
  },
  methods: {

  },
  beforeDestroy() {
    this.relationGraph.setWatermarkDom(null, this.forImage, this.forDisplay);
  }
};
</script>

<style scoped>
</style>
