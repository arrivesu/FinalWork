/**
 * @file member.ts
 * @description 
 * @author rainbowx
 * @date 2025/5/12
 */

export const memberData: MemberType[] = [
    {
        id: 1,
        is_deleted: false,
        is_init_password: false,
        username: "admin",
        avatar: "",
        name: "陆晨",
        gender: "男",
        ethnicity: "汉族",
        birth_date: new Date(1993,7,9),
        student_number: "0000000001",
        class_name: "数据学院辅导员",
        join_date: new Date(2015,8,10),
        party_position: "党支部书记",
        identity_type: "已毕业党员",
        phone: "13712345678",
        profile_file: "",
        branch: {
            id: 1,
            name: "数据学生党支部",
            superior_org: "数据学院党委"
        },
        role: ['admin']
    },
    {
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
    {
        id: 3,
        is_deleted: false,
        is_init_password: false,
        username: "huangjunjie",
        avatar: "",
        name: "黄俊杰",
        gender: "男",
        ethnicity: "汉族",
        birth_date: new Date(2003,4,19),
        student_number: "3210439015",
        class_name: "大数据211班",
        join_date: new Date(2023,5,2),
        party_position: "纪检委员",
        identity_type: "正式党员",
        phone: "13654321987",
        profile_file: "",
        branch: {
            id: 1,
            name: "数据学生党支部",
            superior_org: "数据学院党委"
        },
        role: ['member']
    },
    {
        id: 4,
        is_deleted: false,
        is_init_password: false,
        username: "huangjunjie",
        avatar: "",
        name: "林诗涵",
        gender: "女",
        ethnicity: "汉族",
        birth_date: new Date(2002,9,8),
        student_number: "3210439037",
        class_name: "大数据211班",
        join_date: new Date(2023,11,3),
        party_position: null,
        identity_type: "正式党员",
        phone: "15012345678",
        profile_file: "",
        branch: {
            id: 1,
            name: "数据学生党支部",
            superior_org: "数据学院党委"
        },
        role: ['member']
    },
    {
        id: 5,
        is_deleted: false,
        is_init_password: false,
        username: "zhenghaoxuan",
        avatar: "",
        name: "郑浩轩",
        gender: "男",
        ethnicity: "汉族",
        birth_date: new Date(2003,2,25),
        student_number: "3210439012",
        class_name: "大数据212班",
        join_date: new Date(2023,7,30),
        party_position: null,
        identity_type: "正式党员",
        phone: "13876543210",
        profile_file: "",
        branch: {
            id: 1,
            name: "数据学生党支部",
            superior_org: "数据学院党委"
        },
        role: ['member']
    },
    {
        id: 6,
        is_deleted: false,
        is_init_password: false,
        username: "suiyutong",
        avatar: "",
        name: "孙雨桐",
        gender: "女",
        ethnicity: "汉族",
        birth_date: new Date(2003,0,14),
        student_number: "3210439013",
        class_name: "大数据211班",
        join_date: new Date(2024,5,12),
        party_position: null,
        identity_type: "预备党员",
        phone: "13876543210",
        profile_file: "",
        branch: {
            id: 1,
            name: "数据学生党支部",
            superior_org: "数据学院党委"
        },
        role: ['member']
    },
    {
        id: 7,
        is_deleted: false,
        is_init_password: false,
        username: "limingyi",
        avatar: "",
        name: "李明壹",
        gender: "男",
        ethnicity: "汉族",
        birth_date: new Date(2001,2,14),
        student_number: "3190439001",
        class_name: "大数据191班",
        join_date: new Date(2021,5,10),
        party_position: null,
        identity_type: "已毕业党员",
        phone: "13936008951",
        profile_file: "",
        branch: {
            id: 1,
            name: "数据学生党支部",
            superior_org: "数据学院党委"
        },
        role: ['member']
    },
    {
        id: 8,
        is_deleted: false,
        is_init_password: false,
        username: "chenqingyan",
        avatar: "",
        name: "陆清妍",
        gender: "女",
        ethnicity: "汉族",
        birth_date: new Date(2003,5,14),
        student_number: "3210439034",
        class_name: "大数据211班",
        join_date: new Date(2022,9,14),
        party_position: null,
        identity_type: "入党积极分子",
        phone: "15900112231",
        profile_file: "",
        branch: {
            id: 1,
            name: "数据学生党支部",
            superior_org: "数据学院党委"
        },
        role: ['member']
    },
    {
        id: 9,
        is_deleted: false,
        is_init_password: false,
        username: "liuchendu",
        avatar: "",
        name: "刘晨渡",
        gender: "男",
        ethnicity: "回族",
        birth_date: new Date(2002,2,14),
        student_number: "3210439023",
        class_name: "大数据211班",
        join_date: new Date(2021,8,15),
        party_position: null,
        identity_type: "入党申请人",
        phone: "13905743892",
        profile_file: "",
        branch: {
            id: 1,
            name: "数据学生党支部",
            superior_org: "数据学院党委"
        },
        role: ['member']
    },
    {
        id: 10,
        is_deleted: false,
        is_init_password: true,
        username: "wangjunji",
        avatar: "",
        name: "王俊吉",
        gender: "男",
        ethnicity: "汉族",
        birth_date: new Date(2003,2,11),
        student_number: "3210439053",
        class_name: "大数据212班",
        join_date: new Date(2023,5,15),
        party_position: null,
        identity_type: "发展对象",
        phone: "13803138255",
        profile_file: "",
        branch: {
            id: 1,
            name: "数据学生党支部",
            superior_org: "数据学院党委"
        },
        role: ['member']
    }

]
