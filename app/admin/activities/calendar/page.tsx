"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DateRangePicker } from "@/components/DateTimePicker"
import { useToast } from "@/hooks/use-toast"
import { useData } from "@/context/data-context"
import { format } from "date-fns"
import { PlusCircle, CalendarIcon, Clock, MapPin, Edit, Trash2 } from "lucide-react"

export default function ActivitiesCalendarPage() {
  const { toast } = useToast()
  const { ActivitiesAPI, BranchAPI, loading, refreshData } = useData()

  const [date, setDate] = useState<Date>(new Date())
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<any | null>(null)

  const [newActivity, setNewActivity] = useState<any>(() => {
    const empty = ActivitiesAPI.createEmpty()
    return {
      ...empty,
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 2 * 60 * 60 * 1000), // 默认2小时后结束
    }
  })

  // 活动类型颜色映射
  const activityTypeColors: Record<string, string> = {
    '支部党员大会': "bg-red-500",
    '支部委员会': "bg-blue-500",
    '党小组会': "bg-green-500",
    '党课': "bg-yellow-500",
    '党日活动': "bg-purple-500",
    '其他': "bg-gray-500",
  }

  // 获取当前日期的活动
  const activitiesOnDate = ActivitiesAPI.data.filter((activity) => {
    const activityDate = new Date(activity.startTime)
    return (
      activityDate.getDate() === date.getDate() &&
      activityDate.getMonth() === date.getMonth() &&
      activityDate.getFullYear() === date.getFullYear()
    )
  })

  // 处理添加活动
  const handleAddActivity = async () => {
    try {
      // 表单验证
      if (
        !newActivity.title ||
        !newActivity.type ||
        !newActivity.startTime ||
        !newActivity.endTime ||
        !newActivity.location ||
        !newActivity.branch
      ) {
        toast({
          title: "请填写所有必填字段",
          description: "请确保活动标题、类型、开始时间、结束时间、地点和负责支部已填写。",
          variant: "destructive",
        })
        return
      }

      // 日期时间验证
      if (new Date(newActivity.endTime) <= new Date(newActivity.startTime)) {
        toast({
          title: "时间设置错误",
          description: "结束时间必须晚于开始时间",
          variant: "destructive",
        })
        return
      }

      const success = await ActivitiesAPI.add(newActivity)
      if (success) {
        toast({
          title: "活动添加成功",
          description: `已成功添加活动：${newActivity.title}`,
        })
        setShowAddDialog(false)
        setNewActivity({
          ...ActivitiesAPI.createEmpty(),
          startTime: new Date(),
          endTime: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
        })
        await refreshData()
      } else {
        toast({
          title: "活动添加失败",
          description: "请稍后重试",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("添加活动时出错:", error)
      toast({
        title: "活动添加失败",
        description: "发生错误，请稍后重试",
        variant: "destructive",
      })
    }
  }

  // 处理编辑活动
  const handleEditActivity = async () => {
    if (!selectedActivity) return

    try {
      // 表单验证
      if (
        !selectedActivity.title ||
        !selectedActivity.type ||
        !selectedActivity.startTime ||
        !selectedActivity.endTime ||
        !selectedActivity.location ||
        !selectedActivity.branch
      ) {
        toast({
          title: "请填写所有必填字段",
          description: "请确保活动标题、类型、开始时间、结束时间、地点和负责支部已填写。",
          variant: "destructive",
        })
        return
      }

      // 日期时间验证
      if (new Date(selectedActivity.endTime) <= new Date(selectedActivity.startTime)) {
        toast({
          title: "时间设置错误",
          description: "结束时间必须晚于开始时间",
          variant: "destructive",
        })
        return
      }

      const success = await ActivitiesAPI.save(selectedActivity)
      if (success) {
        toast({
          title: "活动更新成功",
          description: `已成功更新活动：${selectedActivity.title}`,
        })
        setShowEditDialog(false)
        setSelectedActivity(null)
        await refreshData()
      } else {
        toast({
          title: "活动更新失败",
          description: "请稍后重试",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("更新活动时出错:", error)
      toast({
        title: "活动更新失败",
        description: "发生错误，请稍后重试",
        variant: "destructive",
      })
    }
  }

  // 处理删除活动
  const handleDeleteActivity = async (id: number) => {
    try {
      const success = await ActivitiesAPI.del(id)
      if (success) {
        toast({
          title: "活动删除成功",
          description: "已成功删除活动",
        })
        await refreshData()
      } else {
        toast({
          title: "活动删除失败",
          description: "请稍后重试",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("删除活动时出错:", error)
      toast({
        title: "活动删除失败",
        description: "发生错误，请稍后重试",
        variant: "destructive",
      })
    }
  }

  // 格式化日期时间
  const formatDateTime = (date: Date) => {
    return format(new Date(date), "yyyy-MM-dd HH:mm")
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">活动日历</h1>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              添加活动
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>添加新活动</DialogTitle>
              <DialogDescription>填写以下信息创建新活动</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  活动标题
                </Label>
                <Input
                  id="title"
                  className="col-span-3"
                  value={newActivity.title}
                  onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  活动类型
                </Label>
                <Select
                  value={newActivity.type}
                  onValueChange={(value: any) => setNewActivity({ ...newActivity, type: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="选择活动类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="支部党员大会">支部党员大会</SelectItem>
                    <SelectItem value="支部委员会">支部委员会</SelectItem>
                    <SelectItem value="党小组会">党小组会</SelectItem>
                    <SelectItem value="党课">党课</SelectItem>
                    <SelectItem value="党日活动">党日活动</SelectItem>
                    <SelectItem value="其他">其他</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">活动时间</Label>
                <div className="col-span-3">
                  <DateRangePicker
                    startDate={new Date(newActivity.startTime)}
                    endDate={new Date(newActivity.endTime)}
                    setStartDate={(date) => setNewActivity({ ...newActivity, startTime: date })}
                    setEndDate={(date) => setNewActivity({ ...newActivity, endTime: date })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  活动地点
                </Label>
                <Input
                  id="location"
                  className="col-span-3"
                  value={newActivity.location}
                  onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="branch" className="text-right">
                  负责支部
                </Label>
                <Select
                  value={String(newActivity.branch.id)}
                  onValueChange={(value) => {
                    const selectedBranch = BranchAPI.data.find((b) => b.id === Number(value))
                    if (selectedBranch) {
                      setNewActivity({ ...newActivity, branch: selectedBranch })
                    }
                  }}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="选择负责支部" />
                  </SelectTrigger>
                  <SelectContent>
                    {BranchAPI.data.map((branch) => (
                      <SelectItem key={branch.id} value={String(branch.id)}>
                        {branch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="content" className="text-right">
                  活动内容
                </Label>
                <Textarea
                  id="content"
                  className="col-span-3"
                  value={newActivity.content}
                  onChange={(e) => setNewActivity({ ...newActivity, content: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="remark" className="text-right">
                  备注
                </Label>
                <Textarea
                  id="remark"
                  className="col-span-3"
                  value={newActivity.remark}
                  onChange={(e) => setNewActivity({ ...newActivity, remark: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                取消
              </Button>
              <Button onClick={handleAddActivity}>保存</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>日历</CardTitle>
            <CardDescription>选择日期查看活动</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>{format(date, "yyyy年MM月dd日")}的活动</CardTitle>
            <CardDescription>
              {activitiesOnDate.length > 0 ? `共有 ${activitiesOnDate.length} 个活动` : "今日暂无活动"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <p>加载中...</p>
              </div>
            ) : activitiesOnDate.length > 0 ? (
              <div className="space-y-4">
                {activitiesOnDate.map((activity) => (
                  <div
                    key={activity.id}
                    className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${activityTypeColors[activity.type] || "bg-gray-500"}`}
                        ></div>
                        <h3 className="font-medium">{activity.title}</h3>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedActivity(activity)
                            setShowEditDialog(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteActivity(activity.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      <div className="flex items-center gap-1 mb-1">
                        <Clock className="h-3 w-3" />
                        <span>
                          {formatDateTime(activity.startTime)} - {formatDateTime(activity.endTime)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mb-1">
                        <MapPin className="h-3 w-3" />
                        <span>{activity.location}</span>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm">{activity.content}</p>
                      </div>
                      {activity.remark && (
                        <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                          <p>备注: {activity.remark}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                <CalendarIcon className="h-10 w-10 mb-2" />
                <p>当前日期没有活动</p>
                <Button
                  variant="link"
                  onClick={() => {
                    setNewActivity({
                      ...ActivitiesAPI.createEmpty(),
                      startTime: date,
                      endTime: new Date(date.getTime() + 2 * 60 * 60 * 1000), // 默认2小时后结束
                    })
                    setShowAddDialog(true)
                  }}
                >
                  添加活动
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 编辑活动对话框 */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>编辑活动</DialogTitle>
            <DialogDescription>修改活动信息</DialogDescription>
          </DialogHeader>
          {selectedActivity && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">
                  活动标题
                </Label>
                <Input
                  id="edit-title"
                  className="col-span-3"
                  value={selectedActivity.title}
                  onChange={(e) => setSelectedActivity({ ...selectedActivity, title: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-type" className="text-right">
                  活动类型
                </Label>
                <Select
                  value={selectedActivity.type}
                  onValueChange={(value: any) => setSelectedActivity({ ...selectedActivity, type: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="选择活动类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="支部党员大会">支部党员大会</SelectItem>
                    <SelectItem value="支部委员会">支部委员会</SelectItem>
                    <SelectItem value="党小组会">党小组会</SelectItem>
                    <SelectItem value="党课">党课</SelectItem>
                    <SelectItem value="党日活动">党日活动</SelectItem>
                    <SelectItem value="其他">其他</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">活动时间</Label>
                <div className="col-span-3">
                  <DateRangePicker
                    startDate={new Date(selectedActivity.startTime)}
                    endDate={new Date(selectedActivity.endTime)}
                    setStartDate={(date) => setSelectedActivity({ ...selectedActivity, startTime: date })}
                    setEndDate={(date) => setSelectedActivity({ ...selectedActivity, endTime: date })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-location" className="text-right">
                  活动地点
                </Label>
                <Input
                  id="edit-location"
                  className="col-span-3"
                  value={selectedActivity.location}
                  onChange={(e) => setSelectedActivity({ ...selectedActivity, location: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-branch" className="text-right">
                  负责支部
                </Label>
                <Select
                  value={String(selectedActivity.branch.id)}
                  onValueChange={(value) => {
                    const selectedBranch = BranchAPI.data.find((b) => b.id === Number(value))
                    if (selectedBranch) {
                      setSelectedActivity({ ...selectedActivity, branch: selectedBranch })
                    }
                  }}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="选择负责支部" />
                  </SelectTrigger>
                  <SelectContent>
                    {BranchAPI.data.map((branch) => (
                      <SelectItem key={branch.id} value={String(branch.id)}>
                        {branch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-content" className="text-right">
                  活动内容
                </Label>
                <Textarea
                  id="edit-content"
                  className="col-span-3"
                  value={selectedActivity.content}
                  onChange={(e) => setSelectedActivity({ ...selectedActivity, content: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-remark" className="text-right">
                  备注
                </Label>
                <Textarea
                  id="edit-remark"
                  className="col-span-3"
                  value={selectedActivity.remark}
                  onChange={(e) => setSelectedActivity({ ...selectedActivity, remark: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              取消
            </Button>
            <Button onClick={handleEditActivity}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
