import { useMemo, useState } from 'react'
import { CondominiumList } from './components/CondominiumList'
import { ErrorState } from './components/ErrorState'
import { LoadingState } from './components/LoadingState'
import { SearchBar } from './components/SearchBar'
import { SortControls, SortField, SortOrder } from './components/SortControls'
import { Summary } from './components/Summary'
import { useCondominiums } from './hooks/useCondominiums'
import './App.css'

function App() {
  const { data, loading, error } = useCondominiums()
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<SortField>('name')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim()

    return data
      .filter((c) => c.name.toLowerCase().includes(term))
      .sort((a, b) => {
        const comparison =
          sortBy === 'name'
            ? a.name.localeCompare(b.name)
            : a.residents - b.residents
        return sortOrder === 'asc' ? comparison : -comparison
      })
  }, [data, search, sortBy, sortOrder])

  return (
    <div className="app">
      <header className="app-header">
        <h1>Painel de Gestão de Condomínios</h1>
      </header>

      <main>
        {loading && <LoadingState />}

        {error && <ErrorState message={error} />}

        {!loading && !error && (
          <>
            <Summary condominiums={data} />

            <div className="controls">
              <SearchBar value={search} onSearch={setSearch} />
              <SortControls
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={(field, order) => {
                  setSortBy(field)
                  setSortOrder(order)
                }}
              />
            </div>

            <CondominiumList condominiums={filtered} />
          </>
        )}
      </main>
    </div>
  )
}

export default App
