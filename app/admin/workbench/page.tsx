"use client"

import {useEffect, useState} from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {CardStat} from "@/components/ui/card-stat"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Calendar} from "@/components/ui/calendar"
import {Button} from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {Activity, Bell, BookOpen, CalendarIcon, Clock, MapPin, Plus, Users} from "lucide-react"
import {ActivitiesAPI, MaterialAPI, ActivitiesAPI, NoticeAPI} from "@/lib/api";
import {useAuth} from "@/hooks/use-auth";
import {getBranchMember, getCurrentSemesterActivityCount, isComplete} from "@/lib/utils";

interface User {
	id: string
	name: string
	role: string
	avatar: string
}

// 模拟数据
const notices = NoticeAPI.get()

export default function AdminWorkbench() {
	const [date, setDate] = useState<Date | undefined>(new Date())
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	const all_material = MaterialAPI.get();
	const all_activities = ActivitiesAPI.get();
	const all_meeting = ActivitiesAPI.get();

	const {user} = useAuth();

	if (!user) return null

	const branch = user.branch;
	const branch_user_list = getBranchMember(branch);

	const learn_material_cnt = all_material.length;
	const cur_year_activity_cnt = getCurrentSemesterActivityCount(all_activities);
	const meeting_cnt = all_meeting.filter((meeting) => !isComplete(meeting)).length;
	const branch_member_cnt = branch_user_list.filter((user) => user.identity_type === '正式党员' || user.identity_type === '预备党员').length

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">工作台</h1>
				<p className="text-muted-foreground">欢迎回来，{user.name}！这里是您的管理员工作台。</p>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 bg-white p-6 rounded-xl shadow-sm">
				<CardStat title="党员总数" value={`${branch_member_cnt}人`} icon={Users} description="包含正式党员和预备党员"/>
				<CardStat title="本学期活动" value={`${cur_year_activity_cnt}次`} icon={Activity} description="本学期已开展活动次数"/>
				<CardStat title="学习资料" value={`${learn_material_cnt}篇`} icon={BookOpen} description="已上传的党课资料数量"/>
				<CardStat title="待办事项" value={`${meeting_cnt}项`} icon={Bell} description={`您有${meeting_cnt}项待办需要处理`}/>
			</div>

			<Tabs defaultValue="notices">
				<TabsList>
					<TabsTrigger value="notices">通知公告</TabsTrigger>
					<TabsTrigger value="calendar">工作日历</TabsTrigger>
					<TabsTrigger value="statistics">支部统计</TabsTrigger>
				</TabsList>
				<TabsContent value="notices" className="space-y-4">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between">
							<div>
								<CardTitle>通知管理</CardTitle>
								<CardDescription>发布和管理通知公告</CardDescription>
							</div>
							<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
								<DialogTrigger asChild>
									<Button size="sm">
										<Plus className="mr-2 h-4 w-4"/>
										发布通知
									</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>发布新通知</DialogTitle>
										<DialogDescription>创建一个新的通知公告，将发送给所有党员。</DialogDescription>
									</DialogHeader>
									<div className="grid gap-4 py-4">
										<div className="grid gap-2">
											<Label htmlFor="title">通知标题</Label>
											<Input id="title" placeholder="请输入通知标题"/>
										</div>
										<div className="grid gap-2">
											<Label htmlFor="content">通知内容</Label>
											<Textarea id="content" placeholder="请输入通知内容"
													  className="min-h-[100px]"/>
										</div>
									</div>
									<DialogFooter>
										<Button variant="outline" onClick={() => setIsDialogOpen(false)}>
											取消
										</Button>
										<Button onClick={() => setIsDialogOpen(false)}>发布</Button>
									</DialogFooter>
								</DialogContent>
							</Dialog>
						</CardHeader>

						<CardContent className="space-y-4">
							{notices.map((notice, index) => (
								<div
									key={index}
									className="rounded-xl border p-4 shadow-sm hover:shadow transition duration-200 bg-white"
								>
									<div className="flex justify-between items-start mb-1">
										<h3 className="font-semibold text-base">{notice.title}</h3>
										<div className="flex items-center text-sm text-muted-foreground">
											<CalendarIcon className="h-4 w-4 mr-1"/>
											{notice.publish_date.toDateString()}
										</div>
									</div>
									<p className="text-sm text-muted-foreground">{notice.content}</p>
								</div>
							))}
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="calendar">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between">
							<div>
								<CardTitle className="text-2xl">工作日历</CardTitle>
								<CardDescription>管理党组织活动安排</CardDescription>
							</div>
							<Button size="sm">
								<Plus className="mr-2 h-4 w-4"/>
								添加活动
							</Button>
						</CardHeader>

						<CardContent className="flex flex-col md:flex-row gap-6">
							<div className=" bg-white ">
								<div className="md:w-2/2">
									<Calendar
										mode="single"
										selected={date}
										onSelect={setDate}
										className="rounded-md border shadow-sm"
									/>
								</div>
							</div>

							<div className="md:w-1/2 space-y-4">
								<h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 border-b pb-2">
									<CalendarIcon className="h-5 w-5 text-primary"/>
									{date?.toLocaleDateString("zh-CN", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})} 活动
								</h3>

								{[
									{
										title: "支部党员大会",
										time: "14:00-16:00",
										place: "第一会议室",
									},
									{
										title: "党课学习",
										time: "19:00-20:30",
										place: "线上会议",
									},
								].map((item, index) => (
									<div
										key={index}
										className="bg-primary/5 rounded-lg p-4 shadow-sm border border-primary/10"
									>
										<div className="flex justify-between items-start">
											<div>
												<div className="text-base font-medium text-primary">
													{item.title}
												</div>
												<div
													className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
													<Clock className="w-4 h-4"/>
													{item.time}
												</div>
												<div
													className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
													<MapPin className="w-4 h-4"/>
													{item.place}
												</div>
											</div>
											<div className="flex gap-2">
												<Button size="sm" variant="outline">
													编辑
												</Button>
												<Button size="sm" variant="destructive">
													删除
												</Button>
											</div>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="statistics">
					<Card>
						<CardHeader>
							<CardTitle>支部统计概览</CardTitle>
							<CardDescription>查看党支部整体情况统计</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid gap-8 md:grid-cols-2 md:gap-12">
								<div className="rounded-lg border border-white-100 bg-white p-6 shadow-sm">
									<h3 className="mb-6 text-lg font-semibold text-gray-800 border-b-2 border-red-300 pb-3">
										党员构成
									</h3>
									<div className="space-y-4">
										{[
											['正式党员', '24人', 'bg-blue-100'],
											['预备党员', '10人', 'bg-green-100'],
											['发展对象', '15人', 'bg-amber-100'],
											['入党积极分子', '25人', 'bg-purple-100'],
											['入党申请人', '40人', 'bg-pink-100']
										].map(([label, value, color]) => (
											<div key={label} className="flex items-center justify-between group">
												<div className="flex items-center">
													<span className={`w-2 h-6 ${color} rounded-sm mr-3`}></span>
													<span className="text-gray-600">{label}</span>
												</div>
												<span className="font-medium text-gray-800">{value}</span>
											</div>
										))}
									</div>
								</div>

								<div className="rounded-lg border border-white-100 bg-white p-6 shadow-sm">
									<h3 className="mb-6 text-lg font-semibold text-gray-800 border-b-2 border-red-300 pb-3">
										活动统计
									</h3>
									<div className="space-y-4">
										{[
											['支部党员大会', '4次/年', 'bg-red-100'],
											['支部委员会', '12次/年', 'bg-orange-100'],
											['党小组会', '12次/年', 'bg-yellow-100'],
											['党课', '8次/年', 'bg-green-100'],
											['党日活动', '12次/年', 'bg-blue-100']
										].map(([event, frequency, color]) => (
											<div key={event} className="flex items-center justify-between group">
												<div className="flex items-center">
													<span className={`w-2 h-6 ${color} rounded-sm mr-3`}></span>
													<span className="text-gray-600">{event}</span>
												</div>
												<span className="font-medium text-gray-800">{frequency}</span>
											</div>
										))}
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
