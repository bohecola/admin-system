<template>
  <div class="page-my-info">
    <div class="title">基本信息</div>

    <el-form
      :model="form"
      :disabled="saving"
      label-width="80px"
    >
      <el-form-item label="头像" prop="avatar">
        <el-input v-model="form.avatar"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input
          v-model.trim="form.username"
          placeholder="please input username"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model.trim="form.password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button
          type="primary"
          size="mini"
          :disabled="saving"
          @click="save"
        >保存修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { userUpdate } from '@/api/common';

export default {
  name: 'sys-info',
  data() {
    return {
      saving: false,
      form: {
        username: '',
        password: ''
      }
    }
  },
  mounted() {
    this.form.username = this.userInfo.username;
    this.form.password = this.userInfo.password;
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    }
  },
  methods: {
    async save() {
      this.saving = true;

      const { username, password } = this.form;

      try {
        await userUpdate({ 
          username,
          password 
        });
        this.$message.success('修改成功');
        this.$store.dispatch('user/userInfo');
        this.saving = false;
      } catch(err) {
        this.saving = false;
        this.$message.error(err.message);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-my-info {
    background-color: #fff;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;

    .el-form {
      width: 400px;
      max-width: 100%;
    }

    .title {
      color: #000;
      margin-bottom: 30px;
      font-size: 15px;
    }
  }
</style>