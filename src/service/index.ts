import JYRequest from './request/request'
import { API_BASE_URL, TIME_OUT } from './request/config'

const jyRequest = new JYRequest({
  baseURL: API_BASE_URL,
  timeout: TIME_OUT,
  interceptorHooks: {
    requestInterceptor: (config) => {
      return config
    },
    requestInterceptorCatch: (error) => {
      return error
    },
    responseInterceptor: (res) => {
      return res.data
    },
    responseInterceptorCatch: (error) => {
      return error
    }
  }
})

export default jyRequest
