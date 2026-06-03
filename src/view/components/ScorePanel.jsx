// ============================================================
// VIEW — ScorePanel.jsx
// Exibe o Score de Vida Universitária dentro do modal.
// Recebe `listing` como prop e delega cálculo ao Controller.
// ============================================================

import { useMemo } from "react"
import { getScore, getScoreColorClasses, getPilarBarColor } from "../../controller/ScoreController"

// ── Barra de progresso animada por pilar ───
function PilarBar({ pilar }) {
  const barColor = getPilarBarColor(pilar.score)

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
          <span>{pilar.icone}</span>
          {pilar.nome}
          <span className="text-xs text-slate-400 font-normal">({pilar.peso}%)</span>
        </span>
        <span className="text-sm font-bold text-slate-800 tabular-nums">{pilar.score}</span>
      </div>

      {/* Barra de fundo */}
      <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${barColor}`}
          style={{ width: `${pilar.score}%` }}
        />
      </div>

      <p className="text-xs text-slate-500 leading-snug">{pilar.valor}</p>
    </div>
  )
}

// ── Componente principal ─────────────────────────────────────
export default function ScorePanel({ listing }) {
  // Cálculo memoizado — só recalcula se o listing mudar
  const score = useMemo(() => getScore(listing), [listing])

  if (!score) return null

  const cls = getScoreColorClasses(score.color)
  const pilares = Object.values(score.breakdown)

  return (
    <div className={`rounded-2xl border ${cls.border} ${cls.bg} p-5 space-y-5`}>

      {/* ── Cabeçalho: número + label ── */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
            Score de Vida Universitária
          </p>
          <div className="flex items-end gap-2">
            <span className={`font-display text-5xl font-extrabold leading-none ${cls.textStrong}`}>
              {score.total}
            </span>
            <span className="text-slate-400 text-lg font-medium mb-0.5">/100</span>
          </div>
        </div>

        <div className={`flex flex-col items-center justify-center rounded-2xl px-4 py-2 ring-1 ${cls.ring} ${cls.badge}`}>
          <span className="text-lg font-bold leading-tight">{score.label}</span>
          <span className="text-xs opacity-70">custo-benefício</span>
        </div>
      </div>

      {/* ── Barra geral ── */}
      <div className="h-2.5 w-full rounded-full bg-white/60 overflow-hidden ring-1 ring-white">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${cls.bar}`}
          style={{ width: `${score.total}%` }}
        />
      </div>

      {/* ── Separador ── */}
      <div className={`border-t ${cls.border}`} />

      {/* ── Pilares detalhados ── */}
      <div className="space-y-4">
        {pilares.map((pilar) => (
          <PilarBar key={pilar.nome} pilar={pilar} />
        ))}
      </div>

      {/* ── Separador ── */}
      <div className={`border-t ${cls.border}`} />

      {/* ── Alerta de transporte caro ── */}
      {score.alertaTransporte && (
        <div className="flex items-start gap-2 rounded-xl bg-orange-50 border border-orange-200 px-3 py-2.5">
          <span className="text-base mt-0.5">⚠️</span>
          <p className="text-xs text-orange-800 leading-relaxed font-medium">
            O custo de transporte representa mais de 40% do valor do aluguel. O custo real mensal é significativamente maior.
          </p>
        </div>
      )}

      {/* ── Insight dinâmico ── */}
      <div className={`flex items-start gap-2 rounded-xl border ${cls.border} bg-white/60 px-3 py-2.5`}>
        <span className="text-base mt-0.5">💡</span>
        <p className={`text-xs leading-relaxed ${cls.textStrong}`}>
          {score.insight}
        </p>
      </div>

    </div>
  )
}
