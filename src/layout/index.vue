<template>
  <div :class="classObj" class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <!-- 工具栏 -->
      <div class="header">
        <Navbar />
        <div>tags-view</div>
      </div>
      <!-- 路由入口 -->
      <app-main />
    </div>
  </div>
</template>

<script>
import { AppMain, Sidebar, Navbar } from './components'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Sidebar,
    Navbar,
  },
  mixins: [],
  computed: {
    classObj(){
      return {
        //
      }
    }
  },
  methods: {
    //
  },
}
</script>

<style lang="scss" scoped>
  .app-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
