<template>
  <div class="login-container">
    <el-form ref="loginForm" class="login-form" autocomplete="on">
      <div class="title-container">
        <h3 class="title">系统登录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <span>svg</span>
        </span>
        <el-input
          ref="username"
          placeholder="Username"
          name="username"
          type="text"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <span>svg</span>
        </span>
        <el-input ref="password" placeholder="Password" name="password" auto-complete="on" />
      </el-form-item>

      <el-button type="primary" style="width: 100%; margin-bottom:30px">Login</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      //
    };
  },
  created() {},
  mounted() {
    //
  },
  destroyed() {
    //
  },
  methods: {
    //
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
}
</style>
