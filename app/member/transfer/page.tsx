"use client"

import type React from "react"
import {useState} from "react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Textarea} from "@/components/ui/textarea"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Badge} from "@/components/ui/badge"
import {useToast} from "@/hooks/use-toast"
import {useAuth} from "@/hooks/use-auth";
import {useData} from "@/context/data-context";

export default function TransferPage() {
	const {user} = useAuth();

	if(user === null) return null;
	const cur_branch = user.branch;

	const {ActivitiesAPI, MaterialAPI, MemberAPI, NoticeAPI, UserDocumentAPI, ActivityJoinAPI, UserDataAPI, EventAPI, BranchAPI, TransferAPI, refreshData, loading} = useData();

	const all_activities = ActivitiesAPI.data.filter(d => d.branch.id === cur_branch.id);
	const all_material = MaterialAPI.data.filter(d => d.branch.id === cur_branch.id);
	const all_member = MemberAPI.data.filter(d => d.branch.id === cur_branch.id);
	const all_notice = NoticeAPI.data.filter(d => d.publisher.branch.id === cur_branch.id);
	const all_user_documents = UserDocumentAPI.data.filter(d => d.user.branch.id === cur_branch.id);
	const all_activity_join = ActivityJoinAPI.data.filter(d => d.member.branch.id === cur_branch.id);
	const all_user_data = UserDataAPI.data.filter(d => d.user.branch.id === cur_branch.id);
	const all_event = EventAPI.data.filter(d => d.user.branch.id === cur_branch.id);
	const all_transfer = TransferAPI.data.filter(d => d.user.branch.id === cur_branch.id);

	const getActivityMember = (activity: ActivityType) => MemberAPI.data.filter(d => d.branch.id === activity.branch.id);
	const getBranchMember = (branch: BranchType) => MemberAPI.data.filter(d => d.branch.id === branch.id)

	const transferApplications = all_transfer;

	const [targetOrganization, setTargetOrganization] = useState("")
	const [reason, setReason] = useState("")
	const {toast} = useToast()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (!targetOrganization || !reason) {
			toast({
				variant: "destructive",
				title: "提交失败",
				description: "请填写完整的申请信息",
			})
			return
		}

		toast({
			title: "申请已提交",
			description: "您的组织关系转接申请已提交，请等待审核",
		})

		// 重置表单
		setTargetOrganization("")
		setReason("")
	}

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">组织关系转接</h1>
				<p className="text-muted-foreground">申请党组织关系转接并查看申请状态</p>
			</div>

			<Tabs defaultValue="apply">
				<TabsList>
					<TabsTrigger value="apply">申请转接</TabsTrigger>
					<TabsTrigger value="records">申请记录</TabsTrigger>
				</TabsList>
				<TabsContent value="apply">
					<Card>
						<form onSubmit={handleSubmit}>
							<CardHeader>
								<CardTitle>组织关系转接申请</CardTitle>
								<CardDescription>请填写组织关系转接申请信息，提交后将由党支部审核</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="current-organization">当前党组织</Label>
									<Input id="current-organization" value="数据学生党支部" disabled/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="target-organization">目标党组织</Label>
									<Input
										id="target-organization"
										placeholder="请输入转入的党组织名称"
										value={targetOrganization}
										onChange={(e) => setTargetOrganization(e.target.value)}
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="transfer-type">转接类型</Label>
									<Select defaultValue="graduation">
										<SelectTrigger>
											<SelectValue placeholder="选择转接类型"/>
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="graduation">毕业</SelectItem>
											<SelectItem value="job">工作调动</SelectItem>
											<SelectItem value="study">升学</SelectItem>
											<SelectItem value="other">其他</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label htmlFor="reason">转接原因</Label>
									<Textarea
										id="reason"
										placeholder="请详细说明转接原因"
										value={reason}
										onChange={(e) => setReason(e.target.value)}
										className="min-h-[100px]"
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="contact">联系方式</Label>
									<Input id="contact" placeholder="请输入您的联系方式"/>
									<p className="text-sm text-muted-foreground">请确保联系方式正确，以便组织关系转接过程中与您联系</p>
								</div>
							</CardContent>
							<CardFooter>
								<Button type="submit">提交申请</Button>
							</CardFooter>
						</form>
					</Card>
				</TabsContent>
				<TabsContent value="records">
					<Card>
						<CardHeader>
							<CardTitle>申请记录</CardTitle>
							<CardDescription>查看您的组织关系转接申请记录</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{transferApplications.length > 0 ? (
									transferApplications.map((application) => (
										<div key={application.id} className="border rounded-lg p-4">
											<div className="flex justify-between items-start">
												<div>
													<h3 className="font-medium">{application.targetOrganization.name}</h3>
													<p className="text-sm text-muted-foreground mt-1">申请时间：{application.applyDate.toDateString()}</p>
													<p className="text-sm mt-2">转接原因：{application.reason}</p>
												</div>
												<Badge
													variant={application.status === 'approved' ? "outline" : "secondary"}>
													{application.status}
												</Badge>
											</div>
										</div>
									))
								) : (
									<div className="text-center py-4 text-muted-foreground">暂无申请记录</div>
								)}
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}
