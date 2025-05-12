/**
 * @file branch.ts
 * @description
 * @author rainbowx
 * @date 2025/5/12
 */
import {branchData} from "@/lib/mock/branch";

export const BranchAPI = {
	get(): BranchType[] {
		return branchData;
	}
}
