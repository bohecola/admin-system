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
          {{ scope.row[col.prop] }}
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
      
      <el-table-column fixed="right" align="center" label="操作" min-width="80">
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
    <CategoryDialog
      ref="userDialog"
      :dialogVisible="dialogVisible"
      :isEdit="isEdit"
      :categoryId="categoryId"
      @update:dialogVisible="updateDialogVisible"
    />
  </div>
</template>

<script>
import { getCategoryList, removeCategory } from '@/api/article/category';
import CategoryDialog from '../components/category-dialog';

const columns = [
  { prop: 'name', label: '目录名', width: '160', align: 'center' }
];

export default {
  name: 'category',
  components: {
    CategoryDialog
  },
  data() {
    return {
      columns,
      tableData: [],
      loading: false,
      isEdit: false,
      dialogVisible: false,
      categoryId: null
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;
      this.tableData = await getCategoryList();
      this.loading = false;
    },
    handleAdd() {
      this.isEdit = false;
      this.categoryId = null;
      this.dialogVisible = true;
    },
    handleEdit(index, row) {
      this.isEdit = true;
      this.categoryId = row._id;
      this.dialogVisible = true;
    },
    async handleDelete(index, row) {
      await removeCategory(row._id);
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
