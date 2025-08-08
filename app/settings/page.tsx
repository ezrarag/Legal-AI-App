"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowLeft,
  Settings,
  User,
  Shield,
  Bell,
  Palette,
  Database,
  Info,
  Download,
  FileText,
  Globe,
  Lock,
  Key
} from "lucide-react"
import { VersionInfo } from "@/components/VersionInfo"
import Link from "next/link"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")

  const settingsSections = [
    {
      id: "general",
      title: "General",
      icon: <Settings className="h-4 w-4" />,
      description: "Basic app settings and preferences"
    },
    {
      id: "account",
      title: "Account",
      icon: <User className="h-4 w-4" />,
      description: "User profile and authentication"
    },
    {
      id: "privacy",
      title: "Privacy & Security",
      icon: <Shield className="h-4 w-4" />,
      description: "Data protection and security settings"
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: <Bell className="h-4 w-4" />,
      description: "Notification preferences"
    },
    {
      id: "appearance",
      title: "Appearance",
      icon: <Palette className="h-4 w-4" />,
      description: "Theme and display settings"
    },
    {
      id: "data",
      title: "Data & Storage",
      icon: <Database className="h-4 w-4" />,
      description: "Document storage and sync settings"
    },
    {
      id: "about",
      title: "About",
      icon: <Info className="h-4 w-4" />,
      description: "Version info and legal information"
    }
  ]

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-muted-foreground">
              Manage your DocForge preferences and account
            </p>
          </div>
        </div>
        <Badge variant="outline">Legal AI Assistant</Badge>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          {settingsSections.map((section) => (
            <TabsTrigger key={section.id} value={section.id} className="flex items-center space-x-2">
              {section.icon}
              <span className="hidden sm:inline">{section.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Preferences</CardTitle>
              <CardDescription>
                Configure basic app behavior and defaults
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Auto-save documents</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatically save documents every 30 seconds
                  </p>
                </div>
                <Button variant="outline" size="sm">Enabled</Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Default jurisdiction</h4>
                  <p className="text-sm text-muted-foreground">
                    Set your primary legal jurisdiction
                  </p>
                </div>
                <Button variant="outline" size="sm">California</Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Document templates</h4>
                  <p className="text-sm text-muted-foreground">
                    Choose your preferred document template style
                  </p>
                </div>
                <Button variant="outline" size="sm">Professional</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Settings */}
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Manage your account details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-sm text-muted-foreground">
                    attorney@lawfirm.com
                  </p>
                </div>
                <Button variant="outline" size="sm">Change</Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Password</h4>
                  <p className="text-sm text-muted-foreground">
                    Last changed 30 days ago
                  </p>
                </div>
                <Button variant="outline" size="sm">Update</Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Two-factor authentication</h4>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security
                  </p>
                </div>
                <Button variant="outline" size="sm">Enable</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Security</CardTitle>
              <CardDescription>
                Control how your data is handled and protected
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Data encryption</h4>
                  <p className="text-sm text-muted-foreground">
                    Encrypt all documents and data
                  </p>
                </div>
                <Button variant="outline" size="sm">Enabled</Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Analytics collection</h4>
                  <p className="text-sm text-muted-foreground">
                    Help improve the app with anonymous usage data
                  </p>
                </div>
                <Button variant="outline" size="sm">Disabled</Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Export data</h4>
                  <p className="text-sm text-muted-foreground">
                    Download all your documents and settings
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Document updates</h4>
                  <p className="text-sm text-muted-foreground">
                    Notify when documents are updated
                  </p>
                </div>
                <Button variant="outline" size="sm">Enabled</Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Case law alerts</h4>
                  <p className="text-sm text-muted-foreground">
                    New relevant case law in your jurisdiction
                  </p>
                </div>
                <Button variant="outline" size="sm">Enabled</Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">App updates</h4>
                  <p className="text-sm text-muted-foreground">
                    New features and security updates
                  </p>
                </div>
                <Button variant="outline" size="sm">Enabled</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize the look and feel of DocForge
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Theme</h4>
                  <p className="text-sm text-muted-foreground">
                    Choose light, dark, or system theme
                  </p>
                </div>
                <Button variant="outline" size="sm">System</Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Font size</h4>
                  <p className="text-sm text-muted-foreground">
                    Adjust text size for better readability
                  </p>
                </div>
                <Button variant="outline" size="sm">Medium</Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Compact mode</h4>
                  <p className="text-sm text-muted-foreground">
                    Reduce spacing for more content
                  </p>
                </div>
                <Button variant="outline" size="sm">Disabled</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data & Storage */}
        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data & Storage</CardTitle>
              <CardDescription>
                Manage document storage and synchronization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Cloud sync</h4>
                  <p className="text-sm text-muted-foreground">
                    Sync documents across devices
                  </p>
                </div>
                <Button variant="outline" size="sm">Enabled</Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Local storage</h4>
                  <p className="text-sm text-muted-foreground">
                    2.3 GB used of 10 GB available
                  </p>
                </div>
                <Button variant="outline" size="sm">Manage</Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Auto-backup</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatically backup documents daily
                  </p>
                </div>
                <Button variant="outline" size="sm">Enabled</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* About */}
        <TabsContent value="about" className="space-y-6">
          <VersionInfo />
        </TabsContent>
      </Tabs>
    </div>
  )
} 