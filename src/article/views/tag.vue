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

      <el-table-column type="expand">
        <template slot-scope="props">
          <div :style="{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            paddingLeft: '10px',
            color: '#666'
          }">
            文章集合：{{ props.row.articles.length > 0 ? '' : '空' }}
            <template v-for="(article, index) in props.row.articles">
              <span
                :style="{ 
                  display: 'inline-block',
                  padding: '3px 10px',
                  marginRight: '10px',
                  color: '#666',
                  backgroundColor: '#f2f2f2',
                  borderRadius: '2px'
                }"
                :key="index">
                {{article}}
              </span>
            </template>
          </div>
        </template>
      </el-table-column>

      <el-table-column v-for="col in columns"
        :key="col.prop"
        :label="col.label"
        :min-width="col.width"
        :align="col.align">

        <template slot-scope="scope">
          <template v-if="col.prop === 'color' && scope.row[col.prop]">
            <span
              :style="{ 
                backgroundColor: scope.row[col.prop],
                padding: '0 10px',
                color: '#fff'
              }">
              {{ scope.row[col.prop] }}
            </span>
          </template>

          <template v-else-if="col.prop === 'creator' && scope.row[col.prop]">
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
    <TagDialog
      ref="userDialog"
      :dialogVisible="dialogVisible"
      :isEdit="isEdit"
      :tagId="tagId"
      @update:dialogVisible="updateDialogVisible"
    />
  </div>
</template>

<script>
import { getTagList, removeTag } from '@/api/article/tag';
import TagDialog from '../components/tag-dialog';

const columns = [
  { prop: 'name', label: '标签名', width: '120', align: 'center' },
  { prop: 'color', label: '颜色', width: '120', align: 'center' },
  { prop: 'creator', label: '创建人', width: '120', align: 'center' }
];

export default {
  name: 'tag',
  components: {
    TagDialog
  },
  data() {
    return {
      columns,
      tableData: [],
      loading: false,
      isEdit: false,
      tagId: null,
      dialogVisible: false,
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;
      this.tableData = await getTagList();
      this.loading = false;
    },
    handleAdd() {
      this.tagId = null;
      this.isEdit = false;
      this.dialogVisible = true;
    },
    handleEdit(index, row) {
      this.tagId = row._id
      this.isEdit = true;
      this.dialogVisible = true;
    },
    async handleDelete(index, row) {
      await removeTag(row._id);
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
