import { Search, X } from 'lucide-react'

interface SearchBarProps {
  value: string
  onSearch: (value: string) => void
}

export function SearchBar({ value, onSearch }: SearchBarProps) {
  return (
    <div className="search-wrapper">
      <Search size={16} className="search-icon" />
      <input
        type="text"
        className="search-input"
        value={value}
        placeholder="Buscar condomínio..."
        onChange={(e) => onSearch(e.target.value)}
        aria-label="Buscar condomínio"
      />
      {value && (
        <button
          type="button"
          className="search-clear-btn"
          onClick={() => onSearch('')}
          aria-label="Limpar busca"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}
