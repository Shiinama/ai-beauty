'use client'

import { Sparkles } from 'lucide-react'

import { useUser } from '@/components/providers/user-provider'

export function UsageBadge() {
  const { loading, usageCount, totalCredits } = useUser()

  if (loading) {
    return null
  }

  const usedCredits = usageCount > totalCredits ? totalCredits : usageCount

  return (
    <div className="hidden items-center gap-1 rounded-full border border-indigo-500/30 bg-[#1e1e2e]/50 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm md:flex">
      <Sparkles size={14} className="text-indigo-400" />
      <span>
        Free Times: {usedCredits}/{totalCredits}
      </span>
    </div>
  )
}
