"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
	getDateTimeParts,
	getDayTimeParts,
	getStatus,
	isComplete,
	timeFilter,
	TimeFilterType
} from "@/lib/utils"
import {useAuth} from "@/hooks/use-auth";
import {useData} from "@/context/data-context";

export default function PartyLecturePage() {
	const {user} = useAuth();

	if(user === null) return null;
	const cur_branch = user.branch;

	const {ActivitiesAPI, MaterialAPI, MemberAPI, NoticeAPI, UserDocumentAPI, ActivityJoinAPI, UserDataAPI, EventAPI, BranchAPI, TransferAPI, refreshData, loading} = useData();

	const all_activities = ActivitiesAPI.data.filter(d => d.branch.id === cur_branch.id);
	const all_material = MaterialAPI.data.filter(d => d.branch.id === cur_branch.id);
	const all_member = MemberAPI.data.filter(d => d.branch.id === cur_branch.id);
	const all_notice = NoticeAPI.data.filter(d => d.publisher.branch.id === cur_branch.id);
	const all_user_documents = UserDocumentAPI.data.filter(d => d.user.branch.id === cur_branch.id);
	const all_activity_join = ActivityJoinAPI.data.filter(d => d.member.branch.id === cur_branch.id);
	const all_user_data = UserDataAPI.data.filter(d => d.user.branch.id === cur_branch.id);
	const all_event = EventAPI.data.filter(d => d.user.branch.id === cur_branch.id);
	const all_transfer = TransferAPI.data.filter(d => d.user.branch.id === cur_branch.id);

	const getActivityMember = (activity: ActivityType) => MemberAPI.data.filter(d => d.branch.id === activity.branch.id);
	const getBranchMember = (branch: BranchType) => MemberAPI.data.filter(d => d.branch.id === branch.id)

	const meetings = all_activities.filter((meeting) => meeting.type === '党课');

	const [selectedMeeting, setSelectedMeeting] = useState<ActivityType| null>(null)
	const [dialogOpen, setDialogOpen] = useState(false)

	const completedMeetings = meetings.filter((meeting) => timeFilter(meeting.startTime, TimeFilterType.COMPLETE))
	const upcomingMeetings = meetings.filter((meeting) => timeFilter(meeting.startTime, TimeFilterType.BEFORE))

	const openDialog = (meeting:ActivityType) => {
		setSelectedMeeting(meeting)
		setDialogOpen(true)
	}

	const renderMeetingCard = (meeting:ActivityType) => (
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
				<h1 className="text-3xl font-bold tracking-tight">党课学习</h1>
				<p className="text-muted-foreground">查看党课学习记录和安排</p>
			</div>

			<Tabs defaultValue="all">
				<TabsList>
					<TabsTrigger value="all">全部</TabsTrigger>
					<TabsTrigger value="completed">已完成</TabsTrigger>
					<TabsTrigger value="upcoming">未开始</TabsTrigger>
				</TabsList>
				<TabsContent value="all">
					<div className="grid gap-4">{meetings.map(renderMeetingCard)}</div>
				</TabsContent>
				<TabsContent value="completed">
					<div className="grid gap-4">{completedMeetings.map(renderMeetingCard)}</div>
				</TabsContent>
				<TabsContent value="upcoming">
					<div className="grid gap-4">{upcomingMeetings.map(renderMeetingCard)}</div>
				</TabsContent>
			</Tabs>

			{/* 弹窗详情 */}
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
								<p><strong>会议内容：</strong></p>
								<p className="whitespace-pre-line text-sm text-muted-foreground">{selectedMeeting.content}</p>
							</div>
						</>
					)}
				</DialogContent>
			</Dialog>
		</div>
	)
}
