"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CardStat } from "@/components/ui/card-stat"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Activity, Bell, BookOpen, CalendarIcon, Plus, Users } from "lucide-react"

interface User {
  id: string
  name: string
  role: string
  avatar: string
}

export default function AdminWorkbench() {
  const [user, setUser] = useState<User | null>(null)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isDialogOpen, setIsDialogOpen] = useState(false)

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
        <p className="text-muted-foreground">欢迎回来，{user.name}！这里是您的管理员工作台。</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CardStat title="党员总数" value="42人" icon={Users} description="包含正式党员和预备党员" />
        <CardStat title="本月活动" value="5次" icon={Activity} description="本月已开展活动次数" />
        <CardStat title="学习资料" value="36篇" icon={BookOpen} description="已上传的党课资料数量" />
        <CardStat title="待办事项" value="7项" icon={Bell} description="您有7项待办需要处理" />
      </div>

      <Tabs defaultValue="notices">
        <TabsList>
          <TabsTrigger value="notices">通知公告</TabsTrigger>
          <TabsTrigger value="calendar">工作日历</TabsTrigger>
          <TabsTrigger value="statistics">支部统计</TabsTrigger>
        </TabsList>
        <TabsContent value="notices" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>通知管理</CardTitle>
                <CardDescription>发布和管理通知公告</CardDescription>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    发布通知
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>发布新通知</DialogTitle>
                    <DialogDescription>创建一个新的通知公告，将发送给所有党员。</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">通知标题</Label>
                      <Input id="title" placeholder="请输入通知标题" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="content">通知内容</Label>
                      <Textarea id="content" placeholder="请输入通知内容" className="min-h-[100px]" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      取消
                    </Button>
                    <Button onClick={() => setIsDialogOpen(false)}>发布</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>工作日历</CardTitle>
                <CardDescription>管理党组织活动安排</CardDescription>
              </div>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                添加活动
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
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
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline">
                        编辑
                      </Button>
                      <Button size="sm" variant="destructive">
                        删除
                      </Button>
                    </div>
                  </div>
                  <div className="border-l-2 border-muted pl-4 py-2">
                    <div className="font-medium">党课学习</div>
                    <div className="text-sm text-muted-foreground">时间：19:00-20:30</div>
                    <div className="text-sm text-muted-foreground">地点：线上会议</div>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline">
                        编辑
                      </Button>
                      <Button size="sm" variant="destructive">
                        删除
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="statistics">
          <Card>
          <CardHeader>
            <CardTitle>支部统计概览</CardTitle>
            <CardDescription>查看党支部整体情况统计</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
              {/* 党员构成模块 */}
              <div className="rounded-lg border border-gray-100 p-6 shadow-sm">
                <h3 className="mb-6 text-lg font-semibold text-gray-800 border-b-2 border-red-300 pb-3">
                  党员构成
                </h3>
                <div className="space-y-4">
                  {[
                    ['正式党员', '32人', 'bg-blue-100'],
                    ['预备党员', '10人', 'bg-green-100'],
                    ['发展对象', '15人', 'bg-amber-100'],
                    ['入党积极分子', '25人', 'bg-purple-100'],
                    ['入党申请人', '40人', 'bg-pink-100']
                  ].map(([label, value, color]) => (
                    <div key={label} className="flex items-center justify-between group">
                      <div className="flex items-center">
                        <span className={`w-2 h-6 ${color} rounded-sm mr-3`}></span>
                        <span className="text-gray-600">{label}</span>
                      </div>
                      <span className="font-medium text-gray-800">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 活动统计模块 */}
              <div className="rounded-lg border border-gray-100 p-6 shadow-sm">
                <h3 className="mb-6 text-lg font-semibold text-gray-800 border-b-2 border-red-300 pb-3">
                  活动统计
                </h3>
                <div className="space-y-4">
                  {[
                    ['支部党员大会', '4次/年', 'bg-red-100'],
                    ['支部委员会', '12次/年', 'bg-orange-100'],
                    ['党小组会', '12次/年', 'bg-yellow-100'],
                    ['党课', '8次/年', 'bg-green-100'],
                    ['党日活动', '12次/年', 'bg-blue-100']
                  ].map(([event, frequency, color]) => (
                    <div key={event} className="flex items-center justify-between group">
                      <div className="flex items-center">
                        <span className={`w-2 h-6 ${color} rounded-sm mr-3`}></span>
                        <span className="text-gray-600">{event}</span>
                      </div>
                      <span className="font-medium text-gray-800">{frequency}</span>
                    </div>
                  ))}
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
