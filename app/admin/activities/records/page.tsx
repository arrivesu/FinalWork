"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Edit, Trash2, Calendar, Clock, MapPin, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// 模拟活动数据
const activities = [
  {
    id: "1",
    title: "参观革命历史纪念馆",
    date: "2023-12-20",
    time: "09:00-12:00",
    location: "市革命历史纪念馆",
    type: "实践活动",
    status: "未开始",
    participants: 35,
    totalMembers: 42,
    content: "组织党员参观革命历史纪念馆，学习革命历史，传承红色基因。",
  },
  {
    id: "2",
    title: "社区志愿服务活动",
    date: "2023-11-15",
    time: "14:00-17:00",
    location: "和平社区",
    type: "志愿服务",
    status: "已完成",
    participants: 30,
    totalMembers: 42,
    content: "组织党员到社区开展志愿服务，包括环境清洁、为老人提供帮助等。",
  },
  {
    id: "3",
    title: "学习贯彻党的二十大精神",
    date: "2023-10-25",
    time: "19:00-21:00",
    location: "线上会议",
    type: "学习活动",
    status: "已完成",
    participants: 40,
    totalMembers: 42,
    content: "组织党员学习贯彻党的二十大精神，深入理解党的二十大报告内容。",
  },
  {
    id: "4",
    title: "党员先锋岗评选活动",
    date: "2023-09-18",
    time: "14:00-16:00",
    location: "第一会议室",
    type: "组织活动",
    status: "已完成",
    participants: 38,
    totalMembers: 41,
    content: "开展党员先锋岗评选活动，表彰先进党员，激励党员发挥先锋模范作用。",
  },
  {
    id: "5",
    title: "重温入党誓词活动",
    date: "2024-01-15",
    time: "10:00-11:30",
    location: "党员活动室",
    type: "组织活动",
    status: "未开始",
    participants: 0,
    totalMembers: 42,
    content: "组织党员重温入党誓词，牢记入党初心，坚定理想信念。",
  },
]

export default function ActivityRecordsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<any>(null)
  const { toast } = useToast()

  // 过滤活动
  const filterActivities = (status: string) => {
    return activities
      .filter((activity) => status === "all" || activity.status === status)
      .filter(
        (activity) =>
          activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // 按日期降序排序
  }

  const allActivities = filterActivities("all")
  const completedActivities = filterActivities("已完成")
  const upcomingActivities = filterActivities("未开始")

  const handleAddActivity = () => {
    setIsAddDialogOpen(false)
    toast({
      title: "添加成功",
      description: "活动已成功添加",
    })
  }

  const handleEditActivity = () => {
    setIsEditDialogOpen(false)
    toast({
      title: "编辑成功",
      description: "活动信息已成功更新",
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
          <h1 className="text-3xl font-bold tracking-tight">活动记载</h1>
          <p className="text-muted-foreground">管理党组织活动记录</p>
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
              <DialogDescription>添加新的党组织活动</DialogDescription>
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
                      <SelectItem value="学习活动">学习活动</SelectItem>
                      <SelectItem value="实践活动">实践活动</SelectItem>
                      <SelectItem value="志愿服务">志愿服务</SelectItem>
                      <SelectItem value="组织活动">组织活动</SelectItem>
                      <SelectItem value="其他">其他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">活动状态</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择活动状态" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="未开始">未开始</SelectItem>
                      <SelectItem value="已完成">已完成</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="participants">参与人数</Label>
                  <Input id="participants" type="number" placeholder="请输入参与人数" />
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

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="搜索活动标题、类型或地点..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">全部活动</TabsTrigger>
          <TabsTrigger value="upcoming">未开始</TabsTrigger>
          <TabsTrigger value="completed">已完成</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="grid gap-4">
            {allActivities.length > 0 ? (
              allActivities.map((activity) => (
                <Card key={activity.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>{activity.title}</CardTitle>
                      <Badge variant={activity.status === "已完成" ? "outline" : "secondary"}>{activity.status}</Badge>
                    </div>
                    <CardDescription>
                      <div className="flex flex-wrap gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{activity.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{activity.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{activity.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {activity.status === "已完成"
                              ? `${activity.participants}/${activity.totalMembers}人参加`
                              : `预计${activity.totalMembers}人参加`}
                          </span>
                        </div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge>{activity.type}</Badge>
                        <div className="flex space-x-2">
                          <Dialog
                            open={isEditDialogOpen && selectedActivity?.id === activity.id}
                            onOpenChange={(open) => {
                              setIsEditDialogOpen(open)
                              if (open) setSelectedActivity(activity)
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Edit className="mr-2 h-4 w-4" />
                                编辑
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>编辑活动</DialogTitle>
                                <DialogDescription>编辑活动信息</DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-title">活动标题</Label>
                                  <Input id="edit-title" defaultValue={activity.title} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-date">活动日期</Label>
                                    <Input id="edit-date" type="date" defaultValue={activity.date} />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-time">活动时间</Label>
                                    <Input id="edit-time" defaultValue={activity.time} />
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-location">活动地点</Label>
                                    <Input id="edit-location" defaultValue={activity.location} />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-type">活动类型</Label>
                                    <Select defaultValue={activity.type}>
                                      <SelectTrigger>
                                        <SelectValue placeholder="选择活动类型" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="学习活动">学习活动</SelectItem>
                                        <SelectItem value="实践活动">实践活动</SelectItem>
                                        <SelectItem value="志愿服务">志愿服务</SelectItem>
                                        <SelectItem value="组织活动">组织活动</SelectItem>
                                        <SelectItem value="其他">其他</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-status">活动状态</Label>
                                    <Select defaultValue={activity.status}>
                                      <SelectTrigger>
                                        <SelectValue placeholder="选择活动状态" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="未开始">未开始</SelectItem>
                                        <SelectItem value="已完成">已完成</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-participants">参与人数</Label>
                                    <Input id="edit-participants" type="number" defaultValue={activity.participants} />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-content">活动内容</Label>
                                  <Textarea
                                    id="edit-content"
                                    defaultValue={activity.content}
                                    className="min-h-[100px]"
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                  取消
                                </Button>
                                <Button onClick={handleEditActivity}>保存</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteActivity(activity)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            删除
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm">{activity.content}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-4 text-muted-foreground">未找到符合条件的活动</div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="upcoming">
          <div className="grid gap-4">
            {upcomingActivities.length > 0 ? (
              upcomingActivities.map((activity) => (
                <Card key={activity.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>{activity.title}</CardTitle>
                      <Badge variant="secondary">{activity.status}</Badge>
                    </div>
                    <CardDescription>
                      <div className="flex flex-wrap gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{activity.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{activity.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{activity.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>预计{activity.totalMembers}人参加</span>
                        </div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge>{activity.type}</Badge>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="mr-2 h-4 w-4" />
                            编辑
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteActivity(activity)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            删除
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm">{activity.content}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-4 text-muted-foreground">未找到符合条件的未开始活动</div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="completed">
          <div className="grid gap-4">
            {completedActivities.length > 0 ? (
              completedActivities.map((activity) => (
                <Card key={activity.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>{activity.title}</CardTitle>
                      <Badge variant="outline">{activity.status}</Badge>
                    </div>
                    <CardDescription>
                      <div className="flex flex-wrap gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{activity.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{activity.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{activity.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {activity.participants}/{activity.totalMembers}人参加
                          </span>
                        </div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge>{activity.type}</Badge>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="mr-2 h-4 w-4" />
                            编辑
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteActivity(activity)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            删除
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm">{activity.content}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-4 text-muted-foreground">未找到符合条件的已完成活动</div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
