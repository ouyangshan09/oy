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
      <el-table-column label="状态" align="center" width="100">
        <template v-slot="{row}">
          <span>{{ row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template v-slot="{row}">
          <el-button type="primary" size="small" @click.native.prevent="handleUpdate(row)">编辑</el-button>
          <el-button type="danger" size="small" @click.native.prevent="handleRemove(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="visible" :title.sync="dialogTitleStatus[dialogStatus]">
      <el-form ref="form" :model="role" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="role.name" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="role.describe" />
        </el-form-item>
        <el-form-item label="菜单权限">
          <el-tree :data="routeMenus" show-checkbox :props="defaultProps" />
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button type="danger" @click.native.prevent="handleClose">取消</el-button>
        <el-button type="primary">提交</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rows: [
        { id: "1", name: "admin", describe: "aaa", stauts: 0 },
        { id: "2", name: "guest", describe: "bbb", status: 0 }
      ],
      dialogTitleStatus: {
        add: "新建角色",
        edit: "编辑角色"
      },
      dialogStatus: "add",
      visible: false,
      role: {
        id: "",
        name: "",
        describe: "",
        menus: []
      }, // 表单数据
      roleRules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }]
      }, // 表单验证规则
      routeMenus: [
        { path: "/", name: "测试1" },
        { path: "/2", name: "测试2" },
        { path: "/3", name: "测试3" }
      ], // 路由权限菜单
      defaultProps: {
        label: "name",
        children: "children"
      }
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
      return data;
    },
    fetchMenuList() {
      // TODO 请求菜单数据
    },
    fetchRoleList() {
      // TODO 请求角色列表
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
