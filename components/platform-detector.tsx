"use client"

import { useState, useEffect } from "react"

interface PlatformInfo {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isIOS: boolean
  isAndroid: boolean
  isTauri: boolean
  isCapacitor: boolean
}

export function usePlatform(): PlatformInfo {
  const [platform, setPlatform] = useState<PlatformInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isIOS: false,
    isAndroid: false,
    isTauri: false,
    isCapacitor: false,
  })

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
    const isTablet = /ipad|android(?!.*mobile)/i.test(userAgent)
    const isIOS = /iphone|ipad|ipod/i.test(userAgent)
    const isAndroid = /android/i.test(userAgent)
    
    // Check if running in Tauri
    const isTauri = typeof window !== 'undefined' && '__TAURI__' in window
    
    // Check if running in Capacitor
    const isCapacitor = typeof window !== 'undefined' && 'Capacitor' in window

    setPlatform({
      isMobile: isMobile && !isTablet,
      isTablet,
      isDesktop: !isMobile,
      isIOS,
      isAndroid,
      isTauri,
      isCapacitor,
    })
  }, [])

  return platform
}

export function PlatformProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
