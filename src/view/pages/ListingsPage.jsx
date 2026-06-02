// ============================================================
// VIEW/PAGE — ListingsPage.jsx
// Responsabilidade: página de listagem com filtros
// ============================================================

import { useApp } from "../../context/AppContext";
import { ACTIONS } from "../../context/AppContext";
import PropertyCard from "../components/PropertyCard";
import FilterChips from "../components/FilterChips";
import EmptyState from "../components/EmptyState";
import { getFilteredAndSortedListings } from "../../controller/ListingController";
import { resetFilters } from "../../controller/ListingController";

export default function ListingsPage() {
  const { state, dispatch } = useApp();
  const { listings, filters } = state;

  const filtered = getFilteredAndSortedListings(listings, filters);
  const hasFilters = filters.type !== "todos" || filters.search !== "" || filters.maxPrice !== "";

  return (
    <div className="min-h-screen px-4 py-10" style={{ background: "#F7F6FF" }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-2xl sm:text-3xl font-extrabold mb-2"
            style={{ fontFamily: "'Syne', sans-serif", color: "#26215C" }}
          >
            🔍 Imóveis disponíveis
          </h1>
          <p className="text-sm text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {filtered.length} imóve{filtered.length !== 1 ? "is" : "l"} encontrado
            {filtered.length !== 1 ? "s" : ""}
            {hasFilters && " com os filtros selecionados"}
          </p>
        </div>

        {/* Active search indicator */}
        {filters.search && (
          <div
            className="flex items-center gap-3 p-3 rounded-xl mb-5 text-sm"
            style={{
              background: "#534AB710",
              border: "1px solid #534AB730",
              fontFamily: "'DM Sans', sans-serif",
              color: "#534AB7",
            }}
          >
            <span>🔎</span>
            <span>
              Buscando por: <strong>"{filters.search}"</strong>
            </span>
            <button
              onClick={() => dispatch({ type: ACTIONS.SET_FILTER, payload: { key: "search", value: "" } })}
              className="ml-auto text-xs opacity-60 hover:opacity-100"
            >
              ✕ Limpar
            </button>
          </div>
        )}

        {/* Filter chips */}
        <div className="bg-white rounded-2xl p-4 mb-8 shadow-sm">
          <FilterChips />

          {/* Max price filter */}
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
            <span
              className="text-xs font-semibold text-gray-400"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Preço máximo:
            </span>
            <div className="flex gap-2 flex-wrap">
              {[700, 900, 1400, 2500, ""].map((val) => {
                const isActive = filters.maxPrice === String(val);
                return (
                  <button
                    key={val === "" ? "all" : val}
                    onClick={() =>
                      dispatch({
                        type: ACTIONS.SET_FILTER,
                        payload: { key: "maxPrice", value: String(val) },
                      })
                    }
                    className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      background: isActive ? "#534AB7" : "white",
                      color: isActive ? "white" : "#534AB7",
                      border: `1.5px solid ${isActive ? "#534AB7" : "#534AB740"}`,
                    }}
                  >
                    {val === "" ? "Todos" : `R$${val}`}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((listing) => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="🏠"
            title="Nenhum imóvel encontrado"
            description="Tente ajustar os filtros ou limpar a busca para ver mais opções."
            action={{
              label: "Limpar filtros",
              onClick: () => resetFilters(dispatch),
            }}
          />
        )}
      </div>
    </div>
  );
}
