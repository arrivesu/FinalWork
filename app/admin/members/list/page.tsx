"use client"

import {useState} from "react"
import {Card, CardContent} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Download, MoreHorizontal, Search, UserPlus} from "lucide-react"
import {useToast} from "@/hooks/use-toast"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"

import {Label} from "@/components/ui/label"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"

// 党员身份类型
const identityTypes = ["已毕业党员", "正式党员", "预备党员"]

// 党内职务
const partyPositions = ["党支部书记", "党支部委员", "普通党员"]

// 模拟党员数据
const members = [
	{
		"id": "S0000000001",
		"name": "陆晨",
		"gender": "男",
		"ethnicity": "汉族",
		"birthDate": "1993-08-09",
		"studentId": "0000000001",
		"className": "数据学院辅导员",
		"joinDate": "2015-09-10",
		"position": "党支部书记",
		"identityType": "正式党员",
		"contact": "13712345678",
		"hasArchive": true
	},
	{
		"id": "S3210439004",
		"name": "徐若瑄",
		"gender": "女",
		"ethnicity": "汉族",
		"birthDate": "2002-12-03",
		"studentId": "3210439004",
		"className": "大数据211班",
		"joinDate": "2023-06-02",
		"position": "党支部委员",
		"identityType": "正式党员",
		"contact": "13901234567",
		"hasArchive": true
	},
	{
		"id": "S3210439015",
		"name": "黄俊杰",
		"gender": "男",
		"ethnicity": "汉族",
		"birthDate": "2003-05-19",
		"studentId": "3210439015",
		"className": "大数据211班",
		"joinDate": "2023-06-02",
		"position": "党支部委员",
		"identityType": "正式党员",
		"contact": "13654321987",
		"hasArchive": true
	},
	{
		"id": "S3210439037",
		"name": "林诗涵",
		"gender": "女",
		"ethnicity": "汉族",
		"birthDate": "2002-10-08",
		"studentId": "3210439037",
		"className": "大数据211班",
		"joinDate": "2023-12-03",
		"position": "普通党员",
		"identityType": "正式党员",
		"contact": "15012345678",
		"hasArchive": true
	},
	{
		"id": "S3210439062",
		"name": "郑浩轩",
		"gender": "男",
		"ethnicity": "汉族",
		"birthDate": "2003-03-25",
		"studentId": "3210439012",
		"className": "大数据212班",
		"joinDate": "2023-08-30",
		"position": "普通党员",
		"identityType": "正式党员",
		"contact": "13876543210",
		"hasArchive": true
	},
	{
		"id": "S3210439013",
		"name": "孙雨桐",
		"gender": "女",
		"ethnicity": "汉族",
		"birthDate": "2003-01-14",
		"studentId": "3210439013",
		"className": "大数据211班",
		"joinDate": "2024-06-12",
		"position": "普通党员",
		"identityType": "预备党员",
		"contact": "15901234567",
		"hasArchive": true
	},
	{
		"id": "S3210439058",
		"name": "马文博",
		"gender": "男",
		"ethnicity": "维吾尔族",
		"birthDate": "2003-07-07",
		"studentId": "3210439058",
		"className": "大数据212班",
		"joinDate": "2024-06-12",
		"position": "普通党员",
		"identityType": "预备党员",
		"contact": "13567890123",
		"hasArchive": true
	},
	{
		"id": "S3220439015",
		"name": "何心怡",
		"gender": "女",
		"ethnicity": "汉族",
		"birthDate": "2004-04-18",
		"studentId": "3220439015",
		"className": "大数据221班",
		"joinDate": "2024-08-25",
		"position": "普通党员",
		"identityType": "预备党员",
		"contact": "13765432109",
		"hasArchive": true
	},
	{
		"id": "S3220439016",
		"name": "罗一鸣",
		"gender": "男",
		"ethnicity": "藏族",
		"birthDate": "2004-06-11",
		"studentId": "3220439016",
		"className": "大数据221班",
		"joinDate": "2024-08-25",
		"position": "普通党员",
		"identityType": "预备党员",
		"contact": "13609876543",
		"hasArchive": true
	},
	{
		"id": "S3220439020",
		"name": "蔡宇航",
		"gender": "男",
		"ethnicity": "汉族",
		"birthDate": "2004-02-01",
		"studentId": "3220439020",
		"className": "大数据221班",
		"joinDate": "2023-08-25",
		"position": "普通党员",
		"identityType": "预备党员",
		"contact": "13543210987",
		"hasArchive": true
	},
	{
		"id": "S3220439034",
		"name": "梁思琪",
		"gender": "女",
		"ethnicity": "汉族",
		"birthDate": "2004-08-23",
		"studentId": "3220439034",
		"className": "大数据221班",
		"joinDate": "2024-08-25",
		"position": "普通党员",
		"identityType": "预备党员",
		"contact": "15801234567",
		"hasArchive": true
	},
	{
		"id": "S3220439069",
		"name": "郭子豪",
		"gender": "男",
		"ethnicity": "汉族",
		"birthDate": "2004-11-29",
		"studentId": "3220439069",
		"className": "大数据222班",
		"joinDate": "2024-12-11",
		"position": "普通党员",
		"identityType": "预备党员",
		"contact": "13987654321",
		"hasArchive": true
	},
	{
		"id": "S3220439071",
		"name": "高梦瑶",
		"gender": "女",
		"ethnicity": "汉族",
		"birthDate": "2004-02-17",
		"studentId": "3220439071",
		"className": "大数据222班",
		"joinDate": "2024-12-11",
		"position": "普通党员",
		"identityType": "预备党员",
		"contact": "15098761234",
		"hasArchive": true
	},

	{
		"id": "S3190439001",
		"name": "李明壹",
		"gender": "男",
		"ethnicity": "汉族",
		"birthDate": "2001-03-14",
		"studentId": "3190439001",
		"className": "大数据191班",
		"joinDate": "2021-06-10",
		"position": "普通党员",
		"identityType": "已毕业党员",
		"contact": "13936008951",
		"hasArchive": true
	},
	{
		"id": "S3190439002",
		"name": "王思远",
		"gender": "男",
		"ethnicity": "回族",
		"birthDate": "2000-11-05",
		"studentId": "3190439002",
		"className": "大数据191班",
		"joinDate": "2022-07-15",
		"position": "普通党员",
		"identityType": "已毕业党员",
		"contact": "13845126789",
		"hasArchive": true
	},
	{
		"id": "S3190439023",
		"name": "陈雨欣",
		"gender": "女",
		"ethnicity": "汉族",
		"birthDate": "2002-02-28",
		"studentId": "3190439023",
		"className": "大数据191班",
		"joinDate": "2021-06-10",
		"position": "普通党员",
		"identityType": "已毕业党员",
		"contact": "15098765432",
		"hasArchive": true
	},
	{
		"id": "S3190439056",
		"name": "张浩然",
		"gender": "男",
		"ethnicity": "满族",
		"birthDate": "1999-08-17",
		"studentId": "3190439056",
		"className": "大数据192班",
		"joinDate": "2021-09-01",
		"position": "普通党员",
		"identityType": "已毕业党员",
		"contact": "13612349876",
		"hasArchive": true
	},
	{
		"id": "S3200439005",
		"name": "赵雅婷",
		"gender": "女",
		"ethnicity": "汉族",
		"birthDate": "2001-06-22",
		"studentId": "3200439005",
		"className": "大数据201班",
		"joinDate": "2022-05-18",
		"position": "普通党员",
		"identityType": "已毕业党员",
		"contact": "15987654321",
		"hasArchive": true
	},
	{
		"id": "S3200439018",
		"name": "刘泽宇",
		"gender": "男",
		"ethnicity": "汉族",
		"birthDate": "2002-04-09",
		"studentId": "3200439006",
		"className": "大数据201班",
		"joinDate": "2022-11-25",
		"position": "普通党员",
		"identityType": "已毕业党员",
		"contact": "13524681357",
		"hasArchive": true
	},
	{
		"id": "S3200439041",
		"name": "周晓萌",
		"gender": "女",
		"ethnicity": "汉族",
		"birthDate": "2002-07-12",
		"studentId": "3200439041",
		"className": "大数据202班",
		"joinDate": "2023-01-05",
		"position": "普通党员",
		"identityType": "已毕业党员",
		"contact": "13798765432",
		"hasArchive": true
	},
	{
		"id": "S3200439056",
		"name": "吴天宇",
		"gender": "男",
		"ethnicity": "壮族",
		"birthDate": "2002-09-30",
		"studentId": "3200439056",
		"className": "大数据202班",
		"joinDate": "2023-06-20",
		"position": "普通党员",
		"identityType": "已毕业党员",
		"contact": "15876543210",
		"hasArchive": true
	}
]

export default function MembersList() {
	const [searchTerm, setSearchTerm] = useState("")
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
	const [selectedMember, setSelectedMember] = useState<any>(null)
	const {toast} = useToast()
	const [selectedIdentity, setSelectedIdentity] = useState<string>("all")

	// 过滤党员
	const filterMembers = () => {
		return members
			.filter((member) => selectedIdentity === "all" || member.identityType === selectedIdentity)
			.filter(
				(member) =>
					member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
					member.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
					member.studentId.toLowerCase().includes(searchTerm.toLowerCase()),
			)
	}

	const filteredMembers = filterMembers()

	const handleAddMember = () => {
		setIsAddDialogOpen(!isAddDialogOpen)
		if (isAddDialogOpen) {
			toast({
				title: "添加成功",
				description: "党员信息已成功添加",
			})
		}
	}

	const handleEditMember = () => {
		setIsEditDialogOpen(false)
		toast({
			title: "修改成功",
			description: "党员信息已成功更新",
		})
	}

	const handleDeleteMember = (member: any) => {
		toast({
			title: "删除成功",
			description: `党员 ${member.name} 已成功删除`,
		})
	}

	const handleViewArchive = (member: any) => {
		toast({
			title: "查看档案",
			description: `正在查看 ${member.name} 的电子档案`,
		})
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">党员名册</h1>
					<p className="text-muted-foreground">管理党支部所有党员信息</p>
				</div>
				<div className="flex items-center gap-2">
					<Button onClick={handleAddMember}>
						<UserPlus className="mr-2 h-4 w-4"/>
						添加党员
					</Button>
					<Button variant="outline">
						<Download className="mr-2 h-4 w-4"/>
						导出名册
					</Button>
				</div>
			</div>

			<div className="flex gap-2">
				<div className="relative flex-1">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
					<Input
						type="search"
						placeholder="搜索党员..."
						className="pl-8"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<Select value={selectedIdentity} onValueChange={setSelectedIdentity}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="选择身份类型"/>
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">全部身份类型</SelectItem>
						{identityTypes.map((type) => (
							<SelectItem key={type} value={type}>
								{type}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<Card>
				<CardContent>
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center gap-2"></div>
					</div>
					<div className="rounded-md border overflow-x-auto">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>用户编号</TableHead>
									<TableHead>姓名</TableHead>
									<TableHead>性别</TableHead>
									<TableHead>民族</TableHead>
									<TableHead>出生日期</TableHead>
									<TableHead>学号</TableHead>
									<TableHead>班级</TableHead>
									<TableHead>入党时间</TableHead>
									<TableHead>党内职务</TableHead>
									<TableHead>联系方式</TableHead>
									<TableHead className="w-[80px]"></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredMembers.map((member) => (
									<TableRow key={member.id}>
										<TableCell>{member.id}</TableCell>
										<TableCell>{member.name}</TableCell>
										<TableCell>{member.gender}</TableCell>
										<TableCell>{member.ethnicity}</TableCell>
										<TableCell>{member.birthDate}</TableCell>
										<TableCell>{member.studentId}</TableCell>
										<TableCell>{member.className}</TableCell>
										<TableCell>{member.joinDate}</TableCell>
										<TableCell>{member.position}</TableCell>
										<TableCell>{member.contact}</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" size="sm" className="h-8 w-8 p-0">
														<MoreHorizontal className="h-4 w-4"/>
														<span className="sr-only">打开菜单</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>操作</DropdownMenuLabel>
													<DropdownMenuSeparator/>
													<DropdownMenuItem>查看详情</DropdownMenuItem>
													<DropdownMenuItem>编辑信息</DropdownMenuItem>
													<DropdownMenuItem>上传档案</DropdownMenuItem>
													<DropdownMenuSeparator/>
													<DropdownMenuItem className="text-red-600"
																	  onClick={() => handleDeleteMember(member)}>
														删除
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
			<Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
				<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>添加新党员</DialogTitle>
						<DialogDescription>请填写新党员的基本信息，带 * 的为必填项</DialogDescription>
					</DialogHeader>
					<div className="grid grid-cols-2 gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="name" className="font-medium">
								姓名 *
							</Label>
							<Input id="name" placeholder="请输入姓名"/>
						</div>
						<div className="grid gap-2">
							<Label className="font-medium">性别 *</Label>
							<RadioGroup defaultValue="男" className="flex">
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="男" id="male"/>
									<Label htmlFor="male">男</Label>
								</div>
								<div className="flex items-center space-x-2 ml-4">
									<RadioGroupItem value="女" id="female"/>
									<Label htmlFor="female">女</Label>
								</div>
							</RadioGroup>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="ethnicity" className="font-medium">
								民族 *
							</Label>
							<Input id="ethnicity" placeholder="请输入民族" defaultValue="汉族"/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="birthDate" className="font-medium">
								出生日期 *
							</Label>
							<Input id="birthDate" type="date"/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="studentId" className="font-medium">
								学号 *
							</Label>
							<Input id="studentId" placeholder="请输入学号"/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="className" className="font-medium">
								班级 *
							</Label>
							<Input id="className" placeholder="请输入班级"/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="joinDate" className="font-medium">
								入党时间
							</Label>
							<Input id="joinDate" type="date"/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="position" className="font-medium">
								党内职务 *
							</Label>
							<Select defaultValue="普通党员">
								<SelectTrigger>
									<SelectValue placeholder="选择党内职务"/>
								</SelectTrigger>
								<SelectContent>
									{partyPositions.map((position) => (
										<SelectItem key={position} value={position}>
											{position}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="identityType" className="font-medium">
								身份类型 *
							</Label>
							<Select defaultValue="正式党员">
								<SelectTrigger>
									<SelectValue placeholder="选择身份类型"/>
								</SelectTrigger>
								<SelectContent>
									{identityTypes.map((type) => (
										<SelectItem key={type} value={type}>
											{type}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="contact" className="font-medium">
								联系方式 *
							</Label>
							<Input id="contact" placeholder="请输入手机号码"/>
						</div>
					</div>
					<DialogFooter>
						<Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
							取消
						</Button>
						<Button onClick={handleAddMember}>确认添加</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}
