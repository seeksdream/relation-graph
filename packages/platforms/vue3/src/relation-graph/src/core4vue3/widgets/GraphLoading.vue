<script lang="ts" setup>
import {computed, inject} from "vue";
import {graphInstanceKey, graphKey} from "../../../../constants";
// const graphInstance$ = inject(graphInstanceKey)
const graph = inject(graphKey)
const options = computed(() => {
  return graph!.options!;
})
const clickGraphMask = (e) => {
  graph.instance!.clickGraphMask(e);
}
</script>
<template>
  <div
      class="rel-graph-loading"
      :class="{'rel-graph-loading-hide': !options.graphLoading}"
      @click="clickGraphMask"
  >
    <div class="rel-graph-loading-message">
      <svg class="c-graph-loading-icon" aria-hidden="true"><use xlink:href="#icon-lianjiezhong"></use></svg>
      Loading...
    </div>
  </div>
</template>
