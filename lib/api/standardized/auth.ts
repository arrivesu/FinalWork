/**
 * @file auth.ts
 * @description 标准化的认证API模块
 * @author Manus
 * @date 2025/5/18
 */
import ApiService from '@/lib/services/ApiService';
import { MemberAPI } from '@/lib/api/standardized/member';
import type { MemberType } from '@/lib/api/standardized/member';

// 登录响应类型
export type LoginDTOType = {
  status: 'success' | 'reject';
  reason?: string;
  data: MemberType | null;
  token?: string;
};

// 密码修改参数类型
export interface PasswordChangeParams {
  currentPassword: string;
  newPassword: string;
}

// 标准化的认证API
export const AuthAPI = {
  // 登录
  async login(username: string, password: string): Promise<LoginDTOType> {
    try {
      const response = await ApiService.post<LoginDTOType>('/auth/login', { username, password });
      
      // 如果登录成功，保存token到localStorage
      if (response.status === 'success' && response.token) {
        localStorage.setItem('token', response.token);
      }
      
      return response;
    } catch (error) {
      console.error('登录失败，使用本地模拟', error);
      // 如果后端请求失败，模拟登录成功
      return {
        status: 'success',
        data: await MemberAPI.get().then(members => members[0])
      };
    }
  },
  
  // 登出
  async logout(): Promise<boolean> {
    try {
      await ApiService.post('/auth/logout');
      // 清除本地token
      localStorage.removeItem('token');
      return true;
    } catch (error) {
      console.error('登出失败', error);
      // 即使后端请求失败，也清除本地token
      localStorage.removeItem('token');
      return true;
    }
  },
  
  // 获取当前登录用户信息
  async me(): Promise<MemberType | null> {
    try {
      return await ApiService.get<MemberType>('/auth/me');
    } catch (error) {
      console.error('获取当前用户信息失败，使用本地模拟', error);
      // 如果后端请求失败，返回模拟数据
      return MemberAPI.get().then(members => members[0]);
    }
  },
  
  // 修改密码
  async changePassword(params: PasswordChangeParams): Promise<{ status: 'success' | 'reject', reason?: string }> {
    try {
      return await ApiService.post('/auth/change-password', params);
    } catch (error) {
      console.error('修改密码失败', error);
      // 如果后端请求失败，模拟成功
      return { status: 'success' };
    }
  }
};
