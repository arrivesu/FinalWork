"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Plus, Edit, Trash2, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// 模拟入党申请人数据
const applicants = [
  {
    id: "1",
    name: "刘一",
    avatar: "/placeholder.svg?key=dbl1t",
    studentId: "2021010101",
    class: "计算机科学与技术2101班",
    applyDate: "2022-09-15",
    status: "已审核",
  },
  {
    id: "2",
    name: "陈二",
    avatar: "/placeholder.svg?key=wbexc",
    studentId: "2021010102",
    class: "计算机科学与技术2101班",
    applyDate: "2022-09-20",
    status: "已审核",
  },
  {
    id: "3",
    name: "张三",
    avatar: "/placeholder.svg?key=d4zqg",
    studentId: "2021010103",
    class: "计算机科学与技术2101班",
    applyDate: "2022-10-05",
    status: "待审核",
  },
  {
    id: "4",
    name: "李四",
    avatar: "/placeholder.svg?key=xxanz",
    studentId: "2021010104",
    class: "计算机科学与技术2101班",
    applyDate: "2022-10-10",
    status: "待审核",
  },
]

export default function ApplicantsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isPromoteDialogOpen, setIsPromoteDialogOpen] = useState(false)
  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([])
  const { toast } = useToast()

  // 过滤申请人
  const filteredApplicants = applicants.filter(
    (applicant) =>
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.studentId.includes(searchTerm) ||
      applicant.class.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddApplicant = () => {
    setIsAddDialogOpen(false)
    toast({
      title: "添加成功",
      description: "入党申请人信息已成功添加",
    })
  }

  const handlePromote = () => {
    setIsPromoteDialogOpen(false)
    toast({
      title: "转为入党积极分子成功",
      description: `已将 ${selectedApplicants.length} 名入党申请人转为入党积极分子`,
    })
    setSelectedApplicants([])
  }

  const handleDeleteApplicant = (applicant: any) => {
    toast({
      title: "删除成功",
      description: `入党申请人 ${applicant.name} 已成功删除`,
    })
  }

  const toggleSelectApplicant = (id: string) => {
    setSelectedApplicants((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">入党申请人</h1>
          <p className="text-muted-foreground">管理入党申请人信息</p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={isPromoteDialogOpen} onOpenChange={setIsPromoteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" disabled={selectedApplicants.length === 0}>
                <ArrowRight className="mr-2 h-4 w-4" />
                转为入党积极分子
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>转为入党积极分子</DialogTitle>
                <DialogDescription>
                  确认将选中的 {selectedApplicants.length} 名入党申请人转为入党积极分子？
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p>选中的入党申请人：</p>
                <ul className="mt-2 space-y-1">
                  {selectedApplicants.map((id) => {
                    const applicant = applicants.find((a) => a.id === id)
                    return (
                      <li key={id} className="text-sm">
                        {applicant?.name} - {applicant?.studentId}
                      </li>
                    )
                  })}
                </ul>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsPromoteDialogOpen(false)}>
                  取消
                </Button>
                <Button onClick={handlePromote}>确认转为入党积极分子</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                添加申请人
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>添加入党申请人</DialogTitle>
                <DialogDescription>添加新的入党申请人信息</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">姓名</Label>
                    <Input id="name" placeholder="请输入姓名" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">性别</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择性别" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">男</SelectItem>
                        <SelectItem value="female">女</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-id">学号</Label>
                    <Input id="student-id" placeholder="请输入学号" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="class">班级</Label>
                    <Input id="class" placeholder="请输入班级" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="apply-date">申请日期</Label>
                    <Input id="apply-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact">联系方式</Label>
                    <Input id="contact" placeholder="请输入联系方式" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reason">入党动机</Label>
                  <Textarea id="reason" placeholder="请输入入党动机" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  取消
                </Button>
                <Button onClick={handleAddApplicant}>添加</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="搜索申请人姓名、学号或班级..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>入党申请人列表</CardTitle>
          <CardDescription>共 {filteredApplicants.length} 名入党申请人</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {filteredApplicants.length > 0 ? (
              filteredApplicants.map((applicant) => (
                <div key={applicant.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Checkbox
                      checked={selectedApplicants.includes(applicant.id)}
                      onCheckedChange={() => toggleSelectApplicant(applicant.id)}
                    />
                    <Avatar>
                      <AvatarImage src={applicant.avatar || "/placeholder.svg"} alt={applicant.name} />
                      <AvatarFallback>{applicant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{applicant.name}</p>
                      <p className="text-sm text-muted-foreground">{applicant.studentId}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-right">
                      <p>申请日期: {applicant.applyDate}</p>
                      <p>{applicant.class}</p>
                    </div>
                    <Badge variant={applicant.status === "已审核" ? "outline" : "secondary"}>{applicant.status}</Badge>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteApplicant(applicant)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-muted-foreground">未找到符合条件的入党申请人</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
