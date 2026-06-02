// ============================================================
// CONTROLLER — SearchController.js
// Lógica de busca e navegação para listagem
// SEM JSX, recebe dispatch como parâmetro
// ============================================================

import { ACTIONS } from "../context/AppContext";

export function executeSearch(dispatch, searchParams) {
  const { search, type, maxPrice } = searchParams;

  // Aplica filtros
  if (search) dispatch({ type: ACTIONS.SET_FILTER, payload: { key: "search", value: search } });
  if (type && type !== "todos") dispatch({ type: ACTIONS.SET_FILTER, payload: { key: "type", value: type } });
  if (maxPrice) dispatch({ type: ACTIONS.SET_FILTER, payload: { key: "maxPrice", value: maxPrice } });

  // Navega para listagem
  dispatch({ type: ACTIONS.NAVIGATE, payload: "listings" });

  // Toast de feedback
  const parts = [];
  if (search) parts.push(`"${search}"`);
  if (type && type !== "todos") parts.push(type);
  if (maxPrice) parts.push(`até R$${maxPrice}`);

  const message = parts.length > 0
    ? `Buscando: ${parts.join(" · ")}`
    : "Mostrando todos os imóveis";

  dispatch({ type: ACTIONS.SHOW_TOAST, payload: { message, type: "info" } });
}

export function clearSearch(dispatch) {
  dispatch({ type: ACTIONS.RESET_FILTERS });
  dispatch({ type: ACTIONS.SHOW_TOAST, payload: { message: "Filtros limpos", type: "info" } });
}

export function quickSearch(dispatch, city) {
  dispatch({ type: ACTIONS.RESET_FILTERS });
  dispatch({ type: ACTIONS.SET_FILTER, payload: { key: "search", value: city } });
  dispatch({ type: ACTIONS.NAVIGATE, payload: "listings" });
  dispatch({
    type: ACTIONS.SHOW_TOAST,
    payload: { message: `Imóveis em ${city}`, type: "info" },
  });
}
