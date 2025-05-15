"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { RadarChart, type RadarChartData } from "@/components/ui/radar-chart"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import {Eye, EyeOff} from "lucide-react";
import {AuthAPI, UserDataAPI, UserDocumentAPI} from "@/lib/api";

interface PasswordChangeParams {
	currentPassword: string
	newPassword: string
	confirmPassword: string
}

interface PasswordChangeResult {
	success: boolean
	message: string
}

function usePasswordChange() {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const validatePassword = (password: string): boolean => {
		// 密码至少8位，包含字母和数字
		const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
		return passwordRegex.test(password)
	}

	const changePassword = async ({
									  currentPassword,
									  newPassword,
									  confirmPassword,
								  }: PasswordChangeParams): Promise<PasswordChangeResult> => {
		setIsLoading(true)
		setError(null)

		try {
			// 验证新密码格式
			if (!validatePassword(newPassword)) {
				setError("新密码必须至少8位，且包含字母和数字")
				return { success: false, message: "新密码必须至少8位，且包含字母和数字" }
			}

			// 验证两次输入的密码是否一致
			if (newPassword !== confirmPassword) {
				setError("两次输入的密码不一致")
				return { success: false, message: "两次输入的密码不一致" }
			}

			const data = await AuthAPI.changePassword({currentPassword, newPassword} );

			await new Promise((resolve) => setTimeout(resolve, 1000))

			return { success: true, message: "密码修改成功" }
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : "密码修改失败，请稍后重试"
			setError(errorMessage)
			return { success: false, message: errorMessage }
		} finally {
			setIsLoading(false)
		}
	}

	return {
		changePassword,
		isLoading,
		error,
	}
}

function PasswordChangeForm() {
	const { toast } = useToast()
	const { changePassword, isLoading, error } = usePasswordChange()

	const [currentPassword, setCurrentPassword] = useState("")
	const [newPassword, setNewPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")

	const [showCurrentPassword, setShowCurrentPassword] = useState(false)
	const [showNewPassword, setShowNewPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const result = await changePassword({
			currentPassword,
			newPassword,
			confirmPassword,
		})

		if (result.success) {
			toast({
				title: "密码已更新",
				description: "您的密码已成功修改",
			})

			// 清空表单
			setCurrentPassword("")
			setNewPassword("")
			setConfirmPassword("")
		} else {
			toast({
				title: "密码修改失败",
				description: result.message,
				variant: "destructive",
			})
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<Card>
				<CardHeader>
					<CardTitle>修改密码</CardTitle>
					<CardDescription>更新您的账户密码</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="current-password">当前密码</Label>
						<div className="relative">
							<Input
								id="current-password"
								type={showCurrentPassword ? "text" : "password"}
								placeholder="请输入当前密码"
								value={currentPassword}
								onChange={(e) => setCurrentPassword(e.target.value)}
								required
							/>
							<Button
								type="button"
								variant="ghost"
								size="icon"
								className="absolute right-0 top-0 h-full"
								onClick={() => setShowCurrentPassword(!showCurrentPassword)}
							>
								{showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
								<span className="sr-only">{showCurrentPassword ? "隐藏密码" : "显示密码"}</span>
							</Button>
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="new-password">新密码</Label>
						<div className="relative">
							<Input
								id="new-password"
								type={showNewPassword ? "text" : "password"}
								placeholder="请输入新密码"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								required
							/>
							<Button
								type="button"
								variant="ghost"
								size="icon"
								className="absolute right-0 top-0 h-full"
								onClick={() => setShowNewPassword(!showNewPassword)}
							>
								{showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
								<span className="sr-only">{showNewPassword ? "隐藏密码" : "显示密码"}</span>
							</Button>
						</div>
						<p className="text-sm text-muted-foreground">密码长度至少为8位，包含字母和数字</p>
					</div>

					<div className="space-y-2">
						<Label htmlFor="confirm-password">确认新密码</Label>
						<div className="relative">
							<Input
								id="confirm-password"
								type={showConfirmPassword ? "text" : "password"}
								placeholder="请再次输入新密码"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
							/>
							<Button
								type="button"
								variant="ghost"
								size="icon"
								className="absolute right-0 top-0 h-full"
								onClick={() => setShowConfirmPassword(!showConfirmPassword)}
							>
								{showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
								<span className="sr-only">{showConfirmPassword ? "隐藏密码" : "显示密码"}</span>
							</Button>
						</div>
					</div>

					{error && <div className="text-sm font-medium text-destructive">{error}</div>}
				</CardContent>
				<CardFooter className="flex justify-end">
					<Button type="submit" disabled={isLoading}>
						{isLoading ? "更新中..." : "更新密码"}
					</Button>
				</CardFooter>
			</Card>
		</form>
	)
}

export default function MemberProfile() {
	const [selectedTerm, setSelectedTerm] = useState("2023-1")
	const { toast } = useToast()
	const { user } = useAuth()

	const handleSave = () => {
		toast({
			title: "保存成功",
			description: "个人信息已更新",
		})
	}

	if (!user) return null

	const user_data = UserDataAPI.data.filter((data) => data.user.id === user.id);
	const cur_user_data_list = user_data.filter((data) => data.record_time === selectedTerm);
	const user_document_list = UserDocumentAPI.data.filter((doc) => doc.user.id === user.id);

	let cur_data;
	if(cur_user_data_list.length === 1) {
		cur_data = cur_user_data_list[0];
	}
	else {
		cur_data = {
			academic_rank: 0,
			assessment_score: 0,
			behavior_score: 0,
			dorm_score: 0,
			id: 0,
			moral_rank: 0,
			volunteering_time: 0,
			public_opinion_score: 0,
		}
	}

	const A1 = 100*(1-cur_data.moral_rank);
	const A2 = 100*(1-cur_data.academic_rank);
	const A3 = 0.6*(cur_data.assessment_score)+40*cur_data.volunteering_time/15;
	const A4 = 50*(1-cur_data.dorm_score)+(50+cur_data.behavior_score);
	const A5 = cur_data.public_opinion_score*20;

	const getComparisonRadarData = (): RadarChartData => {
		return {
			labels: [
				"思想锋领指数", // Ideological Awareness
				"学业锋领指数", // Party Discipline
				"服务锋领指数", // Work Performance
				"作风锋领指数", // Learning Attitude
				"群众锋领指数", // Social Contribution
			],
			datasets: [
				{
					label: "我的画像",
					data: [
						A1,
						A2,
						A3,
						A4,
						A5,
					],
					backgroundColor: "rgba(54, 162, 235, 0.2)",
					borderColor: "rgba(54, 162, 235, 1)",
					borderWidth: 2,
				},
			],
		}
	}

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">个人中心</h1>
				<p className="text-muted-foreground">查看和管理您的个人信息</p>
			</div>

			<Tabs defaultValue="basic">
				<TabsList>
					<TabsTrigger value="basic">基本信息</TabsTrigger>
					<TabsTrigger value="portrait">党员画像</TabsTrigger>
					<TabsTrigger value="archive">电子档案</TabsTrigger>
					<TabsTrigger value="password">修改密码</TabsTrigger>
				</TabsList>
				<TabsContent value="basic">
					<Card>
						<CardHeader>
							<CardTitle>个人信息</CardTitle>
							<CardDescription>查看和更新您的个人信息</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="flex flex-col md:flex-row gap-6">
								<div className="md:w-1/4 flex flex-col items-center space-y-4">
									<Avatar className="h-32 w-32">
										<AvatarFallback>{user.name.substring(user.name.length - 2)}</AvatarFallback>
									</Avatar>
									<Button variant="outline" size="sm">
										更换头像
									</Button>
								</div>
								<div className="md:w-3/4 grid gap-4 md:grid-cols-2">
									<div className="space-y-2">
										<Label htmlFor="name">姓名</Label>
										<Input id="name" defaultValue={user.name} />
									</div>
									<div className="space-y-2">
										<Label htmlFor="gender">性别</Label>
										<Select defaultValue="male">
											<SelectTrigger>
												<SelectValue placeholder="选择性别" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="male">男</SelectItem>
												<SelectItem value="female">女</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="space-y-2">
										<Label htmlFor="birth">出生日期</Label>
										<Input id="birth" type="date" defaultValue="2003-03-25" />
									</div>
									<div className="space-y-2">
										<Label htmlFor="class">民族</Label>
										<Input id="class" defaultValue="汉族" />
									</div>
									<div className="space-y-2">
										<Label htmlFor="student-id">学号</Label>
										<Input id="student-id" defaultValue="3210439012" />
									</div>
									<div className="space-y-2">
										<Label htmlFor="class">班级</Label>
										<Input id="class" defaultValue="大数据212班" />
									</div>
									<div className="space-y-2">
										<Label htmlFor="join-date">入党时间</Label>
										<Input id="join-date" type="date" defaultValue="2023-08-30" />
									</div>
									<div className="space-y-2">
										<Label htmlFor="position">党内职务</Label>
										<Select defaultValue="member">
											<SelectTrigger>
												<SelectValue placeholder="选择党内职务" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="secretary">党支部书记</SelectItem>
												<SelectItem value="committee">党支部委员</SelectItem>
												<SelectItem value="member">普通党员</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="space-y-2">
										<Label htmlFor="identity">身份类型</Label>
										<Select defaultValue="formal">
											<SelectTrigger>
												<SelectValue placeholder="选择身份类型" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="formal">正式党员</SelectItem>
												<SelectItem value="probationary">预备党员</SelectItem>
												<SelectItem value="candidate">发展对象</SelectItem>
												<SelectItem value="activist">入党积极分子</SelectItem>
												<SelectItem value="applicant">入党申请人</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="space-y-2">
										<Label htmlFor="phone">联系方式</Label>
										<Input id="phone" defaultValue="13876543210" />
									</div>
								</div>
							</div>
						</CardContent>
						<CardFooter className="flex justify-end">
							<Button onClick={handleSave}>保存更改</Button>
						</CardFooter>
					</Card>
				</TabsContent>
				<TabsContent value="portrait">
					<Card>
						<CardHeader>
							<CardTitle>党员画像</CardTitle>
							<CardDescription>查看您的党员画像数据</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="flex flex-col md:flex-row gap-6">
								<div className="md:w-1/2">
									<div className="aspect-square relative">
										<div className="inset-0 top-0 flex justify-center mt-2">
											<div className="flex justify-between items-center w-full">
												<Select defaultValue="2023-1" value={selectedTerm} onValueChange={setSelectedTerm}>
													<SelectTrigger>
														<SelectValue placeholder="选择学年学期" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="2024-1">2024-2025学年第一学期</SelectItem>
														<SelectItem value="2024-2">2024-2025学年第二学期</SelectItem>
														<SelectItem value="2023-1">2023-2024学年第一学期</SelectItem>
														<SelectItem value="2023-2">2023-2024学年第二学期</SelectItem>
														<SelectItem value="2022-1">2022-2023学年第一学期</SelectItem>
														<SelectItem value="2022-2">2022-2023学年第二学期</SelectItem>
													</SelectContent>
												</Select>
												<p className="text-muted-foreground"></p>
											</div>
										</div>
										<RadarChart title="" data={getComparisonRadarData()} height={400} />
									</div>
								</div>
								<div className="md:w-1/2 space-y-4 rounded-lg border border-white-100 bg-white p-6 shadow-sm">
									<h3 className="mb-6 text-lg font-semibold text-gray-800 border-b-2 border-red-300 pb-3">
										画像指标详情
									</h3>
									<div className="space-y-2">
										<div className="flex justify-between items-center">
											<span>思想锋领指数</span>
											<span className="font-medium">{`${A1}分`}</span>
										</div>
										<div className="flex justify-between items-center">
											<span>学业锋领指数</span>
											<span className="font-medium">{`${A2}分`}</span>
										</div>
										<div className="flex justify-between items-center">
											<span>服务锋领指数</span>
											<span className="font-medium">{`${A3}分`}</span>
										</div>
										<div className="flex justify-between items-center">
											<span>作风锋领指数</span>
											<span className="font-medium">{`${A4}分`}</span>
										</div>
										<div className="flex justify-between items-center">
											<span>群众锋领指数</span>
											<span className="font-medium">{`${A5}分`}</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-lg">综合锋领分数</span>
											<span className="font-medium">{`${0.15*A1+0.25*A2+0.15*A3+0.15*A4+0.3*A5}分`}</span>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="archive">
					<Card>
						<CardHeader>
							<CardTitle>电子档案</CardTitle>
							<CardDescription>查看您的电子档案记录</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{ user_document_list.map((doc) => (<>
									<div className="border rounded-lg p-4">
										<h3 className="font-medium">{doc.type}</h3>
										<p className="text-sm text-muted-foreground mt-1">{`提交时间：${doc.submit_time.toDateString()}`}</p>
										<div className="flex gap-2 mt-2">
											<Button size="sm" variant="outline">
												查看
											</Button>
											<Button size="sm" variant="outline">
												下载
											</Button>
										</div>
									</div>
								</>))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="password">
					<PasswordChangeForm />
				</TabsContent>
			</Tabs>
		</div>
	)
}
