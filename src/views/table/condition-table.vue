<template>
  <div class="condition-table-container">
    <div class="query-condition">
      <el-input v-model="query.username" class="filter-item" placeholder="请输入用户名搜索" style="width: 200px" />
      <el-select v-model="query.status" class="filter-item" style="width: 130px">
        <el-option value="11">111</el-option>
      </el-select>
      <el-button class="filter-item" icon="el-icon-search" type="primary">搜索</el-button>
    </div>
    <el-table :data="rows" v-loading="loading" border stripe>
      <el-table-column label="ID" align="center" width="240">
        <template v-slot="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" align="center">
        <template v-slot="{row}">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template v-slot="{row}">
          <span>{{ row.comment }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template v-slot="{row}">
          <span>{{ row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template v-slot="{row}">
          <span>{{ row.createAt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template v-slot="{row}">
          <el-button type="danger" size="small" @click="handleRemove(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-show="query.total > 0"
      :current-page.sync="query.page"
      :page-size.sync="query.limit"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    />

    <el-dialog :title.sync="titleMap[dialogFormStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" :role="formRules" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.comment" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button size="small" type="danger">取消</el-button>
        <el-button size="small" type="primary">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
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
        status: '',
      },
      loading: false,
      dialogFormVisible: false,
      dialogFormStatus: 'add',
      titleMap: {
        add: '添加',
        update: '修改'
      },
      form: {
        username: '',
        comment: '',
      },
      formRules: {},
    };
  },
  mounted() {
    this.fetchList();
  },
  methods: {
    async fetchList(data) {
      return data;
    },
    handleRemove(data) {
      return data;
    },
    handleSizeChange() {
      //
    },
    handlePageChange() {
      //
    }
  }
};
</script>

<style lang="scss" scoped>
.condition-table-container {
  padding: 20px;

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
