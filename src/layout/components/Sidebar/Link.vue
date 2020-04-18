<template>
  <div v-bind="linkProps(to)">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true,
    }
  },
  methods: {
    linkProps(url) {
      if (/^(https?:|mailto:|tel:)/.test(url)) {
        return {
          is: 'a',
          href: url,
          target: '_blank',
          rel: 'noopener',
        }
      } else {
        return {
          is: 'router-link',
          to: url,
        }
      }
    }
  }
}
</script>
