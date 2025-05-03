"use client"

import {useState} from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Download, ExternalLink, FileText, Search, Video} from "lucide-react"

// 模拟学习资料数据
const resources = [
	{
		id: "1",
		title: "习近平新时代中国特色社会主义思想学习纲要",
		type: "document",
		category: "理论学习",
		date: "2023-10-15",
		size: "2.5MB",
		downloads: 156,
	},
	{
		id: "2",
		title: "党的二十大报告学习辅导材料",
		type: "document",
		category: "理论学习",
		date: "2023-09-20",
		size: "3.8MB",
		downloads: 245,
	},
	{
		id: "3",
		title: "中国共产党简史",
		type: "document",
		category: "党史学习",
		date: "2023-08-10",
		size: "5.2MB",
		downloads: 189,
	},
	{
		id: "4",
		title: "党章学习辅导",
		type: "document",
		category: "党章学习",
		date: "2023-07-15",
		size: "1.8MB",
		downloads: 210,
	},
	{
		id: "5",
		title: "党的二十大精神解读视频",
		type: "video",
		category: "理论学习",
		date: "2023-11-05",
		size: "120MB",
		downloads: 98,
	},
	{
		id: "6",
		title: "党史学习教育专题片",
		type: "video",
		category: "党史学习",
		date: "2023-06-20",
		size: "150MB",
		downloads: 76,
	},
]

export default function ResourcesPage() {
	const [searchTerm, setSearchTerm] = useState("")

	// 过滤资料
	const filterResources = (category: string) => {
		return resources
			.filter((resource) => category === "all" || resource.category === category)
			.filter(
				(resource) =>
					resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					resource.type.toLowerCase().includes(searchTerm.toLowerCase()),
			)
	}

	const allResources = filterResources("all")
	const theoryResources = filterResources("理论学习")
	const historyResources = filterResources("党史学习")
	const charterResources = filterResources("党章学习")

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">党课资源</h1>
				<p className="text-muted-foreground">查看和下载党课学习资料</p>
			</div>

			<div className="relative">
				<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
				<Input
					type="search"
					placeholder="搜索资料标题或类型..."
					className="pl-8"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>

			<Tabs defaultValue="all">
				<TabsList>
					<TabsTrigger value="all">全部</TabsTrigger>
					<TabsTrigger value="theory">理论学习</TabsTrigger>
					<TabsTrigger value="history">党史学习</TabsTrigger>
					<TabsTrigger value="charter">党章学习</TabsTrigger>
				</TabsList>
				<TabsContent value="all">
					<Card>
						<CardHeader>
							<CardTitle>全部资料</CardTitle>
							<CardDescription>所有党课学习资料，共 {allResources.length} 项</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid gap-4">
								{allResources.length > 0 ? (
									allResources.map((resource) => (
										<div key={resource.id}
											 className="flex items-center justify-between p-4 border rounded-lg">
											<div className="flex items-center space-x-4">
												<div className="p-2 rounded-full bg-muted">
													{resource.type === "document" ? (
														<FileText className="h-5 w-5 text-muted-foreground"/>
													) : (
														<Video className="h-5 w-5 text-muted-foreground"/>
													)}
												</div>
												<div>
													<p className="font-medium">{resource.title}</p>
													<div className="flex items-center gap-2 mt-1">
														<Badge variant="outline">{resource.category}</Badge>
														<p className="text-xs text-muted-foreground">
															上传时间: {resource.date} | 大小: {resource.size} |
															下载次数: {resource.downloads}
														</p>
													</div>
												</div>
											</div>
											<div className="flex space-x-2">
												<Button variant="outline" size="sm">
													<Download className="mr-2 h-4 w-4"/>
													下载
												</Button>
												<Button variant="outline" size="sm">
													<ExternalLink className="mr-2 h-4 w-4"/>
													查看
												</Button>
											</div>
										</div>
									))
								) : (
									<div
										className="text-center py-4 text-muted-foreground">未找到符合条件的学习资料</div>
								)}
							</div>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="theory">
					<Card>
						<CardHeader>
							<CardTitle>理论学习</CardTitle>
							<CardDescription>理论学习相关资料，共 {theoryResources.length} 项</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid gap-4">
								{theoryResources.length > 0 ? (
									theoryResources.map((resource) => (
										<div key={resource.id}
											 className="flex items-center justify-between p-4 border rounded-lg">
											<div className="flex items-center space-x-4">
												<div className="p-2 rounded-full bg-muted">
													{resource.type === "document" ? (
														<FileText className="h-5 w-5 text-muted-foreground"/>
													) : (
														<Video className="h-5 w-5 text-muted-foreground"/>
													)}
												</div>
												<div>
													<p className="font-medium">{resource.title}</p>
													<div className="flex items-center gap-2 mt-1">
														<Badge variant="outline">{resource.category}</Badge>
														<p className="text-xs text-muted-foreground">
															上传时间: {resource.date} | 大小: {resource.size} |
															下载次数: {resource.downloads}
														</p>
													</div>
												</div>
											</div>
											<div className="flex space-x-2">
												<Button variant="outline" size="sm">
													<Download className="mr-2 h-4 w-4"/>
													下载
												</Button>
												<Button variant="outline" size="sm">
													<ExternalLink className="mr-2 h-4 w-4"/>
													查看
												</Button>
											</div>
										</div>
									))
								) : (
									<div
										className="text-center py-4 text-muted-foreground">未找到符合条件的学习资料</div>
								)}
							</div>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="history">
					<Card>
						<CardHeader>
							<CardTitle>党史学习</CardTitle>
							<CardDescription>党史学习相关资料，共 {historyResources.length} 项</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid gap-4">
								{historyResources.length > 0 ? (
									historyResources.map((resource) => (
										<div key={resource.id}
											 className="flex items-center justify-between p-4 border rounded-lg">
											<div className="flex items-center space-x-4">
												<div className="p-2 rounded-full bg-muted">
													{resource.type === "document" ? (
														<FileText className="h-5 w-5 text-muted-foreground"/>
													) : (
														<Video className="h-5 w-5 text-muted-foreground"/>
													)}
												</div>
												<div>
													<p className="font-medium">{resource.title}</p>
													<div className="flex items-center gap-2 mt-1">
														<Badge variant="outline">{resource.category}</Badge>
														<p className="text-xs text-muted-foreground">
															上传时间: {resource.date} | 大小: {resource.size} |
															下载次数: {resource.downloads}
														</p>
													</div>
												</div>
											</div>
											<div className="flex space-x-2">
												<Button variant="outline" size="sm">
													<Download className="mr-2 h-4 w-4"/>
													下载
												</Button>
												<Button variant="outline" size="sm">
													<ExternalLink className="mr-2 h-4 w-4"/>
													查看
												</Button>
											</div>
										</div>
									))
								) : (
									<div
										className="text-center py-4 text-muted-foreground">未找到符合条件的学习资料</div>
								)}
							</div>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="charter">
					<Card>
						<CardHeader>
							<CardTitle>党章学习</CardTitle>
							<CardDescription>党章学习相关资料，共 {charterResources.length} 项</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid gap-4">
								{charterResources.length > 0 ? (
									charterResources.map((resource) => (
										<div key={resource.id}
											 className="flex items-center justify-between p-4 border rounded-lg">
											<div className="flex items-center space-x-4">
												<div className="p-2 rounded-full bg-muted">
													{resource.type === "document" ? (
														<FileText className="h-5 w-5 text-muted-foreground"/>
													) : (
														<Video className="h-5 w-5 text-muted-foreground"/>
													)}
												</div>
												<div>
													<p className="font-medium">{resource.title}</p>
													<div className="flex items-center gap-2 mt-1">
														<Badge variant="outline">{resource.category}</Badge>
														<p className="text-xs text-muted-foreground">
															上传时间: {resource.date} | 大小: {resource.size} |
															下载次数: {resource.downloads}
														</p>
													</div>
												</div>
											</div>
											<div className="flex space-x-2">
												<Button variant="outline" size="sm">
													<Download className="mr-2 h-4 w-4"/>
													下载
												</Button>
												<Button variant="outline" size="sm">
													<ExternalLink className="mr-2 h-4 w-4"/>
													查看
												</Button>
											</div>
										</div>
									))
								) : (
									<div
										className="text-center py-4 text-muted-foreground">未找到符合条件的学习资料</div>
								)}
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}
