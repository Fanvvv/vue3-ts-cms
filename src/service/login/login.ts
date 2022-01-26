import jyRequest from '../index'
import type { Account, LoginInfo } from './types'

enum LoginApi {
  AccountLogin = '/login'
}

// 用户登录
export function accountLogin(account: Account) {
  return jyRequest.post<LoginInfo>({
    url: LoginApi.AccountLogin,
    data: account
  })
}
