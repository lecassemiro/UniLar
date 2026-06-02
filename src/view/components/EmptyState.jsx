// ============================================================
// VIEW/COMPONENT — EmptyState.jsx
// Responsabilidade: estado vazio genérico e reutilizável
// ============================================================

export default function EmptyState({ icon = "🔍", title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div
        className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl mb-6 shadow-inner"
        style={{ background: "linear-gradient(135deg, #534AB715, #378ADD15)" }}
      >
        {icon}
      </div>
      <h3
        className="text-xl font-bold mb-3"
        style={{ fontFamily: "'Syne', sans-serif", color: "#26215C" }}
      >
        {title}
      </h3>
      {description && (
        <p
          className="text-sm text-gray-500 max-w-xs leading-relaxed mb-6"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {description}
        </p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg"
          style={{
            background: "linear-gradient(135deg, #534AB7, #378ADD)",
            fontFamily: "'DM Sans', sans-serif",
            transform: "translateY(0)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
