import { CalendarIcon, FileTextIcon, UsersIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PartyGroupMeetingsPage() {
  // 模拟党小组会数据
  const upcomingMeetings = [
    {
      id: "pgm-001",
      title: "学习贯彻习近平新时代中国特色社会主义思想",
      date: "2025-05-15",
      time: "19:00-20:30",
      location: "第三会议室",
      host: "张明",
      status: "upcoming",
    },
    {
      id: "pgm-002",
      title: "党的二十大精神学习讨论",
      date: "2025-05-28",
      time: "18:30-20:00",
      location: "线上会议",
      host: "李红",
      status: "upcoming",
    },
  ]

  const pastMeetings = [
    {
      id: "pgm-003",
      title: "党员先锋模范作用讨论",
      date: "2025-04-20",
      time: "19:00-20:30",
      location: "第二会议室",
      host: "王强",
      status: "completed",
      summary: "讨论了如何在日常工作中发挥党员先锋模范作用，分享了优秀党员事迹。",
    },
    {
      id: "pgm-004",
      title: "基层党建工作经验交流",
      date: "2025-04-05",
      time: "18:30-20:00",
      location: "第一会议室",
      host: "刘伟",
      status: "completed",
      summary: "交流了基层党建工作经验，讨论了如何提高党小组活动质量。",
    },
    {
      id: "pgm-005",
      title: "党风廉政建设专题讨论",
      date: "2025-03-22",
      time: "19:00-20:30",
      location: "第三会议室",
      host: "张明",
      status: "completed",
      summary: "学习了党风廉政建设相关文件，讨论了如何在工作中防范廉政风险。",
    },
  ]

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">党小组会</h1>
        <Button>
          <FileTextIcon className="mr-2 h-4 w-4" />
          查看党小组会记录规范
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="upcoming">即将召开</TabsTrigger>
          <TabsTrigger value="past">历史记录</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4 mt-6">
          {upcomingMeetings.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">暂无即将召开的党小组会</CardContent>
            </Card>
          ) : (
            upcomingMeetings.map((meeting) => (
              <Card key={meeting.id}>
                <CardHeader>
                  <CardTitle>{meeting.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {meeting.date} {meeting.time} | {meeting.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm">
                    <UsersIcon className="mr-2 h-4 w-4" />
                    <span>主持人: {meeting.host}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">查看详情</Button>
                  <Button>签到参会</Button>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4 mt-6">
          {pastMeetings.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">暂无历史党小组会记录</CardContent>
            </Card>
          ) : (
            pastMeetings.map((meeting) => (
              <Card key={meeting.id}>
                <CardHeader>
                  <CardTitle>{meeting.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {meeting.date} {meeting.time} | {meeting.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <UsersIcon className="mr-2 h-4 w-4" />
                      <span>主持人: {meeting.host}</span>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground">会议摘要: {meeting.summary}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">查看会议纪要</Button>
                  <Button variant="secondary">查看签到记录</Button>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
