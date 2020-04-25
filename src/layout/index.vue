<template>
  <div :class="classObj" class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <!-- 工具栏 -->
      <div class="header">
        <navbar />
        <tags-view />
      </div>
      <!-- 路由入口 -->
      <app-main />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { AppMain, Sidebar, Navbar, TagsView } from './components'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Sidebar,
    Navbar,
    TagsView,
  },
  mixins: [],
  computed: {
    ...mapGetters([
      'sidebar',
    ]),
    classObj(){
      return {
        'hide-sidebar': !this.sidebar.opened,
        'open-sidebar': this.sidebar.opened,
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
