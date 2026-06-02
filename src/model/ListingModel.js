// ============================================================
// MODEL — ListingModel.js
// Responsabilidade: dados, estado inicial e funções puras
// SEM JSX, SEM DOM, SEM efeitos colaterais
// ============================================================

export const INITIAL_LISTINGS = [
  {
    id: 1,
    title: "Kitnet aconchegante perto da UNICAMP",
    type: "kitnet",
    city: "Campinas",
    neighborhood: "Barão Geraldo",
    price: 750,
    area: 28,
    rooms: 1,
    baths: 1,
    badge: "hot",
    emoji: "🏠",
    desc: "Kitnet totalmente mobiliada a 5 minutos a pé da UNICAMP. Ambiente tranquilo, perfeito para estudar. Inclui internet fibra, água e condomínio no valor.",
    amenities: ["Wi-Fi Fibra", "Mobiliada", "Água inclusa", "Condomínio incluso", "Lavanderia coletiva", "Segurança 24h"],
    contact: "(19) 99234-5678",
  },
  {
    id: 2,
    title: "Quarto individual próximo à USP",
    type: "quarto",
    city: "São Paulo",
    neighborhood: "Butantã",
    price: 650,
    area: 14,
    rooms: 1,
    baths: 1,
    badge: "hot",
    emoji: "🛏️",
    desc: "Quarto em república estudantil a 10 minutos da USP. Cozinha e área de lazer compartilhadas. Ambiente descontraído e seguro.",
    amenities: ["Wi-Fi", "Cozinha compartilhada", "Área de lazer", "Próximo ao metrô", "Lavanderia", "Academia próxima"],
    contact: "(11) 98765-4321",
  },
  {
    id: 3,
    title: "Apartamento moderno na Vila Madalena",
    type: "apartamento",
    city: "São Paulo",
    neighborhood: "Vila Madalena",
    price: 2200,
    area: 55,
    rooms: 2,
    baths: 1,
    badge: "new",
    emoji: "🏢",
    desc: "Apartamento moderno totalmente reformado no coração da Vila Madalena. Próximo a restaurantes, bares e transporte público. Ideal para quem busca qualidade de vida.",
    amenities: ["Wi-Fi Fibra", "Mobiliado", "Academia", "Portaria 24h", "Varanda", "Pet friendly"],
    contact: "(11) 94567-8901",
  },
  {
    id: 4,
    title: "Casa espaçosa perto da UFMG",
    type: "casa",
    city: "Belo Horizonte",
    neighborhood: "Pampulha",
    price: 700,
    area: 120,
    rooms: 4,
    baths: 2,
    badge: "",
    emoji: "🏡",
    desc: "Casa para dividir entre estudantes da UFMG. 4 quartos disponíveis, quintal, churrasqueira e garagem. Ótima localização no bairro Pampulha.",
    amenities: ["Quintal", "Churrasqueira", "Garagem", "Wi-Fi", "Lavanderia", "Próximo à UFMG"],
    contact: "(31) 97654-3210",
  },
  {
    id: 5,
    title: "Estúdio moderno próximo à UFSC",
    type: "kitnet",
    city: "Florianópolis",
    neighborhood: "Trindade",
    price: 900,
    area: 35,
    rooms: 1,
    baths: 1,
    badge: "new",
    emoji: "🌊",
    desc: "Estúdio sofisticado a 3 minutos da UFSC. Vista parcial do mar, totalmente mobiliado com móveis planejados. Perfeito para quem quer conforto e praticidade.",
    amenities: ["Vista parcial mar", "Mobiliado", "Wi-Fi Fibra", "Ar-condicionado", "Varanda", "Segurança"],
    contact: "(48) 98765-1234",
  },
  {
    id: 6,
    title: "Quarto aconchegante próximo à UFRGS",
    type: "quarto",
    city: "Porto Alegre",
    neighborhood: "Bom Fim",
    price: 580,
    area: 12,
    rooms: 1,
    baths: 1,
    badge: "",
    emoji: "📚",
    desc: "Quarto em república consolidada com moradores há mais de 2 anos. Ambiente de estudos, silencioso e organizado. A 7 minutos da UFRGS a pé.",
    amenities: ["Wi-Fi", "Cozinha equipada", "Despensa", "Área estudo", "Bicicleta compartilhada", "Ótimo vizinhança"],
    contact: "(51) 93456-7890",
  },
  {
    id: 7,
    title: "Apartamento completo próximo à UnB",
    type: "apartamento",
    city: "Brasília",
    neighborhood: "Asa Norte",
    price: 1400,
    area: 48,
    rooms: 2,
    baths: 1,
    badge: "hot",
    emoji: "🏛️",
    desc: "Apartamento bem localizado na Asa Norte, a 15 minutos da UnB. Condomínio com piscina, academia e salão de festas. Ideal para estudantes exigentes.",
    amenities: ["Piscina", "Academia", "Salão de festas", "Wi-Fi Fibra", "Portaria 24h", "Estacionamento"],
    contact: "(61) 99123-4567",
  },
  {
    id: 8,
    title: "Kitnet econômica próxima à PUC-BH",
    type: "kitnet",
    city: "Belo Horizonte",
    neighborhood: "Coração Eucarístico",
    price: 850,
    area: 30,
    rooms: 1,
    baths: 1,
    badge: "new",
    emoji: "🎓",
    desc: "Kitnet nova, nunca habitada, a 2 quadras da PUC Minas. Acabamento premium, cozinha americana integrada e banheiro com box de vidro.",
    amenities: ["Nova", "Wi-Fi", "Cozinha americana", "Box vidro", "Piso laminado", "Interfone"],
    contact: "(31) 98234-5670",
  },
];

// Funções puras de filtragem e ordenação
export function filterListings(listings, { search, type, maxPrice }) {
  return listings.filter((l) => {
    const matchSearch =
      !search ||
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.city.toLowerCase().includes(search.toLowerCase()) ||
      l.neighborhood.toLowerCase().includes(search.toLowerCase());
    const matchType = !type || type === "todos" || l.type === type;
    const matchPrice = !maxPrice || l.price <= Number(maxPrice);
    return matchSearch && matchType && matchPrice;
  });
}

export function sortListings(listings, sortOrder) {
  const copy = [...listings];
  if (sortOrder === "menor") return copy.sort((a, b) => a.price - b.price);
  if (sortOrder === "maior") return copy.sort((a, b) => b.price - a.price);
  return copy;
}

export function getListingById(listings, id) {
  return listings.find((l) => l.id === id) || null;
}

export const LISTING_TYPES = [
  { value: "todos", label: "Todos" },
  { value: "quarto", label: "Quarto" },
  { value: "kitnet", label: "Kitnet" },
  { value: "apartamento", label: "Apartamento" },
  { value: "casa", label: "Casa" },
];

export const SORT_OPTIONS = [
  { value: "relevancia", label: "Relevância" },
  { value: "menor", label: "Menor preço" },
  { value: "maior", label: "Maior preço" },
];

export const INITIAL_FILTER_STATE = {
  search: "",
  type: "todos",
  maxPrice: "",
  sortOrder: "relevancia",
};
