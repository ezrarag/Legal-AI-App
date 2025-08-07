"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Send,
  FileText,
  BookOpen,
  Search,
  Download,
  Copy,
  RefreshCw,
  Sparkles,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

export default function GeneratePage() {
  const [documentType, setDocumentType] = useState("")
  const [jurisdiction, setJurisdiction] = useState("")
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")
  const [showExplanation, setShowExplanation] = useState(false)

  const documentTypes = {
    family: [
      { value: "motion-compel", label: "Motion to Compel Discovery" },
      { value: "parenting-plan", label: "Parenting Plan" },
      { value: "contempt-motion", label: "Contempt Motion" },
      { value: "affidavit", label: "Affidavit" },
      { value: "form-35-1", label: "Form 35.1 (Ontario)" },
    ],
    business: [
      { value: "operating-agreement", label: "Operating Agreement" },
      { value: "sow", label: "Statement of Work" },
      { value: "nda", label: "Non-Disclosure Agreement" },
      { value: "employment-contract", label: "Employment Contract" },
      { value: "lease-agreement", label: "Lease Agreement" },
    ],
    nonprofit: [
      { value: "bylaws", label: "Bylaws" },
      { value: "board-resolution", label: "Board Resolution" },
      { value: "501c3-filing", label: "501(c)(3) Filing" },
      { value: "conflict-policy", label: "Conflict of Interest Policy" },
      { value: "fundraising-agreement", label: "Fundraising Agreement" },
    ],
  }

  const jurisdictions = [
    { value: "ontario", label: "Ontario, Canada" },
    { value: "florida", label: "Florida, USA" },
    { value: "california", label: "California, USA" },
    { value: "texas", label: "Texas, USA" },
    { value: "newyork", label: "New York, USA" },
  ]

  const handleGenerate = async () => {
    if (!documentType || !jurisdiction || !prompt) return

    setIsGenerating(true)

    // Simulate AI generation
    setTimeout(() => {
      setGeneratedContent(`
# MOTION TO COMPEL DISCOVERY

**Court File No.:** [TO BE FILLED]
**Ontario Superior Court of Justice**
**Family Court**

**BETWEEN:**

[APPLICANT NAME]
- Applicant

**AND:**

[RESPONDENT NAME]
- Respondent

## MOTION RECORD

**TO THE RESPONDENT:**

A COURT HEARING WILL BE HELD before a judge of the Ontario Superior Court of Justice, Family Court, at [COURT ADDRESS] on [DATE] at [TIME], or as soon after that time as the motion can be heard.

**THE FOLLOWING RELIEF IS SOUGHT:**

1. An Order compelling the Respondent to provide full and complete answers to the Request to Admit served on [DATE];

2. An Order compelling the Respondent to produce the documents requested in the Request for Production served on [DATE];

3. Costs of this motion; and

4. Such further and other relief as this Honourable Court may deem just.

**THE GROUNDS FOR THE MOTION ARE:**

1. The Respondent has failed to respond to legitimate discovery requests served on [DATE];

2. The requested information is relevant and necessary for the fair determination of the issues in this proceeding;

3. The Respondent's failure to comply with discovery obligations is prejudicing the Applicant's ability to prepare for trial;

4. Rules 20 and 21 of the Family Law Rules;

5. Such further and other grounds as counsel may advise and this Honourable Court may permit.

**THE FOLLOWING DOCUMENTARY EVIDENCE will be used at the hearing of the motion:**

1. Affidavit of [APPLICANT NAME], sworn [DATE];
2. Request to Admit served on [DATE];
3. Request for Production served on [DATE];
4. Such further and other evidence as counsel may advise and this Honourable Court may permit.

---

**DATED at [CITY], Ontario, this [DAY] day of [MONTH], 2024.**

[LAWYER NAME]
[LAW FIRM]
[ADDRESS]
[PHONE/EMAIL]

Lawyer for the Applicant

**TO:** [RESPONDENT'S LAWYER]
[ADDRESS]
      `)
      setIsGenerating(false)
    }, 3000)
  }

  const getCurrentDocumentTypes = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const type = urlParams.get("type")

    if (type && documentTypes[type as keyof typeof documentTypes]) {
      return documentTypes[type as keyof typeof documentTypes]
    }

    return Object.values(documentTypes).flat()
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
              <h1 className="text-xl font-semibold">Generate Legal Document</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">
                <Sparkles className="h-3 w-3 mr-1" />
                AI-Powered
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Panel */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Document Configuration
                  </CardTitle>
                  <CardDescription>Configure your document type, jurisdiction, and requirements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="document-type">Document Type</Label>
                    <Select value={documentType} onValueChange={setDocumentType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select document type" />
                      </SelectTrigger>
                      <SelectContent>
                        <div className="p-2">
                          <div className="text-sm font-medium text-gray-500 mb-2">Family Law</div>
                          {documentTypes.family.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </div>
                        <Separator />
                        <div className="p-2">
                          <div className="text-sm font-medium text-gray-500 mb-2">Business Law</div>
                          {documentTypes.business.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </div>
                        <Separator />
                        <div className="p-2">
                          <div className="text-sm font-medium text-gray-500 mb-2">Nonprofit Law</div>
                          {documentTypes.nonprofit.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </div>
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
                    <Label htmlFor="case-details">Case Details & Requirements</Label>
                    <Textarea
                      id="case-details"
                      placeholder="Describe your case details, parties involved, specific requirements, and any special circumstances..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      rows={6}
                    />
                  </div>

                  <Button
                    onClick={handleGenerate}
                    disabled={!documentType || !jurisdiction || !prompt || isGenerating}
                    className="w-full"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Generating Document...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Generate Document
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Additional Tools */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Search className="h-5 w-5 mr-2" />
                    Research Tools
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Find Relevant Case Law
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Search className="h-4 w-4 mr-2" />
                    Due Diligence Check
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <FileText className="h-4 w-4 mr-2" />
                    Discovery Checklist
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Output Panel */}
            <div className="space-y-6">
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Generated Document
                    </CardTitle>
                    {generatedContent && (
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Copy className="h-4 w-4 mr-2" />
                          Copy
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    )}
                  </div>
                  {generatedContent && (
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Generated
                      </Badge>
                      <Button variant="ghost" size="sm" onClick={() => setShowExplanation(!showExplanation)}>
                        {showExplanation ? "Hide" : "Show"} Explanation
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  {!generatedContent ? (
                    <div className="flex flex-col items-center justify-center h-96 text-gray-500">
                      <FileText className="h-16 w-16 mb-4 opacity-50" />
                      <p className="text-lg font-medium mb-2">No document generated yet</p>
                      <p className="text-sm text-center">
                        Fill in the document configuration and click "Generate Document" to get started
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {showExplanation && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="flex items-start space-x-2">
                            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-blue-900 mb-2">Document Explanation</h4>
                              <p className="text-sm text-blue-800">
                                This Motion to Compel Discovery follows Ontario Family Law Rules 20 and 21. The document
                                includes standard formatting required by Ontario Superior Court and incorporates
                                jurisdiction-specific language. Key sections include the relief sought, grounds for the
                                motion, and documentary evidence requirements.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="bg-white border rounded-lg p-6 font-mono text-sm whitespace-pre-wrap max-h-96 overflow-y-auto">
                        {generatedContent}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
