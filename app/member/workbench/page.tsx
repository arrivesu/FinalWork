"use client"

import {useEffect, useState} from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {CardStat} from "@/components/ui/card-stat"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Calendar} from "@/components/ui/calendar"
import {Activity, Bell, BookOpen, CalendarIcon, Clock, MapPin, Users} from "lucide-react"
import {ActivityJoinAPI, MaterialAPI, MeetingAPI, NoticeAPI} from "@/lib/api";
import {useAuth} from "@/hooks/use-auth";
import {diffInYMD, isComplete} from "@/lib/utils";

// 模拟数据
const notices = NoticeAPI.get();
const material = MaterialAPI.get();
const meetings = MeetingAPI.get();
const join_data = ActivityJoinAPI.get();

export default function MemberWorkbench() {
	const [date, setDate] = useState<Date | undefined>(new Date())

	const { user } = useAuth();

	if (!user) return null

	const duration = diffInYMD(user.join_date, new Date());
	const duration_str = `${duration.years}年${duration.months}个月`

	const join_times = join_data.filter((join) => join.member.id === user.id).length;

	const todo_cnt = meetings.map((meeting) => !isComplete(meeting)).length;

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">工作台</h1>
				<p className="text-muted-foreground">欢迎回来，{user.name}！这里是您的党员工作台。</p>
			</div>


			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 bg-white p-6 rounded-xl shadow-sm">
				<CardStat title="党龄" value={duration_str} icon={Users} description="入党时间：2021-02-15"/>
				<CardStat title="参与活动" value={`${join_times}`} icon={Activity} description="本年度已参与活动次数"/>
				<CardStat title="学习资料" value={`${material.length}篇`} icon={BookOpen} description="已学习的党课资料数量"/>
				<CardStat title="待办事项" value={`${todo_cnt}项`} icon={Bell} description={`您有${todo_cnt}项待办需要处理`}/>
			</div>


			<Tabs defaultValue="notices">
				<TabsList>
					<TabsTrigger value="notices">通知公告</TabsTrigger>
					<TabsTrigger value="calendar">工作日历</TabsTrigger>
				</TabsList>

				<TabsContent value="notices" className="space-y-4">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between">
							<div>
								<CardTitle>最新通知</CardTitle>
								<CardDescription>查看近期党组织活动安排</CardDescription>
							</div>
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
								<CardDescription>查看近期党组织活动安排</CardDescription>
							</div>
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

								{MeetingAPI.get().map((item, index) => (
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
													{item.startTime.toDateString()}
												</div>
												<div
													className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
													<MapPin className="w-4 h-4"/>
													{item.location}
												</div>
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
