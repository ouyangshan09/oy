<template>
  <div class="condition-table-container">
    <div class="query-condition">
      <el-input
        v-model="query.username"
        class="filter-item"
        placeholder="请输入用户名搜索"
        style="width: 200px"
        size="small"
        @keyup.enter.native="handleSearch"
      />
      <el-select
        v-model="query.status"
        clearable
        size="small"
        class="filter-item"
        style="width: 130px"
      >
        <el-option :value="item.id" :label="item.label" :key="item.id" v-for="item in statusList" />
      </el-select>
      <el-button
        class="filter-item"
        icon="el-icon-search"
        type="primary"
        size="small"
        @click.prevent="handleSearch"
      >搜索</el-button>
    </div>
    <el-table :data="rows" v-loading="loading" border stripe>
      <el-table-column label="ID" align="center" width="100">
        <template v-slot="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" align="center">
        <template v-slot="{row}">
          <span class="link-type" @click="handleUpdateMsg(row)">{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" width="350">
        <template v-slot="{row}">
          <span>{{ row.comment }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" width="80">
        <template v-slot="{row}">
          <span>{{ row.status | tableStatusToText }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template v-slot="{row}">
          <span>{{ row.createAt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template v-slot="{row, $index}">
          <el-button type="danger" size="small" @click="handleRemove(row, $index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="condition-pagination"
      v-show="query.total > 0"
      background
      layout="prev, pager, next, sizes, total"
      :current-page="query.page"
      :page-size="query.limit"
      :total="query.total"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    />

    <el-dialog :title.sync="titleMap[dialogFormStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="formRules" label-width="80px">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.comment" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button size="small" type="danger" @click="handleCloseDialog">取消</el-button>
        <el-button size="small" type="primary" @click="handleConfirmDialog">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList3 } from "../../api/scripts";
// import { cleanJson } from "../../utils";

const defualtForm = {
  username: "",
  comment: ""
};

export default {
  name: "ConditionTable",
  data() {
    return {
      rows: [],
      query: {
        page: 1,
        limt: 15,
        total: 0,
        username: '',
        status: ''
      },
      loading: false,
      dialogFormVisible: false,
      dialogFormStatus: 'add',
      titleMap: {
        add: '添加',
        update: '修改'
      },
      statusList: [
        { id: 1, label: '启用' },
        { id: 2, label: '禁用' }
      ],
      form: {
        id: '',
        username: '',
        comment: ''
      },
      formRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ]
      }
    };
  },
  mounted() {
    this.fetchList();
  },
  methods: {
    async fetchList(query = this.query) {
      this.loading = true;
      const { data } = await fetchList3(query);
      this.loading = false;
      this.rows = data.rows;
      this.query.page = data.page;
      this.query.limt = data.pageSize;
      this.query.total = data.total;
      // console.log('data:', data)
    },
    handleCloseDialog() {
      this.dialogFormVisible = false;
      this.form = Object.assign({}, defualtForm);
      this.$refs.form.resetFields();
    },
    handleConfirmDialog() {
      const id = this.form.id
      const index = this.rows.findIndex(item => item.id === id)
      this.rows.splice(index, 1, {...this.form})
      this.$refs.form.resetFields();
      this.form = Object.assign({}, defualtForm)
      this.dialogFormVisible = false
      this.$message({
        type: 'success',
        message: '修改成功',
      })
    },
    handleUpdateMsg(data) {
      this.dialogFormVisible = true;
      this.form = Object.assign({}, data)
    },
    handleRemove(data, index) {
      this.$confirm('是否要删除该用户', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.rows.splice(index, 1);
        })
        .catch(() => {
        });
    },
    handleSizeChange(limit) {
      this.query.limt = limit;
      this.fetchList(this.query);
    },
    handlePageChange(page) {
      this.query.page = page;
      this.fetchList(this.query);
    },
    handleSearch() {
      this.query.page = 1;
      this.fetchList(this.query);
      // console.log("filter condition:", cleanJson(this.query));
    }
  }
};
</script>

<style lang="scss" scoped>
.condition-table-container {
  padding: 20px;

  .condition-pagination {
    margin-top: 20px;
  }

  .filter-item {
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 10px;
    margin-right: 6px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
