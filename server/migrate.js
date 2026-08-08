import bcrypt from 'bcryptjs'

// Migrasi idempoten: dipanggil saat server start agar skema database otomatis
// lengkap tanpa menghapus data lama. Semua penambahan bersifat "jika belum ada".
export async function jalankanMigrasi(pool) {
  const cekKolom = async (tabel, kolom) => {
    const [rows] = await pool.query(
      'SELECT COUNT(*) AS ada FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?',
      [tabel, kolom],
    )
    return Number(rows[0].ada) > 0
  }

  // ===== users: kolom profil tambahan =====
  if (!(await cekKolom('users', 'nama_lengkap'))) {
    await pool.query("ALTER TABLE users ADD COLUMN nama_lengkap VARCHAR(255) NOT NULL DEFAULT ''")
  }
  if (!(await cekKolom('users', 'username'))) {
    await pool.query('ALTER TABLE users ADD COLUMN username VARCHAR(255) NULL')
  }
  if (!(await cekKolom('users', 'bio'))) {
    await pool.query('ALTER TABLE users ADD COLUMN bio TEXT NULL')
  }
  if (!(await cekKolom('users', 'foto_profil'))) {
    await pool.query("ALTER TABLE users ADD COLUMN foto_profil VARCHAR(255) NULL")
  }

  const [usernameIdx] = await pool.query(
    "SELECT COUNT(*) AS ada FROM information_schema.STATISTICS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND INDEX_NAME = 'uq_users_username'",
  )
  if (Number(usernameIdx[0].ada) === 0) {
    await pool.query('ALTER TABLE users ADD UNIQUE KEY uq_users_username (username)')
  }

  // ===== users: tambah role superadmin =====
  const [roleKolom] = await pool.query(
    "SELECT COLUMN_TYPE FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'role'",
  )
  const tipeRole = roleKolom[0]?.COLUMN_TYPE || ''
  if (!tipeRole.includes('superadmin')) {
    await pool.query(
      "ALTER TABLE users MODIFY COLUMN role ENUM('user', 'admin', 'superadmin') NOT NULL DEFAULT 'user'",
    )
  }

  // Akun admin bawaan di-promote menjadi superadmin (pemegang hak kelola role).
  await pool.query(
    "UPDATE users SET role = 'superadmin' WHERE email = ? AND role = 'admin'",
    ['admin@admin.com'],
  )

  // ===== recipes: kepemilikan & status moderasi =====
  if (!(await cekKolom('recipes', 'user_id'))) {
    await pool.query('ALTER TABLE recipes ADD COLUMN user_id BIGINT UNSIGNED NULL AFTER porsi_default')
  }
  // Durasi masak (menit) — kolom nyata agar filter "di bawah 30 menit" & tampilan
  // memakai data, bukan mock. Backfill hanya baris NULL (idempoten).
  if (!(await cekKolom('recipes', 'durasi_menit'))) {
    await pool.query('ALTER TABLE recipes ADD COLUMN durasi_menit INT UNSIGNED NULL AFTER porsi_default')
  }
  await pool.query(
    'UPDATE recipes SET durasi_menit = LEAST(GREATEST(JSON_LENGTH(langkah_memasak) * 7, 10), 120) WHERE durasi_menit IS NULL',
  )
  if (!(await cekKolom('recipes', 'status'))) {
    // Default 'approved' agar resep lama tetap tampil; resep buatan user dibuat 'pending'.
    await pool.query(
      "ALTER TABLE recipes ADD COLUMN status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'approved' AFTER user_id",
    )
  }

  const [recipesFk] = await pool.query(
    "SELECT COUNT(*) AS ada FROM information_schema.KEY_COLUMN_USAGE WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'recipes' AND CONSTRAINT_NAME = 'fk_recipes_user'",
  )
  if (Number(recipesFk[0].ada) === 0) {
    try {
      await pool.query(
        'ALTER TABLE recipes ADD CONSTRAINT fk_recipes_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL',
      )
    } catch { /* constraint lama mungkin menolak, tidak fatal */ }
  }

  // ===== Tabel favorit / rating / komentar =====
  await pool.query(`
    CREATE TABLE IF NOT EXISTS favorites (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      user_id BIGINT UNSIGNED NOT NULL,
      recipe_id BIGINT UNSIGNED NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY uq_favorites_user_recipe (user_id, recipe_id),
      KEY idx_favorites_recipe (recipe_id),
      CONSTRAINT fk_favorites_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      CONSTRAINT fk_favorites_recipe FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS ratings (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      user_id BIGINT UNSIGNED NOT NULL,
      recipe_id BIGINT UNSIGNED NOT NULL,
      nilai TINYINT UNSIGNED NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY uq_ratings_user_recipe (user_id, recipe_id),
      KEY idx_ratings_recipe (recipe_id),
      CONSTRAINT chk_ratings_nilai CHECK (nilai BETWEEN 1 AND 5),
      CONSTRAINT fk_ratings_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      CONSTRAINT fk_ratings_recipe FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS comments (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      recipe_id BIGINT UNSIGNED NOT NULL,
      user_id BIGINT UNSIGNED NOT NULL,
      isi TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      KEY idx_comments_recipe (recipe_id),
      CONSTRAINT fk_comments_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      CONSTRAINT fk_comments_recipe FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `)

  // ===== Akun admin bawaan =====
  const adminEmail = 'admin@admin.com'
  const [adminCek] = await pool.query('SELECT id FROM users WHERE email = ?', [adminEmail])

  if (adminCek.length === 0) {
    const passwordHash = await bcrypt.hash('admin', 10)
    await pool.query(
      'INSERT INTO users (nama_lengkap, username, email, password_hash, role) VALUES (?, ?, ?, ?, ?)',
      ['Administrator', 'administrator', adminEmail, passwordHash, 'superadmin'],
    )
  }

  // Hapus akun superadmin legacy (admin@example.com) dari seed laragon.sql lama.
  // Deprecated: akun admin resmi sekarang admin@admin.com.
  await pool.query("DELETE FROM users WHERE email = 'admin@example.com'")
}
