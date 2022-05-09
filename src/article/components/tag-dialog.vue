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
          placeholder="请输入标签名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="颜色" prop="color">
        <el-color-picker v-model="form.color"></el-color-picker>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button size="mini" @click="visible = false">取消</el-button>
      <el-button size="mini" type="primary" @click="submit('form')">确定</el-button>
    </span>
  </el-dialog>
  
</template>

<script>
import { addTag, updateTag, findTag } from '@/api/article/tag';

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
    tagId: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      loading: false,
      form: {
        name: '',
        color: ''
      },
      rules: {
        name: [{ required: true, message: 'name is required', trigger: 'blur' }],
        color: [{ required: true, message: 'color is required', trigger: 'blur' }]
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
        if (this.isEdit && this.tagId) {
          // 编辑
          this.loading = true;
          const res = await findTag(this.tagId);
          const { _id, name, color } = res.data;
          this.form = { _id, name, color };
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
          const res = this.isEdit 
            ? await updateTag(this.form._id, this.form)
            : await addTag(this.form);
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