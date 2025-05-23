import type React from "react"
import type {Metadata} from "next"
import {Inter} from "next/font/google"
import "./globals.css"
import {ThemeProvider} from "@/components/theme-provider"
import { AuthProvider } from "@/hooks/use-auth"

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
	title: "党员管理系统",
	description: "党员管理系统 - 高效管理党员信息与活动",
	generator: 'v0.dev'
}

export default function RootLayout({
									   children,
								   }: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="zh-CN" suppressHydrationWarning>
		<body className={inter.className}>
		<ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
			<AuthProvider>{children}</AuthProvider>
		</ThemeProvider>
		</body>
		</html>
	)
}
