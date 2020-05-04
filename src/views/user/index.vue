<template>
  <div class="user-container">
    <div class="filter-condition">
      过滤条件
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
  </div>
</template>

<script>
const defaultForm = {
  id: "",
  username: "",
  comment: ""
};

export default {
  name: "UserManage",
  data() {
    return {
      rows: [],
      query: {
        page: 1,
        limit: 15,
        total: 0,
        id: '',
        username: '',
        status: '',
        createAt: '',
      },
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
