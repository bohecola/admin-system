<template>
  <div class="lite-crud">
    <div class="table-toolbar">
      <el-button size="mini" @click="handleRefresh">刷新</el-button>
      <el-button size="mini" @click="handleAdd" type="primary">新增</el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      :header-cell-style="{background: '#ebeef5'}"
      border>
      <el-table-column v-for="col in columns"
        :prop="col.prop"
        :key="col.prop"
        :label="col.label"
        :min-width="col.width"
        :align="col.align">
      </el-table-column>
      <el-table-column align="center" label="创建时间" min-width="160">
        <template slot-scope="scope">
          {{ scope.row.createdAt | dateFormat('Y-m-d H:i:s') }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="更新时间" min-width="160">
        <template slot-scope="scope">
          {{ scope.row.updatedAt | dateFormat('Y-m-d H:i:s') }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="160">
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

    <div class="table-pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.page"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="query.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

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
import { getRolePage, removeRole, findRole } from '@/api/sys/role';
import RoleDialog from '@/components/sys/role-dialog';

const columns = [
  { prop: 'name', label: '名称', width: '80', align: 'center' },
  { prop: 'label', label: '标签', width: '80', align: 'center' },
  { prop: 'remark', label: '备注', width: '160', align: 'center' }
];

export default {
  name: 'sys-role',
  data() {
    return {
      columns,
      loading: false,
      tableData: [],
      query: {
        page: 1,
        limit: 10
      },
      total: 0,
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
      this.loading = true;
      const res = await getRolePage(this.query);
      const { docs, total } = res.data;
      this.tableData = docs;
      this.total = total;
      this.loading = false;
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
      const res = await findRole(row._id);
      this.dialogData = res.data
      this.dialogVisible = true;
    },
    // 删除
    async handleDelete(index, row) {
      await removeRole(row._id);
      this.$message.success('删除成功');
      this.fetchData();
    },
    // 弹框
    updateDialogVisible(val) {
      this.dialogVisible = val;
    },
    handleSizeChange(val) {
      this.query.limit = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.query.page = val;
      this.fetchData();
    }
  }
}
</script>
