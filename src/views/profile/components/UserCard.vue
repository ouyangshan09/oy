<template>
  <div class="user-card">
    <div class="user-profile">
      <div class="user-icon">
        <img src="@/assets/user-avatar.jpg" />
      </div>
      <div class="user-name">{{this.user.name}}</div>
      <div class="user-role">{{this.user.role}}</div>
    </div>
    <div class="user-process">
      <div class="process-section">
        <div class="header">
          <svg-icon icon-class='education' />
          <span>教育经历</span>
        </div>
        <div class="body">
          <div class="edu-item" v-for="(item, $index) in eduList" :key="item.name">
            <span class="index">{{$index + 1}}.</span>
            <a class="link-type" :href="item.url" target="blank">{{item.name}}</a>
          </div>
        </div>
      </div>
      <div class="process-section">
        <div class="header">
          <svg-icon icon-class='skill' />
          <span>技能列表</span>
        </div>
        <div class="body">
          <div class="process-item" v-for="(item) in skillList" :key="item.name">
            <span>{{item.name}}</span>
            <el-progress :percentage="item.percent" :status="item.percent | percentToStauts" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserCard",
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: "",
          role: ""
        };
      }
    }
  },
  filters: {
    percentToStauts(value) {
      if (value >= 90) {
        return 'success'
      } else if (value >= 60 && value < 90) {
        return ''
      } else {
        return 'exception'
      }
    }
  },
  data() {
    return {
      eduList: [
        { name: '深圳大学', url: 'https://www.szu.edu.cn/' },
        { name: '深圳信息职业技术学院', url: 'https://www.sziit.edu.cn/' },
        { name: '深圳华强职校', url: 'https://hqzx.szftedu.cn/' },
      ],
      skillList: [
        { name: 'Vue', percent: 90 },
        { name: 'Javascript', percent: 80 },
        { name: 'Css', percent: 70 },
        { name: 'Java', percent: 20 },
      ]
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.user-card {
  .user-profile {
    text-align: center;

    .user-name {
      padding-top: 10px;
      font-weight: 700;
    }

    .user-role {
      padding-top: 10px;
      font-weight: 400;
      font-size: 14px;
    }
  }

  .user-process {
    margin-top: 20px;
    color: #666;

    .edu-item {
      padding: 5px 0;

      .index {
        padding-right: 6px;
      }
    }

    .process-section {
      font-size: 14px;
      padding: 10px 0;

      .header {
        border-bottom: 1px solid #dfe6ec;
        padding-bottom: 10px;
        margin-bottom: 10px;
        font-weight: 700;

        span {
          padding-left: 4px;
        }
      }
    }
  }

  .user-icon > img {
    width: 100px;
    height: 100px;
    border-radius: 100%;
  }
}
</style>
