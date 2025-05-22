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
import {useAuth} from "@/hooks/use-auth";
import {getCurrentSemesterActivityCount, isComplete, isEventOnDate} from "@/lib/utils";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useData} from "@/context/data-context";

function countActivitiesThisYear(activities: ActivityType[], type: ActivityType['type']): number {
	const currentYear = new Date().getFullYear();

	return activities.filter(activity => {
		if(activity.type !== type) return false;
		const activityYear = new Date(activity.startTime).getFullYear();
		return activityYear === currentYear;
	}).length;
}


export default function AdminWorkbench() {
	const {NoticeAPI, MemberAPI, MaterialAPI, ActivitiesAPI} = useData();

	const all_notices = NoticeAPI.data
	const all_member = MemberAPI.data
	const all_material = MaterialAPI.data
	const all_activities = ActivitiesAPI.data
	const all_meeting = ActivitiesAPI.data

	const [notifyTitle, setNotifyTitle] = useState('')
	const [notifyContent, setNotifyContent] = useState('')
	const [notifyDate, setNotifyDate] = useState<Date | undefined>(new Date())
	const [isNotifyDialogOpen, setIsNotifyDialogOpen] = useState(false)
	const [selectNotify, setSelectNotify] = useState<NoticeType['id'] | null>(null)

	const [activityTitle, setActivityTitle] = useState('')
	const [activityContent, setActivityContent] = useState('')
	const [activityLocation, setActivityLocation] = useState('')
	const [activityDate, setActivityDate] = useState<string | undefined>('')
	const [activityTime, setActivityTime] = useState<string | undefined>('')
	const [isActivityDialogOpen, setIsActivityDialogOpen] = useState(false)
	const [activityType, setActivityType] = useState<string | undefined>(undefined)
	const [selectActivity, setSelectActivity] = useState<ActivityType['id'] | null>(null)

	const {user} = useAuth();
	if (!user) return null

	const branch = user.branch;
	const branch_user_list = all_member.filter(d => d.branch.id === branch.id);

	const learn_material_cnt = all_material.length;
	const cur_year_activity_cnt = getCurrentSemesterActivityCount(all_activities);
	const meeting_cnt = all_meeting.filter((meeting) => !isComplete(meeting)).length;
	const branch_member_cnt = branch_user_list.filter((user) => user.identity_type === '正式党员' || user.identity_type === '预备党员').length

	const member_cnt_info = [
		['正式党员',    `${all_member.filter((({branch, identity_type}) => branch.id === user.branch.id && identity_type === '正式党员')).length}人`, 'bg-blue-100'],
		['预备党员',    `${all_member.filter((({branch, identity_type}) => branch.id === user.branch.id && identity_type === '预备党员')).length}人`, 'bg-green-100'],
		['发展对象',    `${all_member.filter((({branch, identity_type}) => branch.id === user.branch.id && identity_type === '发展对象')).length}人`, 'bg-amber-100'],
		['入党积极分子', `${all_member.filter((({branch, identity_type}) => branch.id === user.branch.id && identity_type === '入党积极分子')).length}人`, 'bg-purple-100'],
		['入党申请人',   `${all_member.filter((({branch, identity_type}) => branch.id === user.branch.id && identity_type === '入党申请人')).length}人`, 'bg-pink-100']
	]

	const activity_cnt_info = [
		['支部党员大会', 	`${countActivitiesThisYear(all_activities, '支部党员大会')}次/年`, 'bg-red-100'],
		['支部委员会', 	`${countActivitiesThisYear(all_activities, '支部委员会')}次/年`, 'bg-orange-100'],
		['党小组会', 	`${countActivitiesThisYear(all_activities, '党小组会')}次/年`, 'bg-yellow-100'],
		['党课', 		`${countActivitiesThisYear(all_activities, '党课')}次/年`, 'bg-green-100'],
		['党日活动', 	`${countActivitiesThisYear(all_activities, '党日活动')}次/年`, 'bg-blue-100']
	]

	const getActivitiesByDate = (date: Date) => {
		return all_activities.filter(({startTime, endTime}) => isEventOnDate(startTime, endTime, date));
	}

	const handlePublishNotify = async () => {
		if(selectNotify !== null) {
			await NoticeAPI.save({
				id: selectNotify,
				title: notifyTitle,
				content: notifyContent,
				publish_date: new Date(),
				publisher: user
			})
		}
		else {
			await NoticeAPI.add({
				id: 0,
				title: notifyTitle,
				content: notifyContent,
				publish_date: new Date(),
				publisher: user
			})
		}
		setIsNotifyDialogOpen(false)
		setSelectNotify(null)
	}

	const handleChangeNotify = async (id: number) => {
		const {title, content} = all_notices[id];
		setSelectNotify(id);
		setNotifyTitle(title)
		setNotifyContent(content)
		setIsNotifyDialogOpen(true);
	}

	const handleAddActivity = async () => {
		if(activityTime === undefined) return;
		const [startTime, endTime] = activityTime.split('-');

		const startDateTimeStr = `${activityDate}T${startTime}:00`; // 添加秒
		const endDateTimeStr = `${activityDate}T${endTime}:00`;

		if(selectActivity !== null) {
			await ActivitiesAPI.save({
				id: selectActivity,
				title: activityTitle,
				type: activityType as ActivityType['type'],
				startTime: new Date(startDateTimeStr),
				endTime: new Date(endDateTimeStr),
				location: activityLocation,
				content: activityContent,
				remark: "",
				branch: user.branch
			})
		}
		else {
			await ActivitiesAPI.add({
				id: 0,
				title: activityTitle,
				type: activityType as ActivityType['type'],
				startTime: new Date(startDateTimeStr),
				endTime: new Date(endDateTimeStr),
				location: activityLocation,
				content: activityContent,
				remark: "",
				branch: user.branch
			})
		}
		setIsActivityDialogOpen(false)
		setSelectActivity(null)
	}

	const handleChangeActivity = async (id: number) => {
		const {title, content, location, startTime, endTime, type} = all_activities[id];
		setSelectActivity(id);
		setActivityTitle(title)
		setActivityContent(content)
		setActivityLocation(location)
		setActivityDate(startTime.toDateString)
		setActivityTime(`${startTime.getHours()}:${startTime.getMinutes()}-${endTime.getHours()}:${endTime.getMinutes()}`)
		setActivityType(type)
		setIsActivityDialogOpen(true);
	}

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
							<Dialog open={isNotifyDialogOpen} onOpenChange={setIsNotifyDialogOpen}>
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
											<Input id="title"
												value={notifyTitle}
												onChange={ (e) => setNotifyTitle(e.target.value) }
												placeholder="请输入通知标题"
											/>
										</div>
										<div className="grid gap-2">
											<Label htmlFor="content">通知内容</Label>
											<Textarea id="content"
													  value={notifyContent}
													  onChange={ (e) => setNotifyContent(e.target.value) }
													  placeholder="请输入通知内容"
													  className="min-h-[100px]"
											/>
										</div>
									</div>
									<DialogFooter>
										<Button variant="outline" onClick={() => setIsNotifyDialogOpen(false)}>
											取消
										</Button>
										<Button onClick={handlePublishNotify}>{selectNotify === null ? '发布' : '更改'}</Button>
									</DialogFooter>
								</DialogContent>
							</Dialog>
						</CardHeader>

						<CardContent className="space-y-4">
							{all_notices.map((notice, index) => (
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
							<Dialog open={isActivityDialogOpen} onOpenChange={setIsActivityDialogOpen}>
								<DialogTrigger asChild>
									<Button size="sm">
										<Plus className="mr-2 h-4 w-4"/>
										添加活动
									</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>添加活动</DialogTitle>
										<DialogDescription>添加新的党组织活动</DialogDescription>
									</DialogHeader>
									<div className="grid gap-4 py-4">
										<div className="space-y-2">
											<Label htmlFor="title">活动标题</Label>
											<Input
												id="title"
												placeholder="请输入活动标题"
												value={activityTitle}
												onChange={(e) => setActivityTitle(e.target.value)}
											/>
										</div>
										<div className="grid grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label htmlFor="date">活动日期</Label>
												<Input
													id="date"
													type="date"
													value={activityDate}
													onChange={(e) => setActivityDate(e.target.value)}
												/>
											</div>
											<div className="space-y-2">
												<Label htmlFor="time">活动时间</Label>
												<Input
													id="time"
													placeholder="例如：14:00-16:00"
													value={activityTime}
													onChange={(e) => setActivityTime(e.target.value)}
												/>
											</div>
										</div>
										<div className="grid grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label htmlFor="location">活动地点</Label>
												<Input
													id="location"
													placeholder="请输入活动地点"
													value={activityLocation}
													onChange={(e) => setActivityLocation(e.target.value)}
												/>
											</div>
											<div className="space-y-2">
												<Label htmlFor="type">活动类型</Label>
												<Select
													value={activityType}
													onValueChange={(val) => setActivityType(val)}
												>
													<SelectTrigger>
														<SelectValue placeholder="选择活动类型"/>
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="支部党员大会">支部党员大会</SelectItem>
														<SelectItem value="支部委员会">支部委员会</SelectItem>
														<SelectItem value="党小组会">党小组会</SelectItem>
														<SelectItem value="党课">党课</SelectItem>
														<SelectItem value="党日活动">党日活动</SelectItem>
														<SelectItem value="其他">其他</SelectItem>
													</SelectContent>
												</Select>
											</div>
										</div>
										<div className="space-y-2">
											<Label htmlFor="content">活动内容</Label>
											<Textarea
												id="content"
												placeholder="请输入活动内容"
												className="min-h-[100px]"
												value={activityContent}
												onChange={(e) => setActivityContent(e.target.value)}
											/>
										</div>
									</div>
									<DialogFooter>
										<Button variant="outline" onClick={() => setIsActivityDialogOpen(false)}>
											取消
										</Button>
										<Button onClick={handleAddActivity}>{selectActivity === null ? '添加': '更改'}</Button>
									</DialogFooter>
								</DialogContent>
							</Dialog>
						</CardHeader>

						<CardContent className="flex flex-col md:flex-row gap-6">
							<div className=" bg-white ">
								<div className="md:w-2/2">
									<Calendar
										mode="single"
										selected={notifyDate}
										onSelect={setNotifyDate}
										className="rounded-md border shadow-sm"
									/>
								</div>
							</div>

							<div className="md:w-1/2 space-y-4">
								<h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 border-b pb-2">
									<CalendarIcon className="h-5 w-5 text-primary"/>
									{notifyDate?.toLocaleDateString("zh-CN", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})} 活动
								</h3>

								{notifyDate && getActivitiesByDate(notifyDate).map((item, index) => (
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
													{`${item.startTime.toDateString()}-${item.endTime.toDateString()}`}
												</div>
												<div
													className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
													<MapPin className="w-4 h-4"/>
													{item.location}
												</div>
											</div>
											<div className="flex gap-2">
												<Button size="sm" variant="outline" onClick={() => handleChangeActivity(index)}>
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
										{member_cnt_info.map(([label, value, color]) => (
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
										{activity_cnt_info.map(([event, frequency, color]) => (
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
