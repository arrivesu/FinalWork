/**
 * @file event.ts
 * @description
 * @author rainbowx
 * @date 2025/5/12
 */
import {eventData} from "@/lib/mock/event";
import {MemberAPI} from "@/lib/api/member";

let data = eventData;

type DataType = typeof data[number];
type IdType = DataType['id'];

export const EventAPI = {
	data: data,
	createEmpty(): DataType {
		return {
			id: 0,
			user: MemberAPI.createEmpty(),
			time: new Date(),
			module: null,
			status: "success",
			ip: "",
			target: null,
			content: ""
		}
	},
	async add(new_data: DataType) {
		const maxId = data.reduce((max, item) => {
			return item.id > max ? item.id : max;
		}, -Infinity);
		data.push({
			...new_data,
			id: maxId + 1,
		})
		return  {
			...new_data,
			id: maxId + 1,
		}
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
