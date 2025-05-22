"use client"

import { useEffect, useState } from "react"
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
import { Calendar, Check, Clock, Edit, MapPin, Plus, Search, Trash2, UserCheck, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { getDateTimeParts, getDayTimeParts, isComplete, timeFilter, TimeFilterType } from "@/lib/utils"
import { useData } from "@/context/data-context"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { DateRangePicker } from "@/components/DateTimePicker"

// 扩展ActivityType以包含表单所需的额外字段
interface ActivityFormData {
  id: number
  title: string
  content: string
  type: string
  location: string
  startTime: Date
  endTime: Date
  branch: any
  remark: string
  status?: string
  participants?: number
}

const attendanceStatuses = [
  { value: "正常参会", label: "正常参会" },
  { value: "请假", label: "请假" },
  { value: "迟到", label: "迟到" },
  { value: "旷会", label: "旷会" },
]

interface MemberAttendanceDialogProps {
  open: boolean
  onOpenChangeAction: (open: boolean) => void
  activityId?: number
  onSaveAction: (members: any[]) => void
}

function MemberAttendanceDialog({ open, onOpenChangeAction, activityId, onSaveAction }: MemberAttendanceDialogProps) {
  const { MemberAPI, ActivityJoinAPI } = useData()
  const [memberAttendance, setMemberAttendance] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMemberIds, setSelectedMemberIds] = useState<number[]>([])
  const [batchStatus, setBatchStatus] = useState("正常参会")

  // Initialize member attendance data when dialog opens or activityId changes
  useEffect(() => {
    if (open && activityId) {
      // Get existing activity joins for this activity
      const activityJoinsForActivity = ActivityJoinAPI.data.filter((join) => join.activity.id === activityId)

      // Create attendance data by merging members with their join status
      const attendanceData = MemberAPI.data.map((member) => {
        const join = activityJoinsForActivity.find((join) => join.member.id === member.id)
        return {
          id: member.id,
          studentId: member.student_number,
          name: member.name,
          status: join ? join.status : "正常参会", // Default status if no join record exists
        }
      })

      setMemberAttendance(attendanceData)
    }
  }, [open, activityId, MemberAPI.data, ActivityJoinAPI.data])

  // 过滤党员
  const filteredMembers = memberAttendance.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.studentId.toString().toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // 全选/取消全选
  const handleSelectAll = () => {
    if (selectedMemberIds.length === filteredMembers.length) {
      // 如果已经全选，则取消全选
      setSelectedMemberIds([])
    } else {
      // 否则全选
      setSelectedMemberIds(filteredMembers.map((member) => member.id))
    }
  }

  // 选择/取消选择单个成员
  const handleSelectMember = (id: number) => {
    if (selectedMemberIds.includes(id)) {
      setSelectedMemberIds(selectedMemberIds.filter((memberId) => memberId !== id))
    } else {
      setSelectedMemberIds([...selectedMemberIds, id])
    }
  }

  // 批量更新所选成员状态
  const handleBatchUpdateStatus = () => {
    if (selectedMemberIds.length === 0) return

    setMemberAttendance(
      memberAttendance.map((member) =>
        selectedMemberIds.includes(member.id)
          ? {
              ...member,
              status: batchStatus,
            }
          : member,
      ),
    )

    // 更新后清除选择
    setSelectedMemberIds([])
  }

  // 更新单个成员状态
  const handleStatusChange = (id: number, status: string) => {
    setMemberAttendance(memberAttendance.map((member) => (member.id === id ? { ...member, status } : member)))
  }

  // 保存更改
  const handleSave = () => {
    onSaveAction(memberAttendance)
    onOpenChangeAction(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>党员出席情况</DialogTitle>
          <DialogDescription>设置党员参加活动的出席状态</DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="relative w-64 flex-shrink-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索学号或姓名..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4 flex-grow justify-end">
            {selectedMemberIds.length > 0 && (
              <div className="text-sm font-medium">已选择 {selectedMemberIds.length} 名党员</div>
            )}
            <Select value={batchStatus} onValueChange={setBatchStatus}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="选择状态" />
              </SelectTrigger>
              <SelectContent>
                {attendanceStatuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button size="sm" onClick={handleBatchUpdateStatus} disabled={selectedMemberIds.length === 0}>
              <UserCheck className="mr-2 h-4 w-4" />
              批量设置状态
            </Button>
          </div>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={filteredMembers.length > 0 && selectedMemberIds.length === filteredMembers.length}
                    onCheckedChange={handleSelectAll}
                    aria-label="全选"
                  />
                </TableHead>
                <TableHead className="w-[100px]">学号</TableHead>
                <TableHead>姓名</TableHead>
                <TableHead className="w-[180px]">出席状态</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedMemberIds.includes(member.id)}
                      onCheckedChange={() => handleSelectMember(member.id)}
                    />
                  </TableCell>
                  <TableCell>{member.studentId}</TableCell>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>
                    <Select value={member.status} onValueChange={(value) => handleStatusChange(member.id, value)}>
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="选择状态" />
                      </SelectTrigger>
                      <SelectContent>
                        {attendanceStatuses.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChangeAction(false)}>
            取消
          </Button>
          <Button onClick={handleSave}>
            <Check className="mr-2 h-4 w-4" />
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function ActivityRecordsPage() {
  // 使用正确的类型从数据上下文获取数据
  const { ActivitiesAPI, MemberAPI, BranchAPI, ActivityJoinAPI, loading, refreshData } = useData()

  // 本地状态
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isMemberDialogOpen, setIsMemberDialogOpen] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<ActivityFormData | null>(null)
  const { toast } = useToast()

  // 新活动表单状态
  const [newActivity, setNewActivity] = useState<ActivityFormData>(() => {
    const now = new Date()
    const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000)

    return {
      id: 0,
      title: "",
      content: "",
      type: "党日活动", // 默认类型
      location: "",
      startTime: now,
      endTime: twoHoursLater,
      branch: BranchAPI.data[0] || { id: 1, name: "默认支部", superior_org: "上级组织" }, // 默认支部
      remark: "",
    }
  })

  // 当选择活动时初始化编辑表单
  useEffect(() => {
    if (selectedActivity && isEditDialogOpen) {
      // 确保日期是 Date 对象
      const activity = {
        ...selectedActivity,
        startTime: new Date(selectedActivity.startTime),
        endTime: new Date(selectedActivity.endTime),
        status: isComplete(selectedActivity) ? "已完成" : "未开始",
        participants: MemberAPI.data.filter((member) => member.branch.id === selectedActivity.branch.id).length,
      }
      setSelectedActivity(activity)
    }
  }, [isEditDialogOpen, MemberAPI.data])

  // 根据搜索词和时间过滤活动
  const filterActivities = (filter: TimeFilterType) => {
    return ActivitiesAPI.data
      .filter((activity) => timeFilter(activity.startTime, filter))
      .filter(
        (activity) =>
          activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()) // 按日期降序排序
  }

  const allActivities = filterActivities(TimeFilterType.ALL)
  const completedActivities = filterActivities(TimeFilterType.BEFORE)
  const upcomingActivities = filterActivities(TimeFilterType.COMPLETE)

  // 添加新活动
  const handleAddActivity = async () => {
    try {
      // 验证必填字段
      if (!newActivity.title || !newActivity.location || !newActivity.type) {
        toast({
          title: "添加失败",
          description: "请填写所有必填字段",
          variant: "destructive",
        })
        return
      }

      // 验证日期
      if (new Date(newActivity.endTime) <= new Date(newActivity.startTime)) {
        toast({
          title: "时间设置错误",
          description: "结束时间必须晚于开始时间",
          variant: "destructive",
        })
        return
      }

      // 创建活动对象
      const activityToAdd: ActivityType = {
        ...newActivity,
        type: newActivity.type as ActivityType['type']
      }

      // 使用上下文添加活动
      await ActivitiesAPI.add(activityToAdd)
      await refreshData()

      // 重置并关闭
      setIsAddDialogOpen(false)
      setNewActivity({
        id: 0,
        title: "",
        content: "",
        type: "党日活动",
        location: "",
        startTime: new Date(),
        endTime: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
        branch: BranchAPI.data[0] || { id: 1, name: "默认支部", superior_org: "上级组织" },
        remark: "",
      })

      toast({
        title: "添加成功",
        description: "活动已成功添加",
      })
    } catch (error) {
      toast({
        title: "添加失败",
        description: "添加活动时发生错误，请重试",
        variant: "destructive",
      })
    }
  }

  // 编辑现有活动
  const handleEditActivity = async () => {
    try {
      if (!selectedActivity) return

      // 验证必填字段
      if (!selectedActivity.title || !selectedActivity.location || !selectedActivity.type) {
        toast({
          title: "编辑失败",
          description: "请填写所有必填字段",
          variant: "destructive",
        })
        return
      }

      // 验证日期
      if (new Date(selectedActivity.endTime) <= new Date(selectedActivity.startTime)) {
        toast({
          title: "时间设置错误",
          description: "结束时间必须晚于开始时间",
          variant: "destructive",
        })
        return
      }

      const activityToSave: ActivityType = {
        ...selectedActivity,
        type: selectedActivity.type as ActivityType['type']
      }

      // 更新活动
      await ActivitiesAPI.save(activityToSave)
      await refreshData()

      setIsEditDialogOpen(false)
      toast({
        title: "编辑成功",
        description: "活动信息已成功更新",
      })
    } catch (error) {
      toast({
        title: "编辑失败",
        description: "编辑活动时发生错误，请重试",
        variant: "destructive",
      })
    }
  }

  // 删除活动
  const handleDeleteActivity = async (activity: any) => {
    try {
      await ActivitiesAPI.del(activity.id)
      await refreshData()

      toast({
        title: "删除成功",
        description: `活动 "${activity.title}" 已成功删除`,
      })
    } catch (error) {
      toast({
        title: "删除失败",
        description: "删除活动时发生错误，请重试",
        variant: "destructive",
      })
    }
  }

  // 打开成员出席对话框
  const handleOpenMemberDialog = (activity: any) => {
    setSelectedActivity(activity)
    setIsMemberDialogOpen(true)
  }

  // 保存成员出席情况
  const handleSaveMemberAttendance = async (attendanceData: any[]) => {
    if (!selectedActivity) return

    try {
      // 处理每个成员的出席状态
      for (const memberAttendance of attendanceData) {
        // 查找成员
        const member = MemberAPI.data.find((m) => m.id === memberAttendance.id)
        if (!member) continue

        // 查找现有的出席记录
        const existingJoin = ActivityJoinAPI.data.find(
          (join) => join.activity.id === selectedActivity.id && join.member.id === memberAttendance.id,
        )

        if (existingJoin) {
          // 更新现有记录
          await ActivityJoinAPI.save({
            ...existingJoin,
            status: memberAttendance.status,
          })
        } else {
          const activityToSave: ActivityType = {
            ...selectedActivity,
            type: selectedActivity.type as ActivityType['type']
          }
          // 创建新记录
          await ActivityJoinAPI.add({
            id: Date.now() + memberAttendance.id, // 临时ID
            activity: activityToSave,
            member: member,
            status: memberAttendance.status,
          })
        }
      }

      await refreshData()

      toast({
        title: "保存成功",
        description: "党员出席情况已成功保存",
      })
    } catch (error) {
      toast({
        title: "保存失败",
        description: "保存出席情况时发生错误，请重试",
        variant: "destructive",
      })
    }
  }

  // 获取活动的参与成员
  const getActivityMembers = (activity: any) => {
    return ActivityJoinAPI.data.filter((join) => join.activity.id === activity.id).map((join) => join.member)
  }

  // 获取支部成员
  const getBranchMembers = (branch: any) => {
    return MemberAPI.data.filter((member) => member.branch.id === branch.id)
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
                <Input
                  id="title"
                  placeholder="请输入活动标题"
                  value={newActivity.title}
                  onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>活动时间</Label>
                <DateRangePicker
                  startDate={newActivity.startTime}
                  endDate={newActivity.endTime}
                  setStartDate={(date) => setNewActivity({ ...newActivity, startTime: date })}
                  setEndDate={(date) => setNewActivity({ ...newActivity, endTime: date })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">活动地点</Label>
                  <Input
                    id="location"
                    placeholder="请输入活动地点"
                    value={newActivity.location}
                    onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">活动类型</Label>
                  <Select
                    value={newActivity.type}
                    onValueChange={(value) => setNewActivity({ ...newActivity, type: value })}
                  >
                    <SelectTrigger>
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
              </div>
              <div className="space-y-2">
                <Label htmlFor="branch">负责支部</Label>
                <Select
                  value={String(newActivity.branch.id)}
                  onValueChange={(value) => {
                    const branch = BranchAPI.data.find((b) => b.id === Number(value))
                    if (branch) {
                      setNewActivity({ ...newActivity, branch })
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择支部" />
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
              <div className="space-y-2">
                <Label htmlFor="content">活动内容</Label>
                <Textarea
                  id="content"
                  placeholder="请输入活动内容"
                  className="min-h-[100px]"
                  value={newActivity.content}
                  onChange={(e) => setNewActivity({ ...newActivity, content: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="remark">备注</Label>
                <Textarea
                  id="remark"
                  placeholder="请输入备注信息"
                  value={newActivity.remark}
                  onChange={(e) => setNewActivity({ ...newActivity, remark: e.target.value })}
                />
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
            {loading ? (
              <div className="text-center py-8">加载中...</div>
            ) : allActivities.length > 0 ? (
              allActivities.map((activity) => (
                <Card key={activity.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>{activity.title}</CardTitle>
                      <Badge variant={isComplete(activity) ? "outline" : "secondary"}>
                        {isComplete(activity) ? "已完成" : "进行中"}
                      </Badge>
                    </div>
                    <CardDescription>
                      <div className="flex flex-wrap gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{getDateTimeParts(activity.startTime)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{getDayTimeParts(activity.startTime)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{activity.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {isComplete(activity)
                              ? `${getActivityMembers(activity).length}/${getBranchMembers(activity.branch).length}人参加`
                              : `预计${getBranchMembers(activity.branch).length}人参加`}
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
                          <Button variant="outline" size="sm" onClick={() => handleOpenMemberDialog(activity)}>
                            <UserCheck className="mr-2 h-4 w-4" />
                            党员出席
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedActivity(activity)
                              setIsEditDialogOpen(true)
                            }}
                          >
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
                      {activity.remark && (
                        <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                          <p>备注: {activity.remark}</p>
                        </div>
                      )}
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
            {loading ? (
              <div className="text-center py-8">加载中...</div>
            ) : upcomingActivities.length > 0 ? (
              upcomingActivities.map((activity) => (
                <Card key={activity.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>{activity.title}</CardTitle>
                      <Badge variant="secondary">{isComplete(activity) ? "已完成" : "未开始"}</Badge>
                    </div>
                    <CardDescription>
                      <div className="flex flex-wrap gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{getDateTimeParts(activity.startTime)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{getDayTimeParts(activity.startTime)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{activity.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>预计{getBranchMembers(activity.branch).length}人参加</span>
                        </div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge>{activity.type}</Badge>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleOpenMemberDialog(activity)}>
                            <UserCheck className="mr-2 h-4 w-4" />
                            党员出席
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedActivity(activity)
                              setIsEditDialogOpen(true)
                            }}
                          >
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
                      {activity.remark && (
                        <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                          <p>备注: {activity.remark}</p>
                        </div>
                      )}
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
            {loading ? (
              <div className="text-center py-8">加载中...</div>
            ) : completedActivities.length > 0 ? (
              completedActivities.map((activity) => (
                <Card key={activity.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>{activity.title}</CardTitle>
                      <Badge variant="outline">{isComplete(activity) ? "已完成" : "未开始"}</Badge>
                    </div>
                    <CardDescription>
                      <div className="flex flex-wrap gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{getDateTimeParts(activity.startTime)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{getDayTimeParts(activity.startTime)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{activity.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {getActivityMembers(activity).length}/{getBranchMembers(activity.branch).length}人参加
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
                          <Button variant="outline" size="sm" onClick={() => handleOpenMemberDialog(activity)}>
                            <UserCheck className="mr-2 h-4 w-4" />
                            党员出席
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedActivity(activity)
                              setIsEditDialogOpen(true)
                            }}
                          >
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
                      {activity.remark && (
                        <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                          <p>备注: {activity.remark}</p>
                        </div>
                      )}
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

      {/* 编辑活动对话框 */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>编辑活动</DialogTitle>
            <DialogDescription>编辑活动信息</DialogDescription>
          </DialogHeader>
          {selectedActivity && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">活动标题</Label>
                <Input
                  id="edit-title"
                  value={selectedActivity.title}
                  onChange={(e) => setSelectedActivity({ ...selectedActivity, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>活动时间</Label>
                <DateRangePicker
                  startDate={selectedActivity.startTime}
                  endDate={selectedActivity.endTime}
                  setStartDate={(date) => setSelectedActivity({ ...selectedActivity, startTime: date })}
                  setEndDate={(date) => setSelectedActivity({ ...selectedActivity, endTime: date })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-location">活动地点</Label>
                  <Input
                    id="edit-location"
                    value={selectedActivity.location}
                    onChange={(e) => setSelectedActivity({ ...selectedActivity, location: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">活动类型</Label>
                  <Select
                    value={selectedActivity.type}
                    onValueChange={(value) => setSelectedActivity({ ...selectedActivity, type: value })}
                  >
                    <SelectTrigger>
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
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">活动状态</Label>
                  <Select
                    value={selectedActivity.status}
                    onValueChange={(value) => setSelectedActivity({ ...selectedActivity, status: value })}
                  >
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
                  <Input
                    id="edit-participants"
                    type="number"
                    value={selectedActivity.participants}
                    onChange={(e) => setSelectedActivity({ ...selectedActivity, participants: Number(e.target.value) })}
                    disabled
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-content">活动内容</Label>
                <Textarea
                  id="edit-content"
                  value={selectedActivity.content}
                  onChange={(e) => setSelectedActivity({ ...selectedActivity, content: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-remark">备注</Label>
                <Textarea
                  id="edit-remark"
                  value={selectedActivity.remark}
                  onChange={(e) => setSelectedActivity({ ...selectedActivity, remark: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleEditActivity}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 党员出席情况对话框 */}
      <MemberAttendanceDialog
        open={isMemberDialogOpen}
        onOpenChangeAction={setIsMemberDialogOpen}
        activityId={selectedActivity?.id}
        onSaveAction={handleSaveMemberAttendance}
      />
    </div>
  )
}
