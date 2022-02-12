
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
      label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input
          v-model.trim="form.name"
          placeholder="请填写名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="标识" prop="label">
        <el-input
          v-model.trim="form.label"
          placeholder="请填写标识"
        ></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model.trim="form.remark"
          type="textarea"
          placeholder="请填写备注"
        ></el-input>
      </el-form-item>
      <el-form-item label="菜单权限" prop="menus">
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText"
        ></el-input>

        <div class="scroller">
          <el-tree
            ref="tree"
            node-key="_id"
            :data="menuTree"
            :props="{ label: 'name', children: 'children' }"
            :expand-on-click-node="true"
            :highlight-current="true"
            :show-checkbox="true"
            :filter-node-method="filterNode"
            @node-click="handleNodeClick"
            @check-change="handleCheckChange"
          ></el-tree>
        </div>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button size="mini" @click="visible = false">取消</el-button>
      <el-button size="mini" @click="submit('form')" type="primary">确定</el-button>
    </span>
  </el-dialog>
  
</template>

<script>
import { addRole, updateRole } from '@/api/sys/role';
import { getMenuList } from '@/api/sys/menu';

export default {
  name: 'RoleDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    dialogData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loading: false,
      filterText: '',
      menuList: [],
      form: {},
      rules: {
        name: [{ required: true, message: 'name is required', trigger: 'blur' }],
        label: [{ required: true, message: 'label is required', trigger: 'blur' }]
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
    menuTree() {
      return this.$utils.formatDataTree(this.menuList);
    }
  },
  watch: {
    dialogData(val) {
      const { _id = null, name = '', label = '', remark = '', menus = [] } = val;
      this.form = { _id, name, label, remark, menus };
    },
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    async visible(val) {
      if (val) {
        this.menuList = await getMenuList();
        
        if (this.isEdit) {
          const leafMenus = this.menuList.filter(menu => menu.type === 1);
          const leafKeys = leafMenus.map(menu => menu._id);

          const selectedKeys = this.form.menus;

          // 所有叶子menus集合和该角色的menus的作交集
          const selectedLeafKeys = selectedKeys.filter(item => leafKeys.indexOf(item) > -1);
          
          // （不能直接设置父节点的勾选状态，否则会造成子节点全部被选择）
          // 只设置子节点的勾选状态，父节点会自动保持半选状态，提交数据的时候，是会把父节点的值也一并提交的
          // 所以回显的时候只设置子节点就ok了

          // 回显该角色的菜单
          this.$refs.tree.setCheckedKeys(selectedLeafKeys);
        }
      }
    }
  },
  methods: {
    // 节点选择
    handleCheckChange(data, checked, indeterminate) {
      // console.log(data, checked, indeterminate);
    },
    // 节点点击
    handleNodeClick(data) {
      // console.log(data);
    },
    // 得到勾选节点的keys
    getAllCheckedKeys() {
      const checkedKeys = this.$refs.tree.getCheckedKeys();
      const halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys();
      if (halfCheckedKeys.length > 0 ) {
        return checkedKeys.concat(halfCheckedKeys);
      }
      return checkedKeys;
    },
    // 节点筛选
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    // dialog关闭回调
    onDialogClosed() {
      this.$refs['form'].clearValidate();
      this.$refs.tree.setCheckedKeys([]);
      this.menuList = [];
    },
    submit(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          // 被勾选的菜单_id数组（给角色分配的菜单）
          this.form.menus = this.getAllCheckedKeys();
          this.$utils.removePropertyOfNull(this.form);

          // 数据提交
          const res = this.isEdit
            ? await updateRole(this.form._id, this.form)
            : await addRole(this.form);
          res 
            ? this.$message.success('操作成功')
            : this.$message.error('操作失败');
          this.visible = false;
          this.$parent.fetchData();
        } else {
          console.log('error submit role-form');
          return false;
        }
      });
    }
  }
}
</script>