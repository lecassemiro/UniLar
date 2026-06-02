// ============================================================
// VIEW/PAGE — FavoritesPage.jsx
// Responsabilidade: página de favoritos com empty state
// ============================================================

import { useApp } from "../../context/AppContext"
import PropertyCard from "../components/PropertyCard"
import EmptyState from "../components/EmptyState"
import { getFavoriteListings } from "../../controller/ListingController"
import { navigateTo } from "../../controller/NavigationController"
import { Heart, Sparkles } from "lucide-react"

export default function FavoritesPage() {
  const { state, dispatch } = useApp()
  const { listings, favorites } = state

  const favListings = getFavoriteListings(listings, favorites)

  return (
    <div className="page-container space-y-6 py-8 sm:py-12">
      <section className="section-card p-6 sm:p-8">
        <span className="pill w-fit bg-sky-50 text-sky-700">
          <Heart size={14} className="fill-sky-600 text-sky-600" />
          Curadoria pessoal
        </span>
        <div className="mt-4">
          <h1 className="font-display text-3xl font-bold text-slate-950 sm:text-4xl">
            Meus favoritos
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {favListings.length} imóve{favListings.length !== 1 ? "is" : "l"}{" "}
            salvo{favListings.length !== 1 ? "s" : ""}
          </p>
        </div>
      </section>

      {favListings.length > 0 ? (
        <>
          <div className="surface flex items-start gap-3 px-4 py-4 text-sm text-slate-600">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-50 text-sky-700">
              <Sparkles size={16} />
            </div>
            <p className="leading-6">
              Seus favoritos são salvos automaticamente no dispositivo. Toque no
              coração para remover.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {favListings.map((listing) => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>
        </>
      ) : (
        <section className="section-card">
          <EmptyState
            icon={Heart}
            title="Nenhum favorito ainda"
            description="Explore os imóveis disponíveis e salve os que mais gostar para comparar depois."
            action={{
              label: "Explorar imóveis",
              onClick: () => navigateTo(dispatch, "listings"),
            }}
          />
        </section>
      )}
    </div>
  )
}
