/**
 * @file transfer.ts
 * @description
 * @author rainbowx
 * @date 2025/5/13
 */

export const transferData: TransferDataType[] = [
    {
        id: 1,
        user: {
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
        targetOrganization: {
            id: 2,
            name: "宁波大学计算机学院学生党支部",
            superior_org: ""
        },
        reason: "考研升学",
        applyDate: new Date(2025,3,15),
        status: "approved"
    },
    {
        id: 2,
        user: {
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
        targetOrganization: {   
            id: 3,
            name: "杭州爱声科技有限公司党支部",
            superior_org: ""
        },
        reason: "工作就业",
        applyDate: new Date(2025,3,18),
        status: "pending"
    }

]
