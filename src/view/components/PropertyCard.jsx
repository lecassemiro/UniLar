// ============================================================
// VIEW/COMPONENT — PropertyCard.jsx
// Responsabilidade: renderização de card de imóvel
// SEM lógica de negócio
// ============================================================

import { useApp } from "../../context/AppContext"
import {
  openListingModal,
  toggleFavorite,
} from "../../controller/ListingController"
import {
  Heart,
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  ArrowRight,
  Sparkles,
  House,
  Building2,
  Home,
} from "lucide-react"

const BADGE_STYLES = {
  hot: { label: "Em alta" },
  new: { label: "Novo" },
}

const TYPE_ICONS = {
  kitnet: House,
  quarto: BedDouble,
  apartamento: Building2,
  casa: Home,
}

const TYPE_ACCENTS = {
  kitnet: "from-sky-50 to-sky-100",
  quarto: "from-blue-50 to-blue-100",
  apartamento: "from-indigo-50 to-indigo-100",
  casa: "from-cyan-50 to-cyan-100",
}

export default function PropertyCard({ listing }) {
  if (!listing) {
    console.warn("PropertyCard recebeu listing undefined")
    return null
  }

  const { state, dispatch } = useApp()
  const isFav = state.favorites.includes(listing.id)
  const TypeIcon = TYPE_ICONS[listing.type] || House
  const badge = BADGE_STYLES[listing.badge]

  const handleFavorite = (e) => {
    e.stopPropagation()
    toggleFavorite(dispatch, listing.id, isFav, listing.title)
  }

  const handleOpen = () => {
    openListingModal(dispatch, listing)
  }

  return (
    <div
      onClick={handleOpen}
      className="card-hover section-card overflow-hidden cursor-pointer"
    >
      <div
        className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${TYPE_ACCENTS[listing.type] || "from-sky-50 to-sky-100"}`}
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] border border-white/70 bg-white/90 text-sky-700 shadow-sm">
          <TypeIcon size={34} strokeWidth={1.8} />
        </div>

        {badge && (
          <span className="absolute left-3 top-3 pill px-3 py-1 text-xs font-semibold text-slate-700">
            <Sparkles size={12} className="text-sky-600" />
            {badge.label}
          </span>
        )}

        <button
          onClick={handleFavorite}
          className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/90 text-slate-700 shadow-sm transition-all hover:scale-105"
          aria-label={
            isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"
          }
        >
          <Heart
            size={16}
            className={isFav ? "fill-rose-500 text-rose-500" : "text-slate-500"}
          />
        </button>

        <span className="absolute bottom-3 left-3 pill bg-white/90 px-3 py-1 text-xs font-semibold capitalize text-slate-700">
          {listing.type}
        </span>
      </div>

      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <h3 className="font-display line-clamp-2 text-lg font-bold text-slate-950">
            {listing.title}
          </h3>
          <p className="flex items-center gap-1.5 text-sm text-slate-500">
            <MapPin size={14} className="text-sky-600" />
            {listing.neighborhood}, {listing.city}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5">
            <BedDouble size={14} className="text-sky-600" />
            {listing.rooms} qto{listing.rooms > 1 ? "s" : ""}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5">
            <Bath size={14} className="text-sky-600" />
            {listing.baths} banho
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5">
            <Ruler size={14} className="text-sky-600" />
            {listing.area}m²
          </span>
        </div>

        <div className="flex items-end justify-between gap-3 border-t border-slate-200/70 pt-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
              Valor mensal
            </p>
            <div className="mt-1 font-display text-2xl font-bold text-slate-950">
              R$ {listing.price.toLocaleString("pt-BR")}
              <span className="ml-1 text-sm font-medium text-slate-500">
                /mês
              </span>
            </div>
          </div>

          <button
            className="button-secondary px-4 py-2 text-sm"
            onClick={handleOpen}
          >
            Ver mais
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}
