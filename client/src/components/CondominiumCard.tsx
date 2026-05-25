import { Condominium } from '../types/condominium'
import { sizeBadgeClass } from '../utils/sizeBadge'

interface CondominiumCardProps {
  condominium: Condominium
}

export function CondominiumCard({ condominium }: CondominiumCardProps) {
  return (
    <article className="condominium-card">
      <div className="condominium-card-info">
        <h3>{condominium.name}</h3>
        <p>
          {condominium.residents.toLocaleString('pt-BR')} moradores
        </p>
      </div>
      <span className={`badge ${sizeBadgeClass(condominium.size)}`}>
        {condominium.size}
      </span>
    </article>
  )
}
