/**
 * @file userDocument.ts
 * @description
 * @author rainbowx
 * @date 2025/5/15
 */

import {userDocumentData} from "@/lib/mock/userDocument";

let data = userDocumentData;

type DataType = typeof data[number];
type IdType = DataType['id'];

export const UserDocumentAPI = {
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
