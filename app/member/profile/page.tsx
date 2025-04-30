"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  name: string
  role: string
  avatar: string
}

export default function MemberProfile() {
  const [user, setUser] = useState<User | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleSave = () => {
    toast({
      title: "保存成功",
      description: "个人信息已更新",
    })
  }

  if (!user) return null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">个人中心</h1>
        <p className="text-muted-foreground">查看和管理您的个人信息</p>
      </div>

      <Tabs defaultValue="basic">
        <TabsList>
          <TabsTrigger value="basic">基本信息</TabsTrigger>
          <TabsTrigger value="portrait">党员画像</TabsTrigger>
          <TabsTrigger value="archive">电子档案</TabsTrigger>
        </TabsList>
        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>个人信息</CardTitle>
              <CardDescription>查看和更新您的个人信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4 flex flex-col items-center space-y-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    更换头像
                  </Button>
                </div>
                <div className="md:w-3/4 grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">姓名</Label>
                    <Input id="name" defaultValue={user.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">性别</Label>
                    <Select defaultValue="male">
                      <SelectTrigger>
                        <SelectValue placeholder="选择性别" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">男</SelectItem>
                        <SelectItem value="female">女</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birth">出生日期</Label>
                    <Input id="birth" type="date" defaultValue="1995-01-01" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-id">学号</Label>
                    <Input id="student-id" defaultValue="2019123456" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="class">班级</Label>
                    <Input id="class" defaultValue="计算机科学与技术1901班" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="join-date">入党时间</Label>
                    <Input id="join-date" type="date" defaultValue="2021-02-15" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">党内职务</Label>
                    <Select defaultValue="member">
                      <SelectTrigger>
                        <SelectValue placeholder="选择党内职务" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="secretary">党支部书记</SelectItem>
                        <SelectItem value="committee">党支部委员</SelectItem>
                        <SelectItem value="member">普通党员</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="identity">身份类型</Label>
                    <Select defaultValue="formal">
                      <SelectTrigger>
                        <SelectValue placeholder="选择身份类型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="formal">正式党员</SelectItem>
                        <SelectItem value="probationary">预备党员</SelectItem>
                        <SelectItem value="candidate">发展对象</SelectItem>
                        <SelectItem value="activist">入党积极分子</SelectItem>
                        <SelectItem value="applicant">入党申请人</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">联系方式</Label>
                    <Input id="phone" defaultValue="13800138000" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">个人简介</Label>
                <Textarea
                  id="bio"
                  placeholder="请输入个人简介"
                  defaultValue="我是一名计算机科学与技术专业的学生，也是一名党员。我热爱编程，希望通过自己的技术为社会做出贡献。"
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave}>保存更改</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="portrait">
          <Card>
            <CardHeader>
              <CardTitle>党员画像</CardTitle>
              <CardDescription>查看您的党员画像数据</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <div className="aspect-square relative">
                    {/* 使用雷达图展示党员画像 */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-muted-foreground">2023-2024学年第一学期</p>
                        <p className="text-lg font-bold mt-2">综合评分：92分</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 space-y-4">
                  <h3 className="font-medium">画像指标详情</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>德育表现</span>
                      <span className="font-medium">优秀</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>学业成绩</span>
                      <span className="font-medium">良好</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>学生干部任职</span>
                      <span className="font-medium">班长</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>寝室卫生</span>
                      <span className="font-medium">95分</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>群众评价</span>
                      <span className="font-medium">90分</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="archive">
          <Card>
            <CardHeader>
              <CardTitle>电子档案</CardTitle>
              <CardDescription>查看您的电子档案记录</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium">入党申请书</h3>
                  <p className="text-sm text-muted-foreground mt-1">提交时间：2020-09-15</p>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline">
                      查看
                    </Button>
                    <Button size="sm" variant="outline">
                      下载
                    </Button>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium">思想汇报</h3>
                  <p className="text-sm text-muted-foreground mt-1">提交时间：2020-12-10</p>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline">
                      查看
                    </Button>
                    <Button size="sm" variant="outline">
                      下载
                    </Button>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium">预备党员转正申请书</h3>
                  <p className="text-sm text-muted-foreground mt-1">提交时间：2022-02-10</p>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline">
                      查看
                    </Button>
                    <Button size="sm" variant="outline">
                      下载
                    </Button>
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
