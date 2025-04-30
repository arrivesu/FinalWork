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

// 模拟发展对象数据
const candidates = [
  {
    id: "1",
    name: "王五",
    avatar: "/placeholder.svg?key=d4zqg",
    studentId: "2020010101",
    class: "计算机科学与技术2001班",
    activistDate: "2021-09-15",
    candidateDate: "2022-03-10",
    status: "培养中",
  },
  {
    id: "2",
    name: "赵六",
    avatar: "/placeholder.svg?key=xxanz",
    studentId: "2020010102",
    class: "计算机科学与技术2001班",
    activistDate: "2021-09-20",
    candidateDate: "2022-03-15",
    status: "培养中",
  },
  {
    id: "3",
    name: "钱七",
    avatar: "/placeholder.svg?key=9o9wr",
    studentId: "2020010103",
    class: "计算机科学与技术2001班",
    activistDate: "2021-10-05",
    candidateDate: "2022-04-10",
    status: "培养结束",
  },
  {
    id: "4",
    name: "孙八",
    avatar: "/placeholder.svg?key=pqxtu",
    studentId: "2020010104",
    class: "计算机科学与技术2001班",
    activistDate: "2021-10-10",
    candidateDate: "2022-04-15",
    status: "培养结束",
  },
]

export default function CandidatesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isPromoteDialogOpen, setIsPromoteDialogOpen] = useState(false)
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([])
  const { toast } = useToast()

  // 过滤发展对象
  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.studentId.includes(searchTerm) ||
      candidate.class.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddCandidate = () => {
    setIsAddDialogOpen(false)
    toast({
      title: "添加成功",
      description: "发展对象信息已成功添加",
    })
  }

  const handlePromote = () => {
    setIsPromoteDialogOpen(false)
    toast({
      title: "转为预备党员成功",
      description: `已将 ${selectedCandidates.length} 名发展对象转为预备党员`,
    })
    setSelectedCandidates([])
  }

  const handleDeleteCandidate = (candidate: any) => {
    toast({
      title: "删除成功",
      description: `发展对象 ${candidate.name} 已成功删除`,
    })
  }

  const toggleSelectCandidate = (id: string) => {
    setSelectedCandidates((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">发展对象</h1>
          <p className="text-muted-foreground">管理发展对象信息</p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={isPromoteDialogOpen} onOpenChange={setIsPromoteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" disabled={selectedCandidates.length === 0}>
                <ArrowRight className="mr-2 h-4 w-4" />
                转为预备党员
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>转为预备党员</DialogTitle>
                <DialogDescription>确认将选中的 {selectedCandidates.length} 名发展对象转为预备党员？</DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p>选中的发展对象：</p>
                <ul className="mt-2 space-y-1">
                  {selectedCandidates.map((id) => {
                    const candidate = candidates.find((a) => a.id === id)
                    return (
                      <li key={id} className="text-sm">
                        {candidate?.name} - {candidate?.studentId}
                      </li>
                    )
                  })}
                </ul>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsPromoteDialogOpen(false)}>
                  取消
                </Button>
                <Button onClick={handlePromote}>确认转为预备党员</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                添加发展对象
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>添加发展对象</DialogTitle>
                <DialogDescription>添加新的发展对象信息</DialogDescription>
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
                    <Label htmlFor="activist-date">确定为积极分子日期</Label>
                    <Input id="activist-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="candidate-date">确定为发展对象日期</Label>
                    <Input id="candidate-date" type="date" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact">联系方式</Label>
                    <Input id="contact" placeholder="请输入联系方式" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">状态</Label>
                    <Select defaultValue="培养中">
                      <SelectTrigger>
                        <SelectValue placeholder="选择状态" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="培养中">培养中</SelectItem>
                        <SelectItem value="培养结束">培养结束</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="note">备注</Label>
                  <Textarea id="note" placeholder="请输入备注信息" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  取消
                </Button>
                <Button onClick={handleAddCandidate}>添加</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="搜索发展对象姓名、学号或班级..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>发展对象列表</CardTitle>
          <CardDescription>共 {filteredCandidates.length} 名发展对象</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {filteredCandidates.length > 0 ? (
              filteredCandidates.map((candidate) => (
                <div key={candidate.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Checkbox
                      checked={selectedCandidates.includes(candidate.id)}
                      onCheckedChange={() => toggleSelectCandidate(candidate.id)}
                    />
                    <Avatar>
                      <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                      <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{candidate.name}</p>
                      <p className="text-sm text-muted-foreground">{candidate.studentId}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-right">
                      <p>{candidate.class}</p>
                      <p className="text-muted-foreground">确定为发展对象日期: {candidate.candidateDate}</p>
                    </div>
                    <Badge variant={candidate.status === "培养中" ? "secondary" : "outline"}>{candidate.status}</Badge>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteCandidate(candidate)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-muted-foreground">未找到符合条件的发展对象</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
