<template>
  <div>
    <div style="height:80px;line-height: 80px;border-radius: 32px;cursor: pointer;">
      <i style="font-size: 30px;" :class="node.data.myicon" />
    </div>
    <div style="color: forestgreen;font-size: 16px;position: absolute;width: 160px;height:25px;line-height: 25px;margin-top:5px;margin-left:-48px;text-align: center;background-color: rgba(66,187,66,0.2);">
      {{ node.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Slot1',
  components: { },
  props: {
    node: {
      mustUseProp: true,
      default: null,
      type: Object
    }
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
  }
};
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
.c-node-menu-item{
  line-height: 30px;padding-left: 10px;cursor: pointer;color: #444444;font-size: 14px;border-top:#efefef solid 1px;
}
.c-node-menu-item:hover{
  background-color: rgba(66,187,66,0.2);
}
</style>
