<template>
  <div v-if="!item.hidden">
    <!-- 没有子节点 创建menu-item -->
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <item
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </app-link>
    </template>

    <!-- 有子节点 创建submenu 继续迭代 -->
    <el-submenu v-else ref="subMenu" popper-append-to-body :index="resolvePath(item.path)">
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="oy-item"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from "path";
import Item from "./Item";
import AppLink from "./Link";

export default {
  name: "SidebarItem",
  components: {
    Item,
    AppLink
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  created() {},
  data() {
    this.onlyOneChild = null;
    return {
      //
    };
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          this.onlyOneChild = item;
          return true;
        }
      });

      if (showingChildren.length === 1) {
        return true;
      }

      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }

      return false;
    },
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath);
    }
  }
};
</script>
