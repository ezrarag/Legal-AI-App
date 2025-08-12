"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Scale, Building, Users, Search, BookOpen, Shield, Gavel, Settings, FolderOpen, Download, Database, Clock, FileCheck } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Document Generation",
      description: "AI-powered drafting of legal documents with jurisdiction-specific formatting",
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Case Law Integration",
      description: "Automatic citation and relevant case law suggestions based on your jurisdiction",
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: "Due Diligence Tools",
      description: "Background checks, public records, and discovery checklists",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Version Control",
      description: "Track document versions and changes with legal-grade audit trails",
    },
  ]

  const practiceAreas = [
    { name: "Family Law", icon: <Users className="h-5 w-5" />, color: "bg-blue-100 text-blue-800" },
    { name: "Business Law", icon: <Building className="h-5 w-5" />, color: "bg-green-100 text-green-800" },
    { name: "Nonprofit Law", icon: <Scale className="h-5 w-5" />, color: "bg-purple-100 text-purple-800" },
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Cursor-style Landing Page */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        {/* App Logo and Title */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto bg-blue-600 rounded-lg flex items-center justify-center mb-4">
              <Gavel className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">DocForge</h1>
          <p className="text-lg text-gray-400">Legal AI Assistant • Settings</p>
        </div>

        {/* Action Buttons - Legal Workflow Focus */}
        <div className="space-y-4 w-full max-w-md">
          <Link href="/dashboard" className="block">
            <Button 
              size="lg" 
              className="w-full h-16 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white text-left px-6 justify-start"
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
              className="w-full h-16 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white text-left px-6 justify-start"
            >
              <FileText className="h-6 w-6 mr-4 text-green-400" />
              <div>
                <div className="font-semibold">Start New Legal Packet</div>
                <div className="text-sm text-gray-400">Generate motions, affidavits, and filings</div>
              </div>
            </Button>
          </Link>

          <Link href="/due-diligence" className="block">
            <Button 
              size="lg" 
              className="w-full h-16 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white text-left px-6 justify-start"
            >
              <Download className="h-6 w-6 mr-4 text-purple-400" />
              <div>
                <div className="font-semibold">Import Existing Documents</div>
                <div className="text-sm text-gray-400">Upload evidence, filings, or templates</div>
              </div>
            </Button>
          </Link>

          <Link href="/settings" className="block">
            <Button 
              size="lg" 
              className="w-full h-16 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white text-left px-6 justify-start"
            >
              <Database className="h-6 w-6 mr-4 text-orange-400" />
              <div>
                <div className="font-semibold">Connect to Legal Database</div>
                <div className="text-sm text-gray-400">API settings and jurisdiction configuration</div>
              </div>
            </Button>
          </Link>
        </div>

        {/* Recent Cases Section */}
        <div className="mt-12 w-full max-w-md">
          <h3 className="text-lg font-semibold text-white mb-4 text-center">Recent Cases</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700">
              <div className="flex items-center">
                <FileCheck className="h-4 w-4 text-green-400 mr-3" />
                <span className="text-white text-sm">Smith v. Johnson - Family Law</span>
              </div>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700">
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-yellow-400 mr-3" />
                <span className="text-white text-sm">Tech Startup LLC - Business</span>
              </div>
              <span className="text-xs text-gray-400">1 day ago</span>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
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
