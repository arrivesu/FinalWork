/**
 * @file userDocument.ts
 * @description
 * @author rainbowx
 * @date 2025/5/15
 */

export const userDocumentData: UserDocumentType[] = [
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
        type: "入党申请书",
        submit_time: new Date(2025,4,26),
        content: ""
    }

]
