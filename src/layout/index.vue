<template>
  <div :class="classObj" class="app-wrapper">
    <div class="sidebar-container">sidebar component</div>
    <div class="main-container">
      <!-- 工具栏 -->
      <div class="header">
        <div>navbar</div>
        <div>tags-view</div>
      </div>
      <!-- 路由入口 -->
      <div>app-main</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  components: {
    //
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
.sidebar-container {
  transition: width 0.28s;
  width: 210px;
  background-color: #304156;
  height: 100%;
  position: fixed;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}

.main-container {
  min-height: 100%;
  transition: margin-left .28s;
  margin-left: 210px;
  position: relative;
}
</style>
