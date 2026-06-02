// ============================================================
// CONTROLLER — RegisterController.js
// Validação e submissão do formulário de cadastro de imóvel
// SEM JSX, recebe dispatch como parâmetro
// ============================================================

import { ACTIONS } from "../context/AppContext";

export const EMPTY_FORM = {
  title: "",
  type: "kitnet",
  city: "",
  neighborhood: "",
  price: "",
  area: "",
  rooms: "",
  baths: "",
  desc: "",
  contact: "",
  amenities: "",
};

export function validateListingForm(form) {
  const errors = {};

  if (!form.title || form.title.trim().length < 5)
    errors.title = "Título deve ter ao menos 5 caracteres";

  if (!form.type) errors.type = "Selecione o tipo de imóvel";

  if (!form.city || form.city.trim().length < 2)
    errors.city = "Informe a cidade";

  if (!form.neighborhood || form.neighborhood.trim().length < 2)
    errors.neighborhood = "Informe o bairro";

  if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
    errors.price = "Informe um valor de aluguel válido";

  if (!form.area || isNaN(Number(form.area)) || Number(form.area) <= 0)
    errors.area = "Informe a área em m²";

  if (!form.rooms || isNaN(Number(form.rooms)) || Number(form.rooms) <= 0)
    errors.rooms = "Informe o número de quartos";

  if (!form.baths || isNaN(Number(form.baths)) || Number(form.baths) <= 0)
    errors.baths = "Informe o número de banheiros";

  if (!form.desc || form.desc.trim().length < 20)
    errors.desc = "Descrição deve ter ao menos 20 caracteres";

  if (!form.contact || form.contact.trim().length < 8)
    errors.contact = "Informe um contato válido";

  return errors;
}

export function buildListingFromForm(form, existingListings) {
  const amenitiesList = form.amenities
    ? form.amenities.split(",").map((a) => a.trim()).filter(Boolean)
    : [];

  const typeEmojis = { kitnet: "🏠", quarto: "🛏️", apartamento: "🏢", casa: "🏡" };

  return {
    id: Date.now(),
    title: form.title.trim(),
    type: form.type,
    city: form.city.trim(),
    neighborhood: form.neighborhood.trim(),
    price: Number(form.price),
    area: Number(form.area),
    rooms: Number(form.rooms),
    baths: Number(form.baths),
    badge: "new",
    emoji: typeEmojis[form.type] || "🏠",
    desc: form.desc.trim(),
    amenities: amenitiesList.length > 0 ? amenitiesList : ["Wi-Fi", "Água inclusa"],
    contact: form.contact.trim(),
  };
}

export function submitListing(dispatch, form, existingListings) {
  const errors = validateListingForm(form);
  if (Object.keys(errors).length > 0) return { success: false, errors };

  const newListing = buildListingFromForm(form, existingListings);
  dispatch({ type: ACTIONS.ADD_LISTING, payload: newListing });
  dispatch({
    type: ACTIONS.SHOW_TOAST,
    payload: { message: `Imóvel "${newListing.title}" cadastrado com sucesso! 🎉`, type: "success" },
  });

  return { success: true, errors: {} };
}
