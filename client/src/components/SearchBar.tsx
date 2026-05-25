interface SearchBarProps {
  value: string
  onSearch: (value: string) => void
}

export function SearchBar({ value, onSearch }: SearchBarProps) {
  return (
    <div className="search-bar">
      <label htmlFor="search-input">Buscar condomínio</label>
      <input
        id="search-input"
        type="search"
        value={value}
        placeholder="Buscar condomínio..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  )
}
