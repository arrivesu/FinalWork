/**
 * @file transfer.ts
 * @description
 * @author rainbowx
 * @date 2025/5/13
 */
import {transferData} from "@/lib/mock/transfer";
import {MemberAPI} from "@/lib/api/member";
import {BranchAPI} from "@/lib/api/branch";

let data = transferData;

type DataType = typeof data[number];
type IdType = DataType['id'];

export const TransferAPI = {
	data: data,
	createEmpty(): DataType {
		return {
			id: 0,
			user: MemberAPI.createEmpty(),
			targetOrganization: BranchAPI.createEmpty(),
			reason: "",
			applyDate: new Date(),
			status: "pending"
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
