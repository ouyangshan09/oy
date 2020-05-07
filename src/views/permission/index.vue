<template>
  <div class="permission-container">
    <el-button type="primary" @click.native.prevent="handleAdd">新建角色</el-button>

    <el-table :data="rows" v-loading="loading" class="role-table" border stripe>
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
        <template v-slot="{row, $index}">
          <el-button type="primary" size="small" @click.native.prevent="handleUpdate(row)">编辑</el-button>
          <el-button type="danger" size="small" @click.native.prevent="handleRemove(row, $index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="visible" :title.sync="dialogTitleStatus[dialogStatus]">
      <el-form ref="form" :model="role" :rules="roleRules" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="role.name" />
        </el-form-item>
        <el-form-item label="描述" prop="describe">
          <el-input v-model="role.describe" />
        </el-form-item>
        <el-form-item label="菜单权限">
          <el-tree
            :data="routeMenus"
            :props="defaultProps"
            node-key="path"
            ref="tree"
            show-checkbox
          />
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button type="danger" @click.native.prevent="handleClose">取消</el-button>
        <el-button type="primary" @click.native.prevent="confirmRole">提交</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import menus from "@/routes/menus";
import { getRoleList } from "../../api/role";
import { cleanJson, deepClone } from "../../utils";

const defaultRole = {
  id: "",
  name: "",
  describe: "",
  menus: []
};

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
      loading: false,
      dialogStatus: "add",
      visible: false,
      role: defaultRole, // 表单数据
      roleRules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }]
      }, // 表单验证规则
      routeMenus: [], // 路由权限菜单
      defaultProps: {
        label: "title",
        children: "children"
      }
    };
  },
  created() {
    this.fetchMenuList();
    this.fetchRoleList();
  },
  methods: {
    handleAdd() {
      this.dialogStatus = "add";
      this.visible = true;
    },
    handleClose() {
      this.role = Object.assign({}, defaultRole);
      this.$refs.tree.setCheckedKeys([]);
      this.visible = false;
    },
    handleUpdate(data) {
      this.role = deepClone(data);
      this.dialogStatus = "edit";
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(data.menus || []);
      });
    },
    handleRemove(data, $index) {
      this.$confirm("请确定是否删除该角色", "Warning", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // TODO 请求后台接口
          this.rows.splice($index, 1);
          this.$message({
            type: "success",
            message: "删除成功"
          });
        })
        .catch(() => {});
      return data;
    },
    async fetchRoleList() {
      this.loading = true;
      const { data } = await getRoleList();
      this.rows = data;
      this.loading = false;
    },
    async fetchMenuList() {
      this.routeMenus = menus;
    },
    async confirmRole() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const next = {
            ...this.role,
            menus: this.$refs.tree.getCheckedKeys()
          };
          console.log("form:", cleanJson(next));
          if (this.dialogStatus === "add") {
            // 添加
          } else {
            // 修改
          }
        }
      });
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
