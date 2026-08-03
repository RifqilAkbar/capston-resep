// Kategori Daerah Masakan Nusantara — pemetaan tampilan tanpa mengubah database.
// Sumber kebenaran tunggal: dipakai Beranda ("Jelajahi Berdasarkan Daerah")
// dan filter halaman Resep.
export const KATEGORI_DAERAH = [
  { nama: 'Jawa Tengah', emoji: '🏛️' },
  { nama: 'Yogyakarta', emoji: '🏯' },
  { nama: 'Jawa Timur', emoji: '🌅' },
  { nama: 'Jawa Barat', emoji: '🌾' },
  { nama: 'Padang', emoji: '🌋' },
  { nama: 'Betawi', emoji: '🕌' },
  { nama: 'Bali', emoji: '🏖️' },
]

const KATEGORI_DEFAULT = 'Jawa Tengah'

// Pasangan [kata kunci, daerah]. Urut lebih spesifik dulu agar misalnya
// "Soto Lamongan" tidak tertangkap sebagai soto umum. Dicocokkan pada judul resep.
const PEMETAAN = [
  // Jawa Tengah
  ['tempe mendoan', 'Jawa Tengah'],
  ['mendoan', 'Jawa Tengah'],
  ['krecek', 'Jawa Tengah'],
  ['sayur lodeh', 'Jawa Tengah'],
  ['lodeh', 'Jawa Tengah'],
  ['tongseng', 'Jawa Tengah'],
  ['nasi liwet', 'Jawa Tengah'],
  ['garang asem', 'Jawa Tengah'],
  ['lentog', 'Jawa Tengah'],
  ['buntil', 'Jawa Tengah'],

  // Yogyakarta
  ['gudeg', 'Yogyakarta'],
  ['sate klatak', 'Yogyakarta'],
  ['klatak', 'Yogyakarta'],
  ['mangut', 'Yogyakarta'],
  ['nasi kucing', 'Yogyakarta'],

  // Jawa Timur
  ['rawon', 'Jawa Timur'],
  ['soto lamongan', 'Jawa Timur'],
  ['pecel', 'Jawa Timur'],
  ['rujak', 'Jawa Timur'],
  ['lontong balap', 'Jawa Timur'],
  ['tahu campur', 'Jawa Timur'],
  ['tahu tek', 'Jawa Timur'],
  ['sate madura', 'Jawa Timur'],
  ['sambal tumpang', 'Jawa Timur'],
  ['nasi kuning', 'Jawa Timur'],

  // Jawa Barat
  ['karedok', 'Jawa Barat'],
  ['pepes', 'Jawa Barat'],
  ['nasi timbel', 'Jawa Barat'],
  ['seblak', 'Jawa Barat'],
  ['mie kocok', 'Jawa Barat'],
  ['batagor', 'Jawa Barat'],
  ['tahu sumedang', 'Jawa Barat'],
  ['cilok', 'Jawa Barat'],
  ['bandrek', 'Jawa Barat'],
  ['sate bandung', 'Jawa Barat'],
  ['oncom', 'Jawa Barat'],
  ['lotek', 'Jawa Barat'],

  // Padang (Sumatera Barat)
  ['rendang', 'Padang'],
  ['gulai', 'Padang'],
  ['dendeng', 'Padang'],
  ['sate padang', 'Padang'],
  ['ayam pop', 'Padang'],
  ['nasi padang', 'Padang'],
  ['balado', 'Padang'],
  ['talua', 'Padang'],
  ['ketupat sayur', 'Padang'],

  // Betawi (Jakarta)
  ['soto betawi', 'Betawi'],
  ['semur betawi', 'Betawi'],
  ['semur', 'Betawi'],
  ['kerak telor', 'Betawi'],
  ['asinan betawi', 'Betawi'],
  ['asinan', 'Betawi'],
  ['ketoprak', 'Betawi'],
  ['nasi uduk', 'Betawi'],
  ['sayur asem', 'Betawi'],
  ['gado-gado', 'Betawi'],

  // Bali
  ['babi guling', 'Bali'],
  ['ayam betutu', 'Bali'],
  ['bebek betutu', 'Bali'],
  ['betutu', 'Bali'],
  ['sate lilit', 'Bali'],
  ['lawar', 'Bali'],
  ['sambal matah', 'Bali'],
  ['nasi jinggo', 'Bali'],
  ['plecing', 'Bali'],
]

function normalisasi(judul) {
  return String(judul || '')
    .toLowerCase()
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function kategoriNusantara(judul) {
  const teks = normalisasi(judul)
  for (const [kata, daerah] of PEMETAAN) {
    if (teks.includes(kata)) return daerah
  }
  return KATEGORI_DEFAULT
}

export function kategoriResep(daftarResep = []) {
  const hitung = {}
  daftarResep.forEach((r) => {
    const k = kategoriNusantara(r.judul_resep || r.judul)
    hitung[k] = (hitung[k] || 0) + 1
  })
  return KATEGORI_DAERAH.map((kat) => ({ ...kat, jumlah: hitung[kat.nama] || 0 }))
}

// ===== Pembagian bahan (hanya tampilan, tidak mengubah logika pencarian) =====
// Diklasifikasikan berdasarkan nama & kategori agar konsisten walau DB berubah.
const KATA_BUMBU = [
  'bawang', 'cabai', 'cabe', 'merica', 'lada', 'lombok', 'ketumbar', 'jahe', 'kunyit',
  'lengkuas', 'laos', 'serai', 'sereh', 'salam', 'jeruk', 'kemiri', 'garam', 'gula',
  'minyak', 'kecap', 'santan', 'terasi', 'asam', 'cuka', 'bumbu', 'rempah', 'saus',
  'penyedap', 'kaldu', 'pala', 'cengkeh', 'kayu manis', 'adas', 'jintan', 'daun jeruk',
]

export function adalahBumbu(bahan) {
  const teks = normalisasi(`${bahan.nama_bahan || ''} ${bahan.kategori || ''}`)
  if (teks.includes('bumbu') || teks.includes('rempah')) return true
  return KATA_BUMBU.some((kata) => teks.includes(kata))
}