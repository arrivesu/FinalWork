"use client"

import {useState} from "react"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Label} from "@/components/ui/label"
import {Switch} from "@/components/ui/switch"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {useToast} from "@/hooks/use-toast"
import {Calendar} from "@/components/ui/calendar"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {cn} from "@/lib/utils"
import {format} from "date-fns"
import {CalendarIcon, Plus, Trash2} from "lucide-react"

export default function SettingsConfigPage() {
	const [organizationName, setOrganizationName] = useState("数据学生党支部")
	const [organizationCode, setOrganizationCode] = useState("CPC-CS-001")
	const [foundationDate, setFoundationDate] = useState<Date | undefined>(new Date("2010-06-01"))
	const [location, setLocation] = useState("计算机科学与技术学院石鳞大楼")
	const [phone, setPhone] = useState("010-12345678")
	const [email, setEmail] = useState("cs-party@university.edu.cn")
	const [description, setDescription] = useState(
		"计算机科学与技术学院党支部成立于2010年，现有党员45人，下设3个党小组。",
	)

	// 书记信息
	const [secretaryName, setSecretaryName] = useState("张三")
	const [secretaryPhone, setSecretaryPhone] = useState("13800138001")
	const [secretaryEmail, setSecretaryEmail] = useState("zhangsan@university.edu.cn")

	// 委员信息
	const [committees, setCommittees] = useState([
		{name: "李四", position: "组织委员"},
		{name: "王五", position: "宣传委员"},
		{name: "赵六", position: "纪检委员"},
	])

	// 党员人数信息
	const [memberTotal, setMemberTotal] = useState("45")
	const [memberFormal, setMemberFormal] = useState("30")
	const [memberProbationary, setMemberProbationary] = useState("10")
	const [memberGraduated, setMemberGraduated] = useState("5")

	// 系统设置
	const [emailNotifications, setEmailNotifications] = useState(true)
	const [smsNotifications, setSmsNotifications] = useState(false)
	const [appNotifications, setAppNotifications] = useState(true)
	const [autoBackup, setAutoBackup] = useState(true)
	const [backupFrequency, setBackupFrequency] = useState("daily")
	const [dataRetention, setDataRetention] = useState("1year")
	const {toast} = useToast()

	const handleSaveBasicSettings = () => {
		toast({
			title: "设置已保存",
			description: "党支部基本信息已成功更新",
		})
	}

	const addCommittee = () => {
		setCommittees([...committees, {name: "", position: ""}])
	}

	const removeCommittee = (index: number) => {
		const newCommittees = [...committees]
		newCommittees.splice(index, 1)
		setCommittees(newCommittees)
	}

	const updateCommittee = (index: number, field: "name" | "position", value: string) => {
		const newCommittees = [...committees]
		newCommittees[index][field] = value
		setCommittees(newCommittees)
	}

	const handleSaveNotificationSettings = () => {
		toast({
			title: "设置已保存",
			description: "通知设置已成功更新",
		})
	}

	const handleSaveDataSettings = () => {
		toast({
			title: "设置已保存",
			description: "数据设置已成功更新",
		})
	}

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">系统配置</h1>
				<p className="text-muted-foreground">管理系统配置和偏好设置</p>
			</div>

			<Tabs defaultValue="basic">
				<TabsList>
					<TabsTrigger value="basic">党支部信息</TabsTrigger>
					<TabsTrigger value="leadership">支部委员</TabsTrigger>
					<TabsTrigger value="notifications">通知设置</TabsTrigger>
					<TabsTrigger value="data">数据设置</TabsTrigger>
					<TabsTrigger value="security">安全设置</TabsTrigger>
				</TabsList>

				{/* 党支部基本信息 */}
				<TabsContent value="basic">
					<Card>
						<CardHeader>
							<CardTitle>党支部基本信息</CardTitle>
							<CardDescription>管理党支部的基本信息，这些信息将显示在党支部名片中</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-4">
								<div className="grid gap-4 md:grid-cols-2">
									<div className="space-y-2">
										<Label htmlFor="organization-name">支部名称</Label>
										<Input
											id="organization-name"
											value={organizationName}
											onChange={(e) => setOrganizationName(e.target.value)}
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="organization-code">支部编号</Label>
										<Input
											id="organization-code"
											value={organizationCode}
											onChange={(e) => setOrganizationCode(e.target.value)}
										/>
									</div>
								</div>

								<div className="grid gap-4 md:grid-cols-2">
									<div className="space-y-2">
										<Label htmlFor="foundation-date">成立时间</Label>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant={"outline"}
													className={cn(
														"w-full justify-start text-left font-normal",
														!foundationDate && "text-muted-foreground",
													)}
												>
													<CalendarIcon className="mr-2 h-4 w-4"/>
													{foundationDate ? format(foundationDate, "yyyy-MM-dd") :
														<span>选择日期</span>}
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0">
												<Calendar mode="single" selected={foundationDate}
														  onSelect={setFoundationDate} initialFocus/>
											</PopoverContent>
										</Popover>
									</div>
									<div className="space-y-2">
										<Label htmlFor="location">支部地址</Label>
										<Input id="location" value={location}
											   onChange={(e) => setLocation(e.target.value)}/>
									</div>
								</div>

								<div className="grid gap-4 md:grid-cols-2">
									<div className="space-y-2">
										<Label htmlFor="phone">联系电话</Label>
										<Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="email">电子邮箱</Label>
										<Input id="email" type="email" value={email}
											   onChange={(e) => setEmail(e.target.value)}/>
									</div>
								</div>

								{/* <div className="space-y-2">
									<Label htmlFor="organization-description">支部简介</Label>
									<Textarea
										id="organization-description"
										value={description}
										onChange={(e) => setDescription(e.target.value)}
										className="min-h-[100px]"
									/>
								</div> */}

								<div className="space-y-4 pt-4 border-t">
									<h3 className="text-lg font-medium">党员人数统计</h3>
									<div className="grid gap-4 md:grid-cols-3">
										<div className="space-y-2">
											<Label htmlFor="member-total">总党员数</Label>
											<Input
												id="member-total"
												type="number"
												value={memberTotal}
												onChange={(e) => setMemberTotal(e.target.value)}
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="member-formal">正式党员</Label>
											<Input
												id="member-formal"
												type="number"
												value={memberFormal}
												onChange={(e) => setMemberFormal(e.target.value)}
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="member-probationary">预备党员</Label>
											<Input
												id="member-probationary"
												type="number"
												value={memberProbationary}
												onChange={(e) => setMemberProbationary(e.target.value)}
											/>
										</div>
										{/* <div className="space-y-2">
											<Label htmlFor="member-graduated">已毕业党员</Label>
											<Input
												id="member-graduated"
												type="number"
												value={memberGraduated}
												onChange={(e) => setMemberGraduated(e.target.value)}
											/>
										</div> */}
									</div>
								</div>
							</div>
						</CardContent>
						<CardFooter>
							<Button onClick={handleSaveBasicSettings}>保存设置</Button>
						</CardFooter>
					</Card>
				</TabsContent>

				{/* 支部委员信息 */}
				<TabsContent value="leadership">
					<Card>
						<CardHeader>
							<CardTitle>支部委员信息</CardTitle>
							<CardDescription>管理支部书记和委员信息</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							{/* 支部书记信息 */}
							<div className="space-y-4">
								<h3 className="text-lg font-medium">支部书记</h3>
								<div className="grid gap-4 md:grid-cols-3">
									<div className="space-y-2">
										<Label htmlFor="secretary-name">姓名</Label>
										<Input
											id="secretary-name"
											value={secretaryName}
											onChange={(e) => setSecretaryName(e.target.value)}
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="secretary-phone">联系电话</Label>
										<Input
											id="secretary-phone"
											value={secretaryPhone}
											onChange={(e) => setSecretaryPhone(e.target.value)}
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="secretary-email">电子邮箱</Label>
										<Input
											id="secretary-email"
											type="email"
											value={secretaryEmail}
											onChange={(e) => setSecretaryEmail(e.target.value)}
										/>
									</div>
								</div>
							</div>

							{/* 支部委员信息 */}
							<div className="space-y-4 pt-6 border-t">
								<div className="flex items-center justify-between">
									<h3 className="text-lg font-medium">支部委员</h3>
									<Button variant="outline" size="sm" onClick={addCommittee}>
										<Plus className="h-4 w-4 mr-1"/> 添加委员
									</Button>
								</div>

								{committees.map((committee, index) => (
									<div key={index}
										 className="grid gap-4 md:grid-cols-5 items-end border p-4 rounded-md">
										<div className="space-y-2 md:col-span-2">
											<Label htmlFor={`committee-name-${index}`}>姓名</Label>
											<Input
												id={`committee-name-${index}`}
												value={committee.name}
												onChange={(e) => updateCommittee(index, "name", e.target.value)}
											/>
										</div>
										<div className="space-y-2 md:col-span-2">
											<Label htmlFor={`committee-position-${index}`}>职务</Label>
											<Input
												id={`committee-position-${index}`}
												value={committee.position}
												onChange={(e) => updateCommittee(index, "position", e.target.value)}
											/>
										</div>
										<Button variant="ghost" size="icon" className="h-10 w-10"
												onClick={() => removeCommittee(index)}>
											<Trash2 className="h-4 w-4 text-red-500"/>
										</Button>
									</div>
								))}
							</div>
						</CardContent>
						<CardFooter>
							<Button onClick={handleSaveBasicSettings}>保存设置</Button>
						</CardFooter>
					</Card>
				</TabsContent>

				<TabsContent value="notifications">
					<Card className=" ">
						<CardHeader>
							<CardTitle>通知设置</CardTitle>
							<CardDescription>管理系统通知和提醒设置</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-4">
								<h3 className="text-lg font-medium">通知方式</h3>
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<div className="space-y-0.5">
											<Label htmlFor="email-notifications">邮件通知</Label>
											<p className="text-sm text-muted-foreground">通过邮件接收系统通知</p>
										</div>
										<Switch
											id="email-notifications"
											checked={emailNotifications}
											onCheckedChange={setEmailNotifications}
										/>
									</div>
									<div className="flex items-center justify-between">
										<div className="space-y-0.5">
											<Label htmlFor="sms-notifications">短信通知</Label>
											<p className="text-sm text-muted-foreground">通过短信接收系统通知</p>
										</div>
										<Switch id="sms-notifications" checked={smsNotifications}
												onCheckedChange={setSmsNotifications}/>
									</div>
									<div className="flex items-center justify-between">
										<div className="space-y-0.5">
											<Label htmlFor="app-notifications">应用内通知</Label>
											<p className="text-sm text-muted-foreground">在应用内接收系统通知</p>
										</div>
										<Switch id="app-notifications" checked={appNotifications}
												onCheckedChange={setAppNotifications}/>
									</div>
								</div>
							</div>
							<div className="space-y-4 pt-6 border-t">
								<h3 className="text-lg font-medium">通知类型</h3>
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<div className="space-y-0.5">
											<Label htmlFor="meeting-notifications">会议通知</Label>
											<p className="text-sm text-muted-foreground">接收会议安排和变更通知</p>
										</div>
										<Switch id="meeting-notifications" defaultChecked/>
									</div>
									<div className="flex items-center justify-between">
										<div className="space-y-0.5">
											<Label htmlFor="activity-notifications">活动通知</Label>
											<p className="text-sm text-muted-foreground">接收活动安排和变更通知</p>
										</div>
										<Switch id="activity-notifications" defaultChecked/>
									</div>
									<div className="flex items-center justify-between">
										<div className="space-y-0.5">
											<Label htmlFor="development-notifications">党员发展通知</Label>
											<p className="text-sm text-muted-foreground">接收党员发展相关通知</p>
										</div>
										<Switch id="development-notifications" defaultChecked/>
									</div>
									<div className="flex items-center justify-between">
										<div className="space-y-0.5">
											<Label htmlFor="system-notifications">系统通知</Label>
											<p className="text-sm text-muted-foreground">接收系统更新和维护通知</p>
										</div>
										<Switch id="system-notifications" defaultChecked/>
									</div>
								</div>
							</div>
							<div className="space-y-4 pt-6 border-t">
								<h3 className="text-lg font-medium">通知频率</h3>
								<div className="space-y-2">
									<Label htmlFor="notification-frequency">通知发送频率</Label>
									<Select defaultValue="realtime">
										<SelectTrigger>
											<SelectValue placeholder="选择通知频率"/>
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="realtime">实时发送</SelectItem>
											<SelectItem value="daily">每日汇总</SelectItem>
											<SelectItem value="weekly">每周汇总</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						</CardContent>
						<CardFooter>
							<Button onClick={handleSaveNotificationSettings}>保存设置</Button>
						</CardFooter>
					</Card>
				</TabsContent>
				<TabsContent value="data">
					<Card className=" ">
						<CardHeader>
							<CardTitle>数据设置</CardTitle>
							<CardDescription>管理系统数据备份和存储设置</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-4">
								<h3 className="text-lg font-medium">数据备份</h3>
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label htmlFor="auto-backup">自动备份</Label>
										<p className="text-sm text-muted-foreground">定期自动备份系统数据</p>
									</div>
									<Switch id="auto-backup" checked={autoBackup} onCheckedChange={setAutoBackup}/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="backup-frequency">备份频率</Label>
									<Select value={backupFrequency} onValueChange={setBackupFrequency}
											disabled={!autoBackup}>
										<SelectTrigger>
											<SelectValue placeholder="选择备份频率"/>
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="daily">每日备份</SelectItem>
											<SelectItem value="weekly">每周备份</SelectItem>
											<SelectItem value="monthly">每月备份</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label htmlFor="backup-storage">备份存储位置</Label>
									<Select defaultValue="cloud" disabled={!autoBackup}>
										<SelectTrigger>
											<SelectValue placeholder="选择备份存储位置"/>
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="local">本地存储</SelectItem>
											<SelectItem value="cloud">云存储</SelectItem>
											<SelectItem value="both">本地和云存储</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="pt-2">
									<Button variant="outline" disabled={!autoBackup}>
										立即备份
									</Button>
								</div>
							</div>
							<div className="space-y-4 pt-6 border-t">
								<h3 className="text-lg font-medium">数据保留</h3>
								<div className="space-y-2">
									<Label htmlFor="data-retention">数据保留期限</Label>
									<Select value={dataRetention} onValueChange={setDataRetention}>
										<SelectTrigger>
											<SelectValue placeholder="选择数据保留期限"/>
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="6months">6个月</SelectItem>
											<SelectItem value="1year">1年</SelectItem>
											<SelectItem value="3years">3年</SelectItem>
											<SelectItem value="5years">5年</SelectItem>
											<SelectItem value="forever">永久保留</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label htmlFor="log-retention">日志保留期限</Label>
									<Select defaultValue="3months">
										<SelectTrigger>
											<SelectValue placeholder="选择日志保留期限"/>
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="1month">1个月</SelectItem>
											<SelectItem value="3months">3个月</SelectItem>
											<SelectItem value="6months">6个月</SelectItem>
											<SelectItem value="1year">1年</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							<div className="space-y-4 pt-6 border-t">
								<h3 className="text-lg font-medium">数据导入导出</h3>
								<div className="flex flex-col sm:flex-row gap-2">
									<Button variant="outline">导入数据</Button>
									<Button variant="outline">导出数据</Button>
								</div>
							</div>
						</CardContent>
						<CardFooter>
							<Button onClick={handleSaveDataSettings}>保存设置</Button>
						</CardFooter>
					</Card>
				</TabsContent>
				<TabsContent value="security">
					<Card className=" ">
						<CardHeader>
							<CardTitle>安全设置</CardTitle>
							<CardDescription>管理系统安全和访问控制设置</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-4">
								<h3 className="text-lg font-medium">密码策略</h3>
								<div className="space-y-2">
									<Label htmlFor="password-expiration">密码过期时间</Label>
									<Select defaultValue="90days">
										<SelectTrigger>
											<SelectValue placeholder="选择密码过期时间"/>
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="30days">30天</SelectItem>
											<SelectItem value="60days">60天</SelectItem>
											<SelectItem value="90days">90天</SelectItem>
											<SelectItem value="180days">180天</SelectItem>
											<SelectItem value="never">永不过期</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label htmlFor="password-complexity">密码复杂度要求</Label>
									<Select defaultValue="medium">
										<SelectTrigger>
											<SelectValue placeholder="选择密码复杂度要求"/>
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="low">低（至少6个字符）</SelectItem>
											<SelectItem value="medium">中（至少8个字符，包含字母和数字）</SelectItem>
											<SelectItem
												value="high">高（至少10个字符，包含大小写字母、数字和特殊字符）</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label htmlFor="password-history">密码历史记录</Label>
										<p className="text-sm text-muted-foreground">禁止使用最近使用过的密码</p>
									</div>
									<Switch id="password-history" defaultChecked/>
								</div>
							</div>
							<div className="space-y-4 pt-6 border-t">
								<h3 className="text-lg font-medium">登录安全</h3>
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label htmlFor="two-factor-auth">双因素认证</Label>
										<p className="text-sm text-muted-foreground">要求用户使用双因素认证登录</p>
									</div>
									<Switch id="two-factor-auth"/>
								</div>
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label htmlFor="account-lockout">账户锁定</Label>
										<p className="text-sm text-muted-foreground">多次登录失败后锁定账户</p>
									</div>
									<Switch id="account-lockout" defaultChecked/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="session-timeout">会话超时时间</Label>
									<Select defaultValue="30min">
										<SelectTrigger>
											<SelectValue placeholder="选择会话超时时间"/>
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="15min">15分钟</SelectItem>
											<SelectItem value="30min">30分钟</SelectItem>
											<SelectItem value="60min">60分钟</SelectItem>
											<SelectItem value="120min">120分钟</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							<div className="space-y-4 pt-6 border-t">
								<h3 className="text-lg font-medium">访问控制</h3>
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label htmlFor="ip-restriction">IP地址限制</Label>
										<p className="text-sm text-muted-foreground">限制特定IP地址访问系统</p>
									</div>
									<Switch id="ip-restriction"/>
								</div>
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label htmlFor="concurrent-sessions">并发会话限制</Label>
										<p className="text-sm text-muted-foreground">限制用户同时登录的会话数</p>
									</div>
									<Switch id="concurrent-sessions" defaultChecked/>
								</div>
							</div>
						</CardContent>
						<CardFooter>
							<Button onClick={() => toast({title: "设置已保存", description: "安全设置已成功更新"})}>
								保存设置
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}
