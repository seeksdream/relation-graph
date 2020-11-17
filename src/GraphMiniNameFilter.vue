<template>
  <div :style="{'margin-left':(graphSetting.viewELSize.width-350)+'px'}" class="c-mini-namefilter">
    <!--    <el-autocomplete-->
    <!--      v-model="$parent.search_text"-->
    <!--      :fetch-suggestions="$parent.querySearchAsync"-->
    <!--      :trigger-on-focus="false"-->
    <!--      :label="'xxxx'"-->
    <!--      size="small"-->
    <!--      placeholder="图谱节点定位，请输入节点名称"-->
    <!--      clearable-->
    <!--      style="width: 320px;box-shadow: 0px 0px 8px #cccccc;"-->
    <!--      @select="$parent.handleSelect"-->
    <!--    >-->
    <!--      <template slot-scope="{ item }">-->
    <!--        <div class="c-suggestion-name">{{ item.text }}</div>-->
    <!--      </template>-->
    <!--      <el-button slot="append" style="color: #2E4E8F;" icon="el-icon-search" />-->
    <!--    </el-autocomplete>-->
  </div>
</template>

<script>
export default {
  name: 'GraphMiniNameFilter',
  props: {
    graphSetting: {
      mustUseProp: true,
      default: () => { return {} },
      type: Object
    }
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>
<style scoped>
  .c-mini-namefilter{
    height:60px;
    position: absolute;
    margin-top:10px;
    z-index: 999;
  }
  .c-fixedLayout{
    position: fixed;
    top:145px;
  }
</style>
