"use client"

import type React from "react"
import {useRef, useState} from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {FileDown, FileUp, Plus, Save, Search, Trash2} from "lucide-react"
import {useToast} from "@/hooks/use-toast"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"

// 党员身份类型
const memberTypes = [
	{id: "all", name: "全部"},
	{id: "applicant", name: "入党申请人"},
	{id: "activist", name: "入党积极分子"},
	{id: "development", name: "发展对象"},
	{id: "probationary", name: "预备党员"},
	{id: "formal", name: "正式党员"},
]

// 模拟党员数据
const initialPartyMembers = [

	{
		id: 1,
		name: "王俊吉",
		department: "大数据212班",
		moralRanking: 0.15, // 德育排名
		academicLevel: 0.14, // 学业水平
		assessmentScore: 85, // 等级考核分
		volunteerHours: 45.5, // 志愿服务时长
		dormitoryRanking: 0.06, // 寝室卫生排名
		behaviorScore: 0, // 行为分数
		massResearchScore: 4.30, // 群众调研分数
		memberType: "development", // 党员身份类型
	},
	{
		id: 2,
		name: "赵晨迪",
		department: "大数据212班",
		moralRanking: 0.03,
		academicLevel: 0.53,
		assessmentScore: 85,
		volunteerHours: 76.5,
		dormitoryRanking: 0.25,
		behaviorScore: 0,
		massResearchScore: 4.40,
		memberType: "development",

	},
	{
		id: 3,
		name: "苏青荣",
		department: "大数据221班",
		moralRanking: 0.26,
		academicLevel: 0.20,
		assessmentScore: 60,
		volunteerHours: 14.0,
		dormitoryRanking: 0.01,
		behaviorScore: 0,
		massResearchScore: 4.48,
		memberType: "development",
	},
	{
		id: 4,
		name: "赵斌",
		department: "大数据221班",
		moralRanking: 21.00,
		academicLevel: 8.00,
		assessmentScore: 85,
		volunteerHours: 30.5,
		dormitoryRanking: 0.55,
		behaviorScore: 0,
		massResearchScore: 4.57,
		memberType: "development",
	},
	{
		id: 5,
		name: "申兰路",
		department: "大数据221班",
		moralRanking: 0.03,
		academicLevel: 0.42,
		assessmentScore: 95,
		volunteerHours: 98.0,
		dormitoryRanking: 0.19,
		behaviorScore: 20,
		massResearchScore: 4.58,
		memberType: "development",
	},
	{
		id: 6,
		name: "陈东琪",
		department: "大数据222班",
		moralRanking: 0.03,
		academicLevel: 0.03,
		assessmentScore: 60,
		volunteerHours: 112.0,
		dormitoryRanking: 0.33,
		behaviorScore: 0,
		massResearchScore: 4.60,
		memberType: "development",
	},
	{
		id: 7,
		name: "陆清妍",
		department: "大数据211班",
		moralRanking: 0.10,
		academicLevel: 0.27,
		assessmentScore: 85,
		volunteerHours: 8.5,
		dormitoryRanking: 0.74,
		behaviorScore: 0,
		massResearchScore: 4.36,
		memberType: "activist",
	}

]

// 空行模板
const emptyMemberTemplate = {
	id: 0,
	name: "",
	department: "",
	moralRanking: 0,
	academicLevel: 0,
	assessmentScore: 0,
	volunteerHours: 0,
	dormitoryRanking: 0,
	behaviorScore: 0,
	massResearchScore: 0,
	memberType: "applicant",
}

// 生成学年选项
const generateAcademicYears = () => {
	const currentYear = new Date().getFullYear()
	const years = []
	// 生成最近5个学年
	for (let i = 0; i < 5; i++) {
		const startYear = currentYear - i
		const endYear = startYear + 1
		years.push(`${startYear}-${endYear}`)
	}
	return years
}

const academicYears = generateAcademicYears()

const PortraitEntryPageContent: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState("")
	const [selectedYear, setSelectedYear] = useState(academicYears[0])
	const [selectedMemberType, setSelectedMemberType] = useState("all")
	const [partyMembers, setPartyMembers] = useState([...initialPartyMembers])
	const [editingCell, setEditingCell] = useState<{ rowId: number | null; field: string | null }>({
		rowId: null,
		field: null,
	})
	const inputRef = useRef<HTMLInputElement>(null)
	const {toast} = useToast()

	// 过滤党员
	const filteredMembers = partyMembers.filter((member) => {
		// 先按搜索词过滤
		const matchesSearch =
			member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			member.department.toLowerCase().includes(searchTerm.toLowerCase())

		// 再按身份类型过滤
		const matchesType = selectedMemberType === "all" || member.memberType === selectedMemberType

		return matchesSearch && matchesType
	})

	// 处理单元格点击
	const handleCellClick = (memberId: number, field: string) => {
		setEditingCell({rowId: memberId, field})
		// 聚焦到输入框
		setTimeout(() => {
			if (inputRef.current) {
				inputRef.current.focus()
				inputRef.current.select()
			}
		}, 0)
	}

	// 处理单元格值变化
	const handleCellChange = (value: string, memberId: number, field: string) => {
		const updatedMembers = partyMembers.map((member) => {
			if (member.id === memberId) {
				let parsedValue: number | string = value

				// 根据字段类型进行不同的解析和验证
				switch (field) {
					case "moralRanking":
					case "academicLevel":
					case "dormitoryRanking":
						parsedValue = Math.min(Math.max(Number.parseFloat(value) || 0, 0), 1)
						break
					case "assessmentScore":
						parsedValue = Math.min(Math.max(Number.parseInt(value) || 0, 0), 100)
						break
					case "volunteerHours":
						parsedValue = Math.min(Math.max(Number.parseFloat(value) || 0, 0), 100)
						break
					case "behaviorScore":
						parsedValue = Math.min(Math.max(Number.parseInt(value) || 0, 0), 10)
						break
					case "massResearchScore":
						// 限制为0-5之间的两位小数
						const num = Number.parseFloat(value) || 0
						parsedValue = Math.min(Math.max(Number(num.toFixed(2)), 0), 5)
						break
					case "memberType":
						// 字符串类型，不需要解析
						break
					default:
						if (typeof member[field as keyof typeof member] === "number") {
							parsedValue = Number(value) || 0
						}
				}

				return {
					...member,
					[field]: parsedValue,
				}
			}
			return member
		})

		setPartyMembers(updatedMembers)
	}

	// 处理单元格失去焦点
	const handleCellBlur = () => {
		setEditingCell({rowId: null, field: null})
	}

	// 处理键盘导航
	const handleKeyDown = (e: React.KeyboardEvent, rowIndex: number, fieldIndex: number, fields: string[]) => {
		const member = filteredMembers[rowIndex]

		if (e.key === "Enter") {
			e.preventDefault()
			handleCellBlur()
		} else if (e.key === "Tab") {
			e.preventDefault()

			// 确定下一个单元格位置
			let nextRowIndex = rowIndex
			let nextFieldIndex = fieldIndex + (e.shiftKey ? -1 : 1)

			// 如果到达行末尾或行开头
			if (nextFieldIndex >= fields.length) {
				nextRowIndex++
				nextFieldIndex = 0
			} else if (nextFieldIndex < 0) {
				nextRowIndex--
				nextFieldIndex = fields.length - 1
			}

			// 确保索引在有效范围内
			if (nextRowIndex >= 0 && nextRowIndex < filteredMembers.length) {
				const nextMember = filteredMembers[nextRowIndex]
				const nextField = fields[nextFieldIndex]

				// 设置下一个编辑单元格
				setEditingCell({rowId: nextMember.id, field: nextField})

				// 聚焦到下一个输入框
				setTimeout(() => {
					if (inputRef.current) {
						inputRef.current.focus()
						inputRef.current.select()
					}
				}, 0)
			}
		}
	}

	// 添加新行
	const addNewRow = () => {
		const newId = Math.max(...partyMembers.map((m) => m.id)) + 1
		setPartyMembers([...partyMembers, {...emptyMemberTemplate, id: newId}])

		// 聚焦到新行的姓名字段
		setTimeout(() => {
			setEditingCell({rowId: newId, field: "name"})
			if (inputRef.current) {
				inputRef.current.focus()
			}
		}, 0)
	}

	// 删除行
	const deleteRow = (id: number) => {
		setPartyMembers(partyMembers.filter((member) => member.id !== id))
		toast({
			title: "删除成功",
			description: "已删除该行数据",
		})
	}

	// 保存所有数据
	const saveAllData = () => {
		// 这里应该有保存数据到后端的逻辑
		toast({
			title: "数据保存成功",
			description: `已成功保存${selectedYear}学年的所有党员画像数据`,
		})
	}

	// 格式化百分比显示
	const formatPercent = (value: number) => {
		return `${value.toFixed(2)}`
		// return `${(value * 100).toFixed(1)}%`
	}

	// 可编辑字段列表
	const editableFields = [
		"name",
		"department",
		"memberType",
		"moralRanking",
		"academicLevel",
		"assessmentScore",
		"volunteerHours",
		"dormitoryRanking",
		"behaviorScore",
		"massResearchScore",
	]

	// 字段标题映射
	const fieldTitles: Record<string, string> = {
		name: "姓名",
		department: "班级",
		memberType: "身份类型",
		moralRanking: "德育排名",
		academicLevel: "学业水平",
		assessmentScore: "等级考核分",
		volunteerHours: "志愿服务时长",
		dormitoryRanking: "寝室卫生排名",
		behaviorScore: "行为分数",
		massResearchScore: "群众调研分数",
	}

	// 字段提示映射
	const fieldPlaceholders: Record<string, string> = {
		name: "输入姓名",
		department: "输入班级",
		memberType: "选择身份类型",
		moralRanking: "0-1小数",
		academicLevel: "0-1小数",
		assessmentScore: "0-100整数",
		volunteerHours: "0-100小数",
		dormitoryRanking: "0-1小数",
		behaviorScore: "0-20整数",
		massResearchScore: "0-5小数",
	}

	// 字段格式化显示
	const formatFieldValue = (value: any, field: string) => {
		if (field === "moralRanking" || field === "academicLevel" || field === "dormitoryRanking") {
			return formatPercent(value)
		} else if (field === "volunteerHours") {
			return `${value.toFixed(1)}小时`
		} else if (field === "behaviorScore") {
			return `${value}/20`
		} else if (field === "assessmentScore") {
			return `${value}分`
		} else if (field === "massResearchScore") {
			return value.toFixed(2)
		} else if (field === "memberType") {
			const type = memberTypes.find((t) => t.id === value)
			return type ? type.name : value
		}
		return value
	}

	// 渲染身份类型选择器
	const renderMemberTypeSelector = (member: any, field: string) => {
		return (
			<Select
				value={member[field]}
				onValueChange={(value) => {
					handleCellChange(value, member.id, field)
					handleCellBlur()
				}}
			>
				<SelectTrigger className="h-8 w-full">
					<SelectValue placeholder="选择身份类型"/>
				</SelectTrigger>
				<SelectContent>
					{memberTypes
						.filter((t) => t.id !== "all")
						.map((type) => (
							<SelectItem key={type.id} value={type.id}>
								{type.name}
							</SelectItem>
						))}
				</SelectContent>
			</Select>
		)
	}

	return (
		<div className="container mx-auto py-6 space-y-6">
			<div className="space-y-4">
				<div className="flex flex-col md:flex-row justify-between gap-4">
					<h1 className="text-2xl font-bold">党员画像数据录入</h1>
					<div className="flex gap-2">
						<div className="relative">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
							<Input
								type="search"
								placeholder="搜索党员..."
								className="pl-8 w-[200px]"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
						<Select value={selectedMemberType} onValueChange={setSelectedMemberType}>
							<SelectTrigger className="w-[140px]">
								<SelectValue placeholder="选择身份类型"/>
							</SelectTrigger>
							<SelectContent>
								{memberTypes.map((type) => (
									<SelectItem key={type.id} value={type.id}>
										{type.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Button variant="outline" onClick={addNewRow}>
							<Plus className="h-4 w-4 mr-2"/>
							添加行
						</Button>
						<Button onClick={saveAllData}>
							<Save className="h-4 w-4 mr-2"/>
							保存数据
						</Button>
					</div>
				</div>

				<div className="flex flex-col md:flex-row items-center gap-4 bg-muted/30 p-4 rounded-lg border">
					<div className="font-medium">选择学年：</div>
					<div className="flex gap-2 flex-wrap">
						{academicYears.map((year) => (
							<Button
								key={year}
								variant={selectedYear === year ? "default" : "outline"}
								size="sm"
								onClick={() => {
									setSelectedYear(year)
									// 这里可以添加加载对应学年数据的逻辑
									toast({
										title: `已切换到 ${year} 学年`,
										description: "已加载该学年的党员画像数据",
									})
								}}
							>
								{year} 学年
							</Button>
						))}
					</div>
				</div>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>党员画像数据表格 - {selectedYear} 学年</CardTitle>
					<CardDescription>
						使用Excel风格的表格录入{selectedYear}学年的党员画像数据，点击单元格可直接编辑，按Tab键可在单元格间导航
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="border rounded-md overflow-auto">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[50px] text-center">#</TableHead>
									<TableHead className="text-center">姓名</TableHead>
									<TableHead className="text-center">班级</TableHead>
									<TableHead className="text-center">
										身份类型
										<div className="text-xs text-muted-foreground">党员身份</div>
									</TableHead>
									<TableHead className="text-center">
										德育排名
										<div className="text-xs text-muted-foreground">百分比小数</div>
									</TableHead>
									<TableHead className="text-center">
										学业水平
										<div className="text-xs text-muted-foreground">0-1小数</div>
									</TableHead>
									<TableHead className="text-center">
										干部考核分
										<div className="text-xs text-muted-foreground">0-100整数</div>
									</TableHead>
									<TableHead className="text-center">
										志愿服务时长
										<div className="text-xs text-muted-foreground">0-100小数</div>
									</TableHead>
									<TableHead className="text-center">
										寝室卫生排名
										<div className="text-xs text-muted-foreground">百分比小数</div>
									</TableHead>
									<TableHead className="text-center">
										行为分数
										<div className="text-xs text-muted-foreground">0-20整数</div>
									</TableHead>
									<TableHead className="text-center">
										群众调研分数
										<div className="text-xs text-muted-foreground">0-5两位小数</div>
									</TableHead>
									<TableHead className="w-[80px] text-center">操作</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredMembers.length === 0 ? (
									<TableRow>
										<TableCell colSpan={12} className="text-center py-4 text-muted-foreground">
											未找到符合条件的党员数据
										</TableCell>
									</TableRow>
								) : (
									filteredMembers.map((member, rowIndex) => (
										<TableRow key={member.id}>
											<TableCell className="text-center font-medium">{rowIndex + 1}</TableCell>
											{editableFields.map((field, fieldIndex) => (
												<TableCell
													key={field}
													className={`text-center cursor-pointer hover:bg-muted/50 ${editingCell.rowId === member.id && editingCell.field === field ? "bg-primary/10" : ""}`}
													onClick={() => handleCellClick(member.id, field)}
												>
													{editingCell.rowId === member.id && editingCell.field === field ? (
														field === "memberType" ? (
															renderMemberTypeSelector(member, field)
														) : (
															<Input
																ref={inputRef}
																type={
																	field === "assessmentScore" || field === "behaviorScore"
																		? "number"
																		: field === "moralRanking" ||
																		field === "academicLevel" ||
																		field === "volunteerHours" ||
																		field === "dormitoryRanking" ||
																		field === "massResearchScore"
																			? "number"
																			: "text"
																}
																step={
																	field === "volunteerHours"
																		? "0.5"
																		: field === "moralRanking" ||
																		field === "academicLevel" ||
																		field === "dormitoryRanking"
																			? "0.01"
																			: field === "massResearchScore"
																				? "0.01"
																				: "1"
																}
																min={0}
																max={
																	field === "assessmentScore"
																		? 100
																		: field === "behaviorScore"
																			? 10
																			: field === "volunteerHours"
																				? 100
																				: field === "moralRanking" ||
																				field === "academicLevel" ||
																				field === "dormitoryRanking"
																					? 1
																					: field === "massResearchScore"
																						? 5
																						: undefined
																}
																className="h-8 text-center"
																value={String(member[field as keyof typeof member])}
																onChange={(e) => handleCellChange(e.target.value, member.id, field)}
																onBlur={handleCellBlur}
																onKeyDown={(e) => handleKeyDown(e, rowIndex, fieldIndex, editableFields)}
																placeholder={fieldPlaceholders[field]}
															/>
														)
													) : (
														<div className="py-1.5">
															{formatFieldValue(member[field as keyof typeof member], field)}
														</div>
													)}
												</TableCell>
											))}
											<TableCell className="text-center">
												<Button
													variant="ghost"
													size="icon"
													className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100"
													onClick={() => deleteRow(member.id)}
												>
													<Trash2 className="h-4 w-4"/>
												</Button>
											</TableCell>
										</TableRow>
									))
								)}
							</TableBody>
						</Table>
					</div>

					<div className="flex justify-between mt-4">
						<div className="text-sm text-muted-foreground">
							共 {filteredMembers.length} 条数据
							{(searchTerm || selectedMemberType !== "all") && ` (已筛选，总共 ${partyMembers.length} 条)`}
						</div>
						<div className="flex gap-2">
							<Button variant="outline" size="sm">
								<FileUp className="h-4 w-4 mr-2"/>
								导入数据
							</Button>
							<Button variant="outline" size="sm">
								<FileDown className="h-4 w-4 mr-2"/>
								导出数据
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

export default function PortraitEntryPage() {
	return <PortraitEntryPageContent/>
}
