"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Clock, MapPin, Plus, Edit, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// 模拟活动数据
const activities = [
  {
    id: "1",
    title: "支部党员大会",
    date: "2024-03-15",
    time: "14:00-16:00",
    location: "第一会议室",
    type: "meeting",
    content: "1. 学习贯彻党的二十大精神\n2. 总结2023年工作\n3. 讨论2024年工作计划",
  },
  {
    id: "2",
    title: "党课学习",
    date: "2024-03-15",
    time: "19:00-20:30",
    location: "线上会议",
    type: "lecture",
    content: "学习《习近平新时代中国特色社会主义思想》",
  },
  {
    id: "3",
    title: "志愿服务活动",
    date: "2024-03-20",
    time: "09:00-12:00",
    location: "社区服务中心",
    type: "activity",
    content: "开展社区环境清洁志愿服务活动",
  },
]

export default function WorkCalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const { toast } = useToast()

  // 获取选定日期的活动
  const getActivitiesByDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return []

    const dateString = selectedDate.toISOString().split("T")[0]
    return activities.filter((activity) => activity.date === dateString)
  }

  const selectedDateActivities = getActivitiesByDate(date)

  const handleAddActivity = () => {
    setIsAddDialogOpen(false)
    toast({
      title: "添加成功",
      description: "活动已成功添加到日历",
    })
  }

  const handleEditActivity = (activity: any) => {
    toast({
      title: "编辑成功",
      description: `活动 "${activity.title}" 已成功更新`,
    })
  }

  const handleDeleteActivity = (activity: any) => {
    toast({
      title: "删除成功",
      description: `活动 "${activity.title}" 已成功删除`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">工作日历</h1>
          <p className="text-muted-foreground">管理党组织活动安排</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              添加活动
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>添加活动</DialogTitle>
              <DialogDescription>添加新活动到工作日历</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">活动标题</Label>
                <Input id="title" placeholder="请输入活动标题" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">活动日期</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">活动时间</Label>
                  <Input id="time" placeholder="例如：14:00-16:00" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">活动地点</Label>
                  <Input id="location" placeholder="请输入活动地点" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">活动类型</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择活动类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meeting">会议</SelectItem>
                      <SelectItem value="lecture">党课</SelectItem>
                      <SelectItem value="activity">党日活动</SelectItem>
                      <SelectItem value="other">其他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">活动内容</Label>
                <Textarea id="content" placeholder="请输入活动内容" className="min-h-[100px]" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                取消
              </Button>
              <Button onClick={handleAddActivity}>添加</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-[auto_1fr]">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>日历</CardTitle>
            <CardDescription>选择日期查看活动安排</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>
                  {date?.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" })}活动
                </CardTitle>
                <CardDescription>
                  {selectedDateActivities.length > 0 ? `共 ${selectedDateActivities.length} 个活动` : "暂无活动安排"}
                </CardDescription>
              </div>
              <Button size="sm" variant="outline" onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                添加
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedDateActivities.length > 0 ? (
                selectedDateActivities.map((activity) => (
                  <div key={activity.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{activity.title}</h3>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditActivity(activity)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteActivity(activity)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{activity.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{activity.location}</span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm whitespace-pre-line">{activity.content}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <CalendarIcon className="mx-auto h-12 w-12 opacity-30" />
                  <p className="mt-2">当天暂无活动安排</p>
                  <Button variant="outline" className="mt-4" onClick={() => setIsAddDialogOpen(true)}>
                    添加活动
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
