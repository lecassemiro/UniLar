// ============================================================
// VIEW/COMPONENT — FilterChips.jsx
// Responsabilidade: chips de tipo e ordenação
// ============================================================

import { useApp } from "../../context/AppContext"
import {
  setFilter,
  setSortOrder,
  resetFilters,
} from "../../controller/ListingController"
import { LISTING_TYPES, SORT_OPTIONS } from "../../model/ListingModel"
import { Filter, ArrowUpDown, RotateCcw } from "lucide-react"

export default function FilterChips() {
  const { state, dispatch } = useApp()
  const { filters } = state

  const hasActiveFilters =
    filters.type !== "todos" ||
    filters.maxPrice !== "" ||
    filters.sortOrder !== "relevancia"

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
          <Filter size={14} />
          Tipo
        </span>
        {LISTING_TYPES.map((t) => {
          const isActive = filters.type === t.value
          return (
            <button
              key={t.value}
              onClick={() => setFilter(dispatch, "type", t.value)}
              className={isActive ? "chip-active" : "chip"}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
          <ArrowUpDown size={14} />
          Ordenar
        </span>
        {SORT_OPTIONS.map((s) => {
          const isActive = filters.sortOrder === s.value
          return (
            <button
              key={s.value}
              onClick={() => setSortOrder(dispatch, s.value)}
              className={isActive ? "chip-active" : "chip"}
            >
              {s.label}
            </button>
          )
        })}

        {hasActiveFilters && (
          <button
            onClick={() => resetFilters(dispatch)}
            className="chip ml-auto text-rose-600 hover:text-rose-700"
          >
            <RotateCcw size={14} />
            Limpar filtros
          </button>
        )}
      </div>
    </div>
  )
}
