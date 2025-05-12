"use client"

import {useState} from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Avatar, AvatarFallback} from "@/components/ui/avatar"
import {Badge} from "@/components/ui/badge"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {CheckCircle, Search, XCircle} from "lucide-react"
import {useToast} from "@/hooks/use-toast"

// 模拟转接申请数据
const transferApplications = [
	{
		id: "1",
		name: "吴天宇",
		avatar: "/placeholder.svg?key=gbmz3",
		studentId: "3200439056",
		targetOrganization: "浙江工业大学软件学院党支部",
		reason: "工作就业",
		applyDate: "2024-09-25",
		status: "approved",
	},
	{
		id: "2",
		name: "周晓萌",
		avatar: "/placeholder.svg?key=gbmz3",
		studentId: "3200439041",
		targetOrganization: "腾讯科技有限公司党支部",
		reason: "工作就业",
		applyDate: "2024-07-28",
		status: "approved",
	},
	{
		id: "3",
		name: "刘泽宇",
		avatar: "/placeholder.svg?key=gbmz3",
		studentId: "3200439006",
		targetOrganization: "杭州爱声科技有限公司党支部",
		reason: "工作就业",
		applyDate: "2024-07-12",
		status: "approved",
	},

	{
		id: "4",
		name: "李明壹",
		avatar: "/placeholder.svg?key=xwxiy",
		studentId: "3190439001",
		targetOrganization: "宁波大学计算机学院学生党支部",
		reason: "考研升学",
		applyDate: "2023-08-15",
		status: "approved",
	},
	{
		id: "5",
		name: "王思远",
		avatar: "/placeholder.svg?key=kedzx",
		studentId: "3190439002",
		targetOrganization: "华为技术有限公司党支部",
		reason: "工作就业",
		applyDate: "2023-06-20",
		status: "approved",
	},
	{
		id: "6",
		name: "陈雨欣",
		avatar: "/placeholder.svg?key=1eufs",
		studentId: "3190439023",
		targetOrganization: "浙江理工大学电子信息学院党支部",
		reason: "考研升学",
		applyDate: "2023-10-05",
		status: "approved",
	},
	{
		id: "7",
		name: "陈雨欣",
		avatar: "/placeholder.svg?key=1eufs",
		studentId: "3190439023",
		targetOrganization: "浙江理工大学电子信息学院软件学生党支部",
		reason: "考研升学",
		applyDate: "2023-10-05",
		status: "rejected",
	},
	{
		id: "8",
		name: "张浩然",
		avatar: "/placeholder.svg?key=gbmz3",
		studentId: "3190439056",
		targetOrganization: "腾讯科技有限公司党支部",
		reason: "工作就业",
		applyDate: "2023-12-01",
		status: "pending",
	},
	{
		id: "9",
		name: "赵雅婷",
		avatar: "/placeholder.svg?key=gbmz3",
		studentId: "3200439005",
		targetOrganization: "郑州大学计算机学生党支部",
		reason: "考研升学",
		applyDate: "2023-12-01",
		status: "pending",
	},


]

// 模拟转入申请数据
const incomingTransfers = [
	{
		id: "1",
		name: "钱潮生",
		avatar: "/placeholder.svg?key=9o9wr",
		studentId: "2020010101",
		sourceOrganization: "宁波万里学院计算机系党支部",
		reason: "考研升学",
		applyDate: "2024-11-20",
		status: "approved",
	},
	{
		id: "2",
		name: "孙万璐",
		avatar: "/placeholder.svg?key=pqxtu",
		studentId: "2020010102",
		sourceOrganization: "阿里巴巴集团党支部",
		reason: "工作变动",
		applyDate: "2023-10-15",
		status: "pending",
	},
]

export default function TransferManagementPage() {
	const [searchTerm, setSearchTerm] = useState("")
	const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
	const [selectedTransfer, setSelectedTransfer] = useState<any>(null)
	const [reviewComment, setReviewComment] = useState("")
	const {toast} = useToast()

	// 过滤转出申请
	const filterTransfers = (status: string) => {
		return transferApplications
			.filter((transfer) => status === "all" || transfer.status === status)
			.filter(
				(transfer) =>
					transfer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					transfer.studentId.includes(searchTerm) ||
					transfer.targetOrganization.toLowerCase().includes(searchTerm.toLowerCase()),
			)
	}

	const allTransfers = filterTransfers("all")
	const pendingTransfers = filterTransfers("pending")
	const approvedTransfers = filterTransfers("approved")
	const rejectedTransfers = filterTransfers("rejected")

	// 过滤转入申请
	const filteredIncomingTransfers = incomingTransfers.filter(
		(transfer) =>
			transfer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			transfer.studentId.includes(searchTerm) ||
			transfer.sourceOrganization.toLowerCase().includes(searchTerm.toLowerCase()),
	)

	const handleApprove = () => {
		if (!selectedTransfer) return

		toast({
			title: "申请已批准",
			description: `已批准 ${selectedTransfer.name} 的组织关系转接申请`,
		})
		setIsReviewDialogOpen(false)
		setReviewComment("")
	}

	const handleReject = () => {
		if (!selectedTransfer) return

		toast({
			title: "申请已拒绝",
			description: `已拒绝 ${selectedTransfer.name} 的组织关系转接申请`,
		})
		setIsReviewDialogOpen(false)
		setReviewComment("")
	}

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">组织关系转接</h1>
				<p className="text-muted-foreground">管理党员组织关系转入转出申请</p>
			</div>

			<div className="relative">
				<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
				<Input
					type="search"
					placeholder="搜索党员姓名、学号或组织..."
					className="pl-8"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>

			<Tabs defaultValue="outgoing">
				<TabsList>
					<TabsTrigger value="outgoing">转出申请</TabsTrigger>
					<TabsTrigger value="incoming">转入申请</TabsTrigger>
				</TabsList>
				<TabsContent value="outgoing">
					<Tabs defaultValue="all">
						<TabsList>
							<TabsTrigger value="all">全部</TabsTrigger>
							<TabsTrigger value="pending">待审核</TabsTrigger>
							<TabsTrigger value="approved">已批准</TabsTrigger>
							<TabsTrigger value="rejected">已拒绝</TabsTrigger>
						</TabsList>
						<TabsContent value="all">
							<Card>
								<CardHeader>
									<CardTitle>全部转出申请</CardTitle>
									<CardDescription>所有组织关系转出申请，共 {allTransfers.length} 条</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="grid gap-4">
										{allTransfers.length > 0 ? (
											allTransfers.map((transfer) => (
												<div key={transfer.id}
													 className="flex items-center justify-between p-4 border rounded-lg">
													<div className="flex items-center space-x-4">
														<Avatar>
															<AvatarFallback>{transfer.name.substring(transfer.name.length - 2)}</AvatarFallback>
														</Avatar>
														<div>
															<p className="font-medium">{transfer.name}</p>
															<p className="text-sm text-muted-foreground">{transfer.studentId}</p>
														</div>
													</div>
													<div className="flex items-center space-x-4">
														<div className="text-sm text-right">
															<p>目标组织: {transfer.targetOrganization}</p>
															<p className="text-muted-foreground">申请日期: {transfer.applyDate}</p>
														</div>
														<Badge
															variant={
																transfer.status === "approved"
																	? "outline"
																	: transfer.status === "rejected"
																		? "destructive"
																		: "secondary"
															}
														>
															{transfer.status === "pending"
																? "待审核"
																: transfer.status === "approved"
																	? "已批准"
																	: "已拒绝"}
														</Badge>
														{transfer.status === "pending" && (
															<Dialog
																open={isReviewDialogOpen && selectedTransfer?.id === transfer.id}
																onOpenChange={(open) => {
																	setIsReviewDialogOpen(open)
																	if (open) setSelectedTransfer(transfer)
																	else setReviewComment("")
																}}
															>
																<DialogTrigger asChild>
																	<Button>审核</Button>
																</DialogTrigger>
																<DialogContent>
																	<DialogHeader>
																		<DialogTitle>审核转接申请</DialogTitle>
																		<DialogDescription>审核 {transfer.name} 的组织关系转接申请</DialogDescription>
																	</DialogHeader>
																	<div className="grid gap-4 py-4">
																		<div className="grid grid-cols-2 gap-4">
																			<div>
																				<Label>申请人</Label>
																				<p className="text-sm font-medium">{transfer.name}</p>
																			</div>
																			<div>
																				<Label>学号</Label>
																				<p className="text-sm font-medium">{transfer.studentId}</p>
																			</div>
																		</div>
																		<div>
																			<Label>目标组织</Label>
																			<p className="text-sm font-medium">{transfer.targetOrganization}</p>
																		</div>
																		<div>
																			<Label>申请原因</Label>
																			<p className="text-sm font-medium">{transfer.reason}</p>
																		</div>
																		<div>
																			<Label>申请日期</Label>
																			<p className="text-sm font-medium">{transfer.applyDate}</p>
																		</div>
																		<div className="space-y-2">
																			<Label htmlFor="comment">审核意见</Label>
																			<Textarea
																				id="comment"
																				placeholder="请输入审核意见"
																				value={reviewComment}
																				onChange={(e) => setReviewComment(e.target.value)}
																			/>
																		</div>
																	</div>
																	<DialogFooter
																		className="flex space-x-2 justify-end">
																		<Button variant="outline"
																				onClick={() => setIsReviewDialogOpen(false)}>
																			取消
																		</Button>
																		<Button variant="destructive"
																				onClick={handleReject}>
																			拒绝
																		</Button>
																		<Button onClick={handleApprove}>批准</Button>
																	</DialogFooter>
																</DialogContent>
															</Dialog>
														)}
													</div>
												</div>
											))
										) : (
											<div
												className="text-center py-4 text-muted-foreground">未找到符合条件的转出申请</div>
										)}
									</div>
								</CardContent>
							</Card>
						</TabsContent>
						<TabsContent value="pending">
							<Card>
								<CardHeader>
									<CardTitle>待审核转出申请</CardTitle>
									<CardDescription>待审核的组织关系转出申请，共 {pendingTransfers.length} 条</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="grid gap-4">
										{pendingTransfers.length > 0 ? (
											pendingTransfers.map((transfer) => (
												<div key={transfer.id}
													 className="flex items-center justify-between p-4 border rounded-lg">
													<div className="flex items-center space-x-4">
														<Avatar>
															<AvatarFallback>{transfer.name.substring(transfer.name.length - 2)}</AvatarFallback>
														</Avatar>
														<div>
															<p className="font-medium">{transfer.name}</p>
															<p className="text-sm text-muted-foreground">{transfer.studentId}</p>
														</div>
													</div>
													<div className="flex items-center space-x-4">
														<div className="text-sm text-right">
															<p>目标组织: {transfer.targetOrganization}</p>
															<p className="text-muted-foreground">申请日期: {transfer.applyDate}</p>
														</div>
														<Badge variant="secondary">待审核</Badge>
														<Dialog
															open={isReviewDialogOpen && selectedTransfer?.id === transfer.id}
															onOpenChange={(open) => {
																setIsReviewDialogOpen(open)
																if (open) setSelectedTransfer(transfer)
																else setReviewComment("")
															}}
														>
															<DialogTrigger asChild>
																<Button>审核</Button>
															</DialogTrigger>
															<DialogContent>
																<DialogHeader>
																	<DialogTitle>审核转接申请</DialogTitle>
																	<DialogDescription>审核 {transfer.name} 的组织关系转接申请</DialogDescription>
																</DialogHeader>
																<div className="grid gap-4 py-4">
																	<div className="grid grid-cols-2 gap-4">
																		<div>
																			<Label>申请人</Label>
																			<p className="text-sm font-medium">{transfer.name}</p>
																		</div>
																		<div>
																			<Label>学号</Label>
																			<p className="text-sm font-medium">{transfer.studentId}</p>
																		</div>
																	</div>
																	<div>
																		<Label>目标组织</Label>
																		<p className="text-sm font-medium">{transfer.targetOrganization}</p>
																	</div>
																	<div>
																		<Label>申请原因</Label>
																		<p className="text-sm font-medium">{transfer.reason}</p>
																	</div>
																	<div>
																		<Label>申请日期</Label>
																		<p className="text-sm font-medium">{transfer.applyDate}</p>
																	</div>
																	<div className="space-y-2">
																		<Label htmlFor="comment">审核意见</Label>
																		<Textarea
																			id="comment"
																			placeholder="请输入审核意见"
																			value={reviewComment}
																			onChange={(e) => setReviewComment(e.target.value)}
																		/>
																	</div>
																</div>
																<DialogFooter className="flex space-x-2 justify-end">
																	<Button variant="outline"
																			onClick={() => setIsReviewDialogOpen(false)}>
																		取消
																	</Button>
																	<Button variant="destructive"
																			onClick={handleReject}>
																		拒绝
																	</Button>
																	<Button onClick={handleApprove}>批准</Button>
																</DialogFooter>
															</DialogContent>
														</Dialog>
													</div>
												</div>
											))
										) : (
											<div
												className="text-center py-4 text-muted-foreground">未找到符合条件的待审核转出申请</div>
										)}
									</div>
								</CardContent>
							</Card>
						</TabsContent>
						<TabsContent value="approved">
							<Card>
								<CardHeader>
									<CardTitle>已批准转出申请</CardTitle>
									<CardDescription>已批准的组织关系转出申请，共 {approvedTransfers.length} 条</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="grid gap-4">
										{approvedTransfers.length > 0 ? (
											approvedTransfers.map((transfer) => (
												<div key={transfer.id}
													 className="flex items-center justify-between p-4 border rounded-lg">
													<div className="flex items-center space-x-4">
														<Avatar>
															<AvatarFallback>{transfer.name.substring(transfer.name.length - 2)}</AvatarFallback>
														</Avatar>
														<div>
															<p className="font-medium">{transfer.name}</p>
															<p className="text-sm text-muted-foreground">{transfer.studentId}</p>
														</div>
													</div>
													<div className="flex items-center space-x-4">
														<div className="text-sm text-right">
															<p>目标组织: {transfer.targetOrganization}</p>
															<p className="text-muted-foreground">申请日期: {transfer.applyDate}</p>
														</div>
														<Badge variant="outline">已批准</Badge>
														<Button variant="outline" size="sm">
															查看详情
														</Button>
													</div>
												</div>
											))
										) : (
											<div
												className="text-center py-4 text-muted-foreground">未找到符合条件的已批准转出申请</div>
										)}
									</div>
								</CardContent>
							</Card>
						</TabsContent>
						<TabsContent value="rejected">
							<Card>
								<CardHeader>
									<CardTitle>已拒绝转出申请</CardTitle>
									<CardDescription>已拒绝的组织关系转出申请，共 {rejectedTransfers.length} 条</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="grid gap-4">
										{rejectedTransfers.length > 0 ? (
											rejectedTransfers.map((transfer) => (
												<div key={transfer.id}
													 className="flex items-center justify-between p-4 border rounded-lg">
													<div className="flex items-center space-x-4">
														<Avatar>
															<AvatarFallback>{transfer.name.substring(transfer.name.length - 2)}</AvatarFallback>
														</Avatar>
														<div>
															<p className="font-medium">{transfer.name}</p>
															<p className="text-sm text-muted-foreground">{transfer.studentId}</p>
														</div>
													</div>
													<div className="flex items-center space-x-4">
														<div className="text-sm text-right">
															<p>目标组织: {transfer.targetOrganization}</p>
															<p className="text-muted-foreground">申请日期: {transfer.applyDate}</p>
														</div>
														<Badge variant="destructive">已拒绝</Badge>
														<Button variant="outline" size="sm">
															查看详情
														</Button>
													</div>
												</div>
											))
										) : (
											<div
												className="text-center py-4 text-muted-foreground">未找到符合条件的已拒绝转出申请</div>
										)}
									</div>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</TabsContent>
				<TabsContent value="incoming">
					<Card>
						<CardHeader>
							<CardTitle>转入申请</CardTitle>
							<CardDescription>组织关系转入申请，共 {filteredIncomingTransfers.length} 条</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid gap-4">
								{filteredIncomingTransfers.length > 0 ? (
									filteredIncomingTransfers.map((transfer) => (
										<div key={transfer.id}
											 className="flex items-center justify-between p-4 border rounded-lg">
											<div className="flex items-center space-x-4">
												<Avatar>
													<AvatarFallback>{transfer.name.substring(transfer.name.length - 2)}</AvatarFallback>
												</Avatar>
												<div>
													<p className="font-medium">{transfer.name}</p>
													<p className="text-sm text-muted-foreground">{transfer.studentId}</p>
												</div>
											</div>
											<div className="flex items-center space-x-4">
												<div className="text-sm text-right">
													<p>来源组织: {transfer.sourceOrganization}</p>
													<p className="text-muted-foreground">申请日期: {transfer.applyDate}</p>
												</div>
												<Badge
													variant={
														transfer.status === "approved"
															? "outline"
															: transfer.status === "rejected"
																? "destructive"
																: "secondary"
													}
												>
													{transfer.status === "pending"
														? "待审核"
														: transfer.status === "approved"
															? "已批准"
															: "已拒绝"}
												</Badge>
												{transfer.status === "pending" ? (
													<div className="flex space-x-2">
														<Button
															size="sm"
															variant="outline"
															onClick={() =>
																toast({
																	title: "申请已拒绝",
																	description: `已拒绝 ${transfer.name} 的组织关系转入申请`,
																})
															}
														>
															<XCircle className="mr-2 h-4 w-4"/>
															拒绝
														</Button>
														<Button
															size="sm"
															onClick={() =>
																toast({
																	title: "申请已批准",
																	description: `已批准 ${transfer.name} 的组织关系转入申请`,
																})
															}
														>
															<CheckCircle className="mr-2 h-4 w-4"/>
															批准
														</Button>
													</div>
												) : (
													<Button variant="outline" size="sm">
														查看详情
													</Button>
												)}
											</div>
										</div>
									))
								) : (
									<div
										className="text-center py-4 text-muted-foreground">未找到符合条件的转入申请</div>
								)}
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}
