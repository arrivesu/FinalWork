/**
 * @file activityJoin.ts
 * @description
 * @author rainbowx
 * @date 2025/5/12
 */
import {activityJoinData} from "@/lib/mock/activityJoin";
import {ActivitiesAPI} from "@/lib/api/activity";
import {MemberAPI} from "@/lib/api/member";

let data = activityJoinData;

type DataType = typeof data[number];
type IdType = DataType['id'];

export const ActivityJoinAPI = {
	data: data,
	createEmpty(): DataType {
		return {
			id: 0,
			activity: ActivitiesAPI.createEmpty(),
			member: MemberAPI.createEmpty(),
			status: "正常参会"
		}
	},
	async add(activity_join: DataType) {
		const maxId = data.reduce((max, item) => {
			return item.id > max ? item.id : max;
		}, -Infinity);
		data.push({
			...activity_join,
			id: maxId + 1,
		})
		return  {
			...activity_join,
			id: maxId + 1,
		}
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
