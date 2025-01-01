<template>
  <div v-if="!nodeProps.innerHTML" :style="{'color':(nodeProps.fontColor || options.defaultNodeFontColor)}" class="c-node-text">
    <span v-html="nodeProps.text" />
  </div>
  <div v-else v-html="nodeProps.innerHTML" />
</template>

<script>
export default {
  name: 'RGNodeSlot',
  props: {
    nodeProps: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
    };
  },
  computed: {
  },
  watch: {},
  methods: {
  }
};
</script>
