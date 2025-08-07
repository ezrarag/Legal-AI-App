"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from 'lucide-react'
import { cn } from "@/lib/utils"

interface AdaptiveLayoutProps {
  children: React.ReactNode
  sidebar?: React.ReactNode
  header?: React.ReactNode
  className?: string
}

export function AdaptiveLayout({ children, sidebar, header, className }: AdaptiveLayoutProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  if (isMobile) {
    return (
      <div className={cn("min-h-screen bg-background", className)}>
        {/* Mobile Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center px-4">
            {sidebar && (
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="pr-0 w-80">
                  <div className="px-1">
                    {sidebar}
                  </div>
                </SheetContent>
              </Sheet>
            )}
            {header}
          </div>
        </header>

        {/* Mobile Content */}
        <main className="flex-1 px-4 py-6">
          {children}
        </main>
      </div>
    )
  }

  return (
    <div className={cn("min-h-screen bg-background", className)}>
      <div className="flex">
        {/* Desktop Sidebar */}
        {sidebar && (
          <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r bg-background">
            <div className="flex h-full flex-col">
              {sidebar}
            </div>
          </aside>
        )}

        {/* Desktop Content */}
        <div className={cn("flex-1", sidebar && "ml-64")}>
          {/* Desktop Header */}
          {header && (
            <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-16 items-center px-6">
                {header}
              </div>
            </header>
          )}

          {/* Desktop Main Content */}
          <main className="flex-1 px-6 py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
