<template>
  <div class="user-container">
    <div class="filter-condition">
      <el-input
        class="filter-item"
        v-model="query.username"
        placeholder="请输入用户名"
        style="width: 140px"
        size="small"
        @keyup.enter.native="handleSearch"
        clearable
      />
      <el-select
        class="filter-item"
        v-model="query.status"
        placeholder="用户状态"
        style="width: 120px"
        size="small"
        clearable
      >
        <el-option
          v-for="item in statusList"
          :label="item.label"
          :value="item.id"
          :key="item.id"
        />
      </el-select>
      <el-button
        class="filter-item"
        icon="el-icon-search"
        type="primary"
        size="small"
        @click="handleSearch"
      >
        搜索
      </el-button>
    </div>
    <el-table :data="rows" border stripe>
      <el-table-column align="center" label="ID">
        <template v-slot="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户名">
        <template v-slot="{row}">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template v-slot="{row}">
          <span>{{ row.comment }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="140">
        <template v-slot="{row}">
          <span>{{ row.createAt }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="80">
        <template v-slot="{row}">
          <span>{{ row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template>
          <el-button size="small" type="danger">禁用</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="query.total > 0"
      :total="query.total"
      :page="query.page"
      :limit="query.limit"
      @pagination="handlePagination"
    />

  </div>
</template>

<script>
import Pagination from '../../components/Pagination'
import { cleanJson } from '../../utils'

const defaultForm = {
  id: "",
  username: "",
  comment: ""
};

export default {
  name: "UserManage",
  components: {
    Pagination,
  },
  data() {
    return {
      rows: [],
      query: {
        page: 1,
        limit: 20,
        total: 0,
        id: '',
        username: '',
        status: '',
        createAt: '',
      },
      statusList: [
        { id: 1, label: '启用' },
        { id: 2, label: '禁用' },
      ],
      loading: false,
      form: {
        id: "",
        username: "",
        comment: ""
      },
      dialogFormVisible: false,
      dialogTitle: "add",
      dialogStateMap: {
        add: "添加",
        up: "编辑"
      }
    };
  },
  methods: {
    handleCloseDialog() {
      this.form = Object.assign({}, defaultForm);
      this.dialogFormVisible = false;
    },
    handleUpdateItem(data) {
      this.form = Object.assign({}, data);
      this.dialogFormVisible = true;
    },
    handlePagination(query) {
      console.log('pagination query:', query)
    },
    handleSearch() {
      console.log('query:', cleanJson(this.query))
    }
  }
};
</script>

<style lang="scss" scoped>
.user-container {
  padding: 20px;

  .filter-condition {
    margin-bottom: 10px;
  }
}
</style>
