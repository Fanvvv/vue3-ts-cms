import { createStore } from 'vuex'
import type { IRootState } from './types'
import login from './login/login'

const store = createStore<IRootState>({
  state: {
    name: ''
  },
  mutations: {},
  actions: {},
  modules: {
    login
  }
})

export default store
