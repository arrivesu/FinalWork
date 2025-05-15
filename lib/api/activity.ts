/**
 * @file activity.ts
 * @description
 * @author rainbowx
 * @date 2025/5/12
 */
import {activitiesData} from "@/lib/mock/activity";

let data = activitiesData;

type DataType = typeof data[number];
type IdType = DataType['id'];

export const ActivitiesAPI = {
	async add(activity: DataType) {
		return {
			...activity,
			// TODO 修改id
			id: 0,
		}
	},
	async del(id: IdType) {
		data = data.filter((d) => d.id !== id);
	},
	async save(id: IdType, activity: DataType) {
		data = data.map((d) => d.id === id ? activity : d)
	},
	async get() {
		return data;
	},
}
