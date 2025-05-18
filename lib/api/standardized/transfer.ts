/**
 * @file transfer.ts
 * @description 标准化的组织关系转移API模块
 * @author Manus
 * @date 2025/5/18
 */
import ApiService from '@/lib/services/ApiService';
import { transferData } from "@/lib/mock/transfer";
import { MemberAPI } from '@/lib/api/standardized/member';
import { BranchAPI } from '@/lib/api/standardized/branch';
import type { MemberType } from '@/lib/api/standardized/member';
import type { BranchType } from '@/lib/api/standardized/branch';

// 组织关系转移数据类型
export type TransferType = typeof transferData[number];
export type TransferIdType = TransferType['id'];

// 标准化的组织关系转移API
export const TransferAPI = {
  // 本地数据，用于开发阶段
  data: transferData,
  
  // 创建空组织关系转移对象
  createEmpty(): TransferType {
    return {
      id: 0,
      user: MemberAPI.createEmpty(),
      targetOrganization: BranchAPI.createEmpty(),
      reason: "",
      applyDate: new Date(),
      status: "pending"
    };
  },
  
  // 获取所有组织关系转移申请
  async get(): Promise<TransferType[]> {
    try {
      // 尝试从后端获取数据
      return await ApiService.get<TransferType[]>('/transfers');
    } catch (error) {
      console.error('获取组织关系转移申请列表失败，使用本地数据', error);
      // 如果后端请求失败，返回本地数据
      return this.data;
    }
  },
  
  // 获取单个组织关系转移申请
  async getById(id: TransferIdType): Promise<TransferType | null> {
    try {
      return await ApiService.get<TransferType>(`/transfers/${id}`);
    } catch (error) {
      console.error(`获取组织关系转移申请ID=${id}失败`, error);
      // 如果后端请求失败，从本地数据查找
      const transfer = this.data.find(item => item.id === id);
      return transfer || null;
    }
  },
  
  // 获取指定党员的所有转移申请
  async getByMemberId(memberId: number): Promise<TransferType[]> {
    try {
      return await ApiService.get<TransferType[]>(`/transfers/member/${memberId}`);
    } catch (error) {
      console.error(`获取党员ID=${memberId}的转移申请失败`, error);
      // 如果后端请求失败，从本地数据过滤
      return this.data.filter(item => item.user.id === memberId);
    }
  },
  
  // 添加组织关系转移申请
  async add(transfer: Omit<TransferType, 'id'>): Promise<TransferType> {
    try {
      return await ApiService.post<TransferType>('/transfers', transfer);
    } catch (error) {
      console.error('添加组织关系转移申请失败，使用本地模拟', error);
      // 如果后端请求失败，模拟添加到本地数据
      const newTransfer = {
        ...transfer,
        id: Math.max(0, ...this.data.map(item => item.id)) + 1
      } as TransferType;
      this.data.push(newTransfer);
      return newTransfer;
    }
  },
  
  // 更新组织关系转移申请
  async save(id: TransferIdType, transfer: TransferType): Promise<TransferType> {
    try {
      return await ApiService.put<TransferType>(`/transfers/${id}`, transfer);
    } catch (error) {
      console.error(`更新组织关系转移申请ID=${id}失败，使用本地模拟`, error);
      // 如果后端请求失败，模拟更新本地数据
      this.data = this.data.map(item => item.id === id ? transfer : item);
      return transfer;
    }
  },
  
  // 审批组织关系转移申请
  async approve(id: TransferIdType, approved: boolean, comment?: string): Promise<TransferType> {
    try {
      return await ApiService.post<TransferType>(`/transfers/${id}/approve`, { 
        approved, 
        comment 
      });
    } catch (error) {
      console.error(`审批组织关系转移申请ID=${id}失败，使用本地模拟`, error);
      // 如果后端请求失败，模拟审批
      const transfer = this.data.find(item => item.id === id);
      if (transfer) {
        const updatedTransfer = {
          ...transfer,
          status: approved ? 'approved' : 'rejected'
        };
        this.data = this.data.map(item => item.id === id ? updatedTransfer : item);
        return updatedTransfer;
      }
      throw new Error(`未找到ID=${id}的转移申请`);
    }
  },
  
  // 删除组织关系转移申请
  async del(id: TransferIdType): Promise<boolean> {
    try {
      await ApiService.delete(`/transfers/${id}`);
      return true;
    } catch (error) {
      console.error(`删除组织关系转移申请ID=${id}失败，使用本地模拟`, error);
      // 如果后端请求失败，模拟从本地数据删除
      this.data = this.data.filter(item => item.id !== id);
      return true;
    }
  }
};
