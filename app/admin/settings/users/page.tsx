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
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Edit, Key, Search, Trash2} from "lucide-react"
import {useToast} from "@/hooks/use-toast"

// 模拟用户数据
const users = [
	{
		id: "1",
		name: "陆晨",
		avatar: "/placeholder.svg?key=vqmpy",
		username: "luchen",
		role: "admin",
		department: "数据学院学工办",
		lastLogin: "2025-05-03 14:30",
	},
	{
		id: "2",
		name: "徐若瑄",
		avatar: "/placeholder.svg?key=k63aq",
		username: "xuruoxuan",
		role: "member",
		department: "大数据211班",
		lastLogin: "2025-05-03 09:15",
	},
	{
		id: "3",
		name: "黄俊杰",
		avatar: "/placeholder.svg?key=3o7yd",
		username: "huangjunjie",
		role: "member",
		department: "大数据211班",
		lastLogin: "2025-05-02 16:45",
	},
	{
		id: "4",
		name: "林诗涵",
		avatar: "/placeholder.svg?key=mmh0k",
		username: "linshihan",
		role: "member",
		department: "大数据211班",
		lastLogin: "2025-05-02 10:20",
	},
	{
		id: "5",
		name: "郑浩轩",
		avatar: "/placeholder.svg?key=mmh0k",
		username: "zhenghaoxuan",
		role: "member",
		department: "大数据212班",
		lastLogin: "2025-05-02 10:14",
	},
	{
		id: "6",
		name: "孙雨桐",
		avatar: "/placeholder.svg?key=mmh0k",
		username: "sunyutong",
		role: "member",
		department: "大数据211班",
		lastLogin: "2025-05-02 09:20",
	},
]

export default function UsersPage() {
	const [searchTerm, setSearchTerm] = useState("")
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
	const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] = useState(false)
	const [selectedUser, setSelectedUser] = useState<any>(null)
	const {toast} = useToast()

	// 过滤用户
	const filteredUsers = users.filter(
		(user) =>
			user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.department.toLowerCase().includes(searchTerm.toLowerCase()),
	)

	const handleAddUser = () => {
		setIsAddDialogOpen(false)
		toast({
			title: "添加成功",
			description: "用户已成功添加",
		})
	}

	const handleEditUser = () => {
		setIsEditDialogOpen(false)
		toast({
			title: "修改成功",
			description: "用户信息已成功更新",
		})
	}

	const handleResetPassword = () => {
		setIsResetPasswordDialogOpen(false)
		toast({
			title: "重置成功",
			description: `用户 ${selectedUser?.name} 的密码已重置`,
		})
	}

	const handleDeleteUser = (user: any) => {
		toast({
			title: "删除成功",
			description: `用户 ${user.name} 已成功删除`,
		})
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">用户管理</h1>
					<p className="text-muted-foreground">管理系统用户账号</p>
				</div>
			</div>

			<div className="relative">
				<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
				<Input
					type="search"
					placeholder="搜索用户姓名、用户名或部门..."
					className="pl-8"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>用户列表</CardTitle>
					<CardDescription>系统中的所有用户，共 {filteredUsers.length} 人</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						{filteredUsers.length > 0 ? (
							filteredUsers.map((user) => (
								<div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
									<div className="flex items-center space-x-4">
										<Avatar>
											<AvatarFallback>{user.name.substring(user.name.length - 2)}</AvatarFallback>
										</Avatar>
										<div>
											<p className="font-medium">{user.name}</p>
											<p className="text-sm text-muted-foreground">@{user.username}</p>
										</div>
									</div>
									<div className="flex items-center space-x-4">
										<div className="text-sm text-right">
											<p>{user.department}</p>
											<p className="text-muted-foreground">上次登录: {user.lastLogin}</p>
										</div>
										<Badge variant={user.role === "admin" ? "default" : "outline"}>
											{user.role === "admin" ? "管理员" : "党员"}
										</Badge>
										<div className="flex space-x-2">
											<Dialog
												open={isResetPasswordDialogOpen && selectedUser?.id === user.id}
												onOpenChange={(open) => {
													setIsResetPasswordDialogOpen(open)
													if (open) setSelectedUser(user)
												}}
											>
												<DialogTrigger asChild>
													<Button variant="ghost" size="icon">
														<Key className="h-4 w-4"/>
													</Button>
												</DialogTrigger>
												<DialogContent>
													<DialogHeader>
														<DialogTitle>重置密码</DialogTitle>
														<DialogDescription>为用户 {user.name} 重置密码</DialogDescription>
													</DialogHeader>
													<div className="grid gap-4 py-4">
														<div className="space-y-2">
															<Label htmlFor="new-password">新密码</Label>
															<Input id="new-password" type="password"
																   placeholder="请输入新密码"/>
														</div>
														<div className="space-y-2">
															<Label htmlFor="confirm-new-password">确认新密码</Label>
															<Input id="confirm-new-password" type="password"
																   placeholder="请再次输入新密码"/>
														</div>
													</div>
													<DialogFooter>
														<Button variant="outline"
																onClick={() => setIsResetPasswordDialogOpen(false)}>
															取消
														</Button>
														<Button onClick={handleResetPassword}>重置</Button>
													</DialogFooter>
												</DialogContent>
											</Dialog>

											<Dialog
												open={isEditDialogOpen && selectedUser?.id === user.id}
												onOpenChange={(open) => {
													setIsEditDialogOpen(open)
													if (open) setSelectedUser(user)
												}}
											>
												<DialogTrigger asChild>
													<Button variant="ghost" size="icon">
														<Edit className="h-4 w-4"/>
													</Button>
												</DialogTrigger>
												<DialogContent>
													<DialogHeader>
														<DialogTitle>编辑用户</DialogTitle>
														<DialogDescription>修改用户 {user.name} 的信息</DialogDescription>
													</DialogHeader>
													<div className="grid gap-4 py-4">
														<div className="grid grid-cols-2 gap-4">
															<div className="space-y-2">
																<Label htmlFor="edit-name">姓名</Label>
																<Input id="edit-name" defaultValue={user.name}/>
															</div>
															<div className="space-y-2">
																<Label htmlFor="edit-username">用户名</Label>
																<Input id="edit-username" defaultValue={user.username}/>
															</div>
														</div>
														<div className="grid grid-cols-2 gap-4">
															<div className="space-y-2">
																<Label htmlFor="edit-role">角色</Label>
																<Select defaultValue={user.role}>
																	<SelectTrigger>
																		<SelectValue placeholder="选择角色"/>
																	</SelectTrigger>
																	<SelectContent>
																		<SelectItem value="admin">管理员</SelectItem>
																		<SelectItem value="member">党员</SelectItem>
																	</SelectContent>
																</Select>
															</div>
															<div className="space-y-2">
																<Label htmlFor="edit-department">所属部门</Label>
																<Input id="edit-department"
																	   defaultValue={user.department}/>
															</div>
														</div>
													</div>
													<DialogFooter>
														<Button variant="outline"
																onClick={() => setIsEditDialogOpen(false)}>
															取消
														</Button>
														<Button onClick={handleEditUser}>保存</Button>
													</DialogFooter>
												</DialogContent>
											</Dialog>

											<Button variant="ghost" size="icon" onClick={() => handleDeleteUser(user)}>
												<Trash2 className="h-4 w-4"/>
											</Button>
										</div>
									</div>
								</div>
							))
						) : (
							<div className="text-center py-4 text-muted-foreground">未找到符合条件的用户</div>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
