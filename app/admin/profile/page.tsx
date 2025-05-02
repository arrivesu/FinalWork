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

export default function AdminProfile() {
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
          <TabsTrigger value="security">安全设置</TabsTrigger>
          <TabsTrigger value="notification">通知设置</TabsTrigger>
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
                    <Input id="birth" type="date" defaultValue="1985-01-01" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employee-id">工号</Label>
                    <Input id="employee-id" defaultValue="20150101" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">所属党支部</Label>
                    <Input id="department" defaultValue="数据学生党支部" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="join-date">入党时间</Label>
                    <Input id="join-date" type="date" defaultValue="2010-07-01" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">党内职务</Label>
                    <Select defaultValue="secretary">
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
                    <Label htmlFor="phone">联系方式</Label>
                    <Input id="phone" defaultValue="13800138000" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">备注</Label>
                <Textarea
                  id="bio"
                  placeholder="请输入备注事项"
                  defaultValue="党支部书记负责党--支部的日常工作和党员管理。"
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave}>保存更改</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>安全设置</CardTitle>
              <CardDescription>管理您的账号安全设置</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">修改密码</h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">当前密码</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">新密码</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">确认新密码</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                <Button onClick={() => toast({ title: "密码已更新", description: "您的密码已成功修改" })}>
                  更新密码
                </Button>
              </div>
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-lg font-medium">登录设备</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Windows PC - Chrome</p>
                      <p className="text-sm text-muted-foreground">上次登录: 今天 10:30</p>
                      <p className="text-sm text-muted-foreground">IP: 192.168.1.1</p>
                    </div>
                    <Button variant="outline" size="sm">
                      当前设备
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">iPhone - Safari</p>
                      <p className="text-sm text-muted-foreground">上次登录: 昨天 18:45</p>
                      <p className="text-sm text-muted-foreground">IP: 192.168.1.2</p>
                    </div>
                    <Button variant="outline" size="sm">
                      退出登录
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notification">
          <Card>
            <CardHeader>
              <CardTitle>通知设置</CardTitle>
              <CardDescription>管理您的通知偏好设置</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">系统通知</h3>
                    <p className="text-sm text-muted-foreground">接收系统更新和维护通知</p>
                  </div>
                  <Button variant="outline" size="sm">
                    已开启
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">活动提醒</h3>
                    <p className="text-sm text-muted-foreground">接收即将开始的活动提醒</p>
                  </div>
                  <Button variant="outline" size="sm">
                    已开启
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">会议通知</h3>
                    <p className="text-sm text-muted-foreground">接收会议安排和变更通知</p>
                  </div>
                  <Button variant="outline" size="sm">
                    已开启
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">党员发展通知</h3>
                    <p className="text-sm text-muted-foreground">接收党员发展相关通知</p>
                  </div>
                  <Button variant="outline" size="sm">
                    已开启
                  </Button>
                </div>
              </div>
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-lg font-medium">通知方式</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">站内通知</h3>
                      <p className="text-sm text-muted-foreground">在系统内接收通知</p>
                    </div>
                    <Button variant="outline" size="sm">
                      已开启
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">邮件通知</h3>
                      <p className="text-sm text-muted-foreground">通过邮件接收通知</p>
                    </div>
                    <Button variant="outline" size="sm">
                      已开启
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">短信通知</h3>
                      <p className="text-sm text-muted-foreground">通过短信接收通知</p>
                    </div>
                    <Button variant="outline" size="sm">
                      未开启
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => toast({ title: "设置已保存", description: "您的通知设置已更新" })}>
                保存设置
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
