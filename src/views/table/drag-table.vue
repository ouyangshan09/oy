<template>
  <section class="drag-table-container">
    <el-table ref="dragTable" v-loading="loading" :data="rows" border fit stripe>
      <el-table-column align="center" label="ID" width="120">
        <template v-slot="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="标题">
        <template v-slot="{row}">
          <span>{{row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="内容">
        <template v-slot="{row}">
          <span>{{row.content_short}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="作者">
        <template v-slot="{row}">
          <span>{{row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="时间">
        <template v-slot="{row}">
          <span>{{row.timestamp}}</span>
        </template>
      </el-table-column>
      <el-table-column label="drag" align="center">
        <template>
          <svg-icon icon-class='drag' class='drag-svg' />
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-show="total > 0"
      background
      class='table-pagination'
      layout="prev, pager, next, sizes, total"
      :total="total"
      :current-page="query.page"
      :page-size="query.limit"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    />
  </section>
</template>

<script>
import { fetchList } from '../../api/scripts'

export default {
  name: "DragTable",
  data() {
    return {
      rows: [],
      total: 0,
      query: {
        page: 1,
        limit: 10
      },
      sortable: null,
      loading: false,
    };
  },
  computed: {
    //
  },
  methods: {
    async getList() {
      this.loading = true
      const { data } = await fetchList(this.query)
      this.rows = data.rows
      this.total = data.total
      console.log('data:', data)
      this.loading = false
      this.$nextTick(() => {
        this.initSortable()
      })
    },
    handleSizeChange(limit) {
      this.query.limit = limit
      this.getList()
    },
    handlePageChange(page) {
      this.query.page = page
      this.getList()
    },
    initSortable() {
      this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
    },
    destorySortable () {
      this.sortable && this.sortable.destory()
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    //
  },
  destroyed() {
    this.destorySortable()
  }
};
</script>

<style lang="scss" scoped>
.drag-table-container {
  .table-pagination {
    margin-top: 24px;
  }
  .drag-svg {
    font-size: 34px;
  }
}
</style>
