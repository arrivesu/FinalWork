"use client"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface MainNavProps {
  className?: string
}

export function MainNav({ className }: MainNavProps) {
  const pathname = usePathname()

  return (
    <div className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {/* 移除了顶部导航栏的内容，因为已经移到侧边栏 */}
    </div>
  )
}
