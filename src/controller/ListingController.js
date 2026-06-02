// ============================================================
// CONTROLLER — ListingController.js
// Orquestração entre Model e View para imóveis
// SEM JSX, recebe dispatch como parâmetro
// ============================================================

import { ACTIONS } from "../context/AppContext";
import { filterListings, sortListings } from "../model/ListingModel";

export function openListingModal(dispatch, listing) {
  dispatch({ type: ACTIONS.OPEN_MODAL, payload: listing });
}

export function closeListingModal(dispatch) {
  dispatch({ type: ACTIONS.CLOSE_MODAL });
}

export function toggleFavorite(dispatch, listingId, isFav, listingTitle) {
  dispatch({ type: ACTIONS.TOGGLE_FAVORITE, payload: listingId });
  const message = isFav
    ? `"${listingTitle}" removido dos favoritos`
    : `"${listingTitle}" adicionado aos favoritos ❤️`;
  dispatch({
    type: ACTIONS.SHOW_TOAST,
    payload: { message, type: isFav ? "info" : "success" },
  });
}

export function setFilter(dispatch, key, value) {
  dispatch({ type: ACTIONS.SET_FILTER, payload: { key, value } });
}

export function setSortOrder(dispatch, sortOrder) {
  dispatch({ type: ACTIONS.SET_SORT, payload: sortOrder });
}

export function resetFilters(dispatch) {
  dispatch({ type: ACTIONS.RESET_FILTERS });
}

export function getFilteredAndSortedListings(listings, filters) {
  const filtered = filterListings(listings, filters);
  return sortListings(filtered, filters.sortOrder);
}

export function getFavoriteListings(listings, favoriteIds) {
  return listings.filter((l) => favoriteIds.includes(l.id));
}
