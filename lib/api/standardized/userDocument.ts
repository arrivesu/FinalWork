/**
 * @file userDocument.ts
 * @description 标准化的用户文档API模块
 * @author Manus
 * @date 2025/5/18
 */
import ApiService from '@/lib/services/ApiService';
import { userDocumentData } from "@/lib/mock/userDocument";
import { MemberAPI } from '@/lib/api/standardized/member';
import type { MemberType } from '@/lib/api/standardized/member';

// 用户文档数据类型
export type UserDocumentType = typeof userDocumentData[number];
export type UserDocumentIdType = UserDocumentType['id'];

// 标准化的用户文档API
export const UserDocumentAPI = {
  // 本地数据，用于开发阶段
  data: userDocumentData,
  
  // 创建空用户文档对象
  createEmpty(): UserDocumentType {
    return {
      id: 0,
      user: MemberAPI.createEmpty(),
      type: "",
      submit_time: new Date(),
      content: ""
    };
  },
  
  // 获取所有用户文档
  async get(): Promise<UserDocumentType[]> {
    try {
      // 尝试从后端获取数据
      return await ApiService.get<UserDocumentType[]>('/user-documents');
    } catch (error) {
      console.error('获取用户文档列表失败，使用本地数据', error);
      // 如果后端请求失败，返回本地数据
      return this.data;
    }
  },
  
  // 获取单个用户文档
  async getById(id: UserDocumentIdType): Promise<UserDocumentType | null> {
    try {
      return await ApiService.get<UserDocumentType>(`/user-documents/${id}`);
    } catch (error) {
      console.error(`获取用户文档ID=${id}失败`, error);
      // 如果后端请求失败，从本地数据查找
      const userDocument = this.data.find(item => item.id === id);
      return userDocument || null;
    }
  },
  
  // 获取指定党员的所有文档
  async getByMemberId(memberId: number): Promise<UserDocumentType[]> {
    try {
      return await ApiService.get<UserDocumentType[]>(`/user-documents/member/${memberId}`);
    } catch (error) {
      console.error(`获取党员ID=${memberId}的文档失败`, error);
      // 如果后端请求失败，从本地数据过滤
      return this.data.filter(item => item.user.id === memberId);
    }
  },
  
  // 按类型获取用户文档
  async getByType(type: string): Promise<UserDocumentType[]> {
    try {
      return await ApiService.get<UserDocumentType[]>(`/user-documents/type/${type}`);
    } catch (error) {
      console.error(`获取类型=${type}的用户文档失败`, error);
      // 如果后端请求失败，从本地数据过滤
      return this.data.filter(item => item.type === type);
    }
  },
  
  // 添加用户文档
  async add(userDocument: Omit<UserDocumentType, 'id'>): Promise<UserDocumentType> {
    try {
      return await ApiService.post<UserDocumentType>('/user-documents', userDocument);
    } catch (error) {
      console.error('添加用户文档失败，使用本地模拟', error);
      // 如果后端请求失败，模拟添加到本地数据
      const newUserDocument = {
        ...userDocument,
        id: Math.max(0, ...this.data.map(item => item.id)) + 1
      } as UserDocumentType;
      this.data.push(newUserDocument);
      return newUserDocument;
    }
  },
  
  // 更新用户文档
  async save(id: UserDocumentIdType, userDocument: UserDocumentType): Promise<UserDocumentType> {
    try {
      return await ApiService.put<UserDocumentType>(`/user-documents/${id}`, userDocument);
    } catch (error) {
      console.error(`更新用户文档ID=${id}失败，使用本地模拟`, error);
      // 如果后端请求失败，模拟更新本地数据
      this.data = this.data.map(item => item.id === id ? userDocument : item);
      return userDocument;
    }
  },
  
  // 删除用户文档
  async del(id: UserDocumentIdType): Promise<boolean> {
    try {
      await ApiService.delete(`/user-documents/${id}`);
      return true;
    } catch (error) {
      console.error(`删除用户文档ID=${id}失败，使用本地模拟`, error);
      // 如果后端请求失败，模拟从本地数据删除
      this.data = this.data.filter(item => item.id !== id);
      return true;
    }
  }
};
