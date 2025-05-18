import API_BASE_URL from '../config/apiConfig';

/**
 * ApiService - 统一处理API请求的服务
 */
class ApiService {
  /**
   * 发送GET请求
   * @param {string} endpoint - API端点
   * @param {Object} params - 查询参数
   * @returns {Promise<any>} - 响应数据
   */
  static async get(endpoint, params = {}) {
    try {
      const url = new URL(`${API_BASE_URL}${endpoint}`);
      
      // 添加查询参数
      if (Object.keys(params).length > 0) {
        Object.keys(params).forEach(key => {
          if (params[key] !== undefined && params[key] !== null) {
            url.searchParams.append(key, params[key]);
          }
        });
      }
      
      // 获取存储的token
      const token = localStorage.getItem('token');
      
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API GET request failed:', error);
      throw error;
    }
  }
  
  /**
   * 发送POST请求
   * @param {string} endpoint - API端点
   * @param {Object} data - 请求体数据
   * @returns {Promise<any>} - 响应数据
   */
  static async post(endpoint, data = {}) {
    try {
      // 获取存储的token
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API POST request failed:', error);
      throw error;
    }
  }
  
  /**
   * 发送PUT请求
   * @param {string} endpoint - API端点
   * @param {Object} data - 请求体数据
   * @returns {Promise<any>} - 响应数据
   */
  static async put(endpoint, data = {}) {
    try {
      // 获取存储的token
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API PUT request failed:', error);
      throw error;
    }
  }
  
  /**
   * 发送DELETE请求
   * @param {string} endpoint - API端点
   * @returns {Promise<any>} - 响应数据
   */
  static async delete(endpoint) {
    try {
      // 获取存储的token
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      // DELETE请求可能没有响应体
      if (response.status === 204) {
        return { success: true };
      }
      
      return await response.json();
    } catch (error) {
      console.error('API DELETE request failed:', error);
      throw error;
    }
  }
  
  /**
   * 处理登录请求
   * @param {string} username - 用户名
   * @param {string} password - 密码
   * @returns {Promise<any>} - 登录响应
   */
  static async login(username, password) {
    try {
      const response = await this.post('/auth/login', { username, password });
      
      // 如果登录成功，存储token
      if (response.status === 'success' && response.token) {
        localStorage.setItem('token', response.token);
      }
      
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }
  
  /**
   * 处理登出请求
   * @returns {Promise<any>} - 登出响应
   */
  static async logout() {
    try {
      const response = await this.post('/auth/logout');
      
      // 清除存储的token
      localStorage.removeItem('token');
      
      return response;
    } catch (error) {
      console.error('Logout failed:', error);
      // 即使API请求失败，也清除token
      localStorage.removeItem('token');
      throw error;
    }
  }
}

export default ApiService;
