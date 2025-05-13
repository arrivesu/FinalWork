"use client"

import {useState} from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import {Checkbox} from "@/components/ui/checkbox"
import {ArrowRight, Edit, Search, Trash2} from "lucide-react"
import {useToast} from "@/hooks/use-toast"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {MemberAPI} from "@/lib/api";

const candidate_member_list = MemberAPI.get().filter((member) => member.identity_type === '发展对象')

export default function CandidatesPage() {
	const [searchTerm, setSearchTerm] = useState("")
	const [isPromoteDialogOpen, setIsPromoteDialogOpen] = useState(false)
	const [selectedCandidates, setSelectedCandidates] = useState<number[]>([])
	const {toast} = useToast()

	// 过滤发展对象
	const filteredCandidates = candidate_member_list.filter(
		(candidate) =>
			candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			candidate.student_number.includes(searchTerm) ||
			candidate.class_name.toLowerCase().includes(searchTerm.toLowerCase()),
	)

	const handlePromote = () => {
		setIsPromoteDialogOpen(false)
		toast({
			title: "转为预备党员成功",
			description: `已将 ${selectedCandidates.length} 名发展对象转为预备党员`,
		})
		setSelectedCandidates([])
	}

	const handleDeleteCandidate = (candidate: any) => {
		toast({
			title: "删除成功",
			description: `发展对象 ${candidate.name} 已成功删除`,
		})
	}

	const toggleSelectCandidate = (id: number) => {
		setSelectedCandidates((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">发展对象</h1>
					<p className="text-muted-foreground">管理发展对象信息</p>
				</div>
				<div className="flex space-x-2">
					<Dialog open={isPromoteDialogOpen} onOpenChange={setIsPromoteDialogOpen}>
						<DialogTrigger asChild>
							<Button variant="outline" disabled={selectedCandidates.length === 0}>
								<ArrowRight className="mr-2 h-4 w-4"/>
								转为预备党员
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>转为预备党员</DialogTitle>
								<DialogDescription>确认将选中的 {selectedCandidates.length} 名发展对象转为预备党员？</DialogDescription>
							</DialogHeader>
							<div className="py-4">
								<p>选中的发展对象：</p>
								<ul className="mt-2 space-y-1">
									{selectedCandidates.map((id) => {
										const candidate = candidate_member_list.find((a) => a.id === id)
										return (
											<li key={id} className="text-sm">
												{candidate?.name} - {candidate?.student_number}
											</li>
										)
									})}
								</ul>
							</div>
							<DialogFooter>
								<Button variant="outline" onClick={() => setIsPromoteDialogOpen(false)}>
									取消
								</Button>
								<Button onClick={handlePromote}>确认转为预备党员</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</div>

			<div className="relative">
				<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
				<Input
					type="search"
					placeholder="搜索发展对象姓名、学号或班级..."
					className="pl-8"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>发展对象列表</CardTitle>
					<CardDescription>共 {filteredCandidates.length} 名发展对象</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="rounded-md border">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-12 text-center">
										<Checkbox
											checked={selectedCandidates.length === filteredCandidates.length && filteredCandidates.length > 0}
											onCheckedChange={(checked) => {
												if (checked) {
													setSelectedCandidates(filteredCandidates.map((c) => c.id))
												} else {
													setSelectedCandidates([])
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
									<TableHead className="text-center">确定为发展对象日期</TableHead>
									<TableHead className="text-center">联系方式</TableHead>
									<TableHead className="text-right">操作</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredCandidates.length > 0 ? (
									filteredCandidates.map((candidate) => (
										<TableRow key={candidate.id}>
											<TableCell className="text-center">
												<Checkbox
													checked={selectedCandidates.includes(candidate.id)}
													onCheckedChange={() => toggleSelectCandidate(candidate.id)}
													aria-label={`Select ${candidate.name}`}
												/>
											</TableCell>
											<TableCell className="text-center">{candidate.name}</TableCell>
											<TableCell className="text-center">{candidate.gender}</TableCell>
											<TableCell className="text-center">{candidate.ethnicity}</TableCell>
											<TableCell className="text-center">{candidate.student_number}</TableCell>
											<TableCell className="text-center">{candidate.class_name}</TableCell>
											<TableCell className="text-center">{candidate.join_date.toDateString()}</TableCell>
											<TableCell className="text-center">{candidate.phone}</TableCell>
											<TableCell className="text-right">
												<div className="flex justify-end gap-2">
													<Button variant="ghost" size="icon">
														<Edit className="h-4 w-4"/>
													</Button>
													<Button variant="ghost" size="icon"
															onClick={() => handleDeleteCandidate(candidate)}>
														<Trash2 className="h-4 w-4"/>
													</Button>
												</div>
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={9} className="h-24 text-center">
											未找到符合条件的发展对象
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
