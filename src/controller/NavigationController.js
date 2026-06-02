// ============================================================
// CONTROLLER — NavigationController.js
// Controle de navegação SPA sem React Router
// SEM JSX, recebe dispatch como parâmetro
// ============================================================

import { ACTIONS } from "../context/AppContext"
import { House, Search, Heart, PlusCircle, UserRound } from "lucide-react"

export const PAGES = {
  HOME: "home",
  LISTINGS: "listings",
  FAVORITES: "favorites",
  PROFILE: "profile",
  REGISTER: "register",
}

export function navigateTo(dispatch, page) {
  if (!Object.values(PAGES).includes(page)) {
    console.warn(`NavigationController: página desconhecida "${page}"`)
    return
  }
  dispatch({ type: ACTIONS.NAVIGATE, payload: page })
  // Scroll ao topo na troca de página
  window.scrollTo({ top: 0, behavior: "smooth" })
}

export function navigateToListings(dispatch, filters = {}) {
  Object.entries(filters).forEach(([key, value]) => {
    dispatch({ type: ACTIONS.SET_FILTER, payload: { key, value } })
  })
  navigateTo(dispatch, PAGES.LISTINGS)
}

export const NAV_ITEMS = [
  { page: PAGES.HOME, label: "Início", icon: House },
  { page: PAGES.FAVORITES, label: "Favoritos", icon: Heart },
  { page: PAGES.PROFILE, label: "Perfil", icon: UserRound },
]
