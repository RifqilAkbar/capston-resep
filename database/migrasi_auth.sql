-- Migrasi idempoten untuk sistem autentikasi & moderasi resep.
-- File ini sengaja TIDAK menghapus data lama. Jalankan pada database yang ada:
--   USE skripsi_masak;  SOURCE database/migrasi_auth.sql;
-- Catatan: saat server dijalankan, migrasi ini otomatis dijalankan oleh server/migrate.js.

-- ===== users: kolom profil =====
ALTER TABLE users ADD COLUMN IF NOT EXISTS nama_lengkap VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE users ADD COLUMN IF NOT EXISTS username VARCHAR(255) NULL;
ALTER TABLE users ADD COLUMN IF NOT EXISTS bio TEXT NULL;
ALTER TABLE users ADD COLUMN IF NOT EXISTS foto_profil VARCHAR(255) NULL;

-- ===== recipes: kepemilikan & status moderasi =====
ALTER TABLE recipes ADD COLUMN IF NOT EXISTS user_id BIGINT UNSIGNED NULL AFTER porsi_default;
ALTER TABLE recipes ADD COLUMN IF NOT EXISTS status ENUM('pending','approved','rejected') NOT NULL DEFAULT 'approved' AFTER user_id;

-- ===== Tabel favorit / rating / komentar =====
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===== users: tambah role superadmin =====
ALTER TABLE users MODIFY COLUMN role ENUM('user', 'admin', 'superadmin') NOT NULL DEFAULT 'user';

-- ===== Akun admin bawaan =====
-- Email: admin@admin.com | Password: admin
-- Dibuat sebagai superadmin bila belum ada. (password_hash dari bcrypt dengan cost 10)
INSERT INTO users (nama_lengkap, username, email, password_hash, role)
SELECT 'Administrator', 'administrator', 'admin@admin.com', '$2b$10$sNKBoIsBHY.L0tcgaC.koekpVabamqaestkFqGTy9Q8Y2ABWQbl9q', 'superadmin'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@admin.com');

-- Akun admin lama di-promote menjadi superadmin (pemegang hak kelola role).
UPDATE users SET role = 'superadmin' WHERE email = 'admin@admin.com' AND role = 'admin';
