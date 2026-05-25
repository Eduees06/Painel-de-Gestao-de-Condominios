import { ThemeId } from '../types/settings'

export interface ThemeOption {
  id: ThemeId
  label: string
  description: string
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'luxury',
    label: 'Luxo clássico',
    description: 'Navy e dourado, fundo creme',
  },
  {
    id: 'midnight',
    label: 'Midnight',
    description: 'Contraste escuro com detalhes dourados',
  },
  {
    id: 'pearl',
    label: 'Pearl',
    description: 'Claro e suave, tons champagne',
  },
]
