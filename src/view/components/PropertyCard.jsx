// ============================================================
// VIEW/COMPONENT — PropertyCard.jsx
// Responsabilidade: renderização de card de imóvel
// SEM lógica de negócio
// ============================================================

import { useApp } from "../../context/AppContext";
import { openListingModal, toggleFavorite } from "../../controller/ListingController";

const BADGE_STYLES = {
  hot: { bg: "#ef4444", label: "🔥 Em alta" },
  new: { bg: "#22c55e", label: "✨ Novo" },
};

const TYPE_COLORS = {
  kitnet: "#534AB7",
  quarto: "#378ADD",
  apartamento: "#8b5cf6",
  casa: "#06b6d4",
};

export default function PropertyCard({ listing }) {
  if (!listing) {
    console.warn("PropertyCard recebeu listing undefined");
    return null;
  }
  const { state, dispatch } = useApp();
  const isFav = state.favorites.includes(listing.id);

  const handleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(dispatch, listing.id, isFav, listing.title);
  };

  const handleOpen = () => {
    openListingModal(dispatch, listing);
  };

  const badge = BADGE_STYLES[listing.badge];
  const typeColor = TYPE_COLORS[listing.type] || "#534AB7";

  return (
    <div
      onClick={handleOpen}
      className="relative bg-white rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        boxShadow: "0 2px 12px rgba(83,74,183,0.08)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 32px rgba(83,74,183,0.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(83,74,183,0.08)";
      }}
    >
      {/* Image placeholder with gradient */}
      <div
        className="relative h-44 flex items-center justify-center text-6xl"
        style={{
          background: `linear-gradient(135deg, ${typeColor}22, ${typeColor}44)`,
        }}
      >
        <span className="drop-shadow-sm" style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.15))" }}>
          {listing.emoji}
        </span>

        {/* Badge */}
        {badge && (
          <span
            className="absolute top-3 left-3 text-white text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: badge.bg, fontFamily: "'DM Sans', sans-serif" }}
          >
            {badge.label}
          </span>
        )}

        {/* Favorite button */}
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-md"
          style={{
            background: isFav ? "#ef4444" : "rgba(255,255,255,0.9)",
            transform: isFav ? "scale(1.1)" : "scale(1)",
          }}
          aria-label={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          <span className="text-base leading-none">{isFav ? "❤️" : "🤍"}</span>
        </button>

        {/* Type chip */}
        <span
          className="absolute bottom-3 left-3 text-white text-xs font-medium px-2.5 py-1 rounded-lg capitalize"
          style={{ background: typeColor, fontFamily: "'DM Sans', sans-serif" }}
        >
          {listing.type}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3
            className="font-bold text-sm leading-snug line-clamp-2 flex-1"
            style={{ fontFamily: "'Syne', sans-serif", color: "#26215C" }}
          >
            {listing.title}
          </h3>
        </div>

        <p
          className="text-xs text-gray-500 mb-3 flex items-center gap-1"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          📍 {listing.neighborhood}, {listing.city}
        </p>

        {/* Stats row */}
        <div
          className="flex items-center gap-3 mb-3 text-xs text-gray-500"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <span>🛏 {listing.rooms} qto{listing.rooms > 1 ? "s" : ""}</span>
          <span>🚿 {listing.baths} ban.</span>
          <span>📐 {listing.area}m²</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <span
              className="text-lg font-extrabold"
              style={{ fontFamily: "'Syne', sans-serif", color: "#534AB7" }}
            >
              R${listing.price.toLocaleString("pt-BR")}
            </span>
            <span
              className="text-xs text-gray-400 ml-1"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              /mês
            </span>
          </div>
          <button
            className="text-xs font-medium px-3 py-1.5 rounded-xl transition-all duration-200 text-white"
            style={{
              background: "linear-gradient(135deg, #534AB7, #378ADD)",
              fontFamily: "'DM Sans', sans-serif",
            }}
            onClick={handleOpen}
          >
            Ver mais
          </button>
        </div>
      </div>
    </div>
  );
}
