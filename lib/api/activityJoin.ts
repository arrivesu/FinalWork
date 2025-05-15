/**
 * @file activityJoin.ts
 * @description
 * @author rainbowx
 * @date 2025/5/12
 */
import {activityJoinData} from "@/lib/mock/activityJoin";

let data = activityJoinData;

type DataType = typeof data[number];
type IdType = DataType['id'];

export const ActivityJoinAPI = {
	async add(activity_join: DataType) {
		data.push(activity_join)
	},
	async del(id: IdType) {
		data = data.filter((d) => d.id === id);
	},
	async save(id: IdType, activity_join: DataType) {
		data = data.map((d) => d.id === id ? activity_join: d);
	},
	async get() {
		return data;
	},
}
