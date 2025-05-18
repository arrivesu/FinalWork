/**
 * @file activity.ts
 * @description
 * @author rainbowx
 * @date 2025/5/12
 */
import {activitiesData} from "@/lib/mock/activity";
import {axiosApi} from "@/lib/utils";

let data = activitiesData;

type DataType = typeof data[number];
type IdType = DataType['id'];

export const ActivitiesAPI = {
	data: data,
	createEmpty(): DataType {
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
		}
	},
	async add(activity: DataType) {
		const maxId = data.reduce((max, item) => {
			return item.id > max ? item.id : max;
		}, -Infinity);
		data.push({
			...activity,
			id: maxId + 1,
		})
		return  {
			...activity,
			id: maxId + 1,
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
