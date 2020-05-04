<template>
  <el-breadcrumb class="app-breadcrumb">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index === levelList.length - 1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleRouteLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { compile } from 'path-to-regexp'

export default {
  name: "Breadcrumb",
  data() {
    return {
      levelList: []
    };
  },
  watch: {
    $route(route) {
      if (route.fullPath.startsWith('/redirect/')) {
        return
      }
      this.generatorLevelList()
    }
  },
  created() {
    this.generatorLevelList()
  },
  methods: {
    generatorLevelList() {
      let matched = this.$route.matched.filter(route => route.meta && route.meta.title)
      const first = matched[0]

      if (!this.isHome(first)) {
        matched = [{ path: '/home', meta: { title: '首页' } }].concat(matched)
      }
      this.levelList = matched.filter(route => route.meta && route.meta.title && route.meta.breadcrumb !== false)
    },
    handleRouteLink(route) {
      const { path, redirect } = route
      // TODO 做权限提示判断，如果页面配置有 backConfirmState，需要弹窗提示是否要跳转
      // backConfirmState 是配置是否有重要的信息需要确认在操作
      if (redirect) {
        this.$router.push(redirect, () => null)
        return
      }
      this.$router.push(path, () => null)
    },
    pathCompile(path) {
      const { params } = this.$route
      const toPath = compile(path)
      return toPath(params)
    },
    isHome(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Home'.toLocaleLowerCase()
    }
  }
};
</script>

<style lang="scss" scoped>
.app-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }

  .el-breadcrumb__inner a,
  .el-breadcrumb__inner.is-link {
    font-weight: 400;
  }
}
</style>
