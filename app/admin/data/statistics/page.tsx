"use client"

import {useState} from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Button} from "@/components/ui/button"
import {BookOpen, Calendar, Download, Users} from "lucide-react"
import {
	ArcElement,
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
} from "chart.js"
import {Bar, Doughnut, Line, Pie} from "react-chartjs-2"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

// Mock data for statistics
const membershipData = {
	total: 34,
	active: 28,
	inactive: 14,
	byGender: {male: 15, female: 19},
	byAge: {"18-30": 33, "31-40": 1, "41-50": 0, "51+": 0},
	byEducation: {高中: 0, 大专: 0, 本科: 33, 硕士: 1, 博士: 0},
	byClass: {大数据211班: 13, 大数据212班: 12, 大数据221班: 4, 大数据222班: 5},
}

const activityData = {
	meetingsCount: 24,
	meetingsAttendance: 87,
	educationCount: 36,
	educationAttendance: 92,

	byMonth: {
		"1月": {meetings: 2, education: 3},
		"2月": {meetings: 1, education: 2},
		"3月": {meetings: 3, education: 4},
		"4月": {meetings: 2, education: 3},
		"5月": {meetings: 2, education: 3},
		"6月": {meetings: 3, education: 4},
		"7月": {meetings: 1, education: 2},
		"8月": {meetings: 2, education: 3},
		"9月": {meetings: 2, education: 4},
		"10月": {meetings: 3, education: 3},
		"11月": {meetings: 2, education: 3},
		"12月": {meetings: 1, education: 2},
	},
}

const developmentData = {
	applicants: 32,
	activists: 21,
	candidates: 11,
	newMembers: 6,
	byStage: {
		入党申请人: 40,
		入党积极分子: 25,
		发展对象: 15,
		预备党员: 10,
		正式党员: 24,
	}
}

// Chart color palette
const chartColors = {
	primary: "rgb(220, 38, 38)",
	primaryLight: "rgba(220, 38, 38, 0.5)",
	secondary: "rgb(37, 99, 235)",
	secondaryLight: "rgba(37, 99, 235, 0.5)",
	tertiary: "rgb(234, 88, 12)",
	tertiaryLight: "rgba(234, 88, 12, 0.5)",
	quaternary: "rgb(22, 163, 74)",
	quaternaryLight: "rgba(22, 163, 74, 0.5)",
	quinary: "rgb(139, 92, 246)",
	quinaryLight: "rgba(139, 92, 246, 0.5)",
	background: [
		"rgba(220, 38, 38, 0.8)",
		"rgba(37, 99, 235, 0.8)",
		"rgba(234, 88, 12, 0.8)",
		"rgba(22, 163, 74, 0.8)",
		"rgba(139, 92, 246, 0.8)",
		"rgba(6, 182, 212, 0.8)",
		"rgba(245, 158, 11, 0.8)",
		"rgba(236, 72, 153, 0.8)",
		"rgba(168, 85, 247, 0.8)",
		"rgba(59, 130, 246, 0.8)",
	],
	backgroundLight: [
		"rgba(220, 38, 38, 0.2)",
		"rgba(37, 99, 235, 0.2)",
		"rgba(234, 88, 12, 0.2)",
		"rgba(22, 163, 74, 0.2)",
		"rgba(139, 92, 246, 0.2)",
		"rgba(6, 182, 212, 0.2)",
		"rgba(245, 158, 11, 0.2)",
		"rgba(236, 72, 153, 0.2)",
		"rgba(168, 85, 247, 0.2)",
		"rgba(59, 130, 246, 0.2)",
	],
}

export default function StatisticsPage() {
	const [timeRange, setTimeRange] = useState("year")

	// Gender distribution chart data
	const genderChartData = {
		labels: ["男性", "女性"],
		datasets: [
			{
				data: [membershipData.byGender.male, membershipData.byGender.female],
				backgroundColor: [chartColors.secondary, chartColors.primary],
				borderColor: ["#fff", "#fff"],
				borderWidth: 2,
			},
		],
	}

	// Age distribution chart data
	const ageChartData = {
		labels: Object.keys(membershipData.byAge),
		datasets: [
			{
				label: "党员数量",
				data: Object.values(membershipData.byAge),
				backgroundColor: chartColors.primary,
				borderColor: chartColors.primaryLight,
				borderWidth: 1,
			},
		],
	}

	// Education distribution chart data
	const educationChartData = {
		labels: Object.keys(membershipData.byEducation),
		datasets: [
			{
				data: Object.values(membershipData.byEducation),
				backgroundColor: chartColors.background.slice(0, Object.keys(membershipData.byEducation).length),
				borderColor: ["#fff", "#fff", "#fff", "#fff", "#fff"],
				borderWidth: 2,
			},
		],
	}

	// Class distribution chart data
	const departmentChartData = {
		labels: Object.keys(membershipData.byClass),
		datasets: [
			{
				label: "党员数量",
				data: Object.values(membershipData.byClass),
				backgroundColor: chartColors.background.slice(0, Object.keys(membershipData.byClass).length),
				borderColor: ["#fff", "#fff", "#fff", "#fff"],
				borderWidth: 1,
			},
		],
	}


	// Activity by month chart data
	const activityByMonthChartData = {
		labels: Object.keys(activityData.byMonth),
		datasets: [
			{
				label: "会议",
				data: Object.values(activityData.byMonth).map((item) => item.meetings),
				backgroundColor: chartColors.primaryLight,
				borderColor: chartColors.primary,
				borderWidth: 2,
				tension: 0.3,
			},
			{
				label: "学习教育活动",
				data: Object.values(activityData.byMonth).map((item) => item.education),
				backgroundColor: chartColors.secondaryLight,
				borderColor: chartColors.secondary,
				borderWidth: 2,
				tension: 0.3,
			},
		],
	}

	// Monthly activity distribution chart data
	const monthlyActivityChartData = {
		labels: Object.keys(activityData.byMonth),
		datasets: [
			{
				label: "会议",
				data: Object.values(activityData.byMonth).map((item) => item.meetings),
				backgroundColor: chartColors.primary,
				stack: "Stack 0",
			},
			{
				label: "学习教育活动",
				data: Object.values(activityData.byMonth).map((item) => item.education),
				backgroundColor: chartColors.secondary,
				stack: "Stack 0",
			},

		],
	}

	// Development by stage chart data
	const developmentByStageChartData = {
		labels: Object.keys(developmentData.byStage),
		datasets: [
			{
				label: "人数",
				data: Object.values(developmentData.byStage),
				backgroundColor: chartColors.background.slice(0, Object.keys(developmentData.byStage).length),
				borderColor: chartColors.backgroundLight.slice(0, Object.keys(developmentData.byStage).length),
				borderWidth: 1,
			},
		],
	}


	// Chart options
	const pieChartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: "bottom" as const,
			},
		},
	}

	const barChartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: "top" as const,
			},
		},
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	}

	const lineChartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: "top" as const,
			},
		},
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	}

	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row justify-between items-start gap-4">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">数据统计</h1>
					<p className="text-muted-foreground">党组织数据统计与分析</p>
				</div>
				<div className="flex items-center gap-2">
					<Select value={timeRange} onValueChange={setTimeRange}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="选择时间范围"/>
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="month">本月</SelectItem>
							<SelectItem value="quarter">本季度</SelectItem>
							<SelectItem value="year">本年度</SelectItem>
							<SelectItem value="all">全部时间</SelectItem>
						</SelectContent>
					</Select>
					<Button variant="outline">
						<Download className="mr-2 h-4 w-4"/>
						导出报告
					</Button>
				</div>
			</div>

			<div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">党员总数</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground"/>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{membershipData.total}</div>
						<p className="text-xs text-muted-foreground">
							活跃党员: {membershipData.active} ({Math.round((membershipData.active / membershipData.total) * 100)}%)
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">会议活动</CardTitle>
						<Calendar className="h-4 w-4 text-muted-foreground"/>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{activityData.meetingsCount}</div>
						<p className="text-xs text-muted-foreground">平均出席率: {activityData.meetingsAttendance}%</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">学习教育</CardTitle>
						<BookOpen className="h-4 w-4 text-muted-foreground"/>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{activityData.educationCount}</div>
						<p className="text-xs text-muted-foreground">平均参与率: {activityData.educationAttendance}%</p>
					</CardContent>
				</Card>
			</div>
			<Tabs defaultValue="membership">
				<TabsList className="grid w-full grid-cols-3 border rounded-lg p-3 min-h-[72px] items-center">
					<TabsTrigger value="membership" className="py-4 px-8 flex items-center justify-center h-full">
						党员结构
					</TabsTrigger>
					<TabsTrigger value="activities" className="py-4 px-8 flex items-center justify-center h-full">
						活动统计
					</TabsTrigger>
					<TabsTrigger value="development" className="py-4 px-8 flex items-center justify-center h-full">
						发展情况
					</TabsTrigger>
				</TabsList>

				<TabsContent value="membership" className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						<Card>
							<CardHeader>
								<CardTitle>党员性别比例</CardTitle>
								<CardDescription>按性别统计党员分布</CardDescription>
							</CardHeader>
							<CardContent className="flex justify-center">
								<div className="w-full h-[250px]">
									<Doughnut data={genderChartData} options={pieChartOptions}/>
								</div>
							</CardContent>
							<div className="px-6 pb-6">
								<div className="grid grid-cols-2 gap-4">
									<div className="flex flex-col items-center">
										<span className="text-sm font-medium">男性</span>
										<span className="text-2xl font-bold">{membershipData.byGender.male}</span>
										<span className="text-xs text-muted-foreground">
                      {Math.round((membershipData.byGender.male / membershipData.total) * 100)}%
                    </span>
									</div>
									<div className="flex flex-col items-center">
										<span className="text-sm font-medium">女性</span>
										<span className="text-2xl font-bold">{membershipData.byGender.female}</span>
										<span className="text-xs text-muted-foreground">
                      {Math.round((membershipData.byGender.female / membershipData.total) * 100)}%
                    </span>
									</div>
								</div>
							</div>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>党员年龄分布</CardTitle>
								<CardDescription>按年龄段统计党员分布</CardDescription>
							</CardHeader>
							<CardContent className="flex justify-center">
								<div className="w-full h-[250px]">
									<Bar data={ageChartData} options={barChartOptions}/>
								</div>
							</CardContent>
							<div className="px-6 pb-6">
								<div className="grid grid-cols-4 gap-2">
									{Object.entries(membershipData.byAge).map(([age, count]) => (
										<div key={age} className="flex flex-col items-center">
											<span className="text-xs font-medium">{age}</span>
											<span className="text-lg font-bold">{count}</span>
											<span className="text-xs text-muted-foreground">
                        {Math.round((count / membershipData.total) * 100)}%
                      </span>
										</div>
									))}
								</div>
							</div>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>党员学历分布</CardTitle>
								<CardDescription>按学历统计党员分布</CardDescription>
							</CardHeader>
							<CardContent className="flex justify-center">
								<div className="w-full h-[250px]">
									<Pie data={educationChartData} options={pieChartOptions}/>
								</div>
							</CardContent>
							<div className="px-6 pb-6">
								<div className="grid grid-cols-5 gap-2">
									{Object.entries(membershipData.byEducation).map(([edu, count]) => (
										<div key={edu} className="flex flex-col items-center">
											<span className="text-xs font-medium">{edu}</span>
											<span className="text-lg font-bold">{count}</span>
											<span className="text-xs text-muted-foreground">
                        {Math.round((count / membershipData.total) * 100)}%
                      </span>
										</div>
									))}
								</div>
							</div>
						</Card>
						<Card className="lg:col-span-3">
							<CardHeader>
								<CardTitle>党员班级分布</CardTitle>
								<CardDescription>按班级统计党员分布</CardDescription>
							</CardHeader>
							<CardContent className="flex justify-center">
								<div className="w-full h-[250px]">
									<Bar data={departmentChartData} options={barChartOptions}/>
								</div>
							</CardContent>
							<div className="px-6 pb-6">
								<div className="grid grid-cols-3 md:grid-cols-4 gap-2">
									{Object.entries(membershipData.byClass).map(([dept, count]) => (
										<div key={dept} className="flex flex-col items-center">
											<span className="text-xs font-medium">{dept}</span>
											<span className="text-lg font-bold">{count}</span>
											<span className="text-xs text-muted-foreground">
                        {Math.round((count / membershipData.total) * 100)}%
                      </span>
										</div>
									))}
								</div>
							</div>
						</Card>
					</div>
				</TabsContent>
				<TabsContent value="activities" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>年度活动统计</CardTitle>
							<CardDescription>各类活动数量和参与情况</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-8">
								<div className="w-full h-[300px]">
									<Line data={activityByMonthChartData} options={lineChartOptions}/>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
									<div className="space-y-2">
										<h4 className="text-sm font-medium">会议</h4>
										<div className="grid grid-cols-2 gap-2">
											<div>
												<p className="text-xs text-muted-foreground">总次数</p>
												<p className="text-lg font-bold">{activityData.meetingsCount}</p>
											</div>
											<div>
												<p className="text-xs text-muted-foreground">平均出席率</p>
												<p className="text-lg font-bold">{activityData.meetingsAttendance}%</p>
											</div>
										</div>
									</div>
									<div className="space-y-2">
										<h4 className="text-sm font-medium">学习教育活动</h4>
										<div className="grid grid-cols-2 gap-2">
											<div>
												<p className="text-xs text-muted-foreground">总次数</p>
												<p className="text-lg font-bold">{activityData.educationCount}</p>
											</div>
											<div>
												<p className="text-xs text-muted-foreground">平均参与率</p>
												<p className="text-lg font-bold">{activityData.educationAttendance}%</p>
											</div>
										</div>
									</div>

								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="development" className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2">
						<Card>
							<CardHeader>
								<CardTitle>党员发展情况</CardTitle>
								<CardDescription>各阶段党员发展数量</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="w-full h-[300px]">
									<Bar data={developmentByStageChartData} options={barChartOptions}/>
								</div>
								<div className="grid grid-cols-3 md:grid-cols-5 gap-2 mt-4">
									{Object.entries(developmentData.byStage).map(([stage, count]) => (
										<div key={stage} className="flex flex-col items-center">
											<span className="text-xs font-medium">{stage}</span>
											<span className="text-lg font-bold">{count}</span>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>本年度发展统计</CardTitle>
								<CardDescription>本年度各阶段发展情况</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="grid grid-cols-2 gap-4">
										<div className="space-y-2">
											<h4 className="text-sm font-medium">入党申请人</h4>
											<p className="text-2xl font-bold">{developmentData.applicants}</p>
										</div>
										<div className="space-y-2">
											<h4 className="text-sm font-medium">入党积极分子</h4>
											<p className="text-2xl font-bold">{developmentData.activists}</p>
										</div>
										<div className="space-y-2">
											<h4 className="text-sm font-medium">发展对象</h4>
											<p className="text-2xl font-bold">{developmentData.candidates}</p>
										</div>
										<div className="space-y-2">
											<h4 className="text-sm font-medium">新发展党员</h4>
											<p className="text-2xl font-bold">{developmentData.newMembers}</p>
										</div>
									</div>
									<div className="pt-4 border-t">
										<h4 className="text-sm font-medium mb-2">转化率分析</h4>
										<div className="space-y-2">
											<div>
												<div className="flex justify-between mb-1">
													<span className="text-xs">入党申请人 → 积极分子</span>
													<span className="text-xs font-medium">
                            {Math.round((developmentData.activists / developmentData.applicants) * 100)}%
                          </span>
												</div>
												<div className="w-full bg-muted rounded-full h-1.5">
													<div
														className="bg-red-500 h-1.5 rounded-full"
														style={{
															width: `${Math.round((developmentData.activists / developmentData.applicants) * 100)}%`,
														}}
													></div>
												</div>
											</div>
											<div>
												<div className="flex justify-between mb-1">
													<span className="text-xs">积极分子 → 发展对象</span>
													<span className="text-xs font-medium">
                            {Math.round((developmentData.candidates / developmentData.activists) * 100)}%
                          </span>
												</div>
												<div className="w-full bg-muted rounded-full h-1.5">
													<div
														className="bg-red-500 h-1.5 rounded-full"
														style={{
															width: `${Math.round((developmentData.candidates / developmentData.activists) * 100)}%`,
														}}
													></div>
												</div>
											</div>
											<div>
												<div className="flex justify-between mb-1">
													<span className="text-xs">发展对象 → 新党员</span>
													<span className="text-xs font-medium">
                            {Math.round((developmentData.newMembers / developmentData.candidates) * 100)}%
                          </span>
												</div>
												<div className="w-full bg-muted rounded-full h-1.5">
													<div
														className="bg-red-500 h-1.5 rounded-full"
														style={{
															width: `${Math.round((developmentData.newMembers / developmentData.candidates) * 100)}%`,
														}}
													></div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

				</TabsContent>
			</Tabs>
		</div>
	)
}
