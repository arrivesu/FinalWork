/**
 * @file member.ts
 * @description 标准化的党员API模块
 * @author Manus
 * @date 2025/5/18
 */
import ApiService from '@/lib/services/ApiService';
import { memberData } from "@/lib/mock/member";
import { BranchAPI } from '@/lib/api/standardized/branch';
import type { BranchType } from '@/lib/api/standardized/branch';

// 党员数据类型
export type MemberType = typeof memberData[number];
export type MemberIdType = MemberType['id'];

// 标准化的党员API
export const MemberAPI = {
  // 本地数据，用于开发阶段
  data: memberData,
  
  // 创建空党员对象
  createEmpty(): MemberType {
    return {
      id: 0,
      is_deleted: false,
      is_init_password: false,
      username: "",
      avatar: "",
      name: "",
      gender: "女",
      ethnicity: "",
      birth_date: new Date(),
      student_number: "",
      class_name: "",
      join_date: new Date(),
      party_position: null,
      identity_type: "正式党员",
      phone: "",
      profile_file: "",
      branch: BranchAPI.createEmpty(),
      role: ['member']
    };
  },
  
  // 获取所有党员
  async get(): Promise<MemberType[]> {
    try {
      // 尝试从后端获取数据
      return await ApiService.get<MemberType[]>('/members');
    } catch (error) {
      console.error('获取党员列表失败，使用本地数据', error);
      // 如果后端请求失败，返回本地数据
      return this.data;
    }
  },
  
  // 获取单个党员
  async getById(id: MemberIdType): Promise<MemberType | null> {
    try {
      return await ApiService.get<MemberType>(`/members/${id}`);
    } catch (error) {
      console.error(`获取党员ID=${id}失败`, error);
      // 如果后端请求失败，从本地数据查找
      const member = this.data.find(item => item.id === id);
      return member || null;
    }
  },
  
  // 添加党员
  async add(member: Omit<MemberType, 'id'>): Promise<MemberType> {
    try {
      return await ApiService.post<MemberType>('/members', member);
    } catch (error) {
      console.error('添加党员失败，使用本地模拟', error);
      // 如果后端请求失败，模拟添加到本地数据
      const newMember = {
        ...member,
        id: Math.max(0, ...this.data.map(item => item.id)) + 1
      } as MemberType;
      this.data.push(newMember);
      return newMember;
    }
  },
  
  // 更新党员
  async save(id: MemberIdType, member: MemberType): Promise<MemberType> {
    try {
      return await ApiService.put<MemberType>(`/members/${id}`, member);
    } catch (error) {
      console.error(`更新党员ID=${id}失败，使用本地模拟`, error);
      // 如果后端请求失败，模拟更新本地数据
      this.data = this.data.map(item => item.id === id ? member : item);
      return member;
    }
  },
  
  // 删除党员
  async del(id: MemberIdType): Promise<boolean> {
    try {
      await ApiService.delete(`/members/${id}`);
      return true;
    } catch (error) {
      console.error(`删除党员ID=${id}失败，使用本地模拟`, error);
      // 如果后端请求失败，模拟从本地数据删除
      this.data = this.data.filter(item => item.id !== id);
      return true;
    }
  }
};
