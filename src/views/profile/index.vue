<template>
  <div class="app-container">
    <el-row v-if="profile" :gutter="20">
      <el-col :span="6">
        <el-card>
          <div slot="header" class="clearfix">
            <span>关于我</span>
          </div>
          <user-card :user="profile" />
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="tab">
            <el-tab-pane label="活跃" name="activity">
              <activity />
            </el-tab-pane>
            <el-tab-pane label="时间线" name="timeline">
              <time-line />
            </el-tab-pane>
            <el-tab-pane label="账户" name="account">
              <account :user="profile" />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserCard from './components/UserCard'
import TimeLine from './components/TimeLine'
import Activity from './components/Activity'
import Account from './components/Account'

export default {
  name: "Profile",
  components: {
    UserCard,
    TimeLine,
    Activity,
    Account,
  },
  data() {
    return {
      tab: "activity"
    };
  },
  computed: {
    ...mapGetters([
      'profile',
    ])
  },
  methods: {
  },
  mounted() {
  },
  beforeDestroy() {
    //
  }
};
</script>
