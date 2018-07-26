<template>
  <div>
    <p class="card">
      <slot>测试123slot</slot>
    </p>
  </div>
</template>

<script>
export default {
  props: ['text']
}
</script>

<style lang="less" scoped>
.card {
  padding: 10px;
}
</style>
