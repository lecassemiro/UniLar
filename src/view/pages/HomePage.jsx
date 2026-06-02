// ============================================================
// VIEW/PAGE — HomePage.jsx
// Responsabilidade: renderização da homepage
// SEM lógica de negócio
// ============================================================

import { useState, useEffect } from "react"
import { useApp } from "../../context/AppContext"
import PropertyCard from "../components/PropertyCard"
import { executeSearch } from "../../controller/SearchController"
import { navigateTo } from "../../controller/NavigationController"
import { LISTING_TYPES } from "../../model/ListingModel"
import {
  ArrowRight,
  BadgeInfo,
  Building2,
  MapPinned,
  Search,
  Sparkles,
  GraduationCap,
  ClipboardList,
  MessageSquareMore,
  ShieldCheck,
  Home as HomeIcon,
} from "lucide-react"

function useCounter(target, duration = 1500, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return

    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [target, duration, start])

  return count
}

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: Search,
    title: "Busque seu imóvel",
    desc: "Filtre por cidade, tipo e orçamento para encontrar a moradia ideal perto da sua universidade.",
  },
  {
    step: "02",
    icon: ClipboardList,
    title: "Veja os detalhes",
    desc: "Acesse todas as informações do imóvel com uma leitura rápida e objetiva.",
  },
  {
    step: "03",
    icon: MessageSquareMore,
    title: "Entre em contato",
    desc: "Fale diretamente com o anunciante via WhatsApp, sem intermediários.",
  },
  {
    step: "04",
    icon: GraduationCap,
    title: "Feche o negócio",
    desc: "Assine o contrato e comece a morar pertinho do campus.",
  },
]

const FEATURED_CITIES = [
  { name: "São Paulo", count: "2 imóveis" },
  { name: "Belo Horizonte", count: "2 imóveis" },
  { name: "Campinas", count: "1 imóvel" },
  { name: "Florianópolis", count: "1 imóvel" },
]

export default function HomePage() {
  const { state, dispatch } = useApp()
  const [search, setSearch] = useState("")
  const [type, setType] = useState("todos")
  const [maxPrice, setMaxPrice] = useState("")
  const [statsVisible, setStatsVisible] = useState(false)

  const count1 = useCounter(8, 1200, statsVisible)
  const count2 = useCounter(500, 1600, statsVisible)
  const count3 = useCounter(4, 1000, statsVisible)

  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 600)
    return () => clearTimeout(timer)
  }, [])

  const handleSearch = () => {
    executeSearch(dispatch, { search, type, maxPrice })
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch()
  }

  const featuredListings = state.listings.slice(0, 4)

  return (
    <div className="page-container space-y-8 py-8 sm:py-12">
      <section className="hero-panel p-6 sm:p-10 lg:p-12">
        <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <span className="pill w-fit bg-white/90 text-sky-700">
              <Sparkles size={14} />A plataforma para moradia universitária
            </span>

            <div className="space-y-4">
              <h1 className="font-display text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Encontre moradia perto do campus com um design limpo e direto.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Quartos, kitnets, apartamentos e casas reunidos em uma
                experiência simples, rápida e sem ruído.
              </p>
            </div>

            <div className="surface p-3 sm:p-4">
              <div className="grid gap-3 lg:grid-cols-[1.4fr_0.9fr_0.6fr_auto]">
                <input
                  type="text"
                  placeholder="Cidade ou bairro"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="input-shell"
                />

                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="input-shell"
                >
                  {LISTING_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder="R$ máx."
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="input-shell"
                />

                <button onClick={handleSearch} className="button-primary">
                  Buscar
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {FEATURED_CITIES.map((city) => (
                <button
                  key={city.name}
                  onClick={() =>
                    executeSearch(dispatch, {
                      search: city.name,
                      type: "todos",
                      maxPrice: "",
                    })
                  }
                  className="pill"
                >
                  <MapPinned size={14} />
                  {city.name}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="surface-strong p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4 border-b border-slate-200/70 pb-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Resumo rápido
                  </p>
                  <h2 className="font-display text-2xl font-bold text-slate-950">
                    Busca inteligente
                  </h2>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                  <Building2 size={22} />
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <p className="text-sm font-medium text-slate-500">
                    Imóveis ativos
                  </p>
                  <p className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
                    {state.listings.length}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <p className="text-sm font-medium text-slate-500">
                    Favoritos salvos
                  </p>
                  <p className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
                    {state.favorites.length}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-sky-100 bg-sky-50/70 p-4 text-sm text-slate-600">
                <div className="flex items-center gap-2 font-semibold text-sky-700">
                  <BadgeInfo size={16} />
                  Interface minimalista
                </div>
                <p className="mt-2 leading-6">
                  Espaço, contraste e foco no que importa: encontrar, comparar e
                  decidir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          {
            count: count1,
            suffix: "+",
            label: "Imóveis disponíveis",
            icon: HomeIcon,
          },
          {
            count: count2,
            suffix: "+",
            label: "Universitários atendidos",
            icon: GraduationCap,
          },
          {
            count: count3,
            suffix: "",
            label: "Estados cobertos",
            icon: ShieldCheck,
          },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="section-card-soft p-6">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-sm font-medium">{stat.label}</span>
                <Icon size={18} className="text-sky-600" />
              </div>
              <div className="mt-4 text-4xl font-bold tracking-tight text-slate-950">
                {stat.count}
                {stat.suffix}
              </div>
            </div>
          )
        })}
      </section>

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
              Destaques
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-slate-950">
              Imóveis mais buscados
            </h2>
          </div>
          <button
            onClick={() => navigateTo(dispatch, "listings")}
            className="button-secondary hidden sm:inline-flex"
          >
            Ver todos
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {featuredListings.map((listing) => (
            <PropertyCard key={listing.id} listing={listing} />
          ))}
        </div>

        <div className="sm:hidden">
          <button
            onClick={() => navigateTo(dispatch, "listings")}
            className="button-primary w-full"
          >
            Ver todos os imóveis
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <section className="space-y-5">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            Como funciona
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-slate-950">
            Quatro passos, sem distração
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          {HOW_IT_WORKS.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.step} className="section-card-soft p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
                    Passo {item.step}
                  </span>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                    <Icon size={18} />
                  </div>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.desc}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="section-card overflow-hidden p-6 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
              Anuncie também
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-slate-950">
              Tem um imóvel para alugar?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Cadastre gratuitamente e alcance estudantes procurando uma solução
              objetiva, confiável e direta.
            </p>
          </div>
          <button
            onClick={() => navigateTo(dispatch, "register")}
            className="button-primary w-full lg:w-auto"
          >
            Anunciar gratuitamente
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  )
}
