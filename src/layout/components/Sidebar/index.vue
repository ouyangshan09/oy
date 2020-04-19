<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :background-color="'#304156'"
        :text-color="'#bfcbd9'"
        :active-text-color="'#409EFF'"
        :unique-opened="false"
        :collapse-transition="false"
        :collapse="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from "./SidebarItem";

export default {
  name: "Sidebar",
  created() {
  },
  components: {
    SidebarItem
  },
  computed: {
    ...mapGetters([
      'permission_routes'
    ]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
  }
};
</script>

<style lang="scss" scoped>
</style>

<style lang="scss">
</style>
