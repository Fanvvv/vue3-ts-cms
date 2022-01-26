<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<script setup lang="ts">
import LoginPanel from './components/login-panel.vue'
</script>

<style scoped lang="scss">
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('~@/assets/img/login-bg.svg');
}
</style>
