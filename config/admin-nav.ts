import { LayoutDashboard, User, Users, BookOpen, Activity, Settings, BarChart } from "lucide-react"

export const adminNavItems = [
  {
    title: "工作台",
    href: "/admin/workbench",
    icon: LayoutDashboard,
  },
  {
    title: "个人中心",
    href: "/admin/profile",
    icon: User,
  },
  {
    title: "党员管理",
    href: "/admin/members",
    icon: Users,
    submenu: [
      {
        title: "党员名册",
        href: "/admin/members/list",
      },
      {
        title: "组织关系转接",
        href: "/admin/members/transfer",
      },
    ],
  },
  {
    title: "发展党员管理",
    href: "/admin/development",
    icon: Users,
    submenu: [
      {
        title: "入党申请人",
        href: "/admin/development/applicants",
      },
      {
        title: "入党积极分子",
        href: "/admin/development/activists",
      },
      {
        title: "发展对象",
        href: "/admin/development/candidates",
      },
    ],
  },
  {
    title: "活动管理",
    href: "/admin/activities",
    icon: Activity,
    submenu: [
      {
        title: "活动记载",
        href: "/admin/activities/records",
      },
      {
        title: "工作日历",
        href: "/admin/activities/calendar",
      },
    ],
  },
  {
    title: "学习教育",
    href: "/admin/education",
    icon: BookOpen,
    submenu: [
      {
        title: "学习资料",
        href: "/admin/education/resources",
      },
    ],
  },
  {
    title: "支部大数据",
    href: "/admin/data",
    icon: BarChart,
    submenu: [
      {
        title: "支部统计概览",
        href: "/admin/data/statistics",
      },
      {
        title: "党员画像",
        href: "/admin/data/portraits",
      },
    ],
  },
  {
    title: "系统设置",
    href: "/admin/settings",
    icon: Settings,
    submenu: [
      {
        title: "用户管理",
        href: "/admin/settings/users",
      },
      {
        title: "系统配置",
        href: "/admin/settings/config",
      },
      {
        title: "操作日志",
        href: "/admin/settings/logs",
      },
    ],
  },
]
