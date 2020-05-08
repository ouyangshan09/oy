<template>
  <div class="time-line">
    <el-timeline>
      <el-timeline-item v-for="item in data" :key="item.id" :timestamp="item.createAt" placement="top">
        <el-card>
          <h4>{{item.title}}</h4>
          <p>{{item.content}}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  name: 'TimeLine',
  data() {
    return {
      data: [
        {
          id: '1',
          createAt: '2020-01/12',
          title: '部署项目',
          content: 'Super Admin 在2020/01/12 20:00 部署成功',
        },
        {
          id: '2',
          createAt: '2020-02/12',
          title: '提交代码',
          content: 'Super Admin 在2020/02/12 15:30 提交'
        },
        {
          id: '3',
          createAt: '2020-03/12',
          title: '初始化项目',
          content: 'Super Admin 在2020/03/12 12:00 创建项目'
        },
      ],
    }
  },
  methods: {
    //
  },
}
</script>
