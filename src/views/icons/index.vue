<template>
  <div class="icon-container">
    <el-tabs type="border-card">
      <el-tab-pane label="用户图标">
        <ul class="list clearfix">
          <li
            class="icon-item"
            v-for="item in svgIcons"
            :key="item"
            @click="handleUserTextCodeToCopyBoard(item, $event)"
          >
            <el-tooltip placement="top">
              <div slot="content">{{generatorSvgContent(item)}}</div>
              <div>
                <svg-icon :icon-class="item" />
                <div class="icon-name">{{item}}</div>
              </div>
            </el-tooltip>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="组件图标">
        <ul class="list clearfix">
          <li
            class="icon-item"
            v-for="item in elementIcons"
            :key="item"
            @click="handleComponentTextCodeToCopyBoard(item, $event)"
          >
            <el-tooltip placement="top">
              <div slot="content">{{generatorElementContent(item)}}</div>
              <div>
                <i :class="'el-icon-' + item" />
                <div class="icon-name">{{item}}</div>
              </div>
            </el-tooltip>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import svgIconData from "./svg-icon-data";
import elementIconData from "./element-icon-data";
import handleClipborad from "../../utils/clipboard";

export default {
  name: "Icons",
  data() {
    return {
      svgIcons: svgIconData,
      elementIcons: elementIconData
    };
  },
  created() {},
  mounted() {},
  methods: {
    generatorSvgContent(value) {
      return `<svg-icon icon-class='${value}' />`;
    },
    generatorElementContent(value) {
      return `<i class='el-icon-${value}'>`;
    },
    handleUserTextCodeToCopyBoard(value, event) {
      const code = this.generatorSvgContent(value);
      handleClipborad(code, event);
    },
    handleComponentTextCodeToCopyBoard(value, event) {
      const code = this.generatorElementContent(value);
      handleClipborad(code, event);
    }
  }
};
</script>

<style lang="scss" scoped>
.icon-container {
  padding: 20px;

  ul,
  li {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .list {
    border: 1px solid #eaeefb;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;

    li {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 16.66%;
      text-align: center;
      height: 85px;
      color: #666;
      font-size: 30px;
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
      margin-right: -1px;
      margin-bottom: -1px;
      transition: color 0.3s;

      &:hover {
        color: #409eff;
        cursor: pointer;
      }
    }

    .svg-icon {
      pointer-events: none;
    }

    .icon-name {
      font-size: 14px;
      margin-top: 15px;
    }
  }
}
</style>
