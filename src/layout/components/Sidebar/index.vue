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
import SidebarItem from "./SidebarItem";

export default {
  name: "Sidebar",
  components: {
    SidebarItem
  },
  computed: {
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    permission_routes() {
      return [
        {
          path: "/a1",
          meta: {
            title: "菜单1",
            icon: "user"
          },
          children: [
            {
              path: "/a2",
              meta: {
                title: "菜单1-1",
                icon: "user"
              }
            },
            {
              path: "/a3",
              meta: {
                title: "菜单1-1",
                icon: "user"
              }
            },
            {
              path: "/a4",
              meta: {
                title: "菜单1-1",
                icon: "user"
              }
            },
            {
              path: "/a5",
              meta: {
                title: "菜单1-1",
                icon: "user"
              }
            }
          ]
        },
        {
          path: "/b1",
          meta: {
            title: "菜单2",
            icon: "guide"
          }
        }
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

<style lang="scss">
</style>
