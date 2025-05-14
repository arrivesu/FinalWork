"use client"

import {useState} from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Calendar, Clock, MapPin, Search, Users} from "lucide-react"
import {ActivitiesAPI} from "@/lib/api";
import {
	getActivityMember, getStatus,
	getBranchMember,
	getDateTimeParts,
	getDayTimeParts,
	isComplete,
	timeFilter,
	TimeFilterType
} from "@/lib/utils";

// 模拟党日活动数据
const activities = ActivitiesAPI.get();

export default function ActivitiesPage() {
	const [searchTerm, setSearchTerm] = useState("")

	// 过滤活动
	const filterActivities = (status: TimeFilterType) => {
		return activities
			.filter((activity) => status === "all" || timeFilter(activity.date, status))
			.filter(
				(activity) =>
					activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					activity.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
					activity.location.toLowerCase().includes(searchTerm.toLowerCase()),
			)
			.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // 按日期降序排序
	}

	const allActivities = filterActivities(TimeFilterType.ALL)
	const completedActivities = filterActivities(TimeFilterType.COMPLETE)
	const upcomingActivities = filterActivities(TimeFilterType.BEFORE)

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
											<CardTitle>{activity.name}</CardTitle>
											<Badge
												variant={isComplete(activity) ? "outline" : "secondary"}>{isComplete(activity)? '已完成': '未完成'}</Badge>
										</div>
										<CardDescription>
											<div className="flex flex-wrap gap-4 mt-2">
												<div className="flex items-center gap-1">
													<Calendar className="h-4 w-4 text-muted-foreground"/>
													<span>{getDateTimeParts(activity.date)}</span>
												</div>
												<div className="flex items-center gap-1">
													<Clock className="h-4 w-4 text-muted-foreground"/>
													<span>{getDayTimeParts(activity.date)}</span>
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
											<CardTitle>{activity.name}</CardTitle>
											<Badge variant="secondary">{getStatus(activity)}</Badge>
										</div>
										<CardDescription>
											<div className="flex flex-wrap gap-4 mt-2">
												<div className="flex items-center gap-1">
													<Calendar className="h-4 w-4 text-muted-foreground"/>
													<span>{getDateTimeParts(activity.date)}</span>
												</div>
												<div className="flex items-center gap-1">
													<Clock className="h-4 w-4 text-muted-foreground"/>
													<span>{getDayTimeParts(activity.date)}</span>
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
											<CardTitle>{activity.name}</CardTitle>
											<Badge variant="outline">{getStatus(activity)}</Badge>
										</div>
										<CardDescription>
											<div className="flex flex-wrap gap-4 mt-2">
												<div className="flex items-center gap-1">
													<Calendar className="h-4 w-4 text-muted-foreground"/>
													<span>{getDateTimeParts(activity.date)}</span>
												</div>
												<div className="flex items-center gap-1">
													<Clock className="h-4 w-4 text-muted-foreground"/>
													<span>{getDayTimeParts(activity.date)}</span>
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
