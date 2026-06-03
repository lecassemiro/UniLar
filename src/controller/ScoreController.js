// ============================================================
// CONTROLLER — ScoreController.js
// Orquestra ScoreModel → View (ScorePanel)
// SEM JSX, SEM DOM. Apenas funções de orquestração.
// ============================================================

import { calculateScore } from "../model/ScoreModel";

/**
 * Retorna o score completo de um imóvel pronto para renderização.
 * @param {object} listing — objeto do imóvel (ListingModel)
 * @returns {object} score com total, label, color, breakdown, insight
 */
export function getScore(listing) {
  if (!listing) return null;
  return calculateScore(listing);
}

/**
 * Retorna as classes Tailwind de cor conforme o score.
 * Usado pela View para colorir elementos dinamicamente.
 */
export function getScoreColorClasses(color) {
  const map = {
    green:  {
      bg:        "bg-emerald-50",
      border:    "border-emerald-200",
      text:      "text-emerald-700",
      textStrong:"text-emerald-800",
      bar:       "bg-emerald-500",
      badge:     "bg-emerald-100 text-emerald-800",
      ring:      "ring-emerald-200",
    },
    blue:   {
      bg:        "bg-sky-50",
      border:    "border-sky-200",
      text:      "text-sky-700",
      textStrong:"text-sky-800",
      bar:       "bg-sky-500",
      badge:     "bg-sky-100 text-sky-800",
      ring:      "ring-sky-200",
    },
    yellow: {
      bg:        "bg-amber-50",
      border:    "border-amber-200",
      text:      "text-amber-700",
      textStrong:"text-amber-800",
      bar:       "bg-amber-400",
      badge:     "bg-amber-100 text-amber-800",
      ring:      "ring-amber-200",
    },
    orange: {
      bg:        "bg-orange-50",
      border:    "border-orange-200",
      text:      "text-orange-700",
      textStrong:"text-orange-800",
      bar:       "bg-orange-400",
      badge:     "bg-orange-100 text-orange-800",
      ring:      "ring-orange-200",
    },
    red:    {
      bg:        "bg-red-50",
      border:    "border-red-200",
      text:      "text-red-700",
      textStrong:"text-red-800",
      bar:       "bg-red-500",
      badge:     "bg-red-100 text-red-800",
      ring:      "ring-red-200",
    },
  };
  return map[color] ?? map.yellow;
}

/**
 * Retorna cor de barra individual por score do pilar.
 * Independente da cor geral do score.
 */
export function getPilarBarColor(score) {
  if (score >= 75) return "bg-emerald-500";
  if (score >= 55) return "bg-sky-500";
  if (score >= 40) return "bg-amber-400";
  return "bg-red-400";
}
