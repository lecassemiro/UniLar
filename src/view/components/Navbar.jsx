// ============================================================
// VIEW/COMPONENT — Navbar.jsx
// Responsabilidade: renderização da barra de navegação
// SEM lógica de negócio
// ============================================================

import { useState } from "react"
import { useApp } from "../../context/AppContext"
import {
  navigateTo,
  NAV_ITEMS,
  PAGES,
} from "../../controller/NavigationController"
import { Menu, PanelTopClose, House, Search } from "lucide-react"

export default function Navbar() {
  const { state, dispatch } = useApp()
  const { currentPage, favorites } = state
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNav = (page) => {
    navigateTo(dispatch, page)
    setMobileOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="page-container">
        <div className="flex h-20 items-center justify-between py-4">
          <button
            type="button"
            onClick={() => handleNav(PAGES.HOME)}
            className="flex items-center gap-3 group focus-ring"
            aria-label="Ir para a Home"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-[0_12px_24px_rgba(37,99,235,0.2)]">
              <House size={18} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                Uni<span className="text-sky-600">Lar</span>
              </span>
              <small className="text-[11px] text-slate-500 -mt-0.5">
                Moradia universitária
              </small>
            </div>
          </button>

          <div className="hidden items-center gap-2 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.page
              const showBadge =
                item.page === PAGES.FAVORITES && favorites.length > 0
              const Icon = item.icon
              return (
                <button
                  type="button"
                  key={item.page}
                  onClick={() => handleNav(item.page)}
                  className={`relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    isActive ? "chip-active" : "chip"
                  } focus-ring`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon size={16} strokeWidth={2.2} />
                  {item.label}
                  {showBadge && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[11px] font-bold text-white">
                      {favorites.length}
                    </span>
                  )}
                </button>
              )
            })}
            <button
              type="button"
              onClick={() => navigateTo(dispatch, PAGES.LISTINGS)}
              className="ml-2 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold button-primary"
            >
              <Search size={16} />
              Buscar imóveis
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 focus-ring"
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <PanelTopClose size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-slate-200/80 bg-white/95 px-4 py-3 backdrop-blur-md md:hidden animate-slide-up">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.page
            const showBadge =
              item.page === PAGES.FAVORITES && favorites.length > 0
            const Icon = item.icon
            return (
              <button
                type="button"
                key={item.page}
                onClick={() => handleNav(item.page)}
                className={`relative mb-1 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                  isActive ? "chip-active justify-start" : "chip justify-start"
                } focus-ring`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon size={16} strokeWidth={2.2} />
                {item.label}
                {showBadge && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[11px] font-bold text-white">
                    {favorites.length}
                  </span>
                )}
              </button>
            )
          })}
          <div className="mt-2">
            <button
              type="button"
              onClick={() => navigateTo(dispatch, PAGES.LISTINGS)}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold button-primary"
            >
              <Search size={16} />
              Buscar imóveis
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
