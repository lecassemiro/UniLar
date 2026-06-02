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
} from "lucide-react"
import example1 from "../../assets/example_1.png"
import example2 from "../../assets/example_2.png"
import example3 from "../../assets/example_3.png"
import example4 from "../../assets/example_4.png"

const BADGE_STYLES = {
  hot: { label: "Em alta" },
  new: { label: "Novo" },
}

const TYPE_ACCENTS = {
  kitnet: "from-sky-50 to-sky-100",
  quarto: "from-blue-50 to-blue-100",
  apartamento: "from-indigo-50 to-indigo-100",
  casa: "from-cyan-50 to-cyan-100",
}

const TYPE_IMAGES = {
  kitnet: example1,
  quarto: example2,
  apartamento: example3,
  casa: example4,
}

export default function PropertyCard({ listing }) {
  if (!listing) {
    console.warn("PropertyCard recebeu listing undefined")
    return null
  }

  const { state, dispatch } = useApp()
  const isFav = state.favorites.includes(listing.id)
  const badge = BADGE_STYLES[listing.badge]
  const listingImage = TYPE_IMAGES[listing.type]

  const handleFavorite = (e) => {
    e.stopPropagation()
    toggleFavorite(dispatch, listing.id, isFav, listing.title)
  }

  const handleOpen = () => {
    openListingModal(dispatch, listing)
  }

  return (
    <article
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          handleOpen()
        }
      }}
      onClick={handleOpen}
      aria-label={`Abrir detalhes de ${listing.title}`}
      className="card-hover section-card overflow-hidden cursor-pointer"
    >
      <div
        className={`relative h-44 overflow-hidden bg-gradient-to-br ${TYPE_ACCENTS[listing.type] || "from-sky-50 to-sky-100"}`}
      >
        {listingImage ? (
          <img
            src={listingImage}
            alt={`Foto ilustrativa de ${listing.type}`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : null}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/22 via-transparent to-transparent" />

        {badge && (
          <span className="absolute left-3 top-3 pill px-3 py-1 text-xs font-semibold text-slate-700">
            <Sparkles size={12} className="text-sky-600" />
            {badge.label}
          </span>
        )}

        <button
          type="button"
          onClick={handleFavorite}
          className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/90 text-slate-700 shadow-sm transition-all hover:scale-105 focus-ring"
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

        <div className="border-t border-slate-200/70 pt-4">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
              Valor mensal
            </p>
            <div className="mt-1 flex items-baseline gap-1 whitespace-nowrap font-display text-2xl font-bold text-slate-950">
              <span>R$</span>
              <span>{listing.price.toLocaleString("pt-BR")}</span>
              <span className="text-sm font-medium text-slate-500">/mês</span>
            </div>
          </div>

          <button
            type="button"
            className="button-secondary mt-4 w-full justify-center whitespace-nowrap px-3.5 py-2 text-sm focus-ring"
            onClick={handleOpen}
          >
            Ver mais
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </article>
  )
}
