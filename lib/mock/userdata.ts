/**
 * @file data.ts
 * @description
 * @author rainbowx
 * @date 2025/5/12
 */

export const userData: UserDataType[] = [
    {
        id: 1,
        user: {
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
        record_time: "2024-2025-2",
        moral_rank: 0.15,
        academic_rank: 0.14,
        assessment_score: 85,
        dorm_score: 0.06,
        behavior_score: 0,
        volunteering_time: 45,
        public_opinion_score: 4.30
    }

]
