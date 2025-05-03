"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Calendar, Clock, MapPin, Users} from "lucide-react"

// 模拟支部委员会会议数据
const meetings = [
	{
		id: "1",
		title: "2023年12月支部委员会",
		date: "2023-12-10",
		time: "14:00-16:00",
		location: "党员活动室",
		status: "已完成",
		attendees: 5,
		totalMembers: 5,
		content: "1. 讨论2023年工作总结\n2. 讨论2024年工作计划\n3. 讨论发展党员工作\n4. 讨论党员教育培训工作",
	},
	{
		id: "2",
		title: "2023年11月支部委员会",
		date: "2023-11-12",
		time: "14:00-16:00",
		location: "党员活动室",
		status: "已完成",
		attendees: 5,
		totalMembers: 5,
		content: "1. 讨论党员发展工作\n2. 讨论党员教育培训工作\n3. 讨论党员管理工作\n4. 讨论党员服务工作",
	},
	{
		id: "3",
		title: "2023年10月支部委员会",
		date: "2023-10-15",
		time: "14:00-16:00",
		location: "党员活动室",
		status: "已完成",
		attendees: 4,
		totalMembers: 5,
		content: "1. 讨论党员发展工作\n2. 讨论党员教育培训工作\n3. 讨论党员管理工作\n4. 讨论党员服务工作",
	},
	{
		id: "4",
		title: "2024年1月支部委员会",
		date: "2024-01-14",
		time: "14:00-16:00",
		location: "党员活动室",
		status: "未开始",
		attendees: 0,
		totalMembers: 5,
		content: "1. 讨论2024年1月工作计划\n2. 讨论党员发展工作\n3. 讨论党员教育培训工作\n4. 讨论党员管理工作",
	},
]

export default function CommitteeMeetings() {
	// 过滤会议
	const completedMeetings = meetings.filter((meeting) => meeting.status === "已完成")
	const upcomingMeetings = meetings.filter((meeting) => meeting.status === "未开始")

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">支部委员会</h1>
				<p className="text-muted-foreground">查看支部委员会会议记录和安排</p>
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
