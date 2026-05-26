import { ThemeId } from '../types/settings'

export interface ThemeOption {
  id: ThemeId
  label: string
  description: string
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'padrao',
    label: 'Padrão',
    description: 'Navy e dourado com fundo creme',
  },
  {
    id: 'escuro',
    label: 'Escuro',
    description: 'Cinza escuro com detalhes em azul profundo',
  },
  {
    id: 'claro',
    label: 'Claro',
    description: 'Branco com azul claro e visual leve',
  },
]
