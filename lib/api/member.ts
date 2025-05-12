/**
 * @file member.ts
 * @description
 * @author rainbowx
 * @date 2025/5/12
 */
import {memberData} from "@/lib/mock/member";

export const MemberAPI = {
	get(): MemberType[] {
		return memberData;
	}
}
