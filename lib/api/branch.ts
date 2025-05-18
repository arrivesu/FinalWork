/**
 * @file branch.ts
 * @description
 * @author rainbowx
 * @date 2025/5/12
 */
import {branchData} from "@/lib/mock/branch";

let data = branchData;

type DataType = typeof data[number];
type IdType = DataType['id'];

export const BranchAPI = {
	data: data,
	createEmpty(): DataType {
		return {
			id: 0,
			name: "",
			superior_org: ""
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
