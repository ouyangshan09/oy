<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on">
      <div class="title-container">
        <h3 class="title">系统登录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          placeholder="Username"
          name="username"
          type="text"
          auto-complete="on"
          v-model="loginForm.username"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="password"
          placeholder="Password"
          name="password"
          auto-complete="on"
          v-model="loginForm.password"
          :type="passwordType"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="handleShowPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom:30px"
        @click.native.prevent="handleLogin"
      >
        Login
      </el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    const validatePassword = (rule, value, next) => {
      if (!value || value.length < 6) {
        next(new Error('输入密码的长度小于6位'))
      } else {
        next()
      }
    }

    return {
      loginForm: {
        username: 'admin',
        password: '123456',
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入账号' },
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword },
        ],
      },
      passwordType: 'password',
      loading: false,
      redirect: undefined,
      queryJson: {},
    };
  },
  created() {},
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus();
    }
  },
  destroyed() {
    //
  },
  methods: {
    handleShowPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },

    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          // 开始加载
          Promise.delay().then(() => {
            // 异步回调结束 加载
            this.loading = false
            // 路由跳转
          })
        } else {
          console.log('error submit!')
          return false
        }
      })
    }
  }
};
</script>

<style lang="scss">
.login-container {
  .el-input {
    display: inline-block;
    vertical-align: middle;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      height: 47px;
      color: #fff;
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  background: #2d3a4b;
  overflow: hidden;
  position: absolute;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #fff;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;;
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
    display: inline-block;
    vertical-align: middle;
    width: 30pd;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
  }
}
</style>
