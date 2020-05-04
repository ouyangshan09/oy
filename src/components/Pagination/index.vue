<template>
  <el-pagination
    class="pagination-container"
    background
    layout="prev, pager, next, sizes, total"
    :total="total"
    :current-page="currentPage"
    :page-size="pageSize"
    @size-change="handleSizeChange"
    @current-change="handlePageChange"
  />
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total:  {
      required: true,
      type: Number,
    },
    page:  {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 20,
    },
    autoScroll: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handlePageChange(page) {
      this.$emit('pagination', { page: page, limit: this.pageSize })
      if (this.autoScroll) {
        // TODO 自动滚动
        return
      }
    },
    handleSizeChange(limit) {
      this.$emit('pagination', { page: this.page, limit: limit })
      if (this.autoScroll) {
        return
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
}
// .pagination-container.hidden {

// }
</style>
