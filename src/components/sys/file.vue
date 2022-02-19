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
const files = require
  .context("@/", true, /views\/(?!(components)|(.*\/components)|(index\.js)).*.(js|vue)/)
  .keys();

const list = files.map(e => ({ value: e.substr(2) }));

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