<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <div class="panel-box">
      <el-tabs type="border-card" v-model="currentTab" stretch>
        <el-tab-pane name="account">
          <template #label>
            <span> 账号登录 </span>
          </template>
          <login-account ref="accountRef" v-model="account"></login-account>
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <span> 手机登录</span>
          </template>
          <login-phone></login-phone>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="control-account">
      <el-checkbox v-model="isKeep">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="loginAction">
      立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import localCache from '@/utils/cache'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

const currentTab = ref('account')

const isKeep = ref(true)

const account = reactive({
  name: localCache.getLocalCache('name') ?? '',
  password: localCache.getLocalCache('password') ?? ''
})

const accountRef = ref<InstanceType<typeof LoginAccount>>()

const loginAction = () => {
  if (currentTab.value === 'account') {
    accountRef.value?.accountLoginAction(isKeep.value)
  }
}
</script>

<style scoped lang="scss">
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
  }

  .control-account {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }

  .login-btn {
    width: 100%;
  }
}
</style>
