/**
 * @file auth.ts
 * @description
 * @author rainbowx
 * @date 2025/5/14
 */

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
	async logout() {

	},
	async me(): Promise<MemberType | null> {
		return {
			id: 0,
			is_deleted: false,
			is_init_password: false,
			username: "李云龙",
			avatar: "",
			name: "李云龙",
			gender: "男",
			ethnicity: "汉族",
			birth_date: new Date("2024-05-14T10:00:00Z"),
			student_number: "3210439012",
			class_name: "大数据211",
			join_date: new Date("2025-05-14T10:00:00Z"),
			party_position: null,
			identity_type: '正式党员',
			phone: "123456789101",
			profile_file: "",
			branch: {
				id: 0,
				name: "总部",
				superior_org: ""
			},
			role: ['member', 'admin']
		}
	},
	async changePassword(params: PasswordChangeParams) {
		return {
			status: 'success',
		}
	},
	async login(email: string, password: string): Promise<LoginDTOType> {
		return {
			status: 'success',
			data: {
				id: 0,
				is_deleted: false,
				is_init_password: false,
				username: "李云龙",
				avatar: "",
				name: "李云龙",
				gender: "男",
				ethnicity: "汉族",
				birth_date: new Date("2024-05-14T10:00:00Z"),
				student_number: "3210439012",
				class_name: "大数据211",
				join_date: new Date("2025-05-14T10:00:00Z"),
				party_position: null,
				identity_type: '正式党员',
				phone: "123456789101",
				profile_file: "",
				branch: {
					id: 0,
					name: "总部",
					superior_org: ""
				},
				role: ['member', 'admin']
			}
		}
	}
}
