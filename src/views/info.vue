<template>
  <div class="page-my-info">
    <div class="title">基本信息</div>

    <el-form
      :model="form"
      :disabled="saving"
      label-width="80px"
    >
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :action="`${base}/uploadFile`"
          :headers="headers"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
import base from '@/utils/base';

export default {
  name: 'sys-info',
  data() {
    return {
      base,
      saving: false,
      form: {
        avatar: '',
        username: '',
        password: ''
      },
      imageUrl: ''
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    },
    headers() {
      return {
        'Authorization': localStorage.getItem('access_token')
      };
    }
  },
  mounted() {
    this.form.username = this.userInfo.username;
    this.form.password = this.userInfo.password;
    this.form.avatar = this.userInfo.avatar;
    if (this.userInfo.avatar) this.imageUrl = this.userInfo.avatar;
  },
  methods: {
    async save() {
      this.saving = true;

      const { username, password, avatar } = this.form;

      try {
        await userUpdate({
          avatar, 
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
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.avatar = res.url;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
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