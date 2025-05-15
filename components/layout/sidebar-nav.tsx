"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { LucideIcon } from "lucide-react"
import Image from "next/image"

interface NavItem {
  title: string
  href: string
  icon?: LucideIcon
  submenu?: NavItem[]
  disabled?: boolean
}

interface SidebarNavProps {
  items: NavItem[]
  className?: string
}

export function SidebarNav({ items, className }: SidebarNavProps) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="flex flex-col h-full">
      {/* 添加系统名称和党徽到侧边栏顶部 */}
      <div className="p-4 border-b flex flex-col items-center">
        <Link href="/card" className="flex flex-col items-center">
          {/* 中国共产党党徽 */}
          <Image
            src="https://p3.img.cctvpic.com/photoworkspace/contentimg/2021/07/09/2021070916100758523.png"
            alt="中国共产党党徽"
            width={60}
            height={60}
            className="mb-2"
          />
          <span className="text-lg font-bold text-center">支部党建管理系统</span>
        </Link>
      </div>

      {/* 导航菜单 */}
      <ScrollArea className="flex-1">
        <div className={cn("flex w-full flex-col gap-2 p-2 ", className)}>
          {items.map((item) => {
            const isActive = pathname === item.href

            if (item.submenu && item.submenu.length > 0) {
              const isParentOfActive = item.submenu.some((subItem) => pathname === subItem.href)

              return (
                <div key={item.href} className="space-y-1">
                  <Button
                    asChild
                    variant={isParentOfActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start font-medium hover:bg-white",
                      isParentOfActive ? "bg-white hover:bg-white" : "",
                      item.disabled && "cursor-not-allowed opacity-60",
                    )}
                    disabled
                  >
                    <div>
                      {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                      {item.title}
                    </div>
                  </Button>
                  <div className="pl-4 border-l ml-3 space-y-1">
                    {item.submenu.map((subItem) => {
                      const isSubActive = pathname === subItem.href

                      return (
                        <Button
                          key={subItem.href}
                          asChild
                          variant={isSubActive ? "secondary" : "ghost"}
                          className={cn(
                            "w-full justify-start hover:bg-white",
                            isSubActive ? "bg-white hover:bg-white" : "",
                            subItem.disabled && "cursor-not-allowed opacity-60",
                          )}
                          size="sm"
                        >
                          <Link href={subItem.href}>
                            {subItem.icon && <subItem.icon className="mr-2 h-4 w-4" />}
                            {subItem.title}
                          </Link>
                        </Button>
                      )
                    })}
                  </div>
                </div>
              )
            }

            return (
              <Button
                key={item.href}
                asChild
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start hover:bg-white",
                  isActive ? "bg-white hover:bg-white" : "",
                  item.disabled && "cursor-not-allowed opacity-60",
                )}
              >
                <Link href={item.href}>
                  {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                  {item.title}
                </Link>
              </Button>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
