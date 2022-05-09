<template>
  <div class="page-article">
    <el-form
      ref="form"
      v-loading="loading"
      :model="form"
      :rules="rules"
      :inline="true"
      size="medium"
      label-width="90px">
      <el-form-item prop="title">
        <el-input
          v-model.trim="form.title"
          placeholder="标题"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="form.category"
          placeholder="目录选择"
          clearable
          @change="handleCategorySelect">
          <el-option v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="form.tags"
          placeholder="标签选择"
          multiple
          clearable
          @change="handleTagsSelect">
          <el-option v-for="item in tags"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="other-btn">
        <el-button size="small" @click="goBack">返回</el-button>
        <el-button type="primary" size="small" @click="submit('form')">
          {{ isEdit ? '保存' : '发布' }}
        </el-button>
      </el-form-item>
    </el-form>
    <v-md-editor
      v-model="form.content"
      :disabled-menus="[]"
      @upload-image="handleUploadImage"
      class="custom-edit"
    ></v-md-editor>
  </div>
</template>

<script>
import { getCategoryList } from '@/api/article/category';
import { getTagList } from '@/api/article/tag';
import { addArticle, updateArticle, findArticle } from '@/api/article/article';
import { uploadFile } from '@/api/common';

export default {
  name: 'article-detail',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      categories: [],
      tags: [],
      form: {
        title: '',
        content: '',
        category: null,
        tags: []
      },
      rules: {
        name: [{ required: true, message: 'name is required', trigger: 'blur' }]
      }
    }
  },
  async mounted() {
    this.categories = await getCategoryList();
    this.tags = await getTagList();
    if (this.$route.params && this.$route.params.id) {
      const res = await findArticle(this.$route.params.id);
      this.form = res.data;
    }
  },
  methods: {
    async handleUploadImage(event, insertImage, files) {
      // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容

      const formData = new FormData();
      formData.append('file', files[0]);

      const res = await uploadFile(formData);
      const { url, fileName } = res;

      // 此处只做示例
      insertImage({
        url: url,
        desc: fileName,
        // width: 'auto',
        // height: 'auto',
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    submit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.$utils.removePropertyOfNull(this.form);
          const res = this.isEdit
            ? await updateArticle(this.form._id, this.form)
            : await addArticle(this.form);
          res 
            ? this.$message.success('操作成功')
            : this.$message.error('操作失败');
          this.$router.go(-1);
        } else {
          console.log('error submit article-form');
          return false;
        }
      });
    },
    handleCategorySelect() {

    },
    handleTagsSelect() {

    },
  }
}
</script>

<style lang="scss" scoped>
.page-article {
  padding: 20px;
  background-color: #fff;

  .other-btn {
    float: right;
  }
  .custom-edit {
    height: calc(100% - 58px);
  }
}
</style>