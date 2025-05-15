"use client"

import type React from "react"
import {useEffect, useRef, useState} from "react"
import {useRouter} from "next/navigation"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {useToast} from "@/hooks/use-toast"
import Image from "next/image"
import {useAuth} from "@/hooks/use-auth";

export default function LoginPage() {
	const [captcha, setCaptcha] = useState("")
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [captchaText, setCaptchaText] = useState("")
	const captchaCanvasRef = useRef<HTMLCanvasElement>(null)
	const router = useRouter()
	const {toast} = useToast()
	const auth = useAuth();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)

		if (captcha.toLowerCase() !== captchaText.toLowerCase()) {
			toast({
				variant: "destructive",
				title: "验证失败",
				description: "验证码输入错误，请重新输入",
			})
			generateCaptcha() // Refresh captcha after failed attempt
			setCaptcha("") // Clear captcha input
			setIsLoading(false)
			return
		}

		try {
			await auth.login(username, password);
			router.push("/member/workbench")
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

	const generateCaptcha = () => {
		const canvas = captchaCanvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext("2d")
		if (!ctx) return

		// Clear canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height)

		// Set background
		ctx.fillStyle = "#f0f0f0"
		ctx.fillRect(0, 0, canvas.width, canvas.height)

		// Generate random captcha text (4-6 characters)
		const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789"
		let captcha = ""
		const length = 4		// 验证码长度

		for (let i = 0; i < length; i++) {
			captcha += chars.charAt(Math.floor(Math.random() * chars.length))
		}

		setCaptchaText(captcha)

		// Draw captcha text
		ctx.font = "bold 24px sans-serif"
		ctx.textBaseline = "middle"

		// Draw each character with random rotation and position
		for (let i = 0; i < captcha.length; i++) {
			const x = 10 + i * 20
			const y = canvas.height / 2 + Math.random() * 8 - 4
			const angle = Math.random() * 0.4 - 0.2

			// Random color
			ctx.fillStyle = `rgb(${Math.floor(Math.random() * 80)}, 
                          ${Math.floor(Math.random() * 80)}, 
                          ${Math.floor(Math.random() * 80)})`

			ctx.save()
			ctx.translate(x, y)
			ctx.rotate(angle)
			ctx.fillText(captcha[i], 0, 0)
			ctx.restore()
		}

		// Add noise (lines)
		for (let i = 0; i < 5; i++) {
			ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`
			ctx.beginPath()
			ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height)
			ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height)
			ctx.stroke()
		}

		// Add noise (dots)
		for (let i = 0; i < 30; i++) {
			ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`
			ctx.beginPath()
			ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, Math.PI * 2)
			ctx.fill()
		}
	}

	useEffect(() => {
		generateCaptcha()
	}, [])

	return (
		<div className="flex h-screen w-full items-center justify-center bg-muted/40 relative overflow-hidden">
			{/* Background skyline image at the bottom */}
			<div className="absolute bottom-0 left-0 w-full">
				<Image
					src="/images/china-skyline.png"
					alt="中国城市天际线"
					width={1920}
					height={200}
					className="w-full h-auto"
					priority
				/>
			</div>

			<Card className="w-full max-w-md bg-red-50 relative z-10 mb-10">
				<CardHeader className="space-y-1">
					{/* 居中的党徽 */}
					<div className="flex justify-center">
						{" "}
						{/* 新增flex容器实现居中 */}
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

						{/* 新增验证码输入 */}
						<div className="space-y-2">
							<div className="flex justify-between items-center">
								<Label htmlFor="captcha">验证码</Label>
								{/* 可在此处添加刷新验证码按钮 */}
							</div>
							<div className="flex gap-2">
								<Input
									id="captcha"
									placeholder="请输入验证码"
									className="flex-1"
									value={captcha}
									onChange={(e) => setCaptcha(e.target.value)}
									required
								/>
								<div className="h-10 w-24 cursor-pointer" onClick={generateCaptcha}
									 title="点击刷新验证码">
									<canvas ref={captchaCanvasRef} width={96} height={40}
											className="border border-gray-200 rounded-md"/>
								</div>
							</div>
						</div>
					</CardContent>

					<CardFooter>
						<Button type="submit" className="w-full bg-red-600 hover:bg-red-500 transition-colors"
								disabled={isLoading}>
							{isLoading ? "登录中..." : "登录"}
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	)
}
