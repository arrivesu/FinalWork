/**
 * @file meeting.ts
 * @description
 * @author rainbowx
 * @date 2025/5/14
 */
import {meetingData} from "@/lib/mock/meeting";

export const MeetingAPI = {
	get(): MeetingDataType[] {
		return meetingData;
	}
}
