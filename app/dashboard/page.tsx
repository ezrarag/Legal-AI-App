"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Plus,
  Search,
  Filter,
  Users,
  Building,
  Scale,
  Clock,
  CheckCircle,
  AlertCircle,
  Gavel,
  Settings,
  Bell,
  User,
} from "lucide-react"
import Link from "next/link"
import { VersionDisplay } from "@/components/VersionDisplay"

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedJurisdiction, setSelectedJurisdiction] = useState("")

  const recentDocuments = [
    {
      id: 1,
      title: "Motion to Compel Discovery",
      type: "Family Law",
      status: "Draft",
      lastModified: "2 hours ago",
      version: "v2",
    },
    {
      id: 2,
      title: "Nonprofit Bylaws - Community Center",
      type: "Nonprofit Law",
      status: "Final",
      lastModified: "1 day ago",
      version: "v1",
    },
    {
      id: 3,
      title: "Operating Agreement - Tech Startup",
      type: "Business Law",
      status: "Review",
      lastModified: "3 days ago",
      version: "v3",
    },
  ]

  const quickActions = [
    {
      title: "Family Law Motion",
      description: "Draft motions, affidavits, and parenting plans",
      icon: <Users className="h-6 w-6" />,
      color: "bg-blue-50 text-blue-600",
      href: "/generate?type=family",
    },
    {
      title: "Business Document",
      description: "Create contracts, agreements, and SOWs",
      icon: <Building className="h-6 w-6" />,
      color: "bg-green-50 text-green-600",
      href: "/generate?type=business",
    },
    {
      title: "Nonprofit Filing",
      description: "Generate bylaws, resolutions, and compliance docs",
      icon: <Scale className="h-6 w-6" />,
      color: "bg-purple-50 text-purple-600",
      href: "/generate?type=nonprofit",
    },
    {
      title: "Due Diligence",
      description: "Background checks and discovery tools",
      icon: <Search className="h-6 w-6" />,
      color: "bg-orange-50 text-orange-600",
      href: "/due-diligence",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Draft":
        return "bg-yellow-100 text-yellow-800"
      case "Review":
        return "bg-blue-100 text-blue-800"
      case "Final":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Draft":
        return <Clock className="h-4 w-4" />
      case "Review":
        return <AlertCircle className="h-4 w-4" />
      case "Final":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <Gavel className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">LegalAI</span>
              </Link>
              <div className="hidden md:flex items-center space-x-2">
                <Select value={selectedJurisdiction} onValueChange={setSelectedJurisdiction}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select Jurisdiction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ontario">Ontario, Canada</SelectItem>
                    <SelectItem value="florida">Florida, USA</SelectItem>
                    <SelectItem value="california">California, USA</SelectItem>
                    <SelectItem value="texas">Texas, USA</SelectItem>
                    <SelectItem value="newyork">New York, USA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <Link href="/settings">
                <Button variant="ghost" size="sm">
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Counselor</h1>
            <p className="text-gray-600">
              Generate legal documents, research case law, and manage your practice with AI.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader className="pb-3">
                    <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-3`}>
                      {action.icon}
                    </div>
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{action.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Main Content */}
          <Tabs defaultValue="documents" className="space-y-6">
            <TabsList>
              <TabsTrigger value="documents">Recent Documents</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="research">Case Law Research</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="documents" className="space-y-6">
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search documents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Link href="/generate">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Document
                  </Button>
                </Link>
              </div>

              {/* Documents List */}
              <div className="space-y-4">
                {recentDocuments.map((doc) => (
                  <Card key={doc.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-blue-50 rounded-lg">
                            <FileText className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{doc.title}</h3>
                            <div className="flex items-center space-x-3 mt-1">
                              <Badge variant="secondary">{doc.type}</Badge>
                              <Badge className={getStatusColor(doc.status)}>
                                {getStatusIcon(doc.status)}
                                <span className="ml-1">{doc.status}</span>
                              </Badge>
                              <span className="text-sm text-gray-500">{doc.version}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500 mb-2">{doc.lastModified}</p>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              Download
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="templates">
              <Card>
                <CardHeader>
                  <CardTitle>Document Templates</CardTitle>
                  <CardDescription>Pre-built templates for common legal documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Template library coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="research">
              <Card>
                <CardHeader>
                  <CardTitle>Case Law Research</CardTitle>
                  <CardDescription>AI-powered legal research and citation tools</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Research tools coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Practice Analytics</CardTitle>
                  <CardDescription>Insights into your document generation and practice efficiency</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Analytics dashboard coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Footer with Version Info */}
      <footer className="mt-8 py-4 border-t bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <VersionDisplay variant="minimal" className="text-center" />
        </div>
      </footer>
    </div>
  )
}
