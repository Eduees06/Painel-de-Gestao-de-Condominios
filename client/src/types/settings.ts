export type ThemeId = 'luxury' | 'midnight' | 'pearl'

export type AppView = 'condominiums' | 'settings'

export interface AppSettings {
  userName: string
  theme: ThemeId
  sidebarCollapsed: boolean
}

export const DEFAULT_SETTINGS: AppSettings = {
  userName: 'Administrador',
  theme: 'luxury',
  sidebarCollapsed: false,
}
