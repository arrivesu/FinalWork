/**
 * @file material.ts
 * @description 标准化的学习资料API模块
 * @author Manus
 * @date 2025/5/18
 */
import ApiService from '@/lib/services/ApiService';
import { materialData } from "@/lib/mock/material";
import { BranchAPI } from '@/lib/api/standardized/branch';
import type { BranchType } from '@/lib/api/standardized/branch';

// 学习资料数据类型
export type MaterialType = typeof materialData[number];
export type MaterialIdType = MaterialType['id'];

// 标准化的学习资料API
export const MaterialAPI = {
  // 本地数据，用于开发阶段
  data: materialData,
  
  // 创建空学习资料对象
  createEmpty(): MaterialType {
    return {
      id: 0,
      title: "",
      type: "video",
      category: "理论学习",
      content: "",
      upload_date: new Date(),
      branch: BranchAPI.createEmpty(),
    };
  },
  
  // 获取所有学习资料
  async get(): Promise<MaterialType[]> {
    try {
      // 尝试从后端获取数据
      return await ApiService.get<MaterialType[]>('/materials');
    } catch (error) {
      console.error('获取学习资料列表失败，使用本地数据', error);
      // 如果后端请求失败，返回本地数据
      return this.data;
    }
  },
  
  // 获取单个学习资料
  async getById(id: MaterialIdType): Promise<MaterialType | null> {
    try {
      return await ApiService.get<MaterialType>(`/materials/${id}`);
    } catch (error) {
      console.error(`获取学习资料ID=${id}失败`, error);
      // 如果后端请求失败，从本地数据查找
      const material = this.data.find(item => item.id === id);
      return material || null;
    }
  },
  
  // 按类别获取学习资料
  async getByCategory(category: string): Promise<MaterialType[]> {
    try {
      return await ApiService.get<MaterialType[]>(`/materials/category/${category}`);
    } catch (error) {
      console.error(`获取类别=${category}的学习资料失败`, error);
      // 如果后端请求失败，从本地数据过滤
      return this.data.filter(item => item.category === category);
    }
  },
  
  // 添加学习资料
  async add(material: Omit<MaterialType, 'id'>): Promise<MaterialType> {
    try {
      return await ApiService.post<MaterialType>('/materials', material);
    } catch (error) {
      console.error('添加学习资料失败，使用本地模拟', error);
      // 如果后端请求失败，模拟添加到本地数据
      const newMaterial = {
        ...material,
        id: Math.max(0, ...this.data.map(item => item.id)) + 1
      } as MaterialType;
      this.data.push(newMaterial);
      return newMaterial;
    }
  },
  
  // 更新学习资料
  async save(id: MaterialIdType, material: MaterialType): Promise<MaterialType> {
    try {
      return await ApiService.put<MaterialType>(`/materials/${id}`, material);
    } catch (error) {
      console.error(`更新学习资料ID=${id}失败，使用本地模拟`, error);
      // 如果后端请求失败，模拟更新本地数据
      this.data = this.data.map(item => item.id === id ? material : item);
      return material;
    }
  },
  
  // 删除学习资料
  async del(id: MaterialIdType): Promise<boolean> {
    try {
      await ApiService.delete(`/materials/${id}`);
      return true;
    } catch (error) {
      console.error(`删除学习资料ID=${id}失败，使用本地模拟`, error);
      // 如果后端请求失败，模拟从本地数据删除
      this.data = this.data.filter(item => item.id !== id);
      return true;
    }
  }
};
