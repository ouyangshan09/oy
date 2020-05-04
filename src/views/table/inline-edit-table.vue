<template>
  <div class="inline-edit-table-container">
    <el-table :data="rows" v-loading="loading" border stripe>
      <el-table-column label="id" width="80" align="center">
        <template v-slot="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题" align="center" width="450">
        <template v-slot="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.title" class="edit-input" size="small" />
            <el-button
              class="cancel-btn"
              size="small"
              type="warning"
              @click.prevent="handleCancelEdit(row)"
            >取消</el-button>
          </template>
          <span v-else>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="作者" align="center">
        <template v-slot="{row}">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" align="center">
        <template v-slot="{row}">
          <span>{{ row.updateAt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template v-slot="{row}">
          <span>{{ row.stauts | tableStatusToText }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template v-slot="{row}">
          <el-button
            v-if="row.edit"
            type="success"
            size="small"
            @click.prevent="handleConfirm(row)"
          >确认</el-button>
          <el-button v-else type="primary" size="small" @click.prevent="handleUpdate(row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchList2 } from "../../api/scripts";
// import { cleanJson } from '../../utils'

export default {
  name: "InlineEditTable",
  data() {
    return {
      rows: [{}],
      loading: false,
      query: {
        page: 1,
        limit: 15,
      }
    };
  },
  mounted() {
    this.fetchList();
  },
  methods: {
    handleUpdate(data) {
      data.edit = !data.edit;
    },
    handleConfirm(data) {
      data.originTitle = data.title
      data.edit = false
      this.$message({
        type: 'success',
        message: '修改成功'
      })
    },
    handleCancelEdit(data) {
      data.title = data.originTitle
      data.edit = false;
    },
    async fetchList() {
      this.loading = true;
      const { data } = await fetchList2();
      const rows = data.rows.map(item => {
        this.$set(item, "edit", false);
        item.originTitle = item.title;
        return item;
      });
      this.rows = rows;
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.inline-edit-table-container {
  padding: 20px;

  .edit-input {
    padding-right: 100px;
  }
  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
}
</style>
