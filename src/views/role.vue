<template>
  <div class="sys-role">
    <div class="table-toolbar">
      <el-button size="mini" @click="handleRefresh">刷新</el-button>
      <el-button size="mini" @click="handleAdd" type="primary">新增</el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      border>
      <el-table-column v-for="col in columns"
        :prop="col.id"
        :key="col.id"
        :label="col.label"
        :min-width="col.width"
        :align="col.align">
      </el-table-column>
      <el-table-column align="center" label="createdAt" min-width="160">
        <template slot-scope="scope">
          {{ scope.row.createdAt | dateFormat('Y-m-d H:i:s') }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="updatedAt" min-width="160">
        <template slot-scope="scope">
          {{ scope.row.updatedAt | dateFormat('Y-m-d H:i:s') }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="operate" min-width="160">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <RoleDialog
      ref="roleDialog"
      :dialogVisible="dialogVisible"
      :isEdit="isEdit"
      :dialogData="dialogData"
      @update:dialogVisible="updateDialogVisible"
    />
  </div>
</template>

<script>
import { getRoleList, removeRole, findRole } from '@/api/sys/role';
import RoleDialog from '@/components/sys/RoleDialog';

const columns = [
  { id: 'name', label: 'name', width: '80', align: 'center' },
  { id: 'label', label: 'label', width: '80', align: 'center' },
  { id: 'remark', label: 'remark', width: '160', align: 'center' }
];

export default {
  name: 'Role',
  data() {
    return {
      columns,
      loading: false,
      tableData: [],
      dialogData: {},
      dialogVisible: false,
      isEdit: false
    }
  },
  components: {
    RoleDialog
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    // 列表
    async fetchData() {
      this.tableData = await getRoleList();
    },
    // 刷新
    handleRefresh() {
      this.fetchData();
    },
    // 新增
    handleAdd() {
      this.isEdit = false;
      this.dialogData = {};
      this.dialogVisible = true;
    },
    // 编辑
    async handleEdit(index, row) {
      this.isEdit = true;
      this.dialogData = await findRole(row._id);
      this.dialogVisible = true;
    },
    // 删除
    async handleDelete(index, row) {
      const res = await removeRole(row._id);
      this.$message({
        message: '删除成功',
        type: 'success'
      });
      this.fetchData();
    },
    // 弹框
    updateDialogVisible(val) {
      this.dialogVisible = val;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>