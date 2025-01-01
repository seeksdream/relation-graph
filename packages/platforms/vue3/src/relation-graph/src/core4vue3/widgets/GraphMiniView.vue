<script lang="ts" setup>
import { inject, ref } from 'vue';
const viewWidth = ref(100);
const viewHeight = ref(0);
const viewValues = {
  minX: 9999,
  maxX: -9999,
  minY: 9999,
  maxY: -9999
};
</script>
<template>
  <div ref="miniView" class="c-mini-graph">
  </div>
</template>
