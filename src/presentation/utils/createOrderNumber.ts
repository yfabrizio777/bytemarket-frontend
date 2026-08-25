export function createOrderNumber(): string {
  const randomValues = new Uint32Array(1)
  window.crypto.getRandomValues(randomValues)
  const suffix = randomValues[0].toString(36).toUpperCase().padStart(6, '0').slice(0, 6)

  return `BM-2026-${suffix}`
}
