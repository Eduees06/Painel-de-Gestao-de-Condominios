import { Condominium } from '../types/condominium'
import { CondominiumCard } from './CondominiumCard'

interface CondominiumListProps {
  condominiums: Condominium[]
}

export function CondominiumList({ condominiums }: CondominiumListProps) {
  if (condominiums.length === 0) {
    return (
      <p className="condominium-list-empty">Nenhum condomínio encontrado.</p>
    )
  }

  return (
    <ul className="condominium-list">
      {condominiums.map((condominium) => (
        <li key={condominium.id}>
          <CondominiumCard condominium={condominium} />
        </li>
      ))}
    </ul>
  )
}
