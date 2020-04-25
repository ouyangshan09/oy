<template>
  <section class="normal-table-container">
    <el-table :data="rows" stripe border>
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="age" label="年龄" />
      <el-table-column prop="love" label="女朋友" />
    </el-table>
  </section>
</template>

<script>
export default {
  name: "NormalTable",
  data() {
    return {
      rows: new Array(6).fill({}).map(() => {
        return {
          name: "ouyang",
          age: 24,
          love: "zaq"
        };
      })
    };
  },
  created() {
    //
  },
  mounted() {
    //
  },
  methods: {
    //
  }
};
</script>

<style lang="scss" scoped>
.normal-table-container {
  padding: 20px;
}
</style>
