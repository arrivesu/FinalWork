"use client"

import { useState, useEffect } from "react"
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
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Edit, Key, Search, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { MemberAPI } from "@/lib/api"
import { MultiSelect } from "@/components/multi-select"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/hooks/use-auth"

// 模拟用户数据
const users = MemberAPI.data

export default function UsersPage() {
	const [searchTerm, setSearchTerm] = useState("")
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
	const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] = useState(false)
	const [selectedUser, setSelectedUser] = useState<any>(null)
	const { toast } = useToast()

	const { user } = useAuth()
	const [defaultRoles, setDefaultRoles] = useState<string[]>([])

	useEffect(() => {
		if (user) {
			setDefaultRoles(user.role as string[])
		}
	}, [user])

	const FormSchema = z.object({
		roles: z.array(z.string().min(1)).min(1).nonempty("Please select at least one framework."),
	})

	const {
		setValue,
		getValues,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			roles: defaultRoles,
		},
		mode: "onChange",
	})

	if (user === null) return null

	// 过滤用户
	const filteredUsers = users.filter(
		(user) =>
			user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.class_name.toLowerCase().includes(searchTerm.toLowerCase()),
	)

	const rolesList = [
		{
			value: "admin",
			label: "admin",
		},
		{
			value: "member",
			label: "member",
		},
	]

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

	const openEditDialog = (user: any) => {
		setSelectedUser(user)
		setIsEditDialogOpen(true)
		setValue("roles", user.role)
	}

	const openResetPasswordDialog = (user: any) => {
		setSelectedUser(user)
		setIsResetPasswordDialogOpen(true)
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
				<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
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
										<Badge variant={user.role.includes("admin") ? "default" : "outline"}>
											{user.role.includes("admin") ? "管理员" : "党员"}
										</Badge>
										<div className="flex space-x-2">
											<Button variant="ghost" size="icon" onClick={() => openResetPasswordDialog(user)}>
												<Key className="h-4 w-4" />
											</Button>
											<Button variant="ghost" size="icon" onClick={() => openEditDialog(user)}>
												<Edit className="h-4 w-4" />
											</Button>
											<Button variant="ghost" size="icon" onClick={() => handleDeleteUser(user)}>
												<Trash2 className="h-4 w-4" />
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

			{/* 编辑用户对话框 - 从循环中拆分出来 */}
			<Dialog
				open={isEditDialogOpen}
				onOpenChange={(open) => {
					setIsEditDialogOpen(open)
					if (!open) setSelectedUser(null)
				}}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>编辑用户</DialogTitle>
						<DialogDescription>修改用户 {selectedUser?.name} 的信息</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="edit-name">姓名</Label>
								<Input id="edit-name" defaultValue={selectedUser?.name} />
							</div>
							<div className="space-y-2">
								<Label htmlFor="edit-username">用户名</Label>
								<Input id="edit-username" defaultValue={selectedUser?.username} />
							</div>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="edit-role">角色</Label>
								<MultiSelect
									options={rolesList}
									onValueChange={(value) => setValue("roles", value)}
									defaultValue={getValues("roles")}
									placeholder="Select options"
									variant="inverted"
									animation={2}
									maxCount={3}
								/>
								{errors.roles && <p className="text-red-500 text-sm">{errors.roles.message}</p>}
							</div>
							<div className="space-y-2">
								<Label htmlFor="edit-department">所属部门</Label>
								<Input id="edit-department" defaultValue={selectedUser?.class_name} />
							</div>
						</div>
					</div>
					<DialogFooter>
						<Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
							取消
						</Button>
						<Button onClick={handleEditUser}>保存</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* 重置密码对话框 - 从循环中拆分出来 */}
			<Dialog
				open={isResetPasswordDialogOpen}
				onOpenChange={(open) => {
					setIsResetPasswordDialogOpen(open)
					if (!open) setSelectedUser(null)
				}}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>重置密码</DialogTitle>
						<DialogDescription>为用户 {selectedUser?.name} 重置密码</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="space-y-2">
							<Label htmlFor="new-password">新密码</Label>
							<Input id="new-password" type="password" placeholder="请输入新密码" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="confirm-new-password">确认新密码</Label>
							<Input id="confirm-new-password" type="password" placeholder="请再次输入新密码" />
						</div>
					</div>
					<DialogFooter>
						<Button variant="outline" onClick={() => setIsResetPasswordDialogOpen(false)}>
							取消
						</Button>
						<Button onClick={handleResetPassword}>重置</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}
