<template>
  <div :class="[('c-expand-positon-' + expandHolderPosition)]" class="c-btn-open-close">
    <span
        :class="expandButtonClass"
        :style="{ 'background-color': color }"
        @click.stop="expandOrCollapseNode"
        @touchend.stop="expandOrCollapseNode"
    >
    </span>
  </div>
</template>

<script lang="ts">
export default {
  name: 'RGNodeExpandHolder',
  props: {
    nodeProps: {
      type: Object,
      required: true
    },
    expandButtonClass: {
      type: String,
      required: true
    },
    expandOrCollapseNode: {
      type: Function,
      required: true
    },
    expandHolderPosition: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  }
}
</script>
