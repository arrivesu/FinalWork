"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

// 模拟党员数据
const members = [
  {
    id: "1",
    name: "张三",
    avatar: "/placeholder.svg?key=qdszg",
    position: "党支部书记",
    identity: "正式党员",
    joinDate: "2015-06-15",
    department: "计算机科学与技术学院",
  },
  {
    id: "2",
    name: "李四",
    avatar: "/placeholder.svg?key=n3fup",
    position: "组织委员",
    identity: "正式党员",
    joinDate: "2016-09-20",
    department: "计算机科学与技术学院",
  },
  {
    id: "3",
    name: "王五",
    avatar: "/placeholder.svg?key=g1vak",
    position: "宣传委员",
    identity: "正式党员",
    joinDate: "2017-03-10",
    department: "计算机科学与技术学院",
  },
  {
    id: "4",
    name: "赵六",
    avatar: "/placeholder.svg?key=d22yx",
    position: "普通党员",
    identity: "正式党员",
    joinDate: "2018-05-22",
    department: "计算机科学与技术学院",
  },
  {
    id: "5",
    name: "钱七",
    avatar: "/placeholder.svg?key=lud82",
    position: "普通党员",
    identity: "预备党员",
    joinDate: "2022-11-05",
    department: "计算机科学与技术学院",
  },
  {
    id: "6",
    name: "孙八",
    avatar: "/placeholder.svg?key=58qcx",
    position: "普通党员",
    identity: "预备党员",
    joinDate: "2023-01-18",
    department: "计算机科学与技术学院",
  },
  {
    id: "7",
    name: "周九",
    avatar: "/placeholder.svg?key=h3oyi",
    position: "普通党员",
    identity: "已毕业党员",
    joinDate: "2019-06-30",
    department: "计算机科学与技术学院",
  },
]

export default function OrganizationMembers() {
  const [searchTerm, setSearchTerm] = useState("")

  // 过滤党员
  const filterMembers = (identity: string) => {
    return members
      .filter((member) => member.identity === identity)
      .filter(
        (member) =>
          member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.position.toLowerCase().includes(searchTerm.toLowerCase()),
      )
  }

  const formalMembers = filterMembers("正式党员")
  const probationaryMembers = filterMembers("预备党员")
  const graduatedMembers = filterMembers("已毕业党员")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">组织成员-党员</h1>
        <p className="text-muted-foreground">查看党支部所有党员信息</p>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="搜索党员姓名或职务..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="formal">
        <TabsList>
          <TabsTrigger value="formal">正式党员</TabsTrigger>
          <TabsTrigger value="probationary">预备党员</TabsTrigger>
          <TabsTrigger value="graduated">已毕业党员</TabsTrigger>
        </TabsList>
        <TabsContent value="formal">
          <Card>
            <CardHeader>
              <CardTitle>正式党员</CardTitle>
              <CardDescription>已转为正式党员的成员列表，共 {formalMembers.length} 人</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {formalMembers.length > 0 ? (
                  formalMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.position}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-right">
                          <p>入党时间: {member.joinDate}</p>
                          <p>{member.department}</p>
                        </div>
                        <Badge variant="outline">{member.identity}</Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">未找到符合条件的党员</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="probationary">
          <Card>
            <CardHeader>
              <CardTitle>预备党员</CardTitle>
              <CardDescription>处于预备期的党员列表，共 {probationaryMembers.length} 人</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {probationaryMembers.length > 0 ? (
                  probationaryMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.position}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-right">
                          <p>入党时间: {member.joinDate}</p>
                          <p>{member.department}</p>
                        </div>
                        <Badge variant="outline">{member.identity}</Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">未找到符合条件的党员</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="graduated">
          <Card>
            <CardHeader>
              <CardTitle>已毕业党员</CardTitle>
              <CardDescription>已毕业的党员列表，共 {graduatedMembers.length} 人</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {graduatedMembers.length > 0 ? (
                  graduatedMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.position}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-right">
                          <p>入党时间: {member.joinDate}</p>
                          <p>{member.department}</p>
                        </div>
                        <Badge variant="outline">{member.identity}</Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">未找到符合条件的党员</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
