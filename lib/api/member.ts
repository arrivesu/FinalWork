/**
 * @file member.ts
 * @description
 * @author rainbowx
 * @date 2025/5/12
 */
import {memberData} from "@/lib/mock/member";
import {BranchAPI} from "@/lib/api/branch";

let data = memberData;

type DataType = typeof data[number];
type IdType = DataType['id'];

export const MemberAPI = {
	data: data,
	createEmpty(): DataType {
		return {
			id: 0,
			is_deleted: false,
			is_init_password: false,
			username: "",
			avatar: "",
			name: "",
			gender: "女",
			ethnicity: "",
			birth_date: new Date(),
			student_number: "",
			class_name: "",
			join_date: new Date(),
			party_position: null,
			identity_type: "正式党员",
			phone: "",
			profile_file: "",
			branch: BranchAPI.createEmpty(),
			role: ['member']
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
