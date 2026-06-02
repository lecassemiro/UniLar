import { useState } from "react"
import { useApp } from "../../context/AppContext"
import { submitListing, EMPTY_FORM } from "../../controller/RegisterController"
import { navigateTo } from "../../controller/NavigationController"
import { LISTING_TYPES } from "../../model/ListingModel"
import {
  HousePlus,
  Send,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  MapPin,
  Bath,
  BedDouble,
  Ruler,
  Phone,
  FileText,
  Layers3,
  Building2,
  Home,
  House,
} from "lucide-react"

const TYPE_ICONS = {
  kitnet: House,
  quarto: BedDouble,
  apartamento: Building2,
  casa: Home,
}

export default function RegisterPage() {
  const { state, dispatch } = useApp()

  const [form, setForm] = useState({ ...EMPTY_FORM })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = () => {
    const result = submitListing(dispatch, form, state.listings)

    if (result.success) {
      setSubmitted(true)
      setForm({ ...EMPTY_FORM })
      setErrors({})
    } else {
      setErrors(result.errors)
    }
  }

  const Input = ({ field, label, type = "text", placeholder }) => (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <input
        type={type}
        value={form[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        placeholder={placeholder}
        className="input-shell"
      />
      {errors[field] && (
        <p className="text-xs text-rose-600">{errors[field]}</p>
      )}
    </div>
  )

  const TypeIcon = TYPE_ICONS[form.type] || House

  if (submitted) {
    return (
      <div className="page-container flex min-h-[calc(100vh-8rem)] items-center justify-center py-10">
        <div className="surface-strong w-full max-w-lg p-8 text-center sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 size={30} />
          </div>
          <h1 className="font-display mt-6 text-3xl font-bold text-slate-950">
            Imóvel publicado
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Seu anúncio já está disponível para os estudantes.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => setSubmitted(false)}
              className="button-secondary flex-1"
            >
              <RotateCcw size={16} />
              Novo anúncio
            </button>
            <button
              onClick={() => navigateTo(dispatch, "listings")}
              className="button-primary flex-1"
            >
              Ver imóveis
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container space-y-6 py-8 sm:py-12">
      <section className="section-card p-6 sm:p-8">
        <span className="pill w-fit bg-sky-50 text-sky-700">
          <HousePlus size={14} />
          Publicação rápida
        </span>
        <div className="mt-4">
          <h1 className="font-display text-3xl font-bold text-slate-950 sm:text-4xl">
            Anunciar imóvel
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
            Cadastre sua moradia e encontre estudantes interessados sem ruído
            visual e sem etapas desnecessárias.
          </p>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <section className="section-card p-6 sm:p-8">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            <FileText size={14} />
            Dados do imóvel
          </div>

          <div className="mt-6 space-y-5">
            <Input
              field="title"
              label="Título"
              placeholder="Ex: Kitnet mobiliada perto da USP"
            />

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Tipo do imóvel
              </label>
              <select
                value={form.type}
                onChange={(e) => handleChange("type", e.target.value)}
                className="input-shell"
              >
                {LISTING_TYPES.filter((t) => t.value !== "todos").map(
                  (item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ),
                )}
              </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Input field="city" label="Cidade" placeholder="São Paulo" />
              <Input
                field="neighborhood"
                label="Bairro"
                placeholder="Butantã"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                field="price"
                label="Preço"
                type="number"
                placeholder="750"
              />
              <Input field="area" label="Área" type="number" placeholder="30" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                field="rooms"
                label="Quartos"
                type="number"
                placeholder="1"
              />
              <Input
                field="baths"
                label="Banheiros"
                type="number"
                placeholder="1"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Descrição
              </label>
              <textarea
                rows={5}
                value={form.desc}
                onChange={(e) => handleChange("desc", e.target.value)}
                placeholder="Descreva seu imóvel..."
                className="input-shell resize-none"
              />
              {errors.desc && (
                <p className="text-xs text-rose-600">{errors.desc}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Comodidades
              </label>
              <input
                value={form.amenities}
                onChange={(e) => handleChange("amenities", e.target.value)}
                placeholder="Wi-Fi, Mobiliado, Garagem..."
                className="input-shell"
              />
            </div>

            <Input
              field="contact"
              label="Telefone / WhatsApp"
              placeholder="(11) 99999-9999"
            />

            <button onClick={handleSubmit} className="button-primary w-full">
              <Send size={16} />
              Publicar anúncio
            </button>
          </div>
        </section>

        <aside className="section-card overflow-hidden lg:sticky lg:top-24">
          <div className="flex h-40 items-center justify-center bg-gradient-to-br from-sky-50 to-sky-100 text-sky-700">
            <TypeIcon size={56} strokeWidth={1.8} />
          </div>

          <div className="space-y-5 p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                Prévia do anúncio
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-slate-950">
                {form.title || "Título do anúncio"}
              </h2>
            </div>

            <div className="space-y-2 text-sm text-slate-600">
              <p className="flex items-center gap-2">
                <MapPin size={14} className="text-sky-600" />
                {form.neighborhood || "Bairro"}, {form.city || "Cidade"}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="pill">
                  <BedDouble size={14} /> {form.rooms || 0} quartos
                </span>
                <span className="pill">
                  <Bath size={14} /> {form.baths || 0} banheiros
                </span>
                <span className="pill">
                  <Ruler size={14} /> {form.area || 0}m²
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-sky-700">
                Valor
              </p>
              <div className="mt-1 font-display text-3xl font-bold text-slate-950">
                R$ {form.price || 0}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-sm leading-7 text-slate-600">
              {form.desc || "A descrição aparecerá aqui conforme você digita."}
            </div>

            <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
              <div className="flex items-center gap-2 font-semibold text-slate-900">
                <Layers3 size={14} className="text-sky-600" />
                Checklist rápido
              </div>
              <p>• Nome objetivo e direto</p>
              <p>• Preço visível sem esforço</p>
              <p>• Contato fácil de acessar</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
