<template>
  <div
    v-if="options.nodeConnectController.show"
    class="rel-editing-connect-ctrl"
    :style="{
      left: options.nodeConnectController.x + 'px',
      top: options.nodeConnectController.y + 'px',
      width: options.nodeConnectController.width + 'px',
      height: options.nodeConnectController.height + 'px',
    }"
  >
    <slot>
      <RGEditingConnectPoints />
    </slot>
  </div>
</template>

<script lang="ts">
import RGEditingConnectPoints from "./RGEditingConnectPoints.vue";

export default {
  name: 'RGEditingConnectController',
  components: {RGEditingConnectPoints},
  inject: ['graph', 'graphInstance'],
  computed: {
    options() {
      return this.graph.options;
    },
    relationGraph() {
      return this.graphInstance();
    }
  },
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>

<style scoped>
</style>
