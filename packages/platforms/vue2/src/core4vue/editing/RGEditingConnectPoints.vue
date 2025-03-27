<template>
  <div
    class="rel-connect-ctl"
  >
    <div class="rel-connect-ctl-handler rel-connect-ctl-t" data-point="top" @mouseup="onMouseUp('top', $event)"></div>
    <div class="rel-connect-ctl-handler rel-connect-ctl-b" data-point="bottom" @mouseup="onMouseUp('bottom', $event)"></div>
    <div class="rel-connect-ctl-handler rel-connect-ctl-center" data-point="border" @mouseup="onMouseUp('border', $event)"></div>
    <div class="rel-connect-ctl-handler rel-connect-ctl-l" data-point="left" @mouseup="onMouseUp('left', $event)"></div>
    <div class="rel-connect-ctl-handler rel-connect-ctl-r" data-point="right" @mouseup="onMouseUp('right', $event)"></div>
    <div class="rel-connect-ctl-handler rel-connect-ctl-lr" data-point="lr" @mouseup="onMouseUp('lr', $event)"></div>
    <div class="rel-connect-ctl-handler rel-connect-ctl-tb" data-point="tb" @mouseup="onMouseUp('tb', $event)"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'RGEditingConnectPoints',
  components: {},
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
    onMouseUp(type, $event) {
      this.relationGraph.onLineVertexBeDropped(type, $event);
    }
  }
};
</script>

<style scoped>
</style>
