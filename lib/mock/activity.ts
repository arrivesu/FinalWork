/**
 * @file activity.ts
 * @description
 * @author rainbowx
 * @date 2025/5/12
 */

export const activitiesData: ActivityType[] = [
    {
        id: 1,
        title: "中央八项规定精神学习教育",
        type: "党课",
        startTime: new Date(2025,3,5,9),
        endTime: new Date(2025,3,5,11),
        location: "石麟大楼412会议室",
        content: "组织党员学习中央八项规定精神。",
        remark: "请提前10分钟到会。",
        branch: {
            id: 1,
            name: "数据学生党支部",
            superior_org: "数据学院党委"
        }
    },
    {
        id: 2,
        title: "初心之旅党日活动",
        type: "党日活动",
        startTime: new Date(2025,2,16,14),
        endTime: new Date(2025,2,16,17),
        location: "宁波大学校区",
        content: "组织党员赴宁波大学开展“初心之旅”主题党日活动。",
        remark: "请提前10分钟到校门口集合。",
        branch: {
            id: 1,
            name: "数据学生党支部",
            superior_org: "数据学院党委"
        }
    },
    {
        id: 3,
        title: "2025年第一次支部党员大会",
        type: "支部党员大会",
        startTime: new Date(2025,0,15,14),
        endTime: new Date(2025,0,15,16),
        location: "石麟大楼412会议室",
        content: "开展支部党员大会，进行批评与自我批评，激励党员发挥先锋模范作用。",
        remark: "请提前10分钟到会。",
        branch: {
            id: 1,
            name: "数据学生党支部",
            superior_org: "数据学院党委"
        }
    },
    {
        id: 4,
        title: "学习贯彻党的二十大精神",
        type: "党课",
        startTime: new Date(2025,0,3,9),
        endTime: new Date(2025,0,3,11),
        location: "线上",
        content: "组织党员学习贯彻党的二十大精神，深入理解党的二十大报告内容。",
        remark: "请提前10分钟到会。",
        branch: {
            id: 1,
            name: "数据学生党支部",
            superior_org: "数据学院党委"
        }
    }

]
