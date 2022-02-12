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
  </div>
</template>

<script>
import { getArticleList, removeArticle } from '@/api/article/article';

const columns = [
  { prop: 'title', label: '标题', width: '100', align: 'center' },
  { prop: 'category', label: '目录', width: '100', align: 'center' },
  { prop: 'tags', label: '标签', width: '100', align: 'center' },
  { prop: 'status', label: '状态', width: '100', align: 'center' },
  { prop: 'author', label: '作者', width: '100', align: 'center' }
];

export default {
  name: 'article-list',
  data() {
    return {
      columns,
      loading: false,
      isEdit: false,
      tableData: []
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;
      this.tableData = await getArticleList();
      this.loading = false;
    },
    handleAdd() {
      this.isEdit = false;
      this.$router.push('/article/create');
    },
    handleEdit(index, row) {
      this.isEdit = true;
      this.$router.push(`/article/edit/${row._id}`);
    },
    async handleDelete(index, row) {
      await removeArticle(row._id);
      this.$message.success('删除成功');
      this.fetchData();
    },
    handleRefresh() {
      this.fetchData();
    }
  }
}
</script>
