"use client"

import { versionInfo } from '@/lib/version'
import { Info } from 'lucide-react'

interface VersionDisplayProps {
  variant?: 'minimal' | 'detailed'
  className?: string
}

export function VersionDisplay({ variant = 'minimal', className = '' }: VersionDisplayProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center justify-center space-x-2 text-xs text-muted-foreground ${className}`}>
        <Info className="h-3 w-3" />
        <span>v{versionInfo.version}</span>
      </div>
    )
  }

  return (
    <div className={`text-xs text-muted-foreground space-y-1 ${className}`}>
      <div className="flex items-center justify-between">
        <span>{versionInfo.appName}</span>
        <span>v{versionInfo.version}</span>
      </div>
      <div className="text-xs opacity-75">
        Built {formatDate(versionInfo.buildDate)}
      </div>
    </div>
  )
} 