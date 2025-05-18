/**
 * @file activityJoin.ts
 * @description 标准化的活动参与API模块
 * @author Manus
 * @date 2025/5/18
 */
import ApiService from '@/lib/services/ApiService';
import { activityJoinData } from "@/lib/mock/activityJoin";
import { ActivitiesAPI } from '@/lib/api/standardized/activity';
import { MemberAPI } from '@/lib/api/standardized/member';
import type { ActivityType } from '@/lib/api/standardized/activity';
import type { MemberType } from '@/lib/api/standardized/member';

// 活动参与数据类型
export type ActivityJoinType = typeof activityJoinData[number];
export type ActivityJoinIdType = ActivityJoinType['id'];

// 标准化的活动参与API
export const ActivityJoinAPI = {
  // 本地数据，用于开发阶段
  data: activityJoinData,
  
  // 创建空活动参与对象
  createEmpty(): ActivityJoinType {
    return {
      id: 0,
      activity: ActivitiesAPI.createEmpty(),
      member: MemberAPI.createEmpty(),
      status: "正常参会"
    };
  },
  
  // 获取所有活动参与记录
  async get(): Promise<ActivityJoinType[]> {
    try {
      // 尝试从后端获取数据
      return await ApiService.get<ActivityJoinType[]>('/activity-joins');
    } catch (error) {
      console.error('获取活动参与记录失败，使用本地数据', error);
      // 如果后端请求失败，返回本地数据
      return this.data;
    }
  },
  
  // 获取单个活动参与记录
  async getById(id: ActivityJoinIdType): Promise<ActivityJoinType | null> {
    try {
      return await ApiService.get<ActivityJoinType>(`/activity-joins/${id}`);
    } catch (error) {
      console.error(`获取活动参与记录ID=${id}失败`, error);
      // 如果后端请求失败，从本地数据查找
      const activityJoin = this.data.find(item => item.id === id);
      return activityJoin || null;
    }
  },
  
  // 获取指定活动的所有参与记录
  async getByActivityId(activityId: number): Promise<ActivityJoinType[]> {
    try {
      return await ApiService.get<ActivityJoinType[]>(`/activity-joins/activity/${activityId}`);
    } catch (error) {
      console.error(`获取活动ID=${activityId}的参与记录失败`, error);
      // 如果后端请求失败，从本地数据过滤
      return this.data.filter(item => item.activity.id === activityId);
    }
  },
  
  // 获取指定党员的所有参与记录
  async getByMemberId(memberId: number): Promise<ActivityJoinType[]> {
    try {
      return await ApiService.get<ActivityJoinType[]>(`/activity-joins/member/${memberId}`);
    } catch (error) {
      console.error(`获取党员ID=${memberId}的参与记录失败`, error);
      // 如果后端请求失败，从本地数据过滤
      return this.data.filter(item => item.member.id === memberId);
    }
  },
  
  // 添加活动参与记录
  async add(activityJoin: Omit<ActivityJoinType, 'id'>): Promise<ActivityJoinType> {
    try {
      return await ApiService.post<ActivityJoinType>('/activity-joins', activityJoin);
    } catch (error) {
      console.error('添加活动参与记录失败，使用本地模拟', error);
      // 如果后端请求失败，模拟添加到本地数据
      const newActivityJoin = {
        ...activityJoin,
        id: Math.max(0, ...this.data.map(item => item.id)) + 1
      } as ActivityJoinType;
      this.data.push(newActivityJoin);
      return newActivityJoin;
    }
  },
  
  // 更新活动参与记录
  async save(id: ActivityJoinIdType, activityJoin: ActivityJoinType): Promise<ActivityJoinType> {
    try {
      return await ApiService.put<ActivityJoinType>(`/activity-joins/${id}`, activityJoin);
    } catch (error) {
      console.error(`更新活动参与记录ID=${id}失败，使用本地模拟`, error);
      // 如果后端请求失败，模拟更新本地数据
      this.data = this.data.map(item => item.id === id ? activityJoin : item);
      return activityJoin;
    }
  },
  
  // 删除活动参与记录
  async del(id: ActivityJoinIdType): Promise<boolean> {
    try {
      await ApiService.delete(`/activity-joins/${id}`);
      return true;
    } catch (error) {
      console.error(`删除活动参与记录ID=${id}失败，使用本地模拟`, error);
      // 如果后端请求失败，模拟从本地数据删除
      this.data = this.data.filter(item => item.id !== id);
      return true;
    }
  }
};
