import { useMemo, useState } from 'react'
import { CondominiumList } from '../components/CondominiumList'
import { FiltersPanel } from '../components/FiltersPanel'
import { Summary } from '../components/Summary'
import { DATA_META } from '../constants/dataMeta'
import { Condominium } from '../types/condominium'
import { DEFAULT_SIZE_FILTER, SizeFilterState } from '../types/filters'
import { SortField, SortOrder } from '../types/sort'

interface CondominiumsViewProps {
  data: Condominium[]
}

export function CondominiumsView({ data }: CondominiumsViewProps) {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<SortField>('name')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [sizeFilter, setSizeFilter] =
    useState<SizeFilterState>(DEFAULT_SIZE_FILTER)

  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim()
    const activeSizes = (
      Object.entries(sizeFilter) as [keyof SizeFilterState, boolean][]
    )
      .filter(([, enabled]) => enabled)
      .map(([size]) => size)

    return data
      .filter(
        (c) =>
          c.name.toLowerCase().includes(term) &&
          activeSizes.includes(c.size)
      )
      .sort((a, b) => {
        const comparison =
          sortBy === 'name'
            ? a.name.localeCompare(b.name)
            : a.residents - b.residents
        return sortOrder === 'asc' ? comparison : -comparison
      })
  }, [data, search, sortBy, sortOrder, sizeFilter])

  function handleHeaderSort(field: SortField) {
    if (sortBy === field) {
      setSortOrder((order) => (order === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  return (
    <>
      <Summary condominiums={data} />

      <FiltersPanel
        search={search}
        onSearch={setSearch}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={(field, order) => {
          setSortBy(field)
          setSortOrder(order)
        }}
        sizeFilter={sizeFilter}
        onSizeFilterChange={setSizeFilter}
        resultsCount={filtered.length}
      />

      <div className="condominium-body">
        <CondominiumList
          condominiums={filtered}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onHeaderSort={handleHeaderSort}
          onClearSearch={() => {
            setSearch('')
            setSizeFilter(DEFAULT_SIZE_FILTER)
          }}
        />

        <footer className="page-footer">
          Fonte:{' '}
          <a
            href={DATA_META.datasetLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {DATA_META.source} — {DATA_META.datasetName}
          </a>
          {' '}
          · Dados referentes ao ano de {DATA_META.year}
        </footer>
      </div>
    </>
  )
}
