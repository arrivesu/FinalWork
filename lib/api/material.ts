/**
 * @file material.ts
 * @description
 * @author rainbowx
 * @date 2025/5/12
 */
import {materialData} from "@/lib/mock/material";

export const MaterialAPI = {
	get(): MaterialType[] {
		return materialData;
	}
}
