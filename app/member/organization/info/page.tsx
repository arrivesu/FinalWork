"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {useAuth} from "@/hooks/use-auth";
import {MemberAPI} from "@/lib/api";
import {undefined} from "zod";

export default function OrganizationInfo() {
	const { user } = useAuth();

	if(user === null) return null;

	const branch = user.branch;

	const branch_member_list = MemberAPI.data.filter((member) => member.branch.id === branch.id);

	let user1: MemberType;
	const user_power_list = branch_member_list.filter((user) => user.party_position === '党支部书记')
	if(user_power_list.length != 1) {
		user1 = MemberAPI.createEmpty()
	}
	else user1 = user_power_list[0];

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">党组织信息</h1>
				<p className="text-muted-foreground">查看您所在党组织的基本信息</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>数据学生党支部</CardTitle>
					<CardDescription>成立于2010年06月01日</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="flex flex-col md:flex-row gap-6">
						<div className="md:w-1/3 space-y-4">
							<div className="space-y-2">
								<h3 className="font-medium">党支部书记</h3>
								<div className="flex items-center space-x-4">
									<Avatar>
										<AvatarFallback> {user1.name.substring(user1.name.length-2)} </AvatarFallback>
									</Avatar>
									<div>
										<p className="text-sm font-medium">{user1.name}</p>
										<p className="text-xs text-muted-foreground">{user1.branch.name}</p>
									</div>
								</div>
							</div>
							<div className="space-y-2">
								<h3 className="font-medium">上级组织</h3>
								<p className="text-sm">数据学院党委</p>
							</div>
						</div>
						<div className="md:w-2/3 space-y-4">
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
							{
								branch_member_list
									.filter((user) => (user.party_position !== null))
									.map((user) => (<>
										<div className="flex items-center space-x-4">
											<Avatar>
												<AvatarFallback> {user.name.substring(user.name.length-2)} </AvatarFallback>
											</Avatar>
											<div>
												<p className="text-sm font-medium">{user.name}</p>
												<p className="text-xs text-muted-foreground">{user.party_position}</p>
											</div>
										</div>
									</>))
							}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
