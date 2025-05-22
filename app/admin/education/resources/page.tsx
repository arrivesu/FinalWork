"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Edit, FileText, Plus, Search, Trash2, Upload, Video } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {useData} from "@/context/data-context";

export default function AdminResourcesPage() {
	const {MaterialAPI} = useData()

	const resources = MaterialAPI.data

	const [searchTerm, setSearchTerm] = useState("")
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
	const [selectedResource, setSelectedResource] = useState<any>(null)
	const { toast } = useToast()

	// Add state for the new resource
	const [newResource, setNewResource] = useState({
		title: "",
		type: "",
		category: "",
		description: "",
		file: null as File | null,
	})

	// Add a function to handle file input change
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setNewResource((prev) => ({
				...prev,
				file: e.target.files![0],
			}))
		}
	}

	// Update the handleInputChange function
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { id, value } = e.target
		setNewResource((prev) => ({
			...prev,
			[id]: value,
		}))
	}

	// Update the handleSelectChange function
	const handleSelectChange = (id: string, value: string) => {
		setNewResource((prev) => ({
			...prev,
			[id]: value,
		}))
	}

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

	// Update the handleAddResource function to use the MaterialAPI
	const handleAddResource = async () => {
		try {
			// Validate required fields
			if (!newResource.title || !newResource.type || !newResource.category) {
				toast({
					title: "添加失败",
					description: "请填写所有必填字段",
					variant: "destructive",
				})
				return
			}

			// Create a new resource object
			const resource = MaterialAPI.createEmpty()
			resource.id = Math.max(...resources.map((r) => r.id)) + 1
			resource.title = newResource.title
			resource.type = newResource.type as "document" | "video"
			resource.category = newResource.category as MaterialType['category']
			resource.content = newResource.description
			resource.upload_date = new Date()

			// Add the new resource to the API
			await MaterialAPI.add(resource)

			setIsAddDialogOpen(false)

			// Reset the form
			setNewResource({
				title: "",
				type: "",
				category: "",
				description: "",
				file: null,
			})

			toast({
				title: "添加成功",
				description: "学习资料已成功添加",
			})
		} catch (error) {
			toast({
				title: "添加失败",
				description: "添加学习资料时发生错误，请重试",
				variant: "destructive",
			})
		}
	}

	// Update the handleEditResource function to use the MaterialAPI
	const handleEditResource = async () => {
		try {
			if (!selectedResource) return

			// Get the form values from the dialog
			const title = (document.getElementById("edit-title") as HTMLInputElement)?.value
			const type = (document.getElementById("edit-type") as HTMLSelectElement)?.value
			const category = (document.getElementById("edit-category") as HTMLSelectElement)?.value
			const description = (document.getElementById("edit-description") as HTMLTextAreaElement)?.value

			// Update the resource
			const updatedResource: MaterialType = {
				...selectedResource,
				id: selectedResource.id,
				title,
				type: type as "document" | "video",
				category,
				content: description,
			}

			await MaterialAPI.save(updatedResource)

			// Update the local state
			const index = resources.findIndex((r) => r.id === selectedResource.id)
			if (index !== -1) {
				resources[index] = updatedResource
			}

			setIsEditDialogOpen(false)
			toast({
				title: "编辑成功",
				description: "学习资料已成功更新",
			})
		} catch (error) {
			toast({
				title: "编辑失败",
				description: "编辑学习资料时发生错误，请重试",
				variant: "destructive",
			})
		}
	}

	// Update the handleDeleteResource function to use the MaterialAPI
	const handleDeleteResource = async (resource: any) => {
		try {
			await MaterialAPI.del(resource.id)

			// Update the local state
			const index = resources.findIndex((r) => r.id === resource.id)
			if (index !== -1) {
				resources.splice(index, 1)
			}

			toast({
				title: "删除成功",
				description: `学习资料 "${resource.title}" 已成功删除`,
			})
		} catch (error) {
			toast({
				title: "删除失败",
				description: "删除学习资料时发生错误，请重试",
				variant: "destructive",
			})
		}
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">学习资料</h1>
					<p className="text-muted-foreground">管理党课学习资料</p>
				</div>
				<Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
					<DialogTrigger asChild>
						<Button>
							<Plus className="mr-2 h-4 w-4" />
							添加资料
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>添加学习资料</DialogTitle>
							<DialogDescription>添加新的党课学习资料</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="space-y-2">
								<Label htmlFor="title">资料标题</Label>
								<Input id="title" placeholder="请输入资料标题" onChange={handleInputChange} />
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="type">资料类型</Label>
									<Select onValueChange={(value) => handleSelectChange("type", value)}>
										<SelectTrigger>
											<SelectValue placeholder="选择资料类型" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="document">文档</SelectItem>
											<SelectItem value="video">视频</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label htmlFor="category">资料分类</Label>
									<Select onValueChange={(value) => handleSelectChange("category", value)}>
										<SelectTrigger>
											<SelectValue placeholder="选择资料分类" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="理论学习">理论学习</SelectItem>
											<SelectItem value="党史学习">党史学习</SelectItem>
											<SelectItem value="党章学习">党章学习</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							{renderFileUpload()}
							<div className="space-y-2">
								<Label htmlFor="description">资料描述</Label>
								<Textarea
									id="description"
									placeholder="请输入资料描述"
									className="min-h-[100px]"
									onChange={handleInputChange}
								/>
							</div>
						</div>
						<DialogFooter>
							<Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
								取消
							</Button>
							<Button onClick={handleAddResource}>添加</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			<div className="relative">
				<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
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
										<div key={resource.id} className="flex items-center justify-between p-4 border rounded-lg">
											<div className="flex items-center space-x-4">
												<div className="p-2 rounded-full bg-muted">
													{resource.type === "document" ? (
														<FileText className="h-5 w-5 text-muted-foreground" />
													) : (
														<Video className="h-5 w-5 text-muted-foreground" />
													)}
												</div>
												<div>
													<p className="font-medium">{resource.title}</p>
													<div className="flex items-center gap-2 mt-1">
														<Badge variant="outline">{resource.category}</Badge>
														<p className="text-xs text-muted-foreground">
															上传时间: {resource.upload_date.toDateString()}
														</p>
													</div>
												</div>
											</div>
											<div className="flex space-x-2">
												<Dialog
													open={isEditDialogOpen && selectedResource?.id === resource.id}
													onOpenChange={(open) => {
														setIsEditDialogOpen(open)
														if (open) setSelectedResource(resource)
													}}
												>
													<DialogTrigger asChild>
														<Button variant="outline" size="sm">
															<Edit className="mr-2 h-4 w-4" />
															编辑
														</Button>
													</DialogTrigger>
													<DialogContent>
														<DialogHeader>
															<DialogTitle>编辑学习资料</DialogTitle>
															<DialogDescription>编辑学习资料信息</DialogDescription>
														</DialogHeader>
														<div className="grid gap-4 py-4">
															<div className="space-y-2">
																<Label htmlFor="edit-title">资料标题</Label>
																<Input id="edit-title" defaultValue={resource.title} />
															</div>
															<div className="grid grid-cols-2 gap-4">
																<div className="space-y-2">
																	<Label htmlFor="edit-type">资料类型</Label>
																	<Select defaultValue={resource.type} id="edit-type">
																		<SelectTrigger>
																			<SelectValue placeholder="选择资料类型" />
																		</SelectTrigger>
																		<SelectContent>
																			<SelectItem value="document">文档</SelectItem>
																			<SelectItem value="video">视频</SelectItem>
																		</SelectContent>
																	</Select>
																</div>
																<div className="space-y-2">
																	<Label htmlFor="edit-category">资料分类</Label>
																	<Select defaultValue={resource.category} id="edit-category">
																		<SelectTrigger>
																			<SelectValue placeholder="选择资料分类" />
																		</SelectTrigger>
																		<SelectContent>
																			<SelectItem value="理论学习">理论学习</SelectItem>
																			<SelectItem value="党史学习">党史学习</SelectItem>
																			<SelectItem value="党章学习">党章学习</SelectItem>
																		</SelectContent>
																	</Select>
																</div>
															</div>
															<div className="space-y-2">
																<Label htmlFor="edit-description">资料描述</Label>
																<Textarea
																	id="edit-description"
																	placeholder="请输入资料描述"
																	className="min-h-[100px]"
																	defaultValue={resource.content}
																/>
															</div>
														</div>
														<DialogFooter>
															<Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
																取消
															</Button>
															<Button onClick={handleEditResource}>保存</Button>
														</DialogFooter>
													</DialogContent>
												</Dialog>
												<Button variant="outline" size="sm" onClick={() => handleDeleteResource(resource)}>
													<Trash2 className="mr-2 h-4 w-4" />
													删除
												</Button>
												<Button variant="outline" size="sm">
													<Download className="mr-2 h-4 w-4" />
													下载
												</Button>
											</div>
										</div>
									))
								) : (
									<div className="text-center py-4 text-muted-foreground">未找到符合条件的学习资料</div>
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
										<div key={resource.id} className="flex items-center justify-between p-4 border rounded-lg">
											<div className="flex items-center space-x-4">
												<div className="p-2 rounded-full bg-muted">
													{resource.type === "document" ? (
														<FileText className="h-5 w-5 text-muted-foreground" />
													) : (
														<Video className="h-5 w-5 text-muted-foreground" />
													)}
												</div>
												<div>
													<p className="font-medium">{resource.title}</p>
													<div className="flex items-center gap-2 mt-1">
														<Badge variant="outline">{resource.category}</Badge>
														<p className="text-xs text-muted-foreground">
															上传时间: {resource.upload_date.toDateString()}
														</p>
													</div>
												</div>
											</div>
											<div className="flex space-x-2">
												<Button variant="outline" size="sm">
													<Edit className="mr-2 h-4 w-4" />
													编辑
												</Button>
												<Button variant="outline" size="sm" onClick={() => handleDeleteResource(resource)}>
													<Trash2 className="mr-2 h-4 w-4" />
													删除
												</Button>
												<Button variant="outline" size="sm">
													<Download className="mr-2 h-4 w-4" />
													下载
												</Button>
											</div>
										</div>
									))
								) : (
									<div className="text-center py-4 text-muted-foreground">未找到符合条件的学习资料</div>
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
										<div key={resource.id} className="flex items-center justify-between p-4 border rounded-lg">
											<div className="flex items-center space-x-4">
												<div className="p-2 rounded-full bg-muted">
													{resource.type === "document" ? (
														<FileText className="h-5 w-5 text-muted-foreground" />
													) : (
														<Video className="h-5 w-5 text-muted-foreground" />
													)}
												</div>
												<div>
													<p className="font-medium">{resource.title}</p>
													<div className="flex items-center gap-2 mt-1">
														<Badge variant="outline">{resource.category}</Badge>
														<p className="text-xs text-muted-foreground">
															上传时间: {resource.upload_date.toDateString()}
														</p>
													</div>
												</div>
											</div>
											<div className="flex space-x-2">
												<Button variant="outline" size="sm">
													<Edit className="mr-2 h-4 w-4" />
													编辑
												</Button>
												<Button variant="outline" size="sm" onClick={() => handleDeleteResource(resource)}>
													<Trash2 className="mr-2 h-4 w-4" />
													删除
												</Button>
												<Button variant="outline" size="sm">
													<Download className="mr-2 h-4 w-4" />
													下载
												</Button>
											</div>
										</div>
									))
								) : (
									<div className="text-center py-4 text-muted-foreground">未找到符合条件的学习资料</div>
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
										<div key={resource.id} className="flex items-center justify-between p-4 border rounded-lg">
											<div className="flex items-center space-x-4">
												<div className="p-2 rounded-full bg-muted">
													{resource.type === "document" ? (
														<FileText className="h-5 w-5 text-muted-foreground" />
													) : (
														<Video className="h-5 w-5 text-muted-foreground" />
													)}
												</div>
												<div>
													<p className="font-medium">{resource.title}</p>
													<div className="flex items-center gap-2 mt-1">
														<Badge variant="outline">{resource.category}</Badge>
														<p className="text-xs text-muted-foreground">
															上传时间: {resource.upload_date.toDateString()}
														</p>
													</div>
												</div>
											</div>
											<div className="flex space-x-2">
												<Button variant="outline" size="sm">
													<Edit className="mr-2 h-4 w-4" />
													编辑
												</Button>
												<Button variant="outline" size="sm" onClick={() => handleDeleteResource(resource)}>
													<Trash2 className="mr-2 h-4 w-4" />
													删除
												</Button>
												<Button variant="outline" size="sm">
													<Download className="mr-2 h-4 w-4" />
													下载
												</Button>
											</div>
										</div>
									))
								) : (
									<div className="text-center py-4 text-muted-foreground">未找到符合条件的学习资料</div>
								)}
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)

	// Add a function to handle file upload in the dialog
	function renderFileUpload() {
		return (
			<div className="space-y-2">
				<Label htmlFor="file">上传文件</Label>
				<div className="flex items-center justify-center w-full">
					<label
						htmlFor="file-upload"
						className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
					>
						<div className="flex flex-col items-center justify-center pt-5 pb-6">
							<Upload className="w-8 h-8 mb-2 text-muted-foreground" />
							<p className="mb-2 text-sm text-muted-foreground">
								<span className="font-semibold">点击上传</span> 或拖放文件
							</p>
							<p className="text-xs text-muted-foreground">支持 PDF, DOC, PPT, MP4 等格式</p>
						</div>
						<input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
					</label>
				</div>
				{newResource.file && <p className="text-sm text-muted-foreground">已选择文件: {newResource.file.name}</p>}
			</div>
		)
	}
}
