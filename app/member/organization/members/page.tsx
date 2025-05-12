"use client"

import {useState} from "react"
import {Input} from "@/components/ui/input"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Badge} from "@/components/ui/badge"
import {Search} from "lucide-react"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"

// 模拟党员数据
const members = [
	{
		id: "1",
		name: "陆晨",
		avatar: "/placeholder.svg?key=qdszg",
		position: "党支部书记",
		identity: "正式党员",
		joinDate: "2015-09-10",
		department: "数据学院学工办",
	},
	{
		id: "2",
		name: "徐若瑄",
		avatar: "/placeholder.svg?key=n3fup",
		position: "组织委员",
		identity: "正式党员",
		joinDate: "2023-06-02",
		department: "大数据211班",
	},
	{
		id: "3",
		name: "黄俊杰",
		avatar: "/placeholder.svg?key=g1vak",
		position: "纪检委员",
		identity: "正式党员",
		joinDate: "2023-06-02",
		department: "大数据211班",
	},
	{
		id: "4",
		name: "林诗涵",
		avatar: "/placeholder.svg?key=d22yx",
		position: "普通党员",
		identity: "正式党员",
		joinDate: "2023-12-03",
		department: "大数据211班",
	},
	{
		id: "5",
		name: "郑浩轩",
		avatar: "/placeholder.svg?key=lud82",
		position: "普通党员",
		identity: "正式党员",
		joinDate: "2023-08-30",
		department: "大数据212班",
	},
	{
		id: "6",
		name: "孙雨桐",
		avatar: "/placeholder.svg?key=58qcx",
		position: "普通党员",
		identity: "正式党员",
		joinDate: "2024-06-12",
		department: "大数据211班",
	},
	{
		id: "7",
		name: "邓雅萱",
		avatar: "/placeholder.svg?key=58qcx",
		position: "普通党员",
		identity: "正式党员",
		joinDate: "2024-06-12",
		department: "大数据212班",
	},
	{
		id: "8",
		name: "崔世奇",
		avatar: "/placeholder.svg?key=58qcx",
		position: "普通党员",
		identity: "正式党员",
		joinDate: "2024-06-12",
		department: "大数据212班",
	},
	{
		id: "9",
		name: "钱三一",
		avatar: "/placeholder.svg?key=58qcx",
		position: "普通党员",
		identity: "正式党员",
		joinDate: "2024-06-12",
		department: "大数据212班",
	},
	{
		id: "10",
		name: "陈诗梦",
		avatar: "/placeholder.svg?key=58qcx",
		position: "普通党员",
		identity: "正式党员",
		joinDate: "2024-06-12",
		department: "大数据212班",
	},
	{
		id: "11",
		name: "马文博",
		avatar: "/placeholder.svg?key=h3oyi",
		position: "普通党员",
		identity: "预备党员",
		joinDate: "2024-06-12",
		department: "大数据212班",
	},
]

export default function OrganizationMembers() {
	const [searchTerm, setSearchTerm] = useState("")

	// 过滤党员
	const filterMembers = (identity: string) => {
		return members
			.filter((member) => member.identity === identity)
			.filter(
				(member) =>
					member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
					member.department.toLowerCase().includes(searchTerm.toLowerCase()),
			)
	}

	const formalMembers = filterMembers("正式党员")
	const probationaryMembers = filterMembers("预备党员")
	const graduatedMembers = filterMembers("已毕业党员")

	// 渲染成员表格
	const renderMemberTable = (memberList: typeof members) => {
		return (
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[250px]">姓名</TableHead>
							<TableHead>职务</TableHead>
							<TableHead>班级</TableHead>
							<TableHead>入党时间</TableHead>
							<TableHead>身份</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{memberList.length > 0 ? (
							memberList.map((member) => (
								<TableRow key={member.id}>
									<TableCell>
										<div className="flex items-center space-x-3">
											{/* <Avatar className="h-8 w-8">
												<AvatarFallback>{member.name.substring(member.name.length - 2)}</AvatarFallback>
											</Avatar> */}
											<span className="font-medium">{member.name}</span>
										</div>
									</TableCell>
									<TableCell>{member.position}</TableCell>
									<TableCell>{member.department}</TableCell>
									<TableCell>{member.joinDate}</TableCell>
									<TableCell>
										<Badge variant="outline">{member.identity}</Badge>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={5} className="h-24 text-center">
									未找到符合条件的党员
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		)
	}

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">组织成员-党员</h1>
				<p className="text-muted-foreground">查看党支部所有党员信息</p>
			</div>

			<div className="relative">
				<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
				<Input
					type="search"
					placeholder="搜索党员姓名、职务或班级..."
					className="pl-8"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>

			<Tabs defaultValue="formal">
				<TabsList>
					<TabsTrigger value="formal">正式党员</TabsTrigger>
					<TabsTrigger value="probationary">预备党员</TabsTrigger>
					<TabsTrigger value="graduated">已毕业党员</TabsTrigger>
				</TabsList>
				<TabsContent value="formal">
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-medium">正式党员</h3>
							<p className="text-sm text-muted-foreground">共 {formalMembers.length} 人</p>
						</div>
						{renderMemberTable(formalMembers)}
					</div>
				</TabsContent>
				<TabsContent value="probationary">
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-medium">预备党员</h3>
							<p className="text-sm text-muted-foreground">共 {probationaryMembers.length} 人</p>
						</div>
						{renderMemberTable(probationaryMembers)}
					</div>
				</TabsContent>
				<TabsContent value="graduated">
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-medium">已毕业党员</h3>
							<p className="text-sm text-muted-foreground">共 {graduatedMembers.length} 人</p>
						</div>
						{renderMemberTable(graduatedMembers)}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	)
}
