"use client"

import {useState} from "react"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {FileTextIcon, PlusIcon, SearchIcon, SendIcon} from "lucide-react"
import {useToast} from "@/hooks/use-toast"

export default function PartyReportsPage() {
	const {toast} = useToast()
	const [searchTerm, setSearchTerm] = useState("")
	const [reportTitle, setReportTitle] = useState("")
	const [reportContent, setReportContent] = useState("")
	const [reportType, setReportType] = useState("thought")

	// 模拟思想汇报和工作汇报数据
	const reports = [
		{
			id: "report-001",
			title: "学习党的二十大精神思想汇报",
			type: "思想汇报",
			submitDate: "2025-03-15",
			status: "已审阅",
			feedback: "汇报内容充实，思想认识深刻，继续保持。",
			content: "通过学习党的二十大精神，我深刻认识到...",
		},
		{
			id: "report-002",
			title: "2024年第四季度工作汇报",
			type: "工作汇报",
			submitDate: "2024-12-20",
			status: "已审阅",
			feedback: "工作成绩显著，存在的问题分析到位，改进措施具体可行。",
			content: "本季度我主要完成了以下工作...",
		},
		{
			id: "report-003",
			title: "学习习近平新时代中国特色社会主义思想心得体会",
			type: "思想汇报",
			submitDate: "2024-10-10",
			status: "已审阅",
			feedback: "理论联系实际，有自己的思考和体会，很好。",
			content: "通过深入学习习近平新时代中国特色社会主义思想，我认识到...",
		},
		{
			id: "report-004",
			title: "2024年第三季度工作汇报",
			type: "工作汇报",
			submitDate: "2024-09-25",
			status: "已审阅",
			feedback: "工作总结全面，成绩突出，继续努力。",
			content: "本季度我主要负责了以下项目...",
		},
	]

	// 过滤汇报记录
	const filteredReports = reports.filter(
		(report) =>
			report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			report.type.toLowerCase().includes(searchTerm.toLowerCase()),
	)

	const handleSubmitReport = () => {
		if (!reportTitle || !reportContent) {
			toast({
				variant: "destructive",
				title: "提交失败",
				description: "请填写完整的汇报信息",
			})
			return
		}

		toast({
			title: "提交成功",
			description: "您的汇报已成功提交，请等待审阅",
		})

		// 重置表单
		setReportTitle("")
		setReportContent("")
	}

	return (
		<div className="container mx-auto py-6 space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">思想汇报与工作汇报</h1>
				<p className="text-muted-foreground">提交和查看您的思想汇报与工作汇报</p>
			</div>

			<Tabs defaultValue="submit" className="w-full">
				<TabsList className="grid w-full max-w-md grid-cols-2">
					<TabsTrigger value="submit">提交汇报</TabsTrigger>
					<TabsTrigger value="history">历史汇报</TabsTrigger>
				</TabsList>

				<TabsContent value="submit" className="space-y-4 mt-6">
					<Card>
						<CardHeader>
							<CardTitle>提交新汇报</CardTitle>
							<CardDescription>请填写您的思想汇报或工作汇报内容</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="report-type">汇报类型</Label>
								<Select value={reportType} onValueChange={setReportType}>
									<SelectTrigger id="report-type">
										<SelectValue placeholder="选择汇报类型"/>
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="thought">思想汇报</SelectItem>
										<SelectItem value="work">工作汇报</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<Label htmlFor="report-title">汇报标题</Label>
								<Input
									id="report-title"
									placeholder="请输入汇报标题"
									value={reportTitle}
									onChange={(e) => setReportTitle(e.target.value)}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="report-content">汇报内容</Label>
								<Textarea
									id="report-content"
									placeholder="请输入汇报内容"
									className="min-h-[200px]"
									value={reportContent}
									onChange={(e) => setReportContent(e.target.value)}
								/>
							</div>

							<div className="space-y-2">
								<Label>附件</Label>
								<div className="flex items-center justify-center border border-dashed rounded-md h-32">
									<div className="text-center">
										<PlusIcon className="mx-auto h-6 w-6 text-muted-foreground"/>
										<p className="mt-2 text-sm text-muted-foreground">点击或拖拽文件到此处上传</p>
										<p className="text-xs text-muted-foreground">支持 PDF, Word, JPG 格式</p>
									</div>
								</div>
							</div>
						</CardContent>
						<CardFooter>
							<Button onClick={handleSubmitReport} className="ml-auto">
								<SendIcon className="mr-2 h-4 w-4"/>
								提交汇报
							</Button>
						</CardFooter>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>汇报指南</CardTitle>
							<CardDescription>思想汇报与工作汇报的撰写指南</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<h3 className="font-medium">思想汇报撰写要点</h3>
								<ul className="list-disc list-inside space-y-1 text-sm">
									<li>紧密结合当前政治形势和重要会议精神</li>
									<li>联系个人思想实际，反映真实思想变化</li>
									<li>突出理论学习与实践相结合</li>
									<li>字数建议在1500字以上</li>
								</ul>
							</div>

							<div className="space-y-2">
								<h3 className="font-medium">工作汇报撰写要点</h3>
								<ul className="list-disc list-inside space-y-1 text-sm">
									<li>客观总结工作成绩和存在问题</li>
									<li>分析问题原因，提出改进措施</li>
									<li>结合党员身份，体现先锋模范作用</li>
									<li>字数建议在1000字以上</li>
								</ul>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="history" className="space-y-4 mt-6">
					<div className="relative">
						<SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
						<Input
							type="search"
							placeholder="搜索汇报标题或类型..."
							className="pl-8"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>

					{filteredReports.length === 0 ? (
						<Card>
							<CardContent
								className="pt-6 text-center text-muted-foreground">未找到符合条件的汇报记录</CardContent>
						</Card>
					) : (
						filteredReports.map((report) => (
							<Card key={report.id}>
								<CardHeader className="pb-2">
									<div className="flex justify-between items-center">
										<CardTitle className="text-lg">{report.title}</CardTitle>
										<Badge variant="outline">{report.status}</Badge>
									</div>
									<CardDescription className="flex items-center gap-2">
										<span>{report.type}</span>
										<span>•</span>
										<span>提交日期：{report.submitDate}</span>
									</CardDescription>
								</CardHeader>
								<CardContent className="pb-2">
									<div className="space-y-2">
										<div>
											<p className="text-sm text-muted-foreground">汇报内容摘要</p>
											<p className="text-sm line-clamp-2">{report.content}</p>
										</div>
										{report.feedback && (
											<div>
												<p className="text-sm text-muted-foreground">审阅反馈</p>
												<p className="text-sm bg-muted p-2 rounded-md">{report.feedback}</p>
											</div>
										)}
									</div>
								</CardContent>
								<CardFooter>
									<Button variant="outline" size="sm">
										<FileTextIcon className="mr-2 h-4 w-4"/>
										查看完整内容
									</Button>
								</CardFooter>
							</Card>
						))
					)}
				</TabsContent>
			</Tabs>
		</div>
	)
}
