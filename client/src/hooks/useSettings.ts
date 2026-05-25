import { useCallback, useEffect, useState } from 'react'
import { DEFAULT_SETTINGS, AppSettings, ThemeId } from '../types/settings'

const STORAGE_KEY = 'painel-condominios-settings'

function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_SETTINGS
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }
  } catch {
    return DEFAULT_SETTINGS
  }
}

function saveSettings(settings: AppSettings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const loaded = loadSettings()
    document.documentElement.setAttribute('data-theme', loaded.theme)
    return loaded
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme)
    saveSettings(settings)
  }, [settings])

  const updateSettings = useCallback((patch: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }))
  }, [])

  const setUserName = useCallback((userName: string) => {
    updateSettings({ userName })
  }, [updateSettings])

  const setTheme = useCallback((theme: ThemeId) => {
    updateSettings({ theme })
  }, [updateSettings])

  const toggleSidebar = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      sidebarCollapsed: !prev.sidebarCollapsed,
    }))
  }, [])

  return {
    settings,
    updateSettings,
    setUserName,
    setTheme,
    toggleSidebar,
  }
}
