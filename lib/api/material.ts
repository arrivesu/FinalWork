/**
 * @file material.ts
 * @description
 * @author rainbowx
 * @date 2025/5/12
 */
import {materialData} from "@/lib/mock/material";
import {BranchAPI} from "@/lib/api/branch";

let data = materialData;

type DataType = typeof data[number];
type IdType = DataType['id'];

export const MaterialAPI = {
	data: data,
	createEmpty(): DataType {
		return {
			id: 0,
			title: "",
			type: "video",
			category: "理论学习",
			content: "",
			upload_date: new Date(),
			branch: BranchAPI.createEmpty(),
		}
	},
	async add(new_data: DataType) {
		data.push(new_data)
	},
	async del(id: IdType) {
		data = data.filter((d) => d.id === id);
	},
	async save(id: IdType, new_data: DataType) {
		data = data.map((d) => d.id === id ? new_data: d);
	},
	async get() {
		return data;
	},
}
