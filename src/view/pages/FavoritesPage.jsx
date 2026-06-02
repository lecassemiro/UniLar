// ============================================================
// VIEW/PAGE — FavoritesPage.jsx
// Responsabilidade: página de favoritos com empty state
// ============================================================

import { useApp } from "../../context/AppContext";
import PropertyCard from "../components/PropertyCard";
import EmptyState from "../components/EmptyState";
import { getFavoriteListings } from "../../controller/ListingController";
import { navigateTo } from "../../controller/NavigationController";

export default function FavoritesPage() {
  const { state, dispatch } = useApp();
  const { listings, favorites } = state;

  const favListings = getFavoriteListings(listings, favorites);

  return (
    <div className="min-h-screen px-4 py-10" style={{ background: "#F7F6FF" }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-2xl sm:text-3xl font-extrabold mb-2"
            style={{ fontFamily: "'Syne', sans-serif", color: "#26215C" }}
          >
            ❤️ Meus Favoritos
          </h1>
          <p className="text-sm text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {favListings.length} imóve{favListings.length !== 1 ? "is" : "l"} salvo
            {favListings.length !== 1 ? "s" : ""}
          </p>
        </div>

        {favListings.length > 0 ? (
          <>
            {/* Info banner */}
            <div
              className="flex items-center gap-3 p-4 rounded-2xl mb-8 text-sm"
              style={{
                background: "linear-gradient(135deg, #534AB715, #378ADD10)",
                border: "1px solid #534AB730",
                fontFamily: "'DM Sans', sans-serif",
                color: "#534AB7",
              }}
            >
              <span className="text-xl">💡</span>
              <p>
                Seus favoritos são salvos automaticamente no dispositivo.
                Toque no ❤️ para remover.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {favListings.map((listing) => (
                <PropertyCard key={listing.id} listing={listing} />
              ))}
            </div>
          </>
        ) : (
          <EmptyState
            icon="💔"
            title="Nenhum favorito ainda"
            description="Explore os imóveis disponíveis e adicione os que mais gostou aos favoritos tocando no ❤️."
            action={{
              label: "Explorar imóveis",
              onClick: () => navigateTo(dispatch, "listings"),
            }}
          />
        )}
      </div>
    </div>
  );
}
