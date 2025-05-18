/**
 * @file branch.ts
 * @description 标准化的党支部API模块
 * @author Manus
 * @date 2025/5/18
 */
import ApiService from '@/lib/services/ApiService';
import { branchData } from "@/lib/mock/branch";

// 党支部数据类型
export type BranchType = typeof branchData[number];
export type BranchIdType = BranchType['id'];

// 标准化的党支部API
export const BranchAPI = {
  // 本地数据，用于开发阶段
  data: branchData,
  
  // 创建空党支部对象
  createEmpty(): BranchType {
    return {
      id: 0,
      name: "",
      superior_org: ""
    };
  },
  
  // 获取所有党支部
  async get(): Promise<BranchType[]> {
    try {
      // 尝试从后端获取数据
      return await ApiService.get<BranchType[]>('/branches');
    } catch (error) {
      console.error('获取党支部列表失败，使用本地数据', error);
      // 如果后端请求失败，返回本地数据
      return this.data;
    }
  },
  
  // 获取单个党支部
  async getById(id: BranchIdType): Promise<BranchType | null> {
    try {
      return await ApiService.get<BranchType>(`/branches/${id}`);
    } catch (error) {
      console.error(`获取党支部ID=${id}失败`, error);
      // 如果后端请求失败，从本地数据查找
      const branch = this.data.find(item => item.id === id);
      return branch || null;
    }
  },
  
  // 添加党支部
  async add(branch: Omit<BranchType, 'id'>): Promise<BranchType> {
    try {
      return await ApiService.post<BranchType>('/branches', branch);
    } catch (error) {
      console.error('添加党支部失败，使用本地模拟', error);
      // 如果后端请求失败，模拟添加到本地数据
      const newBranch = {
        ...branch,
        id: Math.max(0, ...this.data.map(item => item.id)) + 1
      } as BranchType;
      this.data.push(newBranch);
      return newBranch;
    }
  },
  
  // 更新党支部
  async save(id: BranchIdType, branch: BranchType): Promise<BranchType> {
    try {
      return await ApiService.put<BranchType>(`/branches/${id}`, branch);
    } catch (error) {
      console.error(`更新党支部ID=${id}失败，使用本地模拟`, error);
      // 如果后端请求失败，模拟更新本地数据
      this.data = this.data.map(item => item.id === id ? branch : item);
      return branch;
    }
  },
  
  // 删除党支部
  async del(id: BranchIdType): Promise<boolean> {
    try {
      await ApiService.delete(`/branches/${id}`);
      return true;
    } catch (error) {
      console.error(`删除党支部ID=${id}失败，使用本地模拟`, error);
      // 如果后端请求失败，模拟从本地数据删除
      this.data = this.data.filter(item => item.id !== id);
      return true;
    }
  }
};
