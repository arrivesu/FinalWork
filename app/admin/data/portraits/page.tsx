"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RadarChart, type RadarChartData } from "@/components/ui/radar-chart"
import { Download, Filter, Search, UserPlus } from "lucide-react"
import { MemberAPI, UserDataAPI } from "@/lib/api"
import { toast } from "@/components/ui/use-toast"

// Mock data for party members
const party_member_list = MemberAPI.data
const user_data_list = UserDataAPI.data

type MemberData = {
	ideologicalAwareness: number
	partyDiscipline: number
	workPerformance: number
	learningAttitude: number
	socialContribution: number
}

const getMemberData = (member: MemberType, record_time: string): MemberData | null => {
	const userdata = user_data_list.filter((data) => data.record_time === record_time && data.user.id === member.id)

	if (userdata.length !== 1) {
		return null
	}

	const cur_data = userdata[0];

	const A1 = 100*(1-cur_data.moral_rank);
	const A2 = 100*(1-cur_data.academic_rank);
	const A3 = 0.6*(cur_data.assessment_score)+40* (cur_data.volunteering_time > 15 ? 15 : cur_data.volunteering_time)/15;
	const A4 = 50*(1-cur_data.dorm_score)+(50+cur_data.behavior_score);
	const A5 = cur_data.public_opinion_score*20;

	const calcData = {
		ideologicalAwareness: A1,
		partyDiscipline: A2,
		workPerformance: A3,
		learningAttitude: A4,
		socialContribution: A5,
	}

	return calcData
}

const getMemberAvgData = (member: MemberType, record_time: string): number => {
	const data = getMemberData(member, record_time)
	if (data === null) return 0

	return Math.round(
		(data.ideologicalAwareness +
			data.partyDiscipline +
			data.workPerformance +
			data.learningAttitude +
			data.socialContribution) /
		5,
	)
}

// Function to convert member scores to radar chart data
const getMemberRadarData = (member: MemberType, record_time: string): RadarChartData => {
	const calcData = getMemberData(member, record_time)

	if (calcData === null) {
		return {
			labels: [
				"思想锋领指数", // Ideological Awareness
				"学业锋领指数", // Party Discipline
				"服务锋领指数", // Work Performance
				"作风锋领指数", // Learning Attitude
				"群众锋领指数", // Social Contribution
			],
			datasets: [],
		}
	}

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
				label: member.name,
				data: [
					calcData.ideologicalAwareness,
					calcData.partyDiscipline,
					calcData.workPerformance,
					calcData.learningAttitude,
					calcData.socialContribution,
				],
				backgroundColor: "rgba(255, 99, 132, 0.2)",
				borderColor: "rgba(255, 99, 132, 1)",
				borderWidth: 2,
			},
		],
	}
}

// Function to get average scores for all members
const getAverageScores = (record_time: string) => {
	const avgScores = {
		ideologicalAwareness: 0,
		partyDiscipline: 0,
		workPerformance: 0,
		learningAttitude: 0,
		socialContribution: 0,
	}

	party_member_list.forEach((member) => {
		const scores = getMemberData(member, record_time)
		if (scores === null) return

		avgScores.ideologicalAwareness += scores.ideologicalAwareness
		avgScores.partyDiscipline += scores.partyDiscipline
		avgScores.workPerformance += scores.workPerformance
		avgScores.learningAttitude += scores.learningAttitude
		avgScores.socialContribution += scores.socialContribution
	})

	const count = party_member_list.length
	return {
		ideologicalAwareness: avgScores.ideologicalAwareness / count,
		partyDiscipline: avgScores.partyDiscipline / count,
		workPerformance: avgScores.workPerformance / count,
		learningAttitude: avgScores.learningAttitude / count,
		socialContribution: avgScores.socialContribution / count,
	}
}

// Get average radar data
const getAverageRadarData = (record_time: string): RadarChartData => {
	const avgScores = getAverageScores(record_time)

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
				label: "组织平均",
				data: [
					avgScores.ideologicalAwareness,
					avgScores.partyDiscipline,
					avgScores.workPerformance,
					avgScores.learningAttitude,
					avgScores.socialContribution,
				],
				backgroundColor: "rgba(54, 162, 235, 0.2)",
				borderColor: "rgba(54, 162, 235, 1)",
				borderWidth: 2,
			},
		],
	}
}

// Get comparison radar data for a member and the average
const getComparisonRadarData = (member: MemberType, record_time: string): RadarChartData => {
	const memberData = getMemberData(member, record_time)
	const avgScores = getAverageScores(record_time)

	if (memberData === null) {
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
					label: "组织平均",
					data: [
						avgScores.ideologicalAwareness,
						avgScores.partyDiscipline,
						avgScores.workPerformance,
						avgScores.learningAttitude,
						avgScores.socialContribution,
					],
					backgroundColor: "rgba(54, 162, 235, 0.2)",
					borderColor: "rgba(54, 162, 235, 1)",
					borderWidth: 2,
				},
			],
		}
	}

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
				label: member.name,
				data: [
					memberData.ideologicalAwareness,
					memberData.partyDiscipline,
					memberData.workPerformance,
					memberData.learningAttitude,
					memberData.socialContribution,
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
	const [selectedMember, setSelectedMember] = useState<(typeof party_member_list)[0] | null>(null)
	const [activeTab, setActiveTab] = useState("individual")

	// Add a function to export portraits
	const exportPortraits = (format: "pdf" | "image") => {
		const formatName = format === "pdf" ? "PDF" : "图片"
		const message = selectedMember
			? `已成功导出 ${selectedMember.name} 的党员画像为${formatName}格式`
			: `已成功导出所有党员画像为${formatName}格式`

		toast({
			title: "导出成功",
			description: message,
		})
	}

	// Update the Download button to call the export function
	const renderExportButton = () => (
		<Button variant="outline" size="icon" onClick={() => exportPortraits("pdf")}>
			<Download className="h-4 w-4" />
		</Button>
	)


	// 添加筛选
	const [term, setTerm] = useState("2024-2025-2")

	// Filter members based on search term and department
	const filteredMembers = party_member_list.filter((member) => {
		const matchesSearch = member.name.includes(searchTerm) || (member.party_position?.includes(searchTerm) ?? false)
		const matchesIdentityType = identityType === "all" || member.identity_type === identityType
		return matchesSearch && matchesIdentityType
	})

	return (
		<div className="container mx-auto py-6 space-y-6">
			<div className="flex flex-col md:flex-row justify-between gap-4">
				<h1 className="text-2xl font-bold">党员画像</h1>
				<div className="flex flex-col sm:flex-row gap-2">
					<div className="relative">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
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
							<SelectValue placeholder="选择身份类型" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">所有身份类型</SelectItem>
							<SelectItem value="graduated">已毕业党员</SelectItem>
							<SelectItem value="full">正式党员</SelectItem>
							<SelectItem value="probationary">预备党员</SelectItem>
						</SelectContent>
					</Select>
					<Button variant="outline" size="icon">
						<Filter className="h-4 w-4" />
					</Button>
					{renderExportButton()}
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<Card className="lg:col-span-1  ">
					<CardHeader>
						<CardTitle>党员列表</CardTitle>
						<CardDescription>选择党员查看详细画像</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
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
											<AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
											<AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
										</Avatar>
										<div className="flex-1 min-w-0">
											<div className="flex justify-between">
												<p className="font-medium truncate">{member.name}</p>
												<p className="text-sm text-muted-foreground">{member.class_name}</p>
											</div>
											<p className="text-sm text-muted-foreground truncate">{member.party_position}</p>
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
												<AvatarImage src={selectedMember.avatar || "/placeholder.svg"} alt={selectedMember.name} />
												<AvatarFallback>{selectedMember.name.charAt(0)}</AvatarFallback>
											</Avatar>
											<div>
												<CardTitle>{selectedMember.name}</CardTitle>
												<CardDescription>
													{selectedMember.class_name} - {selectedMember.party_position}
												</CardDescription>
											</div>
										</div>
										<Button variant="outline" size="sm">
											<UserPlus className="h-4 w-4 mr-2" />
											更新画像
										</Button>
									</div>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
										<div>
											<p className="text-sm text-muted-foreground">综合评分</p>
											<p className="font-medium">{getMemberAvgData(selectedMember, term)}分</p>
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
										data={getMemberRadarData(selectedMember, term)}
										height={400}
									/>
								</TabsContent>
								<TabsContent value="comparison" className="mt-4">
									<RadarChart
										title="与组织平均水平对比"
										data={getComparisonRadarData(selectedMember, term)}
										height={400}
									/>
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
					<div className="grid grid-cols-1 gap-6">
						<RadarChart title="" data={getAverageRadarData(term)} height={350} />
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
