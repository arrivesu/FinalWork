/**
 * @file notice.ts
 * @description
 * @author rainbowx
 * @date 2025/5/12
 */
import {noticeData} from "@/lib/mock/notice";

export const NoticeAPI = {
	get(): NoticeType[] {
		return noticeData;
	}
}
