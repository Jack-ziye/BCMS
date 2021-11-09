<template>
  <el-container class="home" :class="{ foled: foled }">
    <el-aside width="">
      <div class="top"></div>
      <el-menu
        :collapse="foled"
        :collapse-transition="false"
        :default-active="$route.path"
        unique-opened
        router
        exact
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="/index">
          <i class="el-icon-location"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="/role">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span slot="title">角色管理</span>
          </template>
          <!-- <el-menu-item index="/role/editor">用户编辑</el-menu-item> -->
          <el-menu-item index="/role/list">用户列表</el-menu-item>
          <el-menu-item index="/role/group">用户组</el-menu-item>
          <el-menu-item index="/role/admin">管理员</el-menu-item>
        </el-submenu>
        <el-submenu index="permis">
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            <span slot="title">权限管理</span>
          </template>
          <el-menu-item index="/permis/group">组权限</el-menu-item>
          <el-menu-item index="/permis/user">用户权限</el-menu-item>
        </el-submenu>
        <el-submenu index="book">
          <template slot="title">
            <i class="el-icon-message"></i>
            <span slot="title">书籍管理</span>
          </template>
          <el-menu-item index="/book/type">分类管理</el-menu-item>
          <el-menu-item index="/book/other">其他</el-menu-item>
        </el-submenu>
        <el-submenu index="system">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">系统管理</span>
          </template>
          <el-menu-item index="/system/performance">性能监控</el-menu-item>
          <el-menu-item index="/system/other">系统日志</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container class="right">
      <el-header height="">
        <el-button
          type="text"
          :class="foled ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
          @click="foled = !foled"
        >
        </el-button>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(v, i) in breadlist" :key="i">
            {{ v.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      foled: true,
      breadlist: this.$route.matched,
    };
  },
  methods: {},
  watch: {
    $route(to) {
      this.breadlist = to.matched;
    },
  },
};
</script>

<style lang="scss" scoped>
$left_width: 1.354167rem /* 260/192 */;
$foled_left_width: 0.3125rem /* 60/192 */;
$head_height: 0.333333rem /* 64/192 */;
$menu_height: 0.395833rem /* 76/192 */;
$menu_font_size: 0.104167rem /* 20/192 */;
$menu_pad_left: 0.104167rem /* 20/192 */;

.home {
  width: 100%;
  height: 100vh;
}

.el-aside {
  top: 0px;
  left: 0px;
  width: $left_width;
  height: 100vh;
  position: absolute;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  background-color: #545c64;
  z-index: 1;
  transition: width 0.4s;

  .top {
    width: 100%;
    height: $head_height;
    background-color: #545c64;
  }
}

.el-aside ::v-deep .el-menu {
  width: 100%;
  border: none;
  font-size: $menu_font_size !important;
  user-select: none;

  i {
    font-size: $menu_font_size * 1.5 !important;
  }

  .el-menu-item {
    // min-width: 40px;
    height: $menu_height;
    line-height: $menu_height;
    padding: 0px !important;
    padding-left: $menu_pad_left !important;

    div {
      padding: 0px !important;
    }
  }

  .el-submenu__title {
    height: $menu_height;
    line-height: $menu_height;
    padding: 0px !important;
    padding-left: $menu_pad_left !important;
  }
  .el-menu--inline .el-menu-item {
    height: $menu_height * 0.9;
    line-height: $menu_height * 0.9;
    font-size: $menu_font_size !important;
    padding-left: $menu_pad_left * 3 !important;
  }
}

.right {
  top: 0px;
  left: $left_width;
  width: 100%;
  height: 100vh;
  position: absolute;
  transition: left 0.4s;
}

.right ::v-deep .el-header {
  height: $head_height;
  line-height: $head_height;
  background-color: #dcdfe6;
  padding: 0px;
  display: flex;
  align-items: center;
  box-shadow: 0px 6px 10px #909399;
  z-index: 1;

  .el-button {
    font-size: 0.166667rem /* 32/192 */;
    padding: 0px;
    margin: 0px 0.104167rem; /* 20/192 */
  }
}

.el-main {
  top: $head_height;
  width: calc(100% - #{$left_width});
  height: calc(100% - #{$head_height});
  overflow: auto;
  position: absolute;
  background-color: #ebeef5;
  transition: width 0.4s;
  padding: 0.104167rem /* 20/192 */;
}

.foled {
  .el-aside {
    width: $foled_left_width;
    .el-menu span {
      display: none;
    }
  }
  .right {
    left: $foled_left_width;
  }
  .el-main {
    width: calc(100% - #{$foled_left_width});
  }
}

.foled ::v-deep .el-menu {
  .el-menu-item {
    text-align: center;
  }
  .el-submenu__title {
    text-align: center;
    padding: 0px !important;
  }
}
</style>