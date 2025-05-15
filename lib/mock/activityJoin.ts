/**
 * @file activityJoin.ts
 * @description
 * @author rainbowx
 * @date 2025/5/12
 */

export const activityJoinData: ActivityJoinType[] = [
    {
        activity: {
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
        member: {
            id: 2,
            is_deleted: false,
            is_init_password: false,
            username: "xuruoxuan",
            avatar: "",
            name: "徐若瑄",
            gender: "女",
            ethnicity: "汉族",
            birth_date: new Date(2002,11,3),
            student_number: "3210439004",
            class_name: "大数据211班",
            join_date: new Date(2023,5,2),
            party_position: "组织委员",
            identity_type: "正式党员",
            phone: "13901234567",
            profile_file: "",
            branch: {
                id: 1,
                name: "数据学生党支部",
                superior_org: "数据学院党委"
            },
            role: ['member']
        },
        status: "正常参会"
    }

]
