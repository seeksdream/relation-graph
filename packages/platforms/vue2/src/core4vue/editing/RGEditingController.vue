<template>
  <div
    v-if="options.editingController.show || options.snapshotting"
    class="rel-editing-ctrl"
    :style="{
      left: options.editingController.x + 'px',
      top: options.editingController.y + 'px',
      width: options.editingController.width + 'px',
      height: options.editingController.height + 'px',
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import RGEditingToolbar from "./RGEditingNearNodeWidget.vue";
import RGEditingResize from "./RGEditingResize.vue";
import RGEditingCreateLineHandle from "./RGEditingCreateLineHandle.vue";

export default {
  name: 'RGEditingController',
  components: {RGEditingCreateLineHandle, RGEditingResize, RGEditingToolbar},
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
