<template>
  <div class="navbar">
    <div class="left">
      <div class="hamburger-container" @click="onToggleSidebar">
        <svg-icon icon-class="hamburger" :class-name="sidebar.opened ? 'is-active' : ''" />
      </div>
      <breadcrumb class="breadcrumb-container" />
    </div>
    <div class="right-menu">
      <!-- 大屏控制 -->
      <div class="right-menu-item">
        <svg-icon icon-class="fullscreen" />
      </div>
      <!-- 多语音 -->
      <div class="right-menu-item">
        <svg-icon icon-class="language" />
      </div>
      <!-- 用户菜单 -->
      <el-dropdown class="avatar-container right-menu-item">
        <div class="avatar-wrapper">
          <img src="../../assets/user-avatar.jpg" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile/index">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="onLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '../../components/Breadcrumb'

export default {
  name: "Navbar",
  components: {
    Breadcrumb,
  },
  computed: {
    ...mapGetters([
      'sidebar',
    ]),
  },
  data() {
    return {
      isActive: true
    };
  },
  methods: {
    onToggleSidebar() {
      this.$store.dispatch('app/toggleSidebar')
    },

    onLogout() {
      this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
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
    line-height: 46px;
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
    vertical-align: bottom;
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
