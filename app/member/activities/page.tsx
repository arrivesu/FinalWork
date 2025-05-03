"use client"

import {useState} from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Calendar, Clock, MapPin, Search, Users} from "lucide-react"

// 模拟党日活动数据
const activities = [
	{
		id: "1",
		title: "参观革命历史纪念馆",
		date: "2023-12-20",
		time: "09:00-12:00",
		location: "市革命历史纪念馆",
		type: "实践活动",
		status: "未开始",
		participants: 35,
		totalMembers: 42,
		content: "组织党员参观革命历史纪念馆，学习革命历史，传承红色基因。",
	},
	{
		id: "2",
		title: "社区志愿服务活动",
		date: "2023-11-15",
		time: "14:00-17:00",
		location: "和平社区",
		type: "志愿服务",
		status: "已完成",
		participants: 30,
		totalMembers: 42,
		content: "组织党员到社区开展志愿服务，包括环境清洁、为老人提供帮助等。",
	},
	{
		id: "3",
		title: "学习贯彻党的二十大精神",
		date: "2023-10-25",
		time: "19:00-21:00",
		location: "线上会议",
		type: "学习活动",
		status: "已完成",
		participants: 40,
		totalMembers: 42,
		content: "组织党员学习贯彻党的二十大精神，深入理解党的二十大报告内容。",
	},
	{
		id: "4",
		title: "党员先锋岗评选活动",
		date: "2023-09-18",
		time: "14:00-16:00",
		location: "第一会议室",
		type: "组织活动",
		status: "已完成",
		participants: 38,
		totalMembers: 41,
		content: "开展党员先锋岗评选活动，表彰先进党员，激励党员发挥先锋模范作用。",
	},
	{
		id: "5",
		title: "重温入党誓词活动",
		date: "2024-01-15",
		time: "10:00-11:30",
		location: "党员活动室",
		type: "组织活动",
		status: "未开始",
		participants: 0,
		totalMembers: 42,
		content: "组织党员重温入党誓词，牢记入党初心，坚定理想信念。",
	},
]

export default function ActivitiesPage() {
	const [searchTerm, setSearchTerm] = useState("")

	// 过滤活动
	const filterActivities = (status: string) => {
		return activities
			.filter((activity) => status === "all" || activity.status === status)
			.filter(
				(activity) =>
					activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					activity.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
					activity.location.toLowerCase().includes(searchTerm.toLowerCase()),
			)
			.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // 按日期降序排序
	}

	const allActivities = filterActivities("all")
	const completedActivities = filterActivities("已完成")
	const upcomingActivities = filterActivities("未开始")

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">党日活动</h1>
				<p className="text-muted-foreground">查看党支部组织的党日活动</p>
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
											<CardTitle>{activity.title}</CardTitle>
											<Badge
												variant={activity.status === "已完成" ? "outline" : "secondary"}>{activity.status}</Badge>
										</div>
										<CardDescription>
											<div className="flex flex-wrap gap-4 mt-2">
												<div className="flex items-center gap-1">
													<Calendar className="h-4 w-4 text-muted-foreground"/>
													<span>{activity.date}</span>
												</div>
												<div className="flex items-center gap-1">
													<Clock className="h-4 w-4 text-muted-foreground"/>
													<span>{activity.time}</span>
												</div>
												<div className="flex items-center gap-1">
													<MapPin className="h-4 w-4 text-muted-foreground"/>
													<span>{activity.location}</span>
												</div>
												<div className="flex items-center gap-1">
													<Users className="h-4 w-4 text-muted-foreground"/>
													<span>
                            {activity.status === "已完成"
								? `${activity.participants}/${activity.totalMembers}人参加`
								: `预计${activity.totalMembers}人参加`}
                          </span>
												</div>
											</div>
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-2">
											<div className="flex items-center justify-between">
												<Badge>{activity.type}</Badge>
											</div>
											<p className="text-sm">{activity.content}</p>
											<div className="flex justify-end mt-4">
												<Button variant="outline">查看详情</Button>
											</div>
										</div>
									</CardContent>
								</Card>
							))
						) : (
							<div className="text-center py-4 text-muted-foreground">未找到符合条件的党日活动</div>
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
											<CardTitle>{activity.title}</CardTitle>
											<Badge variant="secondary">{activity.status}</Badge>
										</div>
										<CardDescription>
											<div className="flex flex-wrap gap-4 mt-2">
												<div className="flex items-center gap-1">
													<Calendar className="h-4 w-4 text-muted-foreground"/>
													<span>{activity.date}</span>
												</div>
												<div className="flex items-center gap-1">
													<Clock className="h-4 w-4 text-muted-foreground"/>
													<span>{activity.time}</span>
												</div>
												<div className="flex items-center gap-1">
													<MapPin className="h-4 w-4 text-muted-foreground"/>
													<span>{activity.location}</span>
												</div>
												<div className="flex items-center gap-1">
													<Users className="h-4 w-4 text-muted-foreground"/>
													<span>预计{activity.totalMembers}人参加</span>
												</div>
											</div>
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-2">
											<div className="flex items-center justify-between">
												<Badge>{activity.type}</Badge>
											</div>
											<p className="text-sm">{activity.content}</p>
											<div className="flex justify-end mt-4">
												<Button variant="outline">查看详情</Button>
											</div>
										</div>
									</CardContent>
								</Card>
							))
						) : (
							<div className="text-center py-4 text-muted-foreground">未找到符合条件的未开始党日活动</div>
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
											<CardTitle>{activity.title}</CardTitle>
											<Badge variant="outline">{activity.status}</Badge>
										</div>
										<CardDescription>
											<div className="flex flex-wrap gap-4 mt-2">
												<div className="flex items-center gap-1">
													<Calendar className="h-4 w-4 text-muted-foreground"/>
													<span>{activity.date}</span>
												</div>
												<div className="flex items-center gap-1">
													<Clock className="h-4 w-4 text-muted-foreground"/>
													<span>{activity.time}</span>
												</div>
												<div className="flex items-center gap-1">
													<MapPin className="h-4 w-4 text-muted-foreground"/>
													<span>{activity.location}</span>
												</div>
												<div className="flex items-center gap-1">
													<Users className="h-4 w-4 text-muted-foreground"/>
													<span>
                            {activity.participants}/{activity.totalMembers}人参加
                          </span>
												</div>
											</div>
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-2">
											<div className="flex items-center justify-between">
												<Badge>{activity.type}</Badge>
											</div>
											<p className="text-sm">{activity.content}</p>
											<div className="flex justify-end mt-4">
												<Button variant="outline">查看详情</Button>
											</div>
										</div>
									</CardContent>
								</Card>
							))
						) : (
							<div className="text-center py-4 text-muted-foreground">未找到符合条件的已完成党日活动</div>
						)}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	)
}
