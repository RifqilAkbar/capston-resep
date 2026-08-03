// Kategori Daerah Masakan Nusantara — pemetaan tampilan tanpa mengubah database.
// Sumber kebenaran tunggal: dipakai Beranda ("Jelajahi Kuliner Nusantara")
// dan filter halaman Resep. Judul resep dipetakan ke daerah via kata kunci.

export const KATEGORI_DAERAH = [
  { nama: 'Jawa Tengah', emoji: '🏛️' },
  { nama: 'Yogyakarta', emoji: '🏯' },
  { nama: 'Jawa Timur', emoji: '🌅' },
  { nama: 'Jawa Barat', emoji: '🌾' },
  { nama: 'Padang', emoji: '🌋' },
  { nama: 'Betawi', emoji: '🕌' },
  { nama: 'Bali', emoji: '🏖️' },
  { nama: 'Sumatera', emoji: '🌴' },
  { nama: 'Sulawesi', emoji: '🗻' },
  { nama: 'Kalimantan', emoji: '🌿' },
]

const KATEGORI_DEFAULT = 'Jawa Tengah'

// Pasangan [kata kunci, daerah]. Dicocokkan pada judul resep, kata yang lebih
// spesifik diletakkan lebih dulu agar tidak tertangkap kata umum (mis. "gudeg
// jogja" sebelum "gudeg", "gulai ikan patin" sebelum "gulai").
const PEMETAAN = [
  // ---- Penghindar ambiguitas (spesifik dulu) ----
  ['gudeg jogja', 'Yogyakarta'],
  ['gulai ikan patin', 'Sumatera'],
  ['oseng mercon', 'Yogyakarta'],
  ['nasi tutug oncom', 'Jawa Barat'],

  // ---- Jawa Tengah ----
  ['gudeg', 'Jawa Tengah'],
  ['soto kudus', 'Jawa Tengah'],
  ['garang asem', 'Jawa Tengah'],
  ['nasi liwet', 'Jawa Tengah'],
  ['tengkleng', 'Jawa Tengah'],
  ['mangut', 'Jawa Tengah'],
  ['selat solo', 'Jawa Tengah'],
  ['tahu gimbal', 'Jawa Tengah'],
  ['lumpia', 'Jawa Tengah'],
  ['mendoan', 'Jawa Tengah'],
  ['tempe mendoan', 'Jawa Tengah'],
  ['krecek', 'Jawa Tengah'],
  ['sayur lodeh', 'Jawa Tengah'],
  ['lodeh', 'Jawa Tengah'],
  ['tongseng', 'Jawa Tengah'],
  ['lentog', 'Jawa Tengah'],
  ['buntil', 'Jawa Tengah'],

  // ---- Yogyakarta ----
  ['mercon', 'Yogyakarta'],
  ['sate klathak', 'Yogyakarta'],
  ['klathak', 'Yogyakarta'],
  ['brongkos', 'Yogyakarta'],
  ['bakpia', 'Yogyakarta'],
  ['geplak', 'Yogyakarta'],
  ['nasi kucing', 'Yogyakarta'],

  // ---- Jawa Timur ----
  ['rawon', 'Jawa Timur'],
  ['soto lamongan', 'Jawa Timur'],
  ['rujak cingur', 'Jawa Timur'],
  ['rujak', 'Jawa Timur'],
  ['pecel', 'Jawa Timur'],
  ['lontong balap', 'Jawa Timur'],
  ['tahu campur', 'Jawa Timur'],
  ['tahu tek', 'Jawa Timur'],
  ['nasi krawu', 'Jawa Timur'],
  ['semanggi', 'Jawa Timur'],
  ['soto madura', 'Jawa Timur'],
  ['bebek sinjay', 'Jawa Timur'],
  ['sate madura', 'Jawa Timur'],
  ['sambal tumpang', 'Jawa Timur'],
  ['nasi kuning', 'Jawa Timur'],

  // ---- Jawa Barat ----
  ['karedok', 'Jawa Barat'],
  ['lotek', 'Jawa Barat'],
  ['oncom', 'Jawa Barat'],
  ['empal gentong', 'Jawa Barat'],
  ['seblak', 'Jawa Barat'],
  ['batagor', 'Jawa Barat'],
  ['cuanki', 'Jawa Barat'],
  ['mie kocok', 'Jawa Barat'],
  ['surabi', 'Jawa Barat'],
  ['soto bandung', 'Jawa Barat'],
  ['pepes', 'Jawa Barat'],
  ['nasi timbel', 'Jawa Barat'],
  ['tahu sumedang', 'Jawa Barat'],
  ['cilok', 'Jawa Barat'],
  ['bandrek', 'Jawa Barat'],
  ['sate bandung', 'Jawa Barat'],

  // ---- Padang ----
  ['rendang', 'Padang'],
  ['dendeng', 'Padang'],
  ['gulai tunjang', 'Padang'],
  ['gulai kepala ikan', 'Padang'],
  ['gulai', 'Padang'],
  ['ayam pop', 'Padang'],
  ['sambal ijo', 'Padang'],
  ['soto padang', 'Padang'],
  ['sate padang', 'Padang'],
  ['nasi padang', 'Padang'],
  ['balado', 'Padang'],
  ['talua', 'Padang'],
  ['ketupat sayur', 'Padang'],

  // ---- Betawi ----
  ['soto betawi', 'Betawi'],
  ['kerak telor', 'Betawi'],
  ['asinan betawi', 'Betawi'],
  ['asinan', 'Betawi'],
  ['semur jengkol', 'Betawi'],
  ['semur', 'Betawi'],
  ['gabus pucung', 'Betawi'],
  ['ketoprak', 'Betawi'],
  ['nasi uduk', 'Betawi'],
  ['sayur asem', 'Betawi'],
  ['gado-gado', 'Betawi'],

  // ---- Bali ----
  ['ayam betutu', 'Bali'],
  ['bebek betutu', 'Bali'],
  ['betutu', 'Bali'],
  ['sate lilit', 'Bali'],
  ['lawar', 'Bali'],
  ['nasi campur bali', 'Bali'],
  ['tum ayam', 'Bali'],
  ['sambal matah', 'Bali'],
  ['nasi jinggo', 'Bali'],
  ['plecing', 'Bali'],

  // ---- Sulawesi ----
  ['coto makassar', 'Sulawesi'],
  ['pallubasa', 'Sulawesi'],
  ['konro', 'Sulawesi'],
  ['tinutuan', 'Sulawesi'],
  ['woku', 'Sulawesi'],

  // ---- Kalimantan ----
  ['soto banjar', 'Kalimantan'],
  ['ketupat kandangan', 'Kalimantan'],
  ['juhu singkah', 'Kalimantan'],

  // ---- Sumatera ----
  ['pempek', 'Sumatera'],
  ['tekwan', 'Sumatera'],
  ['mie aceh', 'Sumatera'],
  ['bika ambon', 'Sumatera'],
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
  'kencur', 'kapulaga', 'kemangi',
]

export function adalahBumbu(bahan) {
  const teks = normalisasi(`${bahan.nama_bahan || ''} ${bahan.kategori || ''}`)
  if (teks.includes('bumbu') || teks.includes('rempah')) return true
  return KATA_BUMBU.some((kata) => teks.includes(kata))
}