import axios from 'axios'
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import { ElLoading } from 'element-plus'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

interface InterceptorHooks {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (response: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}

interface JYRequestConfig extends AxiosRequestConfig {
  showLoading?: boolean
  interceptorHooks?: InterceptorHooks
}

interface JYData<T> {
  data: T
  returnCode: string
  success: boolean
}

class JYRequest {
  config: AxiosRequestConfig
  instance: AxiosInstance
  interceptorHooks?: InterceptorHooks
  loading?: LoadingInstance
  showLoading?: boolean

  constructor(options: JYRequestConfig) {
    this.config = options
    // 是否展示加载动画，如果不传，则默认展示
    this.showLoading = options.showLoading ?? true
    // 接口实例自己所拥有的拦截器
    this.interceptorHooks = options.interceptorHooks
    // 创建 axios 实例
    this.instance = axios.create(options)
    // 每个接口实例自己所拥有的请求响应拦截器
    this.instance.interceptors.request.use(
      this.interceptorHooks?.requestInterceptor,
      this.interceptorHooks?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptorHooks?.responseInterceptor,
      this.interceptorHooks?.responseInterceptorCatch
    )
    // 所有接口实例都拥有的请求响应拦截器
    this.instance.interceptors.request.use((config) => {
      // 是否需要加载动画
      if (this.showLoading) {
        this.loading = ElLoading.service({
          lock: true,
          text: 'Loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
      }
      return config
    })
    this.instance.interceptors.response.use(
      // 响应完成后关闭加载动画
      (res) => {
        this.loading?.close()
        return res
      },
      (err) => {
        this.loading?.close()
        return err
      }
    )
  }
  request<T = any>(config: JYRequestConfig): Promise<T> {
    return new Promise((resovle, reject) => {
      this.instance.request<any, JYData<T>>(config).then(
        (res) => {
          resovle(res.data)
        },
        (err) => {
          reject(err)
        }
      )
    })
  }
  get<T = any>(config: JYRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: JYRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: JYRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: JYRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default JYRequest
