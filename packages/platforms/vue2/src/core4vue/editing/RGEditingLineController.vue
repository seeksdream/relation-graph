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

<script lang="ts">

export default {
  name: 'RGEditingLineController',
  components: {},
  inject: ['graph', 'graphInstance'],
  props: {
    textEditable: {
      mustUseProp: false,
      default: false
    }
  },
  computed: {
    options() {
      return this.graph.options;
    },
    relationGraph() {
      return this.graphInstance();
    },
    show() {
      return this.options.editingLineController.show;
    },
    text() {
      return this.options.editingLineController.line && this.options.editingLineController.line.text;
    }
  },
  data() {
    return {
      lineText: '',
      editing: false
    };
  },
  watch: {
    show(newValue:string) {
      if (!newValue) {
        this.editing = false;
        this.lineText = '';
      }
    },
    text(newValue:string) {
      if (newValue) {
        this.lineText = newValue;
        this.$nextTick(() => {
          this.relationGraph.updateEditingLineView();
        });
      }
    }
  },
  methods: {
    onMouseDown(type, $event) {
      this.relationGraph.startMoveLineVertex(type, $event);
    },
    startMoveText($event) {
      this.relationGraph.startMoveLineText($event);
    },
    startEditingLineText($event) {
      this.editing = !this.editing;
    },
    onLineTextChange($event) {
      const line = this.options.editingLineController.line;
      if (line) {
        line.text = $event.target.value;
      }
    }
  }
};
</script>

<style scoped>
</style>
