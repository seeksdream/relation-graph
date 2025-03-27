<template>
  <div
    v-if="show"
    class="rel-editing-line-ctrl"
  >
    <slot />
    <div class="rel-line-ctrl-dot start-dot"
         :style="{
            left: options.editingLineController.startPoint.x + 'px',
            top: options.editingLineController.startPoint.y + 'px'
          }"
         @mousedown="onMouseDown('start', $event)"
    ></div>
    <div class="rel-line-ctrl-dot end-dot"
         :style="{
            left: options.editingLineController.endPoint.x + 'px',
            top: options.editingLineController.endPoint.y + 'px'
          }"
         @mousedown="onMouseDown('end', $event)"
    ></div>
    <div v-if="textEditable && options.editingLineController.line"
         :class="['rel-line-ctrl-text', (editing && 'rel-line-ctrl-text-editing')]"
         :style="{
            width: options.editingLineController.text.width + 'px',
            height: options.editingLineController.text.height + 'px',
            left: options.editingLineController.text.x + 'px',
            top: options.editingLineController.text.y + 'px'
          }"
         @dblclick="startEditingLineText"
         @mousedown="startMoveText($event)"
    >
      <span v-if="!editing">{{text}}</span>
      <input v-else class="rel-line-text-input" v-model="lineText" @blur="onLineTextChange" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {RGLineEditPoint, RGUserEvent} from "../../../../types";
import {computed, inject, nextTick, ref, watch} from "vue";
import {graphKey} from "../../../../constants";
const props = defineProps<{
  textEditable?: boolean
}>(); // RGWatermarkProps
const graph = inject(graphKey)
const options = computed(() => {
  return graph!.options!;
})
const graphInstance = computed(() => {
  return graph!.instance!;
})
const show = computed(() => {
  return options.value.editingLineController.show;
})
const text = computed(() => {
  return options.value.editingLineController.line && options.value.editingLineController.line.text;
})
const editing = ref(false);
const lineText = ref('');
watch([show], () => {
  if (!show.value) {
    editing.value = false;
    lineText.value = '';
  }
});
watch([text], () => {
  if (text.value) {
    lineText.value = text.value;
    nextTick(() => {
      graphInstance.value.updateEditingLineView();
    });
  }
});
const onMouseDown = (type: RGLineEditPoint, $event: RGUserEvent) => {
  graphInstance.value.startMoveLineVertex(type, $event);
}
const startMoveText = ($event: RGUserEvent) => {
  graphInstance.value.startMoveLineText($event);
}
const startEditingLineText = ($event: RGUserEvent) => {
  editing.value = !editing.value;
}
const onLineTextChange = ($event: RGUserEvent) => {
  const line = options.value.editingLineController.line;
  if (line) {
    line.text = lineText.value;
  }
}
</script>
