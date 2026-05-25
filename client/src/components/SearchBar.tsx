import { Search } from 'lucide-react'

interface SearchBarProps {
  value: string
  onSearch: (value: string) => void
}

export function SearchBar({ value, onSearch }: SearchBarProps) {
  return (
    <div className="search-wrapper">
      <Search size={16} className="search-icon" />
      <input
        type="search"
        className="search-input"
        value={value}
        placeholder="Buscar condomínio..."
        onChange={(e) => onSearch(e.target.value)}
        aria-label="Buscar condomínio"
      />
    </div>
  )
}
