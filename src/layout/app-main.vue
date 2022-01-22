<template>
  <div class="app-main">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app-main'
}
</script>

<style lang="scss" scoped>
  .app-main {
    margin: 1.25rem;
    padding: .75rem;
    height: 100%;
    background-color: #f5f5f5;
  }
</style>