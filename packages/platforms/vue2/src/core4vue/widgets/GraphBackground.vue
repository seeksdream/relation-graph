<template>
  <div v-show="show" class="rel-background" ref="backgroundRef">
    <slot />
  </div>
</template>

<script lang="ts">

export default {
  name: 'GraphBackground',
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
    }
  },
  inject: ['graph', 'graphInstance'],
  data() {
    return {
      originBackgroundColor: '',
      originBackgroundImage: '',
    };
  },
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
        if (this.forDisplay === false) {
          show = false;
        } else {
          show = true;
        }
      }
      return show;
    }
  },
  mounted() {
    this.originBackgroundColor = this.options.backgroundColor;
    this.originBackgroundImage = this.options.backgroundImage;
    this.options.backgroundColor = 'transparent';
    this.options.backgroundImage = '';
    this.relationGraph.setBackgroundDom(this.$refs.backgroundRef, this.forImage, this.forDisplay);
  },
  methods: {

  },
  beforeDestroy() {
    this.options.backgroundColor = this.originBackgroundColor;
    this.options.backgroundImage = this.originBackgroundImage;
    this.relationGraph.setBackgroundDom(null, this.forImage, this.forDisplay);
  }
};
</script>

<style scoped>
</style>
