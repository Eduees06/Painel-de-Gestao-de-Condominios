import { ArrowDown, ArrowUp, Building2 } from 'lucide-react'
import { Condominium } from '../types/condominium'
import { SortField, SortOrder } from '../types/sort'
import { sizeBadgeClass } from '../utils/sizeBadge'

interface CondominiumListProps {
  condominiums: Condominium[]
  sortBy: SortField
  sortOrder: SortOrder
  onHeaderSort: (field: SortField) => void
  onClearSearch: () => void
}

function SortIcon({
  active,
  order,
}: {
  active: boolean
  order: SortOrder
}) {
  if (!active) return null
  return order === 'asc' ? (
    <ArrowUp size={14} aria-hidden />
  ) : (
    <ArrowDown size={14} aria-hidden />
  )
}

export function CondominiumList({
  condominiums,
  sortBy,
  sortOrder,
  onHeaderSort,
  onClearSearch,
}: CondominiumListProps) {
  if (condominiums.length === 0) {
    return (
      <div className="condominium-table-wrap">
        <div className="empty-state">
          <Building2 size={40} color="var(--color-text-muted)" />
          <p>Nenhum condomínio encontrado</p>
          <button type="button" onClick={onClearSearch}>
            Limpar busca
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="condominium-table-wrap">
      <table className="condominium-table">
        <thead>
          <tr>
            <th>
              <button
                type="button"
                className={`table-sort-btn ${sortBy === 'name' ? 'active' : ''}`}
                onClick={() => onHeaderSort('name')}
              >
                Condomínio
                <SortIcon active={sortBy === 'name'} order={sortOrder} />
              </button>
            </th>
            <th>
              <button
                type="button"
                className={`table-sort-btn ${sortBy === 'residents' ? 'active' : ''}`}
                onClick={() => onHeaderSort('residents')}
              >
                Moradores
                <SortIcon
                  active={sortBy === 'residents'}
                  order={sortOrder}
                />
              </button>
            </th>
            <th>Porte</th>
          </tr>
        </thead>
        <tbody>
          {condominiums.map((condominium) => (
            <tr key={condominium.id}>
              <td className="table-cell-name">{condominium.name}</td>
              <td className="table-cell-residents">
                {condominium.residents.toLocaleString('pt-BR')}
              </td>
              <td>
                <span
                  className={`badge ${sizeBadgeClass(condominium.size)}`}
                >
                  {condominium.size}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
