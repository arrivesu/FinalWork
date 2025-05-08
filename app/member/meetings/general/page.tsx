"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Calendar, Clock, MapPin, Users} from "lucide-react"

// 模拟会议数据
const meetings = [
	{
		id: "1",
		title: "2025年第一次支部党员大会",
		date: "2025-01-15",
		time: "14:00-16:00",
		location: "第一会议室",
		status: "已完成",
		participants: 34,
		totalMembers: 34,
		content: "开展支部党员大会，进行批评与自我批评，激励党员发挥先锋模范作用。"
	},
	{
		id: "2",
		title: "2024年第四季度支部党员大会",
		date: "2024-12-15",
		time: "14:00-16:00",
		location: "第一会议室",
		status: "已完成",
		attendees: 34,
		totalMembers: 34,
		content: "1. 学习贯彻党的二十大精神\n2. 总结2024年工作\n3. 讨论2025年工作计划\n4. 表彰先进党员",
	},
	{
		id: "3",
		title: "关于支部预备党员转正工作支部党员大会",
		date: "2024-09-20",
		time: "14:00-16:00",
		location: "第一会议室",
		status: "已完成",
		attendees: 40,
		totalMembers: 42,
		content: "1. 学习习近平总书记重要讲话精神\n2. 总结第三季度工作\n3. 讨论第四季度工作计划\n4. 党员思想交流",
	},
	{
		id: "4",
		title: "2023年第二季度支部党员大会",
		date: "2023-06-18",
		time: "14:00-16:00",
		location: "第一会议室",
		status: "已完成",
		attendees: 39,
		totalMembers: 41,
		content: "1. 学习党史\n2. 总结第二季度工作\n3. 讨论第三季度工作计划\n4. 党员思想交流",
	},
	{
		id: "5",
		title: "2024年第一季度支部党员大会",
		date: "2024-03-20",
		time: "14:00-16:00",
		location: "第一会议室",
		status: "未开始",
		attendees: 0,
		totalMembers: 42,
		content: "1. 学习贯彻党的二十大精神\n2. 总结第一季度工作\n3. 讨论第二季度工作计划\n4. 党员思想交流",
	},
]

export default function GeneralMeetings() {
	// 过滤会议
	const completedMeetings = meetings.filter((meeting) => meeting.status === "已完成")
	const upcomingMeetings = meetings.filter((meeting) => meeting.status === "未开始")

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">支部党员大会</h1>
				<p className="text-muted-foreground">查看支部党员大会记录和安排</p>
			</div>

			<Tabs defaultValue="all">
				<TabsList>
					<TabsTrigger value="all">全部</TabsTrigger>
					<TabsTrigger value="completed">已完成</TabsTrigger>
					<TabsTrigger value="upcoming">未开始</TabsTrigger>
				</TabsList>
				<TabsContent value="all">
					<div className="grid gap-4">
						{meetings.map((meeting) => (
							<Card key={meeting.id}>
								<CardHeader className="pb-2">
									<div className="flex items-center justify-between">
										<CardTitle>{meeting.title}</CardTitle>
										<Badge
											variant={meeting.status === "已完成" ? "outline" : "secondary"}>{meeting.status}</Badge>
									</div>
									<CardDescription>
										<div className="flex flex-wrap gap-4 mt-2">
											<div className="flex items-center gap-1">
												<Calendar className="h-4 w-4 text-muted-foreground"/>
												<span>{meeting.date}</span>
											</div>
											<div className="flex items-center gap-1">
												<Clock className="h-4 w-4 text-muted-foreground"/>
												<span>{meeting.time}</span>
											</div>
											<div className="flex items-center gap-1">
												<MapPin className="h-4 w-4 text-muted-foreground"/>
												<span>{meeting.location}</span>
											</div>
											<div className="flex items-center gap-1">
												<Users className="h-4 w-4 text-muted-foreground"/>
												<span>
                          {meeting.status === "已完成"
							  ? `${meeting.attendees}/${meeting.totalMembers}人参加`
							  : `预计${meeting.totalMembers}人参加`}
                        </span>
											</div>
										</div>
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-2">
										<h3 className="font-medium">会议内容</h3>
										<p className="text-sm whitespace-pre-line">{meeting.content}</p>
										<div className="flex justify-end mt-4">
											<Button variant="outline">查看详情</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</TabsContent>
				<TabsContent value="completed">
					<div className="grid gap-4">
						{completedMeetings.map((meeting) => (
							<Card key={meeting.id}>
								<CardHeader className="pb-2">
									<div className="flex items-center justify-between">
										<CardTitle>{meeting.title}</CardTitle>
										<Badge variant="outline">{meeting.status}</Badge>
									</div>
									<CardDescription>
										<div className="flex flex-wrap gap-4 mt-2">
											<div className="flex items-center gap-1">
												<Calendar className="h-4 w-4 text-muted-foreground"/>
												<span>{meeting.date}</span>
											</div>
											<div className="flex items-center gap-1">
												<Clock className="h-4 w-4 text-muted-foreground"/>
												<span>{meeting.time}</span>
											</div>
											<div className="flex items-center gap-1">
												<MapPin className="h-4 w-4 text-muted-foreground"/>
												<span>{meeting.location}</span>
											</div>
											<div className="flex items-center gap-1">
												<Users className="h-4 w-4 text-muted-foreground"/>
												<span>
                          {meeting.attendees}/{meeting.totalMembers}人参加
                        </span>
											</div>
										</div>
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-2">
										<h3 className="font-medium">会议内容</h3>
										<p className="text-sm whitespace-pre-line">{meeting.content}</p>
										<div className="flex justify-end mt-4">
											<Button variant="outline">查看详情</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</TabsContent>
				<TabsContent value="upcoming">
					<div className="grid gap-4">
						{upcomingMeetings.map((meeting) => (
							<Card key={meeting.id}>
								<CardHeader className="pb-2">
									<div className="flex items-center justify-between">
										<CardTitle>{meeting.title}</CardTitle>
										<Badge variant="secondary">{meeting.status}</Badge>
									</div>
									<CardDescription>
										<div className="flex flex-wrap gap-4 mt-2">
											<div className="flex items-center gap-1">
												<Calendar className="h-4 w-4 text-muted-foreground"/>
												<span>{meeting.date}</span>
											</div>
											<div className="flex items-center gap-1">
												<Clock className="h-4 w-4 text-muted-foreground"/>
												<span>{meeting.time}</span>
											</div>
											<div className="flex items-center gap-1">
												<MapPin className="h-4 w-4 text-muted-foreground"/>
												<span>{meeting.location}</span>
											</div>
											<div className="flex items-center gap-1">
												<Users className="h-4 w-4 text-muted-foreground"/>
												<span>预计{meeting.totalMembers}人参加</span>
											</div>
										</div>
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-2">
										<h3 className="font-medium">会议内容</h3>
										<p className="text-sm whitespace-pre-line">{meeting.content}</p>
										<div className="flex justify-end mt-4">
											<Button variant="outline">查看详情</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	)
}
