"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

export function Breadcrumb() {
  const pathname = usePathname()

  if (pathname === "/") return null

  const segments = pathname.split("/").filter(Boolean)

  // 路径映射表，将路径转换为中文名称
  const pathMap: Record<string, string> = {
    admin: "管理员",
    member: "党员",
    workbench: "工作台",
    profile: "个人资料",
    organization: "组织管理",
    info: "组织信息",
    members: "组织成员",
    meetings: "三会一课",
    general: "党员大会",
    committee: "支委会",
    group: "党小组会",
    lecture: "党课",
    transfer: "组织关系转接",
    education: "党员教育",
    resources: "学习资源",
    courses: "在线课程",
    activities: "党员活动",
    dues: "党费缴纳",
    reports: "思想汇报",
    development: "发展工作",
    applicants: "入党申请人",
    activists: "入党积极分子",
    candidates: "发展对象",
    calendar: "活动日历",
    records: "活动记录",
    data: "数据分析",
    portraits: "党员画像",
    statistics: "统计分析",
    settings: "系统设置",
    users: "用户管理",
    logs: "系统日志",
    config: "系统配置",
    list: "党员名册",
    "branch-card": "党支部名片",
  }

  return (
    <nav className="flex items-center text-sm">
      <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground">
        <Home className="h-4 w-4" />
        <span className="sr-only">首页</span>
      </Link>

      {segments.map((segment, index) => {
        const path = `/${segments.slice(0, index + 1).join("/")}`
        const isLast = index === segments.length - 1

        return (
          <div key={path} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
            {isLast ? (
              <span className="font-medium">{pathMap[segment] || segment}</span>
            ) : (
              <Link href={path} className="text-muted-foreground hover:text-foreground">
                {pathMap[segment] || segment}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}
