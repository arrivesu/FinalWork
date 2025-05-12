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

// 模拟入党积极分子数据
const activists = [

	{
		"id": "1",
		"name": "陆清妍",
		"gender": "女",
		"ethnicity": "汉族",
		"avatar": "/placeholder.svg?key=3j9m4",
		"studentId": "3210439034",
		"class": "大数据211班",
		"applyDate": "2022-10-14",
		activistDate: "2022-12-15",
		"status": "需补材料",
		"contact": "15900112231"
	},
	{
		id: "2",
		name: "唐骁",
		gender: "男",
		ethnicity: "汉族",
		avatar: "/placeholder.svg?key=wbexc",
		studentId: "3210439049",
		class: "大数据212班",
		applyDate: "2022-09-20",
		activistDate: "2022-12-15",
		status: "培养中",
		contact: "13811223348",
	},
	{
		id: "3",
		name: "郑云帆",
		gender: "男",
		ethnicity: "汉族",
		avatar: "/placeholder.svg?key=d4zqg",
		studentId: "3210439061",
		class: "大数据212班",
		applyDate: "2022-10-05",
		activistDate: "2023-01-10",
		status: "培养中",
		contact: "15045278894",
	},
	{
		id: "4",
		name: "徐晚晴",
		gender: "女",
		ethnicity: "汉族",
		avatar: "/placeholder.svg?key=xxanz",
		studentId: "3220439031",
		class: "大数据221班",
		applyDate: "2022-10-10",
		activistDate: "2023-01-10",
		status: "培养结束",
		contact: "13625780431",
	},
	{
		id: "5",
		name: "陈青",
		gender: "女",
		ethnicity: "汉族",
		avatar: "/placeholder.svg?key=xxanz",
		studentId: "3230439009",
		class: "大数据231班",
		applyDate: "2022-10-10",
		activistDate: "2024-06-08",
		status: "培养结束",
		contact: "13646805768",
	},
	{
		id: "6",
		name: "徐立伟",
		gender: "男",
		ethnicity: "汉族",
		avatar: "/placeholder.svg?key=xxanz",
		studentId: "3230439033",
		class: "大数据231班",
		applyDate: "2022-10-10",
		activistDate: "2024-06-08",
		status: "培养结束",
		contact: "13671231642",
	},
	{
		id: "6",
		name: "徐立伟",
		gender: "男",
		ethnicity: "汉族",
		avatar: "/placeholder.svg?key=xxanz",
		studentId: "3230439033",
		class: "大数据231班",
		applyDate: "2022-10-10",
		activistDate: "2024-06-08",
		status: "培养结束",
		contact: "13677886589",
	}
]

export default function ActivistsPage() {
	const [searchTerm, setSearchTerm] = useState("")
	const [isPromoteDialogOpen, setIsPromoteDialogOpen] = useState(false)
	const [selectedActivists, setSelectedActivists] = useState<string[]>([])
	const {toast} = useToast()

	// 过滤积极分子
	const filteredActivists = activists.filter(
		(activist) =>
			activist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			activist.studentId.includes(searchTerm) ||
			activist.class.toLowerCase().includes(searchTerm.toLowerCase()),
	)

	const handlePromote = () => {
		setIsPromoteDialogOpen(false)
		toast({
			title: "转为发展对象成功",
			description: `已将 ${selectedActivists.length} 名入党积极分子转为发展对象`,
		})
		setSelectedActivists([])
	}

	const handleDeleteActivist = (activist: any) => {
		toast({
			title: "删除成功",
			description: `入党积极分子 ${activist.name} 已成功删除`,
		})
	}

	const toggleSelectActivist = (id: string) => {
		setSelectedActivists((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">入党积极分子</h1>
					<p className="text-muted-foreground">管理入党积极分子信息</p>
				</div>
				<div className="flex space-x-2">
					<Dialog open={isPromoteDialogOpen} onOpenChange={setIsPromoteDialogOpen}>
						<DialogTrigger asChild>
							<Button variant="outline" disabled={selectedActivists.length === 0}>
								<ArrowRight className="mr-2 h-4 w-4"/>
								转为发展对象
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>转为发展对象</DialogTitle>
								<DialogDescription>
									确认将选中的 {selectedActivists.length} 名入党积极分子转为发展对象？
								</DialogDescription>
							</DialogHeader>
							<div className="py-4">
								<p>选中的入党积极分子：</p>
								<ul className="mt-2 space-y-1">
									{selectedActivists.map((id) => {
										const activist = activists.find((a) => a.id === id)
										return (
											<li key={id} className="text-sm">
												{activist?.name} - {activist?.studentId}
											</li>
										)
									})}
								</ul>
							</div>
							<DialogFooter>
								<Button variant="outline" onClick={() => setIsPromoteDialogOpen(false)}>
									取消
								</Button>
								<Button onClick={handlePromote}>确认转为发展对象</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</div>

			<div className="relative">
				<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
				<Input
					type="search"
					placeholder="搜索积极分子姓名、学号或班级..."
					className="pl-8"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>入党积极分子列表</CardTitle>
					<CardDescription>共 {filteredActivists.length} 名入党积极分子</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="rounded-md border">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-12 text-center">
										<Checkbox
											checked={selectedActivists.length === filteredActivists.length && filteredActivists.length > 0}
											onCheckedChange={(checked) => {
												if (checked) {
													setSelectedActivists(filteredActivists.map((a) => a.id))
												} else {
													setSelectedActivists([])
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
									<TableHead className="text-center">确定为积极分子日期</TableHead>
									<TableHead className="text-center">联系方式</TableHead>
									<TableHead className="text-right">操作</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredActivists.length > 0 ? (
									filteredActivists.map((activist) => (
										<TableRow key={activist.id}>
											<TableCell className="text-center">
												<Checkbox
													checked={selectedActivists.includes(activist.id)}
													onCheckedChange={() => toggleSelectActivist(activist.id)}
													aria-label={`Select ${activist.name}`}
												/>
											</TableCell>
											<TableCell className="text-center">{activist.name}</TableCell>
											<TableCell className="text-center">{activist.gender}</TableCell>
											<TableCell className="text-center">{activist.ethnicity}</TableCell>
											<TableCell className="text-center">{activist.studentId}</TableCell>
											<TableCell className="text-center">{activist.class}</TableCell>
											<TableCell className="text-center">{activist.activistDate}</TableCell>
											<TableCell className="text-center">{activist.contact}</TableCell>
											<TableCell className="text-right">
												<div className="flex justify-end gap-2">
													<Button variant="ghost" size="icon">
														<Edit className="h-4 w-4"/>
													</Button>
													<Button variant="ghost" size="icon"
															onClick={() => handleDeleteActivist(activist)}>
														<Trash2 className="h-4 w-4"/>
													</Button>
												</div>
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={9} className="h-24 text-center">
											未找到符合条件的入党积极分子
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
