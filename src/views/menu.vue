<template>
  <div class="lite-crud">
    <div class="table-toolbar">
      <el-button size="mini" @click="handleRefresh">刷新</el-button>
      <el-button size="mini" @click="handleAdd" type="primary">新增</el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="polyfillTreeData"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      :header-cell-style="{background: '#ebeef5'}"
      ref="table"
      row-key="_id"
      border
      max-height="500"
      @row-click="handleRowClick"
    >
      <el-table-column align="left" width="160" label="名称" prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" min-width="80" label="图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column align="center" width="80" label="类型">
        <template slot-scope="scope">
          <el-tag
            size="mini"
            :style="{ borderColor: '#4165d7' }"
            color="#4165d7"
            effect="dark">
            {{ scope.row.type | menuTypeFormat }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="180" label="节点路由" prop="path"></el-table-column>
      <el-table-column align="center" min-width="80" label="隐藏" prop="hidden"></el-table-column>
      <el-table-column align="center" min-width="80" label="状态" prop="status"></el-table-column>
      <el-table-column align="center" min-width="80" label="排序" prop="sort"></el-table-column>
      <el-table-column align="center" min-width="160" label="创建时间" prop="createdAt">
        <template slot-scope="scope">
          {{ scope.row.createdAt | dateFormat('Y-m-d H:i:s') }}
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="160" label="更新时间" prop="updatedAt">
        <template slot-scope="scope">
          {{ scope.row.updatedAt | dateFormat('Y-m-d H:i:s') }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" min-width="160" align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click.stop="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="text"
            @click.stop="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <MenuDialog
      :dialogVisible="dialogVisible"
      :isEdit="isEdit"
      :dialogData="dialogData"
      :menuTree="menuTree"
      @update:dialogVisible="updateDialogVisible"
    />
  </div>
</template>

<script>
import { getMenuList, removeMenu, findMenu } from '@/api/sys/menu';
import MenuDialog from '@/components/sys/menu-dialog';

export default {
  name: 'sys-menu',
  components: {
    MenuDialog
  },
  data() {
    return {
      tableTreeData: [],
      dialogVisible: false,
      isEdit: false,
      dialogData: {},
      menuTree: [],
      loading: false
    }
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    polyfillTreeData() {
      function recurPolyfill (treeData) {
        return treeData.map(item => {
          if (item.children) {
            recurPolyfill(item.children)
          }
          item.icon = item.icon || '-';
          item.hidden = String(item.hidden);
          return item;
        })
      }
      return recurPolyfill(this.tableTreeData);
    }
  },
  methods: {
    // 列表
    async fetchData() {
      this.loading = true;
      const res = await getMenuList();
      this.tableTreeData = this.$utils.formatDataTree(res);
      this.loading = false;
    },
    // 添加
    handleAdd() {
      this.isEdit = false;
      this.dialogData = {};
      this.menuTree = this.tableTreeData;
      this.dialogVisible = true;
    },
    // 编辑
    async handleEdit(index, row) {
      this.isEdit = true;
      this.dialogData = await findMenu(row._id);
      this.menuTree = this.tableTreeData;
      this.dialogVisible = true;
    },
    // 删除
    async handleDelete(index, row) {
      await removeMenu(row._id);
      this.$message.success('删除成功');
      this.fetchData();
    },
    // 刷新
    handleRefresh() {
      this.fetchData();
    },
    // 弹框
    updateDialogVisible(val) {
      this.dialogVisible = val;
    },
    // 行点击
    handleRowClick(row) {
      this.$refs.table.toggleRowExpansion(row);
    }
  }
}
</script>
