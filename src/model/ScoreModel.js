// ============================================================
// MODEL — ScoreModel.js
// Score de Vida Universitária — cálculo 100% offline
// Sem API, sem DOM, sem JSX. Apenas funções puras e tabelas.
// ============================================================

// ── Custo médio da passagem de ônibus por cidade (R$) ──────
export const TRANSPORT_COST = {
  "São Paulo": 6.0,
  Campinas: 4.8,
  "Belo Horizonte": 4.5,
  Florianópolis: 5.0,
  "Porto Alegre": 4.8,
  Brasília: 5.5,
  "Rio de Janeiro": 4.3,
  Curitiba: 5.0,
  Recife: 4.5,
  Salvador: 4.5,
  default: 4.5,
}

// ── Distância estimada (km) até polo universitário da cidade ─
// Baseado em dados reais de localização dos bairros
export const DISTANCE_TABLE = {
  // São Paulo
  "São Paulo|Butantã": 1.5,
  "São Paulo|Vila Madalena": 4.0,
  "São Paulo|Pinheiros": 5.0,
  "São Paulo|Consolação": 6.0,
  "São Paulo|Bela Vista": 7.0,
  "São Paulo|Centro": 8.0,
  "São Paulo|Mooca": 10.0,
  "São Paulo|Penha": 18.0,
  // Campinas
  "Campinas|Barão Geraldo": 2.0,
  "Campinas|Centro": 8.0,
  "Campinas|Taquaral": 6.0,
  // Belo Horizonte
  "Belo Horizonte|Pampulha": 2.5,
  "Belo Horizonte|Coração Eucarístico": 1.5,
  "Belo Horizonte|Savassi": 7.0,
  "Belo Horizonte|Centro": 9.0,
  "Belo Horizonte|Santa Efigênia": 5.0,
  // Florianópolis
  "Florianópolis|Trindade": 0.8,
  "Florianópolis|Centro": 4.0,
  "Florianópolis|Itacorubi": 2.5,
  "Florianópolis|Lagoa": 12.0,
  // Porto Alegre
  "Porto Alegre|Bom Fim": 1.2,
  "Porto Alegre|Cidade Baixa": 3.0,
  "Porto Alegre|Centro": 4.5,
  "Porto Alegre|Petrópolis": 5.0,
  // Brasília
  "Brasília|Asa Norte": 3.0,
  "Brasília|Asa Sul": 5.5,
  "Brasília|Taguatinga": 20.0,
  "Brasília|Ceilândia": 28.0,
}

// ── Índice de segurança por bairro (1 = baixo, 5 = alto) ───
export const SAFETY_INDEX = {
  // São Paulo
  "São Paulo|Butantã": 4,
  "São Paulo|Vila Madalena": 4,
  "São Paulo|Pinheiros": 4,
  "São Paulo|Consolação": 3,
  "São Paulo|Centro": 2,
  "São Paulo|Mooca": 3,
  "São Paulo|Penha": 2,
  // Campinas
  "Campinas|Barão Geraldo": 5,
  "Campinas|Centro": 3,
  "Campinas|Taquaral": 4,
  // Belo Horizonte
  "Belo Horizonte|Pampulha": 4,
  "Belo Horizonte|Coração Eucarístico": 4,
  "Belo Horizonte|Savassi": 4,
  "Belo Horizonte|Centro": 2,
  // Florianópolis
  "Florianópolis|Trindade": 5,
  "Florianópolis|Centro": 4,
  "Florianópolis|Itacorubi": 5,
  "Florianópolis|Lagoa": 5,
  // Porto Alegre
  "Porto Alegre|Bom Fim": 4,
  "Porto Alegre|Cidade Baixa": 3,
  "Porto Alegre|Centro": 2,
  "Porto Alegre|Petrópolis": 4,
  // Brasília
  "Brasília|Asa Norte": 5,
  "Brasília|Asa Sul": 5,
  "Brasília|Taguatinga": 3,
  "Brasília|Ceilândia": 2,
  default: 3,
}

// ── Índice de acesso a serviços por tipo de bairro ──────────
// (supermercado, farmácia, banco, restaurante, academia)
const SERVICES_PROFILE = {
  universitario: 92, // próximo ao campus, comércio focado em estudantes
  central: 85, // centro da cidade, tudo perto
  residencial: 65, // bairro residencial, serviços básicos
  afastado: 35, // periferia, poucos serviços
}

// Mapeamento de bairros para perfil de serviços
const SERVICES_MAP = {
  // universitário
  "Campinas|Barão Geraldo": "universitario",
  "Belo Horizonte|Pampulha": "universitario",
  "Belo Horizonte|Coração Eucarístico": "universitario",
  "Florianópolis|Trindade": "universitario",
  "Porto Alegre|Bom Fim": "universitario",
  "Brasília|Asa Norte": "universitario",
  "São Paulo|Butantã": "universitario",
  // central
  "São Paulo|Pinheiros": "central",
  "São Paulo|Vila Madalena": "central",
  "São Paulo|Consolação": "central",
  "Florianópolis|Centro": "central",
  "Porto Alegre|Centro": "central",
  "Belo Horizonte|Savassi": "central",
  "Brasília|Asa Sul": "central",
  // residencial
  "São Paulo|Mooca": "residencial",
  "Porto Alegre|Petrópolis": "residencial",
  "Porto Alegre|Cidade Baixa": "residencial",
  // afastado
  "São Paulo|Penha": "afastado",
  "Brasília|Taguatinga": "afastado",
  "Brasília|Ceilândia": "afastado",
}

// ── Helpers internos ────────────────────────────────────────
function getKey(city, neighborhood) {
  return `${city}|${neighborhood}`
}

function clamp(value, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value))
}

function getTransportCost(city) {
  return TRANSPORT_COST[city] ?? TRANSPORT_COST.default
}

function getDistance(city, neighborhood) {
  const key = getKey(city, neighborhood)
  // Se não encontrar bairro, estima pela cidade (distância moderada)
  return DISTANCE_TABLE[key] ?? 8
}

function getSafety(city, neighborhood) {
  const key = getKey(city, neighborhood)
  return SAFETY_INDEX[key] ?? SAFETY_INDEX.default
}

function getServicesScore(city, neighborhood) {
  const key = getKey(city, neighborhood)
  const profile = SERVICES_MAP[key] ?? "residencial"
  return SERVICES_PROFILE[profile]
}

// ── Cálculo dos 5 pilares ───────────────────────────────────

/**
 * Pilar 1 — Custo Total Mensal (peso 30%)
 * Quanto menor o custo real (aluguel + transporte), maior o score.
 * Faixa razoável para estudante: R$500–R$3000+
 */
function calcCustoTotal(listing) {
  const passagem = getTransportCost(listing.city)
  const diasUteis = 22
  const idaVolta = 2
  const custoTransp = passagem * diasUteis * idaVolta
  const custoReal = listing.price + custoTransp

  // Score cai linearmente: R$700 = 100pts, R$3000 = 0pts
  const score = clamp(100 - (custoReal - 700) / 23)

  return {
    score: Math.round(score),
    peso: 30,
    custoTransp: Math.round(custoTransp),
    custoReal: Math.round(custoReal),
    valor: `R$ ${Math.round(custoReal).toLocaleString("pt-BR")}/mês real estimado`,
  }
}

/**
 * Pilar 2 — Tempo de Deslocamento (peso 25%)
 * Estimativa: 1km ≈ 4min (ônibus urbano em horário de pico).
 * Mostra tempo por trajeto (ida).
 */
function calcDeslocamento(listing) {
  const km = getDistance(listing.city, listing.neighborhood)
  const minutos = Math.round(km * 4) // min por trajeto
  const porDia = minutos * 2 // ida + volta

  // Score cai com a distância: 0km = 100, 20km+ = 0
  const score = clamp(100 - km * 5)

  return {
    score: Math.round(score),
    peso: 25,
    km,
    minutos,
    porDia,
    valor: `~${minutos} min por trajeto (${porDia} min/dia)`,
  }
}

/**
 * Pilar 3 — Custo de Transporte (peso 20%)
 * Mede o peso do transporte em relação ao aluguel.
 * Se transporte > 40% do aluguel, score é baixo.
 */
function calcTransporte(listing) {
  const passagem = getTransportCost(listing.city)
  const custoMensal = passagem * 22 * 2
  const percentual = custoMensal / listing.price

  // 0% do aluguel = 100pts | 60%+ = 0pts
  const score = clamp(100 - percentual * 160)

  return {
    score: Math.round(score),
    peso: 20,
    custoMensal: Math.round(custoMensal),
    percentual: Math.round(percentual * 100),
    valor: `R$ ${Math.round(custoMensal).toLocaleString("pt-BR")}/mês (${Math.round(percentual * 100)}% do aluguel)`,
  }
}

/**
 * Pilar 4 — Segurança da Região (peso 15%)
 * Índice 1–5 convertido para 0–100.
 */
function calcSeguranca(listing) {
  const indice = getSafety(listing.city, listing.neighborhood)
  const score = Math.round((indice / 5) * 100)
  const labels = {
    1: "Atenção redobrada",
    2: "Risco moderado",
    3: "Segurança razoável",
    4: "Bairro seguro",
    5: "Muito seguro",
  }

  return {
    score,
    peso: 15,
    indice,
    valor: labels[indice] ?? "Segurança razoável",
  }
}

/**
 * Pilar 5 — Acesso a Serviços (peso 10%)
 * Score pré-definido por perfil do bairro.
 */
function calcServicos(listing) {
  const score = getServicesScore(listing.city, listing.neighborhood)
  const perfilLabels = {
    universitario: "Excelente — tudo perto do campus",
    central: "Ótimo — região central completa",
    residencial: "Bom — serviços básicos disponíveis",
    afastado: "Limitado — poucos serviços próximos",
  }
  const key = getKey(listing.city, listing.neighborhood)
  const perfil = SERVICES_MAP[key] ?? "residencial"

  return {
    score,
    peso: 10,
    valor: perfilLabels[perfil],
  }
}

// ── Insight dinâmico ─────────────────────────────────────────
function generateInsight(pilares, listing) {
  const { custoTotal, deslocamento, transporte } = pilares

  // Identifica pior pilar
  const todos = [
    { nome: "custo total", score: custoTotal.score },
    { nome: "deslocamento", score: deslocamento.score },
    { nome: "transporte", score: transporte.score },
  ]
  const pior = todos.reduce((a, b) => (a.score < b.score ? a : b))

  // Alerta se transporte for alto
  if (transporte.percentual >= 40) {
    return {
      icon: "AlertTriangle",
      text: `O transporte representa ${transporte.percentual}% do aluguel — R$ ${transporte.custoMensal}/mês. O custo real do imóvel é R$ ${custoTotal.custoReal.toLocaleString("pt-BR")}/mês.`,
    }
  }

  if (deslocamento.porDia >= 90) {
    return {
      icon: "Clock",
      text: `Este imóvel exige ~${deslocamento.porDia} minutos de deslocamento por dia. Em um semestre, são mais de ${Math.round((deslocamento.porDia * 100) / 60)} horas perdidas no transporte.`,
    }
  }

  if (custoTotal.score >= 75 && deslocamento.score >= 75) {
    return {
      icon: "CheckCircle",
      text: `Ótimo custo-benefício real! Aluguel acessível e localização próxima reduzem o custo total para R$ ${custoTotal.custoReal.toLocaleString("pt-BR")}/mês.`,
    }
  }

  return {
    icon: "Lightbulb",
    text: `O ponto de atenção é o ${pior.nome}. Considere comparar com imóveis mais próximos ao campus.`,
  }
}

// ── Score final ──────────────────────────────────────────────
function getLabel(total) {
  if (total >= 85)
    return {
      label: "Excelente",
      bgcolor: "bg-emerald-100",
      text: "text-emerald-800",
    }
  if (total >= 70)
    return { label: "Ótimo", bgcolor: "bg-sky-100", text: "text-sky-800" }
  if (total >= 55)
    return { label: "Bom", bgcolor: "bg-amber-100", text: "text-amber-800" }
  if (total >= 40)
    return {
      label: "Regular",
      bgcolor: "bg-orange-100",
      text: "text-orange-800",
    }
  return { label: "Atenção", bgcolor: "bg-red-100", text: "text-red-800" }
}

/**
 * Função principal exportada — recebe um listing e retorna o score completo.
 */
export function calculateScore(listing) {
  const pilares = {
    custoTotal: calcCustoTotal(listing),
    deslocamento: calcDeslocamento(listing),
    transporte: calcTransporte(listing),
    seguranca: calcSeguranca(listing),
    servicos: calcServicos(listing),
  }

  const total = Math.round(
    pilares.custoTotal.score * 0.3 +
      pilares.deslocamento.score * 0.25 +
      pilares.transporte.score * 0.2 +
      pilares.seguranca.score * 0.15 +
      pilares.servicos.score * 0.1,
  )

  const { label, bgcolor, text } = getLabel(total)
  const insight = generateInsight(pilares, listing)
  const alertaTransporte = pilares.transporte.percentual >= 40

  return {
    total,
    label,
    color: bgcolor,
    textColor: text,
    insight,
    alertaTransporte,
    breakdown: {
      custoTotal: {
        ...pilares.custoTotal,
        nome: "Custo Total Mensal",
        icone: "DollarSign",
      },
      deslocamento: {
        ...pilares.deslocamento,
        nome: "Tempo de Deslocamento",
        icone: "Bus",
      },
      transporte: {
        ...pilares.transporte,
        nome: "Custo de Transporte",
        icone: "Ticket",
      },
      seguranca: {
        ...pilares.seguranca,
        nome: "Segurança da Região",
        icone: "Shield",
      },
      servicos: {
        ...pilares.servicos,
        nome: "Acesso a Serviços",
        icone: "Store",
      },
    },
  }
}
