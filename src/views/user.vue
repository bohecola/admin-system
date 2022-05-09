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
        :key="col.prop"
        :label="col.label"
        :min-width="col.width"
        :align="col.align">

        <template slot-scope="scope">
          <template v-if="scope.row[col.prop] && col.prop === 'roleName'">
            <el-tag
              v-for="roleName in scope.row[col.prop].split(',')"
              :key="roleName"
              size="mini"
              :style="{ margin: '2px', borderColor: '#4165d7' }"
              color="#4165d7"
              effect="dark">
              {{ roleName }}
            </el-tag>
          </template>

          <template v-else>
            {{ scope.row[col.prop] }}
          </template>
        </template>

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
      
      <el-table-column fixed="right" align="center" label="操作" min-width="160">
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

    <UserDialog
      ref="userDialog"
      :dialogVisible="dialogVisible"
      :isEdit="isEdit"
      :userId="userId"
      @update:dialogVisible="updateDialogVisible"
    />
  </div>
</template>

<script>
import { getUserPage, removeUser } from '@/api/sys/user';
import UserDialog from '@/components/sys/user-dialog';

const columns = [
  { prop: 'username', label: '用户名称', width: '100', align: 'center' },
  { prop: 'password', label: '密码', width: '100', align: 'center' },
  { prop: 'name', label: '姓名', width: '100', align: 'center' },
  { prop: 'roleName', label: '角色', width: '160', align: 'center' },
  { prop: 'desc', label: '描述', width: '160', align: 'center' }
];

export default {
  name: 'sys-user',
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
      dialogVisible: false,
      isEdit: false,
      userId: null
    }
  },
  components: {
    UserDialog
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;
      const res = await getUserPage(this.query);
      const { docs, total } = res.data;
      this.tableData = docs;
      this.total = total;
      this.loading = false;
    },
    handleAdd() {
      this.isEdit = false;
      this.userId = null;
      this.dialogVisible = true;
    },
    handleEdit(index, row) {
      this.isEdit = true;
      this.userId = row._id;
      this.dialogVisible = true;
    },
    async handleDelete(index, row) {
      await removeUser(row._id);
      this.$message.success('删除成功');
      this.fetchData();
    },
    handleRefresh() {
      this.fetchData();
    },
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
