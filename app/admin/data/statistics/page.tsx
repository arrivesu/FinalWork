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
import {ActivitiesAPI, MemberAPI} from "@/lib/api";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

function getStatisticsData() {
	const member_list = MemberAPI.get();

	function getAge(birthday: Date): number {
		const today = new Date();
		let age = today.getFullYear() - birthday.getFullYear();
		const hasHadBirthdayThisYear =
			today.getMonth() > birthday.getMonth() ||
			(today.getMonth() === birthday.getMonth() &&
				today.getDate() >= birthday.getDate());
		if (!hasHadBirthdayThisYear) {
			age--;
		}
		return age;
	}

	const membershipData = {
		total: member_list.length,
		active: member_list.filter((member) => member.identity_type === '正式党员').length,
		inactive: member_list.filter((member) => member.identity_type === '预备党员').length,
		byGender: {
			male: member_list.filter((member) => member.gender === '男').length,
			female: member_list.filter((member) => member.gender === '女').length,
		},
		byAge: member_list.reduce(
			(acc: Record<string, number>, member, idx, arr) => {
				const age = getAge(member.birth_date);
				const groupStart = Math.floor(age / 10) * 10;
				const groupLabel = `${groupStart}-${groupStart + 9}岁`;
				acc[groupLabel] = (acc[groupLabel] || 0) + 1;
				return acc;
			}, {}),
		byClass: member_list.reduce(
			(acc: Record<string, number>, member, idx, arr) => {
				acc[member.class_name] = (acc[member.class_name] || 0) + 1;
				return acc;
			}, {})
	}

	return membershipData;
}

function getDevelopmentData() {
	const userData = MemberAPI.get();

	const developmentData = {
		applicants: userData.filter((member) => member.identity_type === '入党申请人').length,
		activists: userData.filter((member) => member.identity_type === '入党积极分子').length,
		candidates: userData.filter((member) => member.identity_type === '发展对象').length,

		byStage: {
			'入党申请人': userData.filter((member) => member.identity_type === '入党申请人').length,
			'入党积极分子': userData.filter((member) => member.identity_type === '入党积极分子').length,
			'发展对象': userData.filter((member) => member.identity_type === '发展对象').length,
			'预备党员': userData.filter((member) => member.identity_type === '预备党员').length,
			'正式党员': userData.filter((member) => member.identity_type === '正式党员').length,
		}
	}

	return developmentData;
}

function getActivitiesData() {
	const activities_data = ActivitiesAPI.get();

	const activityData = {
		meetingsCount: activities_data.filter((activity) => activity.type === '会议').length,
		meetingsAttendance: 87,
		educationCount: activities_data.filter((activity) => activity.type === '学习教育活动').length,
		educationAttendance: 92,

		byMonth: activities_data.reduce(
			(acc: Record<string, { meetings: number; education: number }>, activity, idx, arr) => {
				const month = activity.startTime.getMonth() + 1; // 1 - 12
				const key = `${month}月`;

				if (!acc[key]) {
					acc[key] = { meetings: 0, education: 0 };
				}

				if (activity.type === '会议') {
					acc[key].meetings += 1;
				} else if (activity.type === '学习教育活动') {
					acc[key].education += 1;
				}

				return acc;
			}, {}),
	}

	return activityData;
}

const membershipData = getStatisticsData();
const activityData = getActivitiesData();
const developmentData = getDevelopmentData();

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
