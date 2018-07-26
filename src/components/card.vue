<template>
  <div>
    <p class="card">
      {{text}}
      <slot name='test-demo-module'>测试slot</slot>
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
