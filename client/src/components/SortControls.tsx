import { SortField, SortOrder } from '../types/sort'

interface SortControlsProps {
  sortBy: SortField
  sortOrder: SortOrder
  onSort: (field: SortField, order: SortOrder) => void
}

export function SortControls({ sortBy, sortOrder, onSort }: SortControlsProps) {
  return (
    <div className="sort-controls">
      <label className="filter-label">
        Ordenar por
        <select
          className="sort-select"
          value={sortBy}
          aria-label="Ordenar por"
          onChange={(e) => onSort(e.target.value as SortField, sortOrder)}
        >
          <option value="name">Nome</option>
          <option value="residents">Moradores</option>
        </select>
      </label>
      <label className="filter-label">
        Direção
        <select
          className="sort-select"
          value={sortOrder}
          aria-label="Direção da ordenação"
          onChange={(e) => onSort(sortBy, e.target.value as SortOrder)}
        >
          <option value="asc">↑ Crescente</option>
          <option value="desc">↓ Decrescente</option>
        </select>
      </label>
    </div>
  )
}
