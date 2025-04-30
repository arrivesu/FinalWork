"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download, BarChart3, PieChart, LineChart, Users, Calendar, BookOpen, Heart } from "lucide-react"

// Mock data for statistics
const membershipData = {
  total: 156,
  active: 142,
  inactive: 14,
  byGender: { male: 89, female: 67 },
  byAge: { "18-30": 42, "31-40": 58, "41-50": 37, "51+": 19 },
  byEducation: { 高中: 15, 大专: 28, 本科: 78, 硕士: 29, 博士: 6 },
  byDepartment: { 技术部: 45, 人力资源部: 22, 财务部: 18, 市场部: 32, 销售部: 28, 行政部: 11 },
  byJoinYear: {
    "2023": 12,
    "2022": 15,
    "2021": 18,
    "2020": 22,
    "2019": 19,
    "2018": 17,
    "2017": 14,
    "2016": 11,
    "2015": 9,
    "2014及以前": 19,
  },
}

const activityData = {
  meetingsCount: 24,
  meetingsAttendance: 87,
  educationCount: 36,
  educationAttendance: 92,
  volunteerCount: 18,
  volunteerAttendance: 78,
  byMonth: {
    "1月": { meetings: 2, education: 3, volunteer: 1 },
    "2月": { meetings: 1, education: 2, volunteer: 1 },
    "3月": { meetings: 3, education: 4, volunteer: 2 },
    "4月": { meetings: 2, education: 3, volunteer: 1 },
    "5月": { meetings: 2, education: 3, volunteer: 2 },
    "6月": { meetings: 3, education: 4, volunteer: 2 },
    "7月": { meetings: 1, education: 2, volunteer: 1 },
    "8月": { meetings: 2, education: 3, volunteer: 1 },
    "9月": { meetings: 2, education: 4, volunteer: 2 },
    "10月": { meetings: 3, education: 3, volunteer: 2 },
    "11月": { meetings: 2, education: 3, volunteer: 2 },
    "12月": { meetings: 1, education: 2, volunteer: 1 },
  },
}

const developmentData = {
  applicants: 28,
  activists: 22,
  candidates: 15,
  newMembers: 12,
  byStage: {
    申请入党: 28,
    入党积极分子: 22,
    发展对象: 15,
    预备党员: 8,
    正式党员: 4,
  },
  byMonth: {
    "1月": { applicants: 2, activists: 1, candidates: 1, newMembers: 1 },
    "2月": { applicants: 1, activists: 2, candidates: 0, newMembers: 0 },
    "3月": { applicants: 3, activists: 2, candidates: 1, newMembers: 1 },
    "4月": { applicants: 2, activists: 1, candidates: 2, newMembers: 0 },
    "5月": { applicants: 3, activists: 2, candidates: 1, newMembers: 1 },
    "6月": { applicants: 4, activists: 3, candidates: 2, newMembers: 2 },
    "7月": { applicants: 2, activists: 1, candidates: 1, newMembers: 1 },
    "8月": { applicants: 1, activists: 2, candidates: 1, newMembers: 0 },
    "9月": { applicants: 3, activists: 2, candidates: 1, newMembers: 2 },
    "10月": { applicants: 2, activists: 2, candidates: 2, newMembers: 1 },
    "11月": { applicants: 3, activists: 2, candidates: 1, newMembers: 2 },
    "12月": { applicants: 2, activists: 2, candidates: 2, newMembers: 1 },
  },
}

export default function StatisticsPage() {
  const [timeRange, setTimeRange] = useState("year")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">数据统计</h1>
          <p className="text-muted-foreground">党组织数据统计与分析</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="选择时间范围" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">本月</SelectItem>
              <SelectItem value="quarter">本季度</SelectItem>
              <SelectItem value="year">本年度</SelectItem>
              <SelectItem value="all">全部时间</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            导出报告
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">党员总数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{membershipData.total}</div>
            <p className="text-xs text-muted-foreground">
              活跃党员: {membershipData.active} ({Math.round((membershipData.active / membershipData.total) * 100)}%)
            </p>
          </CardContent>
        </Card>
        <Card >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">会议活动</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activityData.meetingsCount}</div>
            <p className="text-xs text-muted-foreground">平均出席率: {activityData.meetingsAttendance}%</p>
          </CardContent>
        </Card>
        <Card >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">学习教育</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activityData.educationCount}</div>
            <p className="text-xs text-muted-foreground">平均参与率: {activityData.educationAttendance}%</p>
          </CardContent>
        </Card>
        <Card >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">志愿服务</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activityData.volunteerCount}</div>
            <p className="text-xs text-muted-foreground">平均参与率: {activityData.volunteerAttendance}%</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="membership">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="membership">党员结构</TabsTrigger>
          <TabsTrigger value="activities">活动统计</TabsTrigger>
          <TabsTrigger value="development">发展情况</TabsTrigger>
        </TabsList>
        <TabsContent value="membership" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card >
              <CardHeader>
                <CardTitle>党员性别比例</CardTitle>
                <CardDescription>按性别统计党员分布</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="w-full h-[250px] flex items-center justify-center">
                  <PieChart className="h-16 w-16 text-muted-foreground" />
                </div>
              </CardContent>
              <div className="px-6 pb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">男性</span>
                    <span className="text-2xl font-bold">{membershipData.byGender.male}</span>
                    <span className="text-xs text-muted-foreground">
                      {Math.round((membershipData.byGender.male / membershipData.total) * 100)}%
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">女性</span>
                    <span className="text-2xl font-bold">{membershipData.byGender.female}</span>
                    <span className="text-xs text-muted-foreground">
                      {Math.round((membershipData.byGender.female / membershipData.total) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </Card>
            <Card >
              <CardHeader>
                <CardTitle>党员年龄分布</CardTitle>
                <CardDescription>按年龄段统计党员分布</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="w-full h-[250px] flex items-center justify-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground" />
                </div>
              </CardContent>
              <div className="px-6 pb-6">
                <div className="grid grid-cols-4 gap-2">
                  {Object.entries(membershipData.byAge).map(([age, count]) => (
                    <div key={age} className="flex flex-col">
                      <span className="text-xs font-medium">{age}</span>
                      <span className="text-lg font-bold">{count}</span>
                      <span className="text-xs text-muted-foreground">
                        {Math.round((count / membershipData.total) * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
            <Card >
              <CardHeader>
                <CardTitle>党员学历分布</CardTitle>
                <CardDescription>按学历统计党员分布</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="w-full h-[250px] flex items-center justify-center">
                  <PieChart className="h-16 w-16 text-muted-foreground" />
                </div>
              </CardContent>
              <div className="px-6 pb-6">
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(membershipData.byEducation).map(([edu, count]) => (
                    <div key={edu} className="flex flex-col">
                      <span className="text-xs font-medium">{edu}</span>
                      <span className="text-lg font-bold">{count}</span>
                      <span className="text-xs text-muted-foreground">
                        {Math.round((count / membershipData.total) * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
            <Card className="border-red-500 bg-red-50 md:col-span-2">
              <CardHeader>
                <CardTitle>党员部门分布</CardTitle>
                <CardDescription>按部门统计党员分布</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="w-full h-[250px] flex items-center justify-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground" />
                </div>
              </CardContent>
              <div className="px-6 pb-6">
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {Object.entries(membershipData.byDepartment).map(([dept, count]) => (
                    <div key={dept} className="flex flex-col">
                      <span className="text-xs font-medium">{dept}</span>
                      <span className="text-lg font-bold">{count}</span>
                      <span className="text-xs text-muted-foreground">
                        {Math.round((count / membershipData.total) * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
            <Card className="border-red-500 bg-red-50 lg:col-span-3">
              <CardHeader>
                <CardTitle>党员入党年份分布</CardTitle>
                <CardDescription>按入党年份统计党员分布</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="w-full h-[250px] flex items-center justify-center">
                  <LineChart className="h-16 w-16 text-muted-foreground" />
                </div>
              </CardContent>
              <div className="px-6 pb-6">
                <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                  {Object.entries(membershipData.byJoinYear).map(([year, count]) => (
                    <div key={year} className="flex flex-col">
                      <span className="text-xs font-medium">{year}</span>
                      <span className="text-lg font-bold">{count}</span>
                      <span className="text-xs text-muted-foreground">
                        {Math.round((count / membershipData.total) * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="activities" className="space-y-4">
          <Card >
            <CardHeader>
              <CardTitle>活动统计</CardTitle>
              <CardDescription>各类活动数量和参与情况</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="w-full h-[300px] flex items-center justify-center">
                  <LineChart className="h-16 w-16 text-muted-foreground" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">组织生活会议</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs text-muted-foreground">总次数</p>
                        <p className="text-lg font-bold">{activityData.meetingsCount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">平均出席率</p>
                        <p className="text-lg font-bold">{activityData.meetingsAttendance}%</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">学习教育活动</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs text-muted-foreground">总次数</p>
                        <p className="text-lg font-bold">{activityData.educationCount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">平均参与率</p>
                        <p className="text-lg font-bold">{activityData.educationAttendance}%</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">志愿服务活动</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs text-muted-foreground">总次数</p>
                        <p className="text-lg font-bold">{activityData.volunteerCount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">平均参与率</p>
                        <p className="text-lg font-bold">{activityData.volunteerAttendance}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card >
            <CardHeader>
              <CardTitle>月度活动分布</CardTitle>
              <CardDescription>各月份活动开展情况</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[300px] flex items-center justify-center">
                <BarChart3 className="h-16 w-16 text-muted-foreground" />
              </div>
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2 mt-4">
                {Object.entries(activityData.byMonth).map(([month, data]) => (
                  <div key={month} className="flex flex-col">
                    <span className="text-xs font-medium">{month}</span>
                    <div className="space-y-1 mt-1">
                      <div className="flex justify-between">
                        <span className="text-xs">会议</span>
                        <span className="text-xs font-medium">{data.meetings}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs">学习</span>
                        <span className="text-xs font-medium">{data.education}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs">志愿</span>
                        <span className="text-xs font-medium">{data.volunteer}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="development" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card >
              <CardHeader>
                <CardTitle>党员发展情况</CardTitle>
                <CardDescription>各阶段党员发展数量</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[300px] flex items-center justify-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground" />
                </div>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mt-4">
                  {Object.entries(developmentData.byStage).map(([stage, count]) => (
                    <div key={stage} className="flex flex-col">
                      <span className="text-xs font-medium">{stage}</span>
                      <span className="text-lg font-bold">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
            <Card >
              <CardHeader>
                <CardTitle>本年度发展统计</CardTitle>
                <CardDescription>本年度各阶段发展情况</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">申请入党</h4>
                      <p className="text-2xl font-bold">{developmentData.applicants}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">入党积极分子</h4>
                      <p className="text-2xl font-bold">{developmentData.activists}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">发展对象</h4>
                      <p className="text-2xl font-bold">{developmentData.candidates}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">新发展党员</h4>
                      <p className="text-2xl font-bold">{developmentData.newMembers}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">转化率分析</h4>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs">申请入党 → 积极分子</span>
                          <span className="text-xs font-medium">
                            {Math.round((developmentData.activists / developmentData.applicants) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <div
                            className="bg-red-500 h-1.5 rounded-full"
                            style={{
                              width: `${Math.round((developmentData.activists / developmentData.applicants) * 100)}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs">积极分子 → 发展对象</span>
                          <span className="text-xs font-medium">
                            {Math.round((developmentData.candidates / developmentData.activists) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <div
                            className="bg-red-500 h-1.5 rounded-full"
                            style={{
                              width: `${Math.round((developmentData.candidates / developmentData.activists) * 100)}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs">发展对象 → 新党员</span>
                          <span className="text-xs font-medium">
                            {Math.round((developmentData.newMembers / developmentData.candidates) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <div
                            className="bg-red-500 h-1.5 rounded-full"
                            style={{
                              width: `${Math.round((developmentData.newMembers / developmentData.candidates) * 100)}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card >
            <CardHeader>
              <CardTitle>月度发展趋势</CardTitle>
              <CardDescription>各月份党员发展情况</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[300px] flex items-center justify-center">
                <LineChart className="h-16 w-16 text-muted-foreground" />
              </div>
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2 mt-4">
                {Object.entries(developmentData.byMonth).map(([month, data]) => (
                  <div key={month} className="flex flex-col">
                    <span className="text-xs font-medium">{month}</span>
                    <div className="space-y-1 mt-1">
                      <div className="flex justify-between">
                        <span className="text-xs">申请</span>
                        <span className="text-xs font-medium">{data.applicants}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs">积极分子</span>
                        <span className="text-xs font-medium">{data.activists}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs">发展对象</span>
                        <span className="text-xs font-medium">{data.candidates}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs">新党员</span>
                        <span className="text-xs font-medium">{data.newMembers}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
