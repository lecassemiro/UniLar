// ============================================================
// App.jsx — Raiz da aplicação UniLar
// Roteamento interno SPA por estado, sem React Router
// ============================================================

import { AppProvider, useApp } from "./context/AppContext";
import Navbar from "./view/components/Navbar";
import Toast from "./view/components/Toast";
import PropertyModal from "./view/components/PropertyModal";
import HomePage from "./view/pages/HomePage";
import ListingsPage from "./view/pages/ListingsPage";
import FavoritesPage from "./view/pages/FavoritesPage";
import ProfilePage from "./view/pages/ProfilePage";
import RegisterPage from "./view/pages/RegisterPage";

// Page router
function Router() {
  const { state } = useApp();

  const pages = {
    home: <HomePage />,
    listings: <ListingsPage />,
    favorites: <FavoritesPage />,
    profile: <ProfilePage />,
    register: <RegisterPage />,
  };

  return pages[state.currentPage] || <HomePage />;
}

// Inner app (needs context)
function AppInner() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#F7F6FF", minHeight: "100vh" }}>
      <Navbar />
      <main>
        <Router />
      </main>
      <PropertyModal />
      <Toast />

      {/* Footer */}
      <footer
        className="py-8 px-4 text-center text-xs text-gray-400 border-t border-purple-100"
        style={{ background: "white", fontFamily: "'DM Sans', sans-serif" }}
      >
        <p className="mb-1">
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#534AB7" }}>
            UniLar
          </span>{" "}
          — Moradia universitária simplificada 🎓
        </p>
        <p>© {new Date().getFullYear()} UniLar. Feito com ❤️ para universitários brasileiros.</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
