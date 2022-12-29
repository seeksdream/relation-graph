<template>
  <div>
    <rg-header title="Relation Graph " />
    <div style="padding:50px;padding-top:50px;padding-bottom:5px;font-size: 18px;color: #666666;">如果觉得有用，请在github上点一颗小星星：</div>
    <div style="padding:50px;padding-top:5px;padding-bottom:5px;font-size: 18px;color: #666666;"><el-link href="https://github.com/seeksdream/relation-graph" target="_blank">https://github.com/seeksdream/relation-graph</el-link></div>
    <div style="padding:50px;padding-top:5px;padding-bottom:5px;font-size: 18px;color: #666666;line-height: 30px;">你还可以fork项目后，向我的git项目发送pull request，参与其中。</div>
    <div style="padding:50px;padding-top:50px;padding-bottom:5px;font-size: 18px;color: #666666;">提BUG、提建议、获取下一个版本的功能计划、交流前端开发经验、欢迎加QQ:  <b>3235808353</b></div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import RgHeader from '../rg-header';
export default {
  name: 'DocsIndex',
  components: {
    RgHeader
  },
  data() {
    return {
      checkedRoute: null
    };
  },
  computed: {
    ...mapState({
    })
  },
  mounted() {
  },
  methods: {
  }
};
</script>

<style>
</style>
<style lang="scss" scoped>
  .c-left-menu-item{
    text-align: left;
    height:49px;
    color: #444444;
    opacity: 0.7;
  }
  .c-left-menu-item:hover{
    color: #1989fa;
    opacity: 1;
  }
  .c-left-menu-item-checked{
    color: #1989fa;
    border-left:#409EFF solid 5px;
    opacity: 1;
  }
</style>
