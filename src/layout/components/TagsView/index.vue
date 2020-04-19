<template>
  <div class="tags-view-container">
    <!-- 右键菜单 -->
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visiedViews"
        ref="tag"
        :class="isActive(tag) ? 'active' : ''"
        :key="tag.path"
        :to="{ path: tag.path, query: tag.query }"
        tag="span"
        class="tag-view-item"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <span v-if="!isAffix(tag)" class="el-icon-close" />
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{left: left + 'px', top: top + 'px'}" class="contextmenu">
      <li @click="onRefreshTag(selectedTag)">刷新</li>
      <li @click="closeTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其它</li>
      <li @click="closeAllTag(selectedTag)">关闭所有</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from "./ScrollPane";

export default {
  name: "TagsView",
  components: {
    ScrollPane
  },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: [],
      visiedViews: new Array(50)
        .fill({
          path: "/home",
          query: {},
          fullPath: "/",
          title: "测试"
        })
        .map((item, index) => {
          if (index === 0) {
            return item;
          }
          return {
            ...item,
            path: item.path + index
          };
        })
    };
  },
  computed: {
    //
  },
  watch: {
    $route() {
      //
    },
    visible(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    }
  },
  mounted() {
    //
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path;
    },
    isAffix(tag) {
      return tag.meta && tag.meta.affix;
    },
    // 刷新tag的路由
    onRefreshTag(view) {
      console.log("刷新当前view:", view);
      return view;
    },
    // 关闭tag的路由
    closeTag(view) {
      console.log("关闭当前view:", view);
      return view;
    },
    // 关闭其它tag路由
    closeOthersTags() {
      console.log("关闭其它View");
    },
    // 关闭所有tag路由
    closeAllTag(view) {
      console.log("关闭所有view");
      return view;
    },
    /**
     * 动态计算Menu位置
     */
    openMenu(tag, e) {
      const menuMinWidth = 105;
      const offsetLeft = this.$el.getBoundingClientRect().left;
      const offsetWidth = this.$el.offsetWidth;
      const maxLeft = offsetWidth - menuMinWidth;
      const left = e.clientX - offsetLeft + 15;

      if (left > maxLeft) {
        this.left = maxLeft;
      } else {
        this.left = left;
      }

      this.top = e.clientY;
      this.visible = true;
      this.selectedTag = tag;
    },
    closeMenu() {
      this.visible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 35px;
  width: 100%;
  background: #fff;
  border: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .tags-view-wrapper {
    .tag-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 8px;
      margin-top: 4px;

      &:first-of-type {
        margin-left: 15px;
      }

      &:last-of-type {
        margin-right: 15px;
      }

      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;

        // 圆点
        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }

  .contextmenu {
    position: absolute;
    margin: 0;
    list-style: none;
    background: #fff;
    z-index: 3000;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      margin: 0;
      padding: 6px 18px;

      &:hover {
        cursor: pointer;
        background: #eee;
        color: #42b983;
      }
    }
  }
}
</style>

<style lang="scss">
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;

      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
