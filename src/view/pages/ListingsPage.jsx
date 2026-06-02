// ============================================================
// VIEW/PAGE — ListingsPage.jsx
// Responsabilidade: página de listagem com filtros
// ============================================================

import { useApp } from "../../context/AppContext"
import { ACTIONS } from "../../context/AppContext"
import PropertyCard from "../components/PropertyCard"
import FilterChips from "../components/FilterChips"
import EmptyState from "../components/EmptyState"
import { getFilteredAndSortedListings } from "../../controller/ListingController"
import { resetFilters } from "../../controller/ListingController"
import { Search, SlidersHorizontal, FilterX, LayoutGrid } from "lucide-react"

export default function ListingsPage() {
  const { state, dispatch } = useApp()
  const { listings, filters } = state

  const filtered = getFilteredAndSortedListings(listings, filters)
  const hasFilters =
    filters.type !== "todos" || filters.search !== "" || filters.maxPrice !== ""

  return (
    <div className="page-container space-y-6 py-8 sm:py-12">
      <section className="section-card p-6 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <span className="pill w-fit bg-sky-50 text-sky-700">
              <LayoutGrid size={14} />
              Catálogo de imóveis
            </span>
            <div>
              <h1 className="font-display text-3xl font-bold text-slate-950 sm:text-4xl">
                Imóveis disponíveis
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                {filtered.length} imóve{filtered.length !== 1 ? "is" : "l"}{" "}
                encontrado{filtered.length !== 1 ? "s" : ""}
                {hasFilters && " com os filtros selecionados"}
              </p>
            </div>
          </div>

          {filters.search && (
            <div className="surface flex items-center gap-3 px-4 py-3 text-sm text-sky-700">
              <Search size={16} />
              <span>
                Buscando por <strong>{filters.search}</strong>
              </span>
              <button
                onClick={() =>
                  dispatch({
                    type: ACTIONS.SET_FILTER,
                    payload: { key: "search", value: "" },
                  })
                }
                className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                <FilterX size={14} />
                Limpar
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="section-card p-5 sm:p-6">
        <FilterChips />

        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-200/70 pt-5">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
            <SlidersHorizontal size={14} />
            Faixa de preço
          </span>
          {[700, 900, 1400, 2500, ""].map((val) => {
            const isActive = filters.maxPrice === String(val)
            return (
              <button
                key={val === "" ? "all" : val}
                onClick={() =>
                  dispatch({
                    type: ACTIONS.SET_FILTER,
                    payload: { key: "maxPrice", value: String(val) },
                  })
                }
                className={`chip ${isActive ? "chip-active" : ""}`}
                aria-pressed={isActive}
              >
                {val === "" ? "Todos" : `R$ ${val}`}
              </button>
            )
          })}
        </div>
      </section>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((listing) => (
            <PropertyCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <section className="section-card">
          <EmptyState
            icon={Search}
            title="Nenhum imóvel encontrado"
            description="Tente ajustar os filtros ou limpar a busca para ver mais opções."
            action={{
              label: "Limpar filtros",
              onClick: () => resetFilters(dispatch),
            }}
          />
        </section>
      )}
    </div>
  )
}
