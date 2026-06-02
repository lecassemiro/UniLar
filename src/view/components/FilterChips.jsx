// ============================================================
// VIEW/COMPONENT — FilterChips.jsx
// Responsabilidade: chips de tipo e ordenação
// ============================================================

import { useApp } from "../../context/AppContext";
import { setFilter, setSortOrder, resetFilters } from "../../controller/ListingController";
import { LISTING_TYPES, SORT_OPTIONS } from "../../model/ListingModel";

export default function FilterChips() {
  const { state, dispatch } = useApp();
  const { filters } = state;

  const hasActiveFilters =
    filters.type !== "todos" || filters.maxPrice !== "" || filters.sortOrder !== "relevancia";

  return (
    <div className="flex flex-col gap-3">
      {/* Type filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <span
          className="text-xs font-semibold text-gray-400 mr-1"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Tipo:
        </span>
        {LISTING_TYPES.map((t) => {
          const isActive = filters.type === t.value;
          return (
            <button
              key={t.value}
              onClick={() => setFilter(dispatch, "type", t.value)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: isActive ? "linear-gradient(135deg, #534AB7, #378ADD)" : "white",
                color: isActive ? "white" : "#534AB7",
                border: isActive ? "none" : "1.5px solid #534AB740",
                boxShadow: isActive ? "0 4px 12px rgba(83,74,183,0.3)" : "none",
                transform: isActive ? "scale(1.04)" : "scale(1)",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Sort + Clear row */}
      <div className="flex flex-wrap gap-2 items-center">
        <span
          className="text-xs font-semibold text-gray-400 mr-1"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Ordenar:
        </span>
        {SORT_OPTIONS.map((s) => {
          const isActive = filters.sortOrder === s.value;
          return (
            <button
              key={s.value}
              onClick={() => setSortOrder(dispatch, s.value)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: isActive ? "#26215C" : "white",
                color: isActive ? "white" : "#26215C",
                border: isActive ? "none" : "1.5px solid #26215C30",
                boxShadow: isActive ? "0 4px 12px rgba(38,33,92,0.25)" : "none",
              }}
            >
              {s.label}
            </button>
          );
        })}

        {/* Clear button */}
        {hasActiveFilters && (
          <button
            onClick={() => resetFilters(dispatch)}
            className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ml-auto flex items-center gap-1"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "#ef4444",
              border: "1.5px solid #ef444440",
              background: "#fef2f2",
            }}
          >
            ✕ Limpar filtros
          </button>
        )}
      </div>
    </div>
  );
}
