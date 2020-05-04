<template>
  <div class="condition-table-container">
    <div class="query-condition">
      <el-input
        v-model="query.username"
        class="filter-item"
        placeholder="请输入用户名搜索"
        style="width: 200px"
        @keyup.enter.native="handleSearch"
      />
      <el-select v-model="query.status" class="filter-item" style="width: 130px">
        <el-option :value="item.id" :key="item.id" v-for="item in statusList">
          {{item.label}}
        </el-option>
      </el-select>
      <el-button
        class="filter-item"
        icon="el-icon-search"
        type="primary"
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
        <template v-slot="{row}">
          <el-button type="danger" size="small" @click="handleRemove(row)">删除</el-button>
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
      <el-form :model="form" :role="formRules" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.comment" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button size="small" type="danger" @click="handleToggleFormDialog">取消</el-button>
        <el-button size="small" type="primary">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList3 } from "../../api/scripts";
import { cleanJson } from '../../utils'

export default {
  name: "ConditionTable",
  data() {
    return {
      rows: [],
      query: {
        page: 1,
        limt: 15,
        total: 0,
        username: "",
        status: ""
      },
      loading: false,
      dialogFormVisible: false,
      dialogFormStatus: "add",
      titleMap: {
        add: "添加",
        update: "修改"
      },
      statusList: [
        { id: 1, label: '启用' },
        { id: 2, label: '禁用' },
      ],
      form: {
        username: "",
        comment: ""
      },
      formRules: {}
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
    handleToggleFormDialog() {
      this.dialogFormVisible = !this.dialogFormVisible
    },
    handleUpdateMsg(data) {
      this.dialogFormVisible = true
      return data;
    },
    handleRemove(data) {
      return data;
    },
    handleSizeChange(limit) {
      this.query.limt = limit
      this.fetchList(this.query)
    },
    handlePageChange(page) {
      this.query.page = page
      this.fetchList(this.query)
    },
    handleSearch() {
      this.query.page = 1
      this.fetchList(this.query)
      console.log('filter condition:', cleanJson(this.query))
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

  .link-type,
  .link-type:focus {
    color: #337ab7;
    cursor: pointer;

    &:hover {
      color: rgb(32, 160, 255);
    }
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
