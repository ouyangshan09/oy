<template>
  <div class="permission-container">
    <el-button type="primary" @click.native.prevent="handleAdd">新建角色</el-button>

    <el-table :data="rows" class="role-table" border stripe>
      <el-table-column label="ID" align="center" width="100">
        <template v-slot="{row}">
          <span>{{row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色名" align="center">
        <template v-slot="{row}">
          <span>{{row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" align="center">
        <template v-slot="{row}">
          <span>{{row.describe}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template v-slot="{row}">
          <el-button type="primary" size="small" @click.native.prevent="handleUpdate(row)">编辑</el-button>
          <el-button type="danger" size="small" @click.native.prevent="handleRemove(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="visible" :title.sync="dialogTitleStatus[dialogStatus]">1</el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rows: [
        { id: "1", name: "admin", describe: "aaa" },
        { id: "2", name: "guest", describe: "bbb" }
      ],
      dialogTitleStatus: {
        add: "新建角色",
        edit: "编辑角色"
      },
      dialogStatus: "add",
      visible: false
    };
  },
  created() {
    //
  },
  methods: {
    handleAdd() {
      this.dialogStatus = "add";
      this.visible = true;
    },
    handleClose() {
      this.visible = false;
    },
    handleUpdate(data) {
      this.dialogStatus = "edit";
      this.visible = true;
      return data;
    },
    handleRemove(data) {
      return data
    }
  }
};
</script>

<style lang="scss" scoped>
.permission-container {
  padding: 20px;

  .role-table {
    margin-top: 30px;
  }
}
</style>
