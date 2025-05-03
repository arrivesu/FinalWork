"use client"

import type React from "react"

import { SidebarNav } from "@/components/layout/sidebar-nav"
import { memberNavItems } from "@/config/member-nav"
import { Shell } from "@/components/layout/shell"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import { RoleSwitcher } from "@/components/ui/role-switcher"
import { UserMenu } from "@/components/ui/user-menu"

export default function MemberLayout({
                                       children,
                                     }: {
  children: React.ReactNode
}) {
  // 模拟用户数据
  const user = {
    id: "1",
    name: "张三",
    role: ["member", "admin"], // 设置为管理员以显示角色切换按钮
    avatar: "/placeholder.svg",
  }

  return (
      <Shell>
        <div className="flex h-screen">
          <div className="hidden md:block w-64 border-r">
            <SidebarNav items={memberNavItems} />
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="border-b p-4 flex items-center justify-between">
              <Breadcrumb />
              <div className="flex items-center gap-4">
                {/* 通知按钮 */}
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600" />
                </Button>

                {/* 角色切换按钮 - 只有管理员可见 */}
                {user.role.includes("admin") && (
                    <div className="flex items-center">
                      <span className="text-sm text-muted-foreground mr-2">党员视图</span>
                      <RoleSwitcher isAdmin={false} targetPath="/admin/workbench" />
                    </div>
                )}

                {/* 用户头像和下拉菜单 */}
                <UserMenu user={user} />
              </div>
            </div>
            <div className="flex-1 overflow-auto p-6">
              <div className="space-y-6 bg-white border p-6 rounded-lg">{children}</div>
            </div>
          </div>
        </div>
      </Shell>
  )
}
