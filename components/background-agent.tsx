"use client"

import { useEffect, useRef } from "react"

interface BackgroundAgentProps {
  onSessionUpdate?: (session: any) => void
  onMemoryUpdate?: (memory: any) => void
}

export function BackgroundAgent({ onSessionUpdate, onMemoryUpdate }: BackgroundAgentProps) {
  const workerRef = useRef<Worker | null>(null)
  const sessionRef = useRef<any>(null)

  useEffect(() => {
    // Initialize background worker for persistent memory
    if (typeof window !== 'undefined' && 'Worker' in window) {
      workerRef.current = new Worker('/workers/background-agent.js')
      
      workerRef.current.onmessage = (event) => {
        const { type, data } = event.data
        
        switch (type) {
          case 'SESSION_UPDATE':
            sessionRef.current = data
            onSessionUpdate?.(data)
            break
          case 'MEMORY_UPDATE':
            onMemoryUpdate?.(data)
            break
          case 'PERIODIC_SAVE':
            // Auto-save session data
            localStorage.setItem('legalai_session', JSON.stringify(data))
            break
        }
      }

      // Start the background agent
      workerRef.current.postMessage({ type: 'INIT' })
    }

    // Cleanup
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate()
      }
    }
  }, [onSessionUpdate, onMemoryUpdate])

  const updateSession = (sessionData: any) => {
    if (workerRef.current) {
      workerRef.current.postMessage({
        type: 'UPDATE_SESSION',
        data: sessionData
      })
    }
  }

  const saveMemory = (memoryData: any) => {
    if (workerRef.current) {
      workerRef.current.postMessage({
        type: 'SAVE_MEMORY',
        data: memoryData
      })
    }
  }

  // Expose methods for external use
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).legalAIAgent = {
        updateSession,
        saveMemory,
        getSession: () => sessionRef.current
      }
    }
  }, [])

  return null // This is a background component
}
