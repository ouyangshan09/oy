<template>
  <el-scrollbar
    ref="scrollContainer"
    class="scroll-container"
    :vertical="false"
    @wheel.native.prevent="handleScroll"
  >
    <slot />
  </el-scrollbar>
</template>

<script>
const tagAndTagSpacing = 4;

export default {
  name: "ScrollPane",
  data() {
    return {
      left: 0
    };
  },
  computed: {
    scrollWraper() {
      return this.$refs.scrollContainer.$refs.wrap;
    }
  },
  methods: {
    /**
     * 鼠标滑轮活动处理
    */
    handleScroll(event) {
      const eventDelta = event.wheelDelta || -event.deltay * 40;
      const $scrollWrapper = this.scrollWraper;
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4;
    },
    /**
     * 移除Tag后 视图需要位移的位置计算
    */
    moveToTarget(currentTag) {
      const $container = this.$refs.scrollContainer.$el;
      const $containerWidth = $container.offsetWidth;
      const $scrollWraper = this.scrollWraper;
      const tagList = this.$$parent.$refs.tag;

      let firstTag = null;
      let lastTag = null;

      if (tagList.length > 0) {
        firstTag = tagList[0];
        lastTag = tagList[tagList.length - 1];
      }

      if (firstTag === currentTag) {
        $scrollWraper.scrollLeft = 0;
      } else if (lastTag === currentTag) {
        $scrollWraper.scrollLeft = $scrollWraper.scrollWidth - $containerWidth;
      } else {
        const currentIndex = tagList.findIndex(item => item === currentTag);
        const prevTag = tagList[currentIndex - 1];
        const nextTag = tagList[currentIndex + 1];

        const afterNextTagOffsetLeft =
          nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing;
        const beforePrevTagOffsetLeft =
          prevTag.$el.offsetLeft - tagAndTagSpacing;

        if (
          afterNextTagOffsetLeft >
          $scrollWraper.scrollLeft - tagAndTagSpacing
        ) {
          $scrollWraper.scrollLeft = afterNextTagOffsetLeft - $containerWidth;
        } else if (beforePrevTagOffsetLeft < $scrollWraper.scrollLeft) {
          $scrollWraper.scrollLeft = beforePrevTagOffsetLeft;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;

  ::v-deep {
    .el-scrollbar__bar {
      bottom: -3px;
    }
    .el-scrollbar__wrap {
      height: 49px;
    }
  }
}
</style>
