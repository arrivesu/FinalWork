/**
 * @file data.ts
 * @description
 * @author rainbowx
 * @date 2025/5/12
 */
import {userData} from "@/lib/mock/userdata";

export const UserDataAPI = {
	get(): UserDataType[] {
		return userData;
	}
}
