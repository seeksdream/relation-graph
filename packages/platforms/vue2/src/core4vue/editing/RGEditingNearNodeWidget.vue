<template>
  <div
    class="rel-editing-bar"
    :class="['rel-editing-bar-' + position]"
  >
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'RGEditingNearNodeWidget',
  props: {
    position: {
      mustUseProp: false,
      default: 'top',
      type: String
    }
  },
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
    onMouseDown(type, $event) {
      $event.stopPropagation();
      // console.log('Resize start:', type);
      this.relationGraph.onResizeStart(type, $event);
    }
  }
};
</script>

<style scoped>
</style>
