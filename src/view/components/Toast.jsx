// ============================================================
// VIEW/COMPONENT — Toast.jsx
// Responsabilidade: notificação flutuante animada
// ============================================================

import { useApp } from "../../context/AppContext"
import { ACTIONS } from "../../context/AppContext"
import { CheckCircle2, Info, TriangleAlert, XCircle, X } from "lucide-react"

const TYPE_STYLES = {
  success: { icon: CheckCircle2, accent: "text-emerald-600" },
  info: { icon: Info, accent: "text-sky-600" },
  error: { icon: XCircle, accent: "text-rose-600" },
  warning: { icon: TriangleAlert, accent: "text-amber-600" },
}

export default function Toast() {
  const { state, dispatch } = useApp()
  const { toast } = state

  const style = TYPE_STYLES[toast.type] || TYPE_STYLES.success
  const Icon = style.icon

  return (
    <div
      className={`fixed bottom-6 right-6 z-[9999] flex max-w-sm items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-700 shadow-[0_18px_48px_rgba(15,23,42,0.16)] transition-all duration-500 ${
        toast.visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <span
        className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 ${style.accent}`}
      >
        <Icon size={18} strokeWidth={2.2} />
      </span>
      <span className="flex-1 leading-snug">{toast.message}</span>
      <button
        onClick={() => dispatch({ type: ACTIONS.HIDE_TOAST })}
        className="ml-2 inline-flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
        aria-label="Fechar"
      >
        <X size={14} />
      </button>
    </div>
  )
}
