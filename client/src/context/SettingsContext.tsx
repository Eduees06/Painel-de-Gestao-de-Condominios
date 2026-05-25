import { createContext, ReactNode, useContext } from 'react'
import { useSettings } from '../hooks/useSettings'

type SettingsContextValue = ReturnType<typeof useSettings>

const SettingsContext = createContext<SettingsContextValue | null>(null)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const value = useSettings()
  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  )
}

export function useSettingsContext() {
  const ctx = useContext(SettingsContext)
  if (!ctx) {
    throw new Error('useSettingsContext deve ser usado dentro de SettingsProvider')
  }
  return ctx
}
