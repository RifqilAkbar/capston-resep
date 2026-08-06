// Helper foto & data mock deterministik untuk tampilan "Freshly".
// Tidak menyentuh database — nilai stabil per ID agar konsisten antar kunjungan.

const PICSUM = 'https://picsum.photos/seed'

// Foto kecil untuk kategori / thumbnail pengguna.
export function fotoKategori(nama, w = 120, h = 120) {
  return `${PICSUM}/freshly-kat-${encodeURIComponent(nama)}/${w}/${h}`
}

// Durasi memasak contoh yang stabil per id (15–45 menit).
export function mockDurasi(id) {
  return 15 + (Number(id) * 7) % 31
}

// Jumlah "like" contoh yang stabil per id.
export function mockLike(id) {
  return 40 + (Number(id) * 137) % 460
}

// Avatar pengguna (contoh).
export function fotoAvatar(seed, w = 96, h = 96) {
  return `${PICSUM}/freshly-user-${seed}/${w}/${h}`
}
