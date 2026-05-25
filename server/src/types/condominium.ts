export type CondominiumSize = 'Pequeno' | 'Médio' | 'Grande'

export interface Condominium {
  id: string
  name: string
  residents: number
  size: CondominiumSize
}
