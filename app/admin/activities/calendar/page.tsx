"use client"

import React, {useEffect} from "react"
import {useMemo, useState} from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
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
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Textarea} from "@/components/ui/textarea"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {CalendarIcon, CalendarPlus2Icon as CalendarIcon2, Clock, Edit, MapPin, Plus, Trash2} from "lucide-react"
import {useToast} from "@/hooks/use-toast"
import {Badge} from "@/components/ui/badge"
import {ActivitiesAPI} from "@/lib/api";

// 模拟活动数据 - 添加了更多事件
const initialActivities = ActivitiesAPI.data;

// 活动类型对应的颜色
const typeColors = {
	meeting: "bg-blue-500",
	lecture: "bg-green-500",
	activity: "bg-orange-500",
	other: "bg-purple-500",
}

// 活动类型对应的中文名称
const typeNames = {
	meeting: "会议",
	lecture: "党课",
	activity: "党日活动",
	other: "其他",
}

export default function WorkCalendarPage() {
	const [date, setDate] = useState<Date | undefined>(new Date())
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
	const [activities, setActivities] = useState(initialActivities)
	const [activeTab, setActiveTab] = useState("today")
	const [newActivity, setNewActivity] = useState<ActivityType>(ActivitiesAPI.createEmpty())
	const {toast} = useToast()

	// 获取选定日期的活动
	const getActivitiesByDate = (selectedDate: Date | undefined) => {
		if (!selectedDate) return []

		return activities.filter((activity) => activity.startTime === selectedDate)
	}

	// 获取未来的活动
	const futureActivities = useMemo(() => {
		const today = new Date()
		today.setHours(0, 0, 0, 0)

		return activities
			.filter((activity) => {
				const activityDate = new Date(activity.startTime)
				return activityDate >= today
			})
			.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
	}, [activities])

	// 获取有活动的日期
	const eventDates = useMemo(() => {
		const dates = new Set<Date>()
		activities.forEach((activity) => {
			dates.add(activity.startTime)
		})
		return Array.from(dates)
	}, [activities])

	const selectedDateActivities = getActivitiesByDate(date)

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const {id, value} = e.target
		setNewActivity((prev) => ({
			...prev,
			[id]: value,
		}))
	}

	const handleSelectChange = (value: ActivityType['type']) => {
		setNewActivity((prev) => ({
			...prev,
			type: value,
		}))
	}

	const handleAddActivity = async () => {
		if (!newActivity.title || !newActivity.startTime || !newActivity.startTime || !newActivity.location || !newActivity.type) {
			toast({
				title: "添加失败",
				description: "请填写所有必填字段",
				variant: "destructive",
			})
			return
		}

		const activityToAdd = await ActivitiesAPI.add(newActivity)

		setActivities((prev) => [...prev, activityToAdd])
		setIsAddDialogOpen(false)
		setNewActivity(ActivitiesAPI.createEmpty())

		toast({
			title: "添加成功",
			description: "活动已成功添加到日历",
		})
	}

	const handleEditActivity = (activity: any) => {
		toast({
			title: "编辑成功",
			description: `活动 "${activity.title}" 已成功更新`,
		})
	}

	const handleDeleteActivity = (activityId: number) => {
		setActivities((prev) => prev.filter((activity) => activity.id !== activityId))

		toast({
			title: "删除成功",
			description: "活动已成功删除",
		})
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">工作日历</h1>
					<p className="text-muted-foreground">管理党组织活动安排</p>
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

			<div className="grid gap-6 md:grid-cols-[auto_1fr]">
				<Card className="md:col-span-1">
					<CardHeader>
						<CardTitle>日历</CardTitle>
						<CardDescription>选择日期查看活动安排</CardDescription>
					</CardHeader>
					<CardContent>
						<Calendar
							mode="single"
							selected={date}
							onSelect={setDate}
							className="rounded-md border"
						/>
						<div className="mt-4 flex flex-wrap gap-2">
							<div className="flex items-center gap-2">
								<div className="h-3 w-3 rounded-full bg-blue-500"></div>
								<span className="text-xs">会议</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="h-3 w-3 rounded-full bg-green-500"></div>
								<span className="text-xs">党课</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="h-3 w-3 rounded-full bg-orange-500"></div>
								<span className="text-xs">党日活动</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="h-3 w-3 rounded-full bg-purple-500"></div>
								<span className="text-xs">其他</span>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="md:col-span-1">
					<CardHeader>
						<div className="flex items-center justify-between">
							<div>
								<CardTitle>活动安排</CardTitle>
								<CardDescription>查看和管理活动安排</CardDescription>
							</div>
							<Button size="sm" variant="outline" onClick={() => setIsAddDialogOpen(true)}>
								<Plus className="mr-2 h-4 w-4"/>
								添加
							</Button>
						</div>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="today" value={activeTab} onValueChange={setActiveTab}>
							<TabsList className="mb-4">
								<TabsTrigger value="today">当日活动</TabsTrigger>
								<TabsTrigger value="upcoming">未来活动</TabsTrigger>
							</TabsList>

							<TabsContent value="today" className="space-y-4">
								<div className="text-sm font-medium">
									{date?.toLocaleDateString("zh-CN", {
										year: "numeric",
										month: "long",
										day: "numeric"
									})}
								</div>

								{selectedDateActivities.length > 0 ? (
									selectedDateActivities.map((activity) => (
										<div key={activity.id} className="border rounded-lg p-4">
											<div className="flex justify-between items-start">
												<div className="flex items-center gap-2">
													<div
														className={`h-3 w-3 rounded-full ${typeColors[activity.type as keyof typeof typeColors]}`}
													></div>
													<h3 className="font-medium">{activity.title}</h3>
													<Badge
														variant="outline">{typeNames[activity.type as keyof typeof typeNames]}</Badge>
												</div>
												<div className="flex space-x-2">
													<Button variant="ghost" size="icon"
															onClick={() => handleEditActivity(activity)}>
														<Edit className="h-4 w-4"/>
													</Button>
													<Button variant="ghost" size="icon"
															onClick={() => handleDeleteActivity(activity.id)}>
														<Trash2 className="h-4 w-4"/>
													</Button>
												</div>
											</div>
											<div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
												<div className="flex items-center gap-1">
													<Clock className="h-4 w-4"/>
													<span>{activity.startTime.toDateString()}</span>
												</div>
												<div className="flex items-center gap-1">
													<MapPin className="h-4 w-4"/>
													<span>{activity.location}</span>
												</div>
											</div>
											<p className="mt-2 text-sm whitespace-pre-line">{activity.content}</p>
										</div>
									))
								) : (
									<div className="text-center py-8 text-muted-foreground">
										<CalendarIcon className="mx-auto h-12 w-12 opacity-30"/>
										<p className="mt-2">当天暂无活动安排</p>
										<Button variant="outline" className="mt-4"
												onClick={() => setIsAddDialogOpen(true)}>
											添加活动
										</Button>
									</div>
								)}
							</TabsContent>

							<TabsContent value="upcoming" className="space-y-4">
								{futureActivities.length > 0 ? (
									futureActivities.map((activity) => (
										<div key={activity.id} className="border rounded-lg p-4">
											<div className="flex justify-between items-start">
												<div className="flex items-center gap-2">
													<div
														className={`h-3 w-3 rounded-full ${typeColors[activity.type as keyof typeof typeColors]}`}
													></div>
													<h3 className="font-medium">{activity.title}</h3>
													<Badge
														variant="outline">{typeNames[activity.type as keyof typeof typeNames]}</Badge>
												</div>
												<div className="flex space-x-2">
													<Button variant="ghost" size="icon"
															onClick={() => handleEditActivity(activity)}>
														<Edit className="h-4 w-4"/>
													</Button>
													<Button variant="ghost" size="icon"
															onClick={() => handleDeleteActivity(activity.id)}>
														<Trash2 className="h-4 w-4"/>
													</Button>
												</div>
											</div>
											<div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
												<div className="flex items-center gap-1">
													<CalendarIcon2 className="h-4 w-4"/>
													<span>
														{new Date(activity.startTime).toLocaleDateString("zh-CN", {
															year: "numeric",
															month: "long",
															day: "numeric",
														})}
													</span>
												</div>
												<div className="flex items-center gap-1">
													<Clock className="h-4 w-4"/>
													<span>{activity.startTime.toDateString()}</span>
												</div>
												<div className="flex items-center gap-1">
													<MapPin className="h-4 w-4"/>
													<span>{activity.location}</span>
												</div>
											</div>
											<p className="mt-2 text-sm whitespace-pre-line">{activity.content}</p>
										</div>
									))
								) : (
									<div className="text-center py-8 text-muted-foreground">
										<CalendarIcon className="mx-auto h-12 w-12 opacity-30"/>
										<p className="mt-2">暂无未来活动安排</p>
										<Button variant="outline" className="mt-4"
												onClick={() => setIsAddDialogOpen(true)}>
											添加活动
										</Button>
									</div>
								)}
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
