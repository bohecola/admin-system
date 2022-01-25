<template>
  <div class="lite-crud">
    <div class="table-toolbar">
      <el-button size="mini" @click="handleRefresh">刷新</el-button>
      <el-button size="mini" @click="handleAdd" type="primary">新增</el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      border>
      <el-table-column v-for="col in columns"
        :key="col.prop"
        :label="col.label"
        :min-width="col.width"
        :align="col.align">

        <template slot-scope="scope">
          <template v-if="col.prop === 'roleName' && scope.row[col.prop]">
            <el-tag
              v-for="roleName in scope.row[col.prop].split(',')"
              :key="roleName"
              :style="{ margin: '2px' }"
              size="mini"
              effect="dark">
              {{ roleName }}
            </el-tag>
          </template>

          <template v-else>
            {{ scope.row[col.prop] }}
          </template>
        </template>

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
      
      <el-table-column fixed="right" align="center" label="operate" min-width="160">
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
import { getUserList, removeUser } from '@/api/sys/user';
import UserDialog from '@/components/sys/user-dialog';

const columns = [
  { prop: 'username', label: 'username', width: '100', align: 'center' },
  { prop: 'password', label: 'password', width: '100', align: 'center' },
  { prop: 'name', label: 'name', width: '100', align: 'center' },
  { prop: 'roleName', label: 'roleName', width: '160', align: 'center' },
  { prop: 'desc', label: 'desc', width: '160', align: 'center' }
];

export default {
  name: 'sys-user',
  data() {
    return {
      columns,
      loading: false,
      tableData: [],
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
      this.tableData = await getUserList();
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
    }
  }
}
</script>
