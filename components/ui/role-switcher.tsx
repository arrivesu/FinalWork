"use client"

import { useRouter } from "next/navigation"
import { Switch } from "@/components/ui/switch"

interface RoleSwitcherProps {
  isAdmin: boolean
  targetPath: string
  className?: string
}

export function RoleSwitcher({ isAdmin, targetPath, className }: RoleSwitcherProps) {
  const router = useRouter()

  const handleSwitch = () => {
    router.push(targetPath)
  }

  return (
    <div className={className}>
      <Switch checked={isAdmin} onCheckedChange={handleSwitch} aria-label="切换角色" />
    </div>
  )
}
