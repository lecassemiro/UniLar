// ============================================================
// VIEW/COMPONENT — EmptyState.jsx
// Responsabilidade: estado vazio genérico e reutilizável
// ============================================================

import { Search } from "lucide-react"

export default function EmptyState({
  icon = Search,
  title,
  description,
  action,
}) {
  const Icon = icon
  const iconIsString = typeof icon === "string"

  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-[1.75rem] border border-sky-100 bg-sky-50 text-sky-700 shadow-sm">
        {iconIsString ? (
          <span className="text-5xl">{icon}</span>
        ) : (
          <Icon size={40} strokeWidth={1.8} />
        )}
      </div>
      <h3 className="font-display mb-3 text-2xl font-bold text-slate-950">
        {title}
      </h3>
      {description && (
        <p className="mb-6 max-w-sm text-sm leading-7 text-slate-600">
          {description}
        </p>
      )}
      {action && (
        <button onClick={action.onClick} className="button-primary">
          {action.label}
        </button>
      )}
    </div>
  )
}
