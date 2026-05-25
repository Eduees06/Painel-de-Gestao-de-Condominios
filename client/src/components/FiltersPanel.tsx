import { SizeFilterState } from '../types/filters'
import { SortField, SortOrder } from '../types/sort'
import { SearchBar } from './SearchBar'
import { SizeFilter } from './SizeFilter'
import { SortControls } from './SortControls'

interface FiltersPanelProps {
  search: string
  onSearch: (value: string) => void
  sortBy: SortField
  sortOrder: SortOrder
  onSort: (field: SortField, order: SortOrder) => void
  sizeFilter: SizeFilterState
  onSizeFilterChange: (value: SizeFilterState) => void
  resultsCount: number
}

export function FiltersPanel({
  search,
  onSearch,
  sortBy,
  sortOrder,
  onSort,
  sizeFilter,
  onSizeFilterChange,
  resultsCount,
}: FiltersPanelProps) {
  return (
    <section className="filters-panel" aria-label="Filtros">
      <SearchBar value={search} onSearch={onSearch} />
      <div className="filters-panel-row">
        <SortControls sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
        <SizeFilter value={sizeFilter} onChange={onSizeFilterChange} />
        <span className="results-count">
          {resultsCount} resultado{resultsCount !== 1 ? 's' : ''}
        </span>
      </div>
    </section>
  )
}
