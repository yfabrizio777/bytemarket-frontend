const configuredRate = Number(import.meta.env.VITE_USD_TO_PEN_RATE)

// Fallback académico para mantener precios válidos si la variable no está configurada.
const usdToPenRate = Number.isFinite(configuredRate) && configuredRate > 0
  ? configuredRate
  : 3.75

const penFormatter = new Intl.NumberFormat('es-PE', {
  style: 'currency',
  currency: 'PEN',
})

export function convertUsdToPen(priceUsd: number): number {
  return priceUsd * usdToPenRate
}

export function formatPrice(priceUsd: number): string {
  return penFormatter.format(convertUsdToPen(priceUsd))
}
