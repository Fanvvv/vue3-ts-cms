<template>
  <div id="app">
    <router-view></router-view>
    <el-button type="success">default</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App'
})
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
</style>
