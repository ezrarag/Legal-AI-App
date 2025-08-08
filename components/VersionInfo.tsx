"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { 
  Info, 
  Calendar, 
  GitBranch, 
  ExternalLink,
  Download,
  FileText
} from 'lucide-react'
import { versionInfo } from '@/lib/version'

interface ReleaseNote {
  version: string
  date: string
  title: string
  description: string
}

export function VersionInfo() {
  const [releaseNotes, setReleaseNotes] = useState<ReleaseNote[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // In a real app, you'd fetch this from your GitHub releases API
    // For now, we'll use mock data
    const mockReleaseNotes: ReleaseNote[] = [
      {
        version: '1.1.0',
        date: '2024-01-15',
        title: 'Enhanced Document Generation',
        description: 'Improved AI-powered document drafting with better jurisdiction-specific formatting and case law integration.'
      },
      {
        version: '1.0.1',
        date: '2024-01-08',
        title: 'Bug Fixes & Performance',
        description: 'Fixed document saving issues and improved overall application performance.'
      },
      {
        version: '1.0.0',
        date: '2024-01-01',
        title: 'Initial Release',
        description: 'First release of DocForge - AI-powered legal document assistant.'
      }
    ]
    setReleaseNotes(mockReleaseNotes)
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const checkForUpdates = async () => {
    setIsLoading(true)
    // Simulate update check
    setTimeout(() => {
      setIsLoading(false)
      // In a real app, you'd check against your GitHub releases
    }, 2000)
  }

  const openReleaseNotes = () => {
    // In a real app, this would open your GitHub releases page
    window.open('https://github.com/legalai/docforge/releases', '_blank')
  }

  return (
    <div className="space-y-4">
      {/* Current Version Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Info className="h-5 w-5 text-blue-500" />
              <div>
                <h3 className="font-semibold text-lg">{versionInfo.appName}</h3>
                <p className="text-sm text-muted-foreground">
                  Version {versionInfo.version}
                </p>
              </div>
            </div>
            <Badge variant="secondary">
              {versionInfo.version}
            </Badge>
          </div>
          
          <Separator className="my-4" />
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Built {formatDate(versionInfo.buildDate)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <GitBranch className="h-4 w-4 text-muted-foreground" />
              <span>Release Channel</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Update Check */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Check for Updates</h4>
              <p className="text-sm text-muted-foreground">
                Verify if a newer version is available
              </p>
            </div>
            <Button 
              onClick={checkForUpdates} 
              disabled={isLoading}
              variant="outline"
              size="sm"
            >
              {isLoading ? 'Checking...' : 'Check Updates'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Release Notes */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium">Recent Releases</h4>
            <Button 
              onClick={openReleaseNotes}
              variant="ghost" 
              size="sm"
              className="text-blue-600 hover:text-blue-700"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            {releaseNotes.slice(0, 3).map((release, index) => (
              <div key={release.version} className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      v{release.version}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(release.date)}
                    </span>
                  </div>
                  {index === 0 && (
                    <Badge variant="default" className="text-xs">
                      Latest
                    </Badge>
                  )}
                </div>
                <h5 className="font-medium text-sm mb-1">{release.title}</h5>
                <p className="text-xs text-muted-foreground">
                  {release.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Legal Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground">
              © 2024 DocForge. All rights reserved.
            </p>
            <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
              <button className="hover:text-foreground transition-colors">
                Privacy Policy
              </button>
              <span>•</span>
              <button className="hover:text-foreground transition-colors">
                Terms of Service
              </button>
              <span>•</span>
              <button className="hover:text-foreground transition-colors">
                License
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 