<script>
export default {
  created() {
    // console.log('redirect $route:', this.$route)
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: '/' + path, query })
  },
  render: function(h) {
    return h()
  }
}
</script>
