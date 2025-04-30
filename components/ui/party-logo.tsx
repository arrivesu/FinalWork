"use client"

export function PartyLogo({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
      />
      <path fill="currentColor" d="M12 5a1 1 0 110 2 1 1 0 010-2zm0 8a1 1 0 110 2 1 1 0 010-2z" />
    </svg>
  )
}
