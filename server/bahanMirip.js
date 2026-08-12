// Deteksi duplikat bahan yang mirip (varian ejaan/urutan kata), dipakai oleh
// POST /api/ingredients, antrean review admin, dan skrip dedupe data lama.
export function normalisasiNama(nama) {
  return String(nama || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function leven(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0))
  for (let i = 0; i <= a.length; i++) dp[i][0] = i
  for (let j = 0; j <= b.length; j++) dp[0][j] = j
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      )
    }
  }
  return dp[a.length][b.length]
}

// kembalikan nama existing yang mirip, atau null bila tidak ada.
export function bahanMirip(namaBaru, daftarNama) {
  const target = normalisasiNama(namaBaru)
  if (!target) return null
  const kataTarget = new Set(target.split(' '))

  for (const nama of daftarNama) {
    const n = normalisasiNama(nama)
    if (!n) continue
    const kata = new Set(n.split(' '))
    const setSama = target.length === n.length && [...kataTarget].every((k) => kata.has(k))
    if (setSama || leven(target, n) <= 1) return nama
  }
  return null
}

// Beda dengan bahanMirip: membedakan cocok tepat (eksak) vs mirip, dan menerima
// daftar berisi string ataupun objek { nama_bahan } (mis. baris dari database).
// kembalikan null, atau { tipe: 'eksak'|'mirip', nama }.
export function kecocokan(namaBaru, daftar) {
  const target = normalisasiNama(namaBaru)
  if (!target) return null
  const asli = (m) => (typeof m === 'string' ? m : m.nama_bahan)

  for (const m of daftar) {
    if (normalisasiNama(asli(m)) === target) {
      return { tipe: 'eksak', nama: asli(m) }
    }
  }

  const mirip = bahanMirip(namaBaru, daftar.map(asli))
  return mirip ? { tipe: 'mirip', nama: mirip } : null
}