<template>
  <div>
    <div style="width:200px;height: 200px;cursor: pointer;text-align: left;padding:10px;">
      <div style="border-bottom: #ffffff solid 1px;">
        <i style="font-size: 12px;" class="el-icon-user" /> 姓名：{{ node.data.name }}
      </div>
      <div style="border-bottom: #ffffff solid 1px;">
        职位：普通员工
      </div>
      照片：
      <img class="c-person-pic" :src="node.data.pic" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Slot2',
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
