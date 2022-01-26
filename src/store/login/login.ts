import type { Module } from 'vuex'
import type { ILoginState } from './types'
import type { IRootState } from '../types'
import { accountLogin } from '@/service/login/login'
import localCache from '@/utils/cache'
import router from '@/router'

const login: Module<ILoginState, IRootState> = {
  namespaced: true,
  state: {
    token: ''
  },
  mutations: {
    saveToken(state, token: string) {
      state.token = token
    }
  },
  actions: {
    // 登录
    async accountLoginAction(
      { commit },
      account: { name: string; password: string }
    ) {
      // 保存 token
      const { token } = await accountLogin(account)
      commit('saveToken', token)
      localCache.setLocalCache('token', token)

      // 跳转页面
      router.push('/main')
    }
  }
}

export default login
