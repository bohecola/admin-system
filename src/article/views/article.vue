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
          <template v-if="col.prop === 'tags' && scope.row[col.prop]">
            <span
              v-for="tag in scope.row[col.prop]"
              :key="tag.name"
              :style="{
                display: 'inline-block',
                margin: '2px',
                padding: '0 6px',
                color: '#fff',
                fontSize: '12px',
                lineHeight: '18px',
                borderRadius: '2px',
                textAlign: 'center',
                backgroundColor: tag.color
              }">
              {{ tag.name }}
            </span>
          </template>

          <template v-else-if="col.prop === 'category' && scope.row[col.prop]">
            {{ scope.row[col.prop].name }}
          </template>

          <template v-else-if="col.prop === 'author' && scope.row[col.prop]">
            <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'center' }">
              <img
                :style="{
                  height: '32px',
                  borderRadius: '50%',
                  marginRight: '10px',
                  objectFit: 'cover'
                }"
                :src="scope.row[col.prop].avatar"
                :alt="scope.row[col.prop].username"
              >
              <span>
                {{ scope.row[col.prop].username }}
              </span>
            </div>
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
  </div>
</template>

<script>
import { getArticlePage, removeArticle } from '@/api/article/article';

const columns = [
  { prop: 'title', label: '标题', width: '100', align: 'center' },
  { prop: 'category', label: '目录', width: '100', align: 'center' },
  { prop: 'tags', label: '标签', width: '100', align: 'center' },
  { prop: 'status', label: '状态', width: '80', align: 'center' },
  { prop: 'author', label: '作者', width: '160', align: 'center' }
];

export default {
  name: 'article-list',
  data() {
    return {
      columns,
      loading: false,
      isEdit: false,
      tableData: [],
      query: {
        page: 1,
        limit: 10
      },
      total: 0
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;
      const res = await getArticlePage(this.query);
      const { docs, total } = res.data;
      this.tableData = docs;
      this.total = total;
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
