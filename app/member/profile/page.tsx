"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { RadarChart, type RadarChartData } from "@/components/ui/radar-chart"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  name: string
  role: string
  avatar: string
}

export default function MemberProfile() {
  const [user, setUser] = useState<User | null>(null)
  const [selectedTerm, setSelectedTerm] = useState("2023-1")
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

  const getComparisonRadarData = (): RadarChartData => {
    const avgScores = {
      ideologicalAwareness: 78,
      partyDiscipline: 85,
      workPerformance: 90,
      learningAttitude: 75,
      socialContribution: 82,
      teamworkSpirit: 80,
    }

    return {
      labels: [
        "思想锋领指数", // Ideological Awareness
        "学业锋领指数", // Party Discipline
        "服务锋领指数", // Work Performance
        "作风锋领指数", // Learning Attitude
        "群众锋领指数", // Social Contribution
      ],
      datasets: [
        {
          label: "我的画像",
          data: [
            avgScores.ideologicalAwareness,
            avgScores.partyDiscipline,
            avgScores.workPerformance,
            avgScores.learningAttitude,
            avgScores.socialContribution,
          ],
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 2,
        },
      ],
    }
  }

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
                    <AvatarFallback>{user.name.substring(user.name.length - 2)}</AvatarFallback>
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
                    <Input id="birth" type="date" defaultValue="2003-03-25" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="class">民族</Label>
                    <Input id="class" defaultValue="汉族" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-id">学号</Label>
                    <Input id="student-id" defaultValue="3210439012" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="class">班级</Label>
                    <Input id="class" defaultValue="大数据212班" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="join-date">入党时间</Label>
                    <Input id="join-date" type="date" defaultValue="2023-08-30" />
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
                    <Input id="phone" defaultValue="13876543210" />
                  </div>
                </div>
              </div>
              {/*<div className="space-y-2">*/}
              {/*  <Label htmlFor="bio">个人简介</Label>*/}
              {/*  <Textarea*/}
              {/*    id="bio"*/}
              {/*    placeholder="请输入个人简介"*/}
              {/*    defaultValue="我是大数据211班学生，是一名正式党员。同时，我担任数据学生党支部党务助理，大数据211班团支书。"*/}
              {/*    className="min-h-[100px]"*/}
              {/*  />*/}
              {/*</div>*/}
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
                    <div className="inset-0 top-0 flex justify-center mt-2">
                      <div className="flex justify-between items-center w-full">
                        <Select defaultValue="2023-1" value={selectedTerm} onValueChange={setSelectedTerm}>
                          <SelectTrigger>
                            <SelectValue placeholder="选择学年学期" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2024-1">2024-2025学年第一学期</SelectItem>
                            <SelectItem value="2024-2">2024-2025学年第二学期</SelectItem>
                            <SelectItem value="2023-1">2023-2024学年第一学期</SelectItem>
                            <SelectItem value="2023-2">2023-2024学年第二学期</SelectItem>
                            <SelectItem value="2022-1">2022-2023学年第一学期</SelectItem>
                            <SelectItem value="2022-2">2022-2023学年第二学期</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-muted-foreground"></p>
                      </div>
                    </div>
                    <RadarChart title="" data={getComparisonRadarData()} height={400} />
                  </div>
                </div>
                <div className="md:w-1/2 space-y-4 rounded-lg border border-white-100 bg-white p-6 shadow-sm">
                  <h3 className="mb-6 text-lg font-semibold text-gray-800 border-b-2 border-red-300 pb-3">
                    画像指标详情
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>思想锋领指数</span>
                      <span className="font-medium">78分</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>学业锋领指数</span>
                      <span className="font-medium">85分</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>服务锋领指数</span>
                      <span className="font-medium">90分</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>作风锋领指数</span>
                      <span className="font-medium">75分</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>群众锋领指数</span>
                      <span className="font-medium">82分</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg">综合锋领分数</span>
                      <span className="font-medium">82分</span>
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
                  <p className="text-sm text-muted-foreground mt-1">提交时间：2021-09-15</p>
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
                  <h3 className="font-medium">思想汇报1</h3>
                  <p className="text-sm text-muted-foreground mt-1">提交时间：2021-12-10</p>
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
                  <h3 className="font-medium">思想汇报2</h3>
                  <p className="text-sm text-muted-foreground mt-1">提交时间：2022-3-10</p>
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
                  <h3 className="font-medium">积极分子考察表</h3>
                  <p className="text-sm text-muted-foreground mt-1">提交时间：2022-06-19</p>
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
