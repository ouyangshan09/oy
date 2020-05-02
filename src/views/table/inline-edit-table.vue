<template>
  <div class="inline-edit-table-container">
    <el-table :data="rows" border stripe>
      <el-table-column label="id" width="80" align="center">
        <template v-slot="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题" align="center">
        <template v-slot="{row}">
          <span>{{ row.title }}</span>
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
          <span>{{ row.stauts }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template v-slot="{row}">
          <el-button type="primary" @click.native.prevent="handleUpdate(row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "InlineEditTable",
  data() {
    return {
      rows: [{}],
    };
  },
  mounted() {
    //
  },
  methods: {
    handleUpdate(data) {
      return data
    }
  }
};
</script>

<style lang="scss" scoped>
.inline-edit-table-container {
  //
}
</style>
