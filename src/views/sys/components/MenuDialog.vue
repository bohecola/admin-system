<template>
  <el-dialog
    :title="isEdit ? '编辑' : '新增'"
    :visible.sync="visible"
    width="30%">
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-width="80px"
      :inline="false"
      size="medium"
    >
      <el-form-item label="name" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="desc" prop="desc">
        <el-input v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="parent" prop="parentId">
        <el-select v-model="form.parentId" clearable filterable @change="handleSelectChange">
          <el-option v-for="item in options"
            :key="item.value"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="path" prop="path">
        <el-input v-model="form.path"></el-input>
      </el-form-item>
      <el-form-item label="unique" prop="unique">
        <el-input v-model="form.unique"></el-input>
      </el-form-item>
      <el-form-item label="icon" prop="icon">
        <el-input v-model="form.icon"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="visible = false">取 消</el-button>
      <el-button size="mini" type="primary" @click="submit('form')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addMenu, updateMenu } from '@/api/sys/menu';

export default {
  name: "MenuDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    dialogData: {
      type: Object,
      default: () => {}
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      form: {},
      rules: {
        name: [{ required: true, message: 'name is required', trigger: 'blur' }],
        path: [{ required: true, message: 'path is required', trigger: 'blur' }],
        unique: [{ required: true, message: 'unique is required', trigger: 'blur' }]
      },
    }
  },
  watch: {
    dialogData(val) {
      const {
        parentId = null,
        _id = null,
        name = '',
        desc = '',
        path = '',
        unique = '',
        icon = ''
      } = val;
      this.form = {
        parentId,
        _id,
        name,
        desc,
        path,
        unique,
        icon
      }
    }
  },
  computed: {
    visible: {
      get() {
        return this.dialogVisible;
      },
      set(newValue) {
        this.$emit("update:dialogVisible", newValue);
        if (!newValue) {
          this.$refs['form'].clearValidate();
        }
      },
    },
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = !this.isEdit ? await addMenu(this.form) : await updateMenu(this.form._id, this.form);
          console.log(!this.isEdit ? 'add' : 'edit', res);
          this.$message({
            message: res ? '操作成功' : '操作失败',
            type: res ? 'success' : 'error'
          });
          this.visible = false;
          this.$parent.fetchData();
        } else {
          console.log("error submit menu-form");
          return false;
        }
      });
    },
    handleSelectChange() {

    }
  },
};
</script>