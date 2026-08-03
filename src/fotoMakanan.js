// Foto makanan asli (Wikimedia Commons) untuk tampilan "Resep Masakan Nusantara".
// Statis & deterministik per hidangan — tidak menyentuh database.
// Urutan dicocokkan dari kata kunci ter-spesifik ke umum.

const FOTO_MAKANAN = [
  // Jawa Tengah
  ['gudeg jogja', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Nasi_Gudeg.jpg/960px-Nasi_Gudeg.jpg'],
  ['gudeg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Gudeg_Ayam.jpg/960px-Gudeg_Ayam.jpg'],
  ['soto kudus', 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Soto_Kudus.jpg'],
  ['garang asem', 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Garang_asem_Pj.JPG'],
  ['nasi liwet', 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Nasi_Liwet_A.JPG'],
  ['tengkleng', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Tengkleng.jpg/960px-Tengkleng.jpg'],
  ['mangut', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/9._Dapur_Mangut_Lele_3.jpg/960px-9._Dapur_Mangut_Lele_3.jpg'],
  ['selat solo', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Selat_Solo.jpg/960px-Selat_Solo.jpg'],
  ['tahu gimbal', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Tahu_gimbal_in_Semarang.jpg/960px-Tahu_gimbal_in_Semarang.jpg'],
  ['lumpia', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Lumpia_at_Teh_Jawa%2C_Purwokerto_Station%2C_Purwokerto_2015-03-20.jpg/960px-Lumpia_at_Teh_Jawa%2C_Purwokerto_Station%2C_Purwokerto_2015-03-20.jpg'],
  ['mendoan', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Mendoan.jpg/960px-Mendoan.jpg'],

  // Yogyakarta
  ['oseng mercon', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Oseng_mercon.jpg/960px-Oseng_mercon.jpg'],
  ['mercon', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Oseng_mercon.jpg/960px-Oseng_mercon.jpg'],
  ['sate klathak', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Sate_klatak_20170818_Yogyakarta.jpg/960px-Sate_klatak_20170818_Yogyakarta.jpg'],
  ['klathak', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Sate_klatak_20170818_Yogyakarta.jpg/960px-Sate_klatak_20170818_Yogyakarta.jpg'],
  ['brongkos', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Brongkos_1.jpg/960px-Brongkos_1.jpg'],
  ['bakpia', 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Bakpia_pathok.jpg'],
  ['geplak', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/17._Geplak_3.jpg/960px-17._Geplak_3.jpg'],

  // Jawa Timur
  ['rawon', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Rawon_Setan.jpg/960px-Rawon_Setan.jpg'],
  ['soto lamongan', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Soto_ayam.JPG/960px-Soto_ayam.JPG'],
  ['rujak cingur', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Lotek_Indonesian_food.jpg/960px-Lotek_Indonesian_food.jpg'],
  ['rujak', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Lotek_Indonesian_food.jpg/960px-Lotek_Indonesian_food.jpg'],
  ['pecel', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Lotek_Indonesian_food.jpg/960px-Lotek_Indonesian_food.jpg'],
  ['lontong balap', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Katupat_Kandangan_in_Kandangan.JPG/960px-Katupat_Kandangan_in_Kandangan.JPG'],
  ['tahu campur', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Tahu_Campur.jpg/960px-Tahu_Campur.jpg'],
  ['nasi krawu', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Krawu_rice.jpg/960px-Krawu_rice.jpg'],
  ['semanggi', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Marsilea_crenata.JPG/960px-Marsilea_crenata.JPG'],
  ['soto madura', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Soto_Madura_Daging.JPG/960px-Soto_Madura_Daging.JPG'],
  ['bebek sinjay', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/The_Wellknown_%22Bebek_SINJAY%22%2C_Branch_Surabaya_A._Yani_%28New_Branch%29_-_panoramio.jpg/960px-The_Wellknown_%22Bebek_SINJAY%22%2C_Branch_Surabaya_A._Yani_%28New_Branch%29_-_panoramio.jpg'],

  // Jawa Barat
  ['karedok', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Karedok.JPG/960px-Karedok.JPG'],
  ['lotek', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Lotek_Indonesian_food.jpg/960px-Lotek_Indonesian_food.jpg'],
  ['empal gentong', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Empal_gentong_boiled_cow_intestine.JPG/960px-Empal_gentong_boiled_cow_intestine.JPG'],
  ['seblak', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Seblak_2.jpg/960px-Seblak_2.jpg'],
  ['batagor', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Batagor_Savoy_Homann_Bandung.jpg/960px-Batagor_Savoy_Homann_Bandung.jpg'],
  ['cuanki', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Cuanki_Bandung.jpg/960px-Cuanki_Bandung.jpg'],
  ['mie kocok', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Mie_Kocok_Bandung.jpg/960px-Mie_Kocok_Bandung.jpg'],
  ['soto bandung', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Soto_Bandung.jpg/960px-Soto_Bandung.jpg'],

  // Padang
  ['rendang', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Lamb_rendang.jpg/960px-Lamb_rendang.jpg'],
  ['dendeng', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Dendeng_balado.JPG/960px-Dendeng_balado.JPG'],
  ['gulai tunjang', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Gulai_tunjang.JPG/960px-Gulai_tunjang.JPG'],
  ['gulai kepala ikan', 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Gulai_kepala_ikan_khas_aceh.jpg'],
  ['ayam pop', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Ayam_Pop_2.jpg/960px-Ayam_Pop_2.jpg'],
  ['sambal ijo', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Sambal_Hijau_ijo.jpg/960px-Sambal_Hijau_ijo.jpg'],
  ['soto padang', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/SotoPadang.JPG/960px-SotoPadang.JPG'],

  // Betawi
  ['soto betawi', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Soto_Betawi_and_Asinan_Betawi_Sarinah.JPG/960px-Soto_Betawi_and_Asinan_Betawi_Sarinah.JPG'],
  ['kerak telor', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Kerak_Telor_Betawi_Vendor.jpg/960px-Kerak_Telor_Betawi_Vendor.jpg'],
  ['asinan', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Asinan_Betawi_2.jpg/960px-Asinan_Betawi_2.jpg'],

  // Bali
  ['ayam betutu', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Ayam_Betutu_Bali.jpg/960px-Ayam_Betutu_Bali.jpg'],
  ['sate lilit', 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Satay_Lilit.jpg'],
  ['lawar', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Lawar_babi_guling.jpg/960px-Lawar_babi_guling.jpg'],
  ['nasi campur bali', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Nasi_Campur_Bali_Sate_Lilit.jpg/960px-Nasi_Campur_Bali_Sate_Lilit.jpg'],

  // Sulawesi
  ['coto makassar', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Coto_Makassar_preparation.JPG/960px-Coto_Makassar_preparation.JPG'],
  ['pallubasa', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Pallubasa.jpg/960px-Pallubasa.jpg'],
  ['konro', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Sop_Konro.JPG/960px-Sop_Konro.JPG'],
  ['tinutuan', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Tinutuan_bubur_Manado.JPG/960px-Tinutuan_bubur_Manado.JPG'],

  // Kalimantan
  ['soto banjar', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Soto_banjar%2C_Pak_Ahmat%2C_Martapura%2C_South_Kalimantan%2C_2018-07-28_01.jpg/960px-Soto_banjar%2C_Pak_Ahmat%2C_Martapura%2C_South_Kalimantan%2C_2018-07-28_01.jpg'],
  ['ketupat kandangan', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Katupat_Kandangan_in_Kandangan.JPG/960px-Katupat_Kandangan_in_Kandangan.JPG'],

  // Sumatera
  ['pempek', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Pempek_campur.JPG/960px-Pempek_campur.JPG'],
  ['tekwan', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Tekwan.JPG/960px-Tekwan.JPG'],
  ['mie aceh', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Mie_Aceh_with_crab.jpg/960px-Mie_Aceh_with_crab.jpg'],
  ['gulai ikan patin', 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Gulai_kepala_ikan_khas_aceh.jpg'],
  ['bika ambon', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Kue_bika_ambon.JPG/960px-Kue_bika_ambon.JPG'],

  // Umum / basis
  ['nasi goreng', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Nasi_goreng_pattaya_20231028_120535.jpg/960px-Nasi_goreng_pattaya_20231028_120535.jpg'],
  ['sup ayam', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Soto_ayam.JPG/960px-Soto_ayam.JPG'],
  ['soto ayam', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Soto_ayam.JPG/960px-Soto_ayam.JPG'],
  ['tumis bayam', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Tumis_Bayam_Mempawah.jpg/960px-Tumis_Bayam_Mempawah.jpg'],
  ['bayam', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Tumis_Bayam_Mempawah.jpg/960px-Tumis_Bayam_Mempawah.jpg'],
  ['ayam goreng', 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Ayam_goreng_%282%29.JPG'],
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

// Foto representatif per daerah (hidangan ikonik).
export const FOTO_DAERAH = {
  'Jawa Tengah': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Gudeg_Ayam.jpg/960px-Gudeg_Ayam.jpg',
  'Yogyakarta': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Yogyakarta_Indonesia_Tugu-Yogyakarta-01.jpg/960px-Yogyakarta_Indonesia_Tugu-Yogyakarta-01.jpg',
  'Jawa Timur': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Rawon_Setan.jpg/960px-Rawon_Setan.jpg',
  'Jawa Barat': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Karedok.JPG/960px-Karedok.JPG',
  'Padang': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Lamb_rendang.jpg/960px-Lamb_rendang.jpg',
  'Betawi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Soto_Betawi_and_Asinan_Betawi_Sarinah.JPG/960px-Soto_Betawi_and_Asinan_Betawi_Sarinah.JPG',
  'Bali': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Ayam_Betutu_Bali.jpg/960px-Ayam_Betutu_Bali.jpg',
  'Sumatera': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Pempek_campur.JPG/960px-Pempek_campur.JPG',
  'Sulawesi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Coto_Makassar_preparation.JPG/960px-Coto_Makassar_preparation.JPG',
  'Kalimantan': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Soto_banjar%2C_Pak_Ahmat%2C_Martapura%2C_South_Kalimantan%2C_2018-07-28_01.jpg/960px-Soto_banjar%2C_Pak_Ahmat%2C_Martapura%2C_South_Kalimantan%2C_2018-07-28_01.jpg',
}