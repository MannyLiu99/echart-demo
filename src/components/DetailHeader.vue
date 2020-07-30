<template>
  <div class="header">
    <el-button type="primary" icon="el-icon-back" @click="goBack"
      >返回</el-button
    >
  </div>
</template>
<script>
export default {
  methods: {
    goBack() {
      // 返回上一页
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  text-align: left;
}
</style>
