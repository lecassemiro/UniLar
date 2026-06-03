// ============================================================
// VIEW — ScorePanel.jsx
// Score de Vida Universitária — widget compacto para o modal.
// Encaixa na coluna direita sem alterar o tamanho do card.
// ============================================================

import { useMemo } from "react"
import { getScore, getPilarBarColor } from "../../controller/ScoreController"

export default function ScorePanel({ listing }) {
  const score = useMemo(() => getScore(listing), [listing])
  if (!score) return null

  const pilares = Object.values(score.breakdown)

  // Cor do número principal
  const scoreColor =
    score.total >= 85 ? "text-emerald-600" :
    score.total >= 70 ? "text-sky-600"     :
    score.total >= 55 ? "text-amber-500"   :
    score.total >= 40 ? "text-orange-500"  :
                        "text-red-500"

  return (
    <div className="section-card-soft p-5 space-y-4">

      {/* Título + número */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Score Universitário
          </p>
          <div className="flex items-end gap-1 mt-0.5">
            <span className={`font-display text-4xl font-extrabold leading-none ${scoreColor}`}>
              {score.total}
            </span>
            <span className="text-slate-400 text-sm mb-0.5">/100</span>
          </div>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-600">
          {score.label}
        </span>
      </div>

      {/* Barras compactas dos 5 pilares */}
      <div className="space-y-2.5">
        {pilares.map((p) => (
          <div key={p.nome}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-slate-500">
                {p.icone} {p.nome}
              </span>
              <span className="text-xs font-semibold text-slate-700 tabular-nums">
                {p.score}
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${getPilarBarColor(p.score)}`}
                style={{ width: `${p.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Insight — apenas uma linha */}
      <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
        {score.insight}
      </p>

    </div>
  )
}
