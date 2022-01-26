export interface Account {
  name: string
  password: string
}

// 登录成功的返回值
export interface LoginInfo {
  id: number
  token: string
  name: string
}
