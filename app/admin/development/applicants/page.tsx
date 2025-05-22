"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
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
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, Edit, Plus, Search, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {useData} from "@/context/data-context";

export default function ApplicantsPage() {
	const {MemberAPI} = useData();
	const applicant_member_list = MemberAPI.data.filter((member) => member.identity_type === "入党申请人")

	const [searchTerm, setSearchTerm] = useState("")
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
	const [isPromoteDialogOpen, setIsPromoteDialogOpen] = useState(false)
	const [selectedApplicants, setSelectedApplicants] = useState<number[]>([])
	const { toast } = useToast()

	// Add state for the new applicant form
	const [newApplicant, setNewApplicant] = useState({
		name: "",
		gender: "",
		ethnicity: "",
		contact: "",
		student_id: "",
		class_name: "",
		apply_date: "",
		reason: "",
	})

	// 过滤申请人
	const filteredApplicants = applicant_member_list.filter(
		(applicant) =>
			applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			applicant.student_number.includes(searchTerm) ||
			applicant.class_name.toLowerCase().includes(searchTerm.toLowerCase()),
	)

	// Update the handleInputChange function
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { id, value } = e.target
		setNewApplicant((prev) => ({
			...prev,
			[id]: value,
		}))
	}

	// Update the handleSelectChange function
	const handleSelectChange = (id: string, value: string) => {
		setNewApplicant((prev) => ({
			...prev,
			[id]: value,
		}))
	}

	// Update the handleAddApplicant function to use the MemberAPI
	const handleAddApplicant = async () => {
		try {
			// Validate required fields
			if (
				!newApplicant.name ||
				!newApplicant.gender ||
				!newApplicant.student_id ||
				!newApplicant.class_name ||
				!newApplicant.apply_date
			) {
				toast({
					title: "添加失败",
					description: "请填写所有必填字段",
					variant: "destructive",
				})
				return
			}

			// Create a new member object with the applicant data
			const newMember = MemberAPI.createEmpty()
			newMember.id = Math.max(...applicant_member_list.map((m) => m.id)) + 1
			newMember.name = newApplicant.name
			newMember.gender = newApplicant.gender as "男" | "女"
			newMember.ethnicity = newApplicant.ethnicity
			newMember.phone = newApplicant.contact
			newMember.student_number = newApplicant.student_id
			newMember.class_name = newApplicant.class_name
			newMember.join_date = new Date(newApplicant.apply_date)
			newMember.identity_type = "入党申请人"

			// Add the new member to the API
			await MemberAPI.add(newMember)

			// Update the local state
			applicant_member_list.push(newMember)

			setIsAddDialogOpen(false)

			// Reset the form
			setNewApplicant({
				name: "",
				gender: "",
				ethnicity: "",
				contact: "",
				student_id: "",
				class_name: "",
				apply_date: "",
				reason: "",
			})

			toast({
				title: "添加成功",
				description: "入党申请人信息已成功添加",
			})
		} catch (error) {
			toast({
				title: "添加失败",
				description: "添加入党申请人时发生错误，请重试",
				variant: "destructive",
			})
		}
	}

	// Update the handleDeleteApplicant function to use the MemberAPI
	const handleDeleteApplicant = async (applicant: any) => {
		try {
			await MemberAPI.del(applicant.id)

			// Update the local state
			const index = applicant_member_list.findIndex((a) => a.id === applicant.id)
			if (index !== -1) {
				applicant_member_list.splice(index, 1)
			}

			toast({
				title: "删除成功",
				description: `入党申请人 ${applicant.name} 已成功删除`,
			})
		} catch (error) {
			toast({
				title: "删除失败",
				description: "删除入党申请人时发生错误，请重试",
				variant: "destructive",
			})
		}
	}

	// Update the handlePromote function
	const handlePromote = async () => {
		try {
			// Update each selected applicant to be an activist
			for (const id of selectedApplicants) {
				const applicant = applicant_member_list.find((a) => a.id === id)
				if (applicant) {
					const updatedApplicant = {
						...applicant,
						identity_type: "入党积极分子",
					}

					await MemberAPI.save(id, updatedApplicant)

					// Update the local state
					const index = applicant_member_list.findIndex((a) => a.id === id)
					if (index !== -1) {
						applicant_member_list.splice(index, 1)
					}
				}
			}

			setIsPromoteDialogOpen(false)
			toast({
				title: "转为入党积极分子成功",
				description: `已将 ${selectedApplicants.length} 名入党申请人转为入党积极分子`,
			})
			setSelectedApplicants([])
		} catch (error) {
			toast({
				title: "操作失败",
				description: "转为入党积极分子时发生错误，请重试",
				variant: "destructive",
			})
		}
	}

	const toggleSelectApplicant = (id: number) => {
		setSelectedApplicants((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">入党申请人</h1>
					<p className="text-muted-foreground">管理入党申请人信息</p>
				</div>
				<div className="flex space-x-2">
					<Dialog open={isPromoteDialogOpen} onOpenChange={setIsPromoteDialogOpen}>
						<DialogTrigger asChild>
							<Button variant="outline" disabled={selectedApplicants.length === 0}>
								<ArrowRight className="mr-2 h-4 w-4" />
								转为入党积极分子
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>转为入党积极分子</DialogTitle>
								<DialogDescription>
									确认将选中的 {selectedApplicants.length} 名入党申请人转为入党积极分子？
								</DialogDescription>
							</DialogHeader>
							<div className="py-4">
								<p>选中的入党申请人：</p>
								<ul className="mt-2 space-y-1">
									{selectedApplicants.map((id) => {
										const applicant = applicant_member_list.find((a) => a.id === id)
										return (
											<li key={id} className="text-sm">
												{applicant?.name} - {applicant?.student_number}
											</li>
										)
									})}
								</ul>
							</div>
							<DialogFooter>
								<Button variant="outline" onClick={() => setIsPromoteDialogOpen(false)}>
									取消
								</Button>
								<Button onClick={handlePromote}>确认转为入党积极分子</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>

					<Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
						<DialogTrigger asChild>
							<Button>
								<Plus className="mr-2 h-4 w-4" />
								添加申请人
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>添加入党申请人</DialogTitle>
								<DialogDescription>添加新的入党申请人信息</DialogDescription>
							</DialogHeader>
							<div className="grid gap-4 py-4">
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="name">姓名</Label>
										<Input id="name" placeholder="请输入姓名" value={newApplicant.name} onChange={handleInputChange} />
									</div>
									<div className="space-y-2">
										<Label htmlFor="gender">性别</Label>
										<Select onValueChange={(value) => handleSelectChange("gender", value)}>
											<SelectTrigger>
												<SelectValue placeholder="选择性别" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="male">男</SelectItem>
												<SelectItem value="female">女</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="ethnicity">民族</Label>
										<Select onValueChange={(value) => handleSelectChange("ethnicity", value)}>
											<SelectTrigger>
												<SelectValue placeholder="选择民族" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="汉族">汉族</SelectItem>
												<SelectItem value="回族">回族</SelectItem>
												<SelectItem value="维吾尔族">维吾尔族</SelectItem>
												<SelectItem value="藏族">藏族</SelectItem>
												<SelectItem value="蒙古族">蒙古族</SelectItem>
												<SelectItem value="其他">其他</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="space-y-2">
										<Label htmlFor="contact">联系方式</Label>
										<Input
											id="contact"
											placeholder="请输入联系方式"
											value={newApplicant.contact}
											onChange={handleInputChange}
										/>
									</div>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="student_id">学号</Label>
										<Input
											id="student_id"
											placeholder="请输入学号"
											value={newApplicant.student_id}
											onChange={handleInputChange}
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="class_name">班级</Label>
										<Input
											id="class_name"
											placeholder="请输入班级"
											value={newApplicant.class_name}
											onChange={handleInputChange}
										/>
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor="apply_date">申请日期</Label>
									<Input id="apply_date" type="date" value={newApplicant.apply_date} onChange={handleInputChange} />
								</div>
								<div className="space-y-2">
									<Label htmlFor="reason">入党动机</Label>
									<Textarea
										id="reason"
										placeholder="请输入入党动机"
										value={newApplicant.reason}
										onChange={handleInputChange}
									/>
								</div>
							</div>
							<DialogFooter>
								<Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
									取消
								</Button>
								<Button onClick={handleAddApplicant}>添加</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</div>

			<div className="relative">
				<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input
					type="search"
					placeholder="搜索申请人姓名、学号或班级..."
					className="pl-8"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>入党申请人列表</CardTitle>
					<CardDescription>共 {filteredApplicants.length} 名入党申请人</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="rounded-md border">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-12 text-center">
										<Checkbox
											checked={selectedApplicants.length === filteredApplicants.length && filteredApplicants.length > 0}
											onCheckedChange={(checked) => {
												if (checked) {
													setSelectedApplicants(filteredApplicants.map((a) => a.id))
												} else {
													setSelectedApplicants([])
												}
											}}
											aria-label="Select all"
										/>
									</TableHead>
									<TableHead className="text-center">姓名</TableHead>
									<TableHead className="text-center">性别</TableHead>
									<TableHead className="text-center">民族</TableHead>
									<TableHead className="text-center">学号</TableHead>
									<TableHead className="text-center">班级</TableHead>
									<TableHead className="text-center">申请日期</TableHead>
									<TableHead className="text-center">联系方式</TableHead>
									<TableHead className="text-right">操作</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredApplicants.length > 0 ? (
									filteredApplicants.map((applicant) => (
										<TableRow key={applicant.id}>
											<TableCell className="text-center">
												<Checkbox
													checked={selectedApplicants.includes(applicant.id)}
													onCheckedChange={() => toggleSelectApplicant(applicant.id)}
													aria-label={`Select ${applicant.name}`}
												/>
											</TableCell>
											<TableCell className="text-center">{applicant.name}</TableCell>
											<TableCell className="text-center">{applicant.gender}</TableCell>
											<TableCell className="text-center">{applicant.ethnicity}</TableCell>
											<TableCell className="text-center">{applicant.student_number}</TableCell>
											<TableCell className="text-center">{applicant.class_name}</TableCell>
											<TableCell className="text-center">
												{new Date(applicant.join_date).toLocaleDateString()}
											</TableCell>
											<TableCell className="text-center">{applicant.phone}</TableCell>
											<TableCell className="text-right">
												<div className="flex justify-end gap-2">
													<Button variant="ghost" size="icon">
														<Edit className="h-4 w-4" />
													</Button>
													<Button variant="ghost" size="icon" onClick={() => handleDeleteApplicant(applicant)}>
														<Trash2 className="h-4 w-4" />
													</Button>
												</div>
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={9} className="h-24 text-center">
											未找到符合条件的入党申请人
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
