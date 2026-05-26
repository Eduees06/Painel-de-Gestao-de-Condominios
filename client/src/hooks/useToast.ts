import { useCallback, useEffect, useRef, useState } from 'react'

const FADE_OUT_DELAY = 1800
const REMOVE_DELAY = 2000
const MANUAL_CLOSE_DURATION = 200

export function useToast() {
  const [toast, setToast] = useState<string | null>(null)
  const [closing, setClosing] = useState(false)
  const closeTimerRef = useRef<number | null>(null)
  const removeTimerRef = useRef<number | null>(null)

  useEffect(() => {
    if (!toast) {
      setClosing(false)
      return
    }

    closeTimerRef.current = window.setTimeout(() => {
      setClosing(true)
    }, FADE_OUT_DELAY)

    removeTimerRef.current = window.setTimeout(() => {
      setToast(null)
      setClosing(false)
    }, REMOVE_DELAY)

    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current)
      }
      if (removeTimerRef.current !== null) {
        window.clearTimeout(removeTimerRef.current)
      }
    }
  }, [toast])

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current)
      }
      if (removeTimerRef.current !== null) {
        window.clearTimeout(removeTimerRef.current)
      }
    }
  }, [])

  const showToast = useCallback((message: string) => {
    setToast(message)
    setClosing(false)
  }, [])

  const closeToast = useCallback(() => {
    if (!toast) {
      return
    }

    setClosing(true)

    if (removeTimerRef.current !== null) {
      window.clearTimeout(removeTimerRef.current)
    }

    removeTimerRef.current = window.setTimeout(() => {
      setToast(null)
      setClosing(false)
    }, MANUAL_CLOSE_DURATION)
  }, [toast])

  return {
    toast,
    closing,
    showToast,
    closeToast,
  }
}
