<template>
  <el-dialog
    :title="isEdit ? '编辑' : '新增'"
    :visible.sync="visible"
    @closed="onDialogClosed"
    width="40%">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :inline="false"
      size="medium"
      label-width="80px"
    >
      <el-form-item label="type" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio
            v-for="item in menuTypeOptions"
            :key="item.value"
            :label="item.value"
          >{{item.text}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="name" prop="name">
        <el-input v-model.trim="form.name" placeholder="please input name"></el-input>
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
            ref="tree"
            node-key="_id"
            :style="{ marginTop: '10px' }"
            :data="polyfillMenuTree"
            :props="{ label: 'name', children: 'children' }"
            :expand-on-click-node="false"
            :highlight-current="true"
            :filter-node-method="filterNode"
            @node-click="handleNodeClick">
          </el-tree>
          <el-input v-model="selectedMenuName" readonly placeholder="please select" slot="reference"></el-input>
        </el-popover>        
      </el-form-item>
      <el-form-item v-if="form.type === 1" label="path" prop="path">
        <el-input v-model="form.path" placeholder="please input path"></el-input>
      </el-form-item>
      <el-form-item label="icon" prop="icon">
        <el-input v-model.trim="form.icon" placeholder="please select icon"></el-input>
      </el-form-item>
      <el-form-item v-if="form.type === 1" label="文件路径" prop="viewPath">
        <lite-menu-file
          :modelValue="form.viewPath"
          @update:modelValue="updateModelValue"  
        />
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button size="mini" @click="visible = false">取消</el-button>
      <el-button size="mini" type="primary" @click="submit('form')">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addMenu, updateMenu } from '@/api/sys/menu';
import LiteMenuFile from '@/components/sys/file';

export default {
  name: "MenuDialog",
  components: {
    LiteMenuFile
  },
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
    menuTree: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      menuTypeOptions: [
        { text: '目录', value: 0 },
        { text: '菜单', value: 1 }
      ],
      form: {},
      rules: {
        name: [{ required: true, message: 'name is required', trigger: 'blur' }]
      },
      filterText: '',
      selectedMenuName: ''
    }
  },
  watch: {
    dialogData(val) {
      const { _id = null, name = '', path = '', viewPath = '', type = 0,  icon = null } = val;

      // (dialogData)val有值，就是数据的回显
      this.form = { _id, name, path, viewPath, icon, type };
      if (val.parentId) this.form.parentId = val.parentId;
      this.selectedMenuName = val.parentName || '一级菜单';
    },
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  computed: {
    // dialog 显示 隐藏
    visible: {
      get() {
        return this.dialogVisible;
      },
      set(newValue) {
        this.$emit("update:dialogVisible", newValue);
      },
    },
    // 菜单书添加垫片
    polyfillMenuTree() {
      return [{
        _id: null,
        name: '一级菜单',
        children: this.menuTree
      }];
    }
  },
  methods: {
    // 节点点击
    handleNodeClick(data) {
      this.form.parentId = data._id;
      this.selectedMenuName = data.name;
    },
    // 节点筛选搜索
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    // 单框关闭的回调
    onDialogClosed() {
      this.$refs['form'].clearValidate();
      this.$refs.tree.setCurrentKey(null);
    },
    // 文件路径选择
    updateModelValue(val) {
      this.form.viewPath = val;
      console.log(val);
    },
    // 提交数据
    submit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.$utils.removePropertyOfNull(this.form, 'parentId');
          const res = this.isEdit 
            ? await updateMenu(this.form._id, this.form)
            : await addMenu(this.form);
          res 
            ? this.$message.success('操作成功')
            : this.$message.error('操作失败');
          this.visible = false;
          this.$parent.fetchData();
        } else {
          console.log("error submit menu-form");
          return false;
        }
      });
    }
  }
};
</script>