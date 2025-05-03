"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"



export default function LoginPage() {
  const [captcha, setCaptcha] = useState('')
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // 模拟登录验证
      // 实际项目中应该调用API进行验证
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (username && password) {
        // 假设用户名包含admin的是管理员，其他是普通党员
        // 所有用户默认都有member角色
        const roles = ["member"]

        // 如果用户名包含admin，添加admin角色
        if (username.toLowerCase().includes("admin")) {
          roles.push("admin")
        }

        localStorage.setItem(
          "user",
          JSON.stringify({
            id: "1",
            name: username,
            role: roles, // 现在是数组
            avatar: "/placeholder.svg?key=toqw7",
          }),
        )

        // 所有用户默认进入党员界面
        router.push("/member/workbench")

        toast({
          title: "登录成功",
          description: `欢迎回来！${roles.includes("admin") ? "您拥有管理员权限" : ""}`,
        })
      } else {
        toast({
          variant: "destructive",
          title: "登录失败",
          description: "用户名或密码不能为空",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "登录失败",
        description: "请检查您的用户名和密码",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-muted/40">
      <Card className="w-full max-w-md bg-red-50">
        <CardHeader className="space-y-1">
          {/* 居中的党徽 */}
          <div className="flex justify-center">  {/* 新增flex容器实现居中 */}
            <Image
              src="https://p3.img.cctvpic.com/photoworkspace/contentimg/2021/07/09/2021070916100758523.png"
              alt="中国共产党党徽"
              width={80}
              height={80}
              className="mb-4"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-red-600 text-center">支部党建管理系统</CardTitle>
          <CardDescription className="text-center">请输入您的账号和密码登录系统</CardDescription>
        </CardHeader>
        
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            {/* 账号输入 */}
            <div className="space-y-2">
              <Label htmlFor="username">账号</Label>
              <Input
                id="username"
                placeholder="请输入账号"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
  
            {/* 密码输入 */}
            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                type="password"
                placeholder="请输入密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>getItem
           
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-red-600 hover:bg-red-500 transition-colors" 
              disabled={isLoading}
            >
              {isLoading ? "登录中..." : "登录"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
//   return (
//     <div className="flex h-screen w-full items-center justify-center bg-muted/40">
//       <Card className="w-full max-w-md bg-red-50">

//         <CardHeader className="space-y-1 text-center">
//           {/* 党徽图标 */}
//           <div className="flex-shrink-0">
//             <Image
//               src="https://p3.img.cctvpic.com/photoworkspace/contentimg/2021/07/09/2021070916100758523.png"
//               alt="中国共产党党徽"
//               width={60}
//               height={60}
//             />
//           </div>
//           <CardTitle className="text-2xl font-bold text-red-600">支部党建管理系统</CardTitle>
//           <CardDescription>请输入您的账号和密码登录系统</CardDescription>
//         </CardHeader>
//         <form onSubmit={handleLogin}>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="username">账号</Label>
//               <Input
//                 id="username"
//                 placeholder="请输入账号"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <Label htmlFor="password">密码</Label>
//               </div>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="请输入密码"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             {/* 移除了管理员登录选项 */}
//           </CardContent>
//           <CardFooter>
//             <Button type="submit" className="w-full bg-red-600 hover:bg-red-400" disabled={isLoading}>
//               {isLoading ? "登录中..." : "登录"}
//             </Button>
//           </CardFooter>
//         </form>
//       </Card>
//     </div>
//   )
// }
