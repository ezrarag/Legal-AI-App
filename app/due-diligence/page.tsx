"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Search,
  Shield,
  Car,
  CreditCard,
  Users,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Download,
  Eye,
  FileText,
  Globe,
} from "lucide-react"
import Link from "next/link"

export default function DueDiligencePage() {
  const [searchType, setSearchType] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [jurisdiction, setJurisdiction] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<any>(null)

  const searchTypes = [
    { value: "background", label: "Background Check", icon: <Shield className="h-4 w-4" /> },
    { value: "driving", label: "Driving Record", icon: <Car className="h-4 w-4" /> },
    { value: "credit", label: "Credit Report", icon: <CreditCard className="h-4 w-4" /> },
    { value: "social", label: "Social Media Scan", icon: <Users className="h-4 w-4" /> },
    { value: "registry", label: "Sex Offender Registry", icon: <AlertTriangle className="h-4 w-4" /> },
    { value: "corporate", label: "Corporate Records", icon: <FileText className="h-4 w-4" /> },
  ]

  const jurisdictions = [
    { value: "ontario", label: "Ontario, Canada" },
    { value: "florida", label: "Florida, USA" },
    { value: "california", label: "California, USA" },
    { value: "texas", label: "Texas, USA" },
    { value: "newyork", label: "New York, USA" },
  ]

  const handleSearch = async () => {
    if (!searchType || !searchQuery || !jurisdiction) return

    setIsSearching(true)

    // Simulate search results
    setTimeout(() => {
      setSearchResults({
        type: searchType,
        query: searchQuery,
        jurisdiction: jurisdiction,
        results: generateMockResults(searchType),
      })
      setIsSearching(false)
    }, 2000)
  }

  const generateMockResults = (type: string) => {
    switch (type) {
      case "background":
        return {
          status: "completed",
          findings: [
            { type: "criminal", status: "clear", description: "No criminal convictions found" },
            { type: "civil", status: "found", description: "2 civil judgments found (2019, 2021)" },
            { type: "bankruptcy", status: "clear", description: "No bankruptcy filings found" },
          ],
          sources: ["Provincial Court Records", "Federal Court Database", "Credit Bureau Reports"],
        }
      case "driving":
        return {
          status: "completed",
          findings: [
            { type: "violations", status: "found", description: "3 traffic violations in past 5 years" },
            { type: "license", status: "active", description: "Valid driver's license - expires 2026" },
            { type: "suspensions", status: "clear", description: "No license suspensions found" },
          ],
          sources: ["Ministry of Transportation", "Provincial DMV Records"],
        }
      case "registry":
        return {
          status: "completed",
          findings: [{ type: "registry", status: "clear", description: "No matches found in sex offender registry" }],
          sources: ["National Sex Offender Registry", "Provincial Registry Database"],
        }
      default:
        return {
          status: "completed",
          findings: [{ type: "general", status: "clear", description: "Search completed successfully" }],
          sources: ["Various Public Records"],
        }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "clear":
        return "bg-green-100 text-green-800"
      case "found":
        return "bg-yellow-100 text-yellow-800"
      case "active":
        return "bg-blue-100 text-blue-800"
      case "alert":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "clear":
        return <CheckCircle className="h-4 w-4" />
      case "found":
        return <AlertTriangle className="h-4 w-4" />
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "alert":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Search className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <h1 className="text-xl font-semibold">Due Diligence Tools</h1>
            </div>
            <Badge variant="outline">
              <Shield className="h-3 w-3 mr-1" />
              Secure Search
            </Badge>
          </div>
        </div>
      </header>

      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Search Panel */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Search className="h-5 w-5 mr-2" />
                    Search Configuration
                  </CardTitle>
                  <CardDescription>Configure your due diligence search parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="search-type">Search Type</Label>
                    <Select value={searchType} onValueChange={setSearchType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select search type" />
                      </SelectTrigger>
                      <SelectContent>
                        {searchTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center">
                              {type.icon}
                              <span className="ml-2">{type.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="jurisdiction">Jurisdiction</Label>
                    <Select value={jurisdiction} onValueChange={setJurisdiction}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select jurisdiction" />
                      </SelectTrigger>
                      <SelectContent>
                        {jurisdictions.map((j) => (
                          <SelectItem key={j.value} value={j.value}>
                            {j.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="search-query">Search Query</Label>
                    <Input
                      id="search-query"
                      placeholder="Enter name, business, or identifier..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <Button
                    onClick={handleSearch}
                    disabled={!searchType || !searchQuery || !jurisdiction || isSearching}
                    className="w-full"
                  >
                    {isSearching ? (
                      <>
                        <Search className="h-4 w-4 mr-2 animate-pulse" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Start Search
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Search Guidelines */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Search Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm space-y-2">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <p>Ensure you have proper authorization before conducting searches</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
                      <p>All searches are logged and encrypted for security</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Globe className="h-4 w-4 text-green-600 mt-0.5" />
                      <p>Results may vary by jurisdiction and data availability</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Panel */}
            <div className="space-y-6">
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Search Results
                    </CardTitle>
                    {searchResults && (
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Report
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {!searchResults ? (
                    <div className="flex flex-col items-center justify-center h-96 text-gray-500">
                      <Search className="h-16 w-16 mb-4 opacity-50" />
                      <p className="text-lg font-medium mb-2">No search performed yet</p>
                      <p className="text-sm text-center">
                        Configure your search parameters and click "Start Search" to begin
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Search Summary */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-medium mb-2">Search Summary</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Type:</span>
                            <span className="ml-2 font-medium">
                              {searchTypes.find((t) => t.value === searchResults.type)?.label}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Query:</span>
                            <span className="ml-2 font-medium">{searchResults.query}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Jurisdiction:</span>
                            <span className="ml-2 font-medium">
                              {jurisdictions.find((j) => j.value === searchResults.jurisdiction)?.label}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Status:</span>
                            <Badge className="ml-2 bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Completed
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Findings */}
                      <div>
                        <h3 className="font-medium mb-4">Findings</h3>
                        <div className="space-y-3">
                          {searchResults.results.findings.map((finding: any, index: number) => (
                            <div key={index} className="border rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium capitalize">{finding.type}</span>
                                <Badge className={getStatusColor(finding.status)}>
                                  {getStatusIcon(finding.status)}
                                  <span className="ml-1 capitalize">{finding.status}</span>
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600">{finding.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Sources */}
                      <div>
                        <h3 className="font-medium mb-4">Data Sources</h3>
                        <div className="space-y-2">
                          {searchResults.results.sources.map((source: string, index: number) => (
                            <div key={index} className="flex items-center text-sm text-gray-600">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              {source}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Quick Due Diligence Actions</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Shield className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Background Check Template</h3>
                      <p className="text-sm text-gray-600">Generate comprehensive background check prompts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <FileText className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Discovery Checklist</h3>
                      <p className="text-sm text-gray-600">Create case-specific discovery checklists</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <Users className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Social Media Report</h3>
                      <p className="text-sm text-gray-600">Generate social media analysis templates</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
