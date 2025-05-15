/**
 * @file notice.ts
 * @description
 * @author rainbowx
 * @date 2025/5/12
 */

export const noticeData: NoticeType[] = [
    {
        id: 1,
        title: "关于开展中央八项规定精神学习教育的通知",
        content: "根据上级党组织要求，我支部将于2025年05月19日在sl412开展党课学习教育，请全体党员做好准备。",
        publish_date: new Date(2025,4,10),
        publisher: {
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
        }
    },
    {
        id: 2,
        title: "关于开展数据学生党支部党日活动的通知",
        content: "我支部将于2025年05月02日赴宁波大学开展主题党日活动，请全体党员做好准备。",
        publish_date: new Date(2025,4,21),
        publisher: {
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
        }
    },
    {
        id: 3,
        title: "关于开展2025年第二次支部党员大会的通知",
        content: "根据上级党组织要求，我支部将于2025年04月24日开展支部党员大会，请全体党员做好准备。",
        publish_date: new Date(2025,3,15),
        publisher: {
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
        }
    }

]
