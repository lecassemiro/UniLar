// ============================================================
// CONTEXT — AppContext.jsx
// Estado global com useReducer + actions tipadas
// ============================================================

import { createContext, useContext, useReducer, useEffect } from "react";
import { INITIAL_LISTINGS, INITIAL_FILTER_STATE } from "../model/ListingModel";
import { loadFavorites, saveFavorites, loadProfile, loadUserListings, saveUserListings } from "../model/UserModel";

// ---------- ACTION TYPES ----------
export const ACTIONS = {
  // Navegação
  NAVIGATE: "NAVIGATE",

  // Filtros e busca
  SET_FILTER: "SET_FILTER",
  RESET_FILTERS: "RESET_FILTERS",
  SET_SORT: "SET_SORT",

  // Modal
  OPEN_MODAL: "OPEN_MODAL",
  CLOSE_MODAL: "CLOSE_MODAL",

  // Favoritos
  TOGGLE_FAVORITE: "TOGGLE_FAVORITE",

  // Listagens
  ADD_LISTING: "ADD_LISTING",

  // Toast
  SHOW_TOAST: "SHOW_TOAST",
  HIDE_TOAST: "HIDE_TOAST",

  // Perfil
  UPDATE_PROFILE: "UPDATE_PROFILE",
};

// ---------- ESTADO INICIAL ----------
const initialState = {
  currentPage: "home",
  listings: INITIAL_LISTINGS,
  userListings: loadUserListings(),
  filters: INITIAL_FILTER_STATE,
  selectedListing: null,
  isModalOpen: false,
  favorites: loadFavorites(),
  profile: loadProfile(),
  toast: { visible: false, message: "", type: "success" },
};

// ---------- REDUCER ----------
function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.NAVIGATE:
      return { ...state, currentPage: action.payload, isModalOpen: false };

    case ACTIONS.SET_FILTER:
      return {
        ...state,
        filters: { ...state.filters, [action.payload.key]: action.payload.value },
      };

    case ACTIONS.RESET_FILTERS:
      return { ...state, filters: INITIAL_FILTER_STATE };

    case ACTIONS.SET_SORT:
      return { ...state, filters: { ...state.filters, sortOrder: action.payload } };

    case ACTIONS.OPEN_MODAL:
      return { ...state, isModalOpen: true, selectedListing: action.payload };

    case ACTIONS.CLOSE_MODAL:
      return { ...state, isModalOpen: false, selectedListing: null };

    case ACTIONS.TOGGLE_FAVORITE: {
      const id = action.payload;
      const alreadyFav = state.favorites.includes(id);
      const newFavs = alreadyFav
        ? state.favorites.filter((f) => f !== id)
        : [...state.favorites, id];
      return { ...state, favorites: newFavs };
    }

    case ACTIONS.ADD_LISTING: {
      const newListing = action.payload;
      const newUserListings = [...state.userListings, newListing];
      return {
        ...state,
        listings: [...state.listings, newListing],
        userListings: newUserListings,
      };
    }

    case ACTIONS.SHOW_TOAST:
      return {
        ...state,
        toast: { visible: true, message: action.payload.message, type: action.payload.type || "success" },
      };

    case ACTIONS.HIDE_TOAST:
      return { ...state, toast: { ...state.toast, visible: false } };

    case ACTIONS.UPDATE_PROFILE:
      return { ...state, profile: { ...state.profile, ...action.payload } };

    default:
      return state;
  }
}

// ---------- CONTEXT ----------
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Persistência de favoritos
  useEffect(() => {
    saveFavorites(state.favorites);
  }, [state.favorites]);

  // Persistência de listagens do usuário
  useEffect(() => {
    saveUserListings(state.userListings);
  }, [state.userListings]);

  // Auto-hide toast
  useEffect(() => {
    if (state.toast.visible) {
      const timer = setTimeout(() => {
        dispatch({ type: ACTIONS.HIDE_TOAST });
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [state.toast.visible, state.toast.message]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
