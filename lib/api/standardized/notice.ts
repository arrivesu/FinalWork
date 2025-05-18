/**
 * @file notice.ts
 * @description 标准化的通知公告API模块
 * @author Manus
 * @date 2025/5/18
 */
import ApiService from '@/lib/services/ApiService';
import { noticeData } from "@/lib/mock/notice";
import { MemberAPI } from '@/lib/api/standardized/member';
import type { MemberType } from '@/lib/api/standardized/member';

// 通知公告数据类型
export type NoticeType = typeof noticeData[number];
export type NoticeIdType = NoticeType['id'];

// 标准化的通知公告API
export const NoticeAPI = {
  // 本地数据，用于开发阶段
  data: noticeData,
  
  // 创建空通知公告对象
  createEmpty(): NoticeType {
    return {
      id: 0,
      title: "",
      content: "",
      publish_date: new Date(),
      publisher: MemberAPI.createEmpty()
    };
  },
  
  // 获取所有通知公告
  async get(): Promise<NoticeType[]> {
    try {
      // 尝试从后端获取数据
      return await ApiService.get<NoticeType[]>('/notices');
    } catch (error) {
      console.error('获取通知公告列表失败，使用本地数据', error);
      // 如果后端请求失败，返回本地数据
      return this.data;
    }
  },
  
  // 获取单个通知公告
  async getById(id: NoticeIdType): Promise<NoticeType | null> {
    try {
      return await ApiService.get<NoticeType>(`/notices/${id}`);
    } catch (error) {
      console.error(`获取通知公告ID=${id}失败`, error);
      // 如果后端请求失败，从本地数据查找
      const notice = this.data.find(item => item.id === id);
      return notice || null;
    }
  },
  
  // 添加通知公告
  async add(notice: Omit<NoticeType, 'id'>): Promise<NoticeType> {
    try {
      return await ApiService.post<NoticeType>('/notices', notice);
    } catch (error) {
      console.error('添加通知公告失败，使用本地模拟', error);
      // 如果后端请求失败，模拟添加到本地数据
      const newNotice = {
        ...notice,
        id: Math.max(0, ...this.data.map(item => item.id)) + 1
      } as NoticeType;
      this.data.push(newNotice);
      return newNotice;
    }
  },
  
  // 更新通知公告
  async save(id: NoticeIdType, notice: NoticeType): Promise<NoticeType> {
    try {
      return await ApiService.put<NoticeType>(`/notices/${id}`, notice);
    } catch (error) {
      console.error(`更新通知公告ID=${id}失败，使用本地模拟`, error);
      // 如果后端请求失败，模拟更新本地数据
      this.data = this.data.map(item => item.id === id ? notice : item);
      return notice;
    }
  },
  
  // 删除通知公告
  async del(id: NoticeIdType): Promise<boolean> {
    try {
      await ApiService.delete(`/notices/${id}`);
      return true;
    } catch (error) {
      console.error(`删除通知公告ID=${id}失败，使用本地模拟`, error);
      // 如果后端请求失败，模拟从本地数据删除
      this.data = this.data.filter(item => item.id !== id);
      return true;
    }
  }
};
