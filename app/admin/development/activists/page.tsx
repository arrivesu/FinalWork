"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Plus, Edit, Trash2, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// 模拟入党积极分子数据
const activists = [
  {
    id: "1",
    name: "刘一",
    gender: "男",
    ethnicity: "汉族",
    avatar: "/placeholder.svg?key=dbl1t",
    studentId: "2021010101",
    class: "计算机科学与技术2101班",
    applyDate: "2022-09-15",
    activistDate: "2022-12-10",
    status: "培养中",
    contact: "13800138001",
  },
  {
    id: "2",
    name: "陈二",
    gender: "女",
    ethnicity: "汉族",
    avatar: "/placeholder.svg?key=wbexc",
    studentId: "2021010102",
    class: "计算机科学与技术2101班",
    applyDate: "2022-09-20",
    activistDate: "2022-12-15",
    status: "培养中",
    contact: "13800138002",
  },
  {
    id: "3",
    name: "张三",
    gender: "男",
    ethnicity: "回族",
    avatar: "/placeholder.svg?key=d4zqg",
    studentId: "2021010103",
    class: "计算机科学与技术2101班",
    applyDate: "2022-10-05",
    activistDate: "2023-01-10",
    status: "培养中",
    contact: "13800138003",
  },
  {
    id: "4",
    name: "李四",
    gender: "女",
    ethnicity: "维吾尔族",
    avatar: "/placeholder.svg?key=xxanz",
    studentId: "2021010104",
    class: "计算机科学与技术2101班",
    applyDate: "2022-10-10",
    activistDate: "2023-01-15",
    status: "培养结束",
    contact: "13800138004",
  },
]

export default function ActivistsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isPromoteDialogOpen, setIsPromoteDialogOpen] = useState(false)
  const [selectedActivists, setSelectedActivists] = useState<string[]>([])
  const { toast } = useToast()

  // 过滤积极分子
  const filteredActivists = activists.filter(
      (activist) =>
          activist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activist.studentId.includes(searchTerm) ||
          activist.class.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddActivist = () => {
    setIsAddDialogOpen(false)
    toast({
      title: "添加成功",
      description: "入党积极分子信息已成功添加",
    })
  }

  const handlePromote = () => {
    setIsPromoteDialogOpen(false)
    toast({
      title: "转为发展对象成功",
      description: `已将 ${selectedActivists.length} 名入党积极分子转为发展对象`,
    })
    setSelectedActivists([])
  }

  const handleDeleteActivist = (activist: any) => {
    toast({
      title: "删除成功",
      description: `入党积极分子 ${activist.name} 已成功删除`,
    })
  }

  const toggleSelectActivist = (id: string) => {
    setSelectedActivists((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">入党积极分子</h1>
            <p className="text-muted-foreground">管理入党积极分子信息</p>
          </div>
          <div className="flex space-x-2">
            <Dialog open={isPromoteDialogOpen} onOpenChange={setIsPromoteDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" disabled={selectedActivists.length === 0}>
                  <ArrowRight className="mr-2 h-4 w-4" />
                  转为发展对象
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>转为发展对象</DialogTitle>
                  <DialogDescription>
                    确认将选中的 {selectedActivists.length} 名入党积极分子转为发展对象？
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p>选中的入党积极分子：</p>
                  <ul className="mt-2 space-y-1">
                    {selectedActivists.map((id) => {
                      const activist = activists.find((a) => a.id === id)
                      return (
                          <li key={id} className="text-sm">
                            {activist?.name} - {activist?.studentId}
                          </li>
                      )
                    })}
                  </ul>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsPromoteDialogOpen(false)}>
                    取消
                  </Button>
                  <Button onClick={handlePromote}>确认转为发展对象</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  添加积极分子
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>添加入党积极分子</DialogTitle>
                  <DialogDescription>添加新的入党积极分子信息</DialogDescription>
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
                      <Label htmlFor="ethnicity">民族</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="选择民族" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="汉族">汉族</SelectItem>
                          <SelectItem value="回族">回族</SelectItem>
                          <SelectItem value="维吾尔族">维吾尔族</SelectItem>
                          <SelectItem value="藏族">藏族</SelectItem>
                          <SelectItem value="蒙古族">蒙古族</SelectItem>
                          <SelectItem value="其他">其他</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact">联系方式</Label>
                      <Input id="contact" placeholder="请输入联系方式" />
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
                      <Label htmlFor="activist-date">确定为积极分子日期</Label>
                      <Input id="activist-date" type="date" />
                    </div>
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
                  <div className="space-y-2">
                    <Label htmlFor="note">备注</Label>
                    <Textarea id="note" placeholder="请输入备注信息" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    取消
                  </Button>
                  <Button onClick={handleAddActivist}>添加</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
              type="search"
              placeholder="搜索积极分子姓名、学号或班级..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>入党积极分子列表</CardTitle>
            <CardDescription>共 {filteredActivists.length} 名入党积极分子</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12 text-center">
                      <Checkbox
                          checked={selectedActivists.length === filteredActivists.length && filteredActivists.length > 0}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedActivists(filteredActivists.map((a) => a.id))
                            } else {
                              setSelectedActivists([])
                            }
                          }}
                          aria-label="Select all"
                      />
                    </TableHead>
                    <TableHead className="text-center">姓名</TableHead>
                    <TableHead className="text-center">性别</TableHead>
                    <TableHead className="text-center">民族</TableHead>
                    <TableHead className="text-center">学号</TableHead>
                    <TableHead className="text-center">班级</TableHead>
                    <TableHead className="text-center">确定为积极分子日期</TableHead>
                    <TableHead className="text-center">联系方式</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredActivists.length > 0 ? (
                      filteredActivists.map((activist) => (
                          <TableRow key={activist.id}>
                            <TableCell className="text-center">
                              <Checkbox
                                  checked={selectedActivists.includes(activist.id)}
                                  onCheckedChange={() => toggleSelectActivist(activist.id)}
                                  aria-label={`Select ${activist.name}`}
                              />
                            </TableCell>
                            <TableCell className="text-center">{activist.name}</TableCell>
                            <TableCell className="text-center">{activist.gender}</TableCell>
                            <TableCell className="text-center">{activist.ethnicity}</TableCell>
                            <TableCell className="text-center">{activist.studentId}</TableCell>
                            <TableCell className="text-center">{activist.class}</TableCell>
                            <TableCell className="text-center">{activist.activistDate}</TableCell>
                            <TableCell className="text-center">{activist.contact}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteActivist(activist)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                      ))
                  ) : (
                      <TableRow>
                        <TableCell colSpan={9} className="h-24 text-center">
                          未找到符合条件的入党积极分子
                        </TableCell>
                      </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
