/**
 * @file activity.ts
 * @description 标准化的活动API模块
 * @author Manus
 * @date 2025/5/18
 */
import ApiService from '@/lib/services/ApiService';
import { activitiesData } from "@/lib/mock/activity";

// 活动数据类型
export type ActivityType = typeof activitiesData[number];
export type ActivityIdType = ActivityType['id'];

// 标准化的活动API
export const ActivitiesAPI = {
  // 本地数据，用于开发阶段
  data: activitiesData,
  
  // 创建空活动对象
  createEmpty(): ActivityType {
    return {
      id: 0,
      title: "",
      type: "支部党员大会",
      startTime: new Date(),
      endTime: new Date(),
      location: "",
      content: "",
      remark: "",
      branch: {
        id: 0,
        name: "",
        superior_org: ""
      }
    };
  },
  
  // 获取所有活动
  async get(): Promise<ActivityType[]> {
    try {
      // 尝试从后端获取数据
      return await ApiService.get<ActivityType[]>('/activities');
    } catch (error) {
      console.error('获取活动列表失败，使用本地数据', error);
      // 如果后端请求失败，返回本地数据
      return this.data;
    }
  },
  
  // 获取单个活动
  async getById(id: ActivityIdType): Promise<ActivityType | null> {
    try {
      return await ApiService.get<ActivityType>(`/activities/${id}`);
    } catch (error) {
      console.error(`获取活动ID=${id}失败`, error);
      // 如果后端请求失败，从本地数据查找
      const activity = this.data.find(item => item.id === id);
      return activity || null;
    }
  },
  
  // 添加活动
  async add(activity: Omit<ActivityType, 'id'>): Promise<ActivityType> {
    try {
      return await ApiService.post<ActivityType>('/activities', activity);
    } catch (error) {
      console.error('添加活动失败，使用本地模拟', error);
      // 如果后端请求失败，模拟添加到本地数据
      const newActivity = {
        ...activity,
        id: Math.max(0, ...this.data.map(item => item.id)) + 1
      } as ActivityType;
      this.data.push(newActivity);
      return newActivity;
    }
  },
  
  // 更新活动
  async save(id: ActivityIdType, activity: ActivityType): Promise<ActivityType> {
    try {
      return await ApiService.put<ActivityType>(`/activities/${id}`, activity);
    } catch (error) {
      console.error(`更新活动ID=${id}失败，使用本地模拟`, error);
      // 如果后端请求失败，模拟更新本地数据
      this.data = this.data.map(item => item.id === id ? activity : item);
      return activity;
    }
  },
  
  // 删除活动
  async del(id: ActivityIdType): Promise<boolean> {
    try {
      await ApiService.delete(`/activities/${id}`);
      return true;
    } catch (error) {
      console.error(`删除活动ID=${id}失败，使用本地模拟`, error);
      // 如果后端请求失败，模拟从本地数据删除
      this.data = this.data.filter(item => item.id !== id);
      return true;
    }
  }
};
