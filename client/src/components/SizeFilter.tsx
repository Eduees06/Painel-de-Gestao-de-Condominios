import { CondominiumSize } from '../types/condominium'
import { SizeFilterState } from '../types/filters'

const SIZES: CondominiumSize[] = ['Pequeno', 'Médio', 'Grande']

interface SizeFilterProps {
  value: SizeFilterState
  onChange: (value: SizeFilterState) => void
}

export function SizeFilter({ value, onChange }: SizeFilterProps) {
  function toggle(size: CondominiumSize) {
    onChange({ ...value, [size]: !value[size] })
  }

  return (
    <fieldset className="size-filter">
      <legend className="filter-label-text">Porte</legend>
      <div className="size-filter-options">
        {SIZES.map((size) => (
          <label key={size} className="size-filter-option">
            <input
              type="checkbox"
              checked={value[size]}
              onChange={() => toggle(size)}
            />
            <span className="size-filter-label">{size}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
