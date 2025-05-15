/**
 * @file type.d.ts
 * @description
 * @author rainbowx
 * @date 2025/5/12
 */

type RoleType = 'admin' | 'member'

interface BranchType {
	id: number,									// 党支部id
	name: string,								// 党支部名
	superior_org: string						// 上级组织
}

interface MemberType {
	id: number,									// 用户id
	is_deleted: boolean,						// 是否被逻辑删除(如转出)
	is_init_password: boolean,					// 是否是初始密码
	username: string,							// 用户名
	avatar: string,								// 用户头像
	name: string,								// 名字
	gender: '男' | '女',							// 性别
	ethnicity: string,							// 民族
	birth_date: Date,							// 生日
	student_number: string,						// 学号
	class_name: string,							// 班级
	join_date: Date,							// 入党时间
	party_position: string| null,				// 党内职位(如支部书记等)
	identity_type: '已毕业党员' | '正式党员' | '预备党员' | '入党申请人' | '入党积极分子' | '发展对象',		// 党员类别
	phone: string,								// 电话号码
	profile_file: string,						// 电子档案地址
	branch: BranchType,							// 所属党支部
	role: [RoleType, ...RoleType[]]
}

interface ActivityType {
	id: number,									// 活动id
	title: string,								// 活动名
	type: '支部党员大会' | '支部委员会' | '党小组会' | '党课' | '党日活动' | '其他',					// 活动类型
	startTime: Date,							// 活动开始时间
	endTime: Date,								// 活动结束时间
	location: string,							// 活动地点
	content: string,							// 活动内容
	remark: string,								// 活动备注
	branch: BranchType							// 负责活动的支部
}

interface ActivityJoinType {
	id: number									// 参加的id
	activity: ActivityType,						// 参加的活动
	member: MemberType,							// 参加的成员
	status: '正常参会' | '请假' | '迟到' | '旷会'	// 参加状态
}

interface EventType {
	id: number									// 事件id
	user: MemberType							// 事件所属用户
	time: Date									// 事件时间
	module: string | null						// 触发事件的模块
	status: 'success' | 'reject'				// 事件的状态
	ip: string									// 触发事件的设备ip
	target: string | null						// 事件作用对象,可能为空
	content: string								// 事件内容
}

interface MaterialType {
	id: number,									// 学习资料id
	title: string								// 资料名
	type: 'document' | 'video'					// 资料形式
	category: '理论学习' | '党史学习' | '党章学习'	// 资料分类
	content: string,							// 资料内容
	upload_date: Date,							// 上传时间
	branch: BranchType,							// 资料所属支部
}

interface NoticeType {
	id: number,									// 公告id
	title: string,								// 公告标题
	content: string,							// 公告内容
	publish_date: Date,							// 公告发出时间
	publisher: MemberType						// 公告发起者
}

interface UserDataType {
	id: number,									// 用户数据id
	user: MemberType,							// 数据所属用户
	record_time: string,						// 数据产生时间
	moral_rank: number,							// 德育排名百分比
	academic_rank: number,						// 学业排名百分比
	assessment_score: number,					// 考核得分
	dorm_score: number,							// 寝室卫生得分
	behavior_score: number,						// 行为纪实得分
	volunteering_time: number,					// 志愿服务时长 / 最大15
	public_opinion_score: number,				// 群众调研得分
}

interface TransferDataType {
	id: number,									// 转接id
	user: MemberType,							// 转接的用户
	targetOrganization: BranchType,				// 转接目标党支部
	reason: string,								// 转接理由
	applyDate: Date,							// 转接申请时间
	status: 'pending' | 'approved' | 'rejected',// 转接状态
}

interface UserDocumentType {
	id: number,									// 文档id
	user: MemberType,							// 文档的用户
	type: string,								// 文档类型
	submit_time: Date,							// 文档上传时间
	content: string								// 文档内容
}
