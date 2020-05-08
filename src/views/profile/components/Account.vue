<template>
  <div class="account">
    <el-form ref="form" :model="form" :rules="formRules">
      <el-form-item label="姓名" prop="name">
        <el-input v-model.trim="form.name" placeholder="请输入昵称" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model.trim="form.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSumib">更新</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Account',
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
        }
      }
    }
  },
  data() {
    return {
      form: {
        name: this.user.name,
        email: this.user.email,
      },
      formRules: {
        name: [
          { required: true, message: '请输入名称' },
        ]
      },
    }
  },
  methods: {
    handleSumib() {
      this.$refs.form.validate((isVaild) => {
        if (isVaild) {
          console.log('更新数据:', this.form)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.account {
  //
}
</style>
