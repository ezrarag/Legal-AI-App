"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Scale, Building, Users, Search, BookOpen, Shield, Gavel } from "lucide-react"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Gavel className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">LegalAI</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-gray-600 hover:text-gray-900">
              Features
            </Link>
            <Link href="#practice-areas" className="text-gray-600 hover:text-gray-900">
              Practice Areas
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost">Sign In</Button>
            <Link href="/dashboard">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI-Powered Legal Assistant for
            <span className="text-blue-600"> Modern Practice</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Generate legal documents, research case law, and conduct due diligence with AI. Built for lawyers, legal
            students, and self-represented individuals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="px-8 py-3">
                Start Building Documents
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-3 bg-transparent">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section id="practice-areas" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Specialized for Your Practice Area</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {practiceAreas.map((area, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Badge className={area.color}>{area.icon}</Badge>
                    <CardTitle>{area.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {area.name === "Family Law" &&
                      "Motions, affidavits, parenting plans, contempt motions, and custody documents"}
                    {area.name === "Business Law" &&
                      "Operating agreements, SOWs, real estate deals, and corporate documents"}
                    {area.name === "Nonprofit Law" &&
                      "Bylaws, board resolutions, 501(c)(3) filings, and compliance documents"}
                  </CardDescription>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {area.name === "Family Law" && (
                      <>
                        <li>• Form 35.1 compliance</li>
                        <li>• Jurisdiction-specific formatting</li>
                        <li>• Discovery checklists</li>
                      </>
                    )}
                    {area.name === "Business Law" && (
                      <>
                        <li>• Contract templates</li>
                        <li>• Due diligence workflows</li>
                        <li>• Regulatory compliance</li>
                      </>
                    )}
                    {area.name === "Nonprofit Law" && (
                      <>
                        <li>• IRS compliance</li>
                        <li>• Board governance</li>
                        <li>• Grant applications</li>
                      </>
                    )}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Features for Legal Professionals</h2>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg cursor-pointer transition-all ${
                    activeFeature === index ? "bg-blue-50 border-l-4 border-blue-600" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-2 rounded-lg ${activeFeature === index ? "bg-blue-600 text-white" : "bg-gray-100"}`}
                    >
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-xl">
              <div className="text-center">
                <div className="mb-6">{features[activeFeature].icon}</div>
                <h3 className="text-2xl font-bold mb-4">{features[activeFeature].title}</h3>
                <p className="text-gray-700 mb-6">{features[activeFeature].description}</p>
                <Button>Learn More</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Legal Practice?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of legal professionals using AI to streamline their document workflow
          </p>
          <Link href="/dashboard">
            <Button size="lg" variant="secondary" className="px-8 py-3">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Gavel className="h-6 w-6" />
                <span className="text-xl font-bold">LegalAI</span>
              </div>
              <p className="text-gray-400">AI-powered legal document generation and research platform.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>Security</li>
                <li>API</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Practice Areas</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Family Law</li>
                <li>Business Law</li>
                <li>Nonprofit Law</li>
                <li>Real Estate</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>Help Center</li>
                <li>Contact</li>
                <li>Status</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LegalAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
