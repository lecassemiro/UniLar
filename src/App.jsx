// ============================================================
// App.jsx — Raiz da aplicação UniLar
// Roteamento interno SPA por estado, sem React Router
// ============================================================

import { AppProvider, useApp } from "./context/AppContext"
import Navbar from "./view/components/Navbar"
import Toast from "./view/components/Toast"
import PropertyModal from "./view/components/PropertyModal"
import HomePage from "./view/pages/HomePage"
import ListingsPage from "./view/pages/ListingsPage"
import FavoritesPage from "./view/pages/FavoritesPage"
import ProfilePage from "./view/pages/ProfilePage"
import RegisterPage from "./view/pages/RegisterPage"

// Page router
function Router() {
  const { state } = useApp()

  const pages = {
    home: <HomePage />,
    listings: <ListingsPage />,
    favorites: <FavoritesPage />,
    profile: <ProfilePage />,
    register: <RegisterPage />,
  }

  return pages[state.currentPage] || <HomePage />
}

// Inner app (needs context)
function AppInner() {
  return (
    <div className="app-shell font-body text-slate-900">
      <Navbar />
      <main className="pb-8">
        <Router />
      </main>
      <PropertyModal />
      <Toast />

      <footer className="border-t border-slate-200/80 bg-white/80 backdrop-blur-md">
        <div className="page-container flex flex-col gap-2 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-slate-900">
            UniLar
            <span className="ml-2 text-sky-600">
              moradia universitária simplificada
            </span>
          </p>
          <p>
            © {new Date().getFullYear()} UniLar. Feito para estudantes
            brasileiros.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  )
}
