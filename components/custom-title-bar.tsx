"use client"

import { Settings } from 'lucide-react'
import Link from 'next/link'

export function CustomTitleBar() {
  return (
    <div
      data-tauri-drag-region
      className="fixed top-0 left-0 right-0 z-50 h-12 bg-gray-800 border-b border-gray-700 flex items-center"
    >
      {/* Left side - Traffic light buttons area (handled by Tauri's Overlay titleBarStyle) */}
      <div className="w-20 h-full flex items-center justify-center">
        {/* This space is reserved for macOS traffic light buttons */}
      </div>
      
      {/* Center - App title */}
      <div className="flex-1 flex items-center justify-center">
        <span className="text-base font-medium text-white">DocForge</span>
      </div>

      {/* Right side - Gear icon */}
      <div className="flex items-center pr-4">
        <Link href="/settings">
          <div 
            title="Settings" 
            aria-label="Go to Settings"
            className="p-1 rounded-full hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <Settings className="h-4 w-4 text-gray-300 hover:text-white transition-colors" />
          </div>
        </Link>
      </div>
    </div>
  )
}
