/**
 * @file auth.ts
 * @description
 * @author rainbowx
 * @date 2025/5/14
 */
import {MemberAPI} from "@/lib/api/member";
import {useState} from "react";

type LoginDTOType = {
	status: 'success' | 'reject',
	reason?: string,
	data: MemberType | null,
}

interface PasswordChangeParams {
	currentPassword: string
	newPassword: string
}

export const AuthAPI = {
	data: useState<MemberType| null>(null),
	async logout() {
		this.data.
	},
	async me(): Promise<MemberType | null> {
		return MemberAPI.data[0]
	},
	async changePassword(params: PasswordChangeParams) {
		return {
			status: 'success',
		}
	},
	async login(email: string, password: string): Promise<LoginDTOType> {
		return {
			status: 'success',
			data: MemberAPI.data[0]
		}
	}
}
