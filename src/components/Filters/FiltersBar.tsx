import './FiltersBar.css'
import type { FiltersState } from '../../hooks/useFinopsData'
import type { OciService } from '../../types'

interface FiltersBarProps {
  filters: FiltersState
  setFilters: (updater: (prev: FiltersState) => FiltersState) => void
  services: (OciService | string)[]
  regions: string[]
  compartments: string[]
  envs: string[]
}

export function FiltersBar({
  filters,
  setFilters,
  services,
  regions,
  compartments,
  envs
}: FiltersBarProps) {
  const handleChange =
    <K extends keyof FiltersState>(key: K) =>
    (value: FiltersState[K]) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value
      }))
    }

  return (
    <div className="filters-root">
      <div className="filters-row">
        <div className="filters-field">
          <label>Service</label>
          <select
            value={filters.service}
            onChange={(e) => handleChange('service')(e.target.value as any)}
          >
            <option value="All">All</option>
            {services.map((s) => (
              <option key={String(s)} value={String(s)}>
                {String(s)}
              </option>
            ))}
          </select>
        </div>

        <div className="filters-field">
          <label>Region</label>
          <select
            value={filters.region}
            onChange={(e) => handleChange('region')(e.target.value as any)}
          >
            <option value="All">All</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="filters-field">
          <label>Compartment</label>
          <select
            value={filters.compartment}
            onChange={(e) => handleChange('compartment')(e.target.value as any)}
          >
            <option value="All">All</option>
            {compartments.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="filters-field">
          <label>Env (tag: env)</label>
          <select
            value={filters.envTag}
            onChange={(e) => handleChange('envTag')(e.target.value as any)}
          >
            <option value="All">All</option>
            {envs.map((env) => (
              <option key={env} value={env}>
                {env}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="filters-row">
        <div className="filters-field">
          <label>Date From</label>
          <input
            type="date"
            value={filters.dateFrom || ''}
            onChange={(e) => handleChange('dateFrom')(e.target.value || undefined)}
          />
        </div>
        <div className="filters-field">
          <label>Date To</label>
          <input
            type="date"
            value={filters.dateTo || ''}
            onChange={(e) => handleChange('dateTo')(e.target.value || undefined)}
          />
        </div>
        <button
          className="filters-reset"
          onClick={() =>
            setFilters(() => ({
              service: 'All',
              region: 'All',
              compartment: 'All',
              envTag: 'All',
              dateFrom: undefined,
              dateTo: undefined
            }))
          }
        >
          Reset Filters
        </button>
      </div>
    </div>
  )
}
