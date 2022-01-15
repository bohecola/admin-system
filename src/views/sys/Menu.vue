<template>
  <div class="sys-menu">
    <div class="table-toolbar">
      <el-button size="mini" @click="handleRefresh">刷新</el-button>
      <el-button type="primary" size="mini" @click="handleAdd">新增</el-button>
    </div>
    <el-table
      :data="tableData"
      border
    >
      <el-table-column align="center" width="80" label="name" prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" width="80" label="desc" prop="desc"></el-table-column>
      <el-table-column align="center" width="160" label="parentId" prop="parentId" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" width="80" label="unique" prop="unique"></el-table-column>
      <el-table-column align="center" width="180" label="path" prop="path"></el-table-column>
      <el-table-column align="center" width="80" label="icon" prop="icon"></el-table-column>
      <el-table-column align="center" width="80" label="hidden" prop="hidden"></el-table-column>
      <el-table-column align="center" width="80" label="status" prop="status"></el-table-column>
      <el-table-column align="center" width="80" label="sort" prop="sort"></el-table-column>
      <el-table-column align="center" width="160" label="createAt" prop="createAt">
        <template slot-scope="scope">
          {{ scope.row.createAt | dateFormat('Y-m-d H:i:s') }}
        </template>
      </el-table-column>
      <el-table-column align="center" width="160" label="updateAt" prop="updateAt">
        <template slot-scope="scope">
          {{ scope.row.createAt | dateFormat('Y-m-d H:i:s') }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" width="160" align="center" label="operate">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <MenuDialog
      :dialogVisible="dialogVisible"
      :isEdit="isEdit"
      :dialogData="dialogData"
      :options="options"
      @update:dialogVisible="updateDialogVisible"
    />
  </div>
</template>

<script>
import { getMenuList, removeMenu, findMenu } from '@/api/sys/menu';
import MenuDialog from './components/MenuDialog';

export default {
  name: 'Menu',
  components: {
    MenuDialog
  },
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      isEdit: false,
      dialogData: {},
      options: []
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getMenuList()
        .then(res => {
          this.tableData = res;
        })
    },
    handleAdd() {
      this.isEdit = false;
      this.dialogData = {};
      this.options = this.tableData;
      this.dialogVisible = true;
    },
    async handleEdit(index, row) {
      this.isEdit = true;
      this.dialogData = await findMenu(row._id);
      this.options = this.tableData.filter(item => item._id !== row._id);
      this.dialogVisible = true;
      console.log(index, row);
    },
    async handleDelete(index, row) {
      const res = await removeMenu(row._id);
      this.$message({
        message: '删除成功',
        type: 'success'
      });
      this.fetchData();
      console.log('delete', res);
      console.log(index, row);
    },
    handleRefresh() {
      this.fetchData();
      console.log('refresh');
    },
    updateDialogVisible(val) {
      this.dialogVisible = val;
    }
  }
}
</script>

<style lang="scss" scoped>
  .table-toolbar {
    margin-bottom: 12px;
  }
</style>