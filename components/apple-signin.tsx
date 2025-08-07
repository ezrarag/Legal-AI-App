"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Apple } from 'lucide-react'

interface AppleSignInProps {
  onSuccess?: (user: any) => void
  onError?: (error: any) => void
  className?: string
}

export function AppleSignIn({ onSuccess, onError, className }: AppleSignInProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleAppleSignIn = async () => {
    setIsLoading(true)
    
    try {
      // Check if running in Capacitor (iOS)
      if (typeof window !== 'undefined' && 'Capacitor' in window) {
        const { SignInWithApple } = await import('@capacitor-community/apple-sign-in')
        
        const result = await SignInWithApple.authorize({
          requestedScopes: [
            'email',
            'fullName'
          ]
        })
        
        if (result.response && result.response.identityToken) {
          const user = {
            id: result.response.user,
            email: result.response.email,
            name: result.response.fullName,
            identityToken: result.response.identityToken,
            authorizationCode: result.response.authorizationCode
          }
          
          onSuccess?.(user)
        }
      } else {
        // Web-based Apple Sign In
        if (typeof window !== 'undefined' && 'AppleID' in window) {
          const AppleID = (window as any).AppleID
          
          const data = await AppleID.auth.signIn()
          
          if (data.authorization.id_token) {
            const user = {
              id: data.authorization.id_token,
              email: data.user?.email,
              name: data.user?.name,
              identityToken: data.authorization.id_token,
              authorizationCode: data.authorization.code
            }
            
            onSuccess?.(user)
          }
        } else {
          throw new Error('Apple Sign In not available')
        }
      }
    } catch (error) {
      console.error('Apple Sign In error:', error)
      onError?.(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleAppleSignIn}
      disabled={isLoading}
      variant="outline"
      className={className}
    >
      <Apple className="h-4 w-4 mr-2" />
      {isLoading ? 'Signing in...' : 'Continue with Apple'}
    </Button>
  )
}
