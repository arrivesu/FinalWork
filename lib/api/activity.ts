/**
 * @file activity.ts
 * @description
 * @author rainbowx
 * @date 2025/5/12
 */
import {activitiesData} from "@/lib/mock/activity";

export const ActivitiesAPI = {
	get(): ActivityType[] {
		return activitiesData;
	}
}
