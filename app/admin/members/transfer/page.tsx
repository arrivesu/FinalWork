"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { TransferAPI } from "@/lib/api/transfer"

// 模拟转接申请数据
const transferApplications = TransferAPI.data

export default function TransferManagementPage() {
	const [searchTerm, setSearchTerm] = useState("")
	const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
	const [selectedTransfer, setSelectedTransfer] = useState<any>(null)
	const [reviewComment, setReviewComment] = useState("")
	const { toast } = useToast()

	// 过滤转出申请
	const filterTransfers = (status: string) => {
		return transferApplications
			.filter((transfer) => status === "all" || transfer.status === status)
			.filter(
				(transfer) =>
					transfer.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					transfer.user.student_number.includes(searchTerm) ||
					transfer.targetOrganization.name.toLowerCase().includes(searchTerm.toLowerCase()),
			)
	}

	const allTransfers = filterTransfers("all")
	const pendingTransfers = filterTransfers("pending")
	const approvedTransfers = filterTransfers("approved")
	const rejectedTransfers = filterTransfers("rejected")

	// Update the handleApprove function to use the TransferAPI
	const handleApprove = async () => {
		if (!selectedTransfer) return

		try {
			// Update the transfer status to approved
			const updatedTransfer = {
				...selectedTransfer,
				status: "approved",
				reviewComment: reviewComment,
			}

			await TransferAPI.save(selectedTransfer.id, updatedTransfer)

			// Update the local state to reflect the change
			const updatedTransfers = transferApplications.map((transfer) =>
				transfer.id === selectedTransfer.id ? updatedTransfer : transfer,
			)

			// Update the state with the new data
			transferApplications.splice(0, transferApplications.length, ...updatedTransfers)

			toast({
				title: "申请已批准",
				description: `已批准 ${selectedTransfer.user.name} 的组织关系转接申请`,
			})
			setIsReviewDialogOpen(false)
			setReviewComment("")
		} catch (error) {
			toast({
				title: "操作失败",
				description: "批准申请时发生错误，请重试",
				variant: "destructive",
			})
		}
	}

	// Update the handleReject function to use the TransferAPI
	const handleReject = async () => {
		if (!selectedTransfer) return

		try {
			// Update the transfer status to rejected
			const updatedTransfer = {
				...selectedTransfer,
				status: "rejected",
				reviewComment: reviewComment,
			}

			await TransferAPI.save(selectedTransfer.id, updatedTransfer)

			// Update the local state to reflect the change
			const updatedTransfers = transferApplications.map((transfer) =>
				transfer.id === selectedTransfer.id ? updatedTransfer : transfer,
			)

			// Update the state with the new data
			transferApplications.splice(0, transferApplications.length, ...updatedTransfers)

			toast({
				title: "申请已拒绝",
				description: `已拒绝 ${selectedTransfer.user.name} 的组织关系转接申请`,
			})
			setIsReviewDialogOpen(false)
			setReviewComment("")
		} catch (error) {
			toast({
				title: "操作失败",
				description: "拒绝申请时发生错误，请重试",
				variant: "destructive",
			})
		}
	}

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">组织关系转接</h1>
				<p className="text-muted-foreground">管理党员组织关系转入转出申请</p>
			</div>

			<div className="relative">
				<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
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
					{/*<TabsTrigger value="incoming">转入申请</TabsTrigger>*/}
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
												<div key={transfer.id} className="flex items-center justify-between p-4 border rounded-lg">
													<div className="flex items-center space-x-4">
														<Avatar>
															<AvatarFallback>
																{transfer.user.name.substring(transfer.user.name.length - 2)}
															</AvatarFallback>
														</Avatar>
														<div>
															<p className="font-medium">{transfer.user.name}</p>
															<p className="text-sm text-muted-foreground">{transfer.user.student_number}</p>
														</div>
													</div>
													<div className="flex items-center space-x-4">
														<div className="text-sm text-right">
															<p>目标组织: {transfer.targetOrganization.name}</p>
															<p className="text-muted-foreground">申请日期: {transfer.applyDate.toDateString()}</p>
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
																		<DialogDescription>审核 {transfer.user.name} 的组织关系转接申请</DialogDescription>
																	</DialogHeader>
																	<div className="grid gap-4 py-4">
																		<div className="grid grid-cols-2 gap-4">
																			<div>
																				<Label>申请人</Label>
																				<p className="text-sm font-medium">{transfer.user.name}</p>
																			</div>
																			<div>
																				<Label>学号</Label>
																				<p className="text-sm font-medium">{transfer.user.student_number}</p>
																			</div>
																		</div>
																		<div>
																			<Label>目标组织</Label>
																			<p className="text-sm font-medium">{transfer.targetOrganization.name}</p>
																		</div>
																		<div>
																			<Label>申请原因</Label>
																			<p className="text-sm font-medium">{transfer.reason}</p>
																		</div>
																		<div>
																			<Label>申请日期</Label>
																			<p className="text-sm font-medium">{transfer.applyDate.toDateString()}</p>
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
																		<Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
																			取消
																		</Button>
																		<Button variant="destructive" onClick={handleReject}>
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
											<div className="text-center py-4 text-muted-foreground">未找到符合条件的转出申请</div>
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
												<div key={transfer.id} className="flex items-center justify-between p-4 border rounded-lg">
													<div className="flex items-center space-x-4">
														<Avatar>
															<AvatarFallback>
																{transfer.user.name.substring(transfer.user.name.length - 2)}
															</AvatarFallback>
														</Avatar>
														<div>
															<p className="font-medium">{transfer.user.name}</p>
															<p className="text-sm text-muted-foreground">{transfer.user.student_number}</p>
														</div>
													</div>
													<div className="flex items-center space-x-4">
														<div className="text-sm text-right">
															<p>目标组织: {transfer.targetOrganization.name}</p>
															<p className="text-muted-foreground">申请日期: {transfer.applyDate.toDateString()}</p>
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
																	<DialogDescription>审核 {transfer.user.name} 的组织关系转接申请</DialogDescription>
																</DialogHeader>
																<div className="grid gap-4 py-4">
																	<div className="grid grid-cols-2 gap-4">
																		<div>
																			<Label>申请人</Label>
																			<p className="text-sm font-medium">{transfer.user.name}</p>
																		</div>
																		<div>
																			<Label>学号</Label>
																			<p className="text-sm font-medium">{transfer.user.student_number}</p>
																		</div>
																	</div>
																	<div>
																		<Label>目标组织</Label>
																		<p className="text-sm font-medium">{transfer.targetOrganization.name}</p>
																	</div>
																	<div>
																		<Label>申请原因</Label>
																		<p className="text-sm font-medium">{transfer.reason}</p>
																	</div>
																	<div>
																		<Label>申请日期</Label>
																		<p className="text-sm font-medium">{transfer.applyDate.toDateString()}</p>
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
																	<Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
																		取消
																	</Button>
																	<Button variant="destructive" onClick={handleReject}>
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
											<div className="text-center py-4 text-muted-foreground">未找到符合条件的待审核转出申请</div>
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
												<div key={transfer.id} className="flex items-center justify-between p-4 border rounded-lg">
													<div className="flex items-center space-x-4">
														<Avatar>
															<AvatarFallback>
																{transfer.user.name.substring(transfer.user.name.length - 2)}
															</AvatarFallback>
														</Avatar>
														<div>
															<p className="font-medium">{transfer.user.name}</p>
															<p className="text-sm text-muted-foreground">{transfer.user.student_number}</p>
														</div>
													</div>
													<div className="flex items-center space-x-4">
														<div className="text-sm text-right">
															<p>目标组织: {transfer.targetOrganization.name}</p>
															<p className="text-muted-foreground">申请日期: {transfer.applyDate.toDateString()}</p>
														</div>
														<Badge variant="outline">已批准</Badge>
														<Button variant="outline" size="sm">
															查看详情
														</Button>
													</div>
												</div>
											))
										) : (
											<div className="text-center py-4 text-muted-foreground">未找到符合条件的已批准转出申请</div>
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
												<div key={transfer.id} className="flex items-center justify-between p-4 border rounded-lg">
													<div className="flex items-center space-x-4">
														<Avatar>
															<AvatarFallback>
																{transfer.user.name.substring(transfer.user.name.length - 2)}
															</AvatarFallback>
														</Avatar>
														<div>
															<p className="font-medium">{transfer.user.name}</p>
															<p className="text-sm text-muted-foreground">{transfer.user.student_number}</p>
														</div>
													</div>
													<div className="flex items-center space-x-4">
														<div className="text-sm text-right">
															<p>目标组织: {transfer.targetOrganization.name}</p>
															<p className="text-muted-foreground">申请日期: {transfer.applyDate.toDateString()}</p>
														</div>
														<Badge variant="destructive">已拒绝</Badge>
														<Button variant="outline" size="sm">
															查看详情
														</Button>
													</div>
												</div>
											))
										) : (
											<div className="text-center py-4 text-muted-foreground">未找到符合条件的已拒绝转出申请</div>
										)}
									</div>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</TabsContent>
			</Tabs>
		</div>
	)
}
