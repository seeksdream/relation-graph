<template>
  <div style="height:50px;background-color:#ffffff;color:#888888;font-size:20px;padding-left:30px;line-height:50px;border-bottom:#eeeeee solid 1px;">
<!--    <img src="@/views/seeks-graph-docs/images/seeks-graph-logo.png" width="75" style="float: left;" />-->
    <div style="float: left;height:50px;width:35px;color:#409EFF;font-size:30px;text-align: center;">
      <svg-icon icon-class="relation-graph-logo" />
    </div>
    <div style="float: left;height:50px;color:#444444;padding-left:10px;font-size:18px;">
      {{title}}
    </div>
    <div style="float: left;height:50px;color:#444444;padding-left:10px;font-size:18px;">
      <div style="text-align: center;padding-top:5px;">
        <a href="https://github.com/seeksdream/relation-graph" target="_blank">
          <img src="https://img.shields.io/github/forks/seeksdream/relation-graph?style=social" width="90" />
          <img src="https://img.shields.io/github/stars/seeksdream/relation-graph?style=social" width="90" style="margin-left:5px;" />
        </a>
      </div>
    </div>
    <div style="position: absolute;top:0px;right:0px;height:50px;width:700px;color:#444444;padding-left:20px;font-size:16px;">
      <el-row>
        <el-col :span="4">
          <router-link to="/docs">
            <div :class="{'c-menu-checked':currentPath.startsWith('/docs') && !currentPath.startsWith('/docs/about')}" class="c-menu-item">使用 & 配置</div>
          </router-link>
        </el-col>
        <el-col :span="4">
          <router-link to="/demo">
            <div :class="{'c-menu-checked':currentPath.startsWith('/demo')}" class="c-menu-item">在线demo</div>
          </router-link>
        </el-col>
        <el-col :span="4">
          <router-link to="/options-tools">
            <div :class="{'c-menu-checked':currentPath.startsWith('/options-tools')}" class="c-menu-item">在线配置工具</div>
          </router-link>
        </el-col>
        <el-col :span="9">
          <router-link to="/docs/about">
            <div :class="{'c-menu-checked':currentPath.startsWith('/docs/about')}" class="c-menu-item">BUG & 建议 & 新版计划</div>
          </router-link>
        </el-col>
        <el-col :span="3">
          <div style="float: right;height:50px;color:#444444;padding-left:20px;width:120px;padding-right:30px;text-align: right;">
            <el-dropdown trigger="click" @command="changeLang">
              <span class="el-dropdown-link" style="color:#409EFF;cursor:pointer;font-size:16px;">
                中文<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="zh">中文</el-dropdown-item>
                <el-dropdown-item command="en">English</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'RgHeader',
  components: {
  },
  props: {
    title: {
      mustUseProp: false,
      default: 'Relation Graph 配置工具',
      type: String
    }
  },
  computed: {
    ...mapState({
    })
  },
  data() {
    return {
      currentPath: ''
    };
  },
  mounted() {
    this.currentPath = this.$route.path;
    console.log('this.$route.path:', this.$route.path);
  },
  methods: {
    changeLang(langType) {
      console.log(langType);
      if (langType === 'en') {
        this.$notify({
          title: 'hi：',
          message: 'The author is busy at work and has not yet completed the translation. Stay tuned！',
          type: 'warning'
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
<style lang="scss" scoped>
  .c-menu-item{
    text-align: center;
    height:49px;
    color: #1989fa;
    opacity: 0.7;
  }
  .c-menu-item:hover{
    color: #1989fa;
    opacity: 1;
  }
.c-menu-checked{
  color: #1989fa;
  border-bottom:#409EFF solid 3px;
  opacity: 1;
}
</style>
