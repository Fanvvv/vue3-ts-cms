<template>
  <el-form :model="account" :rules="accountRules" ref="formRef">
    <el-form-item label="账号" prop="name">
      <el-input v-model="account.name" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="account.password" show-password />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {
  ref,
  defineProps,
  defineEmits,
  defineExpose,
  PropType,
  computed
} from 'vue'
import { ElForm, ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import { Account } from '../types/index'
import localCache from '@/utils/cache'

const props = defineProps({
  modelValue: Object as PropType<Account>
})

const emit = defineEmits(['update:modelValue'])

const account = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue)
})

const accountRules = {
  name: [
    { required: true, message: '必须输入用户名', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6~20个字母或者数字',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须输入密码', trigger: 'blur' },
    { pattern: /^[a-z0-9]{3,}$/, message: '必须是3位以上数字', trigger: 'blur' }
  ]
}

const formRef = ref<InstanceType<typeof ElForm>>()

const store = useStore()

const accountLoginAction = (isKeep: boolean) => {
  // 表单验证
  formRef.value?.validate((val) => {
    if (val) {
      const name = account.value?.name
      const password = account.value?.password
      // 记住用户名和密码
      if (isKeep) {
        localCache.setLocalCache('name', name)
        localCache.setLocalCache('password', password)
      }
      // 登录
      store.dispatch('login/accountLoginAction', { name, password })
    } else {
      ElMessage.error('用户名或密码错误！！！')
    }
  })
}

defineExpose({
  accountLoginAction
})
</script>

<style lang="scss" scoped></style>
