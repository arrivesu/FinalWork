/**
 * @file data.ts
 * @description
 * @author rainbowx
 * @date 2025/5/12
 */
import {userData} from "@/lib/mock/userdata";
import {MemberAPI} from "@/lib/api/member";

let data = userData;

type DataType = typeof data[number];
type IdType = DataType['id'];

export const UserDataAPI = {
	data: data,
	createEmpty(): DataType {
		return {
			id: 0,
			user: MemberAPI.createEmpty(),
			record_time: "",
			moral_rank: 0,
			academic_rank: 0,
			assessment_score: 0,
			dorm_score: 0,
			behavior_score: 0,
			volunteering_time: 0,
			public_opinion_score: 0
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
