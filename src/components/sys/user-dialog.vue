<template>
  <el-dialog
    :title="isEdit ? '编辑' : '新增'"
    :visible.sync="visible"
    width="40%"
    @closed="onDialogClosed">
    <el-form
      ref="form"
      v-loading="loading"
      :model="form"
      :rules="rules"
      :inline="false"
      size="medium"
      label-width="90px">
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
      <el-form-item label="用户名" prop="username">
        <el-input 
          v-model.trim="form.username"
          placeholder="请填写用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          placeholder="请填写密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input
          v-model.trim="form.name"
          placeholder="请填写姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input
          v-model.trim="form.desc"
          placeholder="请填写描述"
          type="textarea"
          :rows="4"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="roles">
        <el-select
          v-model="form.roles"
          multiple
          placeholder="请选择">
          <el-option
            v-for="item in roleList"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button size="mini" @click="visible = false">取消</el-button>
      <el-button size="mini" type="primary" @click="submit('form')">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addUser, updateUser, findUser } from '@/api/sys/user';
import { getRoleList } from '@/api/sys/role';
import base from '@/utils/base';

export default {
  name: 'UserDialog',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    dialogVisible: {
      type: Boolean,
      defeult: false
    },
    userId: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      base,
      loading: false,
      imageUrl: '',
      form: {
        avatar: '',
        username: '',
        password: '',
        name: '',
        desc: '',
      },
      roleList: [],
      rules: {
        username: [{ required: true, message: 'username is required', trigger: 'blur' }],
        password: [{ required: true, message: 'password is required', trigger: 'blur' }],
        roles: [{ required: true, message: 'roles is required', trigger: 'blur' }]
      }
    }
  },
  computed: {
    visible: {
      get() {
        return this.dialogVisible;
      },
      set(val) {
        this.$emit('update:dialogVisible', val);
      }
    },
    headers() {
      return {
        'Authorization': localStorage.getItem('access_token')
      };
    }
  },
  watch: {
    async visible(val) {
      if (val) {
        if (this.isEdit && this.userId) {
          // 编辑
          this.loading = true;
          const res = await findUser(this.userId);
          const { _id, avatar, username, password, name, desc, roles } = res;
          this.form = { _id, avatar, username, password, name, desc, roles };
          if (avatar) this.imageUrl = avatar;
          this.loading = false;
        } else {
          if (this.form._id) delete this.form._id;
        }
        this.roleList = await getRoleList();
      }
    }
  },
  methods: {
    onDialogClosed() {
      this.$refs['form'].resetFields();
      this.imageUrl = '';
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
    },
    submit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.$utils.removePropertyOfNull(this.form);
          const res = this.isEdit 
            ? await updateUser(this.form._id, this.form)
            : await addUser(this.form);
          res 
            ? this.$message.success('操作成功')
            : this.$message.error('操作失败');
          this.visible = false;
          this.$parent.fetchData();
        } else {
          console.log('error submit user-form');
          return false;
        }
      });
    }
  }
}
</script>