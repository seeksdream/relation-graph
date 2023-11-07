<template>
  <div v-if="options && (options.creatingNodePlot || options.creatingSelection)" class="rel-operate">
    <div style="position: relative;">
      <SeeksRGNode v-if="options.creatingNodePlot && options.showTemplateNode" :node-props="options.newNodeTemplate">
        <template #node>
          <slot :node="options.newNodeTemplate" name="node-template" />
        </template>
      </SeeksRGNode>
      <div
          v-if="options.creatingSelection"
          class="rel-selection"
          :style="{
            left: options.selectionView.x + 'px',
            top: options.selectionView.y + 'px',
            width: options.selectionView.width + 'px',
            height: options.selectionView.height + 'px',
          }"
      >

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SeeksRGNode from "../RGNode.vue";

export default {
  name: 'GraphOperateStuff',
  components: {SeeksRGNode},
  inject: ['graph'],
  computed: {
    relationGraph() {
      return this.graph.instance;
    },
    options() {
      return this.graph.options;
    }
  },
  mounted() {
  },
  methods: {

  }
};
</script>

<style scoped>
</style>
