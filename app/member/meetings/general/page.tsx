"use client"

import { useState } from "react"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import { ActivitiesAPI } from "@/lib/api"
import {
	getBranchMember,
	getDateTimeParts,
	getDayTimeParts,
	getStatus,
	isComplete,
	timeFilter,
	TimeFilterType,
} from "@/lib/utils"

export default function GeneralMeetings() {
	const [selectedMeeting, setSelectedMeeting] = useState(null)
	const [dialogOpen, setDialogOpen] = useState(false)

	const openDialog = (meeting: any) => {
		setSelectedMeeting(meeting)
		setDialogOpen(true)
	}

	const meetings = ActivitiesAPI.data.filter((m) => m.type === '支部党员大会')
	const completedMeetings = meetings.filter((m) => timeFilter(m.startTime, TimeFilterType.COMPLETE))
	const upcomingMeetings = meetings.filter((m) => timeFilter(m.startTime, TimeFilterType.BEFORE))

	const renderMeetingCard = (meeting: any) => (
		<Card key={meeting.id}>
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<CardTitle>{meeting.title}</CardTitle>
					<Badge variant={isComplete(meeting) ? "outline" : "secondary"}>{getStatus(meeting)}</Badge>
				</div>
				<CardDescription>
					<div className="flex flex-wrap gap-4 mt-2">
						<div className="flex items-center gap-1">
							<Calendar className="h-4 w-4 text-muted-foreground" />
							<span>{meeting.startTime.toDateString()}</span>
						</div>
						<div className="flex items-center gap-1">
							<span>{getDateTimeParts(meeting.startTime)}</span>
						</div>
						<div className="flex items-center gap-1">
							<Clock className="h-4 w-4 text-muted-foreground" />
							<span>{getDayTimeParts(meeting.startTime)}</span>
						</div>
						<div className="flex items-center gap-1">
							<MapPin className="h-4 w-4 text-muted-foreground" />
							<span>{meeting.location}</span>
						</div>
						<div className="flex items-center gap-1">
							<Users className="h-4 w-4 text-muted-foreground" />
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
						<Button variant="outline" onClick={() => openDialog(meeting)}>查看详情</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	)

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
						{meetings.map(renderMeetingCard)}
					</div>
				</TabsContent>
				<TabsContent value="completed">
					<div className="grid gap-4">
						{completedMeetings.map(renderMeetingCard)}
					</div>
				</TabsContent>
				<TabsContent value="upcoming">
					<div className="grid gap-4">
						{upcomingMeetings.map(renderMeetingCard)}
					</div>
				</TabsContent>
			</Tabs>

			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<DialogContent className="max-w-xl">
					{selectedMeeting && (
						<>
							<DialogHeader>
								<DialogTitle>{selectedMeeting.title}</DialogTitle>
							</DialogHeader>
							<div className="space-y-2">
								<p><strong>时间：</strong>{selectedMeeting.startTime.toLocaleString()}</p>
								<p><strong>地点：</strong>{selectedMeeting.location}</p>
								<p><strong>参会人数：</strong>{getBranchMember(selectedMeeting.branch).length}人</p>
								<p><strong>内容：</strong></p>
								<p className="whitespace-pre-line text-sm text-muted-foreground">{selectedMeeting.content}</p>
							</div>
						</>
					)}
				</DialogContent>
			</Dialog>
		</div>
	)
}
