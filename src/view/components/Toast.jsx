// ============================================================
// VIEW/COMPONENT — Toast.jsx
// Responsabilidade: notificação flutuante animada
// ============================================================

import { useApp } from "../../context/AppContext";
import { ACTIONS } from "../../context/AppContext";

const TYPE_STYLES = {
  success: { bg: "#22c55e", icon: "✅" },
  info: { bg: "#378ADD", icon: "ℹ️" },
  error: { bg: "#ef4444", icon: "❌" },
  warning: { bg: "#f59e0b", icon: "⚠️" },
};

export default function Toast() {
  const { state, dispatch } = useApp();
  const { toast } = state;

  const style = TYPE_STYLES[toast.type] || TYPE_STYLES.success;

  return (
    <div
      className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl text-white text-sm font-medium transition-all duration-500 max-w-xs ${
        toast.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      style={{
        background: style.bg,
        fontFamily: "'DM Sans', sans-serif",
        transform: toast.visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.95)",
        transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      <span className="text-lg flex-shrink-0">{style.icon}</span>
      <span className="leading-snug">{toast.message}</span>
      <button
        onClick={() => dispatch({ type: ACTIONS.HIDE_TOAST })}
        className="ml-2 opacity-70 hover:opacity-100 transition-opacity text-lg leading-none flex-shrink-0"
        aria-label="Fechar"
      >
        ×
      </button>
    </div>
  );
}
