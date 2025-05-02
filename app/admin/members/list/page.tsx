"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, FileText, Download, UserPlus, MoreHorizontal } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// 党员身份类型
const identityTypes = ["已毕业党员", "正式党员", "预备党员", "发展对象", "入党积极分子", "入党申请人"]

// 党内职务
const partyPositions = ["党支部书记", "党支部委员", "普通党员"]

// 模拟党员数据
const members = Array.from({ length: 10 }).map((_, i) => ({
  id: `M${2023000 + i}`,
  name: `党员${i + 1}`,
  gender: i % 2 === 0 ? "男" : "女",
  birthDate: `${1990 + Math.floor(i / 3)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
  studentId: `2023${String(10000 + i).slice(1)}`,
  className: `计算机科学${Math.floor(i / 3) + 1}班`,
  joinDate: `${2020 + Math.floor(i / 4)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
  position: partyPositions[i % 3],
  identityType: identityTypes[i % 6],
  contact: `1381234${String(5678 + i)}`,
  hasArchive: i % 3 === 0,
}))

export default function MembersList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<any>(null)
  const { toast } = useToast()

  // 过滤党员
  const filterMembers = (identity: string) => {
    return members
      .filter((member) => member.identityType === identity)
      .filter(
        (member) =>
          member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.studentId.toLowerCase().includes(searchTerm.toLowerCase()),
      )
  }

  const formalMembers = filterMembers("正式党员")
  const probationaryMembers = filterMembers("预备党员")
  const graduatedMembers = filterMembers("已毕业党员")

  const handleAddMember = () => {
    setIsAddDialogOpen(false)
    toast({
      title: "添加成功",
      description: "党员信息已成功添加",
    })
  }

  const handleEditMember = () => {
    setIsEditDialogOpen(false)
    toast({
      title: "修改成功",
      description: "党员信息已成功更新",
    })
  }

  const handleDeleteMember = (member: any) => {
    toast({
      title: "删除成功",
      description: `党员 ${member.name} 已成功删除`,
    })
  }

  const handleViewArchive = (member: any) => {
    toast({
      title: "查看档案",
      description: `正在查看 ${member.name} 的电子档案`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">党员名册</h1>
          <p className="text-muted-foreground">管理党支部所有党员信息</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            添加党员
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            导出名册
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="搜索党员..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>


      <Card >
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">

            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>用户编号</TableHead>
                  <TableHead>姓名</TableHead>
                  <TableHead>性别</TableHead>
                  <TableHead>出生日期</TableHead>
                  <TableHead>学号</TableHead>
                  <TableHead>班级</TableHead>
                  <TableHead>入党时间</TableHead>
                  <TableHead>党内职务</TableHead>
                  <TableHead>身份类型</TableHead>
                  <TableHead>联系方式</TableHead>
                  <TableHead>电子档案</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>{member.id}</TableCell>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.gender}</TableCell>
                    <TableCell>{member.birthDate}</TableCell>
                    <TableCell>{member.studentId}</TableCell>
                    <TableCell>{member.className}</TableCell>
                    <TableCell>{member.joinDate}</TableCell>
                    <TableCell>{member.position}</TableCell>
                    <TableCell>{member.identityType}</TableCell>
                    <TableCell>{member.contact}</TableCell>
                    <TableCell>
                      {member.hasArchive ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleViewArchive(member)}
                          disabled={!member.hasArchive}
                          title={member.hasArchive ? "查看电子档案" : "无电子档案"}
                        >
                          <FileText className="h-4 w-4" />
                          <span className="sr-only">查看档案</span>
                        </Button>
                      ) : (
                        <span className="text-muted-foreground">无</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">打开菜单</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>操作</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>查看详情</DropdownMenuItem>
                          <DropdownMenuItem>编辑信息</DropdownMenuItem>
                          <DropdownMenuItem>上传档案</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteMember(member)}>
                            删除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
