import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ActivityAPI, 
  ActivityJoinAPI, 
  AuthAPI, 
  BranchAPI, 
  MaterialAPI, 
  MemberAPI, 
  NoticeAPI, 
  TransferAPI, 
  UserDataAPI, 
  UserDocumentAPI 
} from '../api/standardized';
import ApiService from '../services/ApiService';

// 创建API上下文
const ApiContext = createContext();

/**
 * API上下文提供者组件
 * 提供所有API模块的访问
 */
export const ApiProvider = ({ children }) => {
  // 认证状态
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // 初始化时检查认证状态
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // 如果有token，尝试获取当前用户信息
      fetchCurrentUser();
    }
  }, []);
  
  // 获取当前用户信息
  const fetchCurrentUser = async () => {
    try {
      const user = await ApiService.get('/auth/me');
      setCurrentUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      // 如果获取失败，清除token
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setCurrentUser(null);
    }
  };
  
  // 登录处理
  const login = async (username, password) => {
    try {
      const response = await ApiService.login(username, password);
      if (response.status === 'success') {
        setIsAuthenticated(true);
        setCurrentUser(response.data);
        return { success: true, user: response.data };
      } else {
        return { success: false, reason: response.reason };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, reason: '登录失败，请稍后重试' };
    }
  };
  
  // 登出处理
  const logout = async () => {
    try {
      await ApiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // 无论API是否成功，都清除本地状态
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setCurrentUser(null);
    }
  };
  
  // 创建API上下文值
  const apiContextValue = {
    // 认证相关
    isAuthenticated,
    currentUser,
    login,
    logout,
    
    // API模块
    activityApi: ActivityAPI,
    activityJoinApi: ActivityJoinAPI,
    authApi: AuthAPI,
    branchApi: BranchAPI,
    materialApi: MaterialAPI,
    memberApi: MemberAPI,
    noticeApi: NoticeAPI,
    transferApi: TransferAPI,
    userDataApi: UserDataAPI,
    userDocumentApi: UserDocumentAPI,
    
    // API服务
    apiService: ApiService
  };
  
  return (
    <ApiContext.Provider value={apiContextValue}>
      {children}
    </ApiContext.Provider>
  );
};

/**
 * 使用API上下文的Hook
 */
export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};

export default ApiContext;
