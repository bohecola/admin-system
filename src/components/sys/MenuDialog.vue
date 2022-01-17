<template>
  <el-dialog
    :title="isEdit ? '编辑' : '新增'"
    :visible.sync="visible"
    width="40%"
    @closed="onDialogClosed">
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
      <el-form-item label="type" prop="type">
        <el-select v-model="form.type" filterable>
          <el-option v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="parent" prop="parentId">
        <el-popover
          width="360"
          placement="bottom"
          trigger="click">
          <el-input v-model="filterText">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-tree
            :style="{ marginTop: '10px' }"
            :data="menuTree"
            :props="{ label: 'name', children: 'children' }"
            node-key="_id"
            :expand-on-click-node="false"
            :highlight-current="true"
            :filter-node-method="filterNode"
            @node-click="handleNodeClick"
            ref="tree">
          </el-tree>
          <el-input v-model="form.parentName" readonly placeholder="请选择" slot="reference"></el-input>
        </el-popover>        
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
      typeOptions: [
        { label: '目录', value: 0 },
        { label: '菜单', value: 1 }
      ],
      form: {},
      rules: {
        name: [{ required: true, message: 'name is required', trigger: 'blur' }],
        path: [{ required: true, message: 'path is required', trigger: 'blur' }],
        unique: [{ required: true, message: 'unique is required', trigger: 'blur' }],
        type: [{ required: true, message: 'type is required', trigger: 'blur' }],
      },
      filterText: '',
    }
  },
  watch: {
    dialogData(val) {
      const { parentId = null, parentName = null, type = null, _id = null, name = '', desc = '', path = '', unique = '', icon = '' } = val;
      this.form = { parentId, parentName, type, _id, name, desc, path, unique, icon }
    },
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  computed: {
    visible: {
      get() {
        return this.dialogVisible;
      },
      set(newValue) {
        this.$emit("update:dialogVisible", newValue);
      },
    },
    menuTree() {
      return this.options;
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    handleNodeClick(data) {
      this.form.parentId = data._id;
      this.form.parentName = data.name;
    },
    onDialogClosed() {
      this.$refs['form'].clearValidate();
      this.$refs.tree.setCurrentKey(null);
    },
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
    }
  },
};
</script>