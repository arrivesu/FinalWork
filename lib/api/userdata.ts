/**
 * @file data.ts
 * @description
 * @author rainbowx
 * @date 2025/5/12
 */
import {noticeData} from "@/lib/mock/notice";

export const UserDataAPI = {
	get(): NoticeType[] {
		return noticeData;
	}
}
