<template>
  <div class="page-login">
    <div class="box">
      <img class="logo" src="@/assets/logo.png" />
      <p class="desc">admin-system</p>

      <el-form
        ref="loginForm"
        class="form"
        size="medium"
        :model="loginForm"
        :rules="rules"
        :hide-required-asterisk="true"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            :show-password="true"
            placeholder="请输入密码"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      
      <el-button
        round
        size="small"
        class="submit-btn"
        :loading="loading"
        @click="submit('loginForm')"
      >登录</el-button>
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

<style lang="scss">
  .page-login {
    height: 100vh;
    width: 100vw;
    background-color: #2f3447;
    position: relative;

    .box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 500px;
      width: 500px;
      position: absolute;
      left: calc(50% - 250px);
      top: calc(50% - 250px);

      .logo {
        height: 50px;
        margin-bottom: 20px;
      }

      .desc {
        color: #ccc;
        font-size: 12px;
        margin-bottom: 60px;
        letter-spacing: 1px;
      }

      .el-form {
        width: 300px;
        border-radius: 3px;

        .el-form-item {
          margin-bottom: 20px;

          &__label {
            color: #ccc;
          }
        }

        .el-input {
          .el-input__inner {
            border: 0;
            border-bottom: 0.5px solid #999;
            border-radius: 0;
            padding: 0 5px;
            background-color: transparent;
            color: #ccc;
            transition: border-color 0.3s;
            position: relative;

            &:focus {
              border-color: #fff;
              color: #fff;
            }

            &:-webkit-autofill {
              -webkit-text-fill-color: #fff !important;
              -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
              transition: background-color 50000s ease-in-out 0s;
            }
          }
        }
      }

      .submit-btn {
        margin-top: 40px;
        padding: 9px 40px;
        color: #000;
      }
    }
  }
</style>