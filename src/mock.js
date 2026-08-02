// Helper foto & data mock deterministik untuk tampilan "Freshly".
// Tidak menyentuh database — nilai stabil per ID agar konsisten antar kunjungan.

const PICSUM = 'https://picsum.photos/seed'

// Foto resep portrait (dipakai kartu & banner).
export function fotoResep(id, w = 400, h = 560) {
  return `${PICSUM}/freshly-${id}/${w}/${h}`
}

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

// Avatar pengguna populer (contoh).
export function fotoAvatar(seed, w = 96, h = 96) {
  return `${PICSUM}/freshly-user-${seed}/${w}/${h}`
}

// Pengguna teratas — data contoh (backend tidak punya profil/follower).
export const DAFTAR_USER_POPULER = [
  { id: 'u1', nama: 'Siti Rahma', followers: 24500, jumlahResep: 42, avatar: 'siti' },
  { id: 'u2', nama: 'Budi Santoso', followers: 18200, jumlahResep: 31, avatar: 'budi' },
  { id: 'u3', nama: 'Maya Lestari', followers: 15900, jumlahResep: 27, avatar: 'maya' },
  { id: 'u4', nama: 'Rizky Pratama', followers: 12800, jumlahResep: 19, avatar: 'rizky' },
]
