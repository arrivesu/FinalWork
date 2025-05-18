"use client"

import React, {useState} from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Download, Eye, FileUp, MoreHorizontal, Pencil, Search, Trash2, UserPlus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { MemberAPI } from "@/lib/api"
import { UserDocumentAPI } from "@/lib/api"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {useAuth} from "@/hooks/use-auth";

// 党员身份类型
const identityTypes = ["已毕业党员", "正式党员", "预备党员"]
// 党内职务
const partyPositions = ["党支部书记", "党支部委员", "普通党员"]
// 档案类型
const documentTypes = ["入党申请书", "思想汇报", "转正申请书", "党费缴纳记录", "其他材料"]

export default function MembersList() {
	const [searchTerm, setSearchTerm] = useState("")
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
	const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
	const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
	const { toast } = useToast()
	const [selectedIdentity, setSelectedIdentity] = useState<string>("all")
	const [members, setMembers] = useState(
		MemberAPI.data.filter(
			(member) =>
				member.identity_type === "已毕业党员" ||
				member.identity_type === "正式党员" ||
				member.identity_type === "预备党员",
		),
	)
	const [currentMember, setCurrentMember] = useState<any>(null)
	const [newMember, setNewMember] = useState(MemberAPI.createEmpty())
	const [newDocument, setNewDocument] = useState(UserDocumentAPI.createEmpty())

	const {user} = useAuth();
	if(user === null) return null;

	// 过滤党员
	const filterMembers = () => {
		return members
			.filter((member) => selectedIdentity === "all" || member.identity_type === selectedIdentity)
			.filter(
				(member) =>
					member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					(member.party_position && member.party_position.toLowerCase().includes(searchTerm.toLowerCase())) ||
					member.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
					member.student_number.toLowerCase().includes(searchTerm.toLowerCase()),
			)
	}

	const filteredMembers = filterMembers()

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
		field: string,
	) => {
		if (isEditDialogOpen && currentMember) {
			setCurrentMember({
				...currentMember,
				[field]: e.target.value,
			})
		} else {
			setNewMember({
				...newMember,
				[field]: e.target.value,
			})
		}
	}

	const handleSelectChange = (value: string, field: string) => {
		if (isEditDialogOpen && currentMember) {
			setCurrentMember({
				...currentMember,
				[field]: value,
			})
		} else if (isUploadDialogOpen) {
			setNewDocument({
				...newDocument,
				type: value,
			})
		} else {
			setNewMember({
				...newMember,
				[field]: value,
			})
		}
	}

	const handleRadioChange = (value: MemberType['gender']) => {
		if (isEditDialogOpen && currentMember) {
			setCurrentMember({
				...currentMember,
				gender: value,
			})
		} else {
			setNewMember({
				...newMember,
				gender: value,
			})
		}
	}

	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
		const date = new Date(e.target.value)
		if (isEditDialogOpen && currentMember) {
			setCurrentMember({
				...currentMember,
				[field]: date,
			})
		} else if (isUploadDialogOpen && field === "submit_time") {
			setNewDocument({
				...newDocument,
				submit_time: date,
			})
		} else {
			setNewMember({
				...newMember,
				[field]: date,
			})
		}
	}

	const handleAddMember = async () => {
		let memberToAdd:MemberType = {
			...newMember,
			id: 0,
			branch: user.branch,
			role: ['member'],
		}

		memberToAdd = await MemberAPI.add(memberToAdd)
		setMembers([...members, memberToAdd])
		setIsAddDialogOpen(false)
		setNewMember(MemberAPI.createEmpty())

		toast({
			title: "添加成功",
			description: "党员信息已成功添加",
		})
	}

	const handleEditMember = async () => {
		if (!currentMember) return

		await MemberAPI.save(currentMember.id, currentMember)
		setMembers(members.map((m) => (m.id === currentMember.id ? currentMember : m)))
		setIsEditDialogOpen(false)

		toast({
			title: "修改成功",
			description: "党员信息已成功更新",
		})
	}

	const handleDeleteMember = async (member: any) => {
		await MemberAPI.del(member.id)
		setMembers(members.filter((m) => m.id !== member.id))

		toast({
			title: "删除成功",
			description: `党员 ${member.name} 已成功删除`,
		})
	}

	const handleViewMember = (member: any) => {
		setCurrentMember(member)
		setIsViewDialogOpen(true)
	}

	const handleEditMemberOpen = (member: any) => {
		setCurrentMember({ ...member })
		setIsEditDialogOpen(true)
	}

	const handleUploadArchive = (member: any) => {
		setCurrentMember(member)
		setNewDocument({
			...UserDocumentAPI.createEmpty(),
			user: member,
			submit_time: new Date(),
		})
		setIsUploadDialogOpen(true)
	}

	const handleSubmitDocument = async () => {
		// 生成新ID
		const newId = Math.max(...UserDocumentAPI.data.map((d) => d.id), 0) + 1
		const documentToAdd = {
			...newDocument,
			id: newId,
		}

		await UserDocumentAPI.add(documentToAdd)
		setIsUploadDialogOpen(false)

		toast({
			title: "上传成功",
			description: `${currentMember.name}的${newDocument.type}已成功上传`,
		})
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">党员名册</h1>
					<p className="text-muted-foreground">管理党支部所有党员信息</p>
				</div>
				<div className="flex items-center gap-2">
					<Button onClick={() => setIsAddDialogOpen(true)}>
						<UserPlus className="mr-2 h-4 w-4" />
						添加党员
					</Button>
					<Button variant="outline">
						<Download className="mr-2 h-4 w-4" />
						导出名册
					</Button>
				</div>
			</div>

			<div className="flex gap-2">
				<div className="relative flex-1">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="search"
						placeholder="搜索党员..."
						className="pl-8"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<Select value={selectedIdentity} onValueChange={setSelectedIdentity}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="选择身份类型" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">全部身份类型</SelectItem>
						{identityTypes.map((type) => (
							<SelectItem key={type} value={type}>
								{type}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<Card>
				<CardContent>
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center gap-2"></div>
					</div>
					<div className="rounded-md border overflow-x-auto">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>用户编号</TableHead>
									<TableHead>姓名</TableHead>
									<TableHead>性别</TableHead>
									<TableHead>民族</TableHead>
									<TableHead>出生日期</TableHead>
									<TableHead>学号</TableHead>
									<TableHead>班级</TableHead>
									<TableHead>入党时间</TableHead>
									<TableHead>党内职务</TableHead>
									<TableHead>联系方式</TableHead>
									<TableHead className="w-[80px]"></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredMembers.map((member) => (
									<TableRow key={member.id}>
										<TableCell>{member.id}</TableCell>
										<TableCell>{member.name}</TableCell>
										<TableCell>{member.gender}</TableCell>
										<TableCell>{member.ethnicity}</TableCell>
										<TableCell>{new Date(member.birth_date).toLocaleDateString("zh-CN")}</TableCell>
										<TableCell>{member.student_number}</TableCell>
										<TableCell>{member.class_name}</TableCell>
										<TableCell>{new Date(member.join_date).toLocaleDateString("zh-CN")}</TableCell>
										<TableCell>{member.party_position}</TableCell>
										<TableCell>{member.phone}</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" size="sm" className="h-8 w-8 p-0">
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">打开菜单</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>操作</DropdownMenuLabel>
													<DropdownMenuSeparator />
													<DropdownMenuItem onClick={() => handleViewMember(member)}>
														<Eye className="h-4 w-4 mr-2" />
														查看详情
													</DropdownMenuItem>
													<DropdownMenuItem onClick={() => handleEditMemberOpen(member)}>
														<Pencil className="h-4 w-4 mr-2" />
														编辑信息
													</DropdownMenuItem>
													<DropdownMenuItem onClick={() => handleUploadArchive(member)}>
														<FileUp className="h-4 w-4 mr-2" />
														上传档案
													</DropdownMenuItem>
													<DropdownMenuSeparator />
													<DropdownMenuItem className="text-red-600" onClick={() => handleDeleteMember(member)}>
														<Trash2 className="h-4 w-4 mr-2" />
														删除
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>

			{/* 添加党员对话框 */}
			<Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
				<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>添加新党员</DialogTitle>
						<DialogDescription>请填写新党员的基本信息，带 * 的为必填项</DialogDescription>
					</DialogHeader>
					<div className="grid grid-cols-2 gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="name" className="font-medium">
								姓名 *
							</Label>
							<Input
								id="name"
								placeholder="请输入姓名"
								value={newMember.name}
								onChange={(e) => handleInputChange(e, "name")}
							/>
						</div>
						<div className="grid gap-2">
							<Label className="font-medium">性别 *</Label>
							<RadioGroup value={newMember.gender} onValueChange={handleRadioChange} className="flex">
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="男" id="male" />
									<Label htmlFor="male">男</Label>
								</div>
								<div className="flex items-center space-x-2 ml-4">
									<RadioGroupItem value="女" id="female" />
									<Label htmlFor="female">女</Label>
								</div>
							</RadioGroup>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="ethnicity" className="font-medium">
								民族 *
							</Label>
							<Input
								id="ethnicity"
								placeholder="请输入民族"
								defaultValue="汉族"
								value={newMember.ethnicity}
								onChange={(e) => handleInputChange(e, "ethnicity")}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="birthDate" className="font-medium">
								出生日期 *
							</Label>
							<Input
								id="birthDate"
								type="date"
								value={newMember.birth_date instanceof Date ? newMember.birth_date.toISOString().split("T")[0] : ""}
								onChange={(e) => handleDateChange(e, "birth_date")}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="studentId" className="font-medium">
								学号 *
							</Label>
							<Input
								id="studentId"
								placeholder="请输入学号"
								value={newMember.student_number}
								onChange={(e) => handleInputChange(e, "student_number")}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="className" className="font-medium">
								班级 *
							</Label>
							<Input
								id="className"
								placeholder="请输入班级"
								value={newMember.class_name}
								onChange={(e) => handleInputChange(e, "class_name")}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="joinDate" className="font-medium">
								入党时间
							</Label>
							<Input
								id="joinDate"
								type="date"
								value={newMember.join_date instanceof Date ? newMember.join_date.toISOString().split("T")[0] : ""}
								onChange={(e) => handleDateChange(e, "join_date")}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="position" className="font-medium">
								党内职务 *
							</Label>
							<Select
								defaultValue="普通党员"
								value={newMember.party_position || "普通党员"}
								onValueChange={(value) => handleSelectChange(value, "party_position")}
							>
								<SelectTrigger>
									<SelectValue placeholder="选择党内职务" />
								</SelectTrigger>
								<SelectContent>
									{partyPositions.map((position) => (
										<SelectItem key={position} value={position}>
											{position}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="identityType" className="font-medium">
								身份类型 *
							</Label>
							<Select
								defaultValue="正式党员"
								value={newMember.identity_type}
								onValueChange={(value) => handleSelectChange(value, "identity_type")}
							>
								<SelectTrigger>
									<SelectValue placeholder="选择身份类型" />
								</SelectTrigger>
								<SelectContent>
									{identityTypes.map((type) => (
										<SelectItem key={type} value={type}>
											{type}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="contact" className="font-medium">
								联系方式 *
							</Label>
							<Input
								id="contact"
								placeholder="请输入手机号码"
								value={newMember.phone}
								onChange={(e) => handleInputChange(e, "phone")}
							/>
						</div>
					</div>
					<DialogFooter>
						<Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
							取消
						</Button>
						<Button onClick={handleAddMember}>确认添加</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* 编辑党员对话框 */}
			<Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
				<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>编辑党员信息</DialogTitle>
						<DialogDescription>修改党员的基本信息，带 * 的为必填项</DialogDescription>
					</DialogHeader>
					{currentMember && (
						<div className="grid grid-cols-2 gap-4 py-4">
							<div className="grid gap-2">
								<Label htmlFor="edit-name" className="font-medium">
									姓名 *
								</Label>
								<Input
									id="edit-name"
									placeholder="请输入姓名"
									value={currentMember.name}
									onChange={(e) => handleInputChange(e, "name")}
								/>
							</div>
							<div className="grid gap-2">
								<Label className="font-medium">性别 *</Label>
								<RadioGroup value={currentMember.gender} onValueChange={handleRadioChange} className="flex">
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="男" id="edit-male" />
										<Label htmlFor="edit-male">男</Label>
									</div>
									<div className="flex items-center space-x-2 ml-4">
										<RadioGroupItem value="女" id="edit-female" />
										<Label htmlFor="edit-female">女</Label>
									</div>
								</RadioGroup>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="edit-ethnicity" className="font-medium">
									民族 *
								</Label>
								<Input
									id="edit-ethnicity"
									placeholder="请输入民族"
									value={currentMember.ethnicity}
									onChange={(e) => handleInputChange(e, "ethnicity")}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="edit-birthDate" className="font-medium">
									出生日期 *
								</Label>
								<Input
									id="edit-birthDate"
									type="date"
									value={
										currentMember.birth_date instanceof Date
											? currentMember.birth_date.toISOString().split("T")[0]
											: new Date(currentMember.birth_date).toISOString().split("T")[0]
									}
									onChange={(e) => handleDateChange(e, "birth_date")}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="edit-studentId" className="font-medium">
									学号 *
								</Label>
								<Input
									id="edit-studentId"
									placeholder="请输入学号"
									value={currentMember.student_number}
									onChange={(e) => handleInputChange(e, "student_number")}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="edit-className" className="font-medium">
									班级 *
								</Label>
								<Input
									id="edit-className"
									placeholder="请输入班级"
									value={currentMember.class_name}
									onChange={(e) => handleInputChange(e, "class_name")}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="edit-joinDate" className="font-medium">
									入党时间
								</Label>
								<Input
									id="edit-joinDate"
									type="date"
									value={
										currentMember.join_date instanceof Date
											? currentMember.join_date.toISOString().split("T")[0]
											: new Date(currentMember.join_date).toISOString().split("T")[0]
									}
									onChange={(e) => handleDateChange(e, "join_date")}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="edit-position" className="font-medium">
									党内职务 *
								</Label>
								<Select
									value={currentMember.party_position || "普通党员"}
									onValueChange={(value) => handleSelectChange(value, "party_position")}
								>
									<SelectTrigger>
										<SelectValue placeholder="选择党内职务" />
									</SelectTrigger>
									<SelectContent>
										{partyPositions.map((position) => (
											<SelectItem key={position} value={position}>
												{position}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="edit-identityType" className="font-medium">
									身份类型 *
								</Label>
								<Select
									value={currentMember.identity_type}
									onValueChange={(value) => handleSelectChange(value, "identity_type")}
								>
									<SelectTrigger>
										<SelectValue placeholder="选择身份类型" />
									</SelectTrigger>
									<SelectContent>
										{identityTypes.map((type) => (
											<SelectItem key={type} value={type}>
												{type}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="edit-contact" className="font-medium">
									联系方式 *
								</Label>
								<Input
									id="edit-contact"
									placeholder="请输入手机号码"
									value={currentMember.phone}
									onChange={(e) => handleInputChange(e, "phone")}
								/>
							</div>
						</div>
					)}
					<DialogFooter>
						<Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
							取消
						</Button>
						<Button onClick={handleEditMember}>保存修改</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* 查看党员详情对话框 */}
			<Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
				<DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>党员详细信息</DialogTitle>
						<DialogDescription>查看党员的完整信息和档案记录</DialogDescription>
					</DialogHeader>
					{currentMember && (
						<Tabs defaultValue="basic" className="w-full">
							<TabsList className="grid w-full grid-cols-2">
								<TabsTrigger value="basic">基本信息</TabsTrigger>
								<TabsTrigger value="documents">档案记录</TabsTrigger>
							</TabsList>
							<TabsContent value="basic" className="mt-4">
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-1">
										<p className="text-sm font-medium text-muted-foreground">用户编号</p>
										<p>{currentMember.id}</p>
									</div>
									<div className="space-y-1">
										<p className="text-sm font-medium text-muted-foreground">姓名</p>
										<p>{currentMember.name}</p>
									</div>
									<div className="space-y-1">
										<p className="text-sm font-medium text-muted-foreground">性别</p>
										<p>{currentMember.gender}</p>
									</div>
									<div className="space-y-1">
										<p className="text-sm font-medium text-muted-foreground">民族</p>
										<p>{currentMember.ethnicity}</p>
									</div>
									<div className="space-y-1">
										<p className="text-sm font-medium text-muted-foreground">出生日期</p>
										<p>{new Date(currentMember.birth_date).toLocaleDateString("zh-CN")}</p>
									</div>
									<div className="space-y-1">
										<p className="text-sm font-medium text-muted-foreground">学号</p>
										<p>{currentMember.student_number}</p>
									</div>
									<div className="space-y-1">
										<p className="text-sm font-medium text-muted-foreground">班级</p>
										<p>{currentMember.class_name}</p>
									</div>
									<div className="space-y-1">
										<p className="text-sm font-medium text-muted-foreground">入党时间</p>
										<p>{new Date(currentMember.join_date).toLocaleDateString("zh-CN")}</p>
									</div>
									<div className="space-y-1">
										<p className="text-sm font-medium text-muted-foreground">党内职务</p>
										<p>{currentMember.party_position}</p>
									</div>
									<div className="space-y-1">
										<p className="text-sm font-medium text-muted-foreground">身份类型</p>
										<p>{currentMember.identity_type}</p>
									</div>
									<div className="space-y-1">
										<p className="text-sm font-medium text-muted-foreground">联系方式</p>
										<p>{currentMember.phone}</p>
									</div>
									<div className="space-y-1">
										<p className="text-sm font-medium text-muted-foreground">所属党支部</p>
										<p>{currentMember.branch?.name || "未分配"}</p>
									</div>
								</div>
							</TabsContent>
							<TabsContent value="documents" className="mt-4">
								<div className="space-y-4">
									<div className="flex justify-between items-center">
										<h3 className="text-lg font-medium">档案列表</h3>
										<Button size="sm" onClick={() => handleUploadArchive(currentMember)}>
											<FileUp className="h-4 w-4 mr-2" />
											上传新档案
										</Button>
									</div>
									<div className="rounded-md border overflow-hidden">
										<Table>
											<TableHeader>
												<TableRow>
													<TableHead>档案类型</TableHead>
													<TableHead>提交时间</TableHead>
													<TableHead>内容摘要</TableHead>
													<TableHead className="w-[100px]">操作</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{UserDocumentAPI.data
													.filter((doc) => doc.user.id === currentMember.id)
													.map((doc) => (
														<TableRow key={doc.id}>
															<TableCell>{doc.type}</TableCell>
															<TableCell>{new Date(doc.submit_time).toLocaleDateString("zh-CN")}</TableCell>
															<TableCell className="max-w-[300px] truncate">{doc.content}</TableCell>
															<TableCell>
																<Button variant="ghost" size="sm">
																	<Eye className="h-4 w-4" />
																	<span className="sr-only">查看</span>
																</Button>
															</TableCell>
														</TableRow>
													))}
												{UserDocumentAPI.data.filter((doc) => doc.user.id === currentMember.id).length === 0 && (
													<TableRow>
														<TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
															暂无档案记录
														</TableCell>
													</TableRow>
												)}
											</TableBody>
										</Table>
									</div>
								</div>
							</TabsContent>
						</Tabs>
					)}
					<DialogFooter>
						<Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
							关闭
						</Button>
						<Button
							onClick={() => {
								setIsViewDialogOpen(false)
								handleEditMemberOpen(currentMember)
							}}
						>
							编辑信息
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* 上传档案对话框 */}
			<Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
				<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>上传党员档案</DialogTitle>
						<DialogDescription>
							{currentMember ? `为 ${currentMember.name} 上传新的档案材料` : "上传新的档案材料"}
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="document-type" className="font-medium">
								档案类型 *
							</Label>
							<Select value={newDocument.type} onValueChange={(value) => handleSelectChange(value, "type")}>
								<SelectTrigger>
									<SelectValue placeholder="选择档案类型" />
								</SelectTrigger>
								<SelectContent>
									{documentTypes.map((type) => (
										<SelectItem key={type} value={type}>
											{type}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="submit-date" className="font-medium">
								提交日期 *
							</Label>
							<Input
								id="submit-date"
								type="date"
								value={
									newDocument.submit_time instanceof Date
										? newDocument.submit_time.toISOString().split("T")[0]
										: new Date().toISOString().split("T")[0]
								}
								onChange={(e) => handleDateChange(e, "submit_time")}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="document-content" className="font-medium">
								档案内容 *
							</Label>
							<Textarea
								id="document-content"
								placeholder="请输入档案内容或摘要..."
								className="min-h-[150px]"
								value={newDocument.content}
								onChange={(e) => handleInputChange(e, "content")}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="document-file" className="font-medium">
								上传文件
							</Label>
							<Input id="document-file" type="file" className="cursor-pointer" />
							<p className="text-sm text-muted-foreground">
								支持上传 PDF、Word、图片等格式文件，单个文件大小不超过10MB
							</p>
						</div>
					</div>
					<DialogFooter>
						<Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
							取消
						</Button>
						<Button onClick={handleSubmitDocument}>确认上传</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}
