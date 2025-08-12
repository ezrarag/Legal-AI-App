import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CustomTitleBar } from "@/components/custom-title-bar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DocForge - AI-Powered Legal Assistant",
  description:
    "Generate legal documents, research case law, and conduct due diligence with AI. Built for lawyers, legal students, and self-represented individuals.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomTitleBar />
        <div className="pt-12">
          {children}
        </div>
      </body>
    </html>
  )
}
