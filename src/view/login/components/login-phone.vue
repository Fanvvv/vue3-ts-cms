<template>
  <el-form label-width="60px">
    <el-form-item label="手机号">
      <el-input />
    </el-form-item>
    <el-form-item label="验证码">
      <div class="verify-code">
        <el-input />
        <el-button class="code-btn" type="primary">获取验证码</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.verify-code {
  display: flex;

  .code-btn {
    margin-left: 8px;
  }
}
</style>
