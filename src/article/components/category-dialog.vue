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
      <el-form-item label="名称" prop="name">
        <el-input 
          v-model.trim="form.name"
          placeholder="请输入目录名称"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button size="mini" @click="visible = false">取消</el-button>
      <el-button size="mini" type="primary" @click="submit('form')">确定</el-button>
    </span>
  </el-dialog>
  
</template>

<script>
import { addCategory, updateCategory, findCategory } from '@/api/article/category';

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
    categoryId: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      loading: false,
      form: {
        name: '',
      },
      rules: {
        name: [{ required: true, message: 'name is required', trigger: 'blur' }]
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
        if (this.isEdit && this.categoryId) {
          // 编辑
          this.loading = true;
          const res = await findCategory(this.categoryId);
          const { _id, name } = res;
          this.form = { _id, name };
          this.loading = false;
        } else {
          if (this.form._id) delete this.form._id;
        }
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
            ? await updateCategory(this.form._id, this.form)
            : await addCategory(this.form);
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