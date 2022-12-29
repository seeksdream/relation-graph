<template>
  <div class="app-wrapper">
    <el-header style="padding:0px;height:70px;">
      xxxx
    </el-header>
    <el-container style="border-top: #efefef solid 1px;">
      <el-aside style="padding:0px;background-color: #ffffff;border-right: #efefef solid 1px;margin:0px;overflow:hidden" :width="'210px'">
        <sidebar class="sidebar-container" />
      </el-aside>
      <el-main style="padding:0px;">
        <div class="navbar" style="height:33px;box-shadow: none;border-bottom: #efefef solid 1px;">
        </div>
        <app-main />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import path from 'path';
import AppMain from './AppMain';
export default {
  name: 'TopMenuLayout',
  components: { AppMain },
  data() {
    this.tempRouteInfo = null;
    return {
      checkedRoute: null
    };
  },
  mounted() {
    // console.log('this.$route:', this.$route)
    // console.log('this.permission.routes:', this.permission.routes)
    this.permission.routes.forEach(thisLevel1Route => {
      if (thisLevel1Route.hidden !== true) {
        // console.log('check:', thisLevel1Route)
        if (this.isHasChildren('', thisLevel1Route, this.$route)) {
          this.showMenuChilds(thisLevel1Route);
        }
      }
    });
  },
  methods: {
    isHasChildren(prevPath, route, targetRoute) {
      const _thisRouteFullPath = path.resolve(prevPath, route.path);
      if (_thisRouteFullPath === targetRoute.path) {
        return true;
      }
      if (route.children) {
        for (let i = 0; i < route.children.length; i++) {
          if (this.isHasChildren(_thisRouteFullPath, route.children[i], targetRoute)) {
            return true;
          }
        }
      }
      return false;
    },
    isNeedShow(route) {
      if (route.hidden) {
        return false;
      }
      const showingChildren = route.children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });
      if (route.meta && route.meta.title) {
        this.tempRouteInfo = route.meta;
      }
      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1 && route.redirect) {
        this.tempRouteInfo = showingChildren[0].meta;
        this.tempRouteInfo.isLink = true;
        this.tempRouteInfo.path = route.redirect;
        route.isLink = true;
      }
      if (showingChildren.length === 0) {
        this.tempRouteInfo.isLink = true;
        this.tempRouteInfo.path = route.path;
        route.isLink = true;
      }
      return this.tempRouteInfo !== null;
    },
    showMenuChilds(route) {
      this.checkedRoute = route;
      if (this.checkedRoute.isLink) {
        console.log('直接访问：', route.path);
        this.$store.dispatch('permission/setCurrentLevel1Route', null);
        this.$router.push(route.path);
      } else {
        this.$store.dispatch('permission/setCurrentLevel1Route', route);
      }
      console.log('Click Level1 Menu:', route);
    },
    handleSetTheme(command) {
      console.log('switch theme:', command);
      this.$store.dispatch('settings/setTheme', command);
    },
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false });
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar');
    },
    async logout() {
      await this.$store.dispatch('user/logout');
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    }
  }
};
</script>

<style>
  #app .sidebar-container {
    transition: width 0.28s;
    background-color: #efefef;
    height: 100%;
    position: relative;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
  }
  .el-submenu__title:hover{
    background-color: #efefef !important;
  }
  .el-menu-item:hover{
    background-color: #efefef !important;
  }
</style>
<style lang="scss" scoped>
  @import "../styles/variables.scss";

  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>

<style lang="scss" scoped>
  .navbar {
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);

    .hamburger-container {
      line-height: 33px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color:transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
<style scoped>
  .c-top-menu{
    color: #ffffff;
    text-align: center;
    cursor: pointer;
    line-height: 60px;
  }
  .c-top-menu-checked{
  }
  .c-top-menu:hover{
    color: #cccccc;
  }
</style>
