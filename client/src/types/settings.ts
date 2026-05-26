export type ThemeId = 'padrao' | 'escuro' | 'claro'

export type AppView = 'condominiums' | 'settings'

export interface AppSettings {
  userName: string
  theme: ThemeId
  sidebarCollapsed: boolean
}

export const DEFAULT_SETTINGS: AppSettings = {
  userName: 'Administrador',
  theme: 'padrao',
  sidebarCollapsed: false,
}
