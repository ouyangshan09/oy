<template>
  <section class="drag-table-container">
    <el-table ref="dragTable" v-loading="loading" :data="rows" border fit>
      <el-table-column align="center" label="ID" />
    </el-table>
  </section>
</template>

<script>
import { fetchList } from '../../api/scripts'

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
      sortable: null,
      loading: false,
    };
  },
  computed: {
    //
  },
  methods: {
    async getList() {
      this.loading = true
      const { data } = await fetchList(this.query)
      console.log('data:', data)
      this.loading = false
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    //
  }
};
</script>
