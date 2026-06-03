import { useApp } from "../../context/AppContext"
import { closeListingModal } from "../../controller/ListingController"
import ScorePanel from "./ScorePanel"
import {
  X,
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  Phone,
  BadgeInfo,
  Sparkles,
} from "lucide-react"

export default function PropertyModal() {
  const { state, dispatch } = useApp()

  if (!state.isModalOpen || !state.selectedListing) {
    return null
  }

  const listing = state.selectedListing

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 backdrop-blur-sm"
      onClick={() => closeListingModal(dispatch)}
      role="presentation"
    >
      <div
        className="surface-strong relative w-full max-w-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200/70 p-6">
          <div className="space-y-2">
            <span className="pill w-fit bg-sky-50 text-sky-700">
              <Sparkles size={14} />
              Detalhes do imóvel
            </span>
            <h2
              id="modal-title"
              className="font-display text-3xl font-bold text-slate-950"
            >
              {listing.title}
            </h2>
            <p className="flex items-center gap-1.5 text-sm text-slate-500">
              <MapPin size={14} className="text-sky-600" />
              {listing.neighborhood}, {listing.city}
            </p>
          </div>

          <button
            onClick={() => closeListingModal(dispatch)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-5">
            <div className="rounded-3xl border border-sky-100 bg-sky-50/70 p-5">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Preço mensal
                  </p>
                  <div className="font-display mt-1 text-3xl font-bold text-slate-950">
                    R$ {listing.price.toLocaleString("pt-BR")}
                    <span className="ml-1 text-sm font-medium text-slate-500">
                      /mês
                    </span>
                  </div>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-sky-700 shadow-sm">
                  <BadgeInfo size={20} />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
                <span className="pill">
                  <BedDouble size={14} /> {listing.rooms} quartos
                </span>
                <span className="pill">
                  <Bath size={14} /> {listing.baths} banheiros
                </span>
                <span className="pill">
                  <Ruler size={14} /> {listing.area}m²
                </span>
              </div>
            </div>

            {/* Score de Vida Universitária */}
            <ScorePanel listing={listing} />

            <p className="text-sm leading-7 text-slate-600">{listing.desc}</p>

            <div className="section-card-soft p-5">
              <h3 className="font-display text-lg font-bold text-slate-950">
                Comodidades
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {listing.amenities.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="section-card-soft p-5">
              <p className="text-sm font-medium text-slate-500">Contato</p>
              <a
                href={`https://wa.me/${String(listing.contact).replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-2 font-display text-lg font-bold text-slate-950 hover:text-sky-700"
              >
                <Phone size={16} className="text-sky-600" />
                {listing.contact}
              </a>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Entre em contato diretamente com o anunciante para avançar com a
                visita ou tirar dúvidas.
              </p>
            </div>

            <button
              onClick={() => closeListingModal(dispatch)}
              className="button-primary w-full"
            >
              Fechar detalhes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
