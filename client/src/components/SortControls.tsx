export type SortField = 'name' | 'residents'
export type SortOrder = 'asc' | 'desc'

interface SortControlsProps {
  sortBy: SortField
  sortOrder: SortOrder
  onSort: (field: SortField, order: SortOrder) => void
}

export function SortControls({ sortBy, sortOrder, onSort }: SortControlsProps) {
  return (
    <fieldset className="sort-controls">
      <legend>Ordenar</legend>
      <div className="sort-controls-row">
        <label htmlFor="sort-field">
          Campo
          <select
            id="sort-field"
            value={sortBy}
            onChange={(e) => onSort(e.target.value as SortField, sortOrder)}
          >
            <option value="name">Nome</option>
            <option value="residents">Moradores</option>
          </select>
        </label>
        <label htmlFor="sort-order">
          Direção
          <select
            id="sort-order"
            value={sortOrder}
            onChange={(e) => onSort(sortBy, e.target.value as SortOrder)}
          >
            <option value="asc">↑ Crescente</option>
            <option value="desc">↓ Decrescente</option>
          </select>
        </label>
      </div>
    </fieldset>
  )
}
