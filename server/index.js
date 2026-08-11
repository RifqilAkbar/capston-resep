import 'dotenv/config'
import bcrypt from 'bcryptjs'
import cors from 'cors'
import express from 'express'
import jwt from 'jsonwebtoken'
import mysql from 'mysql2/promise'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { jalankanMigrasi, bagikanResepAdminKeUser } from './migrate.js'

const app = express()
const port = process.env.PORT || 3001
const jwtSecret = process.env.JWT_SECRET || 'dev-secret-ganti-di-env'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '..', 'dist')

// Konfigurasi database: pakai DB_* (Laragon lokal) atau fallback ke MYSQL_*
// yang otomatis disediakan Railway untuk service MySQL dalam project yang sama.
function getDbConfig() {
  return {
    host: process.env.DB_HOST || process.env.MYSQLHOST || 'localhost',
    port: Number(process.env.DB_PORT || process.env.MYSQLPORT || 3306),
    user: process.env.DB_USER || process.env.MYSQLUSER || 'root',
    password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || '',
    database: process.env.DB_NAME || process.env.MYSQLDATABASE || 'skripsi_masak',
  }
}

const dbConfig = getDbConfig()

// Pool MySQL/MariaDB ini cocok untuk Laragon default & Railway MySQL.
const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  namedPlaceholders: false,
})

// CORS: izinkan origin GitHub Pages (dari env CORS_ORIGIN, pisahkan dengan koma).
const corsOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

app.use(cors(corsOrigins.length > 0 ? { origin: corsOrigins } : undefined))
app.use(express.json())
app.use(express.static(distDir))

// Helper standar agar error database/API selalu punya format yang konsisten.
function kirimError(res, status, message) {
  return res.status(status).json({ error: message })
}

function parseJsonField(value, fallback) {
  if (value == null) return fallback
  if (typeof value !== 'string') return value

  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

function formatBahan(row) {
  return {
    ...row,
    status_validasi: Boolean(row.status_validasi),
  }
}

function formatResep(row) {
  return {
    ...row,
    langkah_memasak: parseJsonField(row.langkah_memasak, []),
    recipe_ingredients: parseJsonField(row.recipe_ingredients, []),
  }
}

function formatUser(row) {
  return {
    id: row.id,
    nama_lengkap: row.nama_lengkap || '',
    username: row.username || '',
    email: row.email,
    bio: row.bio || '',
    foto_profil: row.foto_profil || '',
    role: row.role,
    created_at: row.created_at,
  }
}

// Admin biasa dan superadmin sama-sama punya akses moderasi.
function isAdminRole(role) {
  return role === 'admin' || role === 'superadmin'
}

// Token berisi data minimum yang dibutuhkan UI: id, email, dan role.
function buatToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    jwtSecret,
    { expiresIn: '7d' },
  )
}

function formatSession(user, token) {
  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      nama_lengkap: user.nama_lengkap || '',
      username: user.username || '',
      bio: user.bio || '',
      foto_profil: user.foto_profil || '',
    },
  }
}

// Middleware auth membaca header Bearer token sebelum route yang butuh login.
function wajibLogin(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''

  if (!token) return kirimError(res, 401, 'Token login tidak ditemukan.')

  try {
    req.user = jwt.verify(token, jwtSecret)
    return next()
  } catch {
    return kirimError(res, 401, 'Sesi sudah tidak valid, silakan login ulang.')
  }
}

// Middleware admin menjaga route moderasi agar tidak bisa dipakai user biasa.
function wajibAdmin(req, res, next) {
  if (!isAdminRole(req.user?.role)) {
    return kirimError(res, 403, 'Akses admin diperlukan.')
  }

  return next()
}

// Middleware superadmin: hanya superadmin yang bisa kelola akun & role user.
function wajibSuperadmin(req, res, next) {
  if (req.user?.role !== 'superadmin') {
    return kirimError(res, 403, 'Akses superadmin diperlukan.')
  }

  return next()
}

// Bagian SQL relasi bahan dipakai ulang oleh daftar & detail resep.
const SQL_RECIPE_INGREDIENTS = `
  COALESCE(
    (
      SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
          'ingredient_id', ri.ingredient_id,
          'nama_bahan', i.nama_bahan,
          'kategori', i.kategori,
          'kuantitas', ri.kuantitas,
          'satuan', ri.satuan
        )
      )
      FROM recipe_ingredients ri
      JOIN ingredients i ON i.id = ri.ingredient_id
      WHERE ri.recipe_id = r.id
    ),
    JSON_ARRAY()
  ) AS recipe_ingredients
`

const SQL_RECIPE_RATING = `
  COALESCE((SELECT ROUND(AVG(nilai), 1) FROM ratings x WHERE x.recipe_id = r.id), 0) AS rating_avg,
  (SELECT COUNT(*) FROM ratings x WHERE x.recipe_id = r.id) AS rating_count
`

async function listResep(where = '', params = []) {
  const [rows] = await pool.query(
    `SELECT
       r.id,
       r.judul_resep,
       r.kategori,
       r.porsi_default,
       r.langkah_memasak,
       r.durasi_menit,
       r.created_at,
       r.user_id,
       r.status,
       u.nama_lengkap AS pembuat_nama,
       u.username AS pembuat_username,
       ${SQL_RECIPE_INGREDIENTS},
       ${SQL_RECIPE_RATING}
     FROM recipes r
     LEFT JOIN users u ON u.id = r.user_id
     ${where}
     ORDER BY r.created_at DESC, r.id DESC`,
    params,
  )
  return rows.map(formatResep)
}

app.get('/api/health', async (_req, res) => {
  const [rows] = await pool.query('SELECT NOW() AS waktu_database')
  res.json({ ok: true, database: rows[0].waktu_database })
})

app.get('/api/auth/session', wajibLogin, async (req, res) => {
  // Session divalidasi ulang ke database agar perubahan role langsung terbaca.
  const [rows] = await pool.query(
    'SELECT id, email, role, nama_lengkap, username, bio, foto_profil FROM users WHERE id = ?',
    [req.user.id],
  )

  if (rows.length === 0) return kirimError(res, 401, 'User tidak ditemukan.')

  res.json({ session: formatSession(rows[0], req.headers.authorization.slice(7)) })
})

app.post('/api/auth/register', async (req, res) => {
  const namaLengkap = String(req.body.nama_lengkap || '').trim()
  const username = String(req.body.username || '').trim()
  const email = String(req.body.email || '').trim().toLowerCase()
  const password = String(req.body.password || '')

  if (!namaLengkap || !email || !password) {
    return kirimError(res, 400, 'Nama lengkap, email, dan password wajib diisi.')
  }

  if (password.length < 6) {
    return kirimError(res, 400, 'Password minimal 6 karakter.')
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const usernameFinal = username || email.split('@')[0]

  try {
    await pool.query(
      'INSERT INTO users (nama_lengkap, username, email, password_hash, role) VALUES (?, ?, ?, ?, ?)',
      [namaLengkap, usernameFinal, email, passwordHash, 'user'],
    )

    res.status(201).json({ message: 'Pendaftaran berhasil. Silakan login.' })
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return kirimError(res, 409, 'Email atau username sudah terdaftar.')
    }

    throw error
  }
})

app.post('/api/auth/login', async (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase()
  const password = String(req.body.password || '')

  const [rows] = await pool.query(
    'SELECT id, email, password_hash, role, nama_lengkap, username, bio, foto_profil FROM users WHERE email = ?',
    [email],
  )

  const user = rows[0]
  const passwordCocok = user ? await bcrypt.compare(password, user.password_hash) : false

  if (!passwordCocok) return kirimError(res, 401, 'Email atau password salah.')

  const token = buatToken(user)
  res.json({ session: formatSession(user, token) })
})

// ===== Profil user yang sedang login =====
app.get('/api/profile', wajibLogin, async (req, res) => {
  const [rows] = await pool.query(
    'SELECT id, nama_lengkap, username, email, bio, foto_profil, role, created_at FROM users WHERE id = ?',
    [req.user.id],
  )
  if (rows.length === 0) return kirimError(res, 404, 'User tidak ditemukan.')

  res.json({ profil: formatUser(rows[0]) })
})

app.patch('/api/profile', wajibLogin, async (req, res) => {
  const namaLengkap = String(req.body.nama_lengkap || '').trim()
  const username = String(req.body.username || '').trim()
  const bio = String(req.body.bio || '').trim()
  const email = String(req.body.email || '').trim().toLowerCase()

  if (!namaLengkap || !email) {
    return kirimError(res, 400, 'Nama lengkap dan email wajib diisi.')
  }

  try {
    await pool.query(
      'UPDATE users SET nama_lengkap = ?, username = ?, email = ?, bio = ? WHERE id = ?',
      [namaLengkap, username || null, email, bio, req.user.id],
    )

    const [rows] = await pool.query(
      'SELECT id, nama_lengkap, username, email, bio, foto_profil, role, created_at FROM users WHERE id = ?',
      [req.user.id],
    )
    res.json({ profil: formatUser(rows[0]) })
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return kirimError(res, 409, 'Email atau username sudah dipakai user lain.')
    }
    throw error
  }
})

app.patch('/api/profile/password', wajibLogin, async (req, res) => {
  const passwordLama = String(req.body.password_lama || '')
  const passwordBaru = String(req.body.password_baru || '')

  if (passwordBaru.length < 6) {
    return kirimError(res, 400, 'Password baru minimal 6 karakter.')
  }

  const [rows] = await pool.query('SELECT password_hash FROM users WHERE id = ?', [req.user.id])
  if (rows.length === 0) return kirimError(res, 404, 'User tidak ditemukan.')

  const cocok = await bcrypt.compare(passwordLama, rows[0].password_hash)
  if (!cocok) return kirimError(res, 400, 'Password lama salah.')

  const passwordHash = await bcrypt.hash(passwordBaru, 10)
  await pool.query('UPDATE users SET password_hash = ? WHERE id = ?', [passwordHash, req.user.id])

  res.json({ message: 'Password berhasil diubah.' })
})

// ===== Resep =====

app.post('/api/recipes', wajibLogin, async (req, res) => {
  const judulResep = String(req.body.judul_resep || '').trim()
  const kategori = String(req.body.kategori || 'Lainnya').trim()
  const porsiDefault = Number.parseInt(req.body.porsi_default, 10) || 1
  const durasiMenit = Number.parseInt(req.body.durasi_menit, 10) || 15
  const langkahMemasak = Array.isArray(req.body.langkah_memasak) ? req.body.langkah_memasak : []
  const ingredientIds = Array.isArray(req.body.ingredient_ids) ? req.body.ingredient_ids : []

  if (!judulResep || ingredientIds.length === 0) {
    return kirimError(res, 400, 'Judul resep dan minimal 1 bahan wajib diisi.')
  }

  // Resep buatan admin/superadmin langsung tampil; resep user menunggu persetujuan.
  const status = isAdminRole(req.user.role) ? 'approved' : 'pending'

  const client = await pool.getConnection()

  try {
    await client.beginTransaction()

    const [recipeResult] = await client.query(
      'INSERT INTO recipes (judul_resep, kategori, porsi_default, durasi_menit, langkah_memasak, user_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [judulResep, kategori, porsiDefault, durasiMenit, JSON.stringify(langkahMemasak), req.user.id, status],
    )

    const resepId = recipeResult.insertId

    for (const ingredientId of ingredientIds) {
      await client.query(
        'INSERT INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan) VALUES (?, ?, ?, ?)',
        [resepId, ingredientId, 1, 'secukupnya'],
      )
    }

    await client.commit()
    const [rows] = await pool.query(
      'SELECT id, judul_resep, kategori, durasi_menit, langkah_memasak, user_id, status FROM recipes WHERE id = ?',
      [resepId],
    )
    res.status(201).json({ resep: formatResep({ ...rows[0], recipe_ingredients: [] }) })
  } catch (error) {
    await client.rollback()
    throw error
  } finally {
    client.release()
  }
})

// Daftar resep milik user yang sedang login (termasuk pending/rejected).
app.get('/api/recipes/mine', wajibLogin, async (req, res) => {
  const resep = await listResep('WHERE r.user_id = ?', [req.user.id])
  res.json({ resep })
})

app.get('/api/recipes/:id', wajibLogin, async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id) || id <= 0) {
    return kirimError(res, 400, 'ID resep tidak valid.')
  }

  const resep = await listResep('WHERE r.id = ?', [id])
  const item = resep[0]
  if (!item) return kirimError(res, 404, 'Resep tidak ditemukan.')

  const bolehLihat = isAdminRole(req.user.role) || item.user_id === req.user.id || item.status === 'approved'
  if (!bolehLihat) return kirimError(res, 403, 'Resep belum disetujui.')

  res.json({ resep: item })
})

app.patch('/api/recipes/:id', wajibLogin, async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id) || id <= 0) {
    return kirimError(res, 400, 'ID resep tidak valid.')
  }

  const judulResep = String(req.body.judul_resep || '').trim()
  const kategori = String(req.body.kategori || 'Lainnya').trim()
  const porsiDefault = Number.parseInt(req.body.porsi_default, 10) || 1
  const durasiMenit = Number.parseInt(req.body.durasi_menit, 10) || 15
  const langkahMemasak = Array.isArray(req.body.langkah_memasak) ? req.body.langkah_memasak : []
  const ingredientIds = Array.isArray(req.body.ingredient_ids) ? req.body.ingredient_ids : []

  if (!judulResep || ingredientIds.length === 0) {
    return kirimError(res, 400, 'Judul resep dan minimal 1 bahan wajib diisi.')
  }

  const [cek] = await pool.query('SELECT id, user_id FROM recipes WHERE id = ?', [id])
  if (cek.length === 0) return kirimError(res, 404, 'Resep tidak ditemukan.')

  if (!isAdminRole(req.user.role) && cek[0].user_id !== req.user.id) {
    return kirimError(res, 403, 'Anda tidak berhak mengedit resep ini.')
  }

  const client = await pool.getConnection()

  try {
    await client.beginTransaction()

    await client.query(
      'UPDATE recipes SET judul_resep = ?, kategori = ?, porsi_default = ?, durasi_menit = ?, langkah_memasak = ? WHERE id = ?',
      [judulResep, kategori, porsiDefault, durasiMenit, JSON.stringify(langkahMemasak), id],
    )

    await client.query('DELETE FROM recipe_ingredients WHERE recipe_id = ?', [id])
    for (const ingredientId of ingredientIds) {
      await client.query(
        'INSERT INTO recipe_ingredients (recipe_id, ingredient_id, kuantitas, satuan) VALUES (?, ?, ?, ?)',
        [id, ingredientId, 1, 'secukupnya'],
      )
    }

    await client.commit()
  } catch (error) {
    await client.rollback()
    throw error
  } finally {
    client.release()
  }

  const [resep] = await listResep('WHERE r.id = ?', [id])
  res.json({ resep })
})

app.delete('/api/recipes/:id', wajibLogin, async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id) || id <= 0) {
    return kirimError(res, 400, 'ID resep tidak valid.')
  }

  const [cek] = await pool.query('SELECT id, user_id FROM recipes WHERE id = ?', [id])
  if (cek.length === 0) return kirimError(res, 404, 'Resep tidak ditemukan.')

  if (!isAdminRole(req.user.role) && cek[0].user_id !== req.user.id) {
    return kirimError(res, 403, 'Anda tidak berhak menghapus resep ini.')
  }

  await pool.query('DELETE FROM recipes WHERE id = ?', [id])
  res.json({ message: 'Resep berhasil dihapus.' })
})

// ===== Admin: kelola resep & user =====

app.get('/api/admin/recipes', wajibLogin, wajibAdmin, async (_req, res) => {
  const resep = await listResep()
  res.json({ resep })
})

app.patch('/api/admin/recipes/:id/status', wajibLogin, wajibAdmin, async (req, res) => {
  const id = Number(req.params.id)
  const status = String(req.body.status || '')

  if (!Number.isInteger(id) || id <= 0) {
    return kirimError(res, 400, 'ID resep tidak valid.')
  }

  if (!['pending', 'approved', 'rejected'].includes(status)) {
    return kirimError(res, 400, 'Status tidak valid.')
  }

  const [result] = await pool.query('UPDATE recipes SET status = ? WHERE id = ?', [status, id])
  if (result.affectedRows === 0) return kirimError(res, 404, 'Resep tidak ditemukan.')

  const [resep] = await listResep('WHERE r.id = ?', [id])
  res.json({ resep })
})

app.get('/api/admin/users', wajibLogin, wajibAdmin, async (req, res) => {
  const [rows] = await pool.query(`
    SELECT
      u.id,
      u.nama_lengkap,
      u.username,
      u.email,
      u.role,
      u.created_at,
      (SELECT COUNT(*) FROM recipes r WHERE r.user_id = u.id) AS jumlah_resep,
      (SELECT COUNT(*) FROM favorites f WHERE f.user_id = u.id) AS jumlah_favorit
    FROM users u
    ORDER BY u.created_at DESC, u.id DESC
  `)
  res.json({ users: rows })
})

app.patch('/api/admin/users/:id', wajibLogin, wajibSuperadmin, async (req, res) => {
  const id = Number(req.params.id)
  const role = String(req.body.role || '')

  if (!Number.isInteger(id) || id <= 0) {
    return kirimError(res, 400, 'ID user tidak valid.')
  }

  if (!['user', 'admin'].includes(role)) {
    return kirimError(res, 400, 'Role tidak valid.')
  }

  if (id === req.user.id) {
    return kirimError(res, 400, 'Tidak bisa mengubah role akun Anda sendiri.')
  }

  const [cek] = await pool.query('SELECT id, role FROM users WHERE id = ?', [id])
  if (cek.length === 0) return kirimError(res, 404, 'User tidak ditemukan.')
  if (cek[0].role === 'superadmin') {
    return kirimError(res, 400, 'Tidak bisa mengubah role akun superadmin.')
  }

  const [result] = await pool.query('UPDATE users SET role = ? WHERE id = ?', [role, id])
  if (result.affectedRows === 0) return kirimError(res, 404, 'User tidak ditemukan.')

  res.json({ message: 'Role user berhasil diubah.' })
})

app.delete('/api/admin/users/:id', wajibLogin, wajibSuperadmin, async (req, res) => {
  const id = Number(req.params.id)

  if (id === req.user.id) {
    return kirimError(res, 400, 'Tidak bisa menghapus akun Anda sendiri.')
  }

  const [cek] = await pool.query('SELECT id, role FROM users WHERE id = ?', [id])
  if (cek.length === 0) return kirimError(res, 404, 'User tidak ditemukan.')
  if (cek[0].role === 'superadmin') {
    return kirimError(res, 400, 'Tidak bisa menghapus akun superadmin.')
  }

  const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id])
  if (result.affectedRows === 0) return kirimError(res, 404, 'User tidak ditemukan.')

  res.json({ message: 'Akun user berhasil dihapus.' })
})

// ===== Favorit =====

app.get('/api/favorites', wajibLogin, async (req, res) => {
  const [rows] = await pool.query(
    'SELECT recipe_id FROM favorites WHERE user_id = ? ORDER BY created_at DESC',
    [req.user.id],
  )
  res.json({ ids: rows.map((r) => Number(r.recipe_id)) })
})

app.post('/api/favorites/:recipeId', wajibLogin, async (req, res) => {
  const recipeId = Number(req.params.recipeId)
  if (!Number.isInteger(recipeId) || recipeId <= 0) {
    return kirimError(res, 400, 'ID resep tidak valid.')
  }

  const [resep] = await pool.query('SELECT id FROM recipes WHERE id = ? AND status = ?', [recipeId, 'approved'])
  if (resep.length === 0) return kirimError(res, 404, 'Resep tidak ditemukan.')

  await pool.query(
    'INSERT IGNORE INTO favorites (user_id, recipe_id) VALUES (?, ?)',
    [req.user.id, recipeId],
  )
  res.status(201).json({ message: 'Ditambahkan ke favorit.' })
})

app.delete('/api/favorites/:recipeId', wajibLogin, async (req, res) => {
  const recipeId = Number(req.params.recipeId)
  await pool.query('DELETE FROM favorites WHERE user_id = ? AND recipe_id = ?', [req.user.id, recipeId])
  res.json({ message: 'Dihapus dari favorit.' })
})

// ===== Rating & Komentar =====

app.post('/api/recipes/:id/rating', wajibLogin, async (req, res) => {
  const id = Number(req.params.id)
  const nilai = Number.parseInt(req.body.nilai, 10)

  if (!Number.isInteger(id) || id <= 0) return kirimError(res, 400, 'ID resep tidak valid.')
  if (!Number.isInteger(nilai) || nilai < 1 || nilai > 5) {
    return kirimError(res, 400, 'Rating harus angka 1 sampai 5.')
  }

  const [resep] = await pool.query('SELECT id FROM recipes WHERE id = ? AND status = ?', [id, 'approved'])
  if (resep.length === 0) return kirimError(res, 404, 'Resep tidak ditemukan.')

  await pool.query(
    `INSERT INTO ratings (user_id, recipe_id, nilai) VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE nilai = VALUES(nilai)`,
    [req.user.id, id, nilai],
  )

  const [stats] = await pool.query(
    'SELECT ROUND(AVG(nilai), 1) AS rating_avg, COUNT(*) AS rating_count FROM ratings WHERE recipe_id = ?',
    [id],
  )
  res.json({ rating: { rating_avg: Number(stats[0].rating_avg || 0), rating_count: stats[0].rating_count } })
})

app.get('/api/recipes/:id/comments', async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id) || id <= 0) return kirimError(res, 400, 'ID resep tidak valid.')

  const [rows] = await pool.query(
    `SELECT
       c.id,
       c.recipe_id,
       c.user_id,
       c.isi,
       c.created_at,
       COALESCE(NULLIF(u.nama_lengkap, ''), NULLIF(u.username, ''), u.email) AS penulis
     FROM comments c
     JOIN users u ON u.id = c.user_id
     WHERE c.recipe_id = ?
     ORDER BY c.created_at DESC, c.id DESC`,
    [id],
  )
  res.json({ komentar: rows })
})

app.post('/api/recipes/:id/comments', wajibLogin, async (req, res) => {
  const id = Number(req.params.id)
  const isi = String(req.body.isi || '').trim()

  if (!Number.isInteger(id) || id <= 0) return kirimError(res, 400, 'ID resep tidak valid.')
  if (!isi) return kirimError(res, 400, 'Isi komentar wajib diisi.')

  const [resep] = await pool.query('SELECT id FROM recipes WHERE id = ? AND status = ?', [id, 'approved'])
  if (resep.length === 0) return kirimError(res, 404, 'Resep tidak ditemukan.')

  const [result] = await pool.query(
    'INSERT INTO comments (recipe_id, user_id, isi) VALUES (?, ?, ?)',
    [id, req.user.id, isi],
  )

  const [rows] = await pool.query(
    `SELECT
       c.id, c.recipe_id, c.user_id, c.isi, c.created_at,
       COALESCE(NULLIF(u.nama_lengkap, ''), NULLIF(u.username, ''), u.email) AS penulis
     FROM comments c
     JOIN users u ON u.id = c.user_id
     WHERE c.id = ?`,
    [result.insertId],
  )
  res.status(201).json({ komentar: rows[0] })
})

// Hapus komentar (moderasi admin & superadmin).
app.delete('/api/comments/:id', wajibLogin, wajibAdmin, async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id) || id <= 0) return kirimError(res, 400, 'ID komentar tidak valid.')

  const [result] = await pool.query('DELETE FROM comments WHERE id = ?', [id])
  if (result.affectedRows === 0) return kirimError(res, 404, 'Komentar tidak ditemukan.')

  res.json({ message: 'Komentar berhasil dihapus.' })
})

// Daftar rating sebuah resep (moderasi: admin bisa lihat & hapus rating).
app.get('/api/recipes/:id/ratings', async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id) || id <= 0) return kirimError(res, 400, 'ID resep tidak valid.')

  const [rows] = await pool.query(
    `SELECT
       r.id,
       r.recipe_id,
       r.user_id,
       r.nilai,
       r.created_at,
       COALESCE(NULLIF(u.nama_lengkap, ''), NULLIF(u.username, ''), u.email) AS penulis
     FROM ratings r
     JOIN users u ON u.id = r.user_id
     WHERE r.recipe_id = ?
     ORDER BY r.created_at DESC, r.id DESC`,
    [id],
  )
  res.json({ rating: rows })
})

// Hapus rating (moderasi admin & superadmin).
app.delete('/api/ratings/:id', wajibLogin, wajibAdmin, async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id) || id <= 0) return kirimError(res, 400, 'ID rating tidak valid.')

  const [result] = await pool.query('DELETE FROM ratings WHERE id = ?', [id])
  if (result.affectedRows === 0) return kirimError(res, 404, 'Rating tidak ditemukan.')

  res.json({ message: 'Rating berhasil dihapus.' })
})

// ===== Data publik (hanya resep yang disetujui) =====

app.get('/api/initial-data', wajibLogin, async (_req, res) => {
  const [ingredientsResult, recipesResult] = await Promise.all([
    pool.query(
      'SELECT id, nama_bahan, kategori, status_validasi FROM ingredients WHERE status_validasi = TRUE ORDER BY nama_bahan ASC',
    ),
    listResep('WHERE r.status = ?', ['approved']),
  ])

  res.json({
    bahan: ingredientsResult[0].map(formatBahan),
    resep: recipesResult,
  })
})

app.get('/api/ingredients/pending', wajibLogin, wajibAdmin, async (_req, res) => {
  const [rows] = await pool.query(
    'SELECT id, nama_bahan, kategori, status_validasi FROM ingredients WHERE status_validasi = FALSE ORDER BY created_at ASC',
  )

  res.json({ bahan: rows.map(formatBahan) })
})

app.post('/api/ingredients', wajibLogin, async (req, res) => {
  const namaBahan = String(req.body.nama_bahan || '').trim()
  const kategori = String(req.body.kategori || 'Lainnya').trim()

  if (!namaBahan) return kirimError(res, 400, 'Nama bahan wajib diisi.')

  try {
    const [result] = await pool.query(
      'INSERT INTO ingredients (nama_bahan, kategori, status_validasi) VALUES (?, ?, FALSE)',
      [namaBahan, kategori],
    )
    const [rows] = await pool.query(
      'SELECT id, nama_bahan, kategori, status_validasi FROM ingredients WHERE id = ?',
      [result.insertId],
    )

    res.status(201).json({ bahan: formatBahan(rows[0]) })
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return kirimError(res, 409, 'Bahan sudah terdaftar!')
    }

    throw error
  }
})

app.patch('/api/ingredients/:id/approve', wajibLogin, wajibAdmin, async (req, res) => {
  const [result] = await pool.query(
    'UPDATE ingredients SET status_validasi = TRUE WHERE id = ?',
    [req.params.id],
  )

  if (result.affectedRows === 0) return kirimError(res, 404, 'Bahan tidak ditemukan.')

  const [rows] = await pool.query(
    'SELECT id, nama_bahan, kategori, status_validasi FROM ingredients WHERE id = ?',
    [req.params.id],
  )

  res.json({ bahan: formatBahan(rows[0]) })
})

app.get('/api/public/data', async (_req, res) => {
  try {
    const [ingredientsResult, recipesResult] = await Promise.all([
      pool.query(
        'SELECT id, nama_bahan, kategori, status_validasi FROM ingredients WHERE status_validasi = TRUE ORDER BY nama_bahan ASC',
      ),
      listResep('WHERE r.status = ?', ['approved']),
    ])

    res.json({
      bahan: ingredientsResult[0].map(formatBahan),
      resep: recipesResult,
    })
  } catch {
    kirimError(res, 500, 'Gagal mengambil data publik.')
  }
})

// Endpoint detail resep publik: hanya resep yang sudah disetujui.
app.get('/api/public/recipes/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)

    if (!Number.isInteger(id) || id <= 0) {
      return kirimError(res, 400, 'ID resep tidak valid.')
    }

    const [resep] = await listResep('WHERE r.id = ? AND r.status = ?', [id, 'approved'])

    if (!resep) {
      return kirimError(res, 404, 'Resep tidak ditemukan.')
    }

    res.json({ resep })
  } catch {
    kirimError(res, 500, 'Gagal mengambil detail resep.')
  }
})

app.get(/^(?!\/api).*/, (_req, res) => {
  res.sendFile(path.join(distDir, 'index.html'))
})

// Handler terakhir agar error async tidak membocorkan detail internal ke browser.
app.use((error, _req, res, next) => {
  void next
  console.error(error)
  kirimError(res, 500, 'Terjadi kesalahan server.')
})

// Pastikan database & tabel dasar ada. Untuk database baru/kosong, jalankan
// database/laragon.sql (idempoten: CREATE TABLE IF NOT EXISTS + INSERT IGNORE),
// sehingga teman cukup npm run dev:api tanpa import manual.
async function pastikanDatabaseAda() {
  const dbName = dbConfig.database
  const conn = await mysql.createConnection({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    multipleStatements: true,
  })

  try {
    await conn.query(
      `CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    )
    const [tabel] = await conn.query(
      'SELECT COUNT(*) AS ada FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?',
      [dbName, 'users'],
    )
    if (Number(tabel[0].ada) === 0) {
      const sql = readFileSync(path.resolve(__dirname, '..', 'database', 'laragon.sql'), 'utf8')
      await conn.query(sql.replaceAll('skripsi_masak', dbName))
    }
  } finally {
    await conn.end()
  }
}

// Seed data tim (database/seed_resep.sql) — idempoten, dijalankan setelah
// migrasi agar kolom terbaru (mis. user_id, status) sudah tersedia.
async function jalankanSeed() {
  const dbName = dbConfig.database
  const conn = await mysql.createConnection({
    ...dbConfig,
    multipleStatements: true,
  })

  try {
    const seed = readFileSync(path.resolve(__dirname, '..', 'database', 'seed_resep.sql'), 'utf8')
    await conn.query(seed)
    const seedHalal = readFileSync(path.resolve(__dirname, '..', 'database', 'seed_halal.sql'), 'utf8')
    await conn.query(seedHalal)
    // Setelah seed, bagikan resep yang masih milik admin ke user demo secara acak
    // (user1 paling banyak). Idempoten: hanya resep tanpa pemilik yang diproses.
    await bagikanResepAdminKeUser(pool)
  } finally {
    await conn.end()
  }
}

async function start() {
  try {
    await pastikanDatabaseAda()
    await jalankanMigrasi(pool)
    await jalankanSeed()
    app.listen(port, () => {
      console.log(`API berjalan di http://localhost:${port}`)
    })
  } catch (error) {
    console.error('Gagal menjalankan migrasi database:', error.message)
    process.exit(1)
  }
}

start()
