// Dedupe bahan mirip yang sudah terlanjur ada (satu kali jalan).
// Cara pakai: node scripts/dedupe-bahan.js
// Menggabungkan bahan mirip (varian ejaan/urutan kata) jadi satu, lalu
// mengarahkan ulang pemakaiannya di recipe_ingredients ke bahan canonical.
import path from 'path'
import { fileURLToPath } from 'url'
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
import { bahanMirip } from '../server/bahanMirip.js'

dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.env') })

const db = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'skripsi_masak',
}

const conn = await mysql.createConnection(db)

try {
  const [daftar] = await conn.query(
    'SELECT id, nama_bahan, status_validasi FROM ingredients ORDER BY id',
  )
  console.log(`Total bahan: ${daftar.length}`)

  // Grupkan bahan yang saling mirip (union-find sederhana pada semua pasangan).
  const parent = daftar.map((_, i) => i)
  const find = (i) => (parent[i] === i ? i : (parent[i] = find(parent[i])))
  for (let i = 0; i < daftar.length; i++) {
    for (let j = i + 1; j < daftar.length; j++) {
      if (bahanMirip(daftar[i].nama_bahan, [daftar[j].nama_bahan])) {
        parent[find(i)] = find(j)
      }
    }
  }

  const [pemakaian] = await conn.query(
    'SELECT ingredient_id, COUNT(*) AS n FROM recipe_ingredients GROUP BY ingredient_id',
  )
  const dipakai = new Map(pemakaian.map((p) => [Number(p.ingredient_id), Number(p.n)]))
  const skor = (b) => [
    b.status_validasi === 1 ? 1 : 0,
    dipakai.get(Number(b.id)) || 0,
    b.nama_bahan.length,
    -Number(b.id),
  ]

  const grup = new Map()
  daftar.forEach((b, i) => {
    const root = find(i)
    if (!grup.has(root)) grup.set(root, [])
    grup.get(root).push(b)
  })

  let jumlahMerge = 0
  for (const anggota of grup.values()) {
    if (anggota.length === 1) continue
    anggota.sort((a, b) => {
      const sa = skor(a)
      const sb = skor(b)
      for (let k = 0; k < sa.length; k++) if (sa[k] !== sb[k]) return sb[k] - sa[k]
      return 0
    })
    const [canonical, ...dupe] = anggota
    console.log(`\nMerge "${dupe.map((d) => d.nama_bahan).join('" & "')}" -> "${canonical.nama_bahan}"`)
    await conn.beginTransaction()
    try {
      for (const d of dupe) {
        await conn.query(
          'UPDATE recipe_ingredients SET ingredient_id = ? WHERE ingredient_id = ?',
          [canonical.id, d.id],
        )
        await conn.query('DELETE FROM ingredients WHERE id = ?', [d.id])
      }
      await conn.commit()
      jumlahMerge += dupe.length
    } catch (error) {
      await conn.rollback()
      throw error
    }
  }

  console.log(`\nSelesai. ${jumlahMerge} bahan duplikat digabung.`)
} finally {
  await conn.end()
}