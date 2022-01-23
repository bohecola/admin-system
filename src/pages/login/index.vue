<template>
  <div class="page-login">
    <div class="login-form">
      <h2 class="login-title">{{ title }}</h2>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="rules"
        :hide-required-asterisk="true"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="用户名"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            :show-password="true"
            placeholder="密码"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item size="small">
          <el-button
            type="success"
            :loading="loading"
            @click="submit('loginForm')"
          >登录</el-button>
          <el-button
            @click="reset('loginForm')"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      title: 'admin-system',
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.loading = true;
          try {
            await this.$store.dispatch('user/login', this.loginForm);
            this.loading = false;
            this.$router.push('/home');
          } catch(err) {
            this.loading= false;
          }
        } else {
          console.log('error submit');
          return false;
        }
      })
    },
    reset(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-login {
    height: 100vh;
    width: 100vw;

    .login-form {
      position: absolute;
      width: 17.5rem;
      height: 17.5rem;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      text-align: center;

      ::v-deep .el-input__inner {
        border-radius: 0;
      }
    }
  }
</style>