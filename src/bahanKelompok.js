// Pengelompokan tampilan bahan: "Bahan Umum" vs "Bahan Unik Khas Nusantara".
// Murni untuk UI, tidak mengubah database maupun logika rekomendasi.
const BAHAN_UNIK = new Set([
  'kencur',
  'lengkuas',
  'laos',
  'jahe',
  'kunyit',
  'daun kunyit',
  'daun salam',
  'daun jeruk',
  'daun pandan',
  'daun kemangi',
  'kemangi',
  'serai',
  'sereh',
  'terasi',
  'kemiri',
  'petai',
  'kecombrang',
  'honje',
  'oncom',
  'tempoyak',
  'andaliman',
  'asam jawa',
  'asem jawa',
  'asam kandis',
  'kluwek',
  'keluwek',
])

function normalisasi(nama) {
  return String(nama || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

export function bahanUnik(nama) {
  return BAHAN_UNIK.has(normalisasi(nama))
}

export function kelompokkanBahan(daftar) {
  const umum = []
  const unik = []
  ;(daftar || []).forEach((bahan) => {
    if (bahanUnik(bahan.nama_bahan)) unik.push(bahan)
    else umum.push(bahan)
  })
  return { umum, unik }
}
