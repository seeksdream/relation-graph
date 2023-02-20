<template>
  <div>
    <i style="font-size: 80px;color:rgba(255, 120, 0, 1);" :class="node.data.myicon" />
  </div>
</template>

<script>
export default {
  name: 'Slot3',
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
.c-person-pic{
  width: 120px;
  border-radius: 50%;
  margin-top:10px;
}
</style>
