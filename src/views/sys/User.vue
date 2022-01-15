<template>
  <div class="page-sys-user">
    <ul class="user-list">
      <li
        v-for="(item, index) of tableData"
        :key="index"
      >
        <p>_id: {{item._id}}</p>
        <p>username: {{item.username}}</p>
        <p>password: {{item.password}}</p>
        <p>name: {{item.name}}</p>
        <p>avatar: {{item.avatar}}</p>
        <p>desc: {{item.desc}}</p>
        <p>roles: {{item.roles}}</p>
        <p>createAt: {{item.createAt}}</p>
        <p>updateAt:  {{item.updateAt}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { getUserList } from '@/api/sys/user';

export default {
  name: 'User',
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    getUserList()
      .then(res => {
        this.tableData = res
      })
  }
}
</script>

<style lang="scss" scoped>

</style>