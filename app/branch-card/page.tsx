"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Avatar, AvatarFallback} from "@/components/ui/avatar"
import {Badge} from "@/components/ui/badge"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {BookOpen, Building, Calendar, Download, Mail, MapPin, Share2, Users} from "lucide-react"
import {Button} from "@/components/ui/button"
import Image from "next/image"

export default function BranchCardPage() {
	// 模拟党支部数据
	const branchData = {
		name: "数据学生党支部",
		code: "CPC-CS-001",
		foundDate: "2010-06-01",
		location: "计算机科学与技术学院石鳞大楼",
		phone: "010-12345678",
		hierarchy: "数据学院党委",
		email: "cs-party@university.edu.cn",
		memberCount: {
			total: 34,
			formal: 24,
			probationary: 10,

		},
		secretary: {
			name: "陆晨",
			phone: "13712345678",
			email: "luchen@university.edu.cn",
		},


		committees: [
			{
				name: "徐若瑄",
				position: "组织委员",
				// avatar: "/everyday-life.png",
			},
			{
				name: "黄俊杰",
				position: "纪检委员",
				// avatar: "/elderly-man-tea.png",
			},
		],
		achievements: [
			{
				title: "2023年度优秀党支部",
				date: "2023-12-15",
				description: "在年度评比中获得校级优秀党支部称号",
			},
			{
				title: "2022年度党建工作先进集体",
				date: "2022-12-20",
				description: "在党建工作评比中获得先进集体称号",
			},
			{
				title: "2021年度红旗党支部",
				date: "2021-12-18",
				description: "在年度评比中获得校级红旗党支部称号",
			},
		],
		recentActivities: [
			{
				title: "学习贯彻党的二十大精神专题党课",
				date: "2024-03-15",
				type: "党课",
				location: "线上会议",
				participants: 34,
			},
			{
				title: "党员志愿服务活动",
				date: "2024-03-10",
				type: "志愿服务",
				location: "社区服务中心",
				participants: 28,
			},
			{
				title: "2024年第一季度党员大会",
				date: "2024-03-01",
				type: "党员大会",
				location: "学院会议室",
				participants: 34,
			},
		],
		documents: [
			{
				title: "党支部工作条例",
				type: "规章制度",
				date: "2023-01-10",
				size: "1.2MB",
			},
			{
				title: "2024年工作计划",
				type: "工作计划",
				date: "2024-01-05",
				size: "0.8MB",
			},
			{
				title: "2023年工作总结",
				type: "工作总结",
				date: "2023-12-28",
				size: "1.5MB",
			},
		],
	}

	return (
		<div className="container mx-auto py-6 space-y-8">
			{/* 页面标题 */}
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold tracking-wider">党支部名片</h1>
					<p className="text-muted-foreground mt-1">查看党支部基本信息和工作动态</p>
				</div>
				<div className="flex gap-2">
					<Button variant="outline" size="sm">
						<Share2 className="mr-2 h-4 w-4"/>
						分享
					</Button>
					<Button variant="outline" size="sm">
						<Download className="mr-2 h-4 w-4"/>
						导出PDF
					</Button>
				</div>
			</div>

			{/* 党支部基本信息卡片 */}
			<div className="grid gap-6 md:grid-cols-3">
				{/* 党支部信息 */}
				<Card className="md:col-span-2 ">
					<CardHeader className="bg-red-50 flex flex-row items-center justify-between">
						<div>
							<CardTitle className="text-xl text-red-800">{branchData.name}</CardTitle>
							<CardDescription>支部编号: {branchData.code}</CardDescription>
						</div>
						<div className="flex items-center flex-shrink-0">
							<Image
								src="https://p3.img.cctvpic.com/photoworkspace/contentimg/2021/07/09/2021070916100758523.png"
								alt="中国共产党党徽"
								width={60}
								height={60}
							/>
						</div>
					</CardHeader>
					<CardContent className="pt-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-3">
								<div className="flex items-center gap-2">
									<Calendar className="h-4 w-4 "/>
									<span className="font-medium">成立时间:</span>
									<span>{branchData.foundDate}</span>
								</div>
								<div className="flex items-center gap-2">
									<MapPin className="h-4 w-4"/>
									<span className="font-medium">支部地址:</span>
									<span>{branchData.location}</span>
								</div>
								<div className="flex items-center gap-2">
									<Mail className="h-4 w-4 "/>
									<span className="font-medium">电子邮箱:</span>
									<span>{branchData.email}</span>
								</div>
							</div>
							<div className="space-y-3">
								<div className="flex items-center gap-2">
									<Building className="h-4 w-4 "/>
									<span className="font-medium">上级组织:</span>
									<span>{branchData.hierarchy}</span>
								</div>
								<div className="flex items-center gap-2">
									<Users className="h-4 w-4 "/>
									<span className="font-medium">党员人数:</span>
									<span>共 {branchData.memberCount.total} 人</span>
								</div>
								<div className="flex items-center gap-2 pl-6">
                  <span className="text-sm text-muted-foreground">
                    正式党员 {branchData.memberCount.formal} 人， 预备党员 {branchData.memberCount.probationary} 人
                  </span>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* 支部书记信息 */}
				<Card className="bt-4">
					<CardHeader className="bg-red-50">
						<CardTitle className="text-lg text-red-800">支部书记</CardTitle>
					</CardHeader>
					<CardContent className="pt-4">
						<div className="flex items-center space-x-4">
							<Avatar className="h-16 w-16">
								<AvatarFallback>{branchData.secretary.name.substring(branchData.secretary.name.length - 2)}</AvatarFallback>
							</Avatar>
							<div>
								<p className="text-xl font-semibold">{branchData.secretary.name}</p>
								<p className="text-sm text-muted-foreground mt-1">{branchData.secretary.phone}</p>
								<p className="text-sm text-muted-foreground">{branchData.secretary.email}</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* 支部委员 */}
			<Card className="bt-4">
				<CardHeader className="bg-red-50">
					<CardTitle className="text-lg text-red-800">支部委员</CardTitle>
					<CardDescription>党支部委员成员</CardDescription>
				</CardHeader>
				<CardContent className="pt-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{branchData.committees.map((committee, index) => (
							<div key={index}
								 className="flex items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
								<Avatar className="h-12 w-12 mr-4">
									<AvatarFallback>{committee.name.substring(committee.name.length - 2)}</AvatarFallback>
								</Avatar>
								<div>
									<p className="font-medium">{committee.name}</p>
									<p className="text-sm text-muted-foreground">{committee.position}</p>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* 支部荣誉、近期活动和支部文档 */}
			<Tabs defaultValue="activities" className="w-full">
				<TabsList className="grid w-full grid-cols-1">
					<TabsTrigger value="activities">近期活动</TabsTrigger>
				</TabsList>

				{/* 近期活动 */}
				<TabsContent value="activities" className="mt-4">
					<Card className="bt-4">
						<CardHeader className="bg-red-50">
							<CardTitle className="text-lg text-red-800">近期活动</CardTitle>
							<CardDescription>党支部近期开展的活动</CardDescription>
						</CardHeader>
						<CardContent className="pt-4">
							<div className="space-y-4">
								{branchData.recentActivities.map((activity, index) => (
									<div
										key={index}
										className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
									>
										<div className="bg-red-100 p-2 rounded-full">
											<BookOpen className="h-6 w-6 text-red-600"/>
										</div>
										<div className="flex-1">
											<div className="flex flex-wrap items-center justify-between gap-2">
												<h4 className="font-semibold">{activity.title}</h4>
												<Badge>{activity.type}</Badge>
											</div>
											<div
												className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2 text-sm text-muted-foreground">
												<div className="flex items-center gap-1">
													<Calendar className="h-3 w-3"/>
													<span>{activity.date}</span>
												</div>
												<div className="flex items-center gap-1">
													<MapPin className="h-3 w-3"/>
													<span>{activity.location}</span>
												</div>
												<div className="flex items-center gap-1">
													<Users className="h-3 w-3"/>
													<span>{activity.participants} 人参与</span>
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
