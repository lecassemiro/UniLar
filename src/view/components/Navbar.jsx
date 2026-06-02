// ============================================================
// VIEW/COMPONENT — Navbar.jsx
// Responsabilidade: renderização da barra de navegação
// SEM lógica de negócio
// ============================================================

import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { navigateTo, NAV_ITEMS, PAGES } from "../../controller/NavigationController";

export default function Navbar() {
  const { state, dispatch } = useApp();
  const { currentPage, favorites } = state;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (page) => {
    navigateTo(dispatch, page);
    setMobileOpen(false);
  };

  return (
    <nav style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)" }}
      className="sticky top-0 z-50 border-b border-purple-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNav(PAGES.HOME)}
            className="flex items-center gap-2 group"
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-md"
              style={{ background: "linear-gradient(135deg, #534AB7, #378ADD)" }}
            >
              U
            </div>
            <span
              className="text-xl font-extrabold tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif", color: "#26215C" }}
            >
              Uni<span style={{ color: "#534AB7" }}>Lar</span>
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.page;
              const showBadge = item.page === PAGES.FAVORITES && favorites.length > 0;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNav(item.page)}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white shadow-md"
                      : "text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                  }`}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: isActive ? "linear-gradient(135deg, #534AB7, #378ADD)" : undefined,
                  }}
                >
                  <span className="mr-1">{item.icon}</span>
                  {item.label}
                  {showBadge && (
                    <span
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center font-bold"
                      style={{ background: "#ef4444", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {favorites.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-purple-50 transition-colors"
            aria-label="Menu"
          >
            <div className="w-5 flex flex-col gap-1">
              <span
                className={`block h-0.5 bg-gray-600 transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`}
              />
              <span
                className={`block h-0.5 bg-gray-600 transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 bg-gray-600 transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t border-purple-100 py-3 px-4"
          style={{ background: "rgba(255,255,255,0.98)" }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.page;
            const showBadge = item.page === PAGES.FAVORITES && favorites.length > 0;
            return (
              <button
                key={item.page}
                onClick={() => handleNav(item.page)}
                className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-sm font-medium transition-all ${
                  isActive
                    ? "text-white"
                    : "text-gray-700 hover:bg-purple-50"
                }`}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  background: isActive ? "linear-gradient(135deg, #534AB7, #378ADD)" : undefined,
                }}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
                {showBadge && (
                  <span
                    className="ml-auto w-5 h-5 rounded-full text-white text-xs flex items-center justify-center font-bold"
                    style={{ background: "#ef4444" }}
                  >
                    {favorites.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
