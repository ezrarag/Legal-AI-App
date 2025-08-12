"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Scale, Building, Users, Search, BookOpen, Shield, Gavel, Settings, FolderOpen, Download, Database, Clock, FileCheck, GitBranch, Network } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Cursor-style Landing Page - Exact Match */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        {/* App Logo - 3D Cube Style */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center mb-4 shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-300">
              <Gavel className="h-12 w-12 text-white drop-shadow-lg" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">DocForge</h1>
          <p className="text-lg text-gray-400">Legal AI Assistant • Settings</p>
        </div>

        {/* Action Buttons - Exact Cursor Layout */}
        <div className="space-y-4 w-full max-w-md">
          <Link href="/dashboard" className="block">
            <Button 
              size="lg" 
              className="w-full h-16 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white text-left px-6 justify-start transition-all duration-200 hover:border-gray-500"
            >
              <FolderOpen className="h-6 w-6 mr-4 text-blue-400" />
              <div>
                <div className="font-semibold">Open Case</div>
                <div className="text-sm text-gray-400">Access existing case files and documents</div>
              </div>
            </Button>
          </Link>

          <Link href="/generate" className="block">
            <Button 
              size="lg" 
              className="w-full h-16 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white text-left px-6 justify-start transition-all duration-200 hover:border-gray-500"
            >
              <GitBranch className="h-6 w-6 mr-4 text-green-400" />
              <div>
                <div className="font-semibold">Start New Legal Packet</div>
                <div className="text-sm text-gray-400">Generate motions, affidavits, and filings</div>
              </div>
            </Button>
          </Link>

          <Link href="/settings" className="block">
            <Button 
              size="lg" 
              className="w-full h-16 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white text-left px-6 justify-start transition-all duration-200 hover:border-gray-500"
            >
              <Network className="h-6 w-6 mr-4 text-orange-400" />
              <div>
                <div className="font-semibold">Connect to Legal Database</div>
                <div className="text-sm text-gray-400">API settings and jurisdiction configuration</div>
              </div>
            </Button>
          </Link>
        </div>

        {/* Bottom Status Bar - Exact Cursor Match */}
        <div className="fixed bottom-0 left-0 right-0 h-8 bg-gray-800 border-t border-gray-700 flex items-center justify-between px-4 text-xs text-gray-400">
          <div className="flex items-center space-x-4">
            <span>∞ Agents</span>
            <span>0</span>
            <span className="text-yellow-400">⚠ 0</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>DocForge Tab</span>
            <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
