"use client"

import type React from "react"

import {SidebarNav} from "@/components/layout/sidebar-nav"
import {adminNavItems} from "@/config/admin-nav"
import {Shell} from "@/components/layout/shell"
import {Breadcrumb} from "@/components/layout/breadcrumb"
import {Button} from "@/components/ui/button"
import {Bell} from "lucide-react"
import {RoleSwitcher} from "@/components/ui/role-switcher"
import {UserMenu} from "@/components/ui/user-menu"

export default function AdminLayout({
										children,
									}: {
	children: React.ReactNode
}) {
	// 模拟管理员用户数据
	const user = JSON.parse(localStorage?.getItem('user') ?? '{}')

	return (
		<Shell>
			<div className="flex h-screen">
				<div className="hidden md:block w-64 border-r">
					<SidebarNav items={adminNavItems}/>
				</div>
				<div className="flex-1 flex flex-col overflow-hidden">
					<div className="border-b p-4 flex items-center justify-between">
						<Breadcrumb/>
						<div className="flex items-center gap-4">
							{/* 通知按钮 */}
							<Button variant="ghost" size="icon" className="relative">
								<Bell className="h-5 w-5"/>
								<span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600"/>
							</Button>

							{/* 角色切换按钮 - 只有管理员可见 */}
							{user.role.includes("admin") && (
								<div className="flex items-center">
									<span className="text-sm text-muted-foreground mr-2">管理员视图</span>
									<RoleSwitcher isAdmin={true} targetPath="/member/workbench"/>
								</div>
							)}

							{/* 用户头像和下拉菜单 */}
							<UserMenu user={user}/>
						</div>
					</div>
					<div className="flex-1 overflow-auto">
						<div className="space-y-6 bg-white p-6 rounded-lg">{children}</div>
					</div>
				</div>
			</div>
		</Shell>
	)
}
