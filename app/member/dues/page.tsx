"use client"

import {useState} from "react"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {CreditCardIcon, DownloadIcon, FileTextIcon, SearchIcon} from "lucide-react"
import {useToast} from "@/hooks/use-toast"

export default function PartyDuesPage() {
	const {toast} = useToast()
	const [searchTerm, setSearchTerm] = useState("")
	const [paymentMethod, setPaymentMethod] = useState("alipay")
	const [paymentAmount, setPaymentAmount] = useState("30")

	// 模拟党费缴纳记录
	const duesRecords = [
		{
			id: "dues-001",
			period: "2025年第一季度",
			amount: "90",
			paymentDate: "2025-03-15",
			paymentMethod: "支付宝",
			status: "已缴纳",
			receipt: "202503150001",
		},
		{
			id: "dues-002",
			period: "2024年第四季度",
			amount: "90",
			paymentDate: "2024-12-10",
			paymentMethod: "微信支付",
			status: "已缴纳",
			receipt: "202412100023",
		},
		{
			id: "dues-003",
			period: "2024年第三季度",
			amount: "90",
			paymentDate: "2024-09-12",
			paymentMethod: "银行转账",
			status: "已缴纳",
			receipt: "202409120015",
		},
		{
			id: "dues-004",
			period: "2024年第二季度",
			amount: "90",
			paymentDate: "2024-06-15",
			paymentMethod: "支付宝",
			status: "已缴纳",
			receipt: "202406150042",
		},
	]

	// 模拟待缴纳党费
	const pendingDues = [
		{
			id: "pending-001",
			period: "2025年第二季度",
			amount: "90",
			dueDate: "2025-06-30",
			status: "待缴纳",
		},
	]

	// 过滤记录
	const filteredRecords = duesRecords.filter(
		(record) =>
			record.period.toLowerCase().includes(searchTerm.toLowerCase()) ||
			record.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase()) ||
			record.receipt.toLowerCase().includes(searchTerm.toLowerCase()),
	)

	const handlePayment = () => {
		toast({
			title: "缴纳成功",
			description: `您已成功缴纳2025年第二季度党费${paymentAmount}元`,
		})
	}

	return (
		<div className="container mx-auto py-6 space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">党费缴纳</h1>
				<p className="text-muted-foreground">查看和管理您的党费缴纳记录</p>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>党费缴纳标准</CardTitle>
						<CardDescription>根据党员收入确定的党费缴纳标准</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<h3 className="font-medium">缴纳标准</h3>
							<ul className="list-disc list-inside space-y-1 text-sm">
								<li>每月工资收入(税后)在3000元以下(含3000元)者，每月交纳党费0.5%</li>
								<li>3000元以上至5000元(含5000元)者，每月交纳党费1%</li>
								<li>5000元以上至10000元(含10000元)者，每月交纳党费1.5%</li>
								<li>10000元以上者，每月交纳党费2%</li>
							</ul>
						</div>
						<div className="space-y-2">
							<h3 className="font-medium">您的缴纳标准</h3>
							<div className="p-4 bg-muted rounded-md">
								<p className="text-sm">
									根据您申报的月收入<span className="font-medium">6000元</span>，您的党费缴纳比例为
									<span className="font-medium">1.5%</span>
								</p>
								<p className="text-sm mt-2">
									每月应缴党费：<span className="font-medium">90元</span>
								</p>
								<p className="text-sm mt-2">
									每季度应缴党费：<span className="font-medium">270元</span>
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>缴纳党费</CardTitle>
						<CardDescription>您有1笔待缴纳的党费</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						{pendingDues.map((due) => (
							<div key={due.id} className="p-4 border rounded-md">
								<div className="flex justify-between items-center">
									<div>
										<h3 className="font-medium">{due.period}党费</h3>
										<p className="text-sm text-muted-foreground">截止日期：{due.dueDate}</p>
									</div>
									<Badge variant="secondary">{due.status}</Badge>
								</div>
								<div className="mt-4 space-y-4">
									<div className="space-y-2">
										<Label htmlFor="amount">缴纳金额</Label>
										<Input
											id="amount"
											value={paymentAmount}
											onChange={(e) => setPaymentAmount(e.target.value)}
											type="number"
										/>
										<p className="text-xs text-muted-foreground">标准金额：{due.amount}元</p>
									</div>
									<div className="space-y-2">
										<Label htmlFor="payment-method">缴纳方式</Label>
										<Select value={paymentMethod} onValueChange={setPaymentMethod}>
											<SelectTrigger id="payment-method">
												<SelectValue placeholder="选择缴纳方式"/>
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="alipay">支付宝</SelectItem>
												<SelectItem value="wechat">微信支付</SelectItem>
												<SelectItem value="bank">银行转账</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
							</div>
						))}
					</CardContent>
					<CardFooter>
						<Button onClick={handlePayment} className="w-full">
							<CreditCardIcon className="mr-2 h-4 w-4"/>
							立即缴纳
						</Button>
					</CardFooter>
				</Card>
			</div>

			<Tabs defaultValue="records" className="w-full">
				<TabsList className="grid w-full max-w-md grid-cols-2">
					<TabsTrigger value="records">缴纳记录</TabsTrigger>
					<TabsTrigger value="statistics">统计分析</TabsTrigger>
				</TabsList>

				<TabsContent value="records" className="space-y-4 mt-6">
					<div className="relative">
						<SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
						<Input
							type="search"
							placeholder="搜索缴纳记录..."
							className="pl-8"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>

					{filteredRecords.length === 0 ? (
						<Card>
							<CardContent
								className="pt-6 text-center text-muted-foreground">未找到符合条件的缴纳记录</CardContent>
						</Card>
					) : (
						filteredRecords.map((record) => (
							<Card key={record.id}>
								<CardHeader className="pb-2">
									<div className="flex justify-between items-center">
										<CardTitle className="text-lg">{record.period}党费</CardTitle>
										<Badge variant="outline">{record.status}</Badge>
									</div>
									<CardDescription>缴纳日期：{record.paymentDate}</CardDescription>
								</CardHeader>
								<CardContent className="pb-2">
									<div className="grid grid-cols-2 gap-4">
										<div>
											<p className="text-sm text-muted-foreground">缴纳金额</p>
											<p className="font-medium">{record.amount}元</p>
										</div>
										<div>
											<p className="text-sm text-muted-foreground">缴纳方式</p>
											<p className="font-medium">{record.paymentMethod}</p>
										</div>
										<div>
											<p className="text-sm text-muted-foreground">收据编号</p>
											<p className="font-medium">{record.receipt}</p>
										</div>
									</div>
								</CardContent>
								<CardFooter>
									<div className="flex space-x-2">
										<Button variant="outline" size="sm">
											<FileTextIcon className="mr-2 h-4 w-4"/>
											查看详情
										</Button>
										<Button variant="outline" size="sm">
											<DownloadIcon className="mr-2 h-4 w-4"/>
											下载收据
										</Button>
									</div>
								</CardFooter>
							</Card>
						))
					)}
				</TabsContent>

				<TabsContent value="statistics" className="mt-6">
					<Card>
						<CardHeader>
							<CardTitle>党费缴纳统计</CardTitle>
							<CardDescription>查看您的党费缴纳情况统计</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="grid gap-4 md:grid-cols-3">
								<div className="p-4 bg-muted rounded-md text-center">
									<p className="text-sm text-muted-foreground">本年度已缴纳</p>
									<p className="text-2xl font-bold mt-1">360元</p>
								</div>
								<div className="p-4 bg-muted rounded-md text-center">
									<p className="text-sm text-muted-foreground">累计已缴纳</p>
									<p className="text-2xl font-bold mt-1">1,080元</p>
								</div>
								<div className="p-4 bg-muted rounded-md text-center">
									<p className="text-sm text-muted-foreground">党龄</p>
									<p className="text-2xl font-bold mt-1">3年2个月</p>
								</div>
							</div>

							<div className="space-y-2">
								<h3 className="font-medium">缴纳趋势</h3>
								<div className="h-[200px] w-full bg-muted rounded-md flex items-center justify-center">
									<p className="text-muted-foreground">党费缴纳趋势图表</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}
