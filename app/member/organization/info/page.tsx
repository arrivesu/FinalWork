"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"

export default function OrganizationInfo() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">党组织信息</h1>
				<p className="text-muted-foreground">查看您所在党组织的基本信息</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>计算机科学与技术学院第一党支部</CardTitle>
					<CardDescription>成立于2010年3月15日</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="flex flex-col md:flex-row gap-6">
						<div className="md:w-1/3 space-y-4">
							<div className="space-y-2">
								<h3 className="font-medium">党支部书记</h3>
								<div className="flex items-center space-x-4">
									<Avatar>
										<AvatarImage src="/placeholder.svg?key=bmb4k" alt="张教授"/>
										<AvatarFallback>张</AvatarFallback>
									</Avatar>
									<div>
										<p className="text-sm font-medium">张教授</p>
										<p className="text-xs text-muted-foreground">计算机科学与技术学院</p>
									</div>
								</div>
							</div>
							<div className="space-y-2">
								<h3 className="font-medium">上级组织</h3>
								<p className="text-sm">计算机科学与技术学院党委</p>
							</div>
						</div>
						<div className="md:w-2/3 space-y-4">
							<div className="space-y-2">
								<h3 className="font-medium">党支部简介</h3>
								<p className="text-sm">
									计算机科学与技术学院第一党支部成立于2010年3月15日，现有党员42人，其中教师党员10人，学生党员32人。
									支部以"创新引领、服务师生"为宗旨，积极开展各类党建活动，推动学院教学科研工作发展。
									近年来，支部获得了"优秀党支部"、"先进基层党组织"等荣誉称号。
								</p>
							</div>
							<div className="space-y-2">
								<h3 className="font-medium">党支部职责</h3>
								<ul className="list-disc list-inside text-sm space-y-1">
									<li>宣传、执行党的路线方针政策和上级党组织的决议</li>
									<li>团结、组织党员和群众，完成党支部所在单位的各项任务</li>
									<li>对党员进行教育、管理、监督和服务</li>
									<li>组织党员开展批评和自我批评，维护和执行党的纪律</li>
									<li>密切联系群众，经常了解群众的思想、工作和生活情况</li>
									<li>培养和推荐入党积极分子，做好发展党员工作</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="space-y-2">
						<h3 className="font-medium">党支部委员会成员</h3>
						<div className="grid gap-4 md:grid-cols-3">
							<div className="flex items-center space-x-4">
								<Avatar>
									<AvatarImage src="/placeholder.svg?key=aqztm" alt="张教授"/>
									<AvatarFallback>张</AvatarFallback>
								</Avatar>
								<div>
									<p className="text-sm font-medium">张教授</p>
									<p className="text-xs text-muted-foreground">党支部书记</p>
								</div>
							</div>
							<div className="flex items-center space-x-4">
								<Avatar>
									<AvatarImage src="/placeholder.svg?key=6pbxl" alt="李老师"/>
									<AvatarFallback>李</AvatarFallback>
								</Avatar>
								<div>
									<p className="text-sm font-medium">李老师</p>
									<p className="text-xs text-muted-foreground">组织委员</p>
								</div>
							</div>
							<div className="flex items-center space-x-4">
								<Avatar>
									<AvatarImage src="/placeholder.svg?key=dbrdy" alt="王老师"/>
									<AvatarFallback>王</AvatarFallback>
								</Avatar>
								<div>
									<p className="text-sm font-medium">王老师</p>
									<p className="text-xs text-muted-foreground">宣传委员</p>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
