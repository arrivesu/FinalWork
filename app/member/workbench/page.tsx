"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CardStat } from "@/components/ui/card-stat"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Activity, Bell, BookOpen, CalendarIcon, Users } from "lucide-react"

interface User {
  id: string
  name: string
  role: string
  avatar: string
}

export default function MemberWorkbench() {
  const [user, setUser] = useState<User | null>(null)
  const [date, setDate] = useState<Date | undefined>(new Date())

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!user) return null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">工作台</h1>
        <p className="text-muted-foreground">欢迎回来，{user.name}！这里是您的党员工作台。</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CardStat title="党龄" value="3年2个月" icon={Users} description="入党时间：2021-02-15" />
        <CardStat title="参与活动" value="12次" icon={Activity} description="本年度已参与活动次数" />
        <CardStat title="学习资料" value="25篇" icon={BookOpen} description="已学习的党课资料数量" />
        <CardStat title="待办事项" value="3项" icon={Bell} description="您有3项待办需要处理" />
      </div>

      <Tabs defaultValue="notices">
        <TabsList>
          <TabsTrigger value="notices">通知公告</TabsTrigger>
          <TabsTrigger value="calendar">工作日历</TabsTrigger>
          <TabsTrigger value="portrait">党员画像</TabsTrigger>
        </TabsList>
        <TabsContent value="notices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>最新通知</CardTitle>
              <CardDescription>查看最新的通知公告</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">关于开展2023年度组织生活会的通知</h3>
                  <span className="text-xs text-muted-foreground">2023-12-01</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  根据上级党组织要求，我支部将于2023年12月15日开展组织生活会，请全体党员做好准备。
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">关于开展党员先锋岗评选活动的通知</h3>
                  <span className="text-xs text-muted-foreground">2023-11-20</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  为弘扬先进典型，激励党员发挥先锋模范作用，现开展党员先锋岗评选活动。
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">关于缴纳2023年度党费的通知</h3>
                  <span className="text-xs text-muted-foreground">2023-11-10</span>
                </div>
                <p className="text-sm text-muted-foreground">请各位党员于11月30日前完成2023年度党费缴纳工作。</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>工作日历</CardTitle>
              <CardDescription>查看近期党组织活动安排</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-6">
              <div className="md:w-auto">
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
              </div>
              <div className="md:w-1/2 space-y-4">
                <h3 className="font-medium flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  {date?.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" })}活动
                </h3>
                <div className="space-y-4">
                  <div className="border-l-2 border-primary pl-4 py-2">
                    <div className="font-medium">支部党员大会</div>
                    <div className="text-sm text-muted-foreground">时间：14:00-16:00</div>
                    <div className="text-sm text-muted-foreground">地点：第一会议室</div>
                  </div>
                  <div className="border-l-2 border-muted pl-4 py-2">
                    <div className="font-medium">党课学习</div>
                    <div className="text-sm text-muted-foreground">时间：19:00-20:30</div>
                    <div className="text-sm text-muted-foreground">地点：线上会议</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="portrait">
          <Card>
            <CardHeader>
              <CardTitle>党员画像</CardTitle>
              <CardDescription>查看您的党员画像数据</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <div className="aspect-square relative">
                    {/* 使用雷达图展示党员画像 */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-muted-foreground">2023-2024学年第一学期</p>
                        <p className="text-lg font-bold mt-2">综合评分：92分</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 space-y-4">
                  <h3 className="font-medium">画像指标详情</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>德育表现</span>
                      <span className="font-medium">优秀</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>学业成绩</span>
                      <span className="font-medium">良好</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>学生干部任职</span>
                      <span className="font-medium">班长</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>寝室卫生</span>
                      <span className="font-medium">95分</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>群众评价</span>
                      <span className="font-medium">90分</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
