<template>
  <div class="sys-menu">
    <div class="table-toolbar">
      <el-button size="mini" @click="handleRefresh">刷新</el-button>
      <el-button type="primary" size="mini" @click="handleAdd">新增</el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="polyfillTreeData"
      row-key="_id"
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      border
    >
      <el-table-column align="left" width="160" label="name" prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" width="80" label="desc" prop="desc"></el-table-column>
      <!-- <el-table-column align="center" width="160" label="parentName" prop="parentName" show-overflow-tooltip></el-table-column> -->
      <el-table-column align="center" width="80" label="type">
        <template slot-scope="scope">
          {{ scope.row.type | menuTypeFormat }}
        </template>
      </el-table-column>
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
import MenuDialog from '@/components/sys/MenuDialog';

export default {
  name: 'Menu',
  components: {
    MenuDialog
  },
  data() {
    return {
      treeData: [],
      dialogVisible: false,
      isEdit: false,
      dialogData: {},
      options: [],
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
          item.desc = item.desc || '-';
          item.parentId = item.parentId || '-';
          item.icon = item.icon || '-';
          item.hidden = String(item.hidden);
          return item;
        })
      }
      return recurPolyfill(this.treeData);
    }
  },
  methods: {
    async fetchData() {
      this.loading = true;
      const res = await getMenuList();
      this.treeData = this.formatDataTree(res);
      this.loading = false;
    },

    // 树形结构
    formatDataTree(data) {
      let parent = data.filter(p => p.parentId === null),
          children = data.filter(c => c.parentId !== null);
      
      dataToTree(parent, children);

      return parent;

      function dataToTree(parent, children) {
        parent.map(p => {
          children.map((c, i) => {
            if (c.parentId === p._id) {
              let _children = JSON.parse(JSON.stringify(children));
              _children.splice(i, 1);
              dataToTree([c], _children);
              // 找了一个叶子节点后，从这个叶子节点出发继续寻找这个叶子节点下的子节点
              // 直至这一轮找完，开始下一轮遍历
              if (p.children) {
                p.children.push(c);
              } else {
                p.children = [c];
              }
            }
          });
        });
      }
    },

    handleAdd() {
      this.isEdit = false;
      this.dialogData = {};
      this.options = this.treeData;
      this.dialogVisible = true;
    },
    async handleEdit(index, row) {
      this.isEdit = true;
      this.dialogData = await findMenu(row._id);
      this.options = this.treeData;
      this.dialogVisible = true;
    },
    async handleDelete(index, row) {
      const res = await removeMenu(row._id);
      this.$message({
        message: '删除成功',
        type: 'success'
      });
      this.fetchData();
      console.log('delete', res);
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