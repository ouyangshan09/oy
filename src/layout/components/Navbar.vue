<template>
  <div class="navbar">
    <div class="left">
      <div class="hamburger-container" @click="onToggleSidebar">
        <svg-icon icon-class="hamburger" :class-name="sidebar ? 'is-active' : ''" />
      </div>
      <div class="breadcrumb-container">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item key="1">
            <span>首页</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item key="2">
            <span>菜单</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item key="3">
            <span>子菜单</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="right-menu">
      <div class="right-menu-item">
        <svg-icon icon-class="fullscreen" />
      </div>
      <div class="right-menu-item">
        <svg-icon icon-class="language" />
      </div>
      <el-dropdown class="avatar-container right-menu-item">
        <div class="avatar-wrapper">
          <img src="../../assets/user-avatar.jpg" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile/index">
            <el-dropdown-item>Profile</el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>Home</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="onLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  components: {},
  computed: {
    sidebar() {
      return this.isActive;
    }
  },
  data() {
    return {
      isActive: true
    };
  },
  methods: {
    onToggleSidebar() {
      this.isActive = !this.isActive;
    },

    onLogout() {
      console.log9('退出')
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .hamburger-container {
    display: inline-block;
    cursor: pointer;
    transition: background 0.3s;
    height: 100%;
    line-height: 50px;
    padding: 0 16px;

    .svg-icon {
      width: 20px;
      height: 20px;
      transition: transform 0.3s;

      &.is-active {
        transform: rotate(180deg);
      }
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    display: inline-block;
    margin-left: 8px;
    line-height: 50px;
  }

  .right-menu {
    line-height: 50px;

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #555;
      vertical-align: middle;
    }
  }

  .avatar-container {
    margin-right: 10px;

    .avatar-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .user-avatar {
      cursor: pointer;
      height: 40px;
      width: 40px;
      border-radius: 100%;
    }

    .el-icon-caret-bottom {
      cursor: pointer;
      font-size: 14px;
      margin-left: 8px;
    }
  }
}
</style>
