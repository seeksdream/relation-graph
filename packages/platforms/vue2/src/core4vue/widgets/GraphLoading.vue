<template>
  <div
      class="rel-graph-loading"
      :class="{'rel-graph-loading-hide': !options.graphLoading}"
      @click="clickGraphMask"
  >
    <div v-if="options.graphLoadingText" class="rel-graph-loading-message">
      <svg class="c-graph-loading-icon" aria-hidden="true"><use xlink:href="#icon-lianjiezhong"></use></svg>
      {{options.graphLoadingText || 'Loading...'}}
    </div>
  </div>
</template>

<script lang="ts">

export default {
  name: 'GraphLoading',
  data() {
    return {
    };
  },
  inject: ['graph', 'graphInstance'],
  computed: {
    relationGraph() {
      return this.graphInstance();
    },
    options() {
      return this.graph.options;
    }
  },
  methods: {
    clickGraphMask(e) {
      this.relationGraph.clickGraphMask(e);
    }
  }
};
</script>
