<template>
  <div class="lite-menu-file">
    <el-select v-model="path" placeholder="请选择" clearable filterable>
      <el-option v-for="(item, index) in list"
        :key="index"
        :label="item.value"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
const requireModules = require.context('../../views', false, /.vue$/);

const files = requireModules.keys().reduce((files, modulePath) => {
  files.push(requireModules.resolve(modulePath));
  return files;
}, []);

const list = files.map(item => ({ value: item.replace('./src/', '') }));

export default {
  name: 'lite-menu-file',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      list
    }
  },
  computed: {
    path: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .lite-menu-file {
    .el-select {
      width: 100%;
    }
  }
</style>