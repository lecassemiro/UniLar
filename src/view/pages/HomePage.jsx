// ============================================================
// VIEW/PAGE — HomePage.jsx
// Responsabilidade: renderização da homepage
// SEM lógica de negócio
// ============================================================

import { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import PropertyCard from "../components/PropertyCard";
import { executeSearch } from "../../controller/SearchController";
import { navigateTo } from "../../controller/NavigationController";
import { LISTING_TYPES } from "../../model/ListingModel";

// Animated counter hook
function useCounter(target, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

const HOW_IT_WORKS = [
  { step: "01", icon: "🔍", title: "Busque seu imóvel", desc: "Filtre por cidade, tipo e orçamento para encontrar a moradia ideal perto da sua universidade." },
  { step: "02", icon: "📋", title: "Veja os detalhes", desc: "Acesse todas as informações do imóvel: comodidades, fotos, localização e preço." },
  { step: "03", icon: "💬", title: "Entre em contato", desc: "Fale diretamente com o anunciante via WhatsApp, sem intermediários." },
  { step: "04", icon: "🎓", title: "Feche o negócio", desc: "Assine o contrato e comece a morar pertinho do campus. Simples assim!" },
];

const FEATURED_CITIES = [
  { name: "São Paulo", emoji: "🏙️", count: "2 imóveis" },
  { name: "Belo Horizonte", emoji: "⛰️", count: "2 imóveis" },
  { name: "Campinas", emoji: "🌿", count: "1 imóvel" },
  { name: "Florianópolis", emoji: "🌊", count: "1 imóvel" },
];

export default function HomePage() {
  const { state, dispatch } = useApp();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("todos");
  const [maxPrice, setMaxPrice] = useState("");
  const [statsVisible, setStatsVisible] = useState(false);

  const count1 = useCounter(8, 1200, statsVisible);
  const count2 = useCounter(500, 1600, statsVisible);
  const count3 = useCounter(4, 1000, statsVisible);

  // Trigger stats animation when in view
  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = () => {
    executeSearch(dispatch, { search, type, maxPrice });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const featuredListings = state.listings.slice(0, 4);

  return (
    <div style={{ background: "#F7F6FF", minHeight: "100vh" }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-16 sm:py-24 px-4"
        style={{ background: "linear-gradient(135deg, #26215C 0%, #534AB7 55%, #185FA5 100%)" }}
      >
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Decorative blobs */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: "#378ADD", transform: "translate(40%, -40%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-10"
          style={{ background: "#534AB7", transform: "translate(-30%, 30%)" }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 text-white/80 text-xs font-medium px-4 py-2 rounded-full mb-6 border border-white/20"
            style={{ background: "rgba(255,255,255,0.1)", fontFamily: "'DM Sans', sans-serif" }}
          >
            🎓 A plataforma #1 para universitários
          </div>

          <h1
            className="text-4xl sm:text-6xl font-extrabold text-white mb-5 leading-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Sua moradia ideal
            <br />
            <span style={{ color: "#93c5fd" }}>perto do campus</span>
          </h1>

          <p
            className="text-white/75 text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
          >
            Quartos, kitnets, apartamentos e casas para universitários.
            Filtre por cidade, universidade e orçamento. Sem taxa de cadastro.
          </p>

          {/* Search box */}
          <div
            className="bg-white rounded-2xl p-4 shadow-2xl max-w-3xl mx-auto"
            style={{ boxShadow: "0 24px 64px rgba(38,33,92,0.35)" }}
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="🔍 Cidade ou bairro..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 px-4 py-3 rounded-xl text-sm outline-none border border-gray-200 focus:border-purple-400 transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "#26215C" }}
              />
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="px-4 py-3 rounded-xl text-sm border border-gray-200 focus:border-purple-400 transition-colors outline-none bg-white"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "#26215C" }}
              >
                {LISTING_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="R$ máx."
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full sm:w-32 px-4 py-3 rounded-xl text-sm border border-gray-200 focus:border-purple-400 transition-colors outline-none"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "#26215C" }}
              />
              <button
                onClick={handleSearch}
                className="px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200 flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #534AB7, #378ADD)",
                  fontFamily: "'DM Sans', sans-serif",
                  boxShadow: "0 4px 16px rgba(83,74,183,0.5)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                Buscar
              </button>
            </div>
          </div>

          {/* Quick city chips */}
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {FEATURED_CITIES.map((c) => (
              <button
                key={c.name}
                onClick={() => executeSearch(dispatch, { search: c.name, type: "todos", maxPrice: "" })}
                className="flex items-center gap-1.5 text-white/70 hover:text-white text-xs px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-white/10 border border-white/20"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {c.emoji} {c.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATISTICS ────────────────────────────────────────── */}
      <section className="py-10 px-4" style={{ background: "white" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4">
          {[
            { count: count1, suffix: "+", label: "Imóveis disponíveis", icon: "🏠" },
            { count: count2, suffix: "+", label: "Universitários atendidos", icon: "🎓" },
            { count: count3, suffix: "", label: "Estados cobertos", icon: "📍" },
          ].map((s) => (
            <div key={s.label} className="text-center py-4">
              <div className="text-2xl mb-2">{s.icon}</div>
              <div
                className="text-3xl sm:text-4xl font-extrabold mb-1"
                style={{ fontFamily: "'Syne', sans-serif", color: "#534AB7" }}
              >
                {s.count}{s.suffix}
              </div>
              <div
                className="text-xs sm:text-sm text-gray-500"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED LISTINGS ─────────────────────────────────── */}
      <section className="py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2
                className="text-2xl sm:text-3xl font-extrabold"
                style={{ fontFamily: "'Syne', sans-serif", color: "#26215C" }}
              >
                🔥 Destaques
              </h2>
              <p
                className="text-sm text-gray-500 mt-1"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Os imóveis mais buscados da semana
              </p>
            </div>
            <button
              onClick={() => navigateTo(dispatch, "listings")}
              className="text-sm font-semibold transition-colors hidden sm:block"
              style={{ color: "#534AB7", fontFamily: "'DM Sans', sans-serif" }}
            >
              Ver todos →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredListings.map((listing) => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <button
              onClick={() => navigateTo(dispatch, "listings")}
              className="px-8 py-3 rounded-xl text-white font-semibold text-sm"
              style={{
                background: "linear-gradient(135deg, #534AB7, #378ADD)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Ver todos os imóveis
            </button>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section className="py-14 px-4" style={{ background: "white" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-2xl sm:text-3xl font-extrabold mb-3"
              style={{ fontFamily: "'Syne', sans-serif", color: "#26215C" }}
            >
              Como funciona?
            </h2>
            <p
              className="text-sm text-gray-500 max-w-md mx-auto"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Em 4 passos simples você encontra e garante sua moradia universitária
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((item, i) => (
              <div key={item.step} className="relative">
                {/* Connector line */}
                {i < HOW_IT_WORKS.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-10 left-full w-full h-0.5 z-0"
                    style={{
                      background: "linear-gradient(to right, #534AB740, transparent)",
                      width: "calc(100% - 40px)",
                      left: "calc(50% + 28px)",
                    }}
                  />
                )}
                <div
                  className="relative z-10 p-5 rounded-2xl text-center"
                  style={{ background: "#F7F6FF" }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 shadow-md"
                    style={{ background: "linear-gradient(135deg, #534AB7, #378ADD)" }}
                  >
                    {item.icon}
                  </div>
                  <span
                    className="text-xs font-bold mb-2 block"
                    style={{ color: "#534AB780", fontFamily: "'Syne', sans-serif" }}
                  >
                    PASSO {item.step}
                  </span>
                  <h3
                    className="font-bold text-sm mb-2"
                    style={{ fontFamily: "'Syne', sans-serif", color: "#26215C" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-xs text-gray-500 leading-relaxed"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────── */}
      <section className="py-14 px-4">
        <div
          className="max-w-4xl mx-auto rounded-3xl p-10 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #26215C, #534AB7, #185FA5)" }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative">
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-white mb-4"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Tem um imóvel para alugar?
            </h2>
            <p
              className="text-white/70 text-sm mb-7 max-w-md mx-auto"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
            >
              Cadastre seu imóvel gratuitamente e alcance milhares de universitários buscando moradia.
            </p>
            <button
              onClick={() => navigateTo(dispatch, "register")}
              className="px-8 py-4 rounded-xl font-bold text-sm transition-all duration-200"
              style={{
                background: "white",
                color: "#534AB7",
                fontFamily: "'DM Sans', sans-serif",
                boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              Anunciar gratuitamente →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
