/**
 * @file activityJoin.ts
 * @description
 * @author rainbowx
 * @date 2025/5/12
 */
import {activityJoinData} from "@/lib/mock/activityJoin";

export const ActivityJoinAPI = {
	get(): ActivityJoinType[] {
		return activityJoinData;
	}
}
