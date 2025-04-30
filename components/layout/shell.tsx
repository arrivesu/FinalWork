import type React from "react"

interface ShellProps {
  children: React.ReactNode
}

export function Shell({ children }: ShellProps) {
  return <div className="flex min-h-screen flex-col">{children}</div>
}
