// Seed data "Resep Masakan Nusantara" — mengisi bahan & resep khas Indonesia.
// Idempotent: resep dengan judul sama dilewati, bahan ditambah jika belum ada.
// Cara pakai: node scripts/seed-nusantara.js
import path from 'path'
import { fileURLToPath } from 'url'
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.env') })


const HOST = process.env.DB_HOST || 'localhost'
const PORT = Number(process.env.DB_PORT) || 3306
const USER = process.env.DB_USER || 'root'
const PASS = process.env.DB_PASSWORD || ''
const BASE = process.env.DB_NAME || 'skripsi_masak'

// [nama, kategori]
const BAHAN = [
  ['Nasi', 'Karbohidrat'], ['Beras', 'Karbohidrat'], ['Mi', 'Karbohidrat'], ['Bihun', 'Karbohidrat'],
  ['Lontong', 'Karbohidrat'], ['Ketupat', 'Karbohidrat'], ['Kerupuk', 'Karbohidrat'],
  ['Tepung Sagu', 'Karbohidrat'], ['Tepung Beras', 'Karbohidrat'], ['Tepung Terigu', 'Karbohidrat'],
  ['Ayam', 'Protein'], ['Telur', 'Protein'], ['Daging Sapi', 'Protein'], ['Daging Kambing', 'Protein'],
  ['Ikan', 'Protein'], ['Udang', 'Protein'], ['Cumi', 'Protein'], ['Tempe', 'Protein'], ['Tahu', 'Protein'],
  ['Bebek', 'Protein'], ['Iga Sapi', 'Protein'], ['Kaki Sapi', 'Protein'], ['Ikan Teri', 'Protein'],
  ['Kacang Hijau', 'Protein'], ['Oncom', 'Protein'], ['Kelapa', 'Protein'], ['Santan', 'Bumbu'],
  ['Bayam', 'Sayuran'], ['Kangkung', 'Sayuran'], ['Kol', 'Sayuran'], ['Kubis', 'Sayuran'],
  ['Wortel', 'Sayuran'], ['Kentang', 'Sayuran'], ['Tomat', 'Sayuran'], ['Jagung', 'Sayuran'],
  ['Terong', 'Sayuran'], ['Jamur', 'Sayuran'], ['Daun Bawang', 'Sayuran'], ['Kacang Panjang', 'Sayuran'],
  ['Taoge', 'Sayuran'], ['Timun', 'Sayuran'], ['Sawi', 'Sayuran'], ['Kacang Tanah', 'Sayuran'],
  ['Daun Singkong', 'Sayuran'], ['Genjer', 'Sayuran'], ['Pepaya Muda', 'Sayuran'], ['Labu Kuning', 'Sayuran'],
  ['Jengkol', 'Sayuran'], ['Kemangi', 'Sayuran'], ['Petai', 'Sayuran'],
  ['Bawang Merah', 'Bumbu'], ['Bawang Putih', 'Bumbu'], ['Cabai', 'Bumbu'], ['Cabai Rawit', 'Bumbu'],
  ['Jahe', 'Bumbu'], ['Kencur', 'Bumbu'], ['Lengkuas', 'Bumbu'], ['Kunyit', 'Bumbu'], ['Kemiri', 'Bumbu'],
  ['Ketumbar', 'Bumbu'], ['Jintan', 'Bumbu'], ['Terasi', 'Bumbu'], ['Asam Jawa', 'Bumbu'],
  ['Daun Salam', 'Bumbu'], ['Daun Jeruk', 'Bumbu'], ['Serai', 'Bumbu'], ['Kayu Manis', 'Bumbu'],
  ['Cengkeh', 'Bumbu'], ['Pala', 'Bumbu'], ['Kapulaga', 'Bumbu'], ['Merica', 'Bumbu'], ['Kluwak', 'Bumbu'],
  ['Ebi', 'Bumbu'], ['Garam', 'Bumbu'], ['Gula', 'Bumbu'], ['Gula Merah', 'Bumbu'], ['Kecap Manis', 'Bumbu'],
  ['Minyak Goreng', 'Bumbu'], ['Penyedap', 'Bumbu'], ['Kaldu Ayam', 'Bumbu'],
]

// [judul, daerah, porsi, [bahan]]
const RESEP = [
  // ===== Jawa Tengah =====
  ['Gudeg', 'Jawa Tengah', 4, ['Ayam', 'Telur', 'Santan', 'Kunyit', 'Daun Salam', 'Gula Merah', 'Bawang Merah', 'Bawang Putih', 'Nasi']],
  ['Soto Kudus', 'Jawa Tengah', 4, ['Daging Sapi', 'Telur', 'Taoge', 'Daun Bawang', 'Lontong', 'Kecap Manis', 'Bawang Putih', 'Santan']],
  ['Garang Asem', 'Jawa Tengah', 3, ['Ayam', 'Wortel', 'Kacang Panjang', 'Tomat', 'Daun Salam', 'Serai', 'Asam Jawa', 'Cabai', 'Minyak Goreng']],
  ['Nasi Liwet Solo', 'Jawa Tengah', 3, ['Beras', 'Santan', 'Daun Salam', 'Serai', 'Ayam', 'Telur', 'Bawang Merah', 'Bawang Putih']],
  ['Tengkleng Solo', 'Jawa Tengah', 3, ['Kaki Sapi', 'Wortel', 'Tomat', 'Santan', 'Bawang Merah', 'Bawang Putih', 'Serai', 'Daun Salam']],
  ['Mangut Lele', 'Jawa Tengah', 3, ['Ikan', 'Santan', 'Kemangi', 'Cabai', 'Bawang Merah', 'Bawang Putih', 'Kunyit', 'Lengkuas']],
  ['Selat Solo', 'Jawa Tengah', 2, ['Daging Sapi', 'Wortel', 'Kentang', 'Tomat', 'Kecap Manis', 'Merica', 'Bawang Putih', 'Minyak Goreng']],
  ['Tahu Gimbal', 'Jawa Tengah', 2, ['Tahu', 'Taoge', 'Telur', 'Daun Bawang', 'Kacang Tanah', 'Cabai', 'Bawang Putih', 'Minyak Goreng']],
  ['Lumpia Semarang', 'Jawa Tengah', 3, ['Tepung Terigu', 'Wortel', 'Telur', 'Kacang Panjang', 'Bawang Putih', 'Minyak Goreng', 'Garam']],
  ['Tempe Mendoan', 'Jawa Tengah', 2, ['Tempe', 'Tepung Terigu', 'Kunyit', 'Bawang Putih', 'Daun Bawang', 'Merica', 'Minyak Goreng']],
  // ===== Yogyakarta =====
  ['Gudeg Jogja', 'Yogyakarta', 4, ['Ayam', 'Telur', 'Santan', 'Gula Merah', 'Daun Salam', 'Kunyit', 'Bawang Merah', 'Bawang Putih', 'Nasi']],
  ['Oseng Mercon', 'Yogyakarta', 2, ['Daging Sapi', 'Cabai', 'Cabai Rawit', 'Tomat', 'Jahe', 'Bawang Merah', 'Bawang Putih', 'Minyak Goreng']],
  ['Sate Klathak', 'Yogyakarta', 2, ['Daging Kambing', 'Merica', 'Garam', 'Kecap Manis', 'Cabai', 'Bawang Merah', 'Bawang Putih']],
  ['Brongkos', 'Yogyakarta', 3, ['Kacang Tanah', 'Santan', 'Cabai', 'Kencur', 'Gula Merah', 'Daun Salam', 'Bawang Merah', 'Bawang Putih']],
  ['Bakpia', 'Yogyakarta', 4, ['Tepung Terigu', 'Kacang Hijau', 'Gula', 'Santan', 'Minyak Goreng']],
  ['Geplak', 'Yogyakarta', 4, ['Kelapa', 'Gula Merah', 'Garam']],
  // ===== Jawa Timur =====
  ['Rawon', 'Jawa Timur', 4, ['Daging Sapi', 'Kluwak', 'Santan', 'Serai', 'Daun Salam', 'Lengkuas', 'Bawang Merah', 'Bawang Putih', 'Taoge']],
  ['Soto Lamongan', 'Jawa Timur', 4, ['Ayam', 'Telur', 'Taoge', 'Kubis', 'Daun Bawang', 'Bawang Merah', 'Bawang Putih', 'Kemangi', 'Jahe']],
  ['Rujak Cingur', 'Jawa Timur', 3, ['Daging Sapi', 'Kacang Tanah', 'Timun', 'Kangkung', 'Tahu', 'Tempe', 'Terasi', 'Gula Merah', 'Cabai']],
  ['Pecel Madiun', 'Jawa Timur', 3, ['Kacang Tanah', 'Kangkung', 'Bayam', 'Taoge', 'Terasi', 'Gula Merah', 'Cabai', 'Daun Jeruk']],
  ['Lontong Balap', 'Jawa Timur', 3, ['Lontong', 'Taoge', 'Kecap Manis', 'Bawang Putih', 'Terasi', 'Cabai', 'Kacang Tanah', 'Tahu']],
  ['Tahu Campur', 'Jawa Timur', 2, ['Tahu', 'Taoge', 'Kecap Manis', 'Terasi', 'Cabai', 'Daun Bawang', 'Telur']],
  ['Nasi Krawu', 'Jawa Timur', 3, ['Nasi', 'Daging Sapi', 'Santan', 'Serai', 'Kunyit', 'Bawang Merah', 'Bawang Putih']],
  ['Semanggi Surabaya', 'Jawa Timur', 2, ['Genjer', 'Kacang Tanah', 'Gula Merah', 'Cabai', 'Terasi', 'Kencur']],
  ['Soto Madura', 'Jawa Timur', 3, ['Daging Sapi', 'Kacang Tanah', 'Kecap Manis', 'Bawang Putih', 'Kunyit', 'Serai', 'Santan']],
  ['Bebek Sinjay', 'Jawa Timur', 3, ['Bebek', 'Cabai', 'Jahe', 'Kunyit', 'Kemangi', 'Bawang Merah', 'Bawang Putih', 'Minyak Goreng']],
  // ===== Jawa Barat =====
  ['Karedok', 'Jawa Barat', 2, ['Kacang Tanah', 'Kacang Panjang', 'Timun', 'Taoge', 'Kemangi', 'Terasi', 'Gula Merah', 'Cabai']],
  ['Lotek', 'Jawa Barat', 2, ['Kacang Tanah', 'Kangkung', 'Bayam', 'Taoge', 'Kemangi', 'Terasi', 'Gula Merah', 'Cabai', 'Tahu']],
  ['Nasi Tutug Oncom', 'Jawa Barat', 3, ['Beras', 'Oncom', 'Kelapa', 'Bawang Merah', 'Cabai', 'Kemangi']],
  ['Empal Gentong', 'Jawa Barat', 3, ['Daging Sapi', 'Santan', 'Serai', 'Kunyit', 'Cengkeh', 'Bawang Merah', 'Bawang Putih', 'Kemiri']],
  ['Seblak', 'Jawa Barat', 2, ['Kerupuk', 'Telur', 'Cabai', 'Kencur', 'Bawang Merah', 'Daun Bawang', 'Sawi', 'Jamur']],
  ['Batagor', 'Jawa Barat', 2, ['Tahu', 'Tepung Terigu', 'Telur', 'Kacang Tanah', 'Cabai', 'Bawang Putih', 'Minyak Goreng']],
  ['Cuanki', 'Jawa Barat', 2, ['Udang', 'Tepung Sagu', 'Telur', 'Bawang Putih', 'Daun Bawang', 'Taoge']],
  ['Mie Kocok', 'Jawa Barat', 2, ['Mi', 'Telur', 'Udang', 'Daun Bawang', 'Taoge', 'Kecap Manis', 'Bawang Putih', 'Kaldu Ayam']],
  ['Surabi', 'Jawa Barat', 3, ['Tepung Beras', 'Santan', 'Gula', 'Kelapa', 'Garam']],
  ['Soto Bandung', 'Jawa Barat', 3, ['Daging Sapi', 'Daun Bawang', 'Serai', 'Jahe', 'Kunyit', 'Wortel', 'Taoge', 'Bawang Putih']],
  // ===== Padang =====
  ['Rendang', 'Padang', 5, ['Daging Sapi', 'Santan', 'Serai', 'Daun Jeruk', 'Lengkuas', 'Kemiri', 'Kunyit', 'Jahe', 'Cabai', 'Kayu Manis', 'Cengkeh', 'Pala']],
  ['Dendeng Balado', 'Padang', 3, ['Daging Sapi', 'Cabai', 'Bawang Merah', 'Bawang Putih', 'Asam Jawa', 'Gula', 'Kemiri', 'Minyak Goreng']],
  ['Gulai Tunjang', 'Padang', 3, ['Kaki Sapi', 'Santan', 'Cabai', 'Kunyit', 'Kemiri', 'Serai', 'Daun Jeruk', 'Asam Jawa']],
  ['Ayam Pop', 'Padang', 3, ['Ayam', 'Santan', 'Serai', 'Jahe', 'Kunyit', 'Lengkuas', 'Bawang Putih', 'Minyak Goreng']],
  ['Gulai Kepala Ikan', 'Padang', 3, ['Ikan', 'Santan', 'Cabai', 'Kunyit', 'Kemiri', 'Serai', 'Daun Jeruk', 'Asam Jawa', 'Kemangi']],
  ['Sambal Ijo', 'Padang', 2, ['Cabai', 'Tomat', 'Bawang Merah', 'Gula', 'Garam', 'Minyak Goreng']],
  ['Soto Padang', 'Padang', 3, ['Daging Sapi', 'Kentang', 'Daun Bawang', 'Santan', 'Serai', 'Kunyit', 'Jahe', 'Kemiri', 'Bawang Putih']],
  // ===== Betawi =====
  ['Soto Betawi', 'Betawi', 4, ['Daging Sapi', 'Santan', 'Daun Bawang', 'Serai', 'Jahe', 'Daun Salam', 'Merica', 'Kentang']],
  ['Kerak Telor', 'Betawi', 2, ['Telur', 'Beras', 'Santan', 'Ebi', 'Bawang Merah', 'Kelapa']],
  ['Asinan Betawi', 'Betawi', 2, ['Kol', 'Kubis', 'Wortel', 'Taoge', 'Timun', 'Kacang Tanah', 'Terasi', 'Gula Merah', 'Cabai']],
  ['Semur Jengkol', 'Betawi', 3, ['Jengkol', 'Kecap Manis', 'Daun Salam', 'Serai', 'Kemiri', 'Bawang Merah', 'Bawang Putih', 'Gula']],
  ['Gabus Pucung', 'Betawi', 3, ['Ikan', 'Kluwak', 'Santan', 'Daun Salam', 'Serai', 'Asam Jawa', 'Bawang Merah', 'Bawang Putih']],
  // ===== Bali =====
  ['Ayam Betutu', 'Bali', 4, ['Ayam', 'Cabai', 'Serai', 'Daun Salam', 'Daun Jeruk', 'Jahe', 'Kunyit', 'Lengkuas', 'Bawang Merah', 'Kemiri']],
  ['Sate Lilit', 'Bali', 3, ['Udang', 'Kelapa', 'Cabai', 'Serai', 'Kemiri', 'Kunyit', 'Bawang Merah', 'Bawang Putih', 'Gula Merah']],
  ['Lawar', 'Bali', 3, ['Ayam', 'Serai', 'Cabai', 'Kunyit', 'Bawang Merah', 'Bawang Putih', 'Santan', 'Kelapa']],
  ['Nasi Campur Bali', 'Bali', 3, ['Nasi', 'Ayam', 'Cabai', 'Serai', 'Kunyit', 'Kemiri', 'Bawang Merah', 'Kelapa', 'Kemangi']],
  ['Tum Ayam', 'Bali', 3, ['Ayam', 'Cabai', 'Serai', 'Daun Salam', 'Daun Jeruk', 'Jahe', 'Kunyit', 'Lengkuas', 'Bawang Merah', 'Kemiri']],
  // ===== Sulawesi =====
  ['Coto Makassar', 'Sulawesi', 4, ['Daging Sapi', 'Santan', 'Kacang Tanah', 'Serai', 'Jahe', 'Kemiri', 'Ketumbar', 'Bawang Putih']],
  ['Pallubasa', 'Sulawesi', 4, ['Daging Sapi', 'Santan', 'Kacang Tanah', 'Serai', 'Jahe', 'Kemiri', 'Ketumbar', 'Bawang Putih']],
  ['Sop Konro', 'Sulawesi', 4, ['Iga Sapi', 'Kecap Manis', 'Asam Jawa', 'Kemiri', 'Ketumbar', 'Jahe', 'Daun Salam', 'Serai']],
  ['Tinutuan', 'Sulawesi', 3, ['Beras', 'Jagung', 'Labu Kuning', 'Kangkung', 'Kemangi', 'Ikan Teri', 'Bawang Merah', 'Bawang Putih']],
  ['Ikan Woku', 'Sulawesi', 3, ['Ikan', 'Kemangi', 'Jahe', 'Kunyit', 'Serai', 'Daun Jeruk', 'Cabai', 'Bawang Merah', 'Tomat']],
  // ===== Kalimantan =====
  ['Soto Banjar', 'Kalimantan', 4, ['Ayam', 'Telur', 'Kentang', 'Daun Bawang', 'Santan', 'Serai', 'Jahe', 'Kunyit', 'Kemiri', 'Bihun']],
  ['Ketupat Kandangan', 'Kalimantan', 3, ['Ketupat', 'Ikan', 'Santan', 'Serai', 'Lengkuas', 'Cabai', 'Bawang Merah', 'Kunyit']],
  ['Juhu Singkah', 'Kalimantan', 3, ['Ayam', 'Santan', 'Serai', 'Jahe', 'Cabai', 'Bawang Merah', 'Bawang Putih', 'Kemiri']],
  // ===== Sumatera =====
  ['Pempek', 'Sumatera', 4, ['Ikan', 'Tepung Sagu', 'Telur', 'Bawang Putih', 'Garam', 'Minyak Goreng']],
  ['Tekwan', 'Sumatera', 3, ['Udang', 'Tepung Sagu', 'Telur', 'Daun Bawang', 'Bawang Putih', 'Kaldu Ayam', 'Taoge']],
  ['Mie Aceh', 'Sumatera', 3, ['Mi', 'Udang', 'Cabai', 'Bawang Putih', 'Kecap Manis', 'Tomat', 'Jintan', 'Daun Bawang']],
  ['Gulai Ikan Patin', 'Sumatera', 3, ['Ikan', 'Santan', 'Cabai', 'Kunyit', 'Kemiri', 'Serai', 'Asam Jawa', 'Kemangi']],
  ['Bika Ambon', 'Sumatera', 4, ['Telur', 'Tepung Terigu', 'Santan', 'Gula', 'Kayu Manis']],
]

function buatLangkah(nama, daerah, porsi) {
  const langkahPertengahan = [
    `Tumis atau rebus bumbu khas ${daerah} hingga harum sebelum dimasukkan bahan utama.`,
    `Masak dengan api kecil agar bumbu ${nama} meresap sempurna.`,
    `Bakar, kukus, atau sangrai sesuai teknik tradisional ${daerah}.`,
  ]
  const idx = [...nama].reduce((a, c) => a + c.charCodeAt(0), 0)
  return [
    `Siapkan dan bersihkan seluruh bahan untuk ${nama}.`,
    langkahPertengahan[idx % langkahPertengahan.length],
    `Koreksi rasa, lalu sajikan ${nama} hangat untuk ${porsi} porsi.`,
  ]
}

async function main() {
  const conn = await mysql.createConnection({ host: HOST, port: PORT, user: USER, password: PASS, database: BASE })

  // 1) Bahan (upsert, pastikan disetujui agar muncul di publik)
  const idBahan = new Map()
  for (const [nama, kategori] of BAHAN) {
    await conn.execute(
      'INSERT INTO ingredients (nama_bahan, kategori, status_validasi) VALUES (?, ?, TRUE) ' +
      'ON DUPLICATE KEY UPDATE status_validasi = TRUE',
      [nama, kategori],
    )
    const [rows] = await conn.query('SELECT id FROM ingredients WHERE nama_bahan = ?', [nama])
    if (rows[0]) idBahan.set(nama, rows[0].id)
  }
  console.log(`Bahan: ${idBahan.size} disiapkan`)

  // 2) Resep (skip jika judul sudah ada)
  let ditambahkan = 0
  for (const [judul, daerah, porsi, bahanList] of RESEP) {
    const [ada] = await conn.query('SELECT id FROM recipes WHERE judul_resep = ?', [judul])
    if (ada.length) continue

    const langkah = buatLangkah(judul, daerah, porsi)
    const [res] = await conn.execute(
      'INSERT INTO recipes (judul_resep, kategori, porsi_default, langkah_memasak) VALUES (?, ?, ?, ?)',
      [judul, daerah, porsi, JSON.stringify(langkah.map((instruksi) => ({ instruksi })))],
    )
    const resepId = res.insertId

    for (const nama of bahanList) {
      const id = idBahan.get(nama)
      if (!id) {
        console.warn(`  [lewat] bahan "${nama}" tidak ada untuk "${judul}"`)
        continue
      }
      await conn.execute(
        'INSERT INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan) VALUES (?, ?, 1, ?)',
        [resepId, id, 'secukupnya'],
      )
    }
    ditambahkan++
    console.log(`  + ${judul} (${daerah})`)
  }

  console.log(`Selesai. Resep baru: ${ditambahkan}`)
  await conn.end()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})