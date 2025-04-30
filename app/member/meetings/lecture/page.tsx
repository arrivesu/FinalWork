import { CalendarIcon, GraduationCapIcon, MapPinIcon, UserIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function PartyLecturePage() {
  // 模拟党课数据
  const upcomingLectures = [
    {
      id: "pl-001",
      title: "学习贯彻习近平新时代中国特色社会主义思想专题党课",
      date: "2025-05-20",
      time: "14:00-16:00",
      location: "党员活动中心",
      lecturer: "李教授",
      status: "upcoming",
      type: "必修",
    },
    {
      id: "pl-002",
      title: "党的二十大精神解读",
      date: "2025-06-05",
      time: "15:00-17:00",
      location: "线上直播",
      lecturer: "王书记",
      status: "upcoming",
      type: "必修",
    },
    {
      id: "pl-003",
      title: "党史学习教育专题党课",
      date: "2025-06-15",
      time: "14:30-16:30",
      location: "第一会议室",
      lecturer: "张教授",
      status: "upcoming",
      type: "选修",
    },
  ]

  const completedLectures = [
    {
      id: "pl-004",
      title: "党员先锋模范作用专题党课",
      date: "2025-04-10",
      time: "14:00-16:00",
      location: "党员活动中心",
      lecturer: "刘教授",
      status: "completed",
      type: "必修",
      score: 95,
      attendance: true,
    },
    {
      id: "pl-005",
      title: "党风廉政建设专题党课",
      date: "2025-03-25",
      time: "15:00-17:00",
      location: "第二会议室",
      lecturer: "赵书记",
      status: "completed",
      type: "必修",
      score: 90,
      attendance: true,
    },
    {
      id: "pl-006",
      title: "基层党建工作经验交流",
      date: "2025-03-05",
      time: "14:30-16:30",
      location: "党员活动中心",
      lecturer: "孙主任",
      status: "completed",
      type: "选修",
      score: 88,
      attendance: true,
    },
  ]

  // 党课学习统计
  const lectureStats = {
    required: {
      completed: 2,
      total: 4,
      percentage: 50,
    },
    optional: {
      completed: 1,
      total: 2,
      percentage: 50,
    },
    totalHours: 6,
    averageScore: 91,
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">党课学习</h1>
        <Button>
          <GraduationCapIcon className="mr-2 h-4 w-4" />
          查看学习资源
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">必修党课完成率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lectureStats.required.percentage}%</div>
            <Progress value={lectureStats.required.percentage} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              已完成 {lectureStats.required.completed}/{lectureStats.required.total} 门
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">选修党课完成率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lectureStats.optional.percentage}%</div>
            <Progress value={lectureStats.optional.percentage} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              已完成 {lectureStats.optional.completed}/{lectureStats.optional.total} 门
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">总学习课时</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lectureStats.totalHours}小时</div>
            <p className="text-xs text-muted-foreground mt-2">本年度累计学习时间</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">平均学习成绩</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lectureStats.averageScore}分</div>
            <p className="text-xs text-muted-foreground mt-2">所有党课平均成绩</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="upcoming">即将开课</TabsTrigger>
          <TabsTrigger value="completed">已完成党课</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4 mt-6">
          {upcomingLectures.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">暂无即将开课的党课</CardContent>
            </Card>
          ) : (
            upcomingLectures.map((lecture) => (
              <Card key={lecture.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="mr-2">{lecture.title}</CardTitle>
                    <Badge variant={lecture.type === "必修" ? "destructive" : "secondary"}>{lecture.type}</Badge>
                  </div>
                  <CardDescription className="flex items-center mt-2">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {lecture.date} {lecture.time}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <MapPinIcon className="mr-2 h-4 w-4" />
                      <span>地点: {lecture.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>讲师: {lecture.lecturer}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">查看详情</Button>
                  <Button>预约参加</Button>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 mt-6">
          {completedLectures.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">暂无已完成的党课记录</CardContent>
            </Card>
          ) : (
            completedLectures.map((lecture) => (
              <Card key={lecture.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="mr-2">{lecture.title}</CardTitle>
                    <Badge variant={lecture.type === "必修" ? "destructive" : "secondary"}>{lecture.type}</Badge>
                  </div>
                  <CardDescription className="flex items-center mt-2">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {lecture.date} {lecture.time}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <MapPinIcon className="mr-2 h-4 w-4" />
                      <span>地点: {lecture.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>讲师: {lecture.lecturer}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <GraduationCapIcon className="mr-2 h-4 w-4" />
                      <span>学习成绩: {lecture.score}分</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">查看学习笔记</Button>
                  <Button variant="secondary">下载学习证明</Button>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
