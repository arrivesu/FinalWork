"use client"

import {useState} from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Badge} from "@/components/ui/badge"
import {Calendar, Search, Settings, User} from "lucide-react"
import {EventAPI} from "@/lib/api";

// 模拟操作日志数据
const logs = EventAPI.data;

export default function LogsPage() {
	const [searchTerm, setSearchTerm] = useState("")
	const [moduleFilter, setModuleFilter] = useState("all")
	const [statusFilter, setStatusFilter] = useState("all")

	// 过滤日志
	const filteredLogs = logs.filter((log) => {
		// 搜索过滤
		const matchesSearch =
			log.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			log.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
			log.target?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			log.time.toDateString().includes(searchTerm)

		// 模块过滤
		const matchesModule = moduleFilter === "all" || log.module === moduleFilter

		// 状态过滤
		const matchesStatus = statusFilter === "all" || log.status === statusFilter

		return matchesSearch && matchesModule && matchesStatus
	})

	// 获取所有模块
	const modules = ["all", ...new Set(logs.map((log) => log.module))]

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">操作日志</h1>
				<p className="text-muted-foreground">查看系统操作日志记录</p>
			</div>

			<div className="flex flex-col md:flex-row gap-4">
				<div className="relative flex-1">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
					<Input
						type="search"
						placeholder="搜索用户、操作或时间..."
						className="pl-8"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<Select value={moduleFilter} onValueChange={setModuleFilter}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="选择模块"/>
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">所有模块</SelectItem>
						{modules
							.filter((m) => m !== "all")
							.map((module) => (
								<SelectItem key={module} value={module ?? '未知'}>
									{module}
								</SelectItem>
							))}
					</SelectContent>
				</Select>
				<Select value={statusFilter} onValueChange={setStatusFilter}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="选择状态"/>
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">所有状态</SelectItem>
						<SelectItem value="success">成功</SelectItem>
						<SelectItem value="failed">失败</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>操作日志列表</CardTitle>
					<CardDescription>系统操作日志记录，共 186条</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						{filteredLogs.length > 0 ? (
							filteredLogs.map((log) => (
								<div key={log.id} className="flex items-center justify-between p-4 border rounded-lg">
									<div className="flex items-center space-x-4">
										<div className="p-2 rounded-full bg-muted">
											{log.module === "系统" ? (
												<Settings className="h-5 w-5 text-muted-foreground"/>
											) : log.module === "用户管理" || log.module === "党员管理" ? (
												<User className="h-5 w-5 text-muted-foreground"/>
											) : (
												<Calendar className="h-5 w-5 text-muted-foreground"/>
											)}
										</div>
										<div>
											<div className="flex items-center gap-2">
												<p className="font-medium">{log.content}</p>
												{log.target &&
													<p className="text-sm text-muted-foreground">- {log.target}</p>}
											</div>
											<p className="text-sm text-muted-foreground">
												操作人: {log.user.name} | 模块: {log.module}
											</p>
										</div>
									</div>
									<div className="flex items-center space-x-4">
										<div className="text-sm text-right">
											<p>{log.time.toDateString()}</p>
											<p className="text-muted-foreground">IP: {log.ip}</p>
										</div>
										<Badge variant={log.status === "success" ? "outline" : "destructive"}>
											{log.status === "success" ? "成功" : "失败"}
										</Badge>
									</div>
								</div>
							))
						) : (
							<div className="text-center py-4 text-muted-foreground">未找到符合条件的操作日志</div>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
