<template>
  <div class="page-home">
    <p>Page-Home</p>
    <p>username: {{ $store.getters.userInfo.username }}</p>
    <p>avatar: {{ $store.getters.userInfo.avatar }}</p>
    <p>password: {{ $store.getters.userInfo.password }}</p>
    <p>name: {{ $store.getters.userInfo.name }}</p>
    <p>createdAt: {{ $store.getters.userInfo.createdAt }}</p>
    <p>updatedAt: {{ $store.getters.userInfo.updatedAt }}</p>
  </div>
</template>

<script>
export default {
  name: 'home',
  mounted() {
    // console.log(this.$store.getters.user);
  }
}
</script>

<style lang="scss" scoped>
  .page-home {
    background-color: #fff;
    padding: 20px;
    box-sizing: border-box;
    p {
      word-wrap: break-word;
    }
  }
</style>