<template>
  <section class="drag-table-container">
    <el-table ref="dragTable" v-loading="loading" :data="rows" border fit>
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
          <svg-icon icon-class="drag" class="drag-svg" />
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-show="total > 0"
      background
      class="table-pagination"
      layout="prev, pager, next, sizes, total"
      :total="total"
      :current-page="query.page"
      :page-size="query.limit"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    />

    <div class="show-sort-list">
      {{newList}}
    </div>
  </section>
</template>

<script>
import Sortable from "sortablejs";
import { fetchList } from "../../api/scripts";

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
      newList: [],
    };
  },
  computed: {
    //
  },
  methods: {
    async getList() {
      this.loading = true;
      const { data } = await fetchList(this.query);
      this.rows = data.rows;
      this.total = data.total;
      this.newList = this.rows.map(item => item.id)
      this.loading = false;
      this.$nextTick(() => {
        this.initSortable();
      });
    },
    handleSizeChange(limit) {
      this.query.limit = limit;
      this.getList();
    },
    handlePageChange(page) {
      this.query.page = page;
      this.getList();
    },
    initSortable() {
      const el = this.$refs.dragTable.$el.querySelectorAll(
        ".el-table__body-wrapper > table > tbody"
      )[0];
      this.sortable = Sortable.create(el, {
        ghostClass: "sortable-ghost",
        onEnd: ({ oldIndex, newIndex }) => {
          const oldItem = this.newList.splice(oldIndex, 1)[0]
          this.newList.splice(newIndex, 0, oldItem)
        }
      });
    },
    destorySortable() {
      this.sortable.destroy && this.sortable.destroy();
    }
  },
  created() {
    this.getList();
  },
  mounted() {
    //
  },
  destroyed() {
    this.destorySortable();
  }
};
</script>

<style lang="scss">
.sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background-color: #42b983 !important;
}
</style>

<style lang="scss" scoped>
.drag-table-container {
  .table-pagination {
    margin-top: 24px;
  }
  .drag-svg {
    font-size: 34px;
  }
  .show-sort-list {
    margin-top: 24px;
    padding-left: 20px;
  }
}
</style>
