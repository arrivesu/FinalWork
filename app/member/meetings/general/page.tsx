"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Calendar, Clock, MapPin, Users} from "lucide-react"
import {MeetingAPI} from "@/lib/api";
import {
	getBranchMember,
	getDateTimeParts,
	getDayTimeParts,
	getStatus,
	isComplete,
	timeFilter,
	TimeFilterType
} from "@/lib/utils";

// 模拟会议数据
const meetings = MeetingAPI.get().filter((meeting) => meeting.type === '支部党员大会')

export default function GeneralMeetings() {
	// 过滤会议
	const completedMeetings = meetings.filter((meeting) => timeFilter(meeting.date, TimeFilterType.COMPLETE))
	const upcomingMeetings = meetings.filter((meeting) => timeFilter(meeting.date, TimeFilterType.BEFORE))

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
										<Badge variant={isComplete(meeting) ? "outline" : "secondary"}>{getStatus(meeting)}</Badge>
									</div>
									<CardDescription>
										<div className="flex flex-wrap gap-4 mt-2">
											<div className="flex items-center gap-1">
												<Calendar className="h-4 w-4 text-muted-foreground"/>
												<span>{meeting.date.toDateString()}</span>
											</div>
											<div className="flex items-center gap-1">
												<span>{getDateTimeParts(meeting.date)}</span>
											</div>
											<div className="flex items-center gap-1">
												<Clock className="h-4 w-4 text-muted-foreground"/>
												<span>{getDayTimeParts(meeting.date)}</span>
											</div>
											<div className="flex items-center gap-1">
												<MapPin className="h-4 w-4 text-muted-foreground"/>
												<span>{meeting.location}</span>
											</div>
											<div className="flex items-center gap-1">
												<Users className="h-4 w-4 text-muted-foreground"/>
												<span>
													{isComplete(meeting)
														? `${getBranchMember(meeting.branch).length}/${getBranchMember(meeting.branch).length}人参加`
														: `预计${getBranchMember(meeting.branch).length}人参加`}
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
										<Badge variant="outline">{getStatus(meeting)}</Badge>
									</div>
									<CardDescription>
										<div className="flex flex-wrap gap-4 mt-2">
											<div className="flex items-center gap-1">
												<Calendar className="h-4 w-4 text-muted-foreground"/>
												<span>{meeting.date.toDateString()}</span>
											</div>
											<div className="flex items-center gap-1">
												<span>{getDateTimeParts(meeting.date)}</span>
											</div>
											<div className="flex items-center gap-1">
												<Clock className="h-4 w-4 text-muted-foreground"/>
												<span>{getDayTimeParts(meeting.date)}</span>
											</div>
											<div className="flex items-center gap-1">
												<MapPin className="h-4 w-4 text-muted-foreground"/>
												<span>{meeting.location}</span>
											</div>
											<div className="flex items-center gap-1">
												<Users className="h-4 w-4 text-muted-foreground"/>
												<span>
													{isComplete(meeting)
														? `${getBranchMember(meeting.branch).length}/${getBranchMember(meeting.branch).length}人参加`
														: `预计${getBranchMember(meeting.branch).length}人参加`}
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
										<Badge variant="secondary">{getStatus(meeting)}</Badge>
									</div>
									<CardDescription>
										<div className="flex flex-wrap gap-4 mt-2">
											<div className="flex items-center gap-1">
												<Calendar className="h-4 w-4 text-muted-foreground"/>
												<span>{meeting.date.toDateString()}</span>
											</div>
											<div className="flex items-center gap-1">
												<span>{getDateTimeParts(meeting.date)}</span>
											</div>
											<div className="flex items-center gap-1">
												<Clock className="h-4 w-4 text-muted-foreground"/>
												<span>{getDayTimeParts(meeting.date)}</span>
											</div>
											<div className="flex items-center gap-1">
												<MapPin className="h-4 w-4 text-muted-foreground"/>
												<span>{meeting.location}</span>
											</div>
											<div className="flex items-center gap-1">
												<Users className="h-4 w-4 text-muted-foreground"/>
												<span>
													{isComplete(meeting)
														? `${getBranchMember(meeting.branch).length}/${getBranchMember(meeting.branch).length}人参加`
														: `预计${getBranchMember(meeting.branch).length}人参加`}
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
			</Tabs>
		</div>
	)
}
