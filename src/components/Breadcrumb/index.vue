<template>
  <el-breadcrumb class="app-breadcrumb">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item) in levelList" :key="item.path">
        <span @click.prevent="handleRouteLink(item)">{{ item.meta.title }}</span>
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
      const path = this.pathCompile(route.path)
      console.log('native path to:', path)
      console.log('native route to:', route)
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
}
</style>
