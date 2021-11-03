<template>
  <el-container class="home" :class="{ foled: foled }">
    <el-aside width="">
      <div class="top"></div>
      <el-menu
        :collapse="foled"
        :collapse-transition="false"
        unique-opened
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="index">
          <i class="el-icon-location"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span slot="title">用户管理</span>
          </template>
          <el-menu-item index="1-1">用户列表</el-menu-item>
          <el-menu-item index="1-2">用户组</el-menu-item>
          <el-menu-item index="1-3">管理员</el-menu-item>
          <el-menu-item index="1-4">普通用户</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            <span slot="title">权限管理</span>
          </template>
          <el-menu-item index="1-1">组权限</el-menu-item>
          <el-menu-item index="1-2">用户权限</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-message"></i>
            <span slot="title">书籍管理</span>
          </template>
          <el-menu-item index="1-1">分类管理</el-menu-item>
          <el-menu-item index="1-2">用户权限</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">系统管理</span>
          </template>
          <el-menu-item index="1-1">性能监控</el-menu-item>
          <el-menu-item index="1-2">用户权限</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container class="right">
      <el-header height="">
        <el-button type="text" icon="el-icon-menu" @click="foled = !foled">
        </el-button>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      foled: true,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100vh;
}

.el-aside {
  top: 0px;
  left: 0px;
  width: 1.464129rem;
  height: 100vh;
  position: absolute;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  background-color: #545c64;
  transition: width 0.4s;
  .top {
    width: 100%;
    height: 0.468521rem;
    background-color: #545c64;
  }
}

::v-deep .el-menu {
  width: 100%;
  border: none;
  .el-menu-item {
    padding: 0px !important;
    padding-left: 0.073206rem !important;
    font-size: 0.102489rem;
    i {
      font-size: 0.131772rem;
    }
  }
  .el-tooltip {
    padding: 0px !important;
    padding-left: 0.073206rem !important;
  }

  .el-submenu {
    .el-menu-item {
      min-width: 40px;
      padding: 0px !important;
      padding-left: 0.366032rem !important;
      font-size: 0.102489rem;
    }
  }

  .el-submenu__title {
    padding: 0 !important;
    padding-left: 0.073206rem !important;
    font-size: 0.102489rem;
    i {
      font-size: 0.131772rem;
    }
  }
}

.right {
  top: 0px;
  left: 1.464129rem;
  width: 100%;
  height: 100vh;
  position: absolute;
  transition: left 0.4s;
}

::v-deep .el-header {
  height: 0.468521rem;
  line-height: 0.468521rem;
  background-color: #dcdfe6;
  .el-icon-menu {
    font-size: 0.175695rem;
  }
}

.el-main {
  height: calc(100% - 0.468521rem);
  background-color: #ebeef5;
}

.foled {
  $wd: 0.366032rem;
  .el-aside {
    width: $wd;
    .el-menu span {
      display: none;
    }
  }
  .right {
    left: $wd;
  }
}
</style>