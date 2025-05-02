"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CardStat } from "@/components/ui/card-stat"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Activity, Bell, BookOpen, CalendarIcon, Users, Clock, MapPin } from "lucide-react"

interface User {
  id: string
  name: string
  role: string
  avatar: string
}

// 模拟数据
const notices = [
  {
    title: "关于开展2023年度组织生活会的通知",
    content: "根据上级党组织要求，我支部将于2023年12月15日开展组织生活会，请全体党员做好准备。",
    date: "2023-12-01",
  },
  {
    title: "关于开展党员先锋岗评选活动的通知",
    content: "为弘扬先进典型，激励党员发挥先锋模范作用，现开展党员先锋岗评选活动。",
    date: "2023-11-20",
  },
  {
    title: "关于缴纳2023年度党费的通知",
    content: "请各位党员于11月30日前完成2023年度党费缴纳工作。",
    date: "2023-11-10",
  },
];

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

        
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 bg-white p-6 rounded-xl shadow-sm">
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
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle >最新通知</CardTitle>
                <CardDescription>查看近期党组织活动安排</CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {notices.map((notice, index) => (
                <div
                  key={index}
                  className="rounded-xl border p-4 shadow-sm hover:shadow transition duration-200 bg-white"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-base">{notice.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      {notice.date}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{notice.content}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>


        <TabsContent value="calendar">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-2xl">工作日历</CardTitle>
                <CardDescription>查看近期党组织活动安排</CardDescription>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col md:flex-row gap-6">
              <div className=" bg-white ">
                <div className="md:w-2/2">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border shadow-sm"
                  />
                </div>
              </div>
              
              <div className="md:w-1/2 space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 border-b pb-2">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  {date?.toLocaleDateString("zh-CN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })} 活动
                </h3>

                {[
                  {
                    title: "支部党员大会",
                    time: "14:00-16:00",
                    place: "第一会议室",
                  },
                  {
                    title: "党课学习",
                    time: "19:00-20:30",
                    place: "线上会议",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-primary/5 rounded-lg p-4 shadow-sm border border-primary/10"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-base font-medium text-primary">
                          {item.title}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {item.time}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {item.place}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
                <div className="md:w-1/2 space-y-4 rounded-lg border border-white-100 bg-white p-6 shadow-sm">
                  <h3 className="mb-6 text-lg font-semibold text-gray-800 border-b-2 border-red-300 pb-3">
                    画像指标详情
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>德育表现</span>
                      <span className="font-medium">93分</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>学业成绩</span>
                      <span className="font-medium">90分</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>学生干部任职</span>
                      <span className="font-medium">班长-优秀</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>寝室卫生</span>
                      <span className="font-medium">95分</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>突出行为纪实</span>
                      <span className="font-medium">无</span>
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
