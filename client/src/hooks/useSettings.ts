import { useCallback, useEffect, useState } from 'react'
import { applyThemeTokens, migrateThemeId } from '../constants/themeTokens'
import { DEFAULT_SETTINGS, AppSettings, ThemeId } from '../types/settings'

const STORAGE_KEY = 'painel-condominios-settings'

function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_SETTINGS
    const parsed = JSON.parse(raw) as Partial<AppSettings>
    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
      theme: migrateThemeId(String(parsed.theme ?? DEFAULT_SETTINGS.theme)),
    }
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
    applyThemeTokens(loaded.theme)
    return loaded
  })

  useEffect(() => {
    applyThemeTokens(settings.theme)
    saveSettings(settings)
  }, [settings])

  const updateSettings = useCallback((patch: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }))
  }, [])

  const saveUserName = useCallback((userName: string) => {
    const trimmed = userName.trim() || DEFAULT_SETTINGS.userName
    updateSettings({ userName: trimmed })
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
    saveUserName,
    setTheme,
    toggleSidebar,
  }
}
