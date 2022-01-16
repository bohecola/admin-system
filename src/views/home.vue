<template>
  <div class="page-home">
    <p>Page-Home</p>
    <p>{{ $store.getters.user }}</p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  mounted() {
    // console.log(this.$store.getters.user);
  }
}
</script>

<style lang="scss" scoped>
  p {
    word-wrap: break-word;
  }
</style>