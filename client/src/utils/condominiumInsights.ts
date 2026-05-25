import { Condominium, CondominiumSize } from '../types/condominium'

export function countBySize(
  condominiums: Condominium[]
): Record<CondominiumSize, number> {
  return condominiums.reduce(
    (acc, c) => {
      acc[c.size] += 1
      return acc
    },
    { Pequeno: 0, Médio: 0, Grande: 0 } as Record<CondominiumSize, number>
  )
}

export function findLargest(condominiums: Condominium[]) {
  if (condominiums.length === 0) return null
  return condominiums.reduce((max, c) =>
    c.residents > max.residents ? c : max
  )
}

export function averageResidents(condominiums: Condominium[], total: number) {
  if (condominiums.length === 0) return 0
  return Math.round(total / condominiums.length)
}

export function shareOfTotal(residents: number, total: number) {
  if (total === 0) return 0
  return ((residents / total) * 100).toFixed(1)
}
