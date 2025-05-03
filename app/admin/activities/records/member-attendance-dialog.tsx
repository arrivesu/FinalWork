"use client"

import {useState} from "react"
import {Button} from "@/components/ui/button"
import {Checkbox} from "@/components/ui/checkbox"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Check, Search, UserCheck} from "lucide-react"

// 模拟党员数据
const partyMembers = [
	{id: 1, studentId: "2020001", name: "张三", status: "正常参会"},
	{id: 2, studentId: "2020002", name: "李四", status: "正常参会"},
	{id: 3, studentId: "2020003", name: "王五", status: "正常参会"},
	{id: 4, studentId: "2020004", name: "赵六", status: "正常参会"},
	{id: 5, studentId: "2020005", name: "钱七", status: "正常参会"},
	{id: 6, studentId: "2020006", name: "孙八", status: "正常参会"},
	{id: 7, studentId: "2020007", name: "周九", status: "正常参会"},
	{id: 8, studentId: "2020008", name: "吴十", status: "正常参会"},
	{id: 9, studentId: "2020009", name: "郑十一", status: "正常参会"},
	{id: 10, studentId: "2020010", name: "王十二", status: "正常参会"},
]

const attendanceStatuses = [
	{value: "正常参会", label: "正常参会"},
	{value: "请假", label: "请假"},
	{value: "迟到", label: "迟到"},
	{value: "旷会", label: "旷会"},
]

interface MemberAttendanceDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	activityId?: string
	onSave: (members: typeof partyMembers) => void
}

export function MemberAttendanceDialog({open, onOpenChange, activityId, onSave}: MemberAttendanceDialogProps) {
	const [members, setMembers] = useState<typeof partyMembers>(partyMembers)
	const [searchTerm, setSearchTerm] = useState("")
	const [selectedMemberIds, setSelectedMemberIds] = useState<number[]>([])
	const [batchStatus, setBatchStatus] = useState("正常参会")

	// 过滤党员
	const filteredMembers = members.filter(
		(member) =>
			member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			member.studentId.toLowerCase().includes(searchTerm.toLowerCase()),
	)

	// 全选/取消全选
	const handleSelectAll = () => {
		if (selectedMemberIds.length === filteredMembers.length) {
			// 如果已经全选，则取消全选
			setSelectedMemberIds([])
		} else {
			// 否则全选
			setSelectedMemberIds(filteredMembers.map((member) => member.id))
		}
	}

	// 选择/取消选择单个成员
	const handleSelectMember = (id: number) => {
		if (selectedMemberIds.includes(id)) {
			setSelectedMemberIds(selectedMemberIds.filter((memberId) => memberId !== id))
		} else {
			setSelectedMemberIds([...selectedMemberIds, id])
		}
	}

	// 批量更新所选成员状态
	const handleBatchUpdateStatus = () => {
		if (selectedMemberIds.length === 0) return

		setMembers(
			members.map((member) => (selectedMemberIds.includes(member.id) ? {
				...member,
				status: batchStatus
			} : member)),
		)

		// 更新后清除选择
		setSelectedMemberIds([])
	}

	// 更新单个成员状态
	const handleStatusChange = (id: number, status: string) => {
		setMembers(members.map((member) => (member.id === id ? {...member, status} : member)))
	}

	// 保存更改
	const handleSave = () => {
		onSave(members)
		onOpenChange(false)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>党员出席情况</DialogTitle>
					<DialogDescription>设置党员参加活动的出席状态</DialogDescription>
				</DialogHeader>

				<div className="flex flex-wrap items-center justify-between gap-4 mb-4">
					<div className="relative w-64 flex-shrink-0">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
						<Input
							type="search"
							placeholder="搜索学号或姓名..."
							className="pl-8"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>

					<div className="flex items-center gap-4 flex-grow justify-end">
						{selectedMemberIds.length > 0 && (
							<div className="text-sm font-medium">已选择 {selectedMemberIds.length} 名党员</div>
						)}
						<Select value={batchStatus} onValueChange={setBatchStatus}>
							<SelectTrigger className="w-[140px]">
								<SelectValue placeholder="选择状态"/>
							</SelectTrigger>
							<SelectContent>
								{attendanceStatuses.map((status) => (
									<SelectItem key={status.value} value={status.value}>
										{status.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Button size="sm" onClick={handleBatchUpdateStatus} disabled={selectedMemberIds.length === 0}>
							<UserCheck className="mr-2 h-4 w-4"/>
							批量设置状态
						</Button>
					</div>
				</div>

				<div className="border rounded-md">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[50px]">
									<Checkbox
										checked={filteredMembers.length > 0 && selectedMemberIds.length === filteredMembers.length}
										onCheckedChange={handleSelectAll}
										aria-label="全选"
									/>
								</TableHead>
								<TableHead className="w-[100px]">学号</TableHead>
								<TableHead>姓名</TableHead>
								<TableHead className="w-[180px]">出席状态</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredMembers.map((member) => (
								<TableRow key={member.id}>
									<TableCell>
										<Checkbox
											checked={selectedMemberIds.includes(member.id)}
											onCheckedChange={() => handleSelectMember(member.id)}
										/>
									</TableCell>
									<TableCell>{member.studentId}</TableCell>
									<TableCell>{member.name}</TableCell>
									<TableCell>
										<Select value={member.status}
												onValueChange={(value) => handleStatusChange(member.id, value)}>
											<SelectTrigger className="w-[160px]">
												<SelectValue placeholder="选择状态"/>
											</SelectTrigger>
											<SelectContent>
												{attendanceStatuses.map((status) => (
													<SelectItem key={status.value} value={status.value}>
														{status.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>

				<DialogFooter className="mt-4">
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						取消
					</Button>
					<Button onClick={handleSave}>
						<Check className="mr-2 h-4 w-4"/>
						保存
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
