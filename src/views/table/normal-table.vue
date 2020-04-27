<template>
  <section class="normal-table-container">
    <div class="tools">
      <el-popover width="100">
        <div class="column-list">
          <el-checkbox-group class="column-group" v-model="visibleColumn">
            <el-checkbox v-for="item in columns" :key="item.id" :label="item.id">{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <el-button slot="reference" icon="el-icon-s-tools"></el-button>
      </el-popover>
    </div>
    <el-table :data="rows" stripe border>
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="age" label="年龄" />
      <el-table-column prop="love" label="女朋友" />
      <el-table-column
        v-for="item in dynamicColumn"
        :key="item.id"
        :prop="item.id"
        :label="item.label"
      ></el-table-column>
    </el-table>
  </section>
</template>

<script>
const tableColumnsConfig = {
  address: "地址",
  mobile: "电话",
  date: "时间"
};

export default {
  name: "NormalTable",
  data() {
    return {
      rows: new Array(6).fill({}).map(() => {
        return {
          name: "ouyang",
          age: 24,
          love: "zaq",
          address: "china",
          mobile: "134****5228",
          date: Date.now()
        };
      }),
      // columns: []
      columns: Object.keys(tableColumnsConfig).map(key => {
        return {
          id: key,
          label: tableColumnsConfig[key]
        };
      }),
      visibleColumn: Object.keys(tableColumnsConfig),
    };
  },
  computed: {
    dynamicColumn() {
      return this.columns.filter(item => this.visibleColumn.findIndex(id => id === item.id) > -1)
    }
  },
  created() {
    //
  },
  mounted() {
  },
  methods: {
    //
  }
};
</script>

<style lang="scss" scoped>
.normal-table-container {
  padding: 20px;

  .tools {
    margin-bottom: 12px;
    text-align: right;
  }

  .column-list {
    .el-checkbox {
      display: block;
    }

    .inline {
      color: red;
    }
  }
}
</style>

<style lang="scss">
.el-popover {
  min-width: 0;
  padding: 5px;
}

.column-list {
  .column-group {
    display: flex;
    flex-direction: column;
    align-items: center;

    .el-checkbox {
      margin: 0;
    }
  }
}
</style>
