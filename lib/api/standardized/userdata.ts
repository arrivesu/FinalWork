/**
 * @file userdata.ts
 * @description 标准化的用户数据API模块
 * @author Manus
 * @date 2025/5/18
 */
import ApiService from '@/lib/services/ApiService';
import { userData } from "@/lib/mock/userdata";
import { MemberAPI } from '@/lib/api/standardized/member';
import type { MemberType } from '@/lib/api/standardized/member';

// 用户数据类型
export type UserDataType = typeof userData[number];
export type UserDataIdType = UserDataType['id'];

// 标准化的用户数据API
export const UserDataAPI = {
  // 本地数据，用于开发阶段
  data: userData,
  
  // 创建空用户数据对象
  createEmpty(): UserDataType {
    return {
      id: 0,
      user: MemberAPI.createEmpty(),
      record_time: "",
      moral_rank: 0,
      academic_rank: 0,
      assessment_score: 0,
      dorm_score: 0,
      behavior_score: 0,
      volunteering_time: 0,
      public_opinion_score: 0
    };
  },
  
  // 获取所有用户数据
  async get(): Promise<UserDataType[]> {
    try {
      // 尝试从后端获取数据
      return await ApiService.get<UserDataType[]>('/user-data');
    } catch (error) {
      console.error('获取用户数据列表失败，使用本地数据', error);
      // 如果后端请求失败，返回本地数据
      return this.data;
    }
  },
  
  // 获取单个用户数据
  async getById(id: UserDataIdType): Promise<UserDataType | null> {
    try {
      return await ApiService.get<UserDataType>(`/user-data/${id}`);
    } catch (error) {
      console.error(`获取用户数据ID=${id}失败`, error);
      // 如果后端请求失败，从本地数据查找
      const userData = this.data.find(item => item.id === id);
      return userData || null;
    }
  },
  
  // 获取指定党员的所有数据
  async getByMemberId(memberId: number): Promise<UserDataType[]> {
    try {
      return await ApiService.get<UserDataType[]>(`/user-data/member/${memberId}`);
    } catch (error) {
      console.error(`获取党员ID=${memberId}的数据失败`, error);
      // 如果后端请求失败，从本地数据过滤
      return this.data.filter(item => item.user.id === memberId);
    }
  },
  
  // 添加用户数据
  async add(userData: Omit<UserDataType, 'id'>): Promise<UserDataType> {
    try {
      return await ApiService.post<UserDataType>('/user-data', userData);
    } catch (error) {
      console.error('添加用户数据失败，使用本地模拟', error);
      // 如果后端请求失败，模拟添加到本地数据
      const newUserData = {
        ...userData,
        id: Math.max(0, ...this.data.map(item => item.id)) + 1
      } as UserDataType;
      this.data.push(newUserData);
      return newUserData;
    }
  },
  
  // 更新用户数据
  async save(id: UserDataIdType, userData: UserDataType): Promise<UserDataType> {
    try {
      return await ApiService.put<UserDataType>(`/user-data/${id}`, userData);
    } catch (error) {
      console.error(`更新用户数据ID=${id}失败，使用本地模拟`, error);
      // 如果后端请求失败，模拟更新本地数据
      this.data = this.data.map(item => item.id === id ? userData : item);
      return userData;
    }
  },
  
  // 删除用户数据
  async del(id: UserDataIdType): Promise<boolean> {
    try {
      await ApiService.delete(`/user-data/${id}`);
      return true;
    } catch (error) {
      console.error(`删除用户数据ID=${id}失败，使用本地模拟`, error);
      // 如果后端请求失败，模拟从本地数据删除
      this.data = this.data.filter(item => item.id !== id);
      return true;
    }
  }
};
