<template>
  <div :style="{'margin-topd':(graphSetting.viewSize.height-height)+'px', height: height+'px', 'margin-top': -height+'px' }" class="c-rg-bottom-panel">
    <slot name="bottomPanel" />
  </div>
</template>

<script>
// import SeeksRGStore from './core4vue/SeeksRGStore'
// import { mapState } from 'vuex'
// var _parent = this.$parent
// console.log('GraphSettingPanel.vue:', _parent)
export default {
  name: 'GraphBottomPanel',
  props: {
    graphSetting: {
      mustUseProp: true,
      default: () => { return {} },
      type: Object
    }
  },
  data() {
    return {
      height: 50,
      search_text: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.height = this.$slots['bottomPanel'][0].elm.offsetHeight
      if (window.SeeksGraphDebug) console.log('SeeksGraph bootomPanel height:', this.height)
    })
  },
  methods: {
  }
}
</script>

<style scoped>
  .c-rg-bottom-panel{
    width:100%;
    margin-left:0px;
    font-size: 12px;
    color: #1890ff;
    padding:0px;
    overflow: hidden;
    border-radius: 0px;
    position: absolute;
    z-index: 99;
    opacity: 1;
  }
  .c-fixedLayout{
    position: fixed;
    bottom:0px;
  }
</style>
