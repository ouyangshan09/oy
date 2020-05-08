<template>
  <div class="app-container">
    <div class="filter-condition">
      <el-input
        class="filter-item"
        v-model="query.id"
        placeholder="请输入用户ID"
        style="width: 160px"
        size="small"
        @keyup.enter.native="handleSearch"
        clearable
      />
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
      <el-table-column align="center" label="ID" width="80">
        <template v-slot="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户名">
        <template v-slot="{row}">
          <span class="link-type" @click.prevent="handleUpdateItem(row)">{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注" width="340">
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
          <span>{{ row.status | tableStatusToText }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template v-slot={row}>
          <el-button size="small" type="danger" @click="forbidUser(row)">禁用</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="query.total > 0"
      :total="query.total || 0"
      :page="query.page"
      :limit="query.limit"
      @pagination="handlePagination"
    />

    <el-dialog
      :visible.sync="dialogFormVisible"
      :title.sync="dialogStateMap[dialogTitle]"
    >
      <el-form ref="form" :model="form" :rules="formRules" label-width="80px">
        <el-form-item label="用户名">
          <el-input
            v-model="form.username"
            readonly
            disabled
          />
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="form.comment"
            type="textarea"
            :autosize="{ minxRows: 2, maxRows: 4 }"
          />
        </el-form-item>
        <el-form-item label="角色">
          <el-select
            v-model="form.roles"
            placeholder="请选择角色"
            style="width: 100%"
            multiple
          >
            <el-option label="测试" value="test" />
          </el-select>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button type="danger" @click="handleCloseDialog">取消</el-button>
        <el-button type="primary" @click="confirmData">确认</el-button>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import Pagination from '../../components/Pagination'
import { fetchList } from '../../api/user'
// import { cleanJson } from '../../utils'

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
        total: undefined,
        id: undefined,
        username: undefined,
        status: undefined,
        createAt: undefined,
      },
      statusList: [
        { id: 1, label: '启用' },
        { id: 2, label: '禁用' },
      ],
      loading: false,
      form: {
        id: "",
        username: "",
        comment: "",
        roles: [],
      },
      formRules: {},
      dialogFormVisible: false,
      dialogTitle: "add",
      dialogStateMap: {
        add: "添加",
        up: "编辑"
      }
    };
  },
  mounted() {
    this.updateTable(this.query)
  },
  methods: {
    handleCloseDialog() {
      this.form = Object.assign({}, defaultForm)
      this.$refs.form.resetFields()
      this.dialogFormVisible = false;
    },
    handleUpdateItem(data) {
      this.form = Object.assign({}, data)
      this.dialogFormVisible = true
      this.dialogTitle = 'up'
    },
    handlePagination(query) {
      const nextQuery = {
        ...this.query,
        ...query,
      }
      this.updateTable(nextQuery)
      // console.log('pagination query:', query)
    },
    handleSearch() {
      const next = {
        ...this.query,
        page: 1,
      }
      this.updateTable(next)
      // console.log('query:', cleanJson(this.query))
    },
    async forbidUser(data) {
      // TODO 禁止用户状态
      return data
    },
    async confirmData() {
      console.log('提交数据')
    },
    async updateTable(query) {
      const { data } =  await fetchList(query)
      this.rows = data.rows
      this.query.page = data.page
      this.query.limit = data.pageSize
      this.query.total = data.total
    },
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  .filter-condition {
    margin-bottom: 10px;
  }
}
</style>
