/**
 * @file ApiService.ts
 * @description 标准化API请求服务
 * @author Manus
 * @date 2025/5/18
 */
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// 配置API基础URL，后续可根据环境变量调整
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// 创建axios实例
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    // 从localStorage获取token
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    // 如果存在token，添加到请求头
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // 处理401未授权错误
    if (error.response?.status === 401) {
      // 清除token并重定向到登录页
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// 通用API服务
export const ApiService = {
  // GET请求
  async get<T>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await apiClient.get(url, { 
        params, 
        ...config 
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  },
  
  // POST请求
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await apiClient.post(url, data, config);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  },
  
  // PUT请求
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await apiClient.put(url, data, config);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  },
  
  // DELETE请求
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await apiClient.delete(url, config);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  },
  
  // 错误处理
  handleError(error: any): never {
    if (axios.isAxiosError(error)) {
      const serverError = error.response?.data;
      // 可以在这里添加全局错误处理逻辑，如显示错误通知等
      console.error('API Error:', serverError || error.message);
    } else {
      console.error('Unexpected Error:', error);
    }
    throw error;
  }
};

export default ApiService;
