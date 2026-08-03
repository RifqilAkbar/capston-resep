// Foto makanan asli (Wikimedia Commons) untuk tampilan "Resep Masakan Nusantara".
// Statis & deterministik per hidangan — tidak menyentuh database.
// Urutan dicocokkan dari kata kunci ter-spesifik (terpanjang) ke umum.

const FOTO_MAKANAN = [
  ['nasi goreng', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Nasi_goreng_pattaya_20231028_120535.jpg/960px-Nasi_goreng_pattaya_20231028_120535.jpg'],
  ['sup ayam', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Soto_ayam.JPG/960px-Soto_ayam.JPG'],
  ['soto betawi', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/SOTO_BETAWI.jpg/960px-SOTO_BETAWI.jpg'],
  ['soto kudus', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Soto_Kudus_nasi.JPG/960px-Soto_Kudus_nasi.JPG'],
  ['soto lamongan', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Soto_ayam.JPG/960px-Soto_ayam.JPG'],
  ['soto ayam', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Soto_ayam.JPG/960px-Soto_ayam.JPG'],
  ['tumis bayam', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Tumis_Bayam_Mempawah.jpg/960px-Tumis_Bayam_Mempawah.jpg'],
  ['bayam', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Tumis_Bayam_Mempawah.jpg/960px-Tumis_Bayam_Mempawah.jpg'],
  ['ayam betutu', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Ayam_Betutu_Bali.jpg/960px-Ayam_Betutu_Bali.jpg'],
  ['ayam goreng', 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Ayam_goreng_%282%29.JPG'],
  ['gudeg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Gudeg_Ayam.jpg/960px-Gudeg_Ayam.jpg'],
  ['rawon', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Bumbu_Rawon.jpg/960px-Bumbu_Rawon.jpg'],
  ['rendang', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Lamb_rendang.jpg/960px-Lamb_rendang.jpg'],
  ['karedok', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Karedok.JPG/960px-Karedok.JPG'],
  ['lotek', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Lotek_Indonesian_food.jpg/960px-Lotek_Indonesian_food.jpg'],
  ['garang asem', 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Garang_asem_Pj.JPG'],
  ['nasi liwet', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Nasi_Liwet_Solo.jpg/960px-Nasi_Liwet_Solo.jpg'],
  ['sate klatak', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Sate_klatak_20170818_Yogyakarta.jpg/960px-Sate_klatak_20170818_Yogyakarta.jpg'],
  ['dendeng', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Dendeng_balado.JPG/960px-Dendeng_balado.JPG'],
  ['gulai', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Gulai_ayam.JPG/960px-Gulai_ayam.JPG'],
  ['kerak telor', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Kerak_Telor.jpg/960px-Kerak_Telor.jpg'],
  ['sate lilit', 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Satay_Lilit.jpg'],
  ['babi guling', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Babi_Guling_-_Roasted_Suckling_Pig.jpg/960px-Babi_Guling_-_Roasted_Suckling_Pig.jpg'],
]

const DEFAULT_FOTO_MAKANAN = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Lotek_Indonesian_food.jpg/960px-Lotek_Indonesian_food.jpg'

function normalisasi(teks) {
  return String(teks || '').toLowerCase().replace(/-/g, ' ').replace(/\s+/g, ' ').trim()
}

export function fotoMakanan(judul) {
  const teks = normalisasi(judul)
  for (const [kata, url] of FOTO_MAKANAN) {
    if (teks.includes(kata)) return url
  }
  return DEFAULT_FOTO_MAKANAN
}

// Foto representatif per daerah (hidangan ikonik / landmark).
export const FOTO_DAERAH = {
  'Jawa Tengah': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Gudeg_Ayam.jpg/960px-Gudeg_Ayam.jpg',
  'Yogyakarta': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Yogyakarta_Indonesia_Tugu-Yogyakarta-01.jpg/960px-Yogyakarta_Indonesia_Tugu-Yogyakarta-01.jpg',
  'Jawa Timur': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Bumbu_Rawon.jpg/960px-Bumbu_Rawon.jpg',
  'Jawa Barat': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Karedok.JPG/960px-Karedok.JPG',
  'Padang': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Lamb_rendang.jpg/960px-Lamb_rendang.jpg',
  'Betawi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/SOTO_BETAWI.jpg/960px-SOTO_BETAWI.jpg',
  'Bali': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Ayam_Betutu_Bali.jpg/960px-Ayam_Betutu_Bali.jpg',
}