import { CondominiumSize } from '../types/condominium'

export function classifySize(residents: number): CondominiumSize {
  // Pequeno até 2M; Médio até 5M; acima disso, Grande
  if (residents <= 2_000_000) return 'Pequeno'
  if (residents <= 5_000_000) return 'Médio'
  return 'Grande'
}
