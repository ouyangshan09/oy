<template>
  <svg class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: '',
    }
  },
  computed: {
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      }
      return this.className
    },
    iconName() {
      return `#icon-${this.iconClass}`
    }
  },
}
</script>

<style lang="scss" scoped>
.svg-icon {
  height: 1em;
  width: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover;
  display: inline-block;
}
</style>
