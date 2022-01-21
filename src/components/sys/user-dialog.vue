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
      <el-form-item label="avatar" prop="avatar">
        <el-input
          v-model.trim="form.avatar"
          placeholder="please upload avatar"
        ></el-input>
      </el-form-item>
      <el-form-item label="username" prop="username">
        <el-input 
          v-model.trim="form.username"
          placeholder="please input username"
        ></el-input>
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input
          v-model="form.password"
          placeholder="please input password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="name" prop="name">
        <el-input
          v-model.trim="form.name"
          placeholder="please input name"
        ></el-input>
      </el-form-item>
      <el-form-item label="desc" prop="desc">
        <el-input
          v-model.trim="form.desc"
          placeholder="please input desc"
          type="textarea"
          :rows="4"
        ></el-input>
      </el-form-item>
      <el-form-item label="roles" prop="roles">
        <el-select
          v-model="form.roles"
          multiple
          placeholder="please select">
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
      loading: false,
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