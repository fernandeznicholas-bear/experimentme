// Share link encoding/decoding
// Encodes assessment results into a compact URL-safe string (no DB needed for MVP)

export interface ShareData {
  a: string   // assessment ID
  s: number   // score
  ss?: { n: string; s: number }[] // subscale scores (name, score)
}

export function encodeShareData(data: ShareData): string {
  const json = JSON.stringify(data)
  // btoa → URL-safe base64 (replace +/ with -_)
  const base64 = btoa(json)
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function decodeShareData(encoded: string): ShareData | null {
  try {
    // Restore standard base64
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/')
    // Add padding if needed
    while (base64.length % 4 !== 0) base64 += '='
    const json = atob(base64)
    return JSON.parse(json) as ShareData
  } catch {
    return null
  }
}

export function buildShareUrl(data: ShareData): string {
  const encoded = encodeShareData(data)
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://experimentme.com'
  return `${origin}/share/${encoded}`
}
