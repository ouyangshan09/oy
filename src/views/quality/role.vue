<template>
  <div class="app-container">
    <div class="filter-condition">
      <el-select clear class="filter-item" placeholder="机构列表" size="small" style="width: 120px">
        <el-option
          v-for="item in orgList"
          :key="item.id"
          :value="item.id"
          :label="item.name"
        />
      </el-select>
      <el-select  clear class="filter-item" placeholder="销售渠道" size="small" style="width: 120px">
        <el-option
          v-for="item in marketChannelList"
          :key="item.id"
          :value="item.id"
          :label="item.name"
        />
      </el-select>
    </div>
    <el-table :data="rows" border stripe>
      <el-table-column label="机构" align="center">
        <template>
          <span>1</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="query.total > 0"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'

/**
 * 机构列表
 * 销售渠道
 * 投保人年龄断
 * 保险期间
 * 险种
 * 状态
 * 规则代码
 * 是否默认质检规则
 *
 * table
 * 质检比例
 * 规则优先级
 */
export default {
  name: 'RoleManage',
  components: {
    Pagination,
  },
  data() {
    return {
      rows: [],
      query: {
        page: 1,
        limit: 10,
        total: 0,
      },
      // 机构列表
      orgList: [],
      // 销售渠道
      marketChannelList: [],
      // 投保人年龄段
      applicant: {
        min: undefined,
        max: undefined,
      },
      // 险种
      insuranceList: [],
      // 状态
      statusList: [],
    }
  },
  computed: {
    //
  },
  methods: {
    handlePageChange() {
      //
    },
    async fetchTable(query) {
      return query
    }
  },
}
</script>

<style lang="scss" scoped>
.app-container {
}
</style>
