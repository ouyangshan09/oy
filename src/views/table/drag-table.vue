<template>
  <section class="drag-table-container">
    <el-table ref="dragTable" v-loading="false" :data="rows" border fit>
      <el-table-column align="center" label="ID" />
    </el-table>
  </section>
</template>

<script>
export default {
  name: "DragTable",
  data() {
    return {
      rows: [],
      total: 0,
      query: {
        page: 1,
        limit: 10
      },
      sortable: null
    };
  },
  computed: {
    //
  },
  methods: {
    //
  },
  created() {
    //
  },
  mounted() {
    //
  }
};
</script>
