<template>
  <div>
    <div style="width:200px;cursor: pointer;text-align: left;padding:0px;">
      <div style="padding-left:10px;">
        净资产收益率
      </div>
      <div style="background-color: #ffffff;height: 80px;color:#555555;padding-left:10px;padding-top:10px;border-radius: 8px;">
        <div style="border-bottom: #efefef solid 1px;">
          当期【2022年12月】：12%
        </div>
        <div style="border-bottom: #efefef solid 1px;">
          同比：30% <i style="color:#ff0000" class="el-icon-top" />
        </div>
        <div style="border-bottom: #efefef solid 1px;">
          环比：10% <i style="color:green" class="el-icon-bottom" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Slot4',
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
