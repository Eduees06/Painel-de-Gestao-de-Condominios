import { CondominiumSize } from './condominium'

export type SizeFilterState = Record<CondominiumSize, boolean>

export const DEFAULT_SIZE_FILTER: SizeFilterState = {
  Pequeno: true,
  Médio: true,
  Grande: true,
}
