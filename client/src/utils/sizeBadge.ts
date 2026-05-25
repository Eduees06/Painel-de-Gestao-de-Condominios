import { CondominiumSize } from '../types/condominium'

export function sizeBadgeClass(size: CondominiumSize): string {
  const map: Record<CondominiumSize, string> = {
    Pequeno: 'badge--pequeno',
    Médio: 'badge--medio',
    Grande: 'badge--grande',
  }
  return map[size]
}
