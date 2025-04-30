import { LayoutDashboard, User, Users, Calendar, BookOpen, Activity, FileText } from "lucide-react"

export const memberNavItems = [
  {
    title: "工作台",
    href: "/member/workbench",
    icon: LayoutDashboard,
  },
  {
    title: "个人中心",
    href: "/member/profile",
    icon: User,
  },
  {
    title: "我的组织",
    href: "/member/organization",
    icon: Users,
    submenu: [
      {
        title: "党组织信息",
        href: "/member/organization/info",
      },
      {
        title: "组织成员-党员",
        href: "/member/organization/members",
      },
    ],
  },
  {
    title: "三会一课",
    href: "/member/meetings",
    icon: Calendar,
    submenu: [
      {
        title: "支部党员大会",
        href: "/member/meetings/general",
      },
      {
        title: "支部委员会",
        href: "/member/meetings/committee",
      },
      {
        title: "党小组会",
        href: "/member/meetings/group",
      },
      {
        title: "党课",
        href: "/member/meetings/lecture",
      },
    ],
  },
  {
    title: "党日活动",
    href: "/member/activities",
    icon: Activity,
  },
  {
    title: "组织关系转接",
    href: "/member/transfer",
    icon: FileText,
  },
  {
    title: "学习教育",
    href: "/member/education",
    icon: BookOpen,
    submenu: [
      {
        title: "党课资源",
        href: "/member/education/resources",
      },
      {
        title: "共产党员网",
        href: "http://www.12371.cn/",
        external: true,
      },
      {
        title: "求是网",
        href: "http://www.qstheory.cn/",
        external: true,
      },
    ],
  },
]
