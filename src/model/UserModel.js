// ============================================================
// MODEL — UserModel.js
// Responsabilidade: favoritos, perfil e persistência localStorage
// SEM JSX, SEM DOM direto (exceto localStorage)
// ============================================================

const FAVORITES_KEY = "unilar_favorites";
const PROFILE_KEY = "unilar_profile";

// ---------- FAVORITOS ----------
export function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveFavorites(favorites) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch {
    // silently fail
  }
}

export function addFavorite(favorites, listingId) {
  if (favorites.includes(listingId)) return favorites;
  return [...favorites, listingId];
}

export function removeFavorite(favorites, listingId) {
  return favorites.filter((id) => id !== listingId);
}

export function isFavorite(favorites, listingId) {
  return favorites.includes(listingId);
}

export function toggleFavorite(favorites, listingId) {
  if (isFavorite(favorites, listingId)) {
    return removeFavorite(favorites, listingId);
  }
  return addFavorite(favorites, listingId);
}

// ---------- PERFIL ----------
export const DEFAULT_PROFILE = {
  name: "Estudante UniLar",
  university: "Universidade Federal",
  course: "Engenharia de Software",
  semester: "5º semestre",
  city: "São Paulo",
  bio: "Estudante apaixonado por tecnologia e inovação. Buscando moradia próxima à universidade.",
  verified: true,
  memberSince: "Janeiro 2024",
};

export function loadProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? { ...DEFAULT_PROFILE, ...JSON.parse(raw) } : DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(profile) {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch {
    // silently fail
  }
}

// ---------- LISTAGENS DO USUÁRIO ----------
const USER_LISTINGS_KEY = "unilar_user_listings";

export function loadUserListings() {
  try {
    const raw = localStorage.getItem(USER_LISTINGS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveUserListings(listings) {
  try {
    localStorage.setItem(USER_LISTINGS_KEY, JSON.stringify(listings));
  } catch {
    // silently fail
  }
}

// ---------- VALIDAÇÃO DE PERFIL ----------
export function validateProfile(profile) {
  const errors = {};
  if (!profile.name || profile.name.trim().length < 2) {
    errors.name = "Nome deve ter ao menos 2 caracteres";
  }
  if (!profile.university || profile.university.trim().length < 2) {
    errors.university = "Informe sua universidade";
  }
  if (!profile.course || profile.course.trim().length < 2) {
    errors.course = "Informe seu curso";
  }
  return errors;
}
