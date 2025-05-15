"use client"

import {useState} from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Textarea} from "@/components/ui/textarea"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Calendar, Clock, Edit, MapPin, Plus, Search, Trash2, UserCheck, Users} from "lucide-react"
import {useToast} from "@/hooks/use-toast"
import {MemberAttendanceDialog} from "./member-attendance-dialog"
import {ActivitiesAPI} from "@/lib/api";
import {TimeFilterType, timeFilter, isComplete, getDateTimeParts, getDayTimeParts, getActivityMember, getBranchMember} from "@/lib/utils";

// 模拟活动数据
const activities = ActivitiesAPI.get();

export default function ActivityRecordsPage() {
	const [searchTerm, setSearchTerm] = useState("")
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
	const [isMemberDialogOpen, setIsMemberDialogOpen] = useState(false)
	const [selectedActivity, setSelectedActivity] = useState<any>(null)
	const [activitiesList, setActivitiesList] = useState(activities)
	const {toast} = useToast()

	// 过滤活动
	const filterActivities = (filter: TimeFilterType) => {
		return activitiesList
			.filter((activity) => timeFilter(activity.startTime, filter))
			.filter(
				(activity) =>
					activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					activity.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
					activity.location.toLowerCase().includes(searchTerm.toLowerCase()),
			)
			.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()); // 按日期降序排序
	}

	const allActivities = filterActivities(TimeFilterType.ALL)
	const completedActivities = filterActivities(TimeFilterType.BEFORE)
	const upcomingActivities = filterActivities(TimeFilterType.COMPLETE)

	const handleAddActivity = () => {
		setIsAddDialogOpen(false)
		toast({
			title: "添加成功",
			description: "活动已成功添加",
		})
	}

	const handleEditActivity = () => {
		setIsEditDialogOpen(false)
		toast({
			title: "编辑成功",
			description: "活动信息已成功更新",
		})
	}

	const handleDeleteActivity = (activity: any) => {
		toast({
			title: "删除成功",
			description: `活动 "${activity.title}" 已成功删除`,
		})
	}

	const handleOpenMemberDialog = (activity: any) => {
		setSelectedActivity(activity)
		setIsMemberDialogOpen(true)
	}

	const handleSaveMemberAttendance = (members: any[]) => {
		if (!selectedActivity) return

		// 计算参与人数（状态不为空的成员）
		const participantsCount = members.filter((m) => m.status).length

		// 更新活动列表中的成员状态和参与人数
		setActivitiesList(
			activitiesList.map((activity) =>
				activity.id === selectedActivity.id
					? {
						...activity,
						memberStatuses: members,
						participants: participantsCount,
					}
					: activity,
			),
		)

		toast({
			title: "保存成功",
			description: "党员出席情况已成功保存",
		})
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">活动记载</h1>
					<p className="text-muted-foreground">管理党组织活动记录</p>
				</div>
				<Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
					<DialogTrigger asChild>
						<Button>
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
								<Input id="title" placeholder="请输入活动标题"/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="date">活动日期</Label>
									<Input id="date" type="date"/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="time">活动时间</Label>
									<Input id="time" placeholder="例如：14:00-16:00"/>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="location">活动地点</Label>
									<Input id="location" placeholder="请输入活动地点"/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="type">活动类型</Label>
									<Select>
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
								<Textarea id="content" placeholder="请输入活动内容" className="min-h-[100px]"/>
							</div>
						</div>
						<DialogFooter>
							<Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
								取消
							</Button>
							<Button onClick={handleAddActivity}>添加</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			<div className="relative">
				<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
				<Input
					type="search"
					placeholder="搜索活动标题、类型或地点..."
					className="pl-8"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>

			<Tabs defaultValue="all">
				<TabsList>
					<TabsTrigger value="all">全部活动</TabsTrigger>
					<TabsTrigger value="upcoming">未开始</TabsTrigger>
					<TabsTrigger value="completed">已完成</TabsTrigger>
				</TabsList>
				<TabsContent value="all">
					<div className="grid gap-4">
						{allActivities.length > 0 ? (
							allActivities.map((activity) => (
								<Card key={activity.id}>
									<CardHeader className="pb-2">
										<div className="flex items-center justify-between">
											<CardTitle>{activity.name}</CardTitle>
											<Badge
												variant={isComplete(activity) ? "outline" : "secondary"}>{isComplete(activity) ? '已完成': '进行中'}</Badge>
										</div>
										<CardDescription>
											<div className="flex flex-wrap gap-4 mt-2">
												<div className="flex items-center gap-1">
													<Calendar className="h-4 w-4 text-muted-foreground"/>
													<span>{activity.startTime.toDateString()}</span>
												</div>
												<div className="flex items-center gap-1">
													<Clock className="h-4 w-4 text-muted-foreground"/>
													<span>{activity.remark}</span>
												</div>
												<div className="flex items-center gap-1">
													<MapPin className="h-4 w-4 text-muted-foreground"/>
													<span>{activity.location}</span>
												</div>
												<div className="flex items-center gap-1">
													<Users className="h-4 w-4 text-muted-foreground"/>
													<span>
														{isComplete(activity)
															? `${getActivityMember(activity).length}/${getBranchMember(activity.branch).length}人参加`
															: `预计${getBranchMember(activity.branch).length}人参加`}
													</span>
												</div>
											</div>
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-2">
											<div className="flex items-center justify-between">
												<Badge>{activity.type}</Badge>
												<div className="flex space-x-2">
													<Button variant="outline" size="sm"
															onClick={() => handleOpenMemberDialog(activity)}>
														<UserCheck className="mr-2 h-4 w-4"/>
														党员出席
													</Button>
													<Dialog
														open={isEditDialogOpen && selectedActivity?.id === activity.id}
														onOpenChange={(open) => {
															setIsEditDialogOpen(open)
															if (open) setSelectedActivity(activity)
														}}
													>
														<DialogTrigger asChild>
															<Button variant="outline" size="sm">
																<Edit className="mr-2 h-4 w-4"/>
																编辑
															</Button>
														</DialogTrigger>
														<DialogContent>
															<DialogHeader>
																<DialogTitle>编辑活动</DialogTitle>
																<DialogDescription>编辑活动信息</DialogDescription>
															</DialogHeader>
															<div className="grid gap-4 py-4">
																<div className="space-y-2">
																	<Label htmlFor="edit-title">活动标题</Label>
																	<Input id="edit-title"
																		   defaultValue={activity.name}/>
																</div>
																<div className="grid grid-cols-2 gap-4">
																	<div className="space-y-2">
																		<Label htmlFor="edit-date">活动日期</Label>
																		<Input id="edit-date" type="date"
																			   defaultValue={getDateTimeParts(activity.startTime)}/>
																	</div>
																	<div className="space-y-2">
																		<Label htmlFor="edit-time">活动时间</Label>
																		<Input id="edit-time"
																			   defaultValue={getDayTimeParts(activity.startTime)}/>
																	</div>
																</div>
																<div className="grid grid-cols-2 gap-4">
																	<div className="space-y-2">
																		<Label htmlFor="edit-location">活动地点</Label>
																		<Input id="edit-location"
																			   defaultValue={activity.location}/>
																	</div>
																	<div className="space-y-2">
																		<Label htmlFor="edit-type">活动类型</Label>
																		<Select defaultValue={activity.type}>
																			<SelectTrigger>
																				<SelectValue
																					placeholder="选择活动类型"/>
																			</SelectTrigger>
																			<SelectContent>
																				<SelectItem
																					value="学习活动">学习活动</SelectItem>
																				<SelectItem
																					value="实践活动">实践活动</SelectItem>
																				<SelectItem
																					value="志愿服务">志愿服务</SelectItem>
																				<SelectItem
																					value="组织活动">组织活动</SelectItem>
																				<SelectItem
																					value="其他">其他</SelectItem>
																			</SelectContent>
																		</Select>
																	</div>
																</div>
																<div className="grid grid-cols-2 gap-4">
																	<div className="space-y-2">
																		<Label htmlFor="edit-status">活动状态</Label>
																		<Select defaultValue={isComplete(activity) ? '已完成': '未开始'}>
																			<SelectTrigger>
																				<SelectValue
																					placeholder="选择活动状态"/>
																			</SelectTrigger>
																			<SelectContent>
																				<SelectItem
																					value="未开始">未开始</SelectItem>
																				<SelectItem
																					value="已完成">已完成</SelectItem>
																			</SelectContent>
																		</Select>
																	</div>
																	<div className="space-y-2">
																		<Label
																			htmlFor="edit-participants">参与人数</Label>
																		<Input id="edit-participants" type="number"
																			   defaultValue={getBranchMember(activity.branch).length}/>
																	</div>
																</div>
																<div className="space-y-2">
																	<Label htmlFor="edit-content">活动内容</Label>
																	<Textarea
																		id="edit-content"
																		defaultValue={activity.content}
																		className="min-h-[100px]"
																	/>
																</div>
															</div>
															<DialogFooter>
																<Button variant="outline"
																		onClick={() => setIsEditDialogOpen(false)}>
																	取消
																</Button>
																<Button onClick={handleEditActivity}>保存</Button>
															</DialogFooter>
														</DialogContent>
													</Dialog>
													<Button variant="outline" size="sm"
															onClick={() => handleDeleteActivity(activity)}>
														<Trash2 className="mr-2 h-4 w-4"/>
														删除
													</Button>
												</div>
											</div>
											<p className="text-sm">{activity.content}</p>
										</div>
									</CardContent>
								</Card>
							))
						) : (
							<div className="text-center py-4 text-muted-foreground">未找到符合条件的活动</div>
						)}
					</div>
				</TabsContent>
				<TabsContent value="upcoming">
					<div className="grid gap-4">
						{upcomingActivities.length > 0 ? (
							upcomingActivities.map((activity) => (
								<Card key={activity.id}>
									<CardHeader className="pb-2">
										<div className="flex items-center justify-between">
											<CardTitle>{activity.name}</CardTitle>
											<Badge variant="secondary">{isComplete(activity) ? '已完成': '未开始'}</Badge>
										</div>
										<CardDescription>
											<div className="flex flex-wrap gap-4 mt-2">
												<div className="flex items-center gap-1">
													<Calendar className="h-4 w-4 text-muted-foreground"/>
													<span>{getDateTimeParts(activity.startTime)}</span>
												</div>
												<div className="flex items-center gap-1">
													<Clock className="h-4 w-4 text-muted-foreground"/>
													<span>{getDayTimeParts(activity.startTime)}</span>
												</div>
												<div className="flex items-center gap-1">
													<MapPin className="h-4 w-4 text-muted-foreground"/>
													<span>{activity.location}</span>
												</div>
												<div className="flex items-center gap-1">
													<Users className="h-4 w-4 text-muted-foreground"/>
													<span>预计{getBranchMember(activity.branch).length}人参加</span>
												</div>
											</div>
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-2">
											<div className="flex items-center justify-between">
												<Badge>{activity.type}</Badge>
												<div className="flex space-x-2">
													<Button variant="outline" size="sm"
															onClick={() => handleOpenMemberDialog(activity)}>
														<UserCheck className="mr-2 h-4 w-4"/>
														党员出席
													</Button>
													<Button variant="outline" size="sm">
														<Edit className="mr-2 h-4 w-4"/>
														编辑
													</Button>
													<Button variant="outline" size="sm"
															onClick={() => handleDeleteActivity(activity)}>
														<Trash2 className="mr-2 h-4 w-4"/>
														删除
													</Button>
												</div>
											</div>
											<p className="text-sm">{activity.content}</p>
										</div>
									</CardContent>
								</Card>
							))
						) : (
							<div className="text-center py-4 text-muted-foreground">未找到符合条件的未开始活动</div>
						)}
					</div>
				</TabsContent>
				<TabsContent value="completed">
					<div className="grid gap-4">
						{completedActivities.length > 0 ? (
							completedActivities.map((activity) => (
								<Card key={activity.id}>
									<CardHeader className="pb-2">
										<div className="flex items-center justify-between">
											<CardTitle>{activity.name}</CardTitle>
											<Badge variant="outline">{isComplete(activity) ? '已完成': '未开始'}</Badge>
										</div>
										<CardDescription>
											<div className="flex flex-wrap gap-4 mt-2">
												<div className="flex items-center gap-1">
													<Calendar className="h-4 w-4 text-muted-foreground"/>
													<span>{getDateTimeParts(activity.startTime)}</span>
												</div>
												<div className="flex items-center gap-1">
													<Clock className="h-4 w-4 text-muted-foreground"/>
													<span>{getDayTimeParts(activity.startTime)}</span>
												</div>
												<div className="flex items-center gap-1">
													<MapPin className="h-4 w-4 text-muted-foreground"/>
													<span>{activity.location}</span>
												</div>
												<div className="flex items-center gap-1">
													<Users className="h-4 w-4 text-muted-foreground"/>
													<span>
														{getActivityMember(activity).length}/{getBranchMember(activity.branch).length}人参加
													</span>
												</div>
											</div>
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-2">
											<div className="flex items-center justify-between">
												<Badge>{activity.type}</Badge>
												<div className="flex space-x-2">
													<Button variant="outline" size="sm"
															onClick={() => handleOpenMemberDialog(activity)}>
														<UserCheck className="mr-2 h-4 w-4"/>
														党员出席
													</Button>
													<Button variant="outline" size="sm">
														<Edit className="mr-2 h-4 w-4"/>
														编辑
													</Button>
													<Button variant="outline" size="sm"
															onClick={() => handleDeleteActivity(activity)}>
														<Trash2 className="mr-2 h-4 w-4"/>
														删除
													</Button>
												</div>
											</div>
											<p className="text-sm">{activity.content}</p>
										</div>
									</CardContent>
								</Card>
							))
						) : (
							<div className="text-center py-4 text-muted-foreground">未找到符合条件的已完成活动</div>
						)}
					</div>
				</TabsContent>
			</Tabs>

			{/* 党员出席情况对话框 */}
			<MemberAttendanceDialog
				open={isMemberDialogOpen}
				onOpenChange={setIsMemberDialogOpen}
				activityId={selectedActivity?.id}
				onSave={handleSaveMemberAttendance}
			/>
		</div>
	)
}
