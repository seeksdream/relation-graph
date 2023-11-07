<template>
  <div style="height:80px;width:80px;border-radius: 50%;cursor: pointer;background-color: #00bb00;padding-top:5px;border:#00bb00 solid 1px;overflow: hidden;">
    <div style="background-color: #ffffff;color:#00bb00;font-size: 12px;line-height: 20px;">
      标签
    </div>
    <div style="line-height: 30px;font-size: 18px;">
      {{node.data.name}}
    </div>
    <div style="background-color: #bbbb00;color:#ffffff;font-size: 12px;line-height: 20px;">
      借款人
    </div>
  </div>
</template>

<script>
export default {
  name: 'Slot5',
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
