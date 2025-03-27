<template>
  <div
    v-if="options.editingController.nodes.length === 1"
    class="rel-editing-line-handle"
    @mousedown="onMouseDown('br', $event)"
  >
    <slot />
  </div>
</template>

<script lang="ts">

export default {
  name: 'RGEditingCreateLineHandle',
  components: {},
  inject: ['graph', 'graphInstance'],
  props: {
    lineTemplate: {
      mustUseProp: false,
      default: () => { return {}; },
      type: Object
    }
  },
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
      this.relationGraph.startCreateLineByTemplate(type, this.lineTemplate, $event);
    }
  }
};
</script>

<style scoped>
</style>
