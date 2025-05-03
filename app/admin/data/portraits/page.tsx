"use client"

import {useState} from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {RadarChart, type RadarChartData} from "@/components/ui/radar-chart"
import {Download, Filter, Search, UserPlus} from "lucide-react"

// Mock data for party members
const partyMembers = [
	{
		id: 1,
		name: "张三",
		department: "技术部",
		joinDate: "2018-05-15",
		position: "高级工程师",
		avatar: "/calligraphy-zhang.png",
		identityType: "full", // 添加身份类型
		scores: {
			ideologicalAwareness: 85,
			partyDiscipline: 90,
			workPerformance: 88,
			learningAttitude: 92,
			socialContribution: 78,
			teamworkSpirit: 86,
		},
	},
	{
		id: 2,
		name: "李四",
		department: "人力资源部",
		joinDate: "2015-03-22",
		position: "人力资源经理",
		avatar: "/calligraphy-li.png",
		identityType: "graduated", // 添加身份类型
		scores: {
			ideologicalAwareness: 92,
			partyDiscipline: 95,
			workPerformance: 82,
			learningAttitude: 88,
			socialContribution: 90,
			teamworkSpirit: 93,
		},
	},
	{
		id: 3,
		name: "王五",
		department: "财务部",
		joinDate: "2019-11-08",
		position: "财务主管",
		avatar: "/Chinese-Character-King.png",
		identityType: "probationary", // 添加身份类型
		scores: {
			ideologicalAwareness: 78,
			partyDiscipline: 85,
			workPerformance: 90,
			learningAttitude: 75,
			socialContribution: 82,
			teamworkSpirit: 80,
		},
	},
	{
		id: 4,
		name: "赵六",
		department: "市场部",
		joinDate: "2017-07-30",
		position: "市场专员",
		avatar: "/calligraphy-zhao.png",
		identityType: "full", // 添加身份类型
		scores: {
			ideologicalAwareness: 88,
			partyDiscipline: 82,
			workPerformance: 95,
			learningAttitude: 80,
			socialContribution: 85,
			teamworkSpirit: 90,
		},
	},
	{
		id: 5,
		name: "钱七",
		department: "销售部",
		joinDate: "2020-02-14",
		position: "销售经理",
		avatar: "/golden-coins-pile.png",
		identityType: "probationary", // 添加身份类型
		scores: {
			ideologicalAwareness: 90,
			partyDiscipline: 88,
			workPerformance: 93,
			learningAttitude: 85,
			socialContribution: 92,
			teamworkSpirit: 87,
		},
	},
]

// Function to convert member scores to radar chart data
const getMemberRadarData = (member: (typeof partyMembers)[0]): RadarChartData => {
	return {
		labels: [
			"思想觉悟", // Ideological Awareness
			"党性修养", // Party Discipline
			"工作表现", // Work Performance
			"学习态度", // Learning Attitude
			"社会贡献", // Social Contribution
			"团队精神", // Teamwork Spirit
		],
		datasets: [
			{
				label: member.name,
				data: [
					member.scores.ideologicalAwareness,
					member.scores.partyDiscipline,
					member.scores.workPerformance,
					member.scores.learningAttitude,
					member.scores.socialContribution,
					member.scores.teamworkSpirit,
				],
				backgroundColor: "rgba(255, 99, 132, 0.2)",
				borderColor: "rgba(255, 99, 132, 1)",
				borderWidth: 2,
			},
		],
	}
}

// Function to get average scores for all members
const getAverageScores = () => {
	const avgScores = {
		ideologicalAwareness: 0,
		partyDiscipline: 0,
		workPerformance: 0,
		learningAttitude: 0,
		socialContribution: 0,
		teamworkSpirit: 0,
	}

	partyMembers.forEach((member) => {
		avgScores.ideologicalAwareness += member.scores.ideologicalAwareness
		avgScores.partyDiscipline += member.scores.partyDiscipline
		avgScores.workPerformance += member.scores.workPerformance
		avgScores.learningAttitude += member.scores.learningAttitude
		avgScores.socialContribution += member.scores.socialContribution
		avgScores.teamworkSpirit += member.scores.teamworkSpirit
	})

	const count = partyMembers.length
	return {
		ideologicalAwareness: avgScores.ideologicalAwareness / count,
		partyDiscipline: avgScores.partyDiscipline / count,
		workPerformance: avgScores.workPerformance / count,
		learningAttitude: avgScores.learningAttitude / count,
		socialContribution: avgScores.socialContribution / count,
		teamworkSpirit: avgScores.teamworkSpirit / count,
	}
}

// Get average radar data
const getAverageRadarData = (): RadarChartData => {
	const avgScores = getAverageScores()

	return {
		labels: [
			"思想觉悟", // Ideological Awareness
			"党性修养", // Party Discipline
			"工作表现", // Work Performance
			"学习态度", // Learning Attitude
			"社会贡献", // Social Contribution
			"团队精神", // Teamwork Spirit
		],
		datasets: [
			{
				label: "组织平均",
				data: [
					avgScores.ideologicalAwareness,
					avgScores.partyDiscipline,
					avgScores.workPerformance,
					avgScores.learningAttitude,
					avgScores.socialContribution,
					avgScores.teamworkSpirit,
				],
				backgroundColor: "rgba(54, 162, 235, 0.2)",
				borderColor: "rgba(54, 162, 235, 1)",
				borderWidth: 2,
			},
		],
	}
}

// Get comparison radar data for a member and the average
const getComparisonRadarData = (member: (typeof partyMembers)[0]): RadarChartData => {
	const avgScores = getAverageScores()

	return {
		labels: [
			"思想觉悟", // Ideological Awareness
			"党性修养", // Party Discipline
			"工作表现", // Work Performance
			"学习态度", // Learning Attitude
			"社会贡献", // Social Contribution
			"团队精神", // Teamwork Spirit
		],
		datasets: [
			{
				label: member.name,
				data: [
					member.scores.ideologicalAwareness,
					member.scores.partyDiscipline,
					member.scores.workPerformance,
					member.scores.learningAttitude,
					member.scores.socialContribution,
					member.scores.teamworkSpirit,
				],
				backgroundColor: "rgba(255, 99, 132, 0.2)",
				borderColor: "rgba(255, 99, 132, 1)",
				borderWidth: 2,
			},
			{
				label: "组织平均",
				data: [
					avgScores.ideologicalAwareness,
					avgScores.partyDiscipline,
					avgScores.workPerformance,
					avgScores.learningAttitude,
					avgScores.socialContribution,
					avgScores.teamworkSpirit,
				],
				backgroundColor: "rgba(54, 162, 235, 0.2)",
				borderColor: "rgba(54, 162, 235, 1)",
				borderWidth: 2,
			},
		],
	}
}

export default function PartyMemberPortraits() {
	const [searchTerm, setSearchTerm] = useState("")
	const [identityType, setIdentityType] = useState("all")
	const [selectedMember, setSelectedMember] = useState<(typeof partyMembers)[0] | null>(null)
	const [activeTab, setActiveTab] = useState("individual")

	// Filter members based on search term and department
	const filteredMembers = partyMembers.filter((member) => {
		const matchesSearch = member.name.includes(searchTerm) || member.position.includes(searchTerm)
		const matchesIdentityType = identityType === "all" || member.identityType === identityType
		return matchesSearch && matchesIdentityType
	})

	// 不再需要从数据中获取身份类型列表，因为我们已经硬编码了

	return (
		<div className="container mx-auto py-6 space-y-6">
			<div className="flex flex-col md:flex-row justify-between gap-4">
				<h1 className="text-2xl font-bold">党员画像</h1>
				<div className="flex flex-col sm:flex-row gap-2">
					<div className="relative">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
						<Input
							type="search"
							placeholder="搜索党员..."
							className="pl-8 w-full sm:w-[200px]"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
					<Select value={identityType} onValueChange={setIdentityType}>
						<SelectTrigger className="w-full sm:w-[180px]">
							<SelectValue placeholder="选择身份类型"/>
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">所有身份类型</SelectItem>
							<SelectItem value="graduated">已毕业党员</SelectItem>
							<SelectItem value="full">正式党员</SelectItem>
							<SelectItem value="probationary">预备党员</SelectItem>
						</SelectContent>
					</Select>
					<Button variant="outline" size="icon">
						<Filter className="h-4 w-4"/>
					</Button>
					<Button variant="outline" size="icon">
						<Download className="h-4 w-4"/>
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<Card className="lg:col-span-1  ">
					<CardHeader>
						<CardTitle>党员列表</CardTitle>
						<CardDescription>选择党员查看详细画像</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{filteredMembers.length === 0 ? (
								<p className="text-center py-4 text-muted-foreground">未找到符合条件的党员</p>
							) : (
								filteredMembers.map((member) => (
									<div
										key={member.id}
										className={`flex items-center p-3 rounded-md cursor-pointer transition-colors ${
											selectedMember?.id === member.id ? "bg-red-100 border border-red-300" : "hover:bg-red-50"
										}`}
										onClick={() => setSelectedMember(member)}
									>
										<Avatar className="h-10 w-10 mr-3">
											<AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name}/>
											<AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
										</Avatar>
										<div className="flex-1 min-w-0">
											<div className="flex justify-between">
												<p className="font-medium truncate">{member.name}</p>
												<p className="text-sm text-muted-foreground">{member.department}</p>
											</div>
											<p className="text-sm text-muted-foreground truncate">{member.position}</p>
										</div>
									</div>
								))
							)}
						</div>
					</CardContent>
				</Card>

				<div className="lg:col-span-2">
					{selectedMember ? (
						<div className="space-y-6">
							<Card>
								<CardHeader className="pb-2">
									<div className="flex justify-between items-start">
										<div className="flex items-center">
											<Avatar className="h-12 w-12 mr-4">
												<AvatarImage src={selectedMember.avatar || "/placeholder.svg"}
															 alt={selectedMember.name}/>
												<AvatarFallback>{selectedMember.name.charAt(0)}</AvatarFallback>
											</Avatar>
											<div>
												<CardTitle>{selectedMember.name}</CardTitle>
												<CardDescription>
													{selectedMember.department} - {selectedMember.position}
												</CardDescription>
											</div>
										</div>
										<Button variant="outline" size="sm">
											<UserPlus className="h-4 w-4 mr-2"/>
											更新画像
										</Button>
									</div>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
										<div>
											<p className="text-sm text-muted-foreground">入党日期</p>
											<p className="font-medium">{selectedMember.joinDate}</p>
										</div>
										<div>
											<p className="text-sm text-muted-foreground">党龄</p>
											<p className="font-medium">
												{new Date().getFullYear() - new Date(selectedMember.joinDate).getFullYear()}年
											</p>
										</div>
										<div>
											<p className="text-sm text-muted-foreground">综合评分</p>
											<p className="font-medium">
												{Math.round(
													(selectedMember.scores.ideologicalAwareness +
														selectedMember.scores.partyDiscipline +
														selectedMember.scores.workPerformance +
														selectedMember.scores.learningAttitude +
														selectedMember.scores.socialContribution +
														selectedMember.scores.teamworkSpirit) /
													6,
												)}
												分
											</p>
										</div>
									</div>
								</CardContent>
							</Card>

							<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
								<TabsList className="grid w-full grid-cols-3">
									<TabsTrigger value="individual">个人画像</TabsTrigger>
									<TabsTrigger value="comparison">对比分析</TabsTrigger>
									<TabsTrigger value="history">历史趋势</TabsTrigger>
								</TabsList>
								<TabsContent value="individual" className="mt-4">
									<RadarChart
										title={`${selectedMember.name}的党员画像`}
										data={getMemberRadarData(selectedMember)}
										height={400}
									/>
								</TabsContent>
								<TabsContent value="comparison" className="mt-4">
									<RadarChart title="与组织平均水平对比" data={getComparisonRadarData(selectedMember)}
												height={400}/>
								</TabsContent>
								<TabsContent value="history" className="mt-4">
									<Card>
										<CardHeader>
											<CardTitle>历史发展趋势</CardTitle>
											<CardDescription>显示党员各项指标的历史变化趋势</CardDescription>
										</CardHeader>
										<CardContent className="h-[400px] flex items-center justify-center">
											<p className="text-muted-foreground">历史数据加载中...</p>
										</CardContent>
									</Card>
								</TabsContent>
							</Tabs>
						</div>
					) : (
						<Card className="h-full flex items-center justify-center p-6  ">
							<div className="text-center">
								<h3 className="text-lg font-medium mb-2">请选择党员</h3>
								<p className="text-muted-foreground">从左侧列表中选一名党员查看详细画像</p>
							</div>
						</Card>
					)}
				</div>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>组织整体画像</CardTitle>
					<CardDescription>展示组织所有党员的平均水平</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<RadarChart title="组织平均水平" data={getAverageRadarData()} height={350}/>
						<Card>
							<CardHeader>
								<CardTitle>组织画像分析</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h4 className="font-medium mb-1">优势领域</h4>
										<p className="text-sm text-muted-foreground">
											组织在党性修养和学习态度方面表现突出，平均分分别为{Math.round(getAverageScores().partyDiscipline)}
											分和{Math.round(getAverageScores().learningAttitude)}分。
										</p>
									</div>
									<div>
										<h4 className="font-medium mb-1">提升空间</h4>
										<p className="text-sm text-muted-foreground">
											社会贡献方面有待提高，平均分为{Math.round(getAverageScores().socialContribution)}
											分，建议加强社会实践和志愿服务活动。
										</p>
									</div>
									<div>
										<h4 className="font-medium mb-1">发展建议</h4>
										<p className="text-sm text-muted-foreground">
											1. 加强思想政治学习，提高思想觉悟
											<br/>
											2. 组织更多团队建设活动，增强团队凝聚力
											<br/>
											3. 鼓励党员参与社会公益活动，提升社会贡献度
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
